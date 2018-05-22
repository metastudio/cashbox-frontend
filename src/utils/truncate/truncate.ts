const truncate = (text: string, length: number = 30): string => {
  return `${text.length > length ? text.substr(0, length) + '...'  : text}`;
};

export { truncate };
