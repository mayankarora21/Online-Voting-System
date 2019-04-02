import React from 'react';

const Scroll=(props)=>{
    return(
        <div className="scrollY">
            {props.children}
        </div>
    );
}
export default Scroll;