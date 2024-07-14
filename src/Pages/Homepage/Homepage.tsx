
import { useAuth } from "../../Context/Authconstants"
import { LoginRegisterModel } from "../../Features/Authentication/Components/LoginRegisterModel/LoginRegisterModel"
import AvailableCourses from "../AvailableCourses";


export default function HomePage () {
const {state} = useAuth()
    return (
        <>
        {state.displayLogin && <LoginRegisterModel />  }
        <AvailableCourses/>
        </>
        
    )
}

