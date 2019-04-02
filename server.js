const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const knex=require('knex');
const pg=require('pg');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'voting'
  }
});

const app=express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.json('voters');
});

app.post('/addelection',(req,res)=>{
    const {electiontitle,date}=req.body;
    return db('election').insert({electiontitle:electiontitle,
        date:date}).then(data=>res.json('election added'))
//    .catch((err)=>res.status(400).json('election not added'));
    .catch(err=>res.status(400).json('election not added'));
});

app.post('/addvoter',(req,res)=>{                      
    const {name,email,electiontitle}=req.body;
    db('voters').select('id').where({email:email}).then(data=>{
        if(data.length!==0){
            db('vote').select('electiontitle').where({voterid:data[0].id}).then(votes=>{
                let voterFound=false;
                votes.forEach((vote,i)=>{
                    if(vote.electiontitle===electiontitle){
                        voterFound=true;
                        res.status(400).json('voter already exists');
                        return;
                    }
                })
                
                if(voterFound===false){
                    db('vote').insert({voterid:data[0].id,electiontitle:electiontitle})
                    .then(()=>{return res.json({voterid:data[0].id})})
                }
            })
        }                                                         
        else{
            db.transaction(trx=>{
                trx.insert({
                    name:name,
                    email:email
                }).into('voters').returning('*')
                .then(voter=>{
                    return trx('vote').returning('*').insert({
                        voterid:voter[0].id,
                        electiontitle:electiontitle,
                    }).then(newVoter=>{
                        res.json(newVoter[0]);         
                    })
                }).then(trx.commit).catch(trx.rollback);
            }).catch(err=>res.status(400).json(err));
        }
        })
        
    
});   


app.post('/addcandidate',(req,res)=>{
    const {name,email,dob,information,electiontitle} =req.body;
    db('candidates').select('id').where({email:email}).then(data=>{
//        console.log(data[0].id);
        if(data.length!==0){
            db('results').select('electiontitle').where({candidateid:data[0].id}).then(elections=>{
                let candidateFound=false;
                elections.forEach((election,i)=>{
                    if(election.electiontitle===electiontitle){           
                        candidateFound=true;
                        res.json('candidate already exists');
                        return;
                    }
                })
                if(candidateFound===false)
                {
                    db('results').insert({
                        candidateid:data[0].id,
                        electiontitle:electiontitle
                    }).then(()=>{
                        return res.json(data[0].id);
                    })   
                }
                    
                })
        }
        
        else{
                db.transaction(trx=>{
                    trx.insert({
                        name:name,
                        email:email,
                        dob:dob,
                        information:information
                    }).into('candidates').returning('*')
                    .then(candidate=>{
                        return trx('results').insert({
                            candidateid:candidate[0].id,
                            electiontitle:electiontitle,
                        }).returning('*').then(result=>res.json(result[0].candidateid))
                    }).then(trx.commit).catch(trx.rollback);
                }).then().catch(err=>res.status(400).json(err));
            }
        })
    })
        
app.put('/votersetpassword',(req,res)=>{
    db('voters').select('password').where({id:req.body.id}).then(data=>{
        if(data.length===0){
            return res.status(400).json('voter not found');
        }
        if(data[0].password.length===0){
//            db('voters').insert({password:req.body.password}).where({id:req.body.id}).returning('*').then(voter=>{console.log(data)});
            db('voters').update({password:req.body.password}).where({id:req.body.id}).returning('*')
                .then().catch(err=>res.status(400).json(err));
            res.json('password set');
        }
        else return res.status(400).json('password already exists');
    })
});

app.post('/votersignin',(req,res)=>{
    db('voters').select('id','password','name').where({id:req.body.id}).then(data=>{
        if(data.length===0){
            return res.status(400).json('wrong credentials');
        }
        else if(data[0].password.length!==0 && data[0].password===req.body.password){
            return res.json(data[0]);
        }
        else return res.status(400).json('wrong credentials');
    }).catch(err=>{res.json("wrong credentials")})
});

