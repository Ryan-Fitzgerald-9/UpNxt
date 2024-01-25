import './App.css'
import { DetailsContext } from "./DataContext"
import { useState } from 'react'
import Main from './components/Main'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  // State to manage movie details and user data
  const [details, setDetails] = useState({})
  const [user, setUser] = useState(null)
  console.log(user)
  // Handle successful user login
  const handleLoginSuccess = (userData) => {
    localStorage.setItem('token', userData.key)
    setUser(userData)
  }
  // Handle user logout
  const handleLogoutSuccess = () => {
    setUser(null)
  }

  return (
    // Provide details and user context to components
    <DetailsContext.Provider
      value={{
        details,
        setDetails
      }}
    >
      <div className="app">
        <Header
          isAuthenticated={user !== null}
          username={user ? user.username : ''}
          handleLogout={handleLogoutSuccess}
        />
        <Main
          isAuthenticated={user !== null}
          handleLoginSuccess={handleLoginSuccess}
        />
        <Footer />
      </div>
    </DetailsContext.Provider>
  )
}

export default App
