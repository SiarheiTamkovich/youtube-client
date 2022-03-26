export interface searchItemModel {
  kind: String;
  etag: String;
  id:   String;
  snippet:{
    publishedAt: String;
    channelId:   String;
    title:       String;
    description: String;
    thumbnails: {
      default: {
        url:    String;
        with:   Number;
        height: Number;
      }
      medium: {
        url:    String;
        with:   Number;
        height: Number;
      }
      standart: {
        url:    String;
        with:   Number;
        height: Number;
      }
      maxres: {
        url:    String;
        with:   Number;
        height: Number;
      }
    }
    channelTitle: String;
    tags:         String[];
    categoryId:   String;
    liveBroadcastContent: String;
    localized: {
      title: String;
      description: String;
    }
    defaultAudioLanguage: String;
  }
  statistics: {
    viewCount:     String;
    likeCount:     String;
    dislikeCount:  String;
    favoriteCount: String;
    commentCount:  String;
  }
}
