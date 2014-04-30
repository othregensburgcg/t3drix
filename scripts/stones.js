var StoneLeftS = function(){
	
};

var StoneRightS = function(){

};

var StoneT = function(){
var mesh;
	var color;

	this.create = function(){
		this.color = getRandomHexColor();
		
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
		
		//var material = new THREE.MeshLambertMaterial({color: this.color}); //color
		var material = wood;
		
		this.mesh = new THREE.Mesh(combined_geometry, material);
		
		this.mesh.position.x = 0;
		this.mesh.position.y = 0.5;
		this.mesh.position.z = 0;
	};
};

var StoneLeftL = function(){

};

var StoneRightL = function(){

};

var StoneCube = function(){

};

var StoneLine = function(){

}

var wood = new THREE.MeshLambertMaterial({map: textureWood}); //texture
