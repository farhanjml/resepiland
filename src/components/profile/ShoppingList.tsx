import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { ShoppingListItem } from '../../types/database';
import ShoppingListGroup from './shopping/ShoppingListGroup';
import { groupShoppingItems } from '../../utils/shopping';

interface ShoppingListProps {
  items: ShoppingListItem[];
}

const ShoppingList = ({ items }: ShoppingListProps) => {
  const groupedItems = groupShoppingItems(items);

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Your shopping list is empty.</p>
          <p className="text-gray-500 text-sm mt-2">Add ingredients from recipes to your list.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg divide-y">
      {Object.entries(groupedItems).map(([recipeId, group]) => (
        <ShoppingListGroup
          key={recipeId}
          recipeId={recipeId}
          recipeName={group.recipeName}
          creatorId={group.creatorId}
          creatorName={group.creatorName}
          items={group.items}
        />
      ))}
    </div>
  );
};

export default ShoppingList;