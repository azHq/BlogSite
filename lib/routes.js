/*Router.route('/navbar', function () {
  this.render('navbar');
});*/
import { Session } from 'meteor/session';
Router.route('/home', function () {
  Session.set("state",0);
  this.render('home');

  
});

Router.route('/writeblog', function () {
  
  Session.set("state",1);
  if(Meteor.userId()!=null) this.render('writeblog');
  else this.render('home');
});

Router.route('/manageblog', function () {
  
  Session.set("state",2);
  if(Meteor.userId()!=null) this.render('manageblog');
  else this.render('home');
});

Router.route('/addblog', function () {
  
  Session.set("state",2);
  if(Meteor.userId()!=null) this.render('manageblog');
  else this.render('home');
});


/*import '../client/home.html';
import '../client/main.html';

exposed = FlowRouter.group();

exposed.route('/', {
triggersEnter: function () {
if (Meteor.loggingIn() && typeof Meteor.userId() !== 'undefined') {
FlowRouter.go("/main");
}
},
action: function () {
BlazeLayout.render("main", {content: "home"});
}
});

FlowRouter.route('home',{

	name:'home',
	action(){

		console.log("hello azaz");
		BlazeLayout.render('home');
	}
});
FlowRouter.route("/",{

	name:'main',
	action(){

		BlazeLayout.render('main');
	}
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('home', {main: 'home'});
  }
};*/

