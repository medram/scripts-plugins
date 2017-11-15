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
Uploader ({
	dropzoneId: 'dropzone',
	url: 'upload.php',
	name: 'myfile[]',
	allowedTypes: 'jpg|gif|jpeg',
	before: function (){
		console.log('load start');
	},
	after: function (){
		console.log('load end');
	},
	onprogress: function (p){
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


// declaration of global variables
var opt = {},			// options from user
	xhr,				// XMLHttpRequest
	dropzone,			// element of drop zome div
	formData,			// instance of FormData()
	files,				// dropped files to the browser
	response = null,	// response from the server
	allowedTypes = [], 	// allowed files types
	filesTypes = [],	// dropped files types
	msg = []; 			// errors


// this is our principal function
function Uploader (options)
{
	init(options);

	dropzone.addEventListener('dragenter', dragenter);
	dropzone.addEventListener('dragleave', dragleave);
	dropzone.addEventListener('drop', drop);
	dropzone.addEventListener('dragover', dragover);
}

// initialize all global variables
function init (options){
	opt = options;
	xhr = new XMLHttpRequest();
	formData = new FormData();
	files = {};
	allowedTypes = opt.allowedTypes.toLowerCase().split('|');
	dropzone = document.getElementById(opt.dropzoneId);

};

// upload files using ajax
function upload ()
{
	addXhrListeners();

	xhr.open('post', opt.url);
	xhr.send(formData);
	clear();
}

// clear some variables from here
function clear ()
{
	formData = new FormData();
	files = {};
	response = null;
	filesTypes = [];
	msg = [];
}

// add some fonctionslisteners to XMLHttpRequest
function addXhrListeners ()
{
	xhr.upload.onloadstart = function (e){
		opt.before();
	};
	xhr.upload.onloadend = function (e){
		opt.after();
	};
	
	xhr.upload.onprogress = function (file){

		var persentage = file.loaded / file.total * 100;
		opt.onprogress(persentage.toFixed(2));
	};

	xhr.onload = function (e){

		var statue = (xhr.status >= 200 && xhr.status < 300) ? 'success' : 'error';
		opt.success(xhr, xhr.responseText, statue);
	};

	xhr.onerror = function (e)
	{
		opt.error(xhr.status + ': ' + xhr.statusText, msg);
	}
}

// check allowed files types
function checkFiles ()
{
	for (var i = 0; i < files.length; i++)
	{
		filesTypes.push(files[i].name.toLowerCase().split('.').pop());

		if (allowedTypes.indexOf(filesTypes[i]) > -1)
		{
			// add allowed files types to the form to send it to the server
			formData.append(opt.name, files[i]);
		}
		else
		{
			msg.push('the \'' + filesTypes[i] + '\' type dosn\'t allowed!');
		}
	}

	console.log(msg);
	console.log('types: ' + filesTypes);
	console.log('allowed Type: ' + allowedTypes);
}

// ------------- add some browser evants --------------
function dragenter (e)
{
	//console.log('dragenter');
	this.classList.add('active');
};

function dragleave (e)
{
	//console.log('dragleave');
	this.classList.remove('active');
};

function drop (e)
{
	e.preventDefault();
	this.classList.remove('active');

	files = e.dataTransfer.files;
	if (files.length > 0)
	{
		checkFiles();
		upload();
	}
	else
	{
		clear();
	}

	console.log(e.dataTransfer.files);
};

function dragover (e)
{
	e.preventDefault();
	//console.log(e);
};
// ----------------------------------------------------

