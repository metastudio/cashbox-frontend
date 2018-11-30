import * as PathToRegexp from 'path-to-regexp';

const createPath = (path: string) => {
  const toPath = PathToRegexp.compile(path);
  toPath.toString = () => path;
  return toPath;
};

export const rootPath = createPath('/');

export const statisticPath = createPath('/statistic');
export const balanceStatisticPath = createPath('/statistic/balance');
export const categoriesStatisticPath = createPath('/statistic/categories');
export const customersStatisticPath = createPath('/statistic/customers');
