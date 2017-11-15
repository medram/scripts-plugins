/**
* @author: Mohammed Ramouchy
* @released: 25/08/2018
* @desc: nice and sample library to upload files using ajax (without refresh the page)
*
*/

/* How to use

/* ----- html code -----
<div id='dropzone'>
	Drop your files here !
</div>

// ------ javascript code ----- 

var uploadImages = new Uploader ({
	dropzoneId: 'imagezone',
	url: 'upload.php',
	name: 'myfile[]',
	allowedTypes: 'jpg|png|gif|jpeg',
	before: function (el){ // el is the dropzone element
		console.log('load start');
	},
	after: function (el){ // el is the dropzone element
		console.log('load end');
	},
	onprogress: function (p){ // the percentage
		console.log('progress: ' + p + '%');
		document.title = Math.floor(p) + '%';
	},
	success: function (xhr, r, s){
		
		if (s == 'success')
		{
			console.log(JSON.parse(r));
		}
		else
		{
			console.log('Something happen wrong!');
		}
		
	},
	error: function (error){
		console.log(error);
	},
});


*/


// this is our principal function
var Uploader = function (options)
{
	'use strict';

	// declaration of global variables
	this.opt = {};				// options from user
	this.xhr;					// XMLHttpRequest
	this.dropzone;				// element of drop zome div
	this.formData;				// instance of FormData()
	this.files = {};			// dropped files to the browser
	this.response = null;		// response from the server
	this.allowedTypes = []; 	// allowed files types
	this.filesTypes = [];		// dropped files types
	this.msg = [];				// errors

	// init global variables
	this.init(options);

	// add some events to dropzone element
	this.addEventsToDropzone();
}

// initialize all global variables
Uploader.prototype.init = function (options){
	this.opt = options;
	this.xhr = new XMLHttpRequest();
	this.formData = new FormData();
	this.dropzone = document.getElementById(this.opt.dropzoneId);

};

// upload files using ajax
Uploader.prototype.doUpload = function ()
{
	//console.log('----- doUpload ----');
	this.isUploading = true;
	if (this.checkFiles())
	{	
		this.addXhrListeners();

		this.xhr.open('post', this.opt.url, true);
		this.xhr.send(this.formData);
		this.clear();
	}
}

// clear some variables from here
Uploader.prototype.clear = function ()
{
	this.formData = new FormData();
	this.files = {};
	this.response = null;
	this.allowedTypes = [];
	this.filesTypes = [];
	this.msg = [];
	this.isUploading = false;
}

Uploader.prototype.addEventsToDropzone = function ()
{
	this.dropzone.addEventListener('dragenter', dragenter);
	this.dropzone.addEventListener('dragleave', dragleave);
	this.dropzone.addEventListener('drop', drop.bind(this));
	this.dropzone.addEventListener('dragover', dragover);
}

// add some fonctionslisteners to XMLHttpRequest
Uploader.prototype.addXhrListeners = function ()
{
	thisClass = this;
	this.xhr.upload.onloadstart = function (e){
		thisClass.opt.before(thisClass.dropzone);
	};
	this.xhr.upload.onloadend = function (e){
		thisClass.opt.after(thisClass.dropzone);
	};
	
	this.xhr.upload.onprogress = function (file){

		var persentage = file.loaded / file.total * 100;
		thisClass.opt.onprogress(persentage.toFixed(2));
	};

	this.xhr.onload = function (e){

		var statue = (this.status >= 200 && this.status < 300) ? 'success' : 'error';
		thisClass.opt.success(this, this.responseText, statue);
	};

	this.xhr.onerror = function (e)
	{
		thisClass.opt.error(this.status + ': ' + this.statusText, thisClass.msg);
	}
}

// check allowed files types
Uploader.prototype.checkFiles = function ()
{
	// e.dataTransfer.files
	if (this.files.length == 0)
	{
		this.clear();
		return false;
	}

	for (var i = 0; i < this.files.length; i++)
	{
		this.allowedTypes = this.opt.allowedTypes.toLowerCase().split('|');

		//this.filesTypes.push(this.files[i].name.toLowerCase().split('.').pop());
		this.filesTypes.push(this.files[i].type.toLowerCase().split('/').pop());

		if (this.allowedTypes.indexOf(this.filesTypes[i]) > -1)
		{
			// add allowed files types to the form to send it to the server
			this.formData.append(this.opt.name, this.files[i]);
		}
		else
		{
			this.msg.push('the \'' + this.filesTypes[i] + '\' type dosn\'t allowed!');
		}
	}

	/*
	console.log(this.msg);
	console.log('types: ' + this.filesTypes);
	console.log('allowed Type: ' + this.allowedTypes);
	*/
	return true;
}

// ------------- add some browser evants --------------
function dragenter (e)
{
	this.classList.add('active');
};

function dragleave (e)
{
	this.classList.remove('active');
};

function drop (e)
{
	e.preventDefault();
	this.dropzone.classList.remove('active');

	this.files = e.dataTransfer.files;
	this.doUpload();

	//console.log(e.dataTransfer.files);
};

function dragover (e)
{
	e.preventDefault();
};
// ----------------------------------------------------

