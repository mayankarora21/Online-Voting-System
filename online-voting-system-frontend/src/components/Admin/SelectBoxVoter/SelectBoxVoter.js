import React from 'react';

const SelectBoxVoter=({elections})=>{
    const allElections=elections.map((election,i)=>{
        return <option value={election.electiontitle} key={i}>{election.electiontitle}</option>
    })
    return(
        <div>
          <select id="electionTitleVoter">
              <option value=''>Select an Election Title</option>
              {allElections}
          </select>
        </div>
    );
}

export default SelectBoxVoter;