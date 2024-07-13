import { useState, useCallback, useEffect } from "react"

import { LoginForm } from "../Loginform/LoginForm"
import { RegisterForm } from "../RegisterForm/RegisterForm"
import { Modal } from "../../Components/Modal"
import { useAuth } from "../../../../Context/Authconstants"



export const LoginRegisterModel: React.FC = () => {
    const {state, dispatch} = useAuth()
    const [login, setLogin] = useState<boolean>(true)

    const closeModal = useCallback(() => {
        dispatch({ type: 'HIDE MODAL' });
      }, [dispatch]);

    const toggleLogin = () => {
        setLogin(!login)

    }

    useEffect(() => {
        if(state.loggedInUser){
            closeModal()
        }
        return (() => {
            if(state.loggedInUser){
                localStorage.setItem('userId', state.loggedInUser.id)
            }
          })
    },[state.loggedInUser, closeModal])

return(
  <>
   <Modal 
        content={login ? <LoginForm toggleRegister={toggleLogin}/> : <RegisterForm toggleLogin={toggleLogin}/>}

        toggleModal={closeModal}
        
        />
  </>
)

}