import { execFileSync, execSync } from 'node:child_process';
import path from 'node:path';

/**
 * Проверяет, что артефакты `graphql-codegen` и pathpida совпадают с закоммиченными.
 * После codegen — Prettier для `src/shared/api/generated/*.ts`; для `$path.ts` — как `pnpm pathpida`.
 */
function run(cmd, opts = {}) {
  execSync(cmd, { stdio: 'inherit', shell: true, ...opts });
}

run('pnpm exec graphql-codegen --config codegen.ts');
run('pnpm exec prettier --write "src/shared/api/generated/*.ts"');

run('pnpm exec pathpida --ignorePath .gitignore -o src/shared/routes');

const pathFile = path.join('src', 'shared', 'routes', '$path.ts');
run(`pnpm exec prettier --write ${JSON.stringify(pathFile)}`);

const pathRoute = path.join('src', 'shared', 'routes', '$path.ts');
execFileSync(
  'git',
  ['diff', '--exit-code', '--', 'src/shared/api/generated', pathRoute],
  { stdio: 'inherit' },
);
