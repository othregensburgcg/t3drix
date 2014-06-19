function getRandomHexColor(){
	return Math.random() * 0xffffff;
}

function deepCopy(p, c) {
	var c = c||{};
	for (var i in p) {
	  if (typeof p[i] === 'object') {
	    c[i] = (p[i].constructor === Array)?[]:{};
	    deepCopy(p[i],c[i]);
	  } else c[i] = p[i];}
	return c;
}