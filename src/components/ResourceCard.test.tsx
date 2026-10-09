import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { buildResource } from '../test/buildResource';
import { ResourceCard } from './ResourceCard';

describe('ResourceCard', () => {
  it('shows the resource title as a heading', () => {
    render(
      <ResourceCard resource={buildResource({ title: 'Mindful Moments' })} />,
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
      />,
    );

    expect(screen.getByRole('img', { name: 'Mindful Moments' })).toHaveAttribute(
      'src',
      'https://example.com/mindful.jpg',
    );
  });

  it('shows the duration in minutes', () => {
    render(<ResourceCard resource={buildResource({ duration: 25 })} />);

    expect(screen.getByText('25 min')).toBeInTheDocument();
  });

  it('shows the resource tags', () => {
    render(
      <ResourceCard
        resource={buildResource({
          tags: ['wellbeing', 'mindfulness', 'relaxation'],
        })}
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
      />,
    );

    const tags = screen.getAllByRole('listitem').map((item) => item.textContent);

    expect(tags).toEqual(['wellbeing', 'mindfulness', 'relaxation']);
  });
});