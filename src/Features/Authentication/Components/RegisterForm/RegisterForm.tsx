import { useRef, useEffect } from "react";

import './Register.css'
import { useAuth } from "../../../../Context/Authconstants";
import { registerUser } from "../../../../Context/Authactions";

interface RegisterFormProps{
    toggleLogin():void
}



export const RegisterForm:React.FC<RegisterFormProps> = ({toggleLogin}) => {
const firstNameRef = useRef<HTMLInputElement>(null)
const lastNameRef = useRef<HTMLInputElement>(null)
const emailRef = useRef<HTMLInputElement>(null)
const passwordRef = useRef<HTMLInputElement>(null)
const {state, dispatch} = useAuth()

useEffect(() => {
  return () => {
    dispatch({ type: 'RESET REGISTER SUCCESS' });
  };
}, [dispatch]);


const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
if(firstNameRef && firstNameRef.current && lastNameRef && lastNameRef.current && emailRef && emailRef.current && passwordRef && passwordRef.current){
    
      await registerUser(dispatch, {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value
  
      })
  
  }
}

   return (
        <form className="register-form">
            <h2 className="register-form-title">Sign In using Email</h2>
            <div className="register-form">
                <h3>FirstName:</h3>
                <input type="text" ref={firstNameRef} placeholder="Enter your first name" required name="firstName"/>
                <h3>LastName:</h3>
                <input type="text" ref={lastNameRef} placeholder="Enter your last name" required name="lastName"/>
                <h3>Email:</h3>
                <input type="email" placeholder="Email" ref={emailRef} name="email" required/>

                <h3>Password:</h3>
                <input type="password" placeholder="Password" name="password"  required ref={passwordRef}/>
            </div>
            {state.error && <p className="register-form-error">Unable to register at this time</p>}
            <button className="register-form-button" onClick={handleRegister}>Register</button>
            {state.registerSuccess && <p className=".register-form-register-message">registered success</p>}<span className="register-form-toggle" onClick={toggleLogin}>Click here to login</span> 
            

        </form>
    )

}