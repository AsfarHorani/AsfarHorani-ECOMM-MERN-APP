import React, {Component} from 'react'
import './App.css';
import Body from './container/Body/body';
import Layout from './container/Body/layout/layout';

class App extends Component {

state={
    isAuth: false,
    token: null,
    adminId :null,
    showSideBar: false,
    

  
}

componentDidMount=()=>{
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
}

signupHandler=(adminData)=>{
  console.log(adminData)
  fetch('http://localhost:8080/signup/',{
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
    if(res.status!==200 && res.status!==201)
    {
      throw new Error('create admin failed')
    
    }
    return res.json();
}).then(resData=>{
  console.log(resData)
  
}).catch(err=>{
  console.log(err)
})

}

loginHandler=(loginData)=>{

  console.log(loginData);
  fetch('http://localhost:8080/login',{
    method: 'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password
    })
  }).then(res=>{
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

  render(){


  return (
    <div className="App">
        <Layout logout={this.logoutHandler} isAuth={this.state.isAuth}/>
         <Body  logout={this.logoutHandler}  login={this.loginHandler} token={this.state.token} isAuth={this.state.isAuth} />
  
    </div>
  );
  }
}

export default App
