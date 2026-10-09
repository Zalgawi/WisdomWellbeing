import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { buildResource } from '../test/buildResource';
import { CategorySection } from './CategorySection';

describe('CategorySection', () => {
  it('shows the category name as a heading', () => {
    render(
      <CategorySection category="Podcasts" resources={[]} onSelect={vi.fn()} />,
    );

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
        onSelect={vi.fn()}
      />,
    );

    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);

    expect(titles).toEqual(['Mindful Moments', 'Sleep Stories']);
  });

  it('calls onSelect with the resource whose card was clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const second = buildResource({ id: '007', title: 'Sleep Stories' });
    render(
      <CategorySection
        category="Podcasts"
        resources={[
          buildResource({ id: '001', title: 'Mindful Moments' }),
          second,
        ]}
        onSelect={onSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Sleep Stories' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(second);
  });
});