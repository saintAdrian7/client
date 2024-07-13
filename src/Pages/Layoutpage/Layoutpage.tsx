import { Outlet } from 'react-router'
import './Layoutpage.css'

import { LoginRegisterModel } from '../../Features/Authentication/Components/LoginRegisterModel/LoginRegisterModel'
import { MuiNavbar } from '../../Features/Components/MuiNavbar'
import { useAuth } from '../../Context/Authconstants'




export default function Layoutpage(){
const {state} = useAuth()
    return(
        <div className="layoutpage">
            {state.displayLogin && <LoginRegisterModel />}
            <MuiNavbar />
            <Outlet />

        </div>

    )
}