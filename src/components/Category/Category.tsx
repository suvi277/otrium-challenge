import React, { useState } from 'react';
import { CategoryType } from '../../types';
import Checkbox from '../Checkbox/Checkbox';
import './Category.css';

type CategoryProps = {
  category: CategoryType;
  selected: { id: string; name: string }[];
  onSelect: (categories: { id: string; name: string }[]) => void;
  onDeselect: (categories: { id: string; name: string }[]) => void;
};

const Category: React.FC<CategoryProps> = ({ category, selected, onSelect, onDeselect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = selected.map(({id}) => id).includes(category.id);
  const checkAllSelected = (category: CategoryType): boolean => {
    if (selected.map(({id}) => id).includes(category.id)) {
      if (category.children) {
        return category.children.every((child) => checkAllSelected(child));
      }
      return true;
    }
    return false;
  };

  const isAllSelected = checkAllSelected(category);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, handler: () => void) => {
    e.stopPropagation();
    handler();
  };

  const handleSelect = () => {
    onSelect([{ id: category.id, name: category.name }]);
  };

  const handleDeselect = () => {
    onDeselect([{ id: category.id, name: category.name }]);
  };

  const toggleChildren = (cat: CategoryProps['category'], select: boolean): { id: string; name: string }[] => {
    const allCategories: { id: string; name: string }[] = [{ id: cat.id, name: cat.name }];
    cat.children?.forEach((child) => {
      allCategories.push(...toggleChildren(child, select));
    });
    return allCategories;
  };
  
  const handleSelectAll = () => {
    const idsToSelect = toggleChildren(category, true);
    onSelect(idsToSelect);
  };
  
  const handleDeselectAll = () => {
    const idsToDeselect = toggleChildren(category, false);
    onDeselect(idsToDeselect);
  };

  return (
    <>
      <div className={'categoryWrapper'}>
        <Checkbox
          id={category.id}
          checked={isSelected}
          label={`${category.name} (${category.count})`}
          labelClickable={!!category?.children?.length}
          onLabelClick={handleToggle}
          onChange={(e) => handleCheckboxChange(e, isSelected ? handleDeselect : handleSelect)}
        />
        {category.children && category.children.length > 1 && isOpen && (
          <Checkbox
            id={'select_all'}
            checked={isAllSelected}
            label={`Select all`}
            onChange={(e) => {
              e.stopPropagation();
              isAllSelected ? handleDeselectAll() : handleSelectAll();
            }}
          />
        )}
      </div>
      {isOpen && category.children && (
        <div className={'childrenContainer'}>
          {category.children.map((child) => (
            <Category
              key={child.id}
              category={child}
              selected={selected}
              onSelect={onSelect}
              onDeselect={onDeselect}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Category;
