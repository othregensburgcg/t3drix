var Bounds = function(){
	this.mesh;
	this.combined_geometry;
	this.cube_geometry;
	this.meshCollider;
	this.stopped = true;

	this.create = function(x, y){		
		this.combined_geometry = new THREE.Geometry();
		this.cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		this.meshCollider = new MeshCollider();
		
		for(var i=-4.5; i<5.5; i++) this.addCube(i, -10.5, true);//bottom line
		for(var i=-10.5; i<12.5; i++) this.addCube(-5.5, i, true);//left line
		for(var i=-10.5; i<12.5; i++) this.addCube(5.5, i, true);//right line
		
		
		for(var i=-10.5; i<12.5; i++){
			for(var k=6.5; k<23.5; k++){
				if((k>12.5||k<8.5)||(i<3.5||i>8.5)) this.addCube(k, i, false);
				this.addCube(-k, i, false);			
			}
		}
		
		var material = materials.concrete;
		
		this.mesh = new THREE.Mesh(this.combined_geometry, material);
		
		this.mesh.receiveShadow = true;
		
		this.mesh.position.x = x || 5;
		this.mesh.position.y = y || 10;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.addCube = function(x, y, applyCollider){
		var geometry = new THREE.Mesh(this.cube_geometry);
		geometry.position.x = x;
		geometry.position.y = y;
		if(applyCollider) this.meshCollider.addCube(geometry.position.x, geometry.position.y);			
		THREE.GeometryUtils.merge(this.combined_geometry, geometry);
	};
};

var PauseWall = function(){
	this.mesh;
	this.combined_geometry;
	this.cube_geometry;

	this.create = function(z){
		this.combined_geometry = new THREE.Geometry();
		this.cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		
		for(var i=-9.5; i<11.5; i++){
			for(var k=-4.5; k<5.5; k++){
				this.addCube(k, i);	
			}
		}
		
		for(var i=3.5; i<9.5; i++){
			for(var k=8.5; k<13.5; k++){
				this.addCube(k, i);	
			}
		}
		
		var textureConcrete = new THREE.ImageUtils.loadTexture("./assets/textures/concrete_bright.jpg");
		textureConcrete.repeat.x = 1;
		textureConcrete.repeat.y = 1;
		textureConcrete.offset.x = 0;
		textureConcrete.offset.y = 0;
		var concrete = new THREE.MeshLambertMaterial({map: textureConcrete});
		
		this.mesh = new THREE.Mesh(this.combined_geometry, concrete);
		
		this.mesh.receiveShadow = true;
		
		this.mesh.position.x = 5;
		this.mesh.position.y = 10;
		this.mesh.position.z = z;
		
		return this;
	};
	
	this.addCube = function(x, y){
		var geometry = new THREE.Mesh(this.cube_geometry);
		geometry.position.x = x;
		geometry.position.y = y;
		THREE.GeometryUtils.merge(this.combined_geometry, geometry);
	};
};

var Line = function(){
	this.mesh;
	this.combined_geometry;
	this.cube_geometry;
	this.meshCollider;
	this.stopped = true;

	this.create = function(line){		
		this.combined_geometry = new THREE.Geometry();
		this.cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		this.meshCollider = new MeshCollider();
		
		for(var i=-4.5; i<5.5; i++) this.addCube(i, line-10.5);
		
		var material = materials.wood;
		
		this.mesh = new THREE.Mesh(this.combined_geometry, material);
		
		this.mesh.position.x = 5;
		this.mesh.position.y = 10;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.addCube = function(x, y, applyCollider){
		applyCollider = applyCollider || true;
		var geometry = new THREE.Mesh(this.cube_geometry);
		geometry.position.x = x;
		geometry.position.y = y;
		if(applyCollider) this.meshCollider.addCube(geometry.position.x, geometry.position.y);			
		THREE.GeometryUtils.merge(this.combined_geometry, geometry);
	};
};

var StoneLeftS = function(){
	this.mesh;
	this.meshCollider;
	this.stopped = false;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		this.meshCollider = new MeshCollider();
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = -1;
		geometry1.position.y = 1;
		this.meshCollider.addCube(geometry1.position.x, geometry1.position.y);
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 0;
		geometry2.position.y = 0;
		this.meshCollider.addCube(geometry2.position.x, geometry2.position.y);
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.x = 1;
		geometry3.position.y = 0;
		this.meshCollider.addCube(geometry3.position.x, geometry3.position.y);
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.x = 0;
		geometry4.position.y = 1;
		this.meshCollider.addCube(geometry4.position.x, geometry4.position.y);
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial || materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y - y);
		
		if(this.meshCollider.checkMoveCollision()){
				y = 0;
				this.stopped = true;
				this.mesh.position.x =(Math.round(this.mesh.position.x*2)/2);
				this.mesh.position.y = (Math.round(this.mesh.position.y*2)/2);
				if(this.mesh.position.y<0.5) this.mesh.position.y = 0.5;
				this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				if(pauseAfterCollision) window["pause"] = true;
		}
		
		this.mesh.position.y -= y;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		leftForbidden = false;
		
		var delta = 1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			rightForbidden = true;
		}		
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		rightForbidden = false;
		
		var delta = -1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			leftForbidden = true;
		}
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		if(this.meshCollider.checkRotateCollision()){
			this.mesh.rotation.z += Math.PI/2;
		}
		
		return this;
	};
};

