import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyDG0mwYNB1ITSelSm8rk0uEEMeC35pd1f4',
  authDomain: 'groupii-c7929.firebaseapp.com',
  databaseURL: 'https://groupii-c7929.firebaseio.com',
  projectId: 'groupii-c7929',
  storageBucket: 'groupii-c7929.appspot.com',
  messagingSenderId: '507813912897'
};

const fire = firebase.initializeApp(config);

export { fire };
