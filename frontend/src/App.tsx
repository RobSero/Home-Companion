import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import  HomePage  from './components/home/HomePage'
import Navbar from './components/navbar/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
