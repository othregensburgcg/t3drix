var stone;
var gamePositionMatrix;
var previewStone;

var pauseAfterCollision = false;

var stoppedStones;

function startGame() {
	
	GAMEOVER = false;
	
	stone = nextStone();
	stone.mesh.position.x = 4.5;
	stone.mesh.position.y = 21.5;
	scene.add(stone.mesh);

	previewStone = nextStone();
	scene.add(previewStone.mesh);

	stoppedStones = new Array();
	
	var bounds = new Bounds().create();
	stoppedStones.push(bounds);
	scene.add(bounds.mesh);
	
}

function placeStone() {
	console.log(stone.mesh.position);
	stone = previewStone;
	stone.mesh.position.x = 4.5;
	stone.mesh.position.y = 19.5;
	/*
	setTimeOut(function(){
		if(stone.stopped){
			GAMEOVER = true;
			pause = true;
			alert("GAME OVER");
		}
	}, 100);
	*/
	previewStone = nextStone();
	scene.add(previewStone.mesh);
	
}

function nextStone() {
	var rand = Math.floor(Math.random() * 7);
	switch(rand){
		case 0: return new StoneLine().create(15.5, 15.5); break;
		case 1: return new StoneLeftS().create(15.5, 15.5); break;
		case 2: return new StoneCube().create(15.5, 15.5); break;
		case 3: return new StoneLeftL().create(15.5, 15.5); break;
		case 4: return new StoneRightS().create(15.5, 15.5); break;
		case 5: return new StoneRightL().create(15.5, 15.5); break;
		case 6: return new StoneT().create(15.5, 15.5); break;		
		default: return null; break;
	}
}
