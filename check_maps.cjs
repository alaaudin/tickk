try {
  const maps = require('react-simple-maps');
  const imports = ['ComposableMap', 'Geographies', 'Geography', 'Marker'];
  imports.forEach(name => {
    if (maps[name] === undefined) {
      console.log(`react-simple-maps import undefined: ${name}`);
    } else {
      console.log(`react-simple-maps import defined: ${name} (type: ${typeof maps[name]})`);
    }
  });
} catch (err) {
  console.log('Error importing react-simple-maps:', err.message);
}
