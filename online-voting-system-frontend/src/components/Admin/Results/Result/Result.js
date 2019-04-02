import React from 'react';

const Result=(props)=>{
    return(
        <div className="white f4 ba pa2 ma4">
            <h5>Election Title: {props.electiontitle}</h5>
            <p>Candidate id of winning candidate: {props.won}</p>
        </div>
    );
}
export default Result;