import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components for routes
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Resume } from './pages/resume/resume';

// Add your routes to your components pages here
const routes: Routes = [
  { path: '', component: Home },             // Home at "/"
  { path: 'contact', component: Contact },   // Contact at "/contact"
  { path: 'resume', component: Resume },     // Resume at "/resume"
  { path:'*', redirectTo: '' }               // Redirect unknown paths to Home       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
