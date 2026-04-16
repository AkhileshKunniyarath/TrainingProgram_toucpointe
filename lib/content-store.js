import 'server-only';

import { promises as fs } from 'fs';
import path from 'path';
import { unstable_noStore as noStore } from 'next/cache';

const contentFilePath = path.join(process.cwd(), 'data', 'site-content.json');

function isReadOnlyDeployment() {
  return process.env.CONTENT_READ_ONLY === 'true' || process.env.VERCEL === '1';
}

async function readContentFile() {
  const raw = await fs.readFile(contentFilePath, 'utf8');
  return JSON.parse(raw);
}

export async function getSiteContent() {
  noStore();
  return readContentFile();
}

export async function getPageContent(pageKey) {
  const content = await getSiteContent();
  const page = content.pages?.[pageKey];

  if (!page) {
    throw new Error(`Unknown page content key: ${pageKey}`);
  }

  return page;
}

export async function updateSiteContent(nextContent) {
  if (isReadOnlyDeployment()) {
    throw new Error(
      'Content editing is disabled in this deployment. Use local development or connect persistent storage.',
    );
  }

  const formatted = `${JSON.stringify(nextContent, null, 2)}\n`;
  await fs.writeFile(contentFilePath, formatted, 'utf8');
  return nextContent;
}

export function getContentFilePath() {
  return contentFilePath;
}

export function canEditContent() {
  return !isReadOnlyDeployment();
}
