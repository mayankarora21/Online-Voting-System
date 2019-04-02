import React from 'react';

const Card=({candidate})=>{
    return(
        <div className="dib bg-light-blue pa2 ma2">
            <h5>Candidate name: {candidate.name}</h5>
            <p>Candidate id: {candidate.id}</p>
            <p>Candidate email: {candidate.email}</p>
            <p>Candidate dob: {candidate.dob}</p>
            <p>Candidate info: {candidate.information}</p>
            <input type="radio" name="candidateSelected" value={candidate.id} id={candidate.id}></input><button className="f4 pt1 mh2"><label htmlFor={candidate.id}>Vote</label></button>
        </div>
    );
}
export default Card;