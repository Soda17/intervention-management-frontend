const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// L'astuce consiste à utiliser une fonction pour résoudre dynamiquement l'alias AsyncStorage, 
// évitant ainsi le blocage d'importation Windows au démarrage
config.resolver.extraNodeModules = new Proxy({}, {
  get: (target, name) => {
    if (name === 'react-native/Libraries/Storage/AsyncStorage') {
      return require.resolve('@react-native-async-storage/async-storage');
    }
    return name in target ? target[name] : undefined;
  }
});

module.exports = config;
