(function(){
  // Initialize Firebase
         var config = {
             apiKey: "AIzaSyCHUgwZjKDmD1MaKIJsorxnfMw5iFvlL5w",
             authDomain: "pizzeria-f398a.firebaseapp.com",
             databaseURL: "https://pizzeria-f398a.firebaseio.com",
             projectId: "pizzeria-f398a",
             storageBucket: "pizzeria-f398a.appspot.com",
             messagingSenderId: "67320074020"
         };
         firebase.initializeApp(config);
 
     //var pizzas = document.getElementById('pizzas');
     
     /* This is for changes made on the items
     *dbRef.on('child_changed', snap => {
     *        console.log(snap.key + ': ' + snap.val())
     *    }); 
     */ 
     
     var app = angular.module('pizzApp', ['ngMaterial', 'firebase']);
 
 app.factory("pizzas", ["$firebaseArray",
   function($firebaseArray) {
     // create a reference to the database where we will store our data
     var dbRefPizzas = firebase.database().ref().child("Pizzas");
     console.log("Getting data from DB");
     return $firebaseArray(dbRefPizzas);
   }
 ]);
 
 app.controller('ShowPizzas', ["$scope", "pizzas", 
         function($scope, pizzas) {
             // todo// Get keys for Pizzas
             $scope.pizzas = pizzas;
             /*dbRefPizzas.on('child_added', snap => {
 
             // print keys, pizza name
             //console.log("Pizzas: " + snap.key);
 
             // get values within keys
             //item = dbRefPizzas.child(snap.key);
 
             //commented out to try $firebaseObject
             item.on('child_added', snap => {
                 console.log(snap.key + ': ' + snap.val())
             }); 
         });*/
         }
     ]);
 }());
 
 var loggedUser;
 initApp = function() {
         firebase.auth().onAuthStateChanged(function(user) {
           if (user) {
             // User is signed in.
             var displayName = user.displayName;
             var email = user.email;
             var emailVerified = user.emailVerified;
             var photoURL = user.photoURL;
             var uid = user.uid;
             var phoneNumber = user.phoneNumber;
             var providerData = user.providerData;
             var login = document.getElementById('login');
             loggedUser = user;
             user.getIdToken().then(function(accessToken) {
               //Show user name 
               
               
             });
           } else {
             // User is signed out.
             //document.getElementById("logName").innerHTML ='Sign in';
               
             
           }
         }, function(error) {
           console.log(error);
         });
       };
 
       window.addEventListener('load', function() {
         initApp()
 });
 
 
 
 $(document).ready(function(){
     function getView(nameView){
     
     if (name == ""){
         return;
     }
     
     var ajax = new XMLHttpRequest();
     
     ajax.onreadystatechange = function(){
         if (ajax.readyState == 4 && ajax.status == 200){
                $('#viewdiv').html(ajax.responseText)
         }
     };
     
         ajax.open('GET', nameView + '.html', true);
         ajax.send();
     }
     
     $("#carrito").on('click', function(){
         $("#viewdiv").load("/public/carrito.html", true);
         $("#greeting").hide();
     });
     
     $("#perfil").on('click', function(){
         if(loggedUser != null){
             $("#viewdiv").load("/public/perfil.html", true);
             $("#greeting").hide();
             var info = $("#info");
             //name = loggedUser.displayName.split(' ');
             var text = loggedUser.displayName;
             info.text(text);
         }
     });
     
     
     $("#logout").on('click', function(){
         firebase.auth().signOut();
         
     });
     
     $('#order').on('click', function(){
         $("#viewdiv").load("/public/menu.html", true);
         $("#greeting").hide();
     });
     
 });