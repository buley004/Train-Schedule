// Initialize Firebase
var config = {
    apiKey: "AIzaSyAlzUxh4ztKd8UXTjyPDLc0pfWrJ8zZGGg",
    authDomain: "train-schedule-8e110.firebaseapp.com",
    databaseURL: "https://train-schedule-8e110.firebaseio.com",
    projectId: "train-schedule-8e110",
    storageBucket: "",
    messagingSenderId: "861150715836"
};
firebase.initializeApp(config);
var database = firebase.database();

// Initial Values
var name = "";
var dest = "";
var firstTime = "";
var freq = "";

// Capture Button Click
function addTrain() {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#firstTime").val().trim();
    freq = $("#freq").val().trim();

    console.log(trainName, destination, firstTime, freq);

    // Code for handling the push
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        freq: freq,
    });

}

$('.submit').on('click', addTrain());