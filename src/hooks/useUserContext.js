import { useContext } from "react";
import UserContext from "../context/user.context";


function useUserContext() {
    return useContext(UserContext);
}


export default useUserContext;