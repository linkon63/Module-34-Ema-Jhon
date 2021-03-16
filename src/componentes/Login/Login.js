import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';



// firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);  

function Login() {
  // if (!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig);  

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
      // setUser(res);
      // setLoggedInUser(res);
      // history.replace(from);
    })
  }
  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
      // setUser(res);
      // setLoggedInUser(res);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    //   setUser(res);
    //   setLoggedInUser(res);
    //   history.replace(from);
    })
  }

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn : false,
    name : '',
    email : '',
    password: '',
    photo : '',
    error: '',
    success: false
  });

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }

  }

  const handleBlur = event =>{
    // console.log(event.target.name, event.target.value);
    let isFieldValid = true;
    if(event.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      // const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = (isPasswordValid && passwordHasNumber);
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (event) => {
    // console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      // console.log('Submitting');
      createUserWithEmailAndPassword(user.name,user.email, user.password)
      .then(res => {
        handleResponse(res, true);
        // setUser(res);
        // setLoggedInUser(res);
        // history.replace(from);
      })
      
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        // setUser(res);
        // setLoggedInUser(res);
        // history.replace(from);
        handleResponse(res, true);
      })
    }
    event.preventDefault();
  };

 

  return (
    <div style={{textAlign: 'center'}}>
      {
          user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign In Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome , {user.name}</p>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt="UserPhoto"/>
        </div>
      }
      <form onSubmit={handleSubmit}>
        {/* <h1>Our Own Authentication </h1>
        <p>Input Mail : {user.email}</p>
        <p>Input Password : {user.password}</p> */}
        <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id=""/>
        <label htmlFor="newUser">New User Sign UP</label> <br />
        {newUser && <input onBlur={handleBlur} type="text" name="name" id="" placeholder="Your Name" />}
        <br/>
        
        <input onBlur={handleBlur} type="text" placeholder="Your Email" name="email" required/>  
        <br />
        {/* onChange and onBlur */}
        
        <input onBlur={handleBlur} type="password" placeholder="Your Password " name="password" id="" required/> 
        <br />
        
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Logged in'} Successfully</p>}
    </div>
  );
}

export default Login;
