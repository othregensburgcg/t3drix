var stone;
var gamePositionMatrix;
var previewStone;

function startGame() {
	gamePositionMatrix = new GamePositionMatrix().initFields();

	/*
	 scene.add(new StoneLine().create(9.5).mesh);
	 scene.add(new StoneLeftS().create(1.5).mesh);
	 scene.add(new StoneRightS().create(4.5).mesh);
	 scene.add(new StoneCube().create(2.5, 1.5).mesh);
	 scene.add(new StoneLeftL().create(6.5).mesh);
	 scene.add(new StoneRightL().create(7.5).mesh);
	 scene.add(new StoneT().create(6.5, 3.5).mesh);
	 */

	stone = nextStone();
	stone.mesh.position.x = 4.5;
	stone.mesh.position.y = 21.5;
	scene.add(stone.mesh);

	previewStone = nextStone();

	scene.add(new StoneLeftS().create(4.5, 0.5).mesh);
}

function placeStone() {
	//remove moving
	scene.remove(stone.mesh);
	//add Static

	//add preview as stone (changed coord to the start positon)
	stone = previewStone;
	stone.mesh.position.x = 4.5;
	stone.mesh.position.y = 21.5;

	previewStone = nextStone();
	scene.add(stonelmesh);
}

function nextStone() {
	stones = new Array();

	stones.push(new StoneLine().create(15.5, 15.5));
	stones.push(new StoneLeftS().create(15.5, 15.5));
	stones.push(new StoneRightS().create(15.5, 15.5));
	stones.push(new StoneCube().create(15.5, 15.5));
	stones.push(new StoneLeftL().create(15.5, 15.5));
	stones.push(new StoneRightL().create(15.5, 15.5));
	stones.push(new StoneT().create(15.5, 15.5));

	return stones[Math.floor(Math.random() * this.stones.length)];
}
