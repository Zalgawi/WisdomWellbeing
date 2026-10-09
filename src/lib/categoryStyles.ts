import type { Category } from '../types';

interface CategoryStyle {
  gradient: string;
  tag: string;
  label: string;
  hoverTitle: string;
}

export const categoryStyles: Record<Category, CategoryStyle> = {
  Podcasts: {
    gradient: 'from-violet-500 to-fuchsia-500',
    tag: 'bg-violet-100 text-violet-700',
    label: 'text-violet-700',
    hoverTitle: 'group-hover:text-violet-700',
  },
  Articles: {
    gradient: 'from-sky-500 to-blue-500',
    tag: 'bg-sky-100 text-sky-700',
    label: 'text-sky-700',
    hoverTitle: 'group-hover:text-sky-700',
  },
  Newsletters: {
    gradient: 'from-amber-400 to-orange-500',
    tag: 'bg-amber-100 text-amber-800',
    label: 'text-amber-800',
    hoverTitle: 'group-hover:text-amber-800',
  },
  Recipes: {
    gradient: 'from-emerald-500 to-teal-500',
    tag: 'bg-emerald-100 text-emerald-700',
    label: 'text-emerald-700',
    hoverTitle: 'group-hover:text-emerald-700',
  },
  Fitness: {
    gradient: 'from-rose-500 to-orange-500',
    tag: 'bg-rose-100 text-rose-700',
    label: 'text-rose-700',
    hoverTitle: 'group-hover:text-rose-700',
  },
  Meditation: {
    gradient: 'from-indigo-500 to-violet-500',
    tag: 'bg-indigo-100 text-indigo-700',
    label: 'text-indigo-700',
    hoverTitle: 'group-hover:text-indigo-700',
  },
};