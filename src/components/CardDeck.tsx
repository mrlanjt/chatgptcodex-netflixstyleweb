import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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
  const deckButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isDeckVisible, setIsDeckVisible] = useState(true);

  useEffect(() => {
    const target = deckButtonRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDeckVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const shouldShowFloatingDeal = dealtTotal > 0 && !isDeckVisible;

  return (
    <section className="deck-wrap" aria-label="movie deck">
      <button className="stack-deck" type="button" onClick={onDeal} disabled={remaining === 0}>
        <span>点击发牌（每次5张）</span>
        <strong>{remaining > 0 ? `剩余 ${remaining} 张` : '已全部发完'}</strong>
      </button>

      <div className="dealt-zone" aria-live="polite">
        {dealtMovies.map((movie, i) => (
          <motion.div
            className="deck-card dealt"
            key={movie.id}
            initial={{
              opacity: 0,
              y: -260,
              x: i % 2 === 0 ? -180 : 180,
              scale: 0.35,
              rotate: i % 2 === 0 ? -22 : 22,
              filter: 'blur(8px)'
            }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.85, delay: i * 0.08 }}
          >
            <MovieCard movie={movie} onClick={onMovieClick} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
