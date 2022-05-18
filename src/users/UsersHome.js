import { Outlet } from "react-router-dom"
import { getCurrentUser } from '../auth/getCurrentUser.js'

export default function UsersHome() {
    
    return (
        <>
            <button onClick={()=>{console.log(getCurrentUser())}}>test</button>
            <Outlet />
        </>
    );
}
