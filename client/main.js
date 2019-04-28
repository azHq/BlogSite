import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './main.html';
import '../lib/routes.js';
import './writeblog.html';
import './main.html';
import './manageblog.html';

Blogs = new Meteor.Collection('blogs') ;

Meteor.startup(() => {


   navigator.geolocation.getCurrentPosition(function(position) {
      
      
        Session.set("latitude",position.coords.latitude);
        Session.set("longitude",position.coords.longitude);
    });
});

Template.navbar.events({
  'click #signup':function (event) {
    
    	var top=document.getElementById("signupform").style.top;

      if(top=="-900px"){

        document.getElementById("signupform").style.top="120px";
        document.getElementById("signinform").style.top="-900px";
      }
      else{
          document.getElementById("signupform").style.top="-900px";
      }
      
    	
  },
});

Template.navbar.events({
  'click #signin':function (event) {
    
      var top=document.getElementById("signinform").style.top;

      if(top=="-900px"){

        document.getElementById("signinform").style.top="120px";
        document.getElementById("signupform").style.top="-900px";
      }
      else{
          document.getElementById("signinform").style.top="-900px";
      }
      
      
  },
});
Template.navbar.events({
  'click #writeblog':function (event) {
    
      

      if(Meteor.userId()==null&&Session.get("authState")==1){

        var top=document.getElementById("signinform").style.top;
        if(top=="-900px"){

          document.getElementById("signinform").style.top="120px";
          document.getElementById("signupform").style.top="-900px";
        }
        else{
            document.getElementById("signinform").style.top="-900px";
        }
      
      }
      else{

        var top=document.getElementById("signupform").style.top;
        if(top=="-900px"){
          
          document.getElementById("signupform").style.top="120px";
          document.getElementById("signinform").style.top="-900px";
          
        }
        else{

            document.getElementById("signupform").style.top="-900px";
        }
        
      }
      
      
      
  },
});

Template.navbar.helpers({
  equals: function(a) {

      return a == Session.get('state');
    }
});

Template.signup.events({
	'submit form':function(event,template){

		event.preventDefault();
    document.getElementById("signupform").style.top="-900px";
		var name=event.target.name.value;
		var email=event.target.email.value;
		var password=event.target.password.value;
		var phone=event.target.phonenumber.value;
    Session.set("authState",1);
		Accounts.createUser({
			username:name,
			email:email,
			password:password,
			phone:phone
		})

	}

});

Template.navbar.events({
  'click #signout':function (event) {
    
      event.preventDefault();
      Meteor.logout();
  },
});


Template.signin.events({
	'submit form':function(event,template){
    
		event.preventDefault();
		var email=event.target.email.value;
		var password=event.target.password.value;
		
    Meteor.loginWithPassword(email,password,function(error) {

       if(error) {
            
            alert("Invalid email or password");
        } 
        else {
          
            document.getElementById("signinform").style.top="-900px";
        }

      });
    
	}

});

Template.blog.events({
  'submit #blogForm':function(e){
    e.preventDefault() ;
    var title = $('#blogTitle').val() ;
    var body = $('#blogBody').val() ;
    if(title.length && body.length){

    
      navigator.geolocation.getCurrentPosition(function(position) {

       
        Meteor.call('submitPost',title,body,position.coords.latitude,position.coords.longitude) ;
        Router.go('/manageblog');
          
    });
     

    }else{
      alert("title or body couldn't be empty") ;
    }    
  }
});

Template.bloglist.events({
  'click #delete'(event, instance) {

    Blogs.remove(this._id);
  }
});
Template.bloglist.blogs= function(){

      return Blogs.find({'id':Meteor.userId()}).fetch();
}

Template.Allbloglist.blogs= function(){

        var latitude=Session.get("latitude");
        var longitude=Session.get("longitude");
        
        console.log(latitude);

      return Blogs.find({geometry:
        { 
          $near :
          {
            $geometry:{ type:"Point", coordinates:[ latitude,longitude]},
            $minDistance: 1000,
            $maxDistance: 5000
          }
        }
       }).fetch();
}

