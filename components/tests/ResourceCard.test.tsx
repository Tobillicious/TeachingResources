import { render, screen } from '@testing-library/react';
import ResourceCard, { Resource } from '../ResourceCard';
import { expect, test } from 'vitest';

const mockResource: Resource = {
  id: '1',
  title: 'Test Resource',
  description: 'This is a test resource.',
  learningArea: 'Testing',
  level: 1,
  tags: ['tag1', 'tag2'],
};

test('renders resource card with correct data', () => {
  render(<ResourceCard resource={mockResource} />);

  expect(screen.getByText('Test Resource')).toBeInTheDocument();
  expect(screen.getByText('This is a test resource.')).toBeInTheDocument();
  expect(screen.getByText('Testing')).toBeInTheDocument();
  expect(screen.getByText('Level 1')).toBeInTheDocument();
  expect(screen.getByText('View Resource')).toBeInTheDocument();
});
