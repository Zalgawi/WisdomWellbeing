import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { buildResource } from '../test/buildResource';
import { ResourceDetail } from './ResourceDetail';

describe('ResourceDetail', () => {
  it('shows the resource title and description in a dialog', () => {
    render(
      <ResourceDetail
        resource={buildResource({
          title: 'Mindful Moments',
          description: 'A calming podcast.',
        })}
        onClose={vi.fn()}
      />,
    );

    const dialog = screen.getByRole('dialog', { name: 'Mindful Moments' });

    expect(dialog).toHaveTextContent('A calming podcast.');
  });

  it('shows the upload date in a readable format', () => {
    render(
      <ResourceDetail
        resource={buildResource({ date_uploaded: '2025-07-10' })}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText('10 July 2025')).toBeInTheDocument();
  });

  it('shows the thumbnail image with the title as its alt text', () => {
    render(
      <ResourceDetail
        resource={buildResource({
          title: 'Mindful Moments',
          thumbnail: 'https://example.com/mindful.jpg',
        })}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByRole('img', { name: 'Mindful Moments' })).toHaveAttribute(
      'src',
      'https://example.com/mindful.jpg',
    );
  });

  it('shows a placeholder when the thumbnail fails to load', () => {
    render(
      <ResourceDetail
        resource={buildResource({ title: 'Mindful Moments' })}
        onClose={vi.fn()}
      />,
    );

    fireEvent.error(screen.getByRole('img', { name: 'Mindful Moments' }));

    expect(screen.getByText('Image unavailable')).toBeInTheDocument();
  });

  it('shows the category and the duration in minutes', () => {
    render(
      <ResourceDetail
        resource={buildResource({ category: 'Meditation', duration: 15 })}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText('Meditation')).toBeInTheDocument();
    expect(screen.getByText('15 min')).toBeInTheDocument();
  });

  it('shows the resource tags', () => {
    render(
      <ResourceDetail
        resource={buildResource({
          tags: ['wellbeing', 'mindfulness', 'relaxation'],
        })}
        onClose={vi.fn()}
      />,
    );

    const tags = screen.getAllByRole('listitem').map((item) => item.textContent);

    expect(tags).toEqual(['wellbeing', 'mindfulness', 'relaxation']);
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ResourceDetail resource={buildResource()} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ResourceDetail resource={buildResource()} onClose={onClose} />);

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('moves focus to the close button when it opens', () => {
    render(<ResourceDetail resource={buildResource()} onClose={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
  });
});