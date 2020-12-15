import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

 export const initializeLoginFrameWork = () => {
   if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);//firebase.config.js thke call kora hyece
   }
}

export const handleGoogleSignIn = () =>{
    const Googleprovider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(Googleprovider)
     
    .then(result => {
      const {displayName, photoURL,email} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name:displayName,
        photo: photoURL,
        email: email,
        success: true
      }

      return signedInUser;
      const token = result.credential.accessToken;
    })

    .catch(err =>{ 
      console.log(err)
      const errorMessage = err.message;
      console.log(errorMessage)
      const errorCode = err.code;
    })
  }

export  const handleFbSignIn  = () => {
    const FBprovider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(FBprovider)
    .then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
    })
    
    .catch(function(error) {
     
      var errorCode = error.code;
      var errorMessage = error.message;
      
      var email = error.email;
     
      var credential = error.credential;
    });
  }

  export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res =>{
        const signedOutUser ={
         isSignedIn: false,
         name: '',
         photo: '',
         email: '',
         success: false
       }
      return signedOutUser;
    })

    .catch(err =>{
       console.log(err);
    })
  }

  export const createUserWithEmailAndPassword = (name,email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })

    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword = (email,password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
      console.log('sign-in user info', res.user)
    })

    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

       user.updateProfile({
       displayName: name,
     })
       .then(function() {
         console.log('User Name Updated successfully.');
      })
    .catch(function(error) {
        console.log(error);
     });
   }
