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


database.ref().orderByChild('name').on("child_added", function (data) {
    // Use ` not ""
    $("#trains").append(`<tr>
      <td scope="row">${data.val().name}</td>
      <td>${data.val().destination}</td>
      <td>${data.val().trainTime}</td>
      <td>${data.val().frequency}</td>
      <td>${data.val().min}</td>
    </tr>`)
});

$(".submit-button").on("click", function (event) {
    event.preventDefault();
    var name = $("#train-text").val();
    var destination = $("#destination-text").val();
    var trainTime = $("#train-time").val();
    var frequency = $("#frequency").val();
    var min = $("#min").val();
    database.ref().push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        min: min
    });
});


