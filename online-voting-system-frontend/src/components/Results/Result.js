import React from 'react';

const Result=({election})=>{
    return(
        <div className="white pa4 ma4 mt0 ba">
            <h5>Election Title: {election.electiontitle}</h5>
            <p>Candidate id of winning candidate is {election.won}</p>
        </div>
    );
}

export default Result;