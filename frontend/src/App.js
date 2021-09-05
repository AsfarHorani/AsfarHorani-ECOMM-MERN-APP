import React, {Component,Fragment} from 'react'
import './App.css';
import {withRouter } from 'react-router-dom';
import Body from './container/Body/body';
import Layout from './container/layout/layout';
import ErrorHandler from './components/errorHandler/errorHandler'
import Backdrop from './components/UI components/Backdrop'

class App extends Component {

state={
    isAuth: false,
    token: null,
    adminId :null,
    showSideBar: false,
    error: null,
    showBackdrop: false,
    count: 0
  
}


componentDidMount=()=>{

  console.log(this.state.props)
  console.log('Component did mount')
  const token = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiryDate');
  if(!token || !expiryDate)
  {
    return
  }
  if (new Date(expiryDate) <= new Date()) {
    this.logoutHandler();
    return;
  }

  const adminId = localStorage.getItem('adminId');
  const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
  this.setState({ isAuth: true, token: token, adminId: adminId });
  this.setAutoLogout(remainingMilliseconds);
}


logoutHandler=()=>{
  this.setState({isAuth: false, token: null})
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('adminId');
  console.log('Loggedout')
  this.props.history.push('/')
}

signupHandler=(adminData)=>{
  console.log(adminData)
  fetch(process.env.REACT_APP_BACKEND_URL+'signup',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

      email: adminData.email,
      password: adminData.password,
      name: adminData.name

    })
  }).then(res=>{
    if (res.status === 401) {
      throw new Error('Email is incorrect!');
     
    }
    if (res.status === 422) {
      throw new Error('Validation failed.');
    }
    if(res.status!==200 && res.status!==201)
    {
      throw new Error('create admin failed')
    
    }
    return res.json();
}).then(resData=>{
  console.log(resData)
  this.props.history.replace('/login')
}).catch(err=>{
  this.setState({error: err})
  console.log(err)
})

}

loginHandler=(loginData)=>{

  console.log(loginData);
  fetch(process.env.REACT_APP_BACKEND_URL+'login',{
    method: 'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password
    })
  }).then(res=>{
    
    console.log(res)
    if (res.status === 422) {
      throw new Error('Validation failed.');
    }
    if (res.status === 401) {
      throw new Error('Email is incorrect!');
    }
    if(res.status!==200 && res.status !==201){
      throw new Error('Login failed')
    }
  
    return res.json()
  }).then(resData=>{
   
   console.log(resData)
    this.setState({
      isAuth: true,
      token: resData.token

    })
    localStorage.setItem('token', resData.token);
    localStorage.setItem('adminId', resData.adminId)
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(
      new Date().getTime() + remainingMilliseconds
    );
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    this.setAutoLogout(remainingMilliseconds);
    console.log('success')
    this.props.history.push('/')
   
  }).catch(err=>{
    this.setState({error: err, isAuth: false})
    console.log(err)
  })


}
setAutoLogout = milliseconds => {
  setTimeout(() => {
    this.logoutHandler();
  }, milliseconds);
};

toggleSideBarHandler=()=>{
 
  this.setState((prevState)=> { console.log(prevState.showSideBar)
      return {showSideBar: !prevState.showSideBar}
    })
      
}

errorSolver = () => {
  this.setState({ error: null });
};

backdropClickHandler = () => {
  this.setState({ showBackdrop: false, error: null });
};
catchError = error => {
 this.setState({error:error})
};
showBackdropHandler=()=>{
  this.setState({showBackdrop: true})
}

setCartItemCount=(c)=>{
  console.log(c)
  if(c===0){
   return this.setState({count:null})
  }
  this.setState({count:c})
}

  render(){


  return (
    <Fragment>
    {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        <ErrorHandler error={this.state.error}  onHandle={this.errorSolver} />
        <Layout count={this.state.count} showBackdrop={this.showBackdropHandler} logout={this.logoutHandler} isAuth={this.state.isAuth}/>
        <Body setCartItemCount={this.setCartItemCount}  catchError={this.catchError} onHandle={this.errorSolver} logout={this.logoutHandler}  login={this.loginHandler} token={this.state.token} isAuth={this.state.isAuth} />
  
         </Fragment>
  );
  }
}

export default withRouter(App) 