app.put('/vote',(req,res)=>{
    ////// req:  voterid, candidateid, electiontitle
    db.transaction(trx=>{
        trx('vote').update({votedfor:req.body.candidateid}).where({voterid:req.body.voterid,electiontitle:req.body.electiontitle})
            .returning('votedfor')
            .then(data=>{
            return trx('results').increment('numvotes',1).where({candidateid:data[0],electiontitle:req.body.electiontitle})
        }).then(trx.commit).catch(trx.rollback);
    }).then(()=>{res.json('vote added')})
    .catch(err=>{
        console.log(err);
        res.status(400).json('error voting')});
});


app.get('/currentelections',(req,res)=>{                ////////////////////
    db('election').select('*').where('won','=',0).then(elections=>{
        res.json(elections);
    })
});

app.put('/announceresults',(req,res)=>{                   
    const {electiontitle} =req.body;
//    db('results').max('numvotes').then((a)=>{console.log(a[0].max);});
    //db('results').select(db('results').max('numvotes').then(data=>{return data[0].max})).then(data=>{console.log(data)});
//    db('results').max('numvotes').where({electiontitle:electiontitle}).then(data=>{res.json(data[0].max)});
    db('results').select('candidateid').where({numvotes:db('results').max('numvotes').where({electiontitle:electiontitle}),electiontitle:electiontitle})
        .then(data=>{
        if(data.length===0){
            return res.json('error announcing');
        }
        else if(data.length>1){
            res.json(data);              ///////array of candidate ids
        }
        else{
            db('election').update({won:data[0].candidateid}).where({electiontitle:electiontitle}).then(()=>{
                res.json('result announced')}).catch(err=>{res.json('error announcing')
            });
        }
        
    });
});

app.get('/getresults',(req,res)=>{
    db('election').select('electiontitle','won').where('won','!=',0).orderBy('date','desc').then(data=>{
        res.json(data);
    })
});

app.post('/getelections',(req,res)=>{
    const { voterid }=req.body;
//    console.log(req.body)
//    db('election').select('won').where('won','!=','0').then(elections=>{
//        
//    })
    const electionArray=[];
    db('vote').select('electiontitle').where({voterid:voterid,votedfor:0}).then(data=>{
//        console.log("outside ",data);
        data.forEach((electionTitle,i)=>{
            db('election').select('electiontitle').where({electiontitle:electionTitle.electiontitle,won:0}).then(election=>{
//                console.log("inside ",election);
                if(election.length!==0){
                    electionArray.push(election[0]);
                }
                if(i===data.length-1){
//                    console.log("election array ",electionArray);
                    return res.json(electionArray);
                }
            })
            
//        return res.json(data);
        });
//    });
});
});

app.post('/getcandidates',(req,res)=>{
    db('results').select('candidateid').where({electiontitle:req.body.electiontitle}).then(ids=>{
        const candidateIds=ids.map(id=>{
            return id.candidateid;
        })
        db('candidates').select('*').whereIn('id',candidateIds).then(candidates=>{
            res.json(candidates);
        });
    })
    
});

app.listen(3000,()=>{
    console.log("app is running on port 3000");
});



/*

/addelection  --> post -->'success/failure'                         ///////ok
/addvoter  --> post -->newVoter                                     //////ok         //multiplecheck      //done 
/addcandidate  --> post -->newCandidate id                          //////ok         //multiplecheck      //done
/getresults --> get -->allresults                                   //ok   
/announceresults --> put -->success/failure                         //ok
/currentelections--> get-->allcurrentelections in form of an array  //ok
/votersignin-->post-->voter id,name,password                        /////ok
/votersetpassword-->put -->success/failure                          /////ok
/vote-->put-->success/faliure                                       /////ok
/getelections-->post-->array of election ids                         /////ok
/getcandidates                                                      //////ok
*/