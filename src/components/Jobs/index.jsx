import Cookies from 'js-cookie'
import Header from '../Header'
import {FaSearch} from 'react-icons/fa'
import {useState,useEffect} from 'react'
import JobCard from '../JobCard'
import {ThreeDots} from 'react-loader-spinner'
import './index.css'

const employmentTypesList = [
    {
      label: 'Full Time',
      employmentTypeId: 'FULLTIME',
    },
    {
      label: 'Part Time',
      employmentTypeId: 'PARTTIME',
    },
    {
      label: 'Freelance',
      employmentTypeId: 'FREELANCE',
    },
    {
      label: 'Internship',
      employmentTypeId: 'INTERNSHIP',
    },
  ]
  
  const salaryRangesList = [
    {
      salaryRangeId: '1000000',
      label: '10 LPA and above',
    },
    {
      salaryRangeId: '2000000',
      label: '20 LPA and above',
    },
    {
      salaryRangeId: '3000000',
      label: '30 LPA and above',
    },
    {
      salaryRangeId: '4000000',
      label: '40 LPA and above',
    },
  ]
  
  
  const apiCallStatusConstants = {
    initial : 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }
  const Jobs =  () => {
    const [profileDetails,setProfileDetails] = useState({})
    const [employmentType,setEmploymentType] = useState([])
    const [salaryRange,setSalaryRange] = useState('')
    const [searchInput,setSearchInput] = useState('')
    const [jobs,setJobs] = useState([])
    const [apiCallStatus,setApiCallStatus] = useState(apiCallStatusConstants.initial)
    const [profilApiCall,setProfilApiCall] = useState(apiCallStatusConstants.initial)
    useEffect(() => {
      getJobs()
    },[employmentType])
    useEffect(() => {
      getJobs()
    },[salaryRange])
    const onSelectEmploymemtType = event => {
      const selectedType = event.target.id
      if (employmentType.includes(selectedType)) {
        const updateEmployType = employmentType.filter(
          eachType => eachType !== selectedType,
        )
        setEmploymentType([...updateEmployType])
      } else {
        setEmploymentType(prevEmploymentType => ([...prevEmploymentType, selectedType]))
      }
    }
    const onSelectSalaryRange = event => {
      const selectedSalary = event.target.id
      setSalaryRange(selectedSalary)
    }
    const onChangeSearchInput = event => {
      setSearchInput(event.target.value)
    }
    const onSearch = () => {
       getJobs()
    }
    const onClickRetryProfile = () => {
      getProfileDetails()
    }
    const onClickRetryJobs = () => {
      getJobs()
    }
    useEffect(()=> {
      getJobs()
      getProfileDetails()
    },[])
    const getFormatedJobsData = job => {
      return {
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
        id: job.id,
      }
    }
    const getJobs = async () => {
      setApiCallStatus(apiCallStatusConstants.loading)
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      let Url = null
      if (employmentType.length > 1) {
        const stringEmploymentType = employmentType.join(',')
        Url = `https://apis.ccbp.in/jobs?employment_type=${stringEmploymentType}&minimum_package=${salaryRange}&search=${searchInput}`
      } else if (employmentType.length === 1) {
        Url = `https://apis.ccbp.in/jobs?employment_type=${employmentType[0]}&minimum_package=${salaryRange}&search=${searchInput}`
      } else {
        Url = `https://apis.ccbp.in/jobs?employment_type=&minimum_package=${salaryRange}&search=${searchInput}`
      }
  
      const response = await fetch(Url, options)
      const responseData = await response.json()
      if (response.ok) {
        const formatedJobsData = responseData.jobs.map(eachJob =>
          getFormatedJobsData(eachJob),
        )
        setJobs(formatedJobsData)
        setApiCallStatus(apiCallStatusConstants.success)
      } else {
        setApiCallStatus(apiCallStatusConstants.failure)
      }
    }
    const getProfileDetails = async () => {
      setProfilApiCall(apiCallStatusConstants.loading)
      const jwtToken = Cookies.get('jwt_token')
      console.log(jwtToken)
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const profileResponse = await fetch('https://apis.ccbp.in/profile', options)
      const profileDetails = await profileResponse.json()
      if (profileResponse.ok) {
        const formatedData = getFormatedProfileData(
          profileDetails.profile_details,
        )
        setProfilApiCall(apiCallStatusConstants.success)
        setProfileDetails(formatedData)
      } else {
        setProfilApiCall(apiCallStatusConstants.failure)
      }
    }
    const getFormatedProfileData = data => {
      return {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
    }
    const renderProfileContainer = () => {
      const {name, profileImageUrl, shortBio} = profileDetails
      return (
        <div className="profile-container">
          <img src={profileImageUrl} className="profile-image" alt="profile" />
          <h2 className="profile-name">{name}</h2>
          <p className="profile-job">{shortBio}</p>
        </div>
      )
    }
    const renderProfileFailureView = () => {
      return (
        <div>
          <button className="retry-button" onClick={onClickRetryProfile}>
            Retry
          </button>
        </div>
      )
    }
    const renderEmploymentTypes = () => {
      return (
        <div>
          <h1 className="types-main-heading">Types of Employment</h1>
          <ul className="employment-list-container">
            {employmentTypesList.map(eachType => (
              <li>
                <input
                  id={eachType.employmentTypeId}
                  type="checkbox"
                  onChange={onSelectEmploymemtType}
                />
                <label htmlFor={eachType.employmentTypeId}>
                  {eachType.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    const renderSalaryRangeList = () => {
      return (
        <div>
          <h1 className="salary-main-heading">Salary Range</h1>
          <ul className="salary-range-list-container">
            {salaryRangesList.map(eachSalary => (
              <li>
                <input
                  id={eachSalary.salaryRangeId}
                  type="radio"
                  name="salary"
                  onChange={onSelectSalaryRange}
                />
                <label htmlFor={eachSalary.salaryRangeId}>
                  {eachSalary.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    const renderLoader = () => {
      return (
        <div className="loader-container" style={{height : '100%'}} data-testid="loader">
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
            Oops! Somthing Went Wrong
          </h1>
          <p style={{color: '#ffffff', fontSize: '18px'}}>
            We cannot seem to find page you are looking for.
          </p>
          <button className="retry-button" onClick={onClickRetryJobs}>
            Retry
          </button>
        </div>
      )
    }
    const renderSuccessView = () => {
      const isEmpty = jobs.length === 0
      return isEmpty ? (
        renderNoJobs()
      ) : (
        <ul className="jobs-list-container">
          {jobs.map(eachJob => (
            <JobCard jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      )
    }
    const renderNoJobs = () => {
      return (
        <div style={{textAlign: 'center', color: '#ffffff'}}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            style={{width: '30%'}}
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    const renderApiStatusView = () => {
      switch (apiCallStatus) {
        case apiCallStatusConstants.loading:
          return renderLoader()
        case apiCallStatusConstants.success:
          return renderSuccessView()
        case apiCallStatusConstants.failure:
          return renderFailureView()
        default:
          return null
      }
    }
    const renderProfileApiStatus = () => {
      switch (profilApiCall) {
        case apiCallStatusConstants.loading:
          return renderLoader()
        case apiCallStatusConstants.success:
          return renderProfileContainer()
        case apiCallStatusConstants.failure:
          return renderProfileFailureView()
        default:
          return null
      }
    }
  
      return (
        <>
          <Header />
          <div className='overall-responsive-conatainer'>
            <div className="search-container1">
              <input
                type="search"
                className="input-search"
                onChange={onChangeSearchInput}
                value={searchInput}
                placeholder="Search"
              />
              <buuton
                    type="button"
                    data-testid="searchButton"
                    onClick={onSearch}
                    className="search-button"
              >
                <FaSearch className="search-icon" />
              </buuton>
            </div>
            <div className="jobs-background-container">
      
              <div className="filters-container">
                <div>
                  {renderProfileApiStatus()}
                  <hr />
                  {renderEmploymentTypes()}
                  <hr />
                  {renderSalaryRangeList()}
                </div>
              </div>
              <div className="jobs-container">
                <div className="search-container2">
                  <input
                    type="search"
                    className="input-search"
                    onChange={onChangeSearchInput}
                    value={searchInput}
                    placeholder="Search"
                  />
                  <buuton
                    type="button"
                    data-testid="searchButton"
                    onClick={onSearch}
                    className="search-button"
                  >
                    <FaSearch className="search-icon" />
                  </buuton>
                </div>
                {renderApiStatusView()}
              </div>
            </div>
          </div>
          
        </>
      )
  }
  
  export default Jobs
  