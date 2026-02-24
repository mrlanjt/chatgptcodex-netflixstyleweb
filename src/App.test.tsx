import { fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders title and deal cards button', async () => {
    render(<App />);

    expect(screen.getByText(/unlimited films/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /deal cards/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /reset deck/i })).toBeInTheDocument();
  });
});
