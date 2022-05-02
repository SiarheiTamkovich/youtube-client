import { createAction, props } from "@ngrx/store";
import { SearchResponseModel } from '../../../youtube/models/search-response.model'

const actionSource = '[VIDEO PAGE]';

export const FetchVideo = createAction(
  `${actionSource} FETCH VIDEO`
);

export const FetchVideoSuccess = createAction(
  `${actionSource} FETCH VIDEO SUCCESS`,
  props<{ response: SearchResponseModel}>()
);

export const FetchVideoFailed = createAction(
  `${actionSource} FETCH VIDEO FAILED`,
  props<{error: Error}>()
);
