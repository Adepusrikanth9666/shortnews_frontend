// import logo from './logo.svg'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignIn from './components/SignIn/SingIn'
import SignUp from './components/SignUp/SignUp'
import News from './components/Dashboard/App1'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/dashboard' component={News} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App