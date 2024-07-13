
import { useAuth } from "../../Context/Authconstants"
import { LoginRegisterModel } from "../../Features/Authentication/Components/LoginRegisterModel/LoginRegisterModel"
import Introduction from '../../Features/Components/Introduction';


export default function HomePage () {
const {state} = useAuth()
    return (
        <>
        <h2>Homepage</h2>
        {state.displayLogin && <LoginRegisterModel />  }
        <Introduction/>
        </>
        
    )
}

