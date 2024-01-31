import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie'; // add this line

import { AppComponent } from './app.component';
import {RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';

export function playerFactory() {
  return import('lottie-web');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
      LottieModule.forRoot({ player: playerFactory })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
