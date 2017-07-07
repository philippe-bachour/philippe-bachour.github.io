var last_known_scroll_position = 0;
var ticking = false;

var is_index = (location.pathname.indexOf("index") > -1) ? true : false;

var head_origin = document.getElementById("topbar").getBoundingClientRect();
if (window.scrollY <= 1)
{
	head_origin = head_origin.top;
}
else
{
	head_origin = window.innerHeight - head_origin.height;
}

function doSomething(scroll_pos)
{
	if(scroll_pos > head_origin)
	{
		document.getElementById("topbar").style.position = 'fixed';
		document.getElementById("topbar").style.top = '0';
		document.getElementById("topbar").style.background = 'rgba(35, 35, 35, 0.95)'
		//document.getElementById('head').style.marginBottom = '100px';
	}
	else
	{
		document.getElementById("topbar").style.background = 'transparent'
		if (is_index)
		{
			document.getElementById("topbar").style.position = 'absolute';
			document.getElementById("topbar").style.bottom = '0';
			document.getElementById("topbar").style.top = 'initial';
		}
		else
		{
			document.getElementById("topbar").style.position = 'absolute';
			document.getElementById("topbar").style.bottom = '0';
			document.getElementById("topbar").style.top = 'initial';
		}
		//document.getElementById('head').style.marginBottom = '0px';
	}
}

window.addEventListener('scroll', function(e) {
	last_known_scroll_position = window.scrollY;
	if (!ticking) {
	    window.requestAnimationFrame(function() {
	    	doSomething(last_known_scroll_position);
	    	ticking = false;
	    });
	}
	 ticking = true;
});