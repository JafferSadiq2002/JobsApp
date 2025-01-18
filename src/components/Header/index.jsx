
import {Component} from 'react'
import {FaHome} from 'react-icons/fa'
import {IoBagSharp} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import {ImExit} from 'react-icons/im'
import {useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
const Header  =  () => {
  const navigate = useNavigate()
  const onClickLagout = () => {
    Cookies.remove('jwt_token')

    navigate('./login')
  }
    return (
      <nav className="nav-bar-container">
        <Link className="logo-container" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="nav-bar-logo"
            alt="website logo"
          />
        </Link>

        <ul className="small-device-options-container">
          <li>
            <Link  to="/">
              <FaHome className="home-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <IoBagSharp className="job-icon" />
            </Link>
          </li>
          <li>
            <button className="logout-button" onClick={onClickLagout}>
              <ImExit className="exit-icon" />
            </button>
          </li>
        </ul>
        <div className="large-device-options-container">
          <div className="tabs-container">
            <Link style={{textDecoration : 'none'}} to="/">
              <p className="home-tab">Home</p>
            </Link>
            <Link style={{textDecoration : 'none'}} to="/jobs">
              <p className="job-tab">Jobs</p>
            </Link>
          </div>

          <button className="logout-button-lg" onClick={onClickLagout}>
            Logout
          </button>
        </div>
      </nav>
    )
  }

export default Header
