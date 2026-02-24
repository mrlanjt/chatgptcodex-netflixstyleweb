import { motion } from 'framer-motion';
import type { Movie } from '../types';
import { MovieCard } from './MovieCard';

type CardDeckProps = {
  movies: Movie[];
  isDealt: boolean;
  onDeal: () => void;
  onMovieClick: (movie: Movie) => void;
};

const DESKTOP_COLUMNS = 4;

export function CardDeck({ movies, isDealt, onDeal, onMovieClick }: CardDeckProps) {
  return (
    <section className="deck-wrap" aria-label="movie deck">
      {!isDealt && (
        <button className="deal-hint" type="button" onClick={onDeal}>
          点击中间牌堆发牌
        </button>
      )}

      {movies.map((movie, i) => {
        const row = Math.floor(i / DESKTOP_COLUMNS);
        const col = i % DESKTOP_COLUMNS;
        const cardsInRow = Math.min(DESKTOP_COLUMNS, movies.length - row * DESKTOP_COLUMNS);
        const centeredX = (col - (cardsInRow - 1) / 2) * 190;

        return (
          <motion.div
            className="deck-card"
            key={movie.id}
            initial={false}
            animate={
              isDealt
                ? {
                    x: centeredX,
                    y: 180 + row * 320,
                    rotate: 0,
                    scale: 1
                  }
                : {
                    x: 0,
                    y: 0,
                    rotate: i * 1.5 - 3,
                    scale: 0.96 + i * 0.01
                  }
            }
            transition={{ type: 'spring', stiffness: 280, damping: 24, delay: isDealt ? i * 0.08 : 0 }}
            style={{ zIndex: isDealt ? 1 : movies.length - i }}
          >
            <MovieCard movie={movie} onClick={isDealt ? onMovieClick : onDeal} />
          </motion.div>
        );
      })}
    </section>
  );
}
