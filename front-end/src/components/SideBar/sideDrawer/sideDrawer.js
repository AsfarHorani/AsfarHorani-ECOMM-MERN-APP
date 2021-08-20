import React from 'react';
import NavigationItems from '../../NavigationItems/navigationItems';
import classes from './sideDrawer.module.css';
//import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import img from '../../../assets/images/back.png'

const SideDrawer = ( props ) => {
 

    console.log(props)
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxiliary>
    <div className={attachedClasses.join(' ')}>
               <img onClick={props.close} src={img} />
                <nav onClick={props.close}>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default SideDrawer;