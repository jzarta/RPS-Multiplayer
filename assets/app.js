
var dataRef = new Firebase("https://trainschedulerjz.firebaseio.com/");

var train = "";
var destination = "";
var frequency = "";
var nextArrival= "";
var minuteAway= "";
$("#submitEmp").on("click", function (){

	train =$("#trainName").val().trim();
	destination =$("#desTination").val().trim();
	frequency =$("#freQuency").val().trim();

			dataRef.push({
				trainName:train,
				destination:destination
				
				
			})
	renderButtons();

	return false;
});

	dataRef.on("child_added", function(snapshot) {
		console.log(snapshot.val().train);
		console.log(snapshot.val().destination);
		
		
		$("#nameDisplay").html(snapshot.val().trainName);
		$("#destinationDisplay").html(snapshot.val().destination);
		
	}, function(errorObject){

		console.log("Errors handled: " + errorObject.code)
});

	
