import { create } from 'zustand';
import type { Movie } from '../types';

type MovieState = {
  selectedMovie: Movie | null;
  isDealt: boolean;
  selectMovie: (movie: Movie | null) => void;
  toggleDeal: () => void;
};

export const useMovieStore = create<MovieState>((set) => ({
  selectedMovie: null,
  isDealt: false,
  selectMovie: (movie) => set({ selectedMovie: movie }),
  toggleDeal: () => set((state) => ({ isDealt: !state.isDealt }))
}));
