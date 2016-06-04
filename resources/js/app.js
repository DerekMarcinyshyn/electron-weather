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
        $http.get('http://192.168.1.237/current').success(function(data) {
            $scope.data = data;
        });
    }

    function getWebcam() {
        $scope.webcam = 'http://192.168.1.20:2000/latest.jpg?'+new Date();
    }

    $interval(function() {
        getWeather()}, 10000);

    $interval(function() {
        getWebcam()}, 60000);

    getWeather();
    getWebcam();
});

weatherApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
       .primaryPalette('grey');
    console.log('set theme');

});
