(function() {

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);
	var pictureSource;
	var destinationType;
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;

		document.getElementById("capturePhoto").onclick = function() {
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
				quality : 50,

				destinationType : destinationType.DATA_URL
			});
		}

		document.getElementById("geolocationdata").addEventListener("click", function() {
			navigator.geolocation.getCurrentPosition(onSuccess, onError, {
				enableHighAccuracy : true
			});
		});

		//watchPosition
		var watchId = navigator.geolocation.watchPosition(onWatchSuccess, onWatchError, {
			timeout : 30000
		});

		document.getElementById("clearWatchbtn").addEventListener("click", function() {
			navigator.geolocation.clearWatch(watchID);
		});
		
		document.getElementById("barcodeReader").addEventListener("click", function() {
			barcodeScanner();
		});

		document.getElementById("alertTest").onclick = function() {
			alert("Alert works");
		}

	};

	function barcodeScanner(){
		cordova.plugins.barcodeScanner.scan(
  function (result) {
    if(!result.cancelled)
    {
      alert("Barcode type is: " + result.format);
      alert("Decoded text is: " + result.text);
    }
    else
    {
      alert("You have cancelled scan");
    }
  },
  function (error) {
      alert("Scanning failed: " + error);
  }
);
	}
	
	// function scanSuccess(result){
		// alert("We got a barcode\n" +
                // "Result: " + result.text + "\n" +
                // "Format: " + result.format + "\n" +
                // "Cancelled: " + result.cancelled);
	// }
	
	// function scanFail(error){
		// alert("Scanning failed: " + error);
	// }
	
	function onPhotoDataSuccess(imageData) {

		var smallImage = document.getElementById('smallImage');

		smallImage.style.display = 'block';

		smallImage.src = "data:image/jpeg;base64," + imageData;

	}

	function onFail(message) {

		alert('Failed because: ' + message);

	}

	///////////geolocation bit/////////////////
	var onSuccess = function(position) {
		alert('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n');
	};

	// onError Callback receives a PositionError object
	//
	function onError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	//watchPosition

	var onWatchSuccess = function(position) {
		var element = document.getElementById('divWatchMeMove');
		element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' + 'Longitude: ' + position.coords.longitude + '<br />' + '<hr />' + element.innerHTML;
	};

	function onWatchError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

})();
