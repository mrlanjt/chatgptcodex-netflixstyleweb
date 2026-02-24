import type { Movie } from '../types';

type MovieCardProps = {
  movie: Movie;
  onClick: (movie: Movie) => void;
};

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <button type="button" className="movie-card" onClick={() => onClick(movie)}>
      <img src={movie.poster} alt={movie.title} loading="lazy" />
      <div className="movie-meta">
        <span>{movie.category}</span>
        <strong>{movie.title}</strong>
      </div>
    </button>
  );
}
