const remote = require('electron').remote;

let weatherApp = angular.module('WeatherApp', [
    'ngMaterial'
]);

weatherApp.controller('WeatherController', function($scope, $http, $interval) {
    document.getElementById('close-window').addEventListener('click', function(e) {
        let win = remote.getCurrentWindow();
        win.close();
    });
    
    function getWeather() {
        $http.get('http://192.168.1.237/current').then(function(response) {
            $scope.data = response.data;
        });
    }

    function getWebcam() {
        $scope.webcam = 'http://192.168.1.20:2000/latest.jpg?'+new Date();
    }

    getWeather();
    getWebcam();

    $interval(function() { getWeather() }, 60000);
    $interval(function() { getWebcam() }, 120000);
});

weatherApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
       .primaryPalette('grey');
});
