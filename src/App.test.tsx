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

  it('closes the dialog when Escape is pressed', async () => {
    const user = userEvent.setup();
    render(<App resources={[buildResource({ title: 'Mindful Moments' })]} />);

    await user.click(screen.getByRole('button', { name: 'Mindful Moments' }));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('returns focus to the card that opened the dialog when it closes', async () => {
    const user = userEvent.setup();
    render(<App resources={[buildResource({ title: 'Mindful Moments' })]} />);
    const card = screen.getByRole('button', { name: 'Mindful Moments' });

    await user.click(card);
    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(card).toHaveFocus();
  });

  it('narrows the visible resources as the user types in the search box', async () => {
    const user = userEvent.setup();
    render(
      <App
        resources={[
          buildResource({ id: '001', title: 'Mindful Moments' }),
          buildResource({ id: '002', title: 'The Science of Sleep' }),
        ]}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Mindful Moments' }),
    ).toBeInTheDocument();

    await user.type(
      screen.getByRole('searchbox', { name: 'Search resources' }),
      'sleep',
    );

    expect(
      screen.getByRole('button', { name: 'The Science of Sleep' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Mindful Moments' }),
    ).not.toBeInTheDocument();
  });

  it('shows a message when no resources match the search', async () => {
    const user = userEvent.setup();
    render(<App resources={[buildResource({ title: 'Mindful Moments' })]} />);

    await user.type(
      screen.getByRole('searchbox', { name: 'Search resources' }),
      'zzz',
    );

    expect(screen.getByRole('status')).toHaveTextContent(
      'No resources match your search.',
    );
  });

  it('shows no message when nothing has been searched', () => {
    render(<App resources={[]} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});