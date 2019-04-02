import React from 'react';
import Result from '../Result/Result';
const ResultArray=({results})=>{
    const allResults=results.map((currResult,index)=>{
        return <Result key={index} electiontitle={currResult.electiontitle} won={currResult.won}></Result>;
    })
    return(
        <div className="white f4">
            {allResults}
        </div>
    );
    
    
}
export default ResultArray;