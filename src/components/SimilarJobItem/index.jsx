import {IoLocation} from 'react-icons/io5'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'
const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-container">
      <div className="logo-container">
        <img
          src={companyLogoUrl}
          className="company-logo"
          alt="similar job company logo"
        />
        <div className="title-container">
          <h1 className="company-title ">{title}</h1>
          <div className="rating-container ">
            <FaStar className="star-icon" />
            <p className="rating ">{rating}</p>
          </div>
        </div>
      </div>
      <div className="description-container">
        <h3>Description</h3>
        <p>{jobDescription}</p>
      </div>
      <div style={{display: 'flex', alignItem: 'center'}}>
        <div className="location-container">
          <IoLocation className="location-icon" />
          <p className="location-text">{location}</p>
        </div>
        <div className="employment-type-container">
          <BsBriefcaseFill className="case-icon" />
          <p className="type-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
