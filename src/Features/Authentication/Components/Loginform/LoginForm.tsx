import { useRef, useState } from "react";
import './LoginForm.css'
import { useAuth } from "../../../../Context/Authconstants";
import { LoginUser } from "../../../../Context/Authactions";



interface LoginFormProps{
    toggleRegister():void
}


export const LoginForm:React.FC<LoginFormProps> = ({toggleRegister}) =>{
    const { state, dispatch} = useAuth()
    const [error, setError] = useState<boolean>(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)


  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault()
     if (emailRef && emailRef.current && passwordRef &&passwordRef.current)
        try {
            await LoginUser(dispatch, {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            setError(false)
            toggleRegister
            
        } catch (e) {
            setError(true);
            console.log(e);
            
    }


  }


    return(
        <form className="login-form">
            <h2 className="login-form-title">Login with Email</h2>
            <div  className="login-form-input-group">
                <h3>Email:</h3>
                <input className="login-form-input" type="email" placeholder="Email" ref={emailRef} name="email" required/>

                <h3>Password:</h3>
                <input className="login-form-input" type="password" placeholder="Password" name="password"  required ref={passwordRef}/>
            </div>
        {error && <p className="login-form-error">Invalid password or Email</p>}
        {state.loading && <p className="loading-message">Loading... please wait</p>}
        <button className="login-form-button" onClick={handleLogin} type="submit">Login</button>
        <p className="login-form-register-message"><span className="login-form-toggle" onClick={toggleRegister}>Click here</span> to register.</p>
        </form>
    )

}