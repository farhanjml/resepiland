import { ShoppingListItem } from '../types/database';

interface GroupedItems {
  [key: string]: {
    recipeName: string;
    creatorId?: string;
    creatorName?: string;
    items: ShoppingListItem[];
  };
}

export function groupShoppingItems(items: ShoppingListItem[]): GroupedItems {
  return items.reduce((acc, item) => {
    if (!acc[item.recipe_id]) {
      acc[item.recipe_id] = {
        recipeName: item.recipe_name,
        creatorId: item.recipe?.creator_id,
        creatorName: item.creator_name,
        items: []
      };
    }
    acc[item.recipe_id].items.push(item);
    return acc;
  }, {} as GroupedItems);
}