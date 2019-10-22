import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import perf from '@react-native-firebase/perf';
import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

analytics().setAnalyticsCollectionEnabled(!__DEV__);
crashlytics().setCrashlyticsCollectionEnabled(!__DEV__);
perf().setPerformanceCollectionEnabled(!__DEV__);

AppRegistry.registerComponent(appName, () => App);
