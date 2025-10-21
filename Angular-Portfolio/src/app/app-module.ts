import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

// Exterior Module
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// Components for routes import
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Sidebar } from './layout/sidebar/sidebar';
import { Resume } from './pages/resume/resume';

@NgModule({
  declarations: [
    App,
    Home,
    Contact,
    Sidebar,
    Resume
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
