import lodash from 'lodash';
import { randomEmails, randomNames } from './constants';

export function pickRandomObject<T>(params: T[]): T | undefined {
  return lodash.sample(params);
}

export function pickRandomName(): string {
  return pickRandomObject(randomNames) || 'teste';
}

export function generateRandomEmail(): string {
  return `${pickRandomName()}@${pickRandomObject(randomEmails)}`;
}
