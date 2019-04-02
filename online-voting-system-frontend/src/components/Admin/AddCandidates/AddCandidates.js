import React from 'react';
import SelectBoxCandidate from '../SelectBoxCandidate/SelectBoxCandidate'

const onAddCandidate=()=>{
    const nameBox=document.getElementById('candidateName');
    const dobBox=document.getElementById('candidateDob');
    const infoBox=document.getElementById('candidateInfo');
    const electionTitle=document.getElementById('electionTitleCandidate');
    const emailBox=document.getElementById('candidateEmail');
    
    if(!nameBox.value || !dobBox.value || !infoBox.value || !electionTitle.value || !emailBox.value){
        window.alert("please fill all fields");
        return;
    }
    const candidate={
        name:nameBox.value,
        dob:dobBox.value,
        information:infoBox.value,
        electiontitle:electionTitle.value,
        email:emailBox.value,
    }
    fetch('http://localhost:3000/addcandidate',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(candidate)
    }).then(response=>response.json()).then(id=>{
        if(id==='candidate already exists'){
            window.alert('such a candidate already exists');
            return;
        }
        else if(id==='candidate not added'){
            window.alert('error in adding the candidate')
        }
        else{
            window.alert(`candidate id is ${id}`)
        }
    })
    nameBox.value='';
    infoBox.value='';
    electionTitle.value='';
    emailBox.value='';
    dobBox.value='';
}
const AddCandidates=({elections})=>{
    return(
        <div className="ma2 pa2">
            <h2 className="mv0">Add Candidates</h2>
            <main className="pa4 white-80">
              <form className="measure center">
                <fieldset id="addCandidate" className="ba b--white pa4 mh0">
                  <SelectBoxCandidate elections={elections}></SelectBoxCandidate>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="candidateName">Candidate Name</label>
                    <input className="pa2 input-reset white ba bg-transparent hover-bg-white hover-white w-100" type="text" name="candidateName"  id="candidateName"/>
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="candidateDob">Candidate Date of Birth</label>
                    <input className="b pa2 white input-reset ba bg-transparent hover-bg-white hover-white w-100" type="date" name="candidateDob"  id="candidateDob" min="18"/>
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="candidateEmail">Candidate email</label>
                    <input type="email" className="b pa2 white input-reset ba bg-transparent hover-bg-white hover-white w-100" name="candidateEmail" id="candidateEmail"/>
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="candidateInfo">Candidate info</label>
                    <textarea className="b pa2 white input-reset ba bg-transparent hover-bg-white hover-white w-100" name="candidateInfo" id="candidateInfo" rows="5"/>
                  </div>
                <div className="">
                  <input className="b ph3 pv2 input-reset ba white b--white bgTransparent bgWhiteOnHover grow pointer f6 dib" type="button" value="Add Candidate" onClick={onAddCandidate}/>
                </div>
                </fieldset>
              </form>
            </main>
        </div>
    );
}

export default AddCandidates;