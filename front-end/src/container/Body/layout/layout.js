import React from 'react';
import { Component } from 'react';
import Header from '../../../components/Header/Header'
import SideBar from '../../../components/SideBar/sideBar';
import SideDrawer from '../../../components/SideBar/sideDrawer/sideDrawer';

class Layout extends Component{
 state={
    showSideBar: false,
 }
 sideDrawerClosedHandler=(props)=>{

    this.setState({showSideBar: false});
}
  sideDrawerToggleHandler=(props)=>{
        this.setState((prevState)=>
        {
            return {showSideBar: !prevState.showSideBar}})
    }

 render(){
    return(
        <div>
        <Header clicked={this.sideDrawerToggleHandler} logout={this.props.logout} isAuth={this.props.isAuth}/>
        <SideBar />
        <SideDrawer close={this.sideDrawerClosedHandler} show={this.state.showSideBar}/>
        </div>
    )
 }
}

export default Layout;