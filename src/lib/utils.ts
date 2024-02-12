export const getSanitizedInput = (input: string) => {
  return input.replace(/\W+/g, ' ').trim().split(' ');
};

export const getUniqueItems = (input: string[]) => {
  return Array.from(new Set(input));
};

export const getValidItems = (input: string[]) => {
  // Removes empty items and items that start with '_'
  return input.filter((item) => {
    return item && item[0] !== '_';
  });
};
