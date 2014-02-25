/**
 * countback.js
 *
 * @author Nick Barone
 * @license MIT
 */
var countback = countback || {};
countback = {
	/**
	 * Return time in years, days, hours, minutes and seconds
	 *
	 * @param Int secs Time in seconds
	 * @returns Object
	 */
	countBack: function(secs) {
		var sinceYears = Math.floor(secs / 31536000) % 1000000;
		var sinceDays = Math.floor(secs / 86400) % 365;
		var sinceHours = Math.floor(secs / 3600) % 24;
		var sinceMinutes = Math.floor(secs / 60) % 60;
		var sinceSeconds = Math.floor(secs / 1) % 60;

		return {
			years: sinceYears,
			days: sinceDays,
			hours: sinceHours,
			minutes: sinceMinutes,
			seconds: sinceSeconds
		};
	},

	/**
	 * Returns object with time since given date
	 *
	 * @param String sinceDate Date formatted as yyyy-mm-dd
	 * @returns Object
	 */
	getCountdown: function(sinceDate){
		var then = new Date(sinceDate.replace(/-/g, "/"));
		var now = new Date();
		var diff = new Date(now - then);
		var secs = Math.floor(diff.valueOf() / 1000);
		return this.countBack(secs);
	}
}
