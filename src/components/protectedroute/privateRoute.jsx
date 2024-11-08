import { useSelector } from "react-redux"
import NotPermitted from "./notPermitted";

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user)
    const userRole = user.role;

    return (
        <>
            {
                isAuthenticated === true && userRole === "ADMIN" ||
                    userRole === "USER" ?
                    <>
                        {props.children}
                    </>
                    :
                    <NotPermitted />
            }
        </>
    )
}

export default PrivateRoute;