var countdown = countdown || {};

countdown = {
	target:  null,
	step: 1,
	display_format: "%%D%% Days<br>%%H%% Hours<br>%%M%% Minutes<br>%%S%% Seconds",

	calcAge: function(secs, num1, num2) {
		return ((Math.floor(secs / num1)) % num2);
	},
	
	countBack: function(secs) {
		sinceDays = this.calcAge(secs, 86400, 100000);
		sinceHours = this.calcAge(secs, 3600, 24);
		sinceMinutes = this.calcAge(secs, 60, 60);
		sinceSeconds = this.calcAge(secs, 1, 60);
		new_time = this.display_format;
		if(sinceDays > 0) {
			new_time = new_time.replace(/%%D%%/g, sinceDays);
			if(sinceDays == 1) {
				new_time = new_time.replace(/Days/g, 'Day');
			}
		}
		else {
			new_time = new_time.replace(/%%D%% Days<br>/g, '');
		}
		if(sinceHours > 0) {
			new_time = new_time.replace(/%%H%%/g, sinceHours);
			if(sinceHours == 1) {
				new_time = new_time.replace(/Hours/g, 'Hour');
			}
		}
		else {
			new_time = new_time.replace(/%%H%% Hours<br>/g, '');
		}
		if(sinceMinutes > 0) {
			new_time = new_time.replace(/%%M%%/g, sinceMinutes);
			if(sinceMinutes == 1) {
				new_time = new_time.replace(/Minutes/g, 'Minute');
			}
		}
		else {
			new_time = new_time.replace(/%%M%% Minutes<br>/g, '');
		}
		new_time = new_time.replace(/%%S%%/g, sinceSeconds);
		if(sinceSeconds == 1) {
			new_time = new_time.replace(/Seconds/g, 'Second');
		}

		return new_time;
	},
	
	init: function(){
		var SetTimeOutPeriod = (Math.abs(this.step) - 1) * 1000 + 990;
		var dthen = new Date(this.target.replace(/-/g, "/"));
		var dnow = new Date();
		ddiff = new Date(dnow - dthen);
		gsecs = Math.floor(ddiff.valueOf() / 1000);
		return this.countBack(gsecs);
	}
}