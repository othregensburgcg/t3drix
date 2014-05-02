var StoneLeftS = function(){
	var mesh;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = -1;
		geometry1.position.y = 1;
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 0;
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.x = 1;
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 1;
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial!=null?useSpecifiedMaterial:materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		
		this.mesh.position.x = x || 5.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
				
		return this;
	};
	
	this.moveDown = function(y){
		this.mesh.position.y -= y;
		
		return this;
	};
	
	this.moveRight = function(){
		if (this.mesh.position.x < 8.5)
			this.mesh.position.x += 1;
		
		return this;
	};
	
	this.moveLeft = function(){
		if (this.mesh.position.x > 1.5)
			this.mesh.position.x -= 1;
		
		return this;
	};
	
	this.rotateRight = function(z){
		this.mesh.rotation.z -= z;
		
		return this;
	};
};

var StoneRightS = function(){
	var mesh;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = -1;
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 0;
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.x = 1;
		geometry3.position.y = 1;
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 1;
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial!=null?useSpecifiedMaterial:materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		
		this.mesh.position.x = x || 5.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
				
		return this;
	};
};

var StoneT = function(){
	var mesh;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = -1;
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 0;
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.x = 1;
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 1;
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial!=null?useSpecifiedMaterial:materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		
		this.mesh.position.x = x || 5.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
				
		return this;
	};
};

var StoneLeftL = function(){
	var mesh;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = -1;
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 0;
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.y = 1;
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 2;
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial!=null?useSpecifiedMaterial:materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		
		this.mesh.position.x = x || 5.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
				
		return this;
	};
};

var StoneRightL = function(){
	var mesh;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = 1;
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 0;
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.y = 1;
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 2;
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial!=null?useSpecifiedMaterial:materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		
		this.mesh.position.x = x || 5.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
				
		return this;
	};
};

var StoneCube = function(){
	var mesh;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		geometry1.position.x = 0;
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.x = 1;
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.x = 0;
		geometry3.position.y = 1;
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.x = 1;
		geometry4.position.y = 1;
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial!=null?useSpecifiedMaterial:materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		
		this.mesh.position.x = x || 5.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
				
		return this;
	};
};

var StoneLine = function(){
	var mesh;

	this.create = function(x, y){
		var combined_geometry = new THREE.Geometry();
		var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
		
		var geometry1 = new THREE.Mesh(cube_geometry);
		
		var geometry2 = new THREE.Mesh(cube_geometry);
		geometry2.position.y = 1;
		
		var geometry3 = new THREE.Mesh(cube_geometry);
		geometry3.position.y = 2;
		
		var geometry4 = new THREE.Mesh(cube_geometry);
		geometry4.position.y = 3;
		
		THREE.GeometryUtils.merge(combined_geometry, geometry1);
		THREE.GeometryUtils.merge(combined_geometry, geometry2);
		THREE.GeometryUtils.merge(combined_geometry, geometry3);
		THREE.GeometryUtils.merge(combined_geometry, geometry4);
		
		var material = useSpecifiedMaterial!=null?useSpecifiedMaterial:materials.getRandomMaterial();
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		
		this.mesh.position.x = x || 5.5;
		this.mesh.position.y = y || .5;
		this.mesh.position.z = 0.5;
		
		return this;
	};
};
