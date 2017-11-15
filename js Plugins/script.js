
//var title = document.getElementById('title');
//var p = document.getElementsByTagName('p');
//var p = document.getElementsByClassName('para');
//var p = document.querySelector('p');
//var p = document.querySelectorAll('p');


function Person (opt)
{
	var tall = 1;
	this.name = 'mohammed';
	this.age = 22;

	Person.prototype.eat = function (){
		console.log(this.name + ' is eating');
	};

	Person.prototype.walk = function (){
		console.log(this.name + ' is walking');
	};

	Persen.prototype.read = function (){
		console.log(this.name + ' is reading');
	};

	Person.prototype.write = function (){
		console.log(this.name + ' is writing');
	};

	function thinking (){
		console.log(this.name + ' is thinking');
	}
}

function Mohammed ()
{
	
}

//Mohammed.inherits(Person);
Mohammed.prototype = Object.create(Person.prototype);

var M = new Mohammed();
console.log(M.eat());







//$('.my-screen').attr('data', 'goo');
//console.log($('.my-screen').attr('class'));





function save() {
  var data = ["your-content-here"];
  //var bl = new Blob(htmlContent, {type: "text/html"});
  var bl = new Blob(data, {type: 'application/pdf'});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(bl);
  a.download = "your-download-name-here.pdf";
  a.hidden = true;
  document.body.appendChild(a);
  a.innerHTML = "something random - nobody will see this, it doesn't matter what you put here";
  a.click();
}

function readOnline ()
{
	var data = ["My name is Mohammed"];
	var file = new Blob(data, {type: 'application/pdf'});
	var fileURL = URL.createObjectURL(file);
	window.open(fileURL);
}

function downloadPDF() {
	var fileName = "test.pdf";
	var data = ['Mohammed'];
	var a = document.createElement("a");
	document.body.appendChild(a);
	var file = new Blob(data, {type: 'application/pdf'});
	var fileURL = window.URL.createObjectURL(file);
	a.href = fileURL;
	a.download = fileName;
	a.click();	
};

/*

--------------------- window ---------------------
alert()
confirm()
prompt()

window.open(URL, Name/Target, Attributes, Histery)
window.stop() // stop loading page
myWin.close()
myWin.focus()


window.innerWidth
window.innerHeight

window.outerWidth
window.outerHeight

window.scrollX (Like: window.pageXOffset)
window.scrollY (Like: window.pageYOffset)

window.scrollTo(X,Y)
window.scrollBy(X,Y)
NOTE: window.pageYOffset + window.innerHeight === document.body.scrollHeight


location.href
location.protocol
location.host
lacation.pathname
location.search
location.hash
location.reload(false/true) // true = force reload (without using the cash)

history.back()
history.forward()
history.go(+/-num)

navigator.appVersion
navigator.platform
navigator.cookieEnabled
navigator.onLine

screen.width
screen.height
screen.availWidth
screen.availHaight
screen.colorDepth = sceen.pixelDepth

-------------------- document --------------------
div.clientWidth  	// inside of the box
div.clientHeight 	// inside of the box

div.offsetWidth		// all the box and without margin
div.offsetHeight	// all the box and without margin

div.clientTop   	// out of the box 
div.clientLeft  	// out of the box

div.scrollWidth
div.scrollHeight

div.offsetTop 		// get scroll top from top to this div
div.offsetLeft		// get scroll left from left to this div

div.scrollTop
div.scrollLeft

// NOTE: div.scrollHeight = div.scrollTop + div.clientHeight

div.style
document.createElement()
document.createTextNode()
document.createComment()
document.createAttribute()
div.setAttributeNode()

window.onlead
window.onresize
div.onclick
div.ondblclick
div.onfocus
div.onblur
div.onsubmit

div.onmouseenter
div.onmouseleave

div.onkeydown
div.onkeypress
div.onkeyup

div.oncontextmenu

---------------------------
document.title
document.body
document.images
document.forms
document.links
document.anchors
document.cookie
---------------------------

div.getAtribute()
div.setAtribute('href','http://google.com')
div.hasAttribute()
div.removeAttribute()

div.classList
div.classList.add()
div.classList.remove()
div.classList.toggle()
div.classList.item(0)
div.classList.contains()


div.firstChild
div.lastChild
div.firstElementChild
div.lastElementChild

div.childNodes
div.children
div.children.length

div.append()
div.prepend()
div.appendChild()
div.removeChild(div.children[2])
div.insertBefore(myNewDiv, div.children[2]);

div.cloneNode(false/true)

div.parentNode
div.parentElement

div.nextSibling
div.nextElementSibling

div.previousSibling
div.previousElementSibling

*/

/*

typeOf()
------------------ String ---------------------
var.indexOf()
var.laseIndexOf()
var.search()
var.split(operator[R], limit [O]) // like expload on php
var.slice(start [R], end [O])
var.substr(start[R], length[O])
var.substring(start [R], end [O])

var.charAt()
var.replace()
var.concat()

------------------ Array ---------------------
Array.isArray();
var.indexOf();
var.lastIndexOf();
var.join();	// like implode of php
var.splice(start[R], length[O]);  
var.slice(start, end) // get array from array
var.concat()  // add array to an array
var.includes() 

var.push(); 	 // add to the last array
var.pop();     // remove the last from the array

var.unshift(); // add to the first array
var.shift();   // remove the first from array

------------------ Math ---------------------
Math.ceil()
Math.floor()
Math.round()
Math.min()
Math.max()
Math.random()

------------------ integer ---------------------
parseInt()
var.toString()
var.toFixed()


*/
