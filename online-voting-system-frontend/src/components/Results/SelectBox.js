import React from 'react';

const SelectBox=({elections})=>{
    const allElections=elections.map((election,i)=>{
        return <option value={election.electiontitle} key={i}>{election.electiontitle}</option>
    })
    return(
        <div>
          <p>Select Election Title</p>
          <select id="electionTitleVoter">
              <option value=''>Select an Election Title</option>
              {allElections}
          </select>
        </div>
    );
}

export default SelectBox;