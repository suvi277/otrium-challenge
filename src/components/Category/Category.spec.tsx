import { render, screen, fireEvent } from '@testing-library/react';
import Category from './Category';
import { CategoryType } from '../../types';

describe('Category Component', () => {
  const category: CategoryType = {
    id: '1',
    name: 'Category 1',
    count: 10,
    parent: '0',
    children: [
      { id: '2', name: 'Subcategory 1', count: 5, parent: '1' },
      { id: '3', name: 'Subcategory 2', count: 5, parent: '1' },
    ],
  };

  it('renders without crashing', () => {
    render(
      <Category
        category={category}
        selected={[]}
        onSelect={() => {}}
        onDeselect={() => {}}
      />
    );

    expect(screen.getByText('Category 1 (10)')).toBeInTheDocument();
  });

  it('handles selection and deselection of categories', () => {
    const onSelect = jest.fn();
    const onDeselect = jest.fn();
  
    const { rerender } = render(
        <Category
          category={category}
          selected={[]}
          onSelect={onSelect}
          onDeselect={onDeselect}
        />
      );
        
    fireEvent.click(screen.getByLabelText('Category 1 (10)'));

    expect(onSelect).toHaveBeenCalledWith([{ id: '1', name: 'Category 1' }]);

    rerender(
        <Category
          category={category}
          selected={[{ id: '1', name: 'Category 1' }]}
          onSelect={onSelect}
          onDeselect={onDeselect}
        />
      );

    fireEvent.click(screen.getByLabelText('Category 1 (10)'));

    expect(onDeselect).toHaveBeenCalledWith([{ id: '1', name: 'Category 1' }]);
  });

  it('toggles children categories', () => {
    render(
      <Category
        category={category}
        selected={[]}
        onSelect={() => {}}
        onDeselect={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Category 1 (10)'));

    expect(screen.getByText('Subcategory 1 (5)')).toBeInTheDocument();
  });

  it('handles select all and deselect all for children', () => {
    const onSelect = jest.fn();
    const onDeselect = jest.fn();

    const { rerender } = render(
    <Category
      category={category}
      selected={[]}
      onSelect={onSelect}
      onDeselect={onDeselect}
    />
  );

    fireEvent.click(screen.getByText('Category 1 (10)'));
    fireEvent.click(screen.getByLabelText('Select All'));

    expect(onSelect).toHaveBeenCalledWith([
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Subcategory 1' },
      { id: '3', name: 'Subcategory 2' },
    ]);

    rerender(
        <Category
          category={category}
          selected={[
            { id: '1', name: 'Category 1' },
            { id: '2', name: 'Subcategory 1' },
            { id: '3', name: 'Subcategory 2' },
          ]}
          onSelect={onSelect}
          onDeselect={onDeselect}
        />
      );

    fireEvent.click(screen.getByLabelText('Select All'));

    expect(onDeselect).toHaveBeenCalledWith([
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Subcategory 1' },
      { id: '3', name: 'Subcategory 2' },
    ]);
  });
});
