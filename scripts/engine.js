var scene, camera, renderer, composer;
var dpr, effectFXAA, renderScene;

var composerEnabled = true;
var useSpecifiedMaterial;

var grid, axis;
var materials;

var pause = false;
var GAMEOVER = false;

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

	var gridmaterial = new THREE.LineBasicMaterial({color: 0xEEEEEE});
	grid = new THREE.Line(gridgeometry, gridmaterial, THREE.LinePieces);
	scene.add(grid);
}

function addFpsCounter(){
	var stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms
	
	// Align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '56px';
	stats.domElement.style.top = '100px';
	
	document.body.appendChild( stats.domElement );
	
	setInterval( function () {
	
	    stats.begin();
	
	    stats.end();
	
	}, 1000 / 60 );
}

function load(){
	//Starting Point ---
	materials = new Materials();
	materials.load();
	useSpecifiedMaterial = materials.bricks;//null;//materials.concrete or null for testing materials on all stones
    init();
    render();
}

function sceneAnimation(){
	
	if(! pause){
		stone.moveDown(.01);
		
		//-------------------------------------------
			if(SKIP_FRAME){
				for(var i=1; i<stoppedStones.length; i++){//start from 1 because 0 is bounds -> no need to let them fall down
					stoppedStones[i].stopped = false;
					while(! stoppedStones[i].stopped){
						stoppedStones[i].moveDown(0.01);
					}
				}
				SKIP_FRAME = false;
			}
		//-------------------------------------------
		
		if(stone.stopped){
			
			//for(var i=0; i<4; i++) console.log(stone.meshCollider.cubes[i]);
			
			stoppedStones.push(stone);
			
			checkLines();
			
			if(!GAMEOVER) placeStone();
		}
		
		showPause(false);
		updateGUI();
	}
	else showPause(true);
}

function init(){
	var w = window.innerWidth*.98;
	var h = window.innerHeight*.98;
	
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 1000);
	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	
	renderer.shadowMapType = THREE.PCFSoftShadowMap;//better antialiasing on chrome
	
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	
	renderer.shadowCameraNear = 3;
	renderer.shadowCameraFar = camera.far;
	renderer.shadowCameraFov = 50;
	
	renderer.shadowMapBias = 0.0039;
	renderer.shadowMapDarkness = 0.5;
	renderer.shadowMapWidth = 1024;
	renderer.shadowMapHeight = 1024;
	
	renderer.setClearColor(0xFFFFFF, 0);
	renderer.setSize(w, h);
	document.body.appendChild(renderer.domElement);
	
	//addFpsCounter();
	addGameGrid();
	startGame();
	
	var light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.shadowMapWidth = 2048; //better antialias - default is 512
	light.shadowMapHeight = 2048; //better antialias - default is 512
	light.position.x = 5;
	light.position.y = 20;
	light.position.z = 5;
	light.rotation.x = .35;
	light.castShadow = true;
	light.shadowDarkness = 1.0;
	scene.add(light);
	
	var ambientLight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambientLight);
	
	camera.position.x = 5;
	camera.position.y = 10;
	camera.position.z = 27;
	
	
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