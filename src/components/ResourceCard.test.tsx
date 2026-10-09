import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { buildResource } from '../test/buildResource';
import { ResourceCard } from './ResourceCard';

describe('ResourceCard', () => {
  it('shows the resource title as a heading', () => {
    render(
      <ResourceCard
        resource={buildResource({ title: 'Mindful Moments' })}
        onSelect={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Mindful Moments' }),
    ).toBeInTheDocument();
  });

  it('shows the thumbnail image with the title as its alt text', () => {
    render(
      <ResourceCard
        resource={buildResource({
          title: 'Mindful Moments',
          thumbnail: 'https://example.com/mindful.jpg',
        })}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByRole('img', { name: 'Mindful Moments' })).toHaveAttribute(
      'src',
      'https://example.com/mindful.jpg',
    );
  });

  it('shows a placeholder when the thumbnail fails to load', () => {
    render(
      <ResourceCard
        resource={buildResource({ title: 'Mindful Moments' })}
        onSelect={vi.fn()}
      />,
    );

    fireEvent.error(screen.getByRole('img', { name: 'Mindful Moments' }));

    expect(screen.getByText('Image unavailable')).toBeInTheDocument();
  });

  it('shows the duration in minutes', () => {
    render(
      <ResourceCard
        resource={buildResource({ duration: 25 })}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText('25 min')).toBeInTheDocument();
  });

  it('shows the resource tags', () => {
    render(
      <ResourceCard
        resource={buildResource({
          tags: ['wellbeing', 'mindfulness', 'relaxation'],
        })}
        onSelect={vi.fn()}
      />,
    );

    const tags = screen.getAllByRole('listitem').map((item) => item.textContent);

    expect(tags).toEqual(['wellbeing', 'mindfulness', 'relaxation']);
  });

  it('shows no more than three tags', () => {
    render(
      <ResourceCard
        resource={buildResource({
          tags: ['wellbeing', 'mindfulness', 'relaxation', 'sleep'],
        })}
        onSelect={vi.fn()}
      />,
    );

    const tags = screen.getAllByRole('listitem').map((item) => item.textContent);

    expect(tags).toEqual(['wellbeing', 'mindfulness', 'relaxation']);
  });

  it('calls onSelect with the resource when its title is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const resource = buildResource({ title: 'Mindful Moments' });
    render(<ResourceCard resource={resource} onSelect={onSelect} />);

    await user.click(screen.getByRole('button', { name: 'Mindful Moments' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(resource);
  });
});