import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import { buildResource } from './test/buildResource';

describe('App', () => {
  it('shows the page title as the main heading', () => {
    render(<App resources={[]} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Resource Centre' }),
    ).toBeInTheDocument();
  });

  it('groups resources under category headings in the order from the brief', () => {
    render(
      <App
        resources={[
          buildResource({
            id: '002',
            category: 'Articles',
            title: 'The Science of Sleep',
          }),
          buildResource({
            id: '001',
            category: 'Podcasts',
            title: 'Mindful Moments',
          }),
        ]}
      />,
    );

    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent);

    expect(headings).toEqual(['Podcasts', 'Articles']);
  });
});