/*Router.route('/navbar', function () {
  this.render('navbar');
});*/

Router.route('/home', function () {
  this.render('home');
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

