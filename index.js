/**
 * @format
 */
import PushNotification, {Importance} from 'react-native-push-notification';
import { Platform } from 'react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';



PushNotification.createChannel(
    {
      channelId: "1234", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", 
      playSound: false, 
      soundName: "default", 
      importance: Importance.HIGH, 
      vibrate: true, 
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );




AppRegistry.registerComponent(appName, () => App);
