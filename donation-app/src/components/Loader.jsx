import React, { Fragment } from 'react'
import { Spin } from 'antd';
const Loader = () => {
    return (
       <Fragment>
           <div className="loader">
           <Spin size="large" />
           </div>
       </Fragment>
    )
}

export default Loader
