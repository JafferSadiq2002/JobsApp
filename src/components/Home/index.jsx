import './index.css'

import Header from '../Header'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content-container">
          <h1 className="home-heading">Find the Job That fits your life</h1>
          <p className="home-description">
            Millions of people are searching for jobs salary information,company
            reviews.Find the job that fits u r ability and poetential
          </p>
          <Link to="/jobs">
            <button className="find-jobs-btn">Find Jobs</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
