import { render, screen, fireEvent } from '@testing-library/react';
import FacetFilter from './FacetFilter';
import { CategoryType } from '../../types';

describe('FacetFilter Component', () => {
  const categories: CategoryType[] = [
    { id: '1', name: 'Category 1', count: 10, parent: '0' },
    { id: '2', name: 'Category 2', count: 5, parent: '0' },
  ];

  it('renders without crashing', () => {
    render(<FacetFilter categories={categories} />);
  });

  it('renders categories', () => {
    render(<FacetFilter categories={categories} />);

    categories.forEach((category) => {
      expect(screen.getByText(`${category.name} (${category.count})`)).toBeInTheDocument();
    });
  });

  it('handles selection of categories', () => {
    render(<FacetFilter categories={categories} />);
    
    fireEvent.click(screen.getByLabelText('Category 1 (10)'));

    expect(screen.getByText('Applied Filters')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
  });

  it('handles deselection of categories', () => {
    render(<FacetFilter categories={categories} />);
    
    fireEvent.click(screen.getByLabelText('Category 1 (10)'));
    fireEvent.click(screen.getByLabelText('Category 1 (10)'));

    expect(screen.queryByText('Applied Filters')).not.toBeInTheDocument();
  });

  it('handles removal of individual category', () => {
    render(<FacetFilter categories={categories} />);

    fireEvent.click(screen.getByLabelText('Category 1 (10)'));
    
    expect(screen.getByText('Category 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('×'));
  
    expect(screen.queryByText('Category 1')).not.toBeInTheDocument();
  });

  it('handles reset filters', () => {
    render(<FacetFilter categories={categories} />);

    fireEvent.click(screen.getByLabelText('Category 1 (10)'));
    fireEvent.click(screen.getByText('Reset Filters'));
    
    expect(screen.queryByText('Applied Filters')).not.toBeInTheDocument();
  });
});
