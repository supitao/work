const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let isDrawing = false;
let isErasing = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);

function startDrawing(event) {
    isDrawing = true;
    draw(event); // 绘制初始点
}

function draw(event) {
    if (!isDrawing && !isErasing) return;

    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    if (isErasing) {
        context.clearRect(x - 10, y - 10, 20, 20);
    } else {
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.strokeStyle = currentColor;
        context.stroke();
        lastX = x;
        lastY = y;
    }
}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
}

document.addEventListener("keydown", function(event) {
    if (event.key === "b") {
        isErasing = false; // 按下 "b" 键切换到画笔模式
    } else if (event.key === "e") {
        isErasing = true; // 按下 "e" 键切换到橡皮擦模式
    }
});

