import React, { useState } from "react";
import { CategoryIdName, CategoryType } from "../../types";
import Category from "../Category/Category";
import './FacetFilter.css';

type FacetFilterProps = {
  categories: CategoryType[];
};

const FacetFilter: React.FC<FacetFilterProps> = ({ categories }) => {
  const [selected, setSelected] = useState<{ id: string; name: string }[]>([]);

  const handleSelect = (categories: { id: string; name: string }[]) => {
    setSelected([...selected, ...categories]);
  };
  
  const handleDeselect = (categories: CategoryIdName[]) => {
    const idsToDeselect = new Set(categories.map((category) => category.id));
    setSelected(selected.filter((category) => !idsToDeselect.has(category.id)));
  };

  const handleRemoveAll = () => {
    setSelected([]);
  };

  const handleRemoveCategory = (category: { id: string; name: string}) => {
    handleDeselect([category]);
  };

  return (
    <div className="facetFilter">
       <div className="filterWrapper">
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            selected={selected}
            onSelect={handleSelect}
            onDeselect={handleDeselect}
          />
        ))}
      </div>
      <div className="appliedFilters">
        {
          /*
          Can be moved to a different component AppliedFilters
          */
        }
        {selected.length > 0 && <h3>Applied Filters</h3>}
        <div className="selectedCategories">
          {selected.map((category) => (
            <div key={category.id} className="selectedCategory">
              <span>{category.name} </span>
              <button className="closeButton" onClick={() => handleRemoveCategory(category)}>&times;</button>
            </div>
          ))}
          </div>
        {selected.length > 0 && <button className="resetButton" onClick={handleRemoveAll}>Reset Filters</button>}
      </div>
    </div>
  );
};

export default FacetFilter;
