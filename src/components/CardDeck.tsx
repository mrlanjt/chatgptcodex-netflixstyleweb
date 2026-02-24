import { motion } from 'framer-motion';
import type { Movie } from '../types';
import { MovieCard } from './MovieCard';

type CardDeckProps = {
  movies: Movie[];
  dealtCount: number;
  onDeal: () => void;
  onMovieClick: (movie: Movie) => void;
};

const COLUMNS = 3;

export function CardDeck({ movies, dealtCount, onDeal, onMovieClick }: CardDeckProps) {
  const dealtMovies = movies.slice(0, dealtCount);
  const remaining = movies.length - dealtCount;

  return (
    <section className="deck-wrap" aria-label="movie deck">
      <button className="stack-deck" type="button" onClick={onDeal} disabled={remaining === 0}>
        <span>点击发牌（每次10张）</span>
        <strong>{remaining > 0 ? `剩余 ${remaining} 张` : '已全部发完'}</strong>
      </button>

      <div className="dealt-zone">
        {dealtMovies.map((movie, i) => {
          const row = Math.floor(i / COLUMNS);
          const col = i % COLUMNS;
          const cardsInRow = Math.min(COLUMNS, dealtMovies.length - row * COLUMNS);
          const centeredX = (col - (cardsInRow - 1) / 2) * 250;

          return (
            <motion.div
              className="deck-card dealt"
              key={movie.id}
              initial={{ x: 0, y: -140, rotate: 0, scale: 0.92 }}
              animate={{ x: centeredX, y: row * 360, rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 250, damping: 24, delay: i * 0.025 }}
            >
              <MovieCard movie={movie} onClick={onMovieClick} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
