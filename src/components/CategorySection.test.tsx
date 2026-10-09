import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { buildResource } from '../test/buildResource';
import { CategorySection } from './CategorySection';

describe('CategorySection', () => {
  it('shows the category name as a heading', () => {
    render(<CategorySection category="Podcasts" resources={[]} />);

    expect(
      screen.getByRole('heading', { name: 'Podcasts' }),
    ).toBeInTheDocument();
  });

  it('shows a card for each resource, in order', () => {
    render(
      <CategorySection
        category="Podcasts"
        resources={[
          buildResource({ id: '001', title: 'Mindful Moments' }),
          buildResource({ id: '007', title: 'Sleep Stories' }),
        ]}
      />,
    );

    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);

    expect(titles).toEqual(['Mindful Moments', 'Sleep Stories']);
  });
});