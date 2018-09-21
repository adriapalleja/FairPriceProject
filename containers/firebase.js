import firebase from 'firebase';
import 'firebase/database';
const uuidv4 = require('uuid/v4');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBXuy-OoNPmJ0IwihwmnkPLp8dcqHaWrh8",
  authDomain: "fairprice-32f08.firebaseapp.com",
  databaseURL: "https://fairprice-32f08.firebaseio.com",
  projectId: "fairprice-32f08",
  storageBucket: "fairprice-32f08.appspot.com",
  messagingSenderId: "176853120503"
};
firebase.initializeApp(config);

export const db = firebase.database();
export const postsRef = db.ref('posts');

export const postProduct = (product,quantity,price,location) => {
  if (product !== '' && quantity > 0 && price > 0 && location !== '') {
    const id = uuidv4();
    db.ref('posts/'+id).set({id: id, product: product, quantity: quantity, 
      price: price, location: location});
    return true;
  } else {
    return false;
  }
}  

export const editProduct = (post) => {
  if (post.product !== '' && post.quantity > 0 && post.price > 0 && post.location !== '') {
    db.ref('posts/'+post.id).set(post);
    return true;
  } else return false;
}

export const createUser = async (user) => {
  if (user.password === user.double_pass && user.username && user.full_name && user.phone_number) {
    user.id = uuidv4();
    delete user.double_pass;
    db.ref('users/'+user.id).set(user);
    return true;
  } else return false;
}