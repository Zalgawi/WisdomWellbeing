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
});