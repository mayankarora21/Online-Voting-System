import React from 'react';
const onAddElection=(loadElections)=>{
    const electionTitleBox=document.getElementById('election-title');
    const dateBox=document.getElementById('date');
    if(!electionTitleBox.value || !dateBox.value)
    {
        window.alert("please fill all fields");
        return;
    }
    const election={
        electiontitle:electionTitleBox.value,
        date:dateBox.value
    }
    fetch('http://localhost:3000/addelection',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(election)
    }).then(response=>response.json()).then(data=>{
        if(data==='election not added'){
            window.alert('please enter a valid election title');
        }
        else{
            window.alert('election was added');
            loadElections();
        }
    })
    electionTitleBox.value='';
    dateBox.value='';
    
    
}
const AddElections=({loadElections})=>{
    return(
        <div className="ma2 pa2 ">
            <h2>Add Election</h2>
            <main className="pa4 white-80">
              <form className="measure center">
                <fieldset id="sign_up" className="ba b--white pa4 mh0">
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="election-title">Election Title</label>
                    <input className="pa2 input-reset white ba bg-transparent hover-bg-white hover-white w-100" type="text" name="election-title"  id="election-title"/>
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="date">Date of Results</label>
                    <input className="b pa2 white input-reset ba bg-transparent hover-bg-white hover-white w-100" type="date" name="date"  id="date"/>
                  </div>
                <div className="">
                  <input className="b ph3 pv2 input-reset ba white b--white bgTransparent grow pointer f6 dib bgWhiteOnHover" type="button" value="Add Election" onClick={()=>onAddElection(loadElections)}/>
                </div>
                </fieldset>
              </form>
            </main>

        </div>
    );
}

export default AddElections;