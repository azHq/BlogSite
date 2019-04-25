import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './main.html';
import '../lib/routes.js';

Template.navbar.events({
  'click #signup':function (event) {
    
    	var top=document.getElementById("form").style.top;

      if(top=="-900px"){

        document.getElementById("form").style.top="120px";
      }
      else{
          document.getElementById("form").style.top="-900px";
      }
      
    	
  },
});

Template.navbar.events({
  'click #signin':function (event) {
    
      var top=document.getElementById("signinform").style.top;

      if(top=="-900px"){

        document.getElementById("signinform").style.top="120px";
      }
      else{
          document.getElementById("signinform").style.top="-900px";
      }
      
      
  },
});
Template.navbar.events({
  'click #writeblog':function (event) {
    
      var top=document.getElementById("signinform").style.top;

      if(Meteor.userId()==null){

        if(top=="-900px"){

          document.getElementById("signinform").style.top="120px";
        }
        else{
            document.getElementById("signinform").style.top="-900px";
        }
      
      }
      else{

        console.log("hello azaz");
         this.redirect('/writeblog');
      }
      
      
  },
});

Template.signup.events({
	'submit form':function(event,template){

		event.preventDefault();
     document.getElementById("form").style.top="-900px";
		var name=event.target.name.value;
		var email=event.target.email.value;
		var password=event.target.password.value;
		var phone=event.target.phonenumber.value;
		Accounts.createUser({
			name:name,
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

/*Template.body.helpers({
    registration() {
      return Session.get('showRegister');
    }
 });

Template.signin.events({
    'click button'() {
      alert('Do login stuff!');
    },
    'click .js-show-register'(event) {
      event.preventDefault();
      //Session.set('showRegister', true);
    }
  });

  Template.signup.events({
    'click button'(event) {
      console.log("hhelo");
    	
    },
    'click .js-show-login'(event) {
       event.preventDefault();  
     
      //Session.set('showRegister', false);
    }
  });*/

