var StoneLeftS = function(){
	var position;
	var color;

	this.create = function(){
		var object;
		var geometry = new THREE.CubeGeometry(2, 2, 2);
		this.color = 0xaa0000;
		var material 	= new THREE.MeshLambertMaterial({color: this.color});
		object	= new THREE.Mesh(geometry, material);
		
		this.position = new Position();
		this.position.x = 0;
		this.position.y = 0;
		this.position.z = 0;
		
		return object;
	}
}

var StoneRightS = function(){

}

var StoneT = function(){

}

var StoneLeftL = function(){

}

var StoneRightL = function(){

}

var StoneCube = function(){

}

var StoneLine = function(){

}

var Position = function(){
	var x;
	var y;
	var z;
}