import React from 'react';
import classes from './header.module.css';
import Logo from './Logo/logo';
import NavigationItem from '../NavigationItems/navigationItem/navigationItem'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import DrawerToggle from './drawerToggle/drawerToggle'
const header = (props)=>{


  console.log(props)
  let orderNav = (
    <Auxiliary>
    <NavigationItem exact link='/' >Home</NavigationItem>
    <NavigationItem link='/Cart' >Cart</NavigationItem>
    </Auxiliary>);

    
const logout=()=>{
  console.log('adasdsad')
}
  if(props.isAuth){
    orderNav = (<Auxiliary>
      
     <NavigationItem exact link='/' >Home</NavigationItem>
      <NavigationItem link='/Orders' >Orders</NavigationItem>
    <NavigationItem link='/add-product' >Add new product</NavigationItem>
    <button onClick={()=>props.logout()}>Logout</button>
    </Auxiliary> )
  }
  return(<header className={classes.Toolbar}>
      <DrawerToggle clicked={props.clicked}/>
   <Logo />
 
  <h2>Mr Foood</h2> 
 
           {orderNav}
     
    
    
  </header>)
}


export default header;