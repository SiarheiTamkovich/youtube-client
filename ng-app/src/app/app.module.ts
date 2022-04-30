import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './core/components/header/header.component';
import { SearchResultsComponent } from './youtube/pages/search-results/search-results.component';
import { FiltersComponent } from './youtube/components/filters/filters.component';

import { SearchService } from './core/services/search.service';
import { YoutubeService } from './youtube/services/youtube.service';

import { GetColorFromDateDirective } from './youtube/directives/get-color-from-date.directive';
import { TextFilterPipe } from './youtube/pipes/text-filter.pipe';
import { Page404Component } from './core/pages/page404/page404.component';
import { HomeComponent } from './core/pages/home/home.component';
import { ProgressComponent } from './shared/components/progress/progress.component';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { ItemPageComponent } from './youtube/pages/item-page/item-page.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultsComponent,
    ItemPageComponent,
    FiltersComponent,
    GetColorFromDateDirective,
    TextFilterPipe,
    Page404Component,
    HomeComponent,
    ProgressComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule, MatProgressSpinnerModule,
  ],
  providers: [
    SearchService,
    YoutubeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
