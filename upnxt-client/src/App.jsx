import './App.css'
import { DetailsContext } from "./DataContext"
import { useState } from 'react'
import Main from './components/Main'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [details, setDetails] = useState({})
  const [user, setUser] = useState(null)

  const handleLoginSuccess = (userData) => {
    setUser(userData)
  }

  const handleLogoutSuccess = () => {
    setUser(null)
  }

  return (
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
