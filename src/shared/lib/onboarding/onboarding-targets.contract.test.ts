import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { onboardingSelector } from './onboarding-selectors';
import {
  ONBOARDING_TARGET_IDS,
  OnboardingTargetId,
} from './onboarding-target-ids';

const collectSourceFiles = (dir: string): string[] => {
  const out: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.next') continue;
      out.push(...collectSourceFiles(p));
    } else if (
      e.isFile() &&
      (e.name.endsWith('.tsx') ||
        e.name.endsWith('.ts') ||
        e.name.endsWith('.mts'))
    ) {
      out.push(p);
    }
  }
  return out;
};

describe('onboarding data-onboarding contract', () => {
  const srcRoot = path.join(process.cwd(), 'src');
  const files = collectSourceFiles(srcRoot);
  const blob = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');

  it('каждый ключ ONBOARDING_TARGET_IDS используется как ONBOARDING_TARGET_IDS.<key>', () => {
    const keys = Object.keys(ONBOARDING_TARGET_IDS) as Array<
      keyof typeof ONBOARDING_TARGET_IDS
    >;
    for (const key of keys) {
      expect(blob.includes(`ONBOARDING_TARGET_IDS.${String(key)}`)).toBe(true);
    }
  });

  it('onboardingSelector даёт согласованный селектор', () => {
    const first = Object.values(ONBOARDING_TARGET_IDS)[0];
    expect(onboardingSelector(first)).toBe(`[data-onboarding="${first}"]`);
  });

  it('литералы data-onboarding="..." в TSX входят в словарь', () => {
    const allowed = new Set(Object.values(ONBOARDING_TARGET_IDS));
    const tsxFiles = files.filter(
      (f) => f.endsWith('.tsx') && !f.includes('.test.'),
    );
    for (const file of tsxFiles) {
      const content = fs.readFileSync(file, 'utf8');
      for (const m of content.matchAll(/data-onboarding="([^"]+)"/g)) {
        expect(allowed.has(m[1] as OnboardingTargetId)).toBe(true);
      }
    }
  });
});
