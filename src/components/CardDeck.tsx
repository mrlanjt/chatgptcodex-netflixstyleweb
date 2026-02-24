import { motion } from 'framer-motion';
import type { Movie } from '../types';
import { MovieCard } from './MovieCard';

type CardDeckProps = {
  movies: Movie[];
  isDealt: boolean;
  onMovieClick: (movie: Movie) => void;
};

export function CardDeck({ movies, isDealt, onMovieClick }: CardDeckProps) {
  return (
    <div className="deck-wrap">
      {movies.map((movie, i) => (
        <motion.div
          className="deck-card"
          key={movie.id}
          custom={i}
          initial="stacked"
          animate={isDealt ? 'spread' : 'stacked'}
          variants={{
            stacked: { x: 0, y: 0, rotate: 0, scale: 0.95 + i * 0.01 },
            spread: {
              x: (i % 2 === 0 ? -1 : 1) * (160 + i * 18),
              y: 100 + i * 8,
              rotate: i * 3 - 6,
              scale: 1
            }
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: i * 0.08 }}
        >
          <MovieCard movie={movie} onClick={onMovieClick} />
        </motion.div>
      ))}
    </div>
  );
}
