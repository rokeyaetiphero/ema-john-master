import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, signInWithEmailAndPassword } from './loginManager';

initializeLoginFrameWork();

const Login = () => {
  const [newUser,setNewUser] = useState(false)
  const [user,setUser] = useState({
    isSignedIn: false,
    newUser: false,//by default dhre nilam tumi new user na
    name: '',
    photo: '',
    email: '',
    password: '',
    error: ''
  })

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  //promise and result dui ta kei amra return korci..bujhcho??
  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res =>{
     handleResponse(res,true)
    })
  }

  const fbSignIn = () =>{
    handleFbSignIn()
      .then(res =>{
        handleResponse(res,true)
    })
  }

  const signOut = () =>{
    handleSignOut()//se empty ekta user response hisebe pathabe
    .then(res =>{
      handleResponse(res,false)
    })
  }

  const handleResponse = (res,redirect) => {
    setUser(res)
    setLoggedInUser(res)
    if(redirect){
      history.replace(from)
    }
  }
  //just email and pass r field ta valid kina check korar jnno
  const handleBlur = (e) => {
    //event ta jkhn thke trigger hyece seta hcce event.r j element thke trigger hcce seta hcce se element hcce target
    let isFieldValid = true;
    if(e.target.name === 'email'){
       isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);//isEmailValid true or false return krbe..
    }

    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNumber =  /\d{1}/.test(e.target.value); 
      isFieldValid = isPasswordValid && isPasswordHasNumber;
    }
     //jhtu amra dhre nici by default form ta valid.tai name ta o show kore onBlur krle
    if(isFieldValid) {
      const newUserInfo = {...user}//user r info copy kora..second bracket cz obj duitai
      newUserInfo[e.target.name] = e.target.value;//password / email r updated value assign kore dewa obj ee
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name,user.email,user.password)
        .then(res =>{
          handleResponse(res,true)
        })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        handleResponse(res,true)
      })
    }

    e.preventDefault();
  }

  return (
    
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button>
        : <button onClick={googleSignIn}>Sign In</button>
      } 
       <br/>
        
      <button onClick={fbSignIn}>Login Using Facebook</button>

      {
        user.isSignedIn && <div> 
          <p>Welcome!! {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt=""/>
          </div>
      }

     <form action={handleSubmit}>
     <h1>Our Own Authentication</h1>
     <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="NewUser" id=""/>
     <label htmlFor="NewUser">New User Sign Up</label>
     <h2>Name:{user.name}</h2>
     <h2>Email:{user.email}</h2>
     <h3>Password:{user.password}</h3>
     {
       newUser && <input type="text" name='name' onBlur={handleBlur}  placeholder="Your Name"/>
     }
     <br/>
     <input type="text" name='email' onBlur={handleBlur} placeholder="Your Email Address" required/>
     <br/>
     <input type="password" name='password' onBlur={handleBlur} id="" placeholder="Password" required/>
     <br/>
     <input onClick={handleSubmit} type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
     </form>
     <p style={{color:'red'}}>{user.error}</p>
     {
      user.success && <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>
     }
    </div>
  );
};

export default Login;