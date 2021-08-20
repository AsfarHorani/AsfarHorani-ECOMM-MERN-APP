import React from 'react';
import NavigationItems from '../NavigationItems/navigationItems';
import classes from './sideBar.module.css';

const sideBar = (props)=>{

 
return(
    <div className={classes.SideBar}>
        <NavigationItems />
    </div>
)}

export default sideBar;