import React, { useEffect, useState } from 'react';
import FacetFilter from './components/FacetFilter/FacetFilter';
import { fetchData } from './data/response';
import { buildTree } from './helpers/treeHelpers';
import { CategoryType } from './types';
import './App.css';


const App: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    fetchData().then((response) => {
      const categoryTree = buildTree(response.categories);
      setCategories(categoryTree);
    });
  }, []);

  return (
    <div className="App">
      <h1>Otrium Frontend challenge</h1>
      <h3>Building a facet filter</h3>
      <FacetFilter categories={categories} />
    </div>
  );
};

export default App;
