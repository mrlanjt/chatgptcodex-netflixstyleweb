import { create } from 'zustand';
import type { Movie } from '../types';

type MovieState = {
  dealtCount: number;
  selectedMovie: Movie | null;
  dealNext: (total: number, step?: number) => void;
  resetDeck: () => void;
  selectMovie: (movie: Movie | null) => void;
};

export const useMovieStore = create<MovieState>((set) => ({
  dealtCount: 0,
  selectedMovie: null,
  dealNext: (total, step = 10) =>
    set((state) => ({
      dealtCount: Math.min(total, state.dealtCount + step)
    })),
  resetDeck: () => set({ dealtCount: 0, selectedMovie: null }),
  selectMovie: (movie) => set({ selectedMovie: movie })
}));
