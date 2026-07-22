export const formatDate = (date: any) => {
  const formattedDate = new Date(date);
  return formattedDate.toDateString();
};
