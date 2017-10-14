myApp.controller('ProjectsController',
['$scope','$firebaseAuth','$firebaseArray',
 function($scope, $firebaseAuth, $firebaseArray) {

     var ref = firebase.database().ref();
     var auth = $firebaseAuth();

     // putting project info into firebase
     auth.$onAuthStateChanged(function(authUser){
         if(authUser){
             var myProject = ref.child('users').child(authUser.uid).child('myProject');
             var projectInfo = $firebaseArray(myProject);

             $scope.theThings = projectInfo;

             $scope.addProject = function(){
                 projectInfo.$add({
                     title: $scope.title,
                     field: $scope.field,
                     idea: $scope.idea,
                     date: firebase.database.ServerValue.TIMESTAMP
                 }).then(function(){
                     $scope.title ='',
                     $scope.field = '',
                       $scope.idea = ''
                 });
             }

             $scope.deleteMetting = function(key){
                 projectInfo.$remove(key);
             }
         }
     });
}]);
