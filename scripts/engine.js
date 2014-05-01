var scene;
var camera;
var renderer;

var grid;
var axis;
var example_object;

var materials;

function addStandardGrid(){
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

function addGameGrid(){
	var gridgeometry = new THREE.Geometry();	
	for(var i=0; i<=10; i++){
		gridgeometry.vertices.push(new THREE.Vector3(i, 0, 0));
		gridgeometry.vertices.push(new THREE.Vector3(i, 20, 0));
	}
	for(var i=0; i<=20; i++){
		gridgeometry.vertices.push(new THREE.Vector3(0, i, 0));
		gridgeometry.vertices.push(new THREE.Vector3(10, i, 0));
	}
	for(var i=0; i<=10; i++){
		gridgeometry.vertices.push(new THREE.Vector3(i, 0, 0));
		gridgeometry.vertices.push(new THREE.Vector3(i, 0, 1));
	}
	gridgeometry.vertices.push(new THREE.Vector3(0, 0, 1));
	gridgeometry.vertices.push(new THREE.Vector3(10, 0, 1));

	var gridmaterial = new THREE.LineBasicMaterial({color: 0xFF0000});
	grid = new THREE.Line(gridgeometry, gridmaterial, THREE.LinePieces);
	scene.add(grid);
}

function load(){
	//Starting Point ---
	materials = new Materials();
	materials.load();
    init();
}

function sceneAnimation(){
	//example_object.mesh.rotation.y += 0.01;
}

function init(){
	var w = window.innerWidth;
	var h = window.innerHeight;
	
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.shadowMapType = THREE.PCFSoftShadowMap;//better antialiasing on chrome
	renderer.setClearColor(0x000000, 0);
	renderer.setSize(w, h);
	document.body.appendChild(renderer.domElement);
	
	//addStandardGrid();
	addGameGrid();

	/*example_object = new StoneLine();
	example_object.create();
	scene.add(example_object.mesh);
	*/
	scene.add(new StoneLine().create(9.5).mesh);
	scene.add(new StoneLeftS().create(1.5).mesh);
	scene.add(new StoneRightS().create(4.5).mesh);
	scene.add(new StoneCube().create(2.5, 1.5).mesh);
	scene.add(new StoneLeftL().create(6.5).mesh);
	scene.add(new StoneRightL().create(7.5).mesh);
	scene.add(new StoneT().create(6.5, 3.5).mesh);
	
	var light = new THREE.PointLight(0xffffff, 1.5, 0.0);//color, intensity, distance
	light.position.z = 5;
	light.position.y = 7;
	light.rotation.x = .0;
	scene.add(light);
	
	camera.position.x = 7;
	camera.position.y = 10;
	camera.position.z = 20;
	camera.rotation.y = .07;
	
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