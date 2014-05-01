var stone;

function startGame(){
	/*
	scene.add(new StoneLine().create(9.5).mesh);
	scene.add(new StoneLeftS().create(1.5).mesh);
	scene.add(new StoneRightS().create(4.5).mesh);
	scene.add(new StoneCube().create(2.5, 1.5).mesh);
	scene.add(new StoneLeftL().create(6.5).mesh);
	scene.add(new StoneRightL().create(7.5).mesh);
	scene.add(new StoneT().create(6.5, 3.5).mesh);
	*/
	
	stone = new StoneLeftS().create(4.5, 21.5);
	scene.add(stone.mesh);
	scene.add(new StoneLeftS().create(4.5, 0.5).mesh);
}