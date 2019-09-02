import { PermissionsAndroid } from 'react-native';
import firebase from 'react-native-firebase';

const requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'Cool Photo App Camera Permission',
            message: 'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return granted;

            console.log('You can use the camera');
        } else {
            console.log('Camera permission denied');
        }
    } catch (err) {
        // console.warn(err);
        return err;
    }
};

const requestGalleryPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
            title: 'Cool Photo App Camera Permission',
            message: 'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return granted;
            console.log('You can use the camera');
        } else {
            console.log('Camera permission denied');
        }
    } catch (err) {
        // console.warn(err);
        return err;
    }
};

const requestFirebaseMessagingPermission = async () => {
    try {
        let granted = await firebase.messaging().requestPermission();
        console.log('granted: ', granted);
        if (granted) {
            checkFirebasePermission();
        }
    } catch (error) {
        console.log('error: ', error);
    }
};

const getFirebaseToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.warn('before fcmToken: ', fcmToken);
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            console.warn('after fcmToken: ', fcmToken);
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
};

const checkFirebasePermission = () => {
    try {
        firebase.messaging().hasPermission().then((enabled) => {
            if (enabled) {
                console.warn('Permission granted');
                this.getToken();
            } else {
                console.warn('Request Permission');
                this.requestFirebaseMessagingPermission();
            }
        });
    } catch (error) {
        console.log('error: ', error);
    }
};

export {
    requestCameraPermission,
    requestGalleryPermission,
    getFirebaseToken,
    requestFirebaseMessagingPermission,
    checkFirebasePermission
};
