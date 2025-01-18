const NotFound = () => {
    const NotFoundContainer = {
      backgroundColor: ' #202020',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      color: '#ffffff',
    }
    return (
      <div style={NotFoundContainer}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          style={{width: '30%'}}
        />
        <h1>Page Not Found</h1>
        <p>we're sorry, the page you requested could not be found</p>
      </div>
    )
  }
  
  export default NotFound
  