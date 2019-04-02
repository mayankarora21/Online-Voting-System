import React from 'react';

const SelectBox=({elections})=>{
    const electionsToVote=elections.map((election,i)=>{
        return <option value={election.electiontitle} key={i}>{election.electiontitle}</option>
    })
    console.log(electionsToVote);
    return(
        <select id="selectElection" className="pa2">
            <option value="none">Select an election to vote</option>
            {electionsToVote}
        </select>
    );   
}

export default SelectBox;