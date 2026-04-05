import { execFileSync, execSync } from 'node:child_process';
import path from 'node:path';

const prettierCli = path.join(
  process.cwd(),
  'node_modules',
  'prettier',
  'bin',
  'prettier.cjs',
);

/**
 * Проверяет, что артефакты `graphql-codegen` и pathpida совпадают с закоммиченными.
 * После codegen — Prettier для сгенерированных `*.ts`; для `$path.ts` — как `pnpm pathpida`.
 *
 * Prettier запускается через `node …/prettier.cjs` (без shell): иначе в bash `$path` в аргументе
 * превращается в переменную окружения и путь ломается.
 */
function run(cmd, opts = {}) {
  execSync(cmd, { stdio: 'inherit', shell: true, ...opts });
}

function prettierWrite(...files) {
  execFileSync(process.execPath, [prettierCli, '--write', ...files], {
    stdio: 'inherit',
  });
}

run('pnpm exec graphql-codegen --config codegen.ts');

prettierWrite(
  path.join('src', 'shared', 'api', 'generated', 'graphql.ts'),
  path.join('src', 'shared', 'api', 'generated', 'apolloCachePolicies.ts'),
);

run('pnpm exec pathpida --ignorePath .gitignore -o src/shared/routes');

prettierWrite(path.join('src', 'shared', 'routes', '$path.ts'));

const pathRoute = path.join('src', 'shared', 'routes', '$path.ts');
execFileSync(
  'git',
  ['diff', '--exit-code', '--', 'src/shared/api/generated', pathRoute],
  { stdio: 'inherit' },
);
