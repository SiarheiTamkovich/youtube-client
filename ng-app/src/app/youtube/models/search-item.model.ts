export interface SearchItemModel {
  etag: string,
  id: {
    kind: string,
    videoId: string,
  }
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: VideoThumbnails,
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
  statistics: VideoStatistics,
}

export interface VideoSnippet {
  publishedAt: string;
  title: string;
  description: string;
  thumbnails: VideoThumbnails;
  channelId?: string;
  channelTitle: string;
  tags: string[];
  categoryId?: string;
  liveBroadcastContent?: string;
  localized?: {
    title: string;
    description: string;
  };
  defaultAudioLanguage?: string;
}

export interface VideoInfo {
  id: string;
  snippet: VideoSnippet;
  statistics: VideoStatistics;
  source: string;
}

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface VideoThumbnails {
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
  standard: {
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
