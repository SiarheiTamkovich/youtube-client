import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './core/components/header/header.component';
import { SearchResultsComponent } from './youtube/components/search-results/search-results.component';
import { FiltersComponent } from './youtube/components/filters/filters.component';

import { SearchService } from './core/services/search.service';
import { YoutubeService } from './youtube/services/youtube.service';

import { GetColorFromDateDirective } from './youtube/directives/get-color-from-date.directive';
import { TextFilterPipe } from './youtube/pipes/text-filter.pipe';
import { Page404Component } from './core/pages/page404/page404.component';
import { HomeComponent } from './core/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultsComponent,
    FiltersComponent,
    GetColorFromDateDirective,
    TextFilterPipe,
    Page404Component,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [SearchService, YoutubeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
