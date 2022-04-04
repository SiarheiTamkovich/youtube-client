export interface SearchItemModel {
  kind: string,
  etag: string,
  id: string,
  snippet:{
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: {
      default: {
        url: string,
        with: number,
        height: number,
      }
      medium: {
        url: string,
        with: number,
        height: number,
      }
      standart: {
        url: string,
        with: number,
        height: number,
      }
      maxres: {
        url: string,
        with: number,
        height: number,
      }
    }
    channelTitle: string,
    tags: string[],
    categoryId: string,
    liveBroadcastContent: string,
    localized: {
      title: string,
      description: string,
    }
    defaultAudioLanguage: string,
  }
  statistics: {
    viewCount: string,
    likeCount: string,
    dislikeCount: string,
    favoriteCount: string,
    commentCount: string,
  }
}
