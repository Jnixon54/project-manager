import firebase from 'firebase';
import config from '../../../../firebaseconfig'

const fire = firebase.initializeApp(config);

export { fire };