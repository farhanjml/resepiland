import { ShoppingListItem } from '../types/database';

export const formatShoppingList = (
  recipeName: string, 
  items: ShoppingListItem[], 
  creatorName?: string
): string => {
  const title = creatorName 
    ? `📝 ${recipeName}\nby ${creatorName}`
    : `📝 ${recipeName}`;
    
  const header = `${title}\n${'─'.repeat(40)}\n`;
  const ingredients = items.map(item => `• ${item.ingredient}`).join('\n');
  return `${header}\n${ingredients}\n`;
};