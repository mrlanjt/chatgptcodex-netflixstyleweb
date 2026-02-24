import { fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';
import { useMovieStore } from './store/useMovieStore';

describe('App', () => {
  it('deals 10 cards each click and keeps stack visible', async () => {
    useMovieStore.setState({ dealtCount: 0, selectedMovie: null });
    render(<App />);

    const remaining100 = await screen.findByText(/剩余 100 张/i);
    expect(remaining100).toBeInTheDocument();

    const deckButton = screen.getByRole('button', { name: /点击发牌（每次10张）/i });
    fireEvent.click(deckButton);

    expect(await screen.findByText(/剩余 90 张/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /重新收牌/i })).toBeInTheDocument();
  });
});
