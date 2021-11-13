export const removeAllSpaces = (value: string): string => {
  return value.replace(/\s+/g, " ").trim();
};
