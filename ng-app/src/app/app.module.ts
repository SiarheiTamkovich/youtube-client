import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SearchItemComponent } from './search/search-item/search-item.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './search/search.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SearchItemComponent, SearchResultsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [SearchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
