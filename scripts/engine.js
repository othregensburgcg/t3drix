var scene, camera, renderer, composer;
var dpr, effectFXAA, renderScene;

var composerEnabled = true;
var useSpecifiedMaterial;

var grid, axis;
var materials;

var example_object;

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
	useSpecifiedMaterial = null;//materials.??? or null for testing materials on all stones
    init();
    render();
}

function sceneAnimation(){
	//example_object.mesh.rotation.y += 0.01;
	stone.moveDown(.01);
}

function init(){
	var w = window.innerWidth;
	var h = window.innerHeight;
	
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	
	renderer.shadowMapType = THREE.PCFSoftShadowMap;//better antialiasing on chrome
	
	
	renderer.setClearColor(0xFFFFFF, 0);
	renderer.setSize(w, h);
	document.body.appendChild(renderer.domElement);
	
	//addStandardGrid();
	addGameGrid();

	/*example_object = new StoneLine();
	example_object.create();
	scene.add(example_object.mesh);
	*/
	
	startGame();
	
	var light = new THREE.PointLight(0xffffff, .9, 0.0);//color, intensity, distance
	light.shadowMapWidth = 2048; //better antialias - default is 512
	light.shadowMapHeight = 2048; //better antialias - default is 512
	light.position.x = 5;
	light.position.y = 30;
	light.position.z = 5;
	light.rotation.x = .25;
	scene.add(light);
	
	var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
	
	camera.position.x = 5;
	camera.position.y = 10;
	camera.position.z = 15;
	//camera.rotation.y = .07;
	
	//postprocessing
	if (window.devicePixelRatio !== undefined) {
	  dpr = window.devicePixelRatio;
	}

	renderer.autoClear = false;
	
	renderScene = new THREE.RenderPass(scene, camera);
	
	effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
	effectFXAA.uniforms['resolution'].value.set(1 / (window.innerWidth * dpr), 1 / (window.innerHeight * dpr));
	effectFXAA.renderToScreen = true;

	composer = new THREE.EffectComposer(renderer);
	composer.setSize(window.innerWidth * dpr, window.innerHeight * dpr);
	composer.addPass(renderScene);
	composer.addPass(effectFXAA);
	
}

function render() {
	requestAnimationFrame(render);
	sceneAnimation();
	
	if(!composerEnabled) renderer.render(scene, camera); //use standard renderer
	else{//use postprocessing with shaders
		renderer.clear();
		composer.render();
	}
}

function resize(){
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();	
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	effectFXAA.uniforms['resolution'].value.set(1 / (window.innerWidth * dpr), 1 / (window.innerHeight * dpr));
	composer.setSize(window.innerWidth * dpr, window.innerHeight * dpr);
}