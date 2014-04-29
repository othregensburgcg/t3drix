document.onkeydown = function(evt){
	evt = evt || window.event;
	switch(evt.keyCode){
		case 37: /* links - taste behandeln */
			alert("left");
			break;
		case 38: /* oben - taste behandeln */
			alert("up");
			break;
		case 39: /* rechts - taste behandeln */
			alert("right");
			break ;
		case 40: /* unten - taste behandeln */
			alert("down");
			break;
		default: break;
	}
}