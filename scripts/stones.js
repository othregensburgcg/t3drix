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
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		this.mesh.position.y -= y;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		if (this.mesh.position.x < 8.5)
			this.mesh.position.x += 1;
			
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		if (this.mesh.position.x > 1.5)
			this.mesh.position.x -= 1;
			
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		this.meshCollider.rotateRight();
		
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
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		this.mesh.position.y -= y;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		if (this.mesh.position.x < 8.5)
			this.mesh.position.x += 1;
			
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		if (this.mesh.position.x > 1.5)
			this.mesh.position.x -= 1;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		this.meshCollider.rotateRight();
		
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
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		this.mesh.position.y -= y;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		if (this.mesh.position.x < 8.5)
			this.mesh.position.x += 1;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		if (this.mesh.position.x > 1.5)
			this.mesh.position.x -= 1;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		this.meshCollider.rotateRight();
		
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
		geometry1.position.x = 1;
		this.meshCollider.addCube(geometry1.position.x, geometry1.position.y);
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 0;
		this.meshCollider.addCube(geometry2.position.x, geometry2.position.y);
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.y = 1;
		geometry3.position.x = 1;
		this.meshCollider.addCube(geometry3.position.x, geometry3.position.y);
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 2;
		geometry4.position.x = 1;
		this.meshCollider.addCube(geometry4.position.x, geometry4.position.y);
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial || materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		this.mesh.position.y -= y;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		if (this.mesh.position.x < 8.5)
			this.mesh.position.x += 1;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		if (this.mesh.position.x > 1.5)
			this.mesh.position.x -= 1;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		this.meshCollider.rotateRight();
		
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
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		this.mesh.position.y -= y;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		if (this.mesh.position.x < 8.5)
			this.mesh.position.x += 1;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		if (this.mesh.position.x > 1.5)
			this.mesh.position.x -= 1;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		this.meshCollider.rotateRight();
		
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
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
				
		return this;
	};
	
	this.moveDown = function(y){
		this.mesh.position.y -= y;
		console.log(this.mesh.position);
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		if (this.mesh.position.x < 8.5)
			this.mesh.position.x += 1;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		if (this.mesh.position.x > 1.5)
			this.mesh.position.x -= 1;
		
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
		
		this.mesh.position.x = x || 4.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveDown = function(y){
		this.mesh.position.y -= y;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveRight = function(){
		if (this.mesh.position.x < 8.5)
			this.mesh.position.x += 1;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.moveLeft = function(){
		if (this.mesh.position.x > 1.5)
			this.mesh.position.x -= 1;
		
		this.meshCollider.setGlobalPosition(this.mesh.position.x, this.mesh.position.y);
		
		return this;
	};
	
	this.rotateRight = function(){
		this.mesh.rotation.z -= Math.PI/2;
		
		this.meshCollider.rotateRight();
		
		return this;
	};
};
