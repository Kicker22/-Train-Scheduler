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

// inital variables
var trainName = $('#');
var destination = '';
var frequency = 0;
var nextArival = '';
var minutes = 0;

$(".submit-button").on('click', function (event) {
    event.preventDefault()
    td.text("random text")
    tableRow.append(td)
    $('tbody').prepend(tableRow)

})