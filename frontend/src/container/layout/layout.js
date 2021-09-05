import React from 'react';
import { Component,Fragment } from 'react';
import Header from '../../components/Header/Header'

import SideDrawer from '../../components/SideBar/sideDrawer/sideDrawer';
import Backdrop from '../../components/UI components/Backdrop'
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
       
        <Fragment>
             {this.state.showSideBar && (
          <Backdrop onClick={this.sideDrawerClosedHandler} />
        )}
        <Header count={this.props.count} clicked={this.sideDrawerToggleHandler} logout={this.props.logout} isAuth={this.props.isAuth}/>
    
        <SideDrawer close={this.sideDrawerClosedHandler} show={this.state.showSideBar}/>
        </Fragment>
    )
 }
}

export default Layout;