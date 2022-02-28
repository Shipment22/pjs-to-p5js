let input = document.getElementById('input'),
output = document.getElementById('output'),
cnv

let pjs = input.value, p5js = ''

// const replace = {
// 	size: 'resizeCanvas',
// 	pushMatrix: 'push',
// 	popMatrix: 'pop',
// 	rekt: 'rect',
// 	setup: 'setup1',
// 	';': ';\n',
// 	PVector: 'p5.Vector'
// }


document.getElementById('dewit').onclick = () => {
	console.log('test')

	p5js = pjs = input.value


	p5js = p5js.replace(/function draw\(/, 'draw = function(')
	p5js = p5js.replace(/function mouseClicked\(/, 'mouseClicked = function(')
	p5js = p5js.replace(/function mousePressed\(/, 'mousePressed = function(')
	p5js = p5js.replace(/function mouseReleased\(/, 'mouseReleased = function(')
	p5js = p5js.replace(/function keyPressed\(/, 'keyPressed = function(')
	p5js = p5js.replace(/function keyTyped\(/, 'keyTyped = function(')
	p5js = p5js.replace(/function keyReleased\(/, 'keyReleased = function(')

	p5js = p5js.replaceAll(/this.__frameRate/g, 'frameRate()')
	
	p5js = p5js.replaceAll(/pushMatrix/g, 'push')
	p5js = p5js.replaceAll(/popMatrix/g, 'pop')
	p5js = p5js.replaceAll(/pushStyle/g, 'push')
	p5js = p5js.replaceAll(/popStyle/g, 'pop')

	p5js = p5js.replaceAll(/[^a-zA-Z]size/g, 'resizeCanvas')

	p5js = p5js.replaceAll(/PVector/g, 'p5.Vector')

	p5js = p5js.replaceAll(/JAVA2D/g, 'P2D')

	p5js = p5js.replaceAll(/println/g, 'console.log')

	p5js = p5js.replaceAll(/LEFT/g, '37')
	p5js = p5js.replaceAll(/RIGHT/g, '39')

	p5js = p5js.replaceAll(/mouseButton === 37/g, 'mouseButton === LEFT')
	p5js = p5js.replaceAll(/mouseButton === 39/g, 'mouseButton === RIGHT')

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

	output.innerText = p5js

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
