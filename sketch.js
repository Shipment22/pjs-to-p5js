let input = document.getElementById('input'),
output = document.getElementById('output'),
cnv

let pjs = input.value, p5js = ''

document.getElementById('dewit').onclick = () => {
	p5js = pjs = input.value

	function r() {
		p5js = p5js.replace(...arguments)
	}

	// fix scope issues that are introduced by putting everything into setup
	r(/function draw\(/, 'draw = function(')
	r(/function mouseClicked\(/, 'mouseClicked = function(')
	r(/function mousePressed\(/, 'mousePressed = function(')
	r(/function mouseReleased\(/, 'mouseReleased = function(')
	r(/function keyPressed\(/, 'keyPressed = function(')
	r(/function keyTyped\(/, 'keyTyped = function(')
	r(/function keyReleased\(/, 'keyReleased = function(')

	p5js = p5js.replaceAll(/this.__frameRate/g, 'frameRate()')
	
	r(/pushMatrix/g, 'push') // no more specific pushing / poping
	r(/popMatrix/g, 'pop')
	r(/pushStyle/g, 'push')
	r(/popStyle/g, 'pop')

	r(/[^a-zA-Z]size/g, 'resizeCanvas') // no more size just canvas :)

	r(/PVector/g, 'p5.Vector') // replace de PVector duh p5.Vector

	r(/JAVA2D/g, 'P2D') // fu people who want to "look more professional"

	r(/println/g, 'console.log') // println go brr

	r(/LEFT/g, '37') // replace LEFT with its keycode
	r(/RIGHT/g, '39') // replace RIGHT with its keycode

	r(/mouseButton === 37/g, 'mouseButton === LEFT') // fix replacing LEFT with the left arrow keycode
	r(/mouseButton === 39/g, 'mouseButton === RIGHT') // fix replacing RIGHT with the right arrow keycode

	p5js = `
let MouseButton = 'left', 
ContextMenu = false;

function enableContextMenu() {
	ContextMenu = true;
}

function disableContextMenu() {
	ContextMenu = false;
}

document.body.oncontextmenu = () => {
	mouseClicked();
	return ContextMenu;
};

async function getImage(src) {
	return await loadImage('https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/' + src + '.png');
}

function createFont(font) {
	if (font.length < 1) { font = 'sans'; }
	return font;
}

function setup() {
	createCanvas(400, 400);
	angleMode(DEGREES);

	const UP = 38, DOWN = 40;

	${p5js}
}`

	// set output
	output.innerText = p5js

	// draw to preview
	document.getElementById('iframe').srcdoc = `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>pjs to p5</title>
		<link rel="stylesheet" href="style.css">
		<script src="libraries/p5.min.js"></script>
	</head>
	<body>
	<script>
	try {
		${p5js}
	} catch(e) {
		console.error(e)
	}
	</script>
	</body>
	</html>`
}
