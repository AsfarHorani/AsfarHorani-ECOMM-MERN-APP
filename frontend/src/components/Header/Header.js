import React from 'react';
import classes from './header.module.css';
import Logo from './Logo/logo';
import NavigationItem from '../NavigationItems/navigationItem/navigationItem'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import DrawerToggle from './drawerToggle/drawerToggle'
import img from '../../assets/images/cart.png'
import {NavLink} from 'react-router-dom';
const header = (props)=>{


  console.log(props)
  let orderNav = (
    <Auxiliary>
   
    
    <NavLink 
     className={classes.CartLogo}
       to= '/Cart'
    >
     
        <img src={img} atle="logo"/>
       <p> {props.itemsCount}</p>
   </NavLink>
    </Auxiliary>);

    

  if(props.isAuth){
    orderNav = (<Auxiliary>
     
      <NavigationItem link='/Orders' >Orders</NavigationItem>
    <NavigationItem link='/add-product' >Add new product</NavigationItem>
    <button className={classes.Btn} onClick={()=>props.logout()}>Logout</button>
    </Auxiliary> )
  }
  return(<header className={classes.Toolbar}>
      <DrawerToggle clicked={props.clicked}/>
   
   <NavLink  className={classes.CartLogo} exact to='/' >
     <Logo />
     </NavLink>

 
           {orderNav}
     
    
    
  </header>)
}


export default header;