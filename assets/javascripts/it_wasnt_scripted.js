var megfalls = megfalls || {};

megfalls = {
	latitude: 0,
	longitude: 0,
	last_fall: null,
	last_submitted: null,

	init: function() {
		navigator.geolocation.getCurrentPosition(function(location) {
			megfalls.latitude = location.coords.latitude;
			megfalls.longitude = location.coords.longitude;
		});
		
		var reloadClockFully = setInterval(function() {
			megfalls.reloadClock(true);
		}, 15000);
		
		var reloadClockSeconds = setInterval(function() {
			megfalls.reloadClock(false);
		}, 1000);
		
		this.assignDirectives();
		this.reloadClock(true);
		this.showFallButton();
	},
	
	assignDirectives: function() {
		$('#she-fell').on('click', function() {
			megfalls.sheFell();
		});
		$('#just-kidding').on('click', function() {
			megfalls.resetLastFall();
		});
	},
	
	reloadClock: function(fullReload) {
		this.getLastFall(fullReload, function(lastfall) {
			countdown.target = lastfall;
			var displayTime = countdown.init();
			$('#last-fall').html(displayTime);
		});
	},
	
	getLastFall: function(fullReload, callback) {
		if(fullReload == false) {
			return callback(this.last_fall);
		}
		$.post('oops.php', {she: 'wonders'}, function(data) {
			var data = $.parseJSON(data);
			megfalls.last_fall = data.when;
			return callback(data.when);
		});
	},
	
	sheFell: function() {
		$.post('oops.php', {she: 'fell', location: megfalls.latitude + ',' + megfalls.longitude}, function(data) {
			var data = $.parseJSON(data);
			if(data.fell) {
				megfalls.last_submitted = data.at;
				megfalls.reloadClock();
				megfalls.showResetButton();
			}
			else {
				$('#last-fall').html('That didn\'t work..');
				
			}
		});
	},
	
	resetLastFall: function() {
			if(this.last_submitted != null) {
			$.post('oops.php', {she: 'didnt', at: megfalls.last_submitted}, function(data) {
				var data = $.parseJSON(data);
				if(data.fine) {
					megfalls.reloadClock();	
					$('#just-kidding').fadeOut();
				}
				else {
					$('#just-kidding').html('Something Went Wrong');
					var hideResetButton = setTimeout(function() {	
						$('#just-kidding').fadeOut();
					}, 5000);
				}
			});
		}
		else {
			$('#just-kidding').fadeOut();
		}
	},
	
	showFallButton: function() {
		$('#she-fell').fadeIn();
	},
	
	showResetButton: function() {
		$('#just-kidding').fadeIn();
		var hideResetButton = setTimeout(function() {	
			$('#just-kidding').fadeOut();
		}, 15000);
	}
}

megfalls.init();