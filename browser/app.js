var app = angular.module('annyang', []);
var update, updateCount;

app.controller('MainCtrl', function ($scope, $http) {

  // var commands = { //object of commands
  //     'hello': function() { alert('Hello world!'); }, //key is what you want to say
  //     //you might need $scope.apply() if you use angular
  //   };

  /////ANNYANG
  if (annyang) {
    // Let's define a command.
    let count = 0;

    var commands = { //object of commands
    };

    // Add our commands to annyang
    annyang.addCommands(commands);
    // Start listenin
    annyang.debug();
    annyang.start();
  }

  $scope.playing = true;
  $scope.on = true;

  $scope.words = [];

  $scope.wordObj = {};

 let idx = 0;

  $scope.word = "";

  $scope.submitForm = function () {

    $scope.words.push({'trackedWord': $scope.word, 'count': 0,  'index': idx});
    var curWord = $scope.words[$scope.words.length -1];
    //var i = $scope.words.length - 1;
    commands[$scope.word] = function (){
      // console.log('hi');
      // $scope.sendText('+17188736102', curWord.trackedWord);
    }
    $scope.annyangForm.$setPristine();
    $scope.annyangForm.$setUntouched();
    annyang.addCommands($scope.word, commands[$scope.word]);
    idx++;
    //annyang.addCommands(commands);
    $scope.word = null;
  }


  $scope.toggle = function () {
    if ( $scope.isPlaying() ) {
      annyang.pause();
      $scope.playing = false;
    }
    else {
      annyang.resume();
      $scope.playing = true;
    }
  };

  $scope.isPlaying = function () {
    return $scope.playing;
  }

  $scope.isOn = function () {
    return $scope.on;
  }

  $scope.stopOrStart = function () {
    if ( $scope.isOn() ) {
      annyang.abort();
      $scope.on = false;
    }
    else {
      annyang.start();
      $scope.on = true;
    }
  };
  // $scope.remove = function (word) {
  //   console.log(word);
  //   annyang.removeCommands(word);
  //   console.log(commands);
  // }

  $scope.getText = function (){
    annyang.getText();
  }


  updateCount = function (word, count) {
    $scope.words.forEach(function (el, i) {
      el.count = annyang.allCommands[i].count;
    })
    $scope.$evalAsync();
  }

    update = function (word, count) {
    $scope.sendText(word, count);
    $scope.$evalAsync();
  }
  $scope.sendText = function (word, count) {
    $http.post('/' + word + '/' + count)
    .then(function () {
      console.log('text sent');
    })
  }
});

