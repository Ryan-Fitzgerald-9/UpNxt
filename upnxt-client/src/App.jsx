import './App.css'
import { DetailsContext } from "./DataContext"
import { useState } from 'react'
import Main from './components/Main'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [details, setDetails] = useState({})

  return (
    <DetailsContext.Provider
      value={{
        details,
        setDetails
      }}
    >
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    </DetailsContext.Provider>
  )
}

export default App
