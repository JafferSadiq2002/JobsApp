import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const accessToken = Cookies.get('jwt_token')
  if (accessToken === undefined) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
