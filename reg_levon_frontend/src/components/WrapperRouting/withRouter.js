
import { useNavigate } from "react-router-dom"

function withRouter(Component) {
    function WrapperComponent (props) {
        const navigate = useNavigate()
        return <Component {...props} navigate={navigate} />
    }

    return WrapperComponent

}


export default withRouter