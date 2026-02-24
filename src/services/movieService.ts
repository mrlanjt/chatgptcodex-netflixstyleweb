import type { Movie } from '../types';

const MOCK_MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Shadow Protocol',
    poster: 'https://picsum.photos/seed/movie1/400/600',
    category: 'Action',
    year: 2024,
    description: 'An elite team races against time to prevent a cyber-collapse.'
  },
  {
    id: 'm2',
    title: 'Crimson Night',
    poster: 'https://picsum.photos/seed/movie2/400/600',
    category: 'Thriller',
    year: 2023,
    description: 'A detective uncovers a conspiracy tied to an unsolved disappearance.'
  },
  {
    id: 'm3',
    title: 'Orbit 9',
    poster: 'https://picsum.photos/seed/movie3/400/600',
    category: 'Sci-Fi',
    year: 2022,
    description: 'A stranded crew encounters a signal that changes everything.'
  },
  {
    id: 'm4',
    title: 'Paper Kingdom',
    poster: 'https://picsum.photos/seed/movie4/400/600',
    category: 'Drama',
    year: 2021,
    description: 'A journalist navigates power, truth, and personal sacrifice.'
  }
];

export async function getMovies(category?: string): Promise<Movie[]> {
  await new Promise((resolve) => setTimeout(resolve, 120));
  if (!category) return MOCK_MOVIES;
  return MOCK_MOVIES.filter((movie) => movie.category === category);
}
