import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlotHoleDesignComponent } from './example/plot-hole-design/plot-hole-design.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'example/plot-hole', component: PlotHoleDesignComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
