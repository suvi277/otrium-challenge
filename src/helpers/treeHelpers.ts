import { CategoryType } from "../types";

export function buildTree(categories: CategoryType[]): CategoryType[] {
  let tree: CategoryType[] = [];
  let lookup: { [key: string]: CategoryType & { children: CategoryType[] } } = {};

  categories.forEach((category) => {
    lookup[category.id] = { ...category, children: [] };
  });

  categories.forEach((category) => {
    const parentCategory = lookup[category.parent];
    const childCategory = lookup[category.id];

    if (category.parent === "0") {
      tree.push(childCategory);
    } else if (parentCategory) {
      parentCategory.children.push(childCategory);
    }
  });

  return tree;
}
