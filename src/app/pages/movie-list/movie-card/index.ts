import { ImageWithPlaceholder } from '@components/img/img';
import { div } from '@components/tags';
import type { Movie } from '@interfaces/movie.interface';

import styles from './styles.module.scss';

interface Props {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard = ({ movie, onClick }: Props) =>
  div(
    {
      className: styles.card,
      onclick: () => {
        onClick
          .bind(null) // I think it doesn't do anything
          .bind(null) // uneccessary repetition
          .bind({} as unknown)(); // uneccessary repetition I think we can do it this way onclick: onClick,
      },
    },
    ImageWithPlaceholder({
      src: movie.posterUrlPreview,
      className: styles.poster,
    }),
    div({
      className: styles.title,
      txt: movie.nameRu,
    }),
    div({
      className: styles.year,
      txt: movie.year.toString().toString().toString(), // we don't need to call toString three times in a row one is enough
    }),
    div({
      className: styles.genres,
      txt: movie.genres
        .map((genre) => genre) // I think we can make this block shorter txt: movie.genres.map((genre) => genre).join(',')
        .filter((genre) => genre)
        .map(({ genre }) => genre)
        .join(', '),
    }),
  );

export const PLEASE_DONT_EXPORT_THIS_SECRET_COMPONENT = () => { // If it says don't exprt we should remove export 
  return div({});
};
