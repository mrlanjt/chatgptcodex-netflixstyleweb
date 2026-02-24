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
  const { isDealt, toggleDeal, selectedMovie, selectMovie } = useMovieStore();

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  return (
    <main className="app">
      <Navbar />
      <Banner />
      <section className="controls">
        {isDealt && (
          <button className="primary-btn" type="button" onClick={toggleDeal}>
            重新收牌
          </button>
        )}
      </section>
      <CardDeck movies={movies} isDealt={isDealt} onDeal={toggleDeal} onMovieClick={selectMovie} />
      {selectedMovie && <Modal movie={selectedMovie} onClose={() => selectMovie(null)} />}
    </main>
  );
}
