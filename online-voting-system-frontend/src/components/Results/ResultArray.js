import React from 'react';
import Result from './Result';

const ResultArray=({results})=>{
    const allResults=results.map((election,i)=>{
        return <Result election={election} key={i}></Result>
    });
    return(
        <div>
            {allResults}
        </div>
    );
}

export default ResultArray;