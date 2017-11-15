/*
author: Mohammed Ramouchy
created: 17/07/2017

------------- how to use --------------

window.onload = function (){
	var title = document.getElementById('my-screen');
	var w = new Writer();
	
	w.write(title, 200);
};
*/

function Writer ()
{
	var interval;
	var pointerInterval;
	var speed = 300;
	var screen;
	var data;
	var i = 0;
	var ii = 0;

	this.write = function (selector, spd = speed){
		
		screen = selector;
		data = screen.getAttribute('writer-data');
		pointerInterval = setInterval(showPointer.bind(this), 300);
		interval = setInterval(update.bind(this), spd);
	};

	var update = function (){
		
		console.log('working');
		if (i >= data.length)
		{
			clearInterval(interval);
			clearInterval(pointerInterval);
			console.log('stoped');
		}
		else
		{
			screen.innerHTML += data[i];
			i++;
		}

	};

	var showPointer = function (){
		screen.style.border = '0px';
		screen.style.display = 'inline-block';
		screen.style.paddingRight = '5px';
		

		if ((ii / 2).toString().indexOf('.') > -1)
		{
			screen.style.borderRight = '3px solid #333';
		}
		ii++;
	};

}

