// Link to firebase---------------------
var trainData = new Firebase("https://trainschedulerjz.firebaseio.com/");

//Adding new schedules

$("#addTrainBtn").on("click", function(){
	//Take user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDest = $("#destinationInput").val().trim();
	//var trainStart
	var trainStart = moment($("#startInput").val().trim(), "HH:mm").format("X");
	var trainFreq = moment($("#frequencyInput").val().trim(), "minutes").format("mm");
			console.log(trainFreq);
	//Local object for holding Trains data
	var newTrain={
		tName: trainName,
		tDest: trainDest,
		tStart: trainStart,
		tFreq: trainFreq
	};
	//move up the data to database
	trainData.push(newTrain);
	//console.log input
	console.log(newTrain.tName);
	console.log(newTrain.tDest);
	console.log(newTrain.tStart);
	console.log(newTrain.tFreq);
	//Alert
	alert("New Train it is waiting for you");
	//Erase all inf at the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#startInput").val("");
	$("#frequencyInput").val("");

	return false;
});

//Firebase event dor adding new schedule

trainData.on("child_added", function(childSnapshot, prevChildkey){
	console.log(childSnapshot.val());
	//File all into a variables.
	var trainName = childSnapshot.val().tName;
	var trainDest = childSnapshot.val().tDest;
	var trainStart = childSnapshot.val().tStart;
	var trainFreq = childSnapshot.val().tFreq;
	//console.log variables
	console.log(trainName);
	console.log(trainDest);
	console.log(trainStart);
	console.log(trainFreq);
	//Var "now" and first train schedule
	var tDiff = moment().diff(moment.unix(trainStart, 'X'), "minutes");
		console.log(tDiff);
	//Format frequency
	var trainFreqFormatted = moment.unix(trainFreq, 'minutes');
		console.log(trainFreqFormatted);
	//Time remainder
	var timeRemainder = tDiff % trainFreqFormatted;
		console.log(timeRemainder);
	//Minutes away next train
	var minsAway = trainFreqFormatted - timeRemainder;
		console.log(minsAway);
	//Format the minutes away
	var minsAwayFormatted = moment.unix(minsAway).format("mm");
		console.log(minsAwayFormatted);
	//Next train
	var nextTrain = moment().add(minsAway, "minutes");
	//Next arrival
	var nextArrival = moment(nextTrain).format("HH:mm");
	//Created train's data 
		$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrival + "</td><td" + minsAwayFormatted + "</td></tr>");

});












