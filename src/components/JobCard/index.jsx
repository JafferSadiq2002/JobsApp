import {FaStar} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import './index.css'
const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <li className="job-container">
      <Link style={{textDecoration : 'none',color: 'inherit'}} to={`/jobs/${id}`} className="link-style">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="title-container">
            <h3 className="company-title ">{title}</h3>
            <div className="rating-container ">
              <FaStar className="star-icon" />
              <p className="rating ">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-container-2">
          <div className="location-container">
            <IoLocation className="location-icon" />
            <p className="location-text">{location}</p>
          </div>
          <div className="employment-type-container">
            <BsBriefcaseFill className="case-icon" />
            <p className="type-text">{employmentType}</p>
          </div>
          <p className="pakage">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="description-container">
          <h3>Description</h3>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
