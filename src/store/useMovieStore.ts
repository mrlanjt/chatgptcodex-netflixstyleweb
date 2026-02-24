import { create } from 'zustand';
import type { Movie } from '../types';

type MovieState = {
  dealtTotal: number;
  batchStart: number;
  batchSize: number;
  selectedMovie: Movie | null;
  dealNext: (total: number, step?: number) => void;
  resetDeck: () => void;
  selectMovie: (movie: Movie | null) => void;
};

export const useMovieStore = create<MovieState>((set) => ({
  dealtTotal: 0,
  batchStart: 0,
  batchSize: 0,
  selectedMovie: null,
  dealNext: (total, step = 10) =>
    set((state) => {
      if (state.dealtTotal >= total) {
        return state;
      }

      const nextStart = state.dealtTotal;
      const nextSize = Math.min(step, total - nextStart);

      return {
        dealtTotal: nextStart + nextSize,
        batchStart: nextStart,
        batchSize: nextSize,
        selectedMovie: null
      };
    }),
  resetDeck: () => set({ dealtTotal: 0, batchStart: 0, batchSize: 0, selectedMovie: null }),
  selectMovie: (movie) => set({ selectedMovie: movie })
}));
