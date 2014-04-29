var scene;
var camera;
var renderer;

var grid;
var axis;
var example_object;

var textureWood;
var textureConcrete;

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

function load(){
	//Starting Point ---
	textureWood = new THREE.ImageUtils.loadTexture("./assets/textures/wood.jpg");
	textureConcrete = new THREE.ImageUtils.loadTexture("./assets/textures/concrete.jpg");
    init();
}

function sceneAnimation(){
	example_object.mesh.rotation.y += 0.01;
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

	example_object = new StoneT();
	example_object.create();
	scene.add(example_object.mesh);
	
	var light = new THREE.PointLight(0xffffff, 1.5, 0.0);//color, intensity, distance
	light.position.z = 15;
	light.position.y = 18;
	light.rotation.x = -0.4;
	scene.add(light);
	
	camera.position.x = 0;
	camera.position.y = 5;
	camera.position.z = 7;
	camera.rotation.x = -0.8;
	
	render();
}

function render() {
	requestAnimationFrame(render);
	sceneAnimation();
	renderer.render(scene, camera);
}

function resize(){
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	
	renderer.setSize(window.innerWidth, window.innerHeight);
}