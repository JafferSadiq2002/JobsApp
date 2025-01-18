import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import {FaStar} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import { ThreeDots} from 'react-loader-spinner'
import {GrShare} from 'react-icons/gr'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'
import { useParams } from 'react-router-dom'
import './index.css'

const apiCallStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const JobItemDetails = () => {
  const {id} = useParams()
  const [jobItemDetails,setJobItemDetails] = useState({})
  const [similarJobs,setSimilarJobs] = useState([])
  const [apiCallStatus,setApiCallStatus] = useState(apiCallStatusConstants.loading)
  useEffect(() => {
    getJobItemDetails()
  },[])
  const onRetryJobDetails = () => {
    getJobItemDetails()
  }
  const getLifeAtCompanyFormated = lifeatCompany => {
    return {
      description: lifeatCompany.description,
      imageUrl: lifeatCompany.image_url,
    }
  }
  const getSkillsFormated = skill => {
    return {
      imageUrl: skill.image_url,
      name: skill.name,
    }
  }
  const getFormatedJobDetails = jobItem => {
    return {
      companyLogoUrl: jobItem.company_logo_url,
      employmentType: jobItem.employment_type,
      jobDescription: jobItem.job_description,
      companyWebsiteUrl: jobItem.company_website_url,
      location: jobItem.location,
      packagePerAnnum: jobItem.package_per_annum,
      rating: jobItem.rating,
      title: jobItem.title,
      id: jobItem.id,
      lifeAtCompany: getLifeAtCompanyFormated(jobItem.life_at_company),
      skills: jobItem.skills.map(eachSkill =>
        getSkillsFormated(eachSkill),
      ),
    }
  }
  const getSimilarJobFormated = simiJob => {
    return {
      companyLogoUrl: simiJob.company_logo_url,
      employmentType: simiJob.employment_type,
      jobDescription: simiJob.job_description,
      location: simiJob.location,

      packagePerAnnum: simiJob.package_per_annum,
      rating: simiJob.rating,
      title: simiJob.title,
      id: simiJob.id,
    }
  }
  const getJobItemDetails = async () => {

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok) {
      const formatedJobDetails = getFormatedJobDetails(
        responseData.job_details,
      )
      const formatedSimilarJobs = responseData.similar_jobs.map(eachJob =>
        getSimilarJobFormated(eachJob),
      )
      setJobItemDetails(formatedJobDetails)
      setSimilarJobs(formatedSimilarJobs)
      setApiCallStatus(apiCallStatusConstants.success)
    } else {
      setApiCallStatus(apiCallStatusConstants.failure)
    }
  }
  const renderLoader = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <ThreeDots  color="#ffffff" height="50" width="50" />
      </div>
    )
  }
  const renderFailureView = () => {
    return (
      <div style={{textAlign: 'center'}}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          style={{width: '70%'}}
          alt="failure view"
        />
        <h1 style={{color: '#ffffff', fontSize: '25px'}}>
          Oops! Something Went Wrong
        </h1>
        <p style={{color: '#ffffff', fontSize: '18px'}}>
          We cannot seem to find the page you are looking for
        </p>
        <button className="retry-button" onClick={onRetryJobDetails}>
          Retry
        </button>
      </div>
    )
  }
  const renderJobItemDetailsSuccessView = () => {

    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      companyWebsiteUrl,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobItemDetails

    return (
      <>
        <div className="job-container">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
            <div className="title-container">
              <h1 className="company-title ">{title}</h1>
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
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h2>Description</h2>
              <a className="visit-button" href={companyWebsiteUrl}>
                <p>Vist</p>
                <GrShare size={15} />
              </a>
            </div>

            <p style={{marginTop : '0px'}}>{jobDescription}</p>
          </div>
          <div>
            <h2>Skills</h2>
            <ul className="skills-list-container">
              {skills.map(eachSkill => (
                <SkillItem skilldetails={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
          </div>
          <h3>Life at Company</h3>
          <div className="life-at-company-description">
            <p style={{marginTop : '0px',display:'inline',flexGrow : '0'}}>{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className='life-at-company-image'
            />
          </div>
        </div>
        <div>
          <h2 style={{width: '100%', fontSize: '30px'}}>Similar Jobs</h2>
          <ul className="similar-job-list-container">
            {similarJobs.map(eachSimilarJobs => (
              <SimilarJobItem
                jobDetails={eachSimilarJobs}
                key={eachSimilarJobs.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }
  const renderApiStatusView = () => {
    switch (apiCallStatus) {
      case apiCallStatusConstants.loading:
        return renderLoader()
      case apiCallStatusConstants.success:
        return renderJobItemDetailsSuccessView()
      case apiCallStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }
  
    return (
      <>
        <Header />
        <div className='overall-responsivecontainer'>
          <div className="job-item-details">{renderApiStatusView()}</div>
        </div>
        
      </>
    )
}

export default JobItemDetails
