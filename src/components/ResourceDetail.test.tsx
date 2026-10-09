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
});