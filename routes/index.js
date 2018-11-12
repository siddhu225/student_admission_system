var express = require("express");
var router = express.Router();
var firebase = require("firebase");
var bodyParser = require("body-parser");
var admin = require('firebase-admin');
var serviceAccount = require('./admission-13c1c-firebase-adminsdk-3cjpp-3927b022bb.json');

/* GET home page. */





var config = {
  apiKey: "AIzaSyACEE1wgUKmfWWHOpKsiNnrgdkKAY0jlQI",
  authDomain: "admission-13c1c.firebaseapp.com",
  databaseURL: "https://admission-13c1c.firebaseio.com",
  projectId: "admission-13c1c",
  storageBucket: "admission-13c1c.appspot.com",
  messagingSenderId: "582112575346"
};
firebase.initializeApp(config);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://admission-13c1c.firebaseio.com/"
});

var database = firebase.database();

async function checkSignIn(req, res, next) {
	const user = await firebase.auth().currentUser;
	if(user){
		next()
	}else{
		res.render("login",{error : "you have to login first"})
	}
}

router.get('/login',function(req,res,next){

   res.render('login');

});

router.get('/logout',function(req,res,next){

   res.redirect('/login');

});


router.post('/login',function(req,res,next){

    var email=req.body.email;
    var pass=req.body.pass;
    var auth = firebase.auth();
    // var promise = auth.signInWithEmailAndPassword(email, pass);

if (email && pass) {
  firebase.auth().signInWithEmailAndPassword(email,pass)
  .then(function(){


     firebase.auth().onAuthStateChanged(firebaseUser => {
   if (firebaseUser) {

     if (firebaseUser.emailVerified) {
       database.ref('/students').orderByChild('email').equalTo(email).on("value", function(snapshot) {
        var val=snapshot.val();
        if(val){
          var id=Object.keys(val)[0];
          res.redirect('/students/'+id);
        }else{
          res.redirect('/students/');
        }
    })


  }


}

});
}).catch(function (error) {
				var error = error.code;
				res.render("login",{error : error});
		});
	} else {
		res.render("login", { error: "Fields must not be empty" });
	}

// res.render('login',{error:"your email is not yet registered"});



});

router.get('/student/signin/', function(req, res, next) {
  res.render('s_admission');
});

router.post('/student/signin/',function(req,res,next) {

    var data=req.body;
    var email=req.body.email;
    var pass=req.body.pass;
    var image=req.body.image;

    var auth = firebase.auth();
    var user = firebase.auth().currentUser;

    var promise = auth.createUserWithEmailAndPassword(email,pass);

   promise.then(function(user) {
          firebase.auth().currentUser.sendEmailVerification();
          database.ref('/students').once('value').then(function(snapshot){
          var val = snapshot.val();
          var t=Object.keys(val).length;
          t=t+1;
          console.log(t);
          var p="2015BCS00"+t;

          database.ref('/students/').push({

                      profilepic:req.body.image,
                      regno:p,
                      name:req.body.fname,
                      dob:req.body.dob,
                      programme:req.body.programme,
                      branch:req.body.branch,
                      admissionYear:req.body.ayear,
                      bloodgroup:req.body.blood,
                      gender:req.body.gender,
                      category:req.body.category,
                      pwd:req.body.pwd,
                      nativelanguage:req.body.nlang,
                      jeeentrancerank:req.body.jrank,
                      paddress:req.body.paddress,
                      mnumber:req.body.mnumber,
                      email:req.body.email,
                      password:req.body.pass,
                      caddress:req.body.caddress,
                      nfather:req.body.nfather,
                      foccupation:req.body.noccupation,
                      fqualification:req.body.qual,
                      fmobile:req.body.mno,
                      femail:req.body.femail,
                      nmother:req.body.nmother,
                      moccupation:req.body.moccupation,
                      mqualification:req.body.mqual,
                      mmobile:req.body.mmno,
                      memail:req.body.memail,
                      amount:req.body.amount,
                      balanceamount:req.body.bamount,
                      dchellan:req.body.dchellan,
                      psa:req.body.pyes,
                      oac:req.body.oyes,
                      scj:req.body.syes,
                      mac:req.body.tenyes,
                      medac:req.body.myes,
                      cccert:req.body.cyes,
                      resbi:req.body.ryes,
                      psr:req.body.wyes
});


});
          });
          res.redirect('/login');

});

router.get('/login/forgot/', function(req, res, next) {
  res.render('fpassword');
});