var StoneRightS = function(){
	this.mesh;	
	this.meshCollider;
	this.stopped = false;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		this.meshCollider = new MeshCollider();
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = -1;
		geometry1.position.y = 0;
		this.meshCollider.addCube(geometry1.position.x, geometry1.position.y);
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 0;
		geometry2.position.y = 0;		
		this.meshCollider.addCube(geometry2.position.x, geometry2.position.y);
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.x = 1;
		geometry3.position.y = 1;
		this.meshCollider.addCube(geometry3.position.x, geometry3.position.y);
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 0;
		geometry4.position.y = 1;
		this.meshCollider.addCube(geometry4.position.x, geometry4.position.y);
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial || materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y - y);
		
		if(this.meshCollider.checkMoveCollision()){
				y = 0;
				this.stopped = true;
				this.mesh.position.x =(Math.round(this.mesh.position.x*2)/2);
				this.mesh.position.y = (Math.round(this.mesh.position.y*2)/2);
				if(this.mesh.position.y<0.5) this.mesh.position.y = 0.5;
				this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				if(pauseAfterCollision) window["pause"] = true;
		}
		
		this.mesh.position.y -= y;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		leftForbidden = false;
		
		var delta = 1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			rightForbidden = true;
		}		
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		rightForbidden = false;
		
		var delta = -1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			leftForbidden = true;
		}
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		if(this.meshCollider.checkRotateCollision()){
			this.mesh.rotation.z += Math.PI/2;
		}
		
		return this;
	};
};

var StoneT = function(){
	this.mesh;	
	this.meshCollider;
	this.stopped = false;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		this.meshCollider = new MeshCollider();
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = -1;
		this.meshCollider.addCube(geometry1.position.x, geometry1.position.y);
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 0;
		this.meshCollider.addCube(geometry2.position.x, geometry2.position.y);
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.x = 1;
		this.meshCollider.addCube(geometry3.position.x, geometry3.position.y);
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 1;
		this.meshCollider.addCube(geometry4.position.x, geometry4.position.y);
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial || materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y - y);
		
		if(this.meshCollider.checkMoveCollision()){
				y = 0;
				this.stopped = true;
				this.mesh.position.x =(Math.round(this.mesh.position.x*2)/2);
				this.mesh.position.y = (Math.round(this.mesh.position.y*2)/2);
				if(this.mesh.position.y<0.5) this.mesh.position.y = 0.5;
				this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				if(pauseAfterCollision) window["pause"] = true;
		}
		
		this.mesh.position.y -= y;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		leftForbidden = false;
		
		var delta = 1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			rightForbidden = true;
		}		
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		rightForbidden = false;
		
		var delta = -1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			leftForbidden = true;
		}
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		if(this.meshCollider.checkRotateCollision()){
			this.mesh.rotation.z += Math.PI/2;
		}
		
		return this;
	};
};

var StoneLeftL = function(){
	this.mesh;	
	this.meshCollider;
	this.stopped = false;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		this.meshCollider = new MeshCollider();
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = -1;
		this.meshCollider.addCube(geometry1.position.x, geometry1.position.y);
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 0;
		this.meshCollider.addCube(geometry2.position.x, geometry2.position.y);
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.y = 1;
		this.meshCollider.addCube(geometry3.position.x, geometry3.position.y);
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 2;
		this.meshCollider.addCube(geometry4.position.x, geometry4.position.y);
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial || materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		this.mesh.position.y -= y;
		
		if(this.meshCollider.checkMoveCollision()){
				this.mesh.position.y += y;
				this.stopped = true;
				this.mesh.position.x =(Math.round(this.mesh.position.x*2)/2);
				this.mesh.position.y = (Math.round(this.mesh.position.y*2)/2);
				if(this.mesh.position.y<0.5) this.mesh.position.y = 0.5;
				this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				if(pauseAfterCollision) window["pause"] = true;
		}
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		leftForbidden = false;
		
		var delta = 1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			rightForbidden = true;
		}		
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		rightForbidden = false;
		
		var delta = -1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			leftForbidden = true;
		}
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		if(this.meshCollider.checkRotateCollision()){
			this.mesh.rotation.z += Math.PI/2;
		}
		
		return this;
	};
};

var StoneRightL = function(){
	this.mesh;	
	this.meshCollider;
	this.stopped = false;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		this.meshCollider = new MeshCollider();
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = 1;
		this.meshCollider.addCube(geometry1.position.x, geometry1.position.y);
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 0;
		this.meshCollider.addCube(geometry2.position.x, geometry2.position.y);
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.y = 1;
		this.meshCollider.addCube(geometry3.position.x, geometry3.position.y);
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 2;
		this.meshCollider.addCube(geometry4.position.x, geometry4.position.y);
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial || materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y - y);
		
		if(this.meshCollider.checkMoveCollision()){
				y = 0;
				this.stopped = true;
				this.mesh.position.x =(Math.round(this.mesh.position.x*2)/2);
				this.mesh.position.y = (Math.round(this.mesh.position.y*2)/2);
				if(this.mesh.position.y<0.5) this.mesh.position.y = 0.5;
				this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				if(pauseAfterCollision) window["pause"] = true;
		}
		
		this.mesh.position.y -= y;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		leftForbidden = false;
		
		var delta = 1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			rightForbidden = true;
		}		
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		rightForbidden = false;
		
		var delta = -1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			leftForbidden = true;
		}
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		if(this.meshCollider.checkRotateCollision()){
			this.mesh.rotation.z += Math.PI/2;
		}
		
		return this;
	};
};

var StoneCube = function(){
	this.mesh;	
	this.meshCollider;
	this.stopped = false;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		this.meshCollider = new MeshCollider();
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = 0;
		this.meshCollider.addCube(geometry1.position.x, geometry1.position.y);
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 1;
		this.meshCollider.addCube(geometry2.position.x, geometry2.position.y);
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.x = 0;
		geometry3.position.y = 1;
		this.meshCollider.addCube(geometry3.position.x, geometry3.position.y);
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.x = 1;
		geometry4.position.y = 1;
		this.meshCollider.addCube(geometry4.position.x, geometry4.position.y);
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial || materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y - y);
		
		if(this.meshCollider.checkMoveCollision()){
				y = 0;
				this.stopped = true;
				this.mesh.position.x =(Math.round(this.mesh.position.x*2)/2);
				this.mesh.position.y = (Math.round(this.mesh.position.y*2)/2);
				if(this.mesh.position.y<0.5) this.mesh.position.y = 0.5;
				this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				if(pauseAfterCollision) window["pause"] = true;
		}
		
		this.mesh.position.y -= y;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		leftForbidden = false;
		
		var delta = 1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			rightForbidden = true;
		}		
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		rightForbidden = false;
		
		var delta = -1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			leftForbidden = true;
		}
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){		
		return this;
	};
};

