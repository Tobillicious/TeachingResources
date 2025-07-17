import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { expect, test } from 'vitest';

test('renders header with navigation links', () => {
  render(<Header />);

  // Check for the main title
  expect(screen.getByText('Te Kete Ako')).toBeInTheDocument();

  // Check for navigation links
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Resources')).toBeInTheDocument();
  expect(screen.getByText('Lesson Plans')).toBeInTheDocument();
  expect(screen.getByText('Agent Log')).toBeInTheDocument();
});
