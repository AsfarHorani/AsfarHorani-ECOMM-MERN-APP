import React from 'react';
import classes from './logo.module.css';
import img from '../../../assets/images/logo.jpg'

const logo = (props)=>(

    <div className={classes.Logo}>
        <img src={img} atle="logo"/>
    
    </div>
)


export default logo;