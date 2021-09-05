import React, { Fragment } from 'react';

import Backdrop from '../UI components/Backdrop';
import Modal from '../UI components/Modal';

const errorHandler = props => {
    console.log(props)
    return(
        <Fragment>
          {props.error && <Backdrop onClick={props.onHandle} />}
          {props.error && (
            <Modal
              title="An Error Occurred"
              onCancelModal={props.onHandle}
              onAcceptModal={props.onHandle}
              acceptEnabled
            >
              <p>{props.error.message}</p>
            </Modal>
          )}
        </Fragment>
      );
}


export default errorHandler;
