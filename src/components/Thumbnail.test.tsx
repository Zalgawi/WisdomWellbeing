import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Thumbnail } from './Thumbnail';

describe('Thumbnail', () => {
  it('shows the image with its alt text', () => {
    render(
      <Thumbnail
        src="https://example.com/mindful.jpg"
        alt="Mindful Moments"
      />,
    );

    expect(screen.getByRole('img', { name: 'Mindful Moments' })).toHaveAttribute(
      'src',
      'https://example.com/mindful.jpg',
    );
  });
});