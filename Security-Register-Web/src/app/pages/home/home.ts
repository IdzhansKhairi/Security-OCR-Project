import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
declare var bootstrap: any; // Access Bootstrap JS

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) {
      return; // Prevent running on server
    }

    const tabElements = document.querySelectorAll('.nav-link[data-bs-toggle="tab"]');
    const collapseElement = document.getElementById('aboutMore');

    tabElements.forEach(tab => {
      tab.addEventListener('shown.bs.tab', () => {
        if (collapseElement && collapseElement.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(collapseElement);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }
}
