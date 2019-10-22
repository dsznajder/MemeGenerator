import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import perf from '@react-native-firebase/perf';
import { AppRegistry, YellowBox } from 'react-native';

import App from './App';
// @ts-ignore
import { name as appName } from './app.json';

analytics().setAnalyticsCollectionEnabled(!__DEV__);
crashlytics().setCrashlyticsCollectionEnabled(!__DEV__);
perf().setPerformanceCollectionEnabled(!__DEV__);

YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);
AppRegistry.registerComponent(appName, () => App);
