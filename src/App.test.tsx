import { fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';
import { useMovieStore } from './store/useMovieStore';

describe('App', () => {
  it('deals 5 cards per click and replaces previous dealt cards', async () => {
    useMovieStore.setState({ dealtTotal: 0, batchStart: 0, batchSize: 0, selectedMovie: null });
    render(<App />);

    expect(await screen.findByText(/剩余 100 张/i)).toBeInTheDocument();

    const dealButton = screen.getByRole('button', { name: /点击发牌（每次5张）/i });
    fireEvent.click(dealButton);

    expect(await screen.findByText(/剩余 95 张/i)).toBeInTheDocument();
    expect(screen.getByText('Shadow Protocol #1')).toBeInTheDocument();

    fireEvent.click(dealButton);

    expect(await screen.findByText(/剩余 90 张/i)).toBeInTheDocument();
    expect(screen.queryByText('Shadow Protocol #1')).not.toBeInTheDocument();
    expect(screen.getByText('Crimson Night #6')).toBeInTheDocument();
  });

  it('resets dealt cards when banner category is clicked', async () => {
    useMovieStore.setState({ dealtTotal: 0, batchStart: 0, batchSize: 0, selectedMovie: null });
    render(<App />);

    expect(await screen.findByText(/剩余 100 张/i)).toBeInTheDocument();
    const dealButton = screen.getByRole('button', { name: /点击发牌（每次5张）/i });
    fireEvent.click(dealButton);
    expect(await screen.findByText(/剩余 95 张/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '动作' }));

    expect(await screen.findByText(/剩余 25 张/i)).toBeInTheDocument();
    expect(screen.queryByText('Shadow Protocol #1')).not.toBeInTheDocument();
  });
});
