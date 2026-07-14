const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const code = fs.readFileSync('dist/assets/index-D7lN7HVb.js', 'utf8');

const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx']
});

let dashboardFunc = null;

traverse(ast, {
  FunctionDeclaration(path) {
    if (path.node.id && path.node.id.name === 'Dashboard') {
      dashboardFunc = path.node;
      path.stop();
    }
  },
  VariableDeclarator(path) {
    if (path.node.id && path.node.id.name === 'Dashboard') {
      dashboardFunc = path.parent;
      path.stop();
    }
  }
});

if (dashboardFunc) {
  // Try to transform jsxRuntime.jsx to actual JSX
  traverse(ast, {
    CallExpression(path) {
      const callee = path.node.callee;
      if (t.isIdentifier(callee) && (callee.name === 'jsx' || callee.name === 'jsxs' || callee.name === 'e' || callee.name === 't' || callee.name === 'r' || callee.name === 'a')) {
        // We'll need a better heuristic for minified jsx calls.
      }
    }
  });

  const output = generate(dashboardFunc, {}).code;
  fs.writeFileSync('Dashboard_decompiled.js', output);
  console.log("Decompiled Dashboard!");
} else {
  console.log("Dashboard not found");
}
