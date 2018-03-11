// Initial Values
var name = "";
var dest = "";
var time = 0;
var freq = "";
// Capture Button Click
$("#add-user").on("click", function(event) {
  event.preventDefault();
  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
  name = $("#nameInput").val().trim();
  dest = $("#destInput").val().trim();
  time = $("#timeInput").val().trim();
  freq = $("#freqInput").val().trim();
  // Code for the push
  dataRef.ref().push({
    name: name,
    dest: dest,
    time: time,
    freq: freq,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});
// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {
  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().dest);
  console.log(childSnapshot.val().time);
  console.log(childSnapshot.val().freq);
  console.log(childSnapshot.val().joinDate);
  // full list of items to the well
  $("#trainList").append("<div class='well'><span class='trainName'> " + childSnapshot.val().name +
    " </span><span class='trainDest'> " + childSnapshot.val().dest +
    " </span><span class='trainTime'> " + childSnapshot.val().time +
    " </span><span class='trainFreq'> " + childSnapshot.val().freq + " </span></div>");
// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  // Change the HTML to reflect
  $("#trainName").text(snapshot.val().name);
  $("#email-display").text(snapshot.val().email);
  $("#age-display").text(snapshot.val().age);
  $("#comment-display").text(snapshot.val().comment);
});