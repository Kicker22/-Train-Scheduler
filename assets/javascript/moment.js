var firebaseConfig = {
    apiKey: "AIzaSyBzKC6Qbbq1WBaoRkaocPxcqXroI3vIf10",
    authDomain: "bootcamp-activity.firebaseapp.com",
    databaseURL: "https://bootcamp-activity.firebaseio.com",
    projectId: "bootcamp-activity",
    storageBucket: "bootcamp-activity.appspot.com",
    messagingSenderId: "380238233422",
    appId: "1:380238233422:web:d80eda2e3b55b3f2"
};


firebase.initializeApp(firebaseConfig);
var database = firebase.database();

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

    $("#train-text").val('');
    $("#destination-text").val('');
    $("#train-time").val('');
    $("#frequency").val('');
    $("#min").val('');

});

database.ref().orderByChild('name').on("child_added", function (data) {

    var tName = data.val().name;
    var tDestination = data.val().destination;
    var tFrequency = data.val().frequency;
    var FirstTrain = parseInt(data.val().trainTime);
    

    console.log(tName)
    console.log(tDestination)
    console.log(tFrequency)
    console.log(FirstTrain)

    var cTime = moment().format("HH:mm");
  

    var tempArr = cTime.split(":")
    var time = moment()
        .hours(tempArr[0])
        .minutes([1])
    var maxMoment = moment.max(moment(), time)
    console.log(maxMoment)

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
  
  

    $("#trains").append(`<tr>
      <td scope="row">${data.val().name}</td>
      <td>${data.val().destination}</td>
      <td>${data.val().trainTime}</td>
      <td>${data.val().frequency}</td>
      <td>${arival.text()}</td>
      <td>${minuets.text()}</td>

    </tr>`)
  
});
    





