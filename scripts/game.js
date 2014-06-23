var stone;
var gamePositionMatrix;
var previewStone;

var pauseAfterCollision = false;

var stoppedStones;
var lines = new Array();

var LEVEL = 1;
var POINTS = 0;

var linesRemoved;

SKIP_FRAME = false;

var GUI;
var GUI_PAUSE;

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
	
	/*
	var test_stone1 = new StoneLine().create(1.5, 1.5);
	test_stone1.rotateRight();
	test_stone1.moveDown(1);
	scene.add(test_stone1.mesh);
	stoppedStones.push(test_stone1);
	
	var test_stone2 = new StoneLine().create(5.5, 1.5);
	test_stone2.rotateRight();
	test_stone2.moveDown(1);
	scene.add(test_stone2.mesh);
	stoppedStones.push(test_stone2);
	*/
	//console.log(stoppedStones);
	
	drawGUI();
	
}

function checkLines(){
	
	linesRemoved = new Array();
	for(var i=0; i<=19; i++){
		if(lines[i].meshCollider.checkLineFull()){
			console.log("LINE " + (i+1) + " FULL!");
			linesRemoved.push(i);
		}
	}
	
	
	if(linesRemoved.length>0) SKIP_FRAME = true;//TEST -> UNCOMMENT FOLOWING /* ... */
	
	/*
	var objectsToFall = new Array();//object, units
	
	if(linesRemoved.length>0){
		for(var i=0; i<linesRemoved.length; i++){
			if(i==linesRemoved.length-1){
				for(var k=linesRemoved[i]+1; k<=19; k++){
					//console.log("LET FALL LINE " + k + " " + (i+1) + " UNITS DOWN");
					
					var stonesWhichCollideWithLine = lines[k].meshCollider.getStonesWhichCollideWithLine();
					
					for(var l=0; l<stonesWhichCollideWithLine.length; l++){//for every stone, which collides with line k
						//if objectsToFall doesn't contain stonesWhichCollideWithLine[l] yet -> push
						
						//var searchIndex = objectsToFall.indexOf(new Array(stonesWhichCollideWithLine[l], i+1));//multidimensional search
						var searchIndex = -1;
						for (var m=0; m<objectsToFall.length; m++) {
							if (objectsToFall[m][0] == stonesWhichCollideWithLine[l]) {
								searchIndex = m;
								break;
							}
						}
						if(searchIndex == -1) objectsToFall.push(new Array(stonesWhichCollideWithLine[l], i+1));
					}
				}
			}
			else{
				for(var k=linesRemoved[i]+1; k<linesRemoved[i+1]; k++){
					//console.log("LET FALL LINE " + k + " " + (i+1) + " UNITS DOWN");
					
					var stonesWhichCollideWithLine = lines[k].meshCollider.getStonesWhichCollideWithLine();
					
					for(var l=0; l<stonesWhichCollideWithLine.length; l++){//for every stone, which collides with line k
						//if objectsToFall doesn't contain stonesWhichCollideWithLine[l] yet -> push
						
						//var searchIndex = objectsToFall.indexOf(new Array(stonesWhichCollideWithLine[l], i+1));//multidimensional search
						var searchIndex = -1;
						for (var m=0; m<objectsToFall.length; m++) {
							if (objectsToFall[m][0] == stonesWhichCollideWithLine[l]) {
								searchIndex = m;
								break;
							}
						}
						if(searchIndex == -1) objectsToFall.push(new Array(stonesWhichCollideWithLine[l], i+1));
					}
				}
			}			
		}
	}
	
	//console.log("OBJECTS TO FALL: " + objectsToFall.length);
	//console.log(objectsToFall);
	
	for(var i=0; i<objectsToFall.length; i++){
		//move stone objectsToFall[i][0] -> objectsToFall[i][1] units down
		objectsToFall[i][0].mesh.position.y -= objectsToFall[i][1];
		objectsToFall[i][0].meshCollider.setGlobalPosition(objectsToFall[i][0].mesh.position.x, objectsToFall[i][0].mesh.position.y);
	}
	//console.log("DONE MOVING DOWN");
	*/
	
	//if(anyLineRemoved) SKIP_FRAME = true;
	/*
	if(anyLineRemoved){
		for(var i=1; i<stoppedStones.length; i++){//start from 1 because 0 is bounds -> no need to let them fall down
			stoppedStones[i].stopped = false;
			while(! stoppedStones[i].stopped){
				stoppedStones[i].moveDown(0.5);
			}
		}		
	}
	*/
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
	
	var gui_pause_create = document.createElement('div');
	gui_pause_create.id = "gui_pause";
	gui_pause_create.style.position = 'absolute';

	gui_pause_create.style.width = 100;
	gui_pause_create.style.height = 100;

	gui_pause_create.style.color = "blue";
	gui_pause_create.style.fontSize = "60px";
	gui_pause_create.style.fontWeight = "bold";
	
	gui_pause_create.innerHTML = "pause";
	
	gui_pause_create.style.top = (window.innerHeight*0.5)-20 + 'px';
	gui_pause_create.style.left = (window.innerWidth*0.5)-50 + 'px';
	document.body.appendChild(gui_pause_create);
	
	GUI_PAUSE = document.getElementById('gui_pause');
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

function showPause(state){

	if(state){
		GUI_PAUSE.innerHTML = "PAUSE";
	}
	else{
		GUI_PAUSE.innerHTML = "";
	}	
}

function nextStone() {
	//var rand = Math.floor(Math.random() * 7);
	var rand = 2;
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
