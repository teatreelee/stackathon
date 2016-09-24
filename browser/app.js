var app = angular.module('annyang', []);

app.controller('MainCtrl', function ($scope) {

  // var commands = { //object of commands
  //     'hello': function() { alert('Hello world!'); }, //key is what you want to say
  //     //you might need $scope.apply() if you use angular
  //   };

  $scope.words = [];

  $scope.wordObj = {};

  $scope.submitForm = function (word) {

    $scope.words.push({'trackedWord': word, 'count': 0});
    var i = $scope.words.length - 1;
    commands[word] = function (){
      $scope.words[i].count ++;
      $scope.$apply();
    }

    annyang.addCommands(commands);
  }


});

/////ANNYANG
  if (annyang) {
    // Let's define a command.
    let count = 0;

    var commands = { //object of commands
      'hello': function() { alert('Hello world!'); }, //key is what you want to say
      // you might need $scope.apply() if you use angular
    };

    // Add our commands to annyang
    annyang.addCommands(commands);
    // Start listening.
    annyang.debug();
    annyang.start({'continuous': true});
}
