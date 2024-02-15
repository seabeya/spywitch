export const getSanitizedInput = (input: string) => {
  return input.replace(/\W+/g, ' ').trim().toLowerCase().split(' ');
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

export const formatMilliseconds = (milliseconds: number) => {
  const remainder = milliseconds % (1000 * 60 * 60);

  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(remainder / (1000 * 60));
  const seconds = Math.floor((remainder % (1000 * 60)) / 1000);

  let formattedTime = '';
  if (hours > 0) {
    formattedTime += `${hours.toString().padStart(2, '0')}:`;
  }
  formattedTime += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedTime;
};
