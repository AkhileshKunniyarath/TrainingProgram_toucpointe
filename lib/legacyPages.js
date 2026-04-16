import { getPageContent } from './content-store';

export async function getLegacyPage(key) {
  return getPageContent(key);
}
