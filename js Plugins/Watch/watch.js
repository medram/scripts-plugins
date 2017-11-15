/*
author: Mohammed Ramouchy
created: 17/07/2017

------------- how to use --------------

window.onload = function (){
	var w = new watch('my-screen');
	w.start();
};
*/

function watch(screenId)
{
	var screen = document.getElementById(screenId);
	var hours;
	var minutes;
	var seconds;
	this.isOn = false;

	this.start = function (){
		this.isOn = true;
		setInterval(update.bind(this), 500);
	};

	var update = function (){
		var time = new Date();
		hours = time.getHours();
		minutes = time.getMinutes();
		seconds = time.getSeconds();

		data = formater();
		show(data);
	};

	var formater = function (){
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

		return hours + ':' + minutes + ':' + seconds;
	}

	var show = function (data = null){
		if (data != null){
			screen.textContent = data;
		}
	};

}
