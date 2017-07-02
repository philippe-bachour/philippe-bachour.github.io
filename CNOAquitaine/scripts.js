var last_known_scroll_position = 0;
var ticking = false;

var head_origin = document.getElementById("topbar").getBoundingClientRect();
head_origin = head_origin.top;

function doSomething(scroll_pos)
{
	if(scroll_pos > head_origin)
	{
		document.getElementById("topbar").style.position = 'fixed';
		document.getElementById('head').style.marginBottom = '100px';
	}
	else
	{
		document.getElementById("topbar").style.position = 'static';
		document.getElementById('head').style.marginBottom = '0px';
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

document.getElementById('login_button').addEventListener('click', function(){
	var t = document.getElementById('login_popup');
	if (t.style.visibility == 'visible')
	{
		t.style.visibility = 'hidden';
	}
	else
	{
		t.style.visibility = 'visible';
	}
}, false);