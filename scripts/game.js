var stone;
var gamePositionMatrix;
var previewStone;

var pauseAfterCollision = true;

var stones;

var stoppedStones;

function startGame() {
	gamePositionMatrix = new GamePositionMatrix().initFields();
	
	stones = new Array();
	stones.push(new StoneLine().create(15.5, 15.5));
	stones.push(new StoneLeftS().create(15.5, 15.5));
	stones.push(new StoneRightS().create(15.5, 15.5));
	stones.push(new StoneCube().create(15.5, 15.5));
	stones.push(new StoneLeftL().create(15.5, 15.5));
	stones.push(new StoneRightL().create(15.5, 15.5));
	stones.push(new StoneT().create(15.5, 15.5));

	stone = nextStone();
	stone.mesh.position.x = 4.5;
	stone.mesh.position.y = 21.5;
	scene.add(stone.mesh);

	previewStone = nextStone();

	stoppedStones = new Array();
	
	var firstStone = new StoneLeftS().create(4.5, 0.5);
	stoppedStones.push(firstStone);
	scene.add(firstStone.mesh);
	
	var bounds = new Bounds().create();
	stoppedStones.push(bounds);
	scene.add(bounds.mesh);
	
}

function placeStone() {
	
	//remove moving
	//scene.remove(stone.mesh);
	//add Static

	//add preview as stone (changed coord to the start positon)
	stone = previewStone;
	stone.mesh.position.x = 4.5;
	stone.mesh.position.y = 21.5;

	previewStone = nextStone();
	scene.add(stone.mesh);
	
}

function nextStone() {
	return stones[Math.floor(Math.random() * this.stones.length)];
}
