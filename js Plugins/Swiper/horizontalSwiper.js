/*
var set = {
	'selector': 'brands',
	'delay': 5,
	'onhover': null
};

var slide = new horizalSwiper(set);
slide.start();
slide.info(); for debug
slide.stop();
slide.next();
slide.prev();
*/

function horizalSwiper(settings)
{
	var selector = settings.selector;
	var element = document.querySelector('.' + selector);
	var ul = document.querySelector('.' + selector + ' ul');
	var li = ul.children;
	var spd = settings.delay ? settings.delay * 1000 : 3000;
	var transitionSpeed = settings.transitionSpeed ? settings.transitionSpeed : 2 ;
	var opt = {};
	var interval;
	// for update function
	var ulWidth = ul.scrollWidth;
	var boxWidth = Math.ceil(ulWidth / li.length);
	var scrolled = 0;
	var i = 0;

	this.isOn = false;
	
	
	opt.start = function (){

		// initialize
		init();

		this.isOn = true;
		interval = setInterval(update.bind(this), spd);
		console.log('started '+i);
	};

	opt.stop = function (){
		this.isOn = false;
		clearInterval(interval);
		console.log('stoped '+i);
	};

	opt.next = function (){
		//console.log('[' + (i - 1) + '] --> [' + i + ']');
		// we don't need to add i++ , because of it automatically added oin update function
		update();
	};

	opt.prev = function (){
		//console.log('[' + (i - 1) + '] --> [' + (i - 2) + ']');
		i-=2;
		update();
	};

	var init = function (){

		// add evant
		addEvent();
		
		// on hover
		onHover();
		
		// set smood transition
		ul.style.webkitTransition = 'all ' + transitionSpeed + 's ease';
		ul.style.mozTransition = 'all ' + transitionSpeed + 's ease';
		ul.style.oTransition = 'all ' + transitionSpeed + 's ease';
		ul.style.transition = 'all ' + transitionSpeed + 's ease';
	};

	var addEvent = function (){
		var next = document.querySelector('.' + selector + ' a:last-of-type');
		next.addEventListener('click', function (){
			opt.next();
		});

		var prev = document.querySelector('.' + selector + ' a:first-of-type');
		prev.addEventListener('click', function (){
			opt.prev();
		});
	};

	var onHover = function (){
		if (settings.onhover !== null)
		{
			element.onmouseenter = function (){
				opt.stop();
			};

			element.onmouseleave = function (){
				opt.start();
			};
		}
	};

	var update = function (){
		
		console.log('-------------- update info --------------');

		// calculat who many boxes in element
		var BoxesInElement = Math.floor(element.clientWidth / boxWidth);

		scrolled = i * boxWidth;

		console.log('Boxes in element: ' + BoxesInElement);
		console.log('max i : ' + (li.length - BoxesInElement));

		if (i > li.length - BoxesInElement)
		{
			scrolled = 0;
			i = 0;
		}
		else if (i < 0)
		{
			i = li.length - BoxesInElement; // go to end
			scrolled = i * boxWidth;
		}

		console.log('i:' + i + ' / scrolled:' + scrolled + 'px');
		ul.style.webkitTransform = 'translate(-' + scrolled + 'px, 0px)';
		ul.style.mozTransform = 'translate(-' + scrolled + 'px, 0px)';
		ul.style.oTransform = 'translate(-' + scrolled + 'px, 0px)';
		ul.style.transform = 'translate(-' + scrolled + 'px, 0px)';
		i++;
	};

	// this function for debuging mode
	opt.info = function (){
		console.log(ul.scrollWidth / li.length);
		console.log(selector);
		console.log(element);
		console.log(ul);
		console.log(li);
	};

	return opt;
}
