import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';

console.disableYellowBox = false;

AppRegistry.registerComponent(appName, () => App);
