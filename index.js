const FPS = 40; // frames per second
const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction)
const SHIP_SIZE = 30; // ship height in pixels
const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
const TURN_SPEED = 360; // turn speed in degrees per second
let gameStarted = false; //states the game state

/** @type {HTMLCanvasElement} */
const canv = document.getElementById("gameCanvas");
const ctx = canv.getContext("2d");

// set up the spaceship object
const ship = {
    x: canv.width / 2,
    y: canv.height / 2,
    r: SHIP_SIZE / 2,
    a: 90 / 180 * Math.PI, // convert to radians
    rot: 0,
    thrusting: false,
    thrust: {
        x: 0,
        y: 0
    }
}

//setup asteroids
let roids = [];
//createAsteroidBelt();

//intro function being called
intro_screen();


//----------------------------------- set up event handlers--------------------
document.body.addEventListener("keydown", function(event){
	if(event.keyCode == 13 && !gameStarted){
		startGame();
	}
});

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
//----------------------------Event Handlers-----------------------------------


//------------------------------functions--------------------------------------

function createAsteriodBelt() {
    riods = [];
}

function intro_screen(){
	ctx.font = "50px Impact";
	ctx.fillStyle = "#0099CC";
	ctx.textAlign = "center";
	ctx.fillText("Space Game(IDK)", canv.width/2, canv.height/2);
	ctx.font = "20px Arial";
	ctx.fillText("Press Enter To Start", canv.width/2, canv.height/2 + 50);
    ctx.font = "15px Arial";
    ctx.fillText("By Andy Reyes and Elliot Chen", canv.width/2, canv.height/2 +150);
}

function startGame() {
	gameStarted = true;
	setInterval(update, 1000/FPS) // sets up game loop
}


function keyDown(/** @type {KeyboardEvent} */ ev) {
    switch(ev.keyCode) {
        case 37: // left arrow (rotate ship left)
            ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case 38: // up arrow (thrust the ship forward)
            ship.thrusting = true;
            break;
        case 39: // right arrow (rotate ship right)
            ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
            break;
    }
}

function keyUp(/** @type {KeyboardEvent} */ ev) {
    switch(ev.keyCode) {
        case 37: // left arrow (stop rotating left)
            ship.rot = 0;
            break;
        case 38: // up arrow (stop thrusting)
            ship.thrusting = false;
            break;
        case 39: // right arrow (stop rotating right)
            ship.rot = 0;
            break;
    }
}

function update() {
    // draw space
    ctx.fillRect(0, 0, canv.width, canv.height);
    let img = document.getElementById("spaceBG");
    ctx.drawImage(img,0,0,canv.width, canv.height);

    // thrust the ship
    if (ship.thrusting) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

        // draw the thruster
        ctx.fillStyle = "red";
        ctx.strokeStyle = "yellow";

        ctx.lineWidth = SHIP_SIZE / 10;
        ctx.beginPath();
        ctx.moveTo( // rear left
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
        );
        ctx.lineTo( // rear centre (behind the ship)
            ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
            ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
        );
        ctx.lineTo( // rear right
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else {
        // apply friction (slow the ship down when not thrusting)
        ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
        ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
    }

    // draw the triangular ship
    let img2 = document.getElementById("spaceShip");


    ctx.strokeStyle = "white";
    ctx.lineWidth = SHIP_SIZE / 10;
    //ctx.rotate(ship.rot*Math.PI/180); ----rotates the entire canvas making it trippy.-------->
            // img2.style.transform = `rotate(${ship.rot*Math.PI/180}deg)`;
    ctx.drawImage(img2, ship.x, ship.y, 50, 50);
    ctx.beginPath();
    ctx.moveTo( // nose of the ship
        ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
        ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
    );
    ctx.lineTo( // rear left
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
    );
    ctx.lineTo( // rear right
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
    );
    ctx.closePath();
    ctx.stroke();

    // rotate the ship
    ship.a += ship.rot;

    // move the ship
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;

    // handle edge of screen
    if (ship.x < 0 - ship.r) {
        ship.x = canv.width + ship.r;
    } else if (ship.x > canv.width + ship.r) {
        ship.x = 0 - ship.r;
    }
    if (ship.y < 0 - ship.r) {
        ship.y = canv.height + ship.r;
    } else if (ship.y > canv.height + ship.r) {
        ship.y = 0 - ship.r;
    }

    // centre dot (optional)
    ctx.fillStyle = "red";
    ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
}
