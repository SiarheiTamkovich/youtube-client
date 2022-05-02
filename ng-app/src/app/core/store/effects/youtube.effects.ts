import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, switchMapTo } from 'rxjs';
import { YoutubeHttpService } from "../../services/youtube-http.service";

import * as VideoActions from '../actions/youtube.actions';

@Injectable()
export class VideoEffects {
  constructor(
    private actions$: Actions,
    private videoService: YoutubeHttpService,
  ) {}

    fetchVideo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(VideoActions.FetchVideo),
        switchMapTo(
          this.videoService.getVideo$('war').pipe(
            map(response => VideoActions.FetchVideoSuccess({ response })),
            catchError((error) =>of(VideoActions.FetchVideoFailed({ error })))
          )
        ),
      )
    )

}
