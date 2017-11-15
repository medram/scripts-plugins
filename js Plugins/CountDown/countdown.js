/**
author: Mohammed Ramouchy
created: 16/07/2017
------------- how to use ----------------

var options = {
	seconds: 190,
	screen: 'my-screen',
	onFinish: 'sone string here'
};

var CD = new CountDown(options);

// public function and proprties
CD.isOn;
CD.start();
CD.stop();


*/

function CountDown (options)
{
	'use strict';
	//console.log(options);
	var screen = document.getElementById(options.screen);
	var allSeconds = options.seconds;
	var interval;
	var hours;
	var minutes;
	var seconds;
	//var isOn = false;

	this.isOn = false;

	this.start = function ()
	{
		this.isOn = true;
		interval = window.setInterval(update.bind(this), 1000);
	}

	this.stop = function ()
	{
		this.isOn = false;
		clearInterval(interval);
		console.log('stoped');
	}


	function update ()
	{
		//console.log('still working!');

		if (allSeconds >= 0)
		{
			hours = Math.floor(allSeconds / 3600);
			minutes = Math.floor((allSeconds - hours * 3600) / 60);
			seconds = allSeconds % 60;
			
			niceFormat();
			
			showOnScreen();
		}
		else
		{
			this.stop();
			onFinish();
		}

		allSeconds--;
	}

	function onFinish ()
	{
		showOnScreen(options.onFinish);
	}
	
	function showOnScreen (msg=null)
	{
		if (msg != null)
		{
			screen.innerHTML = msg;
		}
		else
		{
			//console.log(hours + ':' + minutes + ':' + seconds);
			screen.innerHTML = hours + ':' + minutes + ':' + seconds;
		}
	}

	function niceFormat ()
	{
		if (hours < 10)
		{
			hours = '0' + hours;
		}

		if (minutes < 10)
		{
			minutes = '0' + minutes;
		}

		if (seconds < 10)
		{
			seconds = '0' + seconds;
		}
	}

}