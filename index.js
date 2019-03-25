const fPS = 30; //frames per second
const shipSize = 30; //ship height in pixels
 let canv = document.getElementById("gameCanvas");
 let ctx = canv.getContext("2d");
 let spaceShip = {
     x: canv.width / 2,
     y: canv.height / 2,
     r: shipSize / 2,
     a: 90 / 180 * Math.PI // converts to radians

 }
 //setup the game loops

 const update = () => {
     // draws space
     ctx.fillStyle = 'black';
     ctx.fillRect(0, 0, canv.width, canv.height);
     //draws ship
     ctx.strokeStyle = "white";
     ctx.lineWidth = shipSize / 20;
     ctx.beginPath();
     ctx.moveTo(
         spaceShip.x + spaceShip.r * Math.cos(spaceShip.a)
         spaceShip.y + spaceShip.y * Math.sin(spaceShip.a)

     )
     //moves ship

     // rotates ship
 }
// let x = canvas.width/2;
// let y = canvas.height-30;
// let dx = 2;
// let dy = -2;
// let ballRadius = 10;
// let paddleHeight = 10;
// let paddleWidth = 75;
// let paddleX = (canvas.width-paddleWidth) / 2;
// let rightPressed = false;
// let leftPressed = false;
//
//
// const drawBall = () => {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     ctx.fillStyle = "green";
//     ctx.fill();
//     ctx.closePath();
// }
//
// const drawPaddle = () => {
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }
//
// const draw = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     drawPaddle();
//     x += dx;
//     y += dy;
//
//     if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     }
//     if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//         dy = -dy;
//     }
//
//     if (rightPressed && paddleX < canvas.width-paddleWidth) {
//         paddleX += 7;
//     } else if (leftPressed && paddleX > 0) {
//         paddleX -= 7;
//     }
// }
//
//
//
// const keyDownHandler = (e) => {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = true;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = true;
//     }
// }
//
// const keyUpHandler = (e) => {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     }
// }
//
//
//
// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
// setInterval(draw, 10);
setInterval(update, 1000 / fPS);
