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
			var displayTime = countback.getCountdown(lastfall);
			$('#last-fall').html(megfalls.formatCountback(displayTime));
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
	},

	formatCountback: function(time) {
		var display_format = "%%Y%% Years<br>%%D%% Days<br>%%H%% Hours<br>%%M%% Minutes<br>%%S%% Seconds";

		if (time.years > 0) {
			display_format = display_format.replace(/%%Y%%/g, time.years);
			if(time.years === 1) {
				display_format = display_format.replace(/Years/g, 'Year');
			}
		}
		else {
			display_format = display_format.replace(/%%Y%% Years<br>/g, '');
		}

		if (time.days > 0) {
			display_format = display_format.replace(/%%D%%/g, time.days);
			if(time.days === 1) {
				display_format = display_format.replace(/Days/g, 'Day');
			}
		}
		else {
			display_format = display_format.replace(/%%D%% Days<br>/g, '');
		}

		if (time.hours > 0) {
			display_format = display_format.replace(/%%H%%/g, time.hours);
			if(time.hours === 1) {
				display_format = display_format.replace(/Hours/g, 'Hour');
			}
		}
		else {
			display_format = display_format.replace(/%%H%% Hours<br>/g, '');
		}

		if (time.minutes > 0) {
			display_format = display_format.replace(/%%M%%/g, time.minutes);
			if(time.minutes === 1) {
				display_format = display_format.replace(/Minutes/g, 'Minute');
			}
		}
		else {
			display_format = display_format.replace(/%%M%% Minutes<br>/g, '');
		}

		display_format = display_format.replace(/%%S%%/g, time.seconds);
		if (time.seconds === 1) {
			display_format = display_format.replace(/Seconds/g, 'Second');
		}

		return display_format.trim();
	}
}

megfalls.init();
