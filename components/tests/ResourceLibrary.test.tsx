import { render, screen, fireEvent } from '@testing-library/react';
import ResourceLibrary from '../ResourceLibrary';
import { Resource } from '../ResourceCard';
import { expect, test, vi } from 'vitest';

const mockResources: Resource[] = [
  { id: '1', title: 'React Basics', description: 'Learn the fundamentals of React.', learningArea: 'Web Development', level: 1, tags: ['react', 'web'] },
  { id: '2', title: 'Astro for Beginners', description: 'An introduction to the Astro framework.', learningArea: 'Web Development', level: 2, tags: ['astro', 'web'] },
  { id: '3', title: 'Python Data Science', description: 'Explore data science with Python.', learningArea: 'Data Science', level: 3, tags: ['python', 'data'] },
];

test('renders resource library and filters resources', () => {
  render(<ResourceLibrary resources={mockResources} />);

  // All resources should be visible initially
  expect(screen.getByText('React Basics')).toBeInTheDocument();
  expect(screen.getByText('Astro for Beginners')).toBeInTheDocument();
  expect(screen.getByText('Python Data Science')).toBeInTheDocument();

  // Filter by learning area
  fireEvent.click(screen.getByRole('button', { name: /Data Science/i }));
  expect(screen.queryByText('React Basics')).not.toBeInTheDocument();
  expect(screen.queryByText('Astro for Beginners')).not.toBeInTheDocument();
  expect(screen.getByText('Python Data Science')).toBeInTheDocument();

  // Reset filter
  fireEvent.click(screen.getByRole('button', { name: /All/i }));
  expect(screen.getByText('React Basics')).toBeInTheDocument();
  expect(screen.getByText('Astro for Beginners')).toBeInTheDocument();
  expect(screen.getByText('Python Data Science')).toBeInTheDocument();

  // Search by keyword
  const searchInput = screen.getByPlaceholderText('Search by keyword...');
  fireEvent.change(searchInput, { target: { value: 'React' } });
  expect(screen.getByText('React Basics')).toBeInTheDocument();
  expect(screen.queryByText('Astro for Beginners')).not.toBeInTheDocument();
  expect(screen.queryByText('Python Data Science')).not.toBeInTheDocument();
});
