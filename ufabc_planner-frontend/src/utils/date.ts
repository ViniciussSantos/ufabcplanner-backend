export const toShortDate = (date: Date) => {
  return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};
