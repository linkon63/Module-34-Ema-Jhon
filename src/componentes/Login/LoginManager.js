import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";


export const initializeLoginFramework =() => {
  // if(firebase.app.length === 0 ){
  //   firebase.initializeApp(firebaseConfig);
  // }
    !firebase.apps.length && firebase.initializeApp(firebaseConfig);
}


export const handleGoogleSignIn = (event) => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
    .signInWithPopup(googleProvider)
    .then(result => {
      const {displayName, email, photoURL, }= result.user;
      const signedInUser = {
        isSignedIn : true,
        name : displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      console.log(result);
      console.log('Name : '+displayName+' Email: '+ email+ 'Photo Url : '+ photoURL);
      return signedInUser;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error, errorCode, errorMessage);
    })
    console.log('SignIn Click');
    event.preventDefault();
  };

export const handleFbSignIn =() => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
          firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
          // The signed-in user info.
          const userFb = result.user;
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          // ...
          // console.log(result);
          // console.log('fb user after sign in ', userFb);
          userFb.success = true;
          return userFb;
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(error);
          // ...
        });
  }

  export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then( res => {
      const signedOutUser = {
        isSignedIn : false,
        name : '',                                      
        email : '',
        photo : ''
      }
      return signedOutUser;
    })
    .catch(error => {
      console.log(error); //Checking error
    })
  };

  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .then(response =>{
      const newUserInfo = response.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      // setUser(newUserInfo);
      updateUserName(name)
      return newUserInfo;
      // console.log(response);
    })
    .catch((error) => {
      // var errorCode = error.code;
      var errorMessage = error.message;
      // // ..
      // console.log(errorCode, errorMessage);
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
      // setUser(newUserInfo);
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
      // setUser(newUserInfo); //Before Implement context
      // setLoggedInUser(newUserInfo);
      // history.replace(from);
      // console.log('Sign in user info',res.user);
    })
    .catch((error) => {
      // var errorCode = error.code;
      var errorMessage = error.message;
      const newUserInfo =  {};//{...user};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
      // setUser(newUserInfo);
      // console.log(error);
    });
  }

  const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      // Update successful.
      console.log('user name updated successfully');
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
  }