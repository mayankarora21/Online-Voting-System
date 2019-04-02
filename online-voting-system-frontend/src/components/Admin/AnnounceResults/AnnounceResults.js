import React from 'react';
import SelectBoxAnnounce from '../SelectBoxAnnounce/SelectBoxAnnounce'
const onAnnounce=(loadResults,loadElections)=>{
    const electionTitleBox=document.getElementById('electionTitleAnnounce');
    fetch('http://localhost:3000/announceresults',{
        method:'put',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({electiontitle:electionTitleBox.value})
    }).then(response=>response.json()).then(data=>{
        if(data==='error announcing'){
            window.alert('there was an error in announcing the results');
        }
        else if(data==='result announced'){
            window.alert('results have been announced. please check results section');
            loadResults();
            loadElections();
        }
        else{
            const tie=[]
            for(let i=0;i<data.length;i++){
                tie[i]=data[i].candidateid;
            }
            window.alert(`there is a tie between ${tie}`);
        }
    })
}

const AnnounceResults=({loadResults,loadElections,elections})=>{
    return(
        <div className="white">
            <h2>Announce Results</h2>
                <main class="pa4 white-80">
                  <form class="measure center">
                    <fieldset id="addVoter" class="ba b--white pa4 mh0">
                      <SelectBoxAnnounce elections={elections}></SelectBoxAnnounce>
                      
                    <div class="ma mt4">
                      <input class="b ph3 pv2 input-reset ba white b--white bgTransparent bgWhiteOnHover grow pointer f6 dib" type="button" value="Announce Results" onClick={()=>onAnnounce(loadResults,loadElections)}/>
                    </div>
                    </fieldset>
                  </form>
            </main>
        </div>
    );
}
export default AnnounceResults;