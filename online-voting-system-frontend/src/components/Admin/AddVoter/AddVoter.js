import React from 'react';
import SelectBoxVoter from '../SelectBoxVoter/SelectBoxVoter'
const onAddVoter=()=>{
    const name=document.getElementById('voterName');
    const age=document.getElementById('voterAge');
    const email=document.getElementById('email');
    const electiontitle=document.getElementById('electionTitleVoter');
    if(!name.value || !age.value || !electiontitle.value || !email.value){
        window.alert("please fill all fields");
        return;
    }
    if(age.value<18){
        window.alert('voter can not be below 18 years');
        return;
    }
    if(electiontitle.length===0){
        window.alert("please select an election");
        return;
    }
    
    const currVoter={
        name:name.value,
        email:email.value,
        electiontitle:electiontitle.value
    }
    fetch('http://localhost:3000/addvoter',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(currVoter)
    }).then(response=>response.json()).then(voter=>{
        if(voter==='voter already exists'){
            alert('such a voter already exists');
            return ;
        }
        else window.alert(`voter resgistered! voter id is ${voter.voterid}. please do not share this voter id till the time you set your password`)
    })
    name.value='';
    age.value='';
    email.value='';
    electiontitle.value='';
}
const AddVoter=({elections})=>{
    return(
        <div className="ma2 pa2">
            <h2>Add Voter</h2>
            <main className="pa4 white-80">
              <form className="measure center">
                <fieldset id="addVoter" className="ba b--white pa4 mh0">
                  <SelectBoxVoter elections={elections} ></SelectBoxVoter>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="voterName">Voter Name</label>
                    <input className="pa2 input-reset white ba bg-transparent hover-bg-white hover-white w-100" type="text" name="voterName"  id="voterName"/>
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="voterAge">Voter Age</label>
                    <input className="b pa2 white input-reset ba bg-transparent hover-bg-white hover-white w-100" type="number" name="voterAge"  id="voterAge" min="18"/>
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="email">Voter Email</label>
                    <input className="b pa2 white input-reset ba bg-transparent hover-bg-white hover-white w-100" type="email" name="email"  id="email" min="18"/>
                  </div>
                <div className="">
                  <input className="b ph3 pv2 input-reset ba white b--white bgTransparent bgWhiteOnHover grow pointer f6 dib" type="button" value="Add Voter" onClick={onAddVoter}/>
                </div>
                </fieldset>
              </form>
            </main>

        </div>
    );
}

export default AddVoter;