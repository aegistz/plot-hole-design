import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlotHoleDesignComponent } from './example/plot-hole-design/plot-hole-design.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PlotHoleDesignLabsComponent } from './labs/plot-hole-design-labs/plot-hole-design-labs.component';

@NgModule({
  declarations: [
    AppComponent,
    PlotHoleDesignComponent,
    LandingPageComponent,
    PlotHoleDesignLabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
