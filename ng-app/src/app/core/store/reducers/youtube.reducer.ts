import { createReducer, on } from '@ngrx/store';
import { SearchResponseModel } from 'src/app/youtube/models/search-response.model';
import * as VideoActions from '../actions/youtube.actions';

export interface VideoState {
  video: SearchResponseModel | null,
  isFetched: boolean,
  isLoading: boolean,
}

export const initialState: VideoState = {
  video: null,
  isFetched: false,
  isLoading: false,
}

export const reducer = createReducer(
  initialState,
  on(VideoActions.FetchVideo, state => ({
    ...state,
    isLoading: true
  })),
  on(VideoActions.FetchVideoSuccess, (state, { response }) => ({
    ...state,
    response,
    isFetched: true,
    isLoading: false,
  })),
  on(VideoActions.FetchVideoFailed, state => ({
    ...state,
    isFetched: true,
    isLoading: false,
  })),
)
