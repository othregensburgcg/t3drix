var stone;
var gamePositionMatrix;
var previewStone;

var pauseAfterCollision = false;

var stoppedStones;
var lines = new Array();

var LEVEL = 1;
var POINTS = 0;

var GUI;

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
	
	for(var i=1; i<=20; i++) lines.push(new Line().create(i));
	
	
	drawGUI();
	
}

function checkLines(){	
	
	for(var i=0; i<=19; i++){
		if(lines[i].meshCollider.checkLineFull()) console.log("LINE " + (i+1) + " FULL!");
	}
}

function drawGUI(){
	var gui_text = document.createElement('div');
	gui_text.id = "gui_text";
	gui_text.style.position = 'absolute';

	gui_text.style.width = 100;
	gui_text.style.height = 100;

	gui_text.style.color = "white";
	gui_text.style.fontSize = "60px";
	gui_text.style.fontWeight = "bold";
	
	gui_text.innerHTML = "level 1<br />0 points";
	
	gui_text.style.top = 300 + 'px';
	gui_text.style.left = 300 + 'px';
	document.body.appendChild(gui_text);
	
	GUI = document.getElementById('gui_text');
}

function updateGUI(){
	GUI.innerHTML = "level "+LEVEL+"<br />"+POINTS+" points";
}

function placeStone() {

	stone = previewStone;
	stone.mesh.position.x = 4.5;
	stone.mesh.position.y = 19.5;

	previewStone = nextStone();
	scene.add(previewStone.mesh);
	
}

function nextStone() {
	var rand = Math.floor(Math.random() * 7);
	//var rand = 0;
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
