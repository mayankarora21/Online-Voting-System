import React from 'react';

const Election=({election})=>{
    return(
        <div class="white f4 ba pa2 ma4">
            <h5>Election Title: {election.electiontitle}</h5>
            <p>Date of Announcing Result: {election.date}</p>
        </div>
    );
}
export default Election;