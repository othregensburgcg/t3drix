var stone;
var gamePositionMatrix;
var previewStone;

function startGame(){
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
	previewStone = nextStone();
	
	scene.add(stone.mesh);
	scene.add(new StoneLeftS().create(4.5, 0.5).mesh);
}

function nextStone(){
	stones = new Array();
	
	stones.push(new StoneLine().create(4.5, 21.5));
	stones.push(new StoneLeftS().create(4.5, 21.5));
	stones.push(new StoneRightS().create(4.5, 21.5));
	stones.push(new StoneCube().create(4.5, 21.5));
	stones.push(new StoneLeftL().create(4.5, 21.5));
	stones.push(new StoneRightL().create(4.5, 21.5));
	stones.push(new StoneT().create(4.5, 21.5));
	
	return stones[Math.floor(Math.random()*this.stones.length)];
<<<<<<< HEAD
}
=======
}
>>>>>>> branch 'master' of git@github.com:othregensburgcg/t3drix.git
