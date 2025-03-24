export interface Movie {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string | null;
  year: number;
  countries: ICountry[];
  genres: IGenres[];
  posterUrl: string;
  posterUrlPreview: string;
  duration: number;
  premiereRu: string;
}

export interface MovieWithFavorite extends Movie {
  isFavorite?: boolean;
}

export interface ICountry {
  country: string;
}

export interface IGenres {
  genre: string;
}

export interface IMovie {}  // I think we shouldn't use empty interface this is odd

export interface IMovie2 {} // I think we shouldn't use empty interface this is odd

export interface IMovie3 {} // I think we shouldn't use empty interface this is odd
