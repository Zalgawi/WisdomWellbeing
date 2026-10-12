# Resource Centre

A single page application for the HA | Wisdom Wellbeing Resource Centre. It displays wellbeing resources (podcasts, articles, newsletters, recipes, fitness and meditation) grouped by category, with search, date sorting and a details view.

Built with React, TypeScript, Vite and Tailwind CSS, and developed test-first with Vitest and React Testing Library.

## Getting started

```bash
git clone https://github.com/Zalgawi/WisdomWellbeing.git
cd WisdomWellbeing
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm test` | Runs the tests in watch mode |
| `npm run test:run` | Runs the tests once |
| `npm run lint` | Runs ESLint |
| `npm run build` | Type-checks with `tsc` and builds for production |

## What is built

| Requirement from the brief | Status | Where to look |
| --- | --- | --- |
| Resources grouped by category on first load | Done | `App.tsx`, `lib/groupByCategory.ts` |
| Each resource belongs to exactly one of the six categories | Done | `types.ts` |
| Card shows title, thumbnail, no more than 3 tags, and time in minutes | Done | `components/ResourceCard.tsx` |
| Optional: show all resource data (including description and date uploaded) on click | Done | `components/ResourceDetail.tsx` |
| Optional: filter by title/tags | Done | `lib/filterResources.ts`, search box in `App.tsx` |
| Optional: sort by category/date | Done (see [interpretation](#assumptions-and-interpretations)) | `lib/sortResources.ts`, sort control in `App.tsx` |
| Mock data instead of an API | Done | `data/resources.ts` |

### Behaviour in detail

- **Grouping.** Sections always appear in the order given in the brief (Podcasts, Articles, Newsletters, Recipes, Fitness, Meditation), regardless of the order of the data. A category with no matching resources is not shown.
- **Cards.** Show the title, thumbnail, duration and at most three tags. The whole card is clickable.
- **Details dialog.** Shows the thumbnail, category, title, duration, description, every tag and the upload date (formatted as, for example, "10 July 2025"). It closes with the Close button or the Escape key.
- **Search.** Matches the title or any tag, ignores letter case and surrounding spaces, and allows partial matches (`mind` finds `mindfulness`). An empty search shows everything, and a search with no matches shows a message.
- **Sort.** A "Sort by date" control with three options: default order, newest first and oldest first. Sorting applies within each category.
- **Broken thumbnails.** If an image fails to load, a placeholder with the same dimensions is shown, so the layout does not jump.

## Testing

Tests use Vitest and React Testing Library, with `user-event` for interactions.

- **Query by role and accessible name**, as a user or screen reader would, rather than by class or test ID. This tests behaviour and keeps tests independent of styling.
- **Unit tests** cover the pure functions and each component in isolation.
- **Integration-style tests** in `App.test.tsx` cover the connections between components: opening and closing the dialog, searching, sorting and focus return.
- **Test data** comes from a small `buildResource` builder, so each test only states the fields it cares about.

```bash
npm run test:run
```

## Data

The first six resources are the example data from the brief. I added eighteen more (four per category) so each category row has enough cards to scroll. Their thumbnails are `picsum.photos` placeholders, so the images are random photos rather than wellbeing-themed ones. One resource ("Understanding Burnout") has four tags on purpose, so the three-tag limit on cards is visible in the real UI.


## Project structure

```text
src/
  App.tsx                        page: search, sort, grouped sections, dialog state
  main.tsx                       entry point; the only place the mock data is imported
  types.ts                       CATEGORIES, Category and Resource types
  data/
    resources.ts                 typed mock data
  lib/
    groupByCategory.ts           groups resources by category
    filterResources.ts           title/tag search rules
    sortResources.ts             date sorting
    categoryStyles.ts            per-category accent colours
  components/
    CategorySection.tsx          a category heading with its row of cards
    ResourceCard.tsx             a single resource card
    ResourceDetail.tsx           the details dialog
    Thumbnail.tsx                image with a fallback placeholder
  test/
    buildResource.ts             test data builder
    setup.ts                     test set-up (jest-dom matchers, cleanup)
```

Each `lib` function and component has a matching `*.test.ts(x)` file next to it.