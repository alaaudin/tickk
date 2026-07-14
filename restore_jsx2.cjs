const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const code = fs.readFileSync('Dashboard_decompiled.js', 'utf8');

const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx']
});

traverse(ast, {
  CallExpression(path) {
    const { callee, arguments: args } = path.node;
    if (t.isMemberExpression(callee) && t.isIdentifier(callee.property) && callee.property.name === 'jsxDEV') {
      const [typeArg, propsArg] = args;
      
      let elementType;
      if (t.isStringLiteral(typeArg)) {
        elementType = t.jsxIdentifier(typeArg.value);
      } else if (t.isIdentifier(typeArg)) {
        elementType = t.jsxIdentifier(typeArg.name);
      } else if (t.isMemberExpression(typeArg)) {
        elementType = t.jsxMemberExpression(
          t.jsxIdentifier(typeArg.object.name),
          t.jsxIdentifier(typeArg.property.name)
        );
      } else {
        return;
      }

      const attributes = [];
      let children = [];

      if (t.isObjectExpression(propsArg)) {
        for (const prop of propsArg.properties) {
          if (t.isObjectProperty(prop)) {
            let keyName;
            if (t.isIdentifier(prop.key)) {
              keyName = prop.key.name;
            } else if (t.isStringLiteral(prop.key)) {
              keyName = prop.key.value;
            }

            if (keyName === 'children') {
              if (t.isArrayExpression(prop.value)) {
                children = prop.value.elements.map(el => {
                  if (t.isStringLiteral(el)) return t.jsxExpressionContainer(el);
                  if (t.isJSXElement(el) || t.isJSXFragment(el)) return el;
                  return t.jsxExpressionContainer(el);
                });
              } else {
                if (t.isStringLiteral(prop.value)) {
                  children = [t.jsxExpressionContainer(prop.value)];
                } else if (t.isJSXElement(prop.value) || t.isJSXFragment(prop.value)) {
                  children = [prop.value];
                } else {
                  children = [t.jsxExpressionContainer(prop.value)];
                }
              }
            } else {
              let valueNode;
              if (t.isStringLiteral(prop.value)) {
                valueNode = prop.value;
              } else {
                valueNode = t.jsxExpressionContainer(prop.value);
              }
              attributes.push(t.jsxAttribute(t.jsxIdentifier(keyName), valueNode));
            }
          }
        }
      }

      const openingElement = t.jsxOpeningElement(elementType, attributes, children.length === 0);
      const closingElement = children.length === 0 ? null : t.jsxClosingElement(elementType);

      const jsxElement = t.jsxElement(openingElement, closingElement, children);
      path.replaceWith(jsxElement);
    }
  }
});

const output = generate(ast, {}).code;
fs.writeFileSync('Dashboard_restored.tsx', output);
console.log("Restored JSX! (v2)");