router.post("/login/forgot",function(req,res,next){

   var email=req.body.email;
   var auth = firebase.auth();

   auth.sendPasswordResetEmail(email).then(function() {


}).catch(function(error) {
  // An error happened.
});


   firebase.auth().onAuthStateChanged(user => {
    if (user) {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
        console.log('email sent!');
        res.redirect('/login');
      });

    } else {
      res.render('fpassword',{error:"your email is not yet registered..please signup"});

    }
  });

});



router.get('/students',checkSignIn, function(req, res, next) {
  database.ref("/students").once("value").then(function(snapshot){
          var val=snapshot.val();
          res.render('students',{
             users : val
          });
  });

});

router.get('/student/edit/:id',checkSignIn,function(req,res,next){

    var id=req.params.id;

    database.ref('/students/'+id).once('value').then(function(snapshot){

      var val=snapshot.val();

      if(val){
        res.render('edit_student',{
            student :val,
            id  : id
        })
      }
});

});




router.post("/student/edit/:id",checkSignIn,function(req,res,next){

    var id=req.params.id;
    database.ref('/students/'+id+'/').update({
      // profilepic:req.body.image,
      name:req.body.firstname,
      dob:req.body.dob,
      branch:req.body.branch,
      admissionYear:req.body.ayear,
      pwd:req.body.pwd,
      paddress:req.body.paddress,
      mnumber:req.body.mnumber,
      email:req.body.email,
      password:req.body.pass,
      nfather:req.body.nfather,
      foccupation:req.body.noccupation,
      fqualification:req.body.qual,
      fmobile:req.body.mno,
      femail:req.body.femail,
      nmother:req.body.nmother,
      moccupation:req.body.moccupation,
      mqualification:req.body.mqual,
      mmobile:req.body.mmno,
      memail:req.body.memail,
      amount:req.body.amount,
      balanceamount:req.body.bamount,
      dchellan:req.body.dchellan,
      psa:req.body.pyes,
      oac:req.body.oyes,
      scj:req.body.syes,
      mac:req.body.tenyes,
      medac:req.body.myes,
      cccert:req.body.cyes,
      resbi:req.body.ryes,

    });
  res.redirect('/students');
});

router.get("/students/:id",function(req,res,next){

    var id=req.params.id;
     database.ref('/students/'+id+'/').once('value').then(function(snapshot){

         var val=snapshot.val();

          res.render('student_profile',{
            student : val,
            id  :id
          });
});
});


router.get('/students/delete/:id/',checkSignIn,function (req,res) {
   var id = req.params.id;


   var ref = database.ref('/students/'+id).remove();

   res.redirect('/students');
 });

router.get("/students/edit/:id",checkSignIn,function(req,res,next){

    var id=req.params.id;
    var test;
     database.ref('/students/'+id+'/').once('value').then(function(snapshot){
         var val=snapshot.val();
          res.render('studentprofile_edit',{
            student : val,
            id  :id,
          });
});



});

router.post("/students/edit/:id",checkSignIn,function(req,res,next){

    var id=req.params.id;
    console.log(id);
    var p1=req.body.profilepic;
    var p2=req.body.profilepic1;
    if(p1){
     database.ref('/students/'+id+'/').update({
       profilepic:req.body.profilepic,
       paddress:req.body.address,
       mnumber:req.body.phone,
       fmobile:req.body.fphone,
       femail:req.body.femail,
       mmobile:req.body.mphone,
       memail:req.body.memail

     })
}else{
     database.ref('/students/'+id+'/').update({
       profilepic:req.body.profilepic1,
       paddress:req.body.address,
       mnumber:req.body.phone,
       fmobile:req.body.fphone,
       femail:req.body.femail,
       mmobile:req.body.mphone,
       memail:req.body.memail
     })

   }
   res.redirect('/students/'+id);


   console.log("saved successfully");

});





router.get('/faculty/signin',function(req,res,next){
  res.render('faculty');
});

router.post('/faculty/signin',function(req,res,next){

     var email=req.body.email;
     var pass=req.body.password;
     var auth = firebase.auth();
     var user = firebase.auth().currentUser;

     var promise = auth.createUserWithEmailAndPassword(email,pass);

     promise.then(function(user) {// You are forgetting this reference.
       firebase.auth().currentUser.sendEmailVerification();

         database.ref('/faculty').push({

           name:req.body.name,
           dob:req.body.dob,
           gender:req.body.gender,
           qualification:req.body.qual,
           subject:req.body.subject,
           email:req.body.email,
           pass:req.body.password,
           phone:req.body.phone,
           address:req.body.address


         });

     });

     res.redirect('/login');


});

module.exports = router;
