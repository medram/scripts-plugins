
/*
author: Mohammed Ramouchy
created: 16/07/2017

------------- how to use --------------

var options = {
	screenId: 'my-screen',
};

var c = new Counter(options);

c.isOn

c.start()
c.stop()
c.reset()


*/

function Counter (options)
{
	'use strict';

	var screen = document.getElementById(options.screenId);
	//var allSeconds = options.seconds;
	var interval;
	var time = 0;
	var hours;
	var minutes;
	var seconds;
	var fps = 1000; // 1 second

	this.isOn = false;

	this.start = function (){
		this.isOn = true;
		if (interval == null)
		{
			interval = setInterval(update, fps);
		}
	};

	this.stop = function (){
		this.isOn = false;
		clearInterval(interval);
		interval = null;
	};
	
	this.reset = function (){
		if (!this.isOn)
		{
			time = 0;
			update(this.isOn);
		}
	};

	var update = function (isOn=true)
	{
		showOnScreen(formater(time));
		//console.log(formater());
		//console.log(this.isOn);
		
		if (isOn)
		{
			time++;
		}
	}

	var formater = function (sec){
		//console.log('------------ sec: '+sec+' -----------');
		
		var t = new Date(sec*1000);
		hours 	= t.getHours().toString(); 		// hours
		minutes = t.getMinutes().toString(); 		// minutes
		seconds = t.getSeconds().toString();		// seconds

		if (hours.length < 2)
		{
			hours = '0' + hours;
		}

		if (minutes.length < 2)
		{
			minutes = '0' + minutes;
		}

		if (seconds.length < 2)
		{
			seconds = '0' + seconds;
		}

		/*
		------ debuging ------
		console.log('H:' + hours);
		console.log('M:' + minutes);
		console.log('S:' + seconds);
		*/

		return hours + ':' + minutes + ':' + seconds;
	}

	var showOnScreen = function (msg = null){
		if (msg !== null)
		{
			screen.innerHTML = msg;
		}
	}

}

