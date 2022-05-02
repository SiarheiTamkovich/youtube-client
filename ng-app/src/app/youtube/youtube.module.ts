import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StartComponent } from './pages/start/start.component';

@NgModule({
  declarations: [ 
    StartComponent
  ],
  imports: [
    CommonModule,
    YoutubeRoutingModule,
    StoreModule.forFeature('chat', (state = {}) => ({ lalala: 1 })),
    EffectsModule.forFeature([]),
  ]
})
export class YoutubeModule { }
