import { fireEvent, render, screen } from '@testing-library/react';
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

  it('shows a placeholder instead of the image when it fails to load', () => {
    render(
      <Thumbnail
        src="https://example.com/broken.jpg"
        alt="Mindful Moments"
      />,
    );

    fireEvent.error(screen.getByRole('img', { name: 'Mindful Moments' }));

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('Image unavailable')).toBeInTheDocument();
  });
});