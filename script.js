const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const color2Btn = document.getElementById('color2');
const color3Btn = document.getElementById('color3');
const color4Btn = document.getElementById('color4');
const color5Btn = document.getElementById('color5');
const color6Btn = document.getElementById('color6');
const saveBtn = document.getElementById('save');
const clearEl = document.getElementById('clear');
const ctx = canvas.getContext('2d');
let size = 8;
let isPressed = false;
let color = 'lightblue';
let x;
let y;
canvas.addEventListener('mousedown', (e) => {
	isPressed = true;
	x = e.offsetX;
	y = e.offsetY;
});
document.addEventListener('mouseup', (e) => {
	isPressed = false;
	x = undefined;
	y = undefined;
});
canvas.addEventListener('mousemove', (e) => {
	if (isPressed) {
		const x2 = e.offsetX;
		const y2 = e.offsetY;
		drawCircle(x2, y2);
		drawLine(x, y, x2, y2);
		x = x2;
		y = y2;
	}
});
function drawCircle(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}
function drawLine(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.lineWidth = size * 2;
	ctx.stroke();
}
function updateSizeOnScreen() {
	sizeEL.innerText = size;
}
color2Btn.addEventListener('click', () => {
	color = color2Btn.style.backgroundColor;
	colorEl.value = rgbToHex(color2Btn.style.backgroundColor);
});
color3Btn.addEventListener('click', () => {
	color = color3Btn.style.backgroundColor;
	colorEl.value = rgbToHex(color3Btn.style.backgroundColor);
});
color4Btn.addEventListener('click', () => {
	color = color4Btn.style.backgroundColor;
	colorEl.value = rgbToHex(color4Btn.style.backgroundColor);
});
color5Btn.addEventListener('click', () => {
	color = color5Btn.style.backgroundColor;
	colorEl.value = rgbToHex(color5Btn.style.backgroundColor);
});
color6Btn.addEventListener('click', () => {
	color = color6Btn.style.backgroundColor;
	colorEl.value = rgbToHex(color6Btn.style.backgroundColor);
});
increaseBtn.addEventListener('click', () => {
	size += 2;
	if (size > 50) {
		size = 50;
	}
	updateSizeOnScreen();
});
decreaseBtn.addEventListener('click', () => {
	size -= 2;
	if (size < 2) {
		size = 2;
	}
	updateSizeOnScreen();
});
colorEl.addEventListener('change', (e) => {
	color = e.target.value;
	color6Btn.style.backgroundColor = color5Btn.style.backgroundColor;
	color5Btn.style.backgroundColor = color4Btn.style.backgroundColor;
	color4Btn.style.backgroundColor = color3Btn.style.backgroundColor;
	color3Btn.style.backgroundColor = color2Btn.style.backgroundColor;
	color2Btn.style.backgroundColor = e.target.value;
});

saveBtn.addEventListener('click', saveCanvas);

clearEl.addEventListener('click', () =>
	ctx.clearRect(0, 0, canvas.width, canvas.height)
);

function rgbToHex(rgbColor) {
	const [r, g, b] = rgbColor.match(/\d+/g);
	return (
		'#' +
		((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b))
			.toString(16)
			.slice(1)
	);
}
function saveCanvas() {
	const dataURL = canvas.toDataURL('image/png');
	const link = document.createElement('a');
	link.href = dataURL;
	link.download = 'image.png';
	link.click();
}
