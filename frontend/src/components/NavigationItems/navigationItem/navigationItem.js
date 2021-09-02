import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './navigationItem.module.css'
const navigationItem = (props)=>(
<ul className={classes.NavigationItem}>
    <li>
    <NavLink 
                    activeClassName={classes.active}
                    to={props.link}
                   
                    exact = {props.exact}
                    onClick={props.clicked}
                    
                    >
                    {props.children}
            </NavLink>
    </li>
</ul>
)

export default navigationItem