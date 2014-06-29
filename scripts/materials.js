/*
 	materials for stones
*/
var Materials = function(){
	var wood;
	var concrete;
	var metal;
	var bricks;
	
	var container;
	
	this.load = function(){
		
		var textureWood = new THREE.ImageUtils.loadTexture("./assets/textures/wood.jpg");
		textureWood.repeat.x = .1;
		textureWood.repeat.y = .1;
		textureWood.offset.x = .1;
		textureWood.offset.y = .0;
		this.wood = new THREE.MeshLambertMaterial({map: textureWood});
		
		var textureMetal = new THREE.ImageUtils.loadTexture("./assets/textures/metal.jpg");
		textureMetal.repeat.x = 1;
		textureMetal.repeat.y = 1;
		textureMetal.offset.x = 0;
		textureMetal.offset.y = 0;
		this.metal = new THREE.MeshPhongMaterial({
			map: textureMetal, 
			ambient: 0x333333, 
			specular: 0xffffff, 
			shininess: 150
		});
		
		var textureConcrete = new THREE.ImageUtils.loadTexture("./assets/textures/concrete.jpg");
		textureConcrete.repeat.x = 1;
		textureConcrete.repeat.y = 1;
		textureConcrete.offset.x = 0;
		textureConcrete.offset.y = 0;
		this.concrete = new THREE.MeshLambertMaterial({map: textureConcrete});
		
		var textureBricks = new THREE.ImageUtils.loadTexture("./assets/textures/bricks.jpg");
		textureBricks.repeat.x = 1;
		textureBricks.repeat.y = 1;
		textureBricks.offset.x = .0;
		textureBricks.offset.y = .0;
		this.bricks = new THREE.MeshLambertMaterial({map: textureBricks});
		
		this.fireball = new THREE.ShaderMaterial({
			uniforms: { 
		        tExplosion: {
		            type: "t", 
		            value: THREE.ImageUtils.loadTexture('./assets/textures/explosion.png')
		        },
		        time: { // float initialized to 0
		            type: "f", 
		            value: 0.0 
		        }
		    },
		    vertexShader: document.getElementById('vertexShader').textContent,
		    fragmentShader: document.getElementById('fragmentShader').textContent
		});
		
		this.container = new Array();
		this.container.push(this.wood);
		this.container.push(this.metal);
		this.container.push(this.concrete);
		this.container.push(this.bricks);
		
	};

	this.getRandomMaterial = function(){
		return this.container[Math.floor(Math.random()*this.container.length)];
	};
};