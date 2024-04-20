export const isValidInput = (input: string) => {
  return input.length > 0 && input.length <= 25 && input[0] !== '_' && /\W+/g.test(input) === false;
};

export const getUniqueItems = (input: string[]) => {
  return Array.from(new Set(input));
};

export const isEmpty = (items: string[]) => {
  return items.length === 0;
};
