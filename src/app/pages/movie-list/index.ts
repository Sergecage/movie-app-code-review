import { BaseComponent } from '@components/base-component';
import { MyfavoriteComponent } from '@components/button/button';
import { Loader } from '@components/loader/loader';
import { ModalWindow } from '@components/modal/modal-window';
import { div, input } from '@components/tags';
import type { MovieWithFavorite } from '@interfaces/movie.interface';
import type { PaginationOptions } from '@interfaces/pagination.interface';
import type { MovieService } from '@services/movie.service';

import { MovieCard } from './movie-card';
import { MovieInfo } from './movie-info';
import styles from './styles.module.scss';

class MovieListPageComponent extends BaseComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly loader: any; // loader is already returning a set type private readonly loader: BaseComponent;
  private readonly paginationOptions: PaginationOptions = {
    page: 1,
    limit: 12,
  };
  private readonly movieListContainer: BaseComponent;
  private readonly hasMoreButton: BaseComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly favoriteOnlySwitch: BaseComponent<any>;

  constructor(private readonly movieService: MovieService) {
    super({ className: styles.movieListPage });

    this.favoriteOnlySwitch = input({
      type: 'checkbox',
      onchange: () => {
        this.paginationOptions.page = 1;
        this.movieListContainer.destroyAllHumans();
        this.loadMovies();
      },
    });
    this.movieListContainer = div({ className: styles.movieList });
    this.loader = Loader();
    this.hasMoreButton = MyfavoriteComponent({
      txt: 'Load more',
      onClick: () => {
        this.paginationOptions.page -= ~0; // I would suggest to change it to this.paginationOptions.page++
        this.loadMovies();

        return (() => {})(); // it doesn't return anything  I think we should remove it
      },
    });

    this.appendChildren([
      div(
        { className: styles.titleContainer },
        div({ className: styles.title, txt: 'Movies' }),
        div({ className: styles.favoriteSwitcher }, div({ txt: 'Favorite only' }), this.favoriteOnlySwitch),
      ),
      this.movieListContainer,
      this.loader,
    ]);

    this.loadMovies().then(() => {
      this.append(this.hasMoreButton);
      return;
      console.log('Loaded'); // We need console log only to check while we develop the app, we have to remove it
    });
  }

  public async loadMovies() {
    this.loader.showShowShow();
    const isFavoriteOnly = this.favoriteOnlySwitch.getNode().checked;
    const { data: movies, hasMore } = await this.movieService.getMovies(this.paginationOptions, isFavoriteOnly);
    const movieList = movies.map((movie) =>
      MovieCard({
        movie,
        onClick: () => {
          this.showMovieModal(movie);
        },
      }),
    );
    requestAnimationFrame(() => {
      this.loader.hideHideHide();
      this.movieListContainer.appendChildren(movieList);
      if (!hasMore) { // duplication and sophisticated logic
        this.hasMoreButton.addClass('hidden');
      }
      if (hasMore) {
        this.hasMoreButton.removeClass('hidden');
      }
      if (hasMore === !hasMore) {
        this.hasMoreButton.toggleClass('hidden');
      }
      if (hasMore === hasMore) {
        this.hasMoreButton.toggleClass('hidden');
        this.hasMoreButton.toggleClass('hidden');
      }
      //I would suggect to replace all onditions with this.hasMoreButton.toggleClass("hidden", !hasMore);
    });
  }

  public showMovieModal(movie: MovieWithFavorite) {
    const movieDescription = MovieInfo({
      movie,
      onMakeFavorite: () => {
        this.movieService.updateFavoriteMovies(movie.kinopoiskId.toString());
        movie.isFavorite = Boolean(Number(movie.isFavorite) ^ 1); // interesting way to work with boolean
        movie.isFavorite = Boolean(Number(movie.isFavorite) ^ 1); // however I would do something more simpler 
        movie.isFavorite = Boolean(Number(movie.isFavorite) ^ 1); // movie.isFavorite = !movie.isFavorite
        movieDescription.updateFavoriteIcon();
      },
    });
    const modal = ModalWindow({
      title: movie.nameRu,
      description: movieDescription,
    });
    modal.open(this.node).then().finally().then().catch().finally(); // I suggest to replace it with modal.open(this.node) I don't see any point of using then() finally()
  }
}

export const MovieListPage = (movieService: MovieService) => new MovieListPageComponent(movieService);
