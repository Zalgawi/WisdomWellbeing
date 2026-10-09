import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';
import { buildResource } from './test/buildResource';

describe('App', () => {
  it('shows the page title as the main heading', () => {
    render(<App resources={[]} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Resource Centre' }),
    ).toBeInTheDocument();
  });

  it('groups resources under category headings in the order from the brief', () => {
    render(
      <App
        resources={[
          buildResource({
            id: '002',
            category: 'Articles',
            title: 'The Science of Sleep',
          }),
          buildResource({
            id: '001',
            category: 'Podcasts',
            title: 'Mindful Moments',
          }),
        ]}
      />,
    );

    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent);

    expect(headings).toEqual(['Podcasts', 'Articles']);
  });

  it('opens a dialog with the resource details when a card is clicked', async () => {
    const user = userEvent.setup();
    render(
      <App
        resources={[
          buildResource({
            title: 'Mindful Moments',
            description: 'A calming podcast.',
          }),
        ]}
      />,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Mindful Moments' }));

    expect(
      screen.getByRole('dialog', { name: 'Mindful Moments' }),
    ).toHaveTextContent('A calming podcast.');
  });

  it('closes the dialog when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<App resources={[buildResource({ title: 'Mindful Moments' })]} />);

    await user.click(screen.getByRole('button', { name: 'Mindful Moments' }));
    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});