import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './css/style.css'
import Navbar from './Components/Navbar'
import HomePage from './Components/HomePage'
import MoviesPage from './Components/MoviesPage'
import MoviePage from './Components/MoviePage'
import Admin from './Components/Admin'
import AddMovie from './Components/AddMovie'
import AddDirector from './Components/AddDirector'
import AddActor from './Components/AddActor'
import EditDirector from './Components/EditDirector'
import EditActor from './Components/EditActor'

function App() {
  return (    
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/movies' exact component={MoviesPage} />
        <Route path='/movies/:id' component={MoviePage} />
        <Route path='/admin' exact component={Admin} />      
        <Route path='/add/movie' exact component={AddMovie} /> 
        <Route path='/add/directors' exact component={AddDirector} /> 
        <Route path='/add/actors' exact component={AddActor} /> 
        <Route path='/edit/directors/:id' exact component={EditDirector} />       
        <Route path='/edit/actors/:id' exact component={EditActor} />       
      </Switch>
    </Router>    
  );
}

export default App;
