import { fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('deals cards by clicking the center deck hint', async () => {
    render(<App />);

    const dealHint = await screen.findByRole('button', { name: /点击中间牌堆发牌/i });
    expect(dealHint).toBeInTheDocument();

    fireEvent.click(dealHint);
    expect(screen.getByRole('button', { name: /重新收牌/i })).toBeInTheDocument();
  });
});
