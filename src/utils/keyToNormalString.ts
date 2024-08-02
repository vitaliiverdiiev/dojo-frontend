export const keyToNormalString = (input: string): string => {
  if (!input) return '';

  const isCamelCase = /[a-z][A-Z]/.test(input);

  if (isCamelCase) {
    return input.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  } else {
    return input.replace(/_/g, ' ').toLowerCase();
  }
};
