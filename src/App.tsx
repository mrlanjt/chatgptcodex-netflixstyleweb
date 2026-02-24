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
  const { dealtCount, dealNext, resetDeck, selectedMovie, selectMovie } = useMovieStore();

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  return (
    <main className="app">
      <Navbar />
      <Banner />
      <section className="controls">
        {dealtCount > 0 && (
          <button className="primary-btn" type="button" onClick={resetDeck}>
            重新收牌
          </button>
        )}
      </section>
      <CardDeck
        movies={movies}
        dealtCount={dealtCount}
        onDeal={() => dealNext(movies.length, 10)}
        onMovieClick={selectMovie}
      />
      {selectedMovie && <Modal movie={selectedMovie} onClose={() => selectMovie(null)} />}
    </main>
  );
}
