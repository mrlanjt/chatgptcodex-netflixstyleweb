import { useEffect, useState } from 'react';
import { Banner } from './components/Banner';
import { CardDeck } from './components/CardDeck';
import { Modal } from './components/Modal';
import { Navbar } from './components/Navbar';
import { getMovies } from './services/movieService';
import { useMovieStore } from './store/useMovieStore';
import type { Movie } from './types';

export function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { dealtTotal, batchStart, batchSize, dealNext, resetDeck, selectedMovie, selectMovie } = useMovieStore();

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  return (
    <main className="app">
      <Navbar />
      <Banner />
      <section className="controls">
        {dealtTotal > 0 && (
          <button className="primary-btn" type="button" onClick={resetDeck}>
            清空已发牌
          </button>
        )}
      </section>
      <CardDeck
        movies={movies}
        dealtTotal={dealtTotal}
        batchStart={batchStart}
        batchSize={batchSize}
        onDeal={() => dealNext(movies.length, 5)}
        onMovieClick={selectMovie}
      />
      {selectedMovie && <Modal movie={selectedMovie} onClose={() => selectMovie(null)} />}
    </main>
  );
}
