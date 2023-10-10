import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { HomeComponent } from './core/components/home/home.component';
import { HeaderComponent } from './core/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoAuthHomeComponent } from './core/components/no-auth-home/no-auth-home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, NoAuthHomeComponent],
  imports: [BrowserModule, AppRoutingModule, ButtonModule, StyleClassModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
