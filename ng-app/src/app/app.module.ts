import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { SearchItemComponent } from './search/search-item/search-item.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { FiltersComponent } from './filters/filters.component';

import { SearchService } from './search/search.service';

import { GetColorFromDateDirective } from './search/directives/get-color-from-date.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchItemComponent,
    SearchResultsComponent,
    FiltersComponent, GetColorFromDateDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [SearchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
