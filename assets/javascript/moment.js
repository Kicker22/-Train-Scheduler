// data for firebase 
var firebaseConfig = {
    apiKey: "AIzaSyBzKC6Qbbq1WBaoRkaocPxcqXroI3vIf10",
    authDomain: "bootcamp-activity.firebaseapp.com",
    databaseURL: "https://bootcamp-activity.firebaseio.com",
    projectId: "bootcamp-activity",
    storageBucket: "bootcamp-activity.appspot.com",
    messagingSenderId: "380238233422",
    appId: "1:380238233422:web:d80eda2e3b55b3f2"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// This on click function grabs the user input wnen the submit button is clicked 
$(".submit-button").on("click", function (event) {
    event.preventDefault();
    var name = $("#train-text").val().trim();
    var destination = $("#destination-text").val().trim();
    var trainTime = $("#train-time").val().trim();
    var frequency = $("#frequency").val().trim();
    var addedTrain = {
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
    }

    console.log(addedTrain)
    database.ref().push(addedTrain)
    
    // This code emptys text inputs after submit
    $("#train-text").val('');
    $("#destination-text").val('');
    $("#train-time").val('');
    $("#frequency").val('');
    $("#min").val('');

});

// this .on updates the dom when child is added 
database.ref().on("child_added", function (data) {

    var tName = data.val().name;
    var tDestination = data.val().destination;
    var tFrequency = data.val().frequency;
    var FirstTrain =data.val().trainTime;
    

    console.log(tName)
    console.log(tDestination)
    console.log(tFrequency)
    console.log(FirstTrain)

    var cTime = FirstTrain
  
    var tempArr = cTime.split(":")
    var time = moment()
        .hours(tempArr[0])
        .minutes(tempArr[1])
    var maxMoment = moment.max(moment(), time)

    // this if/else statment converts the time to 12hr and then tells you minutes remaining 
    var tMinutes;
    var tArrival;
    if(maxMoment === time){
        tArrival = time.format("hh:mm A")
        tMinutes = time.diff(moment(), 'minutes');
    }else{
        var differenceTimes = moment().diff(time, "minutes");
        var tRemainder = differenceTimes % tFrequency;
        tMinutes = tFrequency - tRemainder;
        tArrival = moment()
        .add(tMinutes, "m")
        .format("hh:mm A");
  
    }
    var arival = $("<td>").text(tArrival)
    var minuets = $("<td>").text(tMinutes)

    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
  
  
    // this appends table content to the dom when user submits
    $("#trains").append(`<tr>
      <td scope="row">${data.val().name}</td>
      <td>${data.val().destination}</td>
      <td>${data.val().trainTime}</td>
      <td>${data.val().frequency}</td>
      <td>${arival.text()}</td>
      <td>${minuets.text()}</td>

    </tr>`)
  
});

database.ref().on("value", function (snapshot){
$("#train-text").text(snapshot.val());
// $("#destination-text").snapshot.val();
// $("#train-time").snapshot.val();
// $("#frequency").snapshot.val();
// $("#min").snapshot.val();


})




