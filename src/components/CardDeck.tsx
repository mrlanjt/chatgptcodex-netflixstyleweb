import { motion } from 'framer-motion';
import type { Movie } from '../types';
import { MovieCard } from './MovieCard';

type CardDeckProps = {
  movies: Movie[];
  dealtTotal: number;
  batchStart: number;
  batchSize: number;
  onDeal: () => void;
  onMovieClick: (movie: Movie) => void;
};

export function CardDeck({ movies, dealtTotal, batchStart, batchSize, onDeal, onMovieClick }: CardDeckProps) {
  const dealtMovies = movies.slice(batchStart, batchStart + batchSize);
  const remaining = movies.length - dealtTotal;

  return (
    <section className="deck-wrap" aria-label="movie deck">
      <button className="stack-deck" type="button" onClick={onDeal} disabled={remaining === 0}>
        <span>点击发牌（每次10张）</span>
        <strong>{remaining > 0 ? `剩余 ${remaining} 张` : '已全部发完'}</strong>
      </button>

      <div className="dealt-zone waterfall" aria-live="polite">
        {dealtMovies.map((movie, i) => (
          <motion.div
            className="deck-card dealt"
            key={movie.id}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22, delay: i * 0.04 }}
          >
            <MovieCard movie={movie} onClick={onMovieClick} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
