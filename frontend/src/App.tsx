import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import  HomePage  from './components/home/HomePage'
import Navbar from './components/navbar/Navbar'
import DashboardPage  from './components/dashboard/DashboardPage'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/dashboard' component={DashboardPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
