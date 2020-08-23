import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import  HomePage  from './components/home/HomePage'
import Navbar from './components/navbar/Navbar'
import DashboardPage  from './components/dashboard/DashboardPage'
import TasksPage from './components/tasks/TasksPage'
import GroceriesPage from './components/groceries/GroceriesPage'
import DetailsPage from './components/details/DetailsPage'
import CalendarPage from './components/calendar/CalendarPage'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/dashboard' component={DashboardPage} />
        <Route exact path='/tasks/:id' component={TasksPage} />
        <Route exact path='/groceries/:id' component={GroceriesPage} />
        <Route exact path='/details/:id' component={DetailsPage} />
        <Route exact path='/calendar/:id' component={CalendarPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
