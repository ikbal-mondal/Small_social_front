import { useContext } from "react";
import { AuthContext } from "../Contexts/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    if(loading){
        return <>
        <div className="text-center  flex justify-center mt-32">
        <div className="w-24 h-24 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
        </div>
        </>
    }
    if(user && user.uid){
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;