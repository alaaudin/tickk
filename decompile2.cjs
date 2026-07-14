const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const code = fs.readFileSync('dist/assets/index-D7lN7HVb.js', 'utf8');

const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx']
});

let dashboardFunc = null;

traverse(ast, {
  StringLiteral(path) {
    if (path.node.value === 'Interaction Analytics Over Time') {
      // Find the closest function declaration or expression
      const func = path.findParent(p => p.isFunctionDeclaration() || p.isFunctionExpression() || p.isArrowFunctionExpression());
      if (func) {
        dashboardFunc = func.node;
        path.stop();
      }
    }
  }
});

if (dashboardFunc) {
  const output = generate(dashboardFunc, {}).code;
  fs.writeFileSync('Dashboard_decompiled.js', output);
  console.log("Decompiled Dashboard! Size:", output.length);
} else {
  console.log("String not found!");
}
