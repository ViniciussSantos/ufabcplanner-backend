import { camelCase, sample, words } from 'lodash';
import { randomEmails, randomNames } from './constants';

export function randomJoin(source: string[][], joiner = ''): string {
  return source.map(it => sample(it)).join(joiner);
}

export function generateRandomEmail(name: string = randomJoin(randomEmails.concat(randomNames))): string {
  return `${camelCase(words(name).reverse().join(' '))}@mock.com`;
}

export function generateRandomName(): string {
  return randomJoin(randomNames);
}
