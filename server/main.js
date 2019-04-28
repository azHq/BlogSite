import { Meteor } from 'meteor/meteor';
import '../lib/routes.js';
import { Geolocation } from 'meteor/mdg:geolocation';
import { reverseGeocode } from 'meteor/jaymc:google-reverse-geocode';
Blogs = new Meteor.Collection('blogs') ;

Meteor.startup(() => {

/*Meteor.publish("allusers",
  function () {
  	console.log(Meteor.users.find({_id: this.userId}));
    return Meteor.users.find({_id: this.userId});
  }
);*/
  Meteor.methods({
    'submitPost':function(title, body,latitude,longitude){

    	/* var latLng = new ReactiveVar();
    	Tracker.autorun(function(computation) {
        	latLng.set(Geolocation.latLng());
        	if (latLng.get()) {
	            computation.stop();
	            var lat = latLng.curValue.lat;
	            var lng = latLng.curValue.lng;
	            alert(lng);
            
       	 	}
    	});*/

    	/*navigator.geolocation.getCurrentPosition(function(position) {

      		alert(position.coords.latitude);
      		console.log(position.coords.latitude);
            Session.set('lat', position.coords.latitude);
            Session.set('lon', position.coords.longitude);
        	
    });*/
     	
      	var uniqueID = Meteor.userId();
		var username=Meteor.users.findOne({'_id':uniqueID }).username;
      	var began = moment( new Date()).format("MM.DD.YYYY");
 
        Blogs.insert({id:uniqueID,title:title,body:body,date:began,"geometry": {"type": "Point","coordinates": [ latitude,longitude ]},username:username});
        
    }
  });
  
});

