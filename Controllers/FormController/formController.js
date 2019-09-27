var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const FormSchema = mongoose.model('FromData');


router.get('/get', (req,res)=>{
   getData(req,res);   
});

function getData(req,res){
    FormSchema.find((err,doc)=>{
        if (!err) {
            return res.send(doc);
        }
        else {
            console.log('Error in retrieving Record list :' + err);
            return res.send(err);
        }
    });    
}

router.get('/get/:id',(req,res)=>{
    FormSchema.findById(req.params.id, (err,doc)=>{
        if(!err)
            res.send(doc);
        else{            
            console.log('Error in retrieving book :' + err)
            res.send('Error in retrieving book :' + err)
        }
    });
});

router.put('/put',(req,res)=>{
    FormSchema.findById(req.body.id, (err,doc)=>{
        if(err) return res.send("error form not valid "+ err);
        let response = update(req, doc);    
        res.send(response);        
    });
});

function update(req, doc){
    doc.dept = req.body.dept;
    doc.designation = req.body.designation;
    doc.email = req.body.email;
    doc.games = {...req.body.games};
    doc.otherGames = req.body.otherGames;
    doc.gender = req.body.gender;
    doc.hobbies = req.body.hobbies;
    doc.name = req.body.name;
    doc.password = req.body.password;
    doc.save(function (err, doc) {
        let msg;
        if (!err) {
            console.log(doc.name + " form saved.");
            msg = doc.name + " form saved.";
        }
        else{
            console.error(err);
            msg = "err while updating.";
        }
        return msg;
    });
}


router.delete('/delete/:id', (req,res)=>{
    FormSchema.findByIdAndRemove(req.params.id, (err,doc)=>{
        if (!err) {          
            console.log('Deletion Success :');
        }
        else {
            console.log('Error in while deleting record :' + err);
        }
    });   
    getData(req,res);
});


router.post('/post', (req,res)=>{
    let response = add(req,res);
    res.send(response);
});


function add(req,res){
    var form = new FormSchema(); 
    form.dept = req.body.dept,
    form.designation = req.body.designation,
    form.email = req.body.email,
    form.games = {...req.body.games},
    form.otherGames = req.body.otherGames,
    form.gender = req.body.gender,
    form.hobbies = {...req.body.hobbies},
    form.name = req.body.name
    form.password = req.body.password,

    form.save(function (err, form) {
        let msg;
        if (!err) {
            console.log(form.name + " form saved.");
            msg = form.name + " form saved.";
        }
        else{
            console.error(err);
            msg = "err while saving.";
        }
        return msg;
    });
}

module.exports = router;