
// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyDIX6dj8U7RgfYYu4LHAe-h-biatuxkz2k",
  authDomain: "train-scheduler-d16c3.firebaseapp.com",
  databaseURL: "https://train-scheduler-d16c3.firebaseio.com",
  projectId: "train-scheduler-d16c3",
  storageBucket: "",
  messagingSenderId: "920553941572"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding train data
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grab user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#train-destination-input").val().trim();
  var trainOne = moment($("#train-one-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    train: trainName,
    destination: trainDest,
    trainOne: trainOne,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.trainOne);
  console.log(newTrain.frequency);


  // Clear all text boxes
  $("#train-name-input").val("");
  $("#train-destination-input").val("");
  $("#train-one-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding train data to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var trainDest = childSnapshot.val().destination;
  var trainOne = childSnapshot.val().trainOne;
  var frequency = childSnapshot.val().frequency;


  console.log(trainName);
  console.log(trainDest);
  console.log(trainOne);
  console.log(frequency);

  
  var trainStart = moment().diff(moment.unix(trainOne), "minutes") % frequency;
  var minutes = frequency - trainStart;
  var arrival = moment().add(minutes, "m").format("hh:mm A");

  console.log(trainStart);
  console.log(minutes);
  console.log(arrival);


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td><td>");
});