var StoneLine = function(){
	this.mesh;	
	this.meshCollider;
	this.stopped = false;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		this.meshCollider = new MeshCollider();
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.y = -1;
		this.meshCollider.addCube(geometry1.position.x, geometry1.position.y);
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.y = 0;
		this.meshCollider.addCube(geometry2.position.x, geometry2.position.y);
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.y = 1;
		this.meshCollider.addCube(geometry3.position.x, geometry3.position.y);
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 2;
		this.meshCollider.addCube(geometry4.position.x, geometry4.position.y);
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial || materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveDown = function(y){
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y - y);
		
		if(this.meshCollider.checkMoveCollision()){
				y = 0;
				this.stopped = true;
				this.mesh.position.x =(Math.round(this.mesh.position.x*2)/2);
				this.mesh.position.y = (Math.round(this.mesh.position.y*2)/2);
				if(this.mesh.position.y<0.5) this.mesh.position.y = 0.5;
				this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				if(pauseAfterCollision) window["pause"] = true;
		}
		
		this.mesh.position.y -= y;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		leftForbidden = false;
		
		var delta = 1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			rightForbidden = true;
		}		
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		rightForbidden = false;
		
		var delta = -1;
		this.meshCollider.setGlobalPosition(this.mesh.position.x + delta, this.mesh.position.y);
		
		if(this.meshCollider.checkMoveCollision()){
			delta = 0;
			leftForbidden = true;
		}
		
		this.mesh.position.x += delta;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		if(this.meshCollider.checkRotateCollision()){
			this.mesh.rotation.z += Math.PI/2;
		}
		
		return this;
	};
};

//custom stones for swapping with normal stones, can move down only
var StoneCustom = function(){
	this.mesh;
	this.meshCollider;
	this.stopped = true;

	this.create = function(cubes, x, y){
		
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		this.meshCollider = new MeshCollider();
		
		for(var i=0; i<cubes.length; i++){
			var cubex = Math.round(r(cubes[i])+l(cubes[i]))/2;
			var cubey = Math.round(t(cubes[i])+b(cubes[i]))/2;
			
			var geometry = new THREE.Mesh(cube_geometry);
			geometry.position.x = cubex;
			geometry.position.y = cubey;
			this.meshCollider.addCube(geometry.position.x, geometry.position.y);
			
			THREE.GeometryUtils.merge(combined_geometry, geometry);
		}		
		
		//if swapping a stone with a new custom stone: material can change randomly if useSpecifiedMaterial set to null
		var material = useSpecifiedMaterial || materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		
		this.mesh.position.x = x;
		this.mesh.position.y = y;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
		
		function t(cube){
			var max = -1000;
			for(var i=1; i<cube.length; i+=2) max = cube[i]>max?cube[i]:max;
			return max;
		};
		
		function b(cube){
			var min = 1000;
			for(var i=1; i<cube.length; i+=2) min = cube[i]<min?cube[i]:min;
			return min;
		};
		
		function l(cube){
			var min = 1000;
			for(var i=0; i<cube.length; i+=2) min = cube[i]<min?cube[i]:min;
			return min;
		};
		
		function r(cube){
			var max = -1000;
			for(var i=0; i<cube.length; i+=2) max = cube[i]>max?cube[i]:max;
			return max;
		};
	};
	
	this.moveDown = function(y){
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y - y);
		
		if(this.meshCollider.checkMoveCollision()){
				y = 0;
				this.stopped = true;
				this.mesh.position.x =(Math.round(this.mesh.position.x*2)/2);
				this.mesh.position.y = (Math.round(this.mesh.position.y*2)/2);
				if(this.mesh.position.y<0.5) this.mesh.position.y = 0.5;
				this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				if(pauseAfterCollision) window["pause"] = true;
		}
		
		this.mesh.position.y -= y;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
};
