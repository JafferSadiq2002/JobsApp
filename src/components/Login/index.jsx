import { useNavigate,Navigate } from 'react-router-dom'
import React,{useState} from 'react'
import './index.css'
import Cookies from 'js-cookie'
const  Login  = () => {
  
  const navigate = useNavigate()
  const [username,setUserName] = useState('rahul')
  const [password,setPassword] = useState('rahul@2021')
  const [errorMsg,setErrorMsg] = useState('')

  const accessToken = Cookies.get('jwt_token')
    if (accessToken !== undefined) {
      return <Navigate to="/" replace />
    }

  const onChangeUsername = event => {
    setUserName(event.target.value)
  }
  const onChangePassword = event => {
    setPassword (event.target.value)
  }
  const onSumitDetails = event => {
    event.preventDefault()
    getUserVerification()
  }
  const onSuccessStore = data => {
    Cookies.set('jwt_token', data, {expires: 30})
    
    navigate('/')
  }
  const getUserVerification = async () => {
    const userDetails = {
      username: username,
      password: password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok) {
      onSuccessStore(responseData.jwt_token)
      setUserName('')
      setPassword('')
    } else {
      const errorMsg = responseData.error_msg
      setErrorMsg(errorMsg)
    }
  }
  
    
    return (
      <div className="login-form-container">
        <div className="input-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <form className="form-container" onSubmit={onSumitDetails}>
            <label htmlFor="name" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="name"
              className="input"
              placeholder="Username"
              onChange={onChangeUsername}
              value={username}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="password"
              onChange={onChangePassword}
              value={password}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            <p className="error-message">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
}

export default Login
