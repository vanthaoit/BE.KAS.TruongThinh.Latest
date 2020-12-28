import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBzqw9EBsGqkT9zYKTL87O7jNqFkjYnSkM',
  authDomain: 'imagestore-ae9f6.firebaseapp.com',
  databaseURL: 'https://imagestore-ae9f6.firebaseio.com',
  projectId: 'imagestore-ae9f6',
  storageBucket: 'imagestore-ae9f6.appspot.com',
  messagingSenderId: '91609553538',
  appId: '1:91609553538:web:6ff30324ab543ebc7b329b',
  measurementId: 'G-J6HRYCK2DG',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
