import React from 'react';
import Election from './Election';
const ElectionArray=({elections})=>{
    const allElections=elections.map((election,i)=>{
        return <Election key={i} election={election}></Election>
    })
    return(
        <div>
            {allElections}
        </div>
    );
};

export default ElectionArray;