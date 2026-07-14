const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const code = fs.readFileSync('Dashboard_restored.tsx', 'utf8');

const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx', 'typescript']
});

const globals = new Set();
traverse(ast, {
  Identifier(path) {
    if (path.isReferencedIdentifier() && !path.scope.hasBinding(path.node.name)) {
      globals.add(path.node.name);
    }
  }
});
console.log(Array.from(globals).join(', '));
