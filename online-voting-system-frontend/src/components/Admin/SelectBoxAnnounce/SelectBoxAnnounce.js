import React from 'react';

const SelectBoxAnnounce=({elections})=>{
    const allElections=elections.map((election,i)=>{
        return <option value={election.electiontitle} key={i}>{election.electiontitle}</option>
    })
    return(
        <div>
          <select id="electionTitleAnnounce">
              <option value=''>Select an Election Title</option>
              {allElections}
          </select>
        </div>
    );
}

export default SelectBoxAnnounce;