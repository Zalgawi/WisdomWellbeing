import { render, screen } from '@testing-library/react';
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
});