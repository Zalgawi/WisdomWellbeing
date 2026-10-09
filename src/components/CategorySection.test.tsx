import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategorySection } from './CategorySection';

describe('CategorySection', () => {
  it('shows the category name as a heading', () => {
    render(<CategorySection category="Podcasts" resources={[]} />);

    expect(
      screen.getByRole('heading', { name: 'Podcasts' }),
    ).toBeInTheDocument();
  });
});