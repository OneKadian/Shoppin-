// types/image-search.ts
export interface ImageSearchResult {
  title: string;
  link: string;
  source: string;
  thumbnail?: string;
}

export interface ImageSearchError {
  message: string;
  code: string;
}