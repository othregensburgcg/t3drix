var StoneLeftS = function(){
	var mesh;
	var color;

	this.create = function(){
		this.color = getRandomHexColor();
		
		var geometry = new THREE.CubeGeometry(1, 1, 1);
		var material 	= new THREE.MeshLambertMaterial({color: this.color});
		this.mesh = new THREE.Mesh(geometry, material);
		
		this.mesh.position.x = 0;
		this.mesh.position.y = 0;
		this.mesh.position.z = 0;
	};
};

var StoneRightS = function(){

};

var StoneT = function(){

};

var StoneLeftL = function(){

};

var StoneRightL = function(){

};

var StoneCube = function(){

};

var StoneLine = function(){

}
