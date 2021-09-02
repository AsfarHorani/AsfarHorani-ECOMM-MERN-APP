import React from 'react';
import classes from './navigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';


const navigationItems = (props)=>(

    <ul className={classes.NavigationItems}> 
     <NavigationItem link='/desi' >Desi</NavigationItem>
     <NavigationItem link='/deserts' >Deserts</NavigationItem>
    <NavigationItem link='/drinks' >Drinks</NavigationItem>
    <NavigationItem link='/Barbecue' >Barbecue</NavigationItem>
    <NavigationItem link='/fast-food' >Fast Food</NavigationItem>
    </ul>
      
    
)

export default navigationItems;