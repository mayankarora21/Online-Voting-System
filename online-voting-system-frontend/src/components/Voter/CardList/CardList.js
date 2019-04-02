import React from 'react';
import Card from '../Card/Card';
const CardList=({candidates})=>{

    const allCandidates=candidates.map((currCandidate,i)=>{
        return <Card candidate={currCandidate} key={i}></Card>
    })
    return(
        <div className="">
            {allCandidates}
        </div>
    );
}
export default CardList;