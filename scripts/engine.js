var scene;
var camera;
var renderer;

var grid;
var axis;
var cube_o;

function addGrid(){
	var gridgeometry = new THREE.Geometry();	
	for(var i=-10; i<=10; i++){
		if(i!=0){
			gridgeometry.vertices.push(new THREE.Vector3(i, 0, -10));
			gridgeometry.vertices.push(new THREE.Vector3(i, 0, 10));
		}
	}
	for(var i=-10; i<=10; i++){
		if(i!=0){
			gridgeometry.vertices.push(new THREE.Vector3(-10, 0, i));
			gridgeometry.vertices.push(new THREE.Vector3(10, 0, i));
		}
	}	
	var gridmaterial = new THREE.LineBasicMaterial({color: 0x777777});
	grid = new THREE.Line(gridgeometry, gridmaterial, THREE.LinePieces);
	scene.add(grid);
	
	var axisgeometry = new THREE.Geometry();
	axisgeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
	axisgeometry.vertices.push(new THREE.Vector3(10, 0, 0));
	axisgeometry.vertices.push(new THREE.Vector3(0, 0, -10));
	axisgeometry.vertices.push(new THREE.Vector3(0, 0, 10));
	var axismaterial = new THREE.LineBasicMaterial({color: 0x000000});
	axis = new THREE.Line(axisgeometry, axismaterial, THREE.LinePieces);
	scene.add(axis);
}

function init(){
	var w = window.innerWidth;
	var h = window.innerHeight;
	
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setClearColor(0x000000, 0);
	renderer.setSize(w, h);
	document.body.appendChild(renderer.domElement);
	
	addGrid();
	
	var cube_g 	= new THREE.CubeGeometry(2, 2, 2);
	var cube_m 	= new THREE.MeshLambertMaterial({color: 0x0000aa});
	cube_o	= new THREE.Mesh(cube_g, cube_m);
	cube_o.position.x = 0;
	cube_o.position.y = 0;
	cube_o.position.z = 0;
	scene.add(cube_o);
	
	var light = new THREE.PointLight(0xffffff);
	light.position.z = 15;
	light.position.y = 5;
	light.rotation.x = -0.3;
	scene.add(light);
	
	camera.position.x = 0;
	camera.position.y = 5;
	camera.position.z = 12;
	camera.rotation.x = -0.8;
	
	render();
}

function render() {
	requestAnimationFrame(render);	
	renderer.render(scene, camera);
}

function resize(){
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	
	renderer.setSize(window.innerWidth, window.innerHeight);
}