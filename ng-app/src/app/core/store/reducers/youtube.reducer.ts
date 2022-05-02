import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { SearchResponseModel } from 'src/app/youtube/models/search-response.model';
import * as VideoActions from '../actions/youtube.actions';

export interface VideoState {
  video: SearchResponseModel | null,
  isFetched: boolean,
  isLoading: boolean,
  error: Error | null,
}

export const initialState: VideoState = {
  video: null,
  isFetched: false,
  isLoading: false,
  error: null,
}

export const reducer = createReducer(
  initialState,
  on(VideoActions.FetchVideo, state => ({
    ...state,
    isLoading: true
  })),
  on(VideoActions.FetchVideoSuccess, (state, { response }) => ({
    ...state,
    video: response,
    isFetched: true,
    isLoading: false,
  })),
  on(VideoActions.FetchVideoFailed, (state, { error }) => ({
    ...state,
    error: error,
    isFetched: false,
    isLoading: false,
  })),
)

export const getVideoStore = createFeatureSelector<VideoState>('youtube');

export const selectVideo = createSelector(
  getVideoStore,
  (state: VideoState) => state.video,
);
export const selectError = createSelector(
  getVideoStore,
  (state: VideoState) => state.error,
);
