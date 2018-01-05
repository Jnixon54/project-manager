import firebase from 'firebase';
import config from '../../../firebaseconfig.js';

const fire = firebase.initializeApp(config);

export { fire };
