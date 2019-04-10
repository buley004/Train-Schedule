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

//update schedule when train is added
database.ref().on("child_added", function (childSnapshot) {

    var row = new $('<tr>');

    // get frequency from new train
    var frequency = childSnapshot.val().freq;

    // get first train time
    var first = childSnapshot.val().firstTime;

    // set first time adjusted
    var firstTime = moment(first, "HH:mm").subtract(1, "years");

    // set current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference
    var difference = moment().diff(moment(firstTime), "minutes") % frequency;
    console.log("Remainder: " + difference);

    // Minutes left till arrival
    var minutes = frequency - difference;
    console.log("MINUTES TILL TRAIN: " + minutes);

    // Next train arrival 
    var nextTrain = moment().add(minutes, "minutes").format("HH:mm");

    row.append($('<td>').text(childSnapshot.val().trainName));
    row.append($('<td>').text(childSnapshot.val().destination));
    row.append($('<td>').text(childSnapshot.val().freq));
    row.append($('<td>').text(nextTrain));
    row.append($('<td>').text(minutes));

    console.log(row);

    $('#trainList').append(row);
});
