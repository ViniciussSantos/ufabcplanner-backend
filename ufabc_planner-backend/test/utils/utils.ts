import lodash from 'lodash';
import { randomEmails, randomNames } from './constants';

export function pickRandomObject<T>(params: T[]): T | undefined {
  return lodash.sample(params);
}

export function pickRandomName(): string | undefined {
  return pickRandomObject(randomNames);
}

export function generateRandomEmail(): string {
  return `${pickRandomName()}@${pickRandomObject(randomEmails)}`;
}
