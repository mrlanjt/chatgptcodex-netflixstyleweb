import type { Movie } from '../types';

const BASE_MOVIES: Omit<Movie, 'id'>[] = [
  {
    title: 'Shadow Protocol',
    poster: 'https://picsum.photos/seed/movie1/500/760',
    category: 'Action',
    year: 2024,
    description: 'An elite team races against time to prevent a cyber-collapse.'
  },
  {
    title: 'Crimson Night',
    poster: 'https://picsum.photos/seed/movie2/500/760',
    category: 'Thriller',
    year: 2023,
    description: 'A detective uncovers a conspiracy tied to an unsolved disappearance.'
  },
  {
    title: 'Orbit 9',
    poster: 'https://picsum.photos/seed/movie3/500/760',
    category: 'Sci-Fi',
    year: 2022,
    description: 'A stranded crew encounters a signal that changes everything.'
  },
  {
    title: 'Paper Kingdom',
    poster: 'https://picsum.photos/seed/movie4/500/760',
    category: 'Drama',
    year: 2021,
    description: 'A journalist navigates power, truth, and personal sacrifice.'
  }
];

const MOCK_MOVIES: Movie[] = Array.from({ length: 100 }, (_, i) => {
  const base = BASE_MOVIES[i % BASE_MOVIES.length];
  return {
    ...base,
    id: `m${i + 1}`,
    title: `${base.title} #${i + 1}`
  };
});
export async function getMovies(category?: string): Promise<Movie[]> {
  await new Promise((resolve) => setTimeout(resolve, 120));
  if (!category) return MOCK_MOVIES;
  return MOCK_MOVIES.filter((movie) => movie.category === category);
}
