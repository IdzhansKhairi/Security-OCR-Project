import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');

  private scrollY = 0;
  private openedUrl = '';
  sidebarOpen = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;

    if (this.sidebarOpen) {
      // Save current scroll
      this.scrollY = window.scrollY;
      this.openedUrl = this.router.url;

      // Calculate scrollbar width to avoid layout shift (desktop)
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Disable smooth scrolling during lock/restore to avoid "scroll back" animation
      const html = document.documentElement;
      (html as HTMLElement).style.scrollBehavior = 'auto';

      // Lock body in place
      const body = document.body;
      body.style.position = 'fixed';
      body.style.top = `-${this.scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // --- Unlock sequence that prevents the visual jump ---
      const body = document.body;
      const html = document.documentElement;

      // Read back the exact offset we used
      const y = -parseInt(body.style.top || '0', 10) || 0;

      // Clear all styles that fixed the body (EXCEPT 'top' for now)
      body.style.position = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.paddingRight = '';

      // Strategy:
      // 1) Use double requestAnimationFrame to ensure the browser doesn't paint
      //    the "top" position before we restore scroll.
      // 2) Restore scroll, then remove 'top', then restore any previous scroll-behavior.

      // rAF #1: let layout settle after removing fixed positioning
      requestAnimationFrame(() => {
        // Immediately jump to the saved position (no smooth animation)
        if (this.router.url === this.openedUrl) {
          window.scrollTo(0, y);
        }

        // rAF #2: now it's safe to drop the 'top' property without flicker
        requestAnimationFrame(() => {
          body.style.top = '';

          // Optional: If you had a global smooth scroll before, restore it by clearing inline override
          (html as HTMLElement).style.scrollBehavior = '';
        });
      });
    }
  }
}
