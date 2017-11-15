/**
Author: Mohammed Ramouchy
Created: 20/07/2017
since: 20/07/2017
Desc: My javascript library like jQuery 

*/


function $(selector)
{
	// all functions and parms will be here
	var opt = {};

	$.prototype.constructor = function (){
		console.log('constructor was run');
	};

	// get elements from here using CSS pattern
	opt.selector = selector;
	opt.elements = document.querySelectorAll(opt.selector);
	

	/*
	*	set and get the elements value (Note: you can use html tags)
	*/
	opt.html = function (value = null){
		var data = [];
		var i;

		for (i = 0; i < opt.elements.length; i++)
		{
			if (value === null)
			{
				data[i] = opt.elements[i].innerHTML;
			}
			else
			{
				opt.elements[i].innerHTML = value;
			}
		}

		if (value === null)
		{
			if (data.length == 1)
			{
				return data[0];
			}
			else
			{
				return data;
			}
		}

		return this;
	};


	/*
	*	set and get the elements value (Note: you can't use html tags)
	*/
	opt.text = function (value = null){

		var data = [];
		var i;

		for (i = 0; i < opt.elements.length; i++)
		{
			if (value === null)
			{
				data[i] = opt.elements[i].textContent;
			}
			else
			{
				opt.elements[i].textContent = value;
			}
		}

		if (value === null)
		{
			if (data.length == 1)
			{
				return data[0];
			}
			else
			{
				return data;
			}
		}

		return this;
	};


	/*
	*	set and get the opt.elements attribute
	*/
	opt.attr = function (attr, value = null){
		var data = [];
		var i;

		for (i = 0; i < opt.elements.length; i++)
		{
			if (value === null)
			{
				data[i] = opt.elements[i].getAttribute(attr);
			}
			else
			{
				opt.elements[i].setAttribute(attr, value);
			}
		}

		if (value === null)
		{
			if (data.length == 1)
			{
				return data[0];
			}
			else
			{
				return data;
			}
		}

		return this;
	};

	opt.on = function (action, callback){
		var i = 0;

		for (i = 0; i < opt.elements.length; i++)
		{
			//this.addEventListener(action, callback);
			opt.elements[i].addEventListener(action, callback);
		}
	};

	/*
	*	return all functions and parms of opt variable
	*/
	return opt;
};
