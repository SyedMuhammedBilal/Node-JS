import React from "react"
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Signin'
import Signup from './components/Signup'
import Contact from './components/Contact'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
      <Route exact path="/home" component={Home} /> 
<Route exact path="/about" component={About} /> 
<Route exact path="/login" component={Login} /> 
<Route exact path="/signup" component={Signup} /> 
<Route exact path="/contact" component={Contact} /> 
      </Switch>
    </div>
  );
}

export default App;
