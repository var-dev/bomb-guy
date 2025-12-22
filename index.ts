const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;
const TPS = 2;
const DELAY = FPS / TPS;

enum RawTile {
  AIR,
  UNBREAKABLE,
  STONE,
  BOMB,
  BOMB_CLOSE,
  BOMB_REALLY_CLOSE,
  TMP_FIRE,
  FIRE,
  EXTRA_BOMB,
  MONSTER_UP,
  MONSTER_RIGHT,
  TMP_MONSTER_RIGHT,
  MONSTER_DOWN,
  TMP_MONSTER_DOWN,
  MONSTER_LEFT,
}

export interface Tile {
  isAir(): boolean,
  isUnbreakable(): boolean,
  isStone(): boolean,
  isBomb(): boolean,
  isBombClose(): boolean,
  isBombReallyClose(): boolean,
  isTmpFire(): boolean,
  isFire(): boolean,
  isExtraBomb(): boolean,
  isMonsterUp(): boolean,
  isMonsterRight(): boolean,
  isTmpMonsterRight(): boolean,
  isMonsterDown(): boolean,
  isTmpMonsterDown(): boolean,
  isMonsterLeft(): boolean,
  draw(y: number, x: number, g: CanvasRenderingContext2D): void;
}
export class Air implements Tile {
  isAir(): boolean { return true; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){}
}
export class Unbreakable implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return true; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){ 
    g.fillStyle = "#999999";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
export class Stone implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return true; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){ 
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
export class Bomb implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return true; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){ 
    g.fillStyle = "#770000";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
export class BombClose implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return true; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){ 
    g.fillStyle = "#cc0000";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
export class BombReallyClose implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return true; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){ 
    g.fillStyle = "#ff0000";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
export class TmpFire implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return true; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){}
}
export class Fire implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return true; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){ 
    g.fillStyle = "#ffcc00";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
export class ExtraBomb implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return true; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){ 
    g.fillStyle = "#00cc00";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
export class MonsterUp implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return true; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){ 
    g.fillStyle = "#cc00cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
export class MonsterRight implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return true; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){ 
    g.fillStyle = "#cc00cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
export class TmpMonsterRight implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return true; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){}
}
export class MonsterDown implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return true; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){
    g.fillStyle = "#cc00cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
export class TmpMonsterDown implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return true; }
  isMonsterLeft(): boolean { return false; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){}
}
export class MonsterLeft implements Tile {
  isAir(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isStone(): boolean { return false; }
  isBomb(): boolean { return false; }
  isBombClose(): boolean { return false; }
  isBombReallyClose(): boolean { return false; }
  isTmpFire(): boolean { return false; }
  isFire(): boolean { return false; }
  isExtraBomb(): boolean { return false; }
  isMonsterUp(): boolean { return false; }
  isMonsterRight(): boolean { return false; }
  isTmpMonsterRight(): boolean { return false; }
  isMonsterDown(): boolean { return false; }
  isTmpMonsterDown(): boolean { return false; }
  isMonsterLeft(): boolean { return true; }
  draw(y: number, x: number, g: CanvasRenderingContext2D){ 
    g.fillStyle = "#cc00cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

export interface Input {
  isUp(): boolean,
  isDown(): boolean,
  isLeft(): boolean,
  isRight(): boolean,
  isPlaceBomb(): boolean,
  move(): void,
}

export class Up implements Input {
  isUp(): boolean { return true; }
  isDown(): boolean { return false; }
  isLeft(): boolean { return false; }
  isRight(): boolean { return false; }
  isPlaceBomb(): boolean { return false; }
  move(): void { move(0, -1); }
}
export class Down implements Input {
  isUp(): boolean { return false; }
  isDown(): boolean { return true; }
  isLeft(): boolean { return false; }
  isRight(): boolean { return false; }
  isPlaceBomb(): boolean { return false; }
  move(): void { move(0, 1); }
}
export class Left implements Input {
  isUp(): boolean { return false; }
  isDown(): boolean { return false; }
  isLeft(): boolean { return true; }
  isRight(): boolean { return false; }
  isPlaceBomb(): boolean { return false; }
  move(): void { move(-1, 0); }
}
export class Right implements Input {
  isUp(): boolean { return false; }
  isDown(): boolean { return false; }
  isLeft(): boolean { return false; }
  isRight(): boolean { return true; }
  isPlaceBomb(): boolean { return false; }
  move(): void { move(1, 0); }
}
export class Place implements Input {
  isUp(): boolean { return false; }
  isDown(): boolean { return false; }
  isLeft(): boolean { return false; }
  isRight(): boolean { return false; }
  isPlaceBomb(): boolean { return true; }
  move(): void { 
    if (bombs > 0) {
      gameMap[playery][playerx] = new Bomb();
      bombs--;
    }
  }
}


let playerx = 1;
let playery = 1;
let map: RawTile[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 2, 2, 2, 2, 2, 1],
  [1, 0, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 0, 0, 0, 1],
  [1, 2, 1, 2, 1, 0, 1, 0, 1],
  [1, 2, 2, 2, 2, 0, 0, 10, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
];
let gameMap: Tile[][] = convertToGameMap(map)

export function convertToGameMap(sourceMap: RawTile[][]): Tile[][]{
  // initialize generatedMap with the same dimensions as sourceMap
  let generatedMap: Tile[][] = sourceMap.map(row => row.map(() => new Unbreakable()));

  for (let y = 0; y < sourceMap.length; y++) {
    for (let x = 0; x < sourceMap[y].length; x++) {
      switch (sourceMap[y][x]){
        case RawTile.AIR:
          generatedMap[y][x] = new Air()
          break;
        case RawTile.UNBREAKABLE:
          generatedMap[y][x] = new Unbreakable()
          break;
        case RawTile.STONE:
          generatedMap[y][x] = new Stone()
          break;
        case RawTile.BOMB:
          generatedMap[y][x] = new Bomb()
          break;
        case RawTile.BOMB_CLOSE:
          generatedMap[y][x] = new BombClose()
          break;
        case RawTile.BOMB_REALLY_CLOSE:
          generatedMap[y][x] = new BombReallyClose()
          break;
        case RawTile.TMP_FIRE:
          generatedMap[y][x] = new TmpFire()
          break;
        case RawTile.FIRE:
          generatedMap[y][x] = new Fire()
          break;
        case RawTile.EXTRA_BOMB:
          generatedMap[y][x] = new ExtraBomb()
          break;
        case RawTile.MONSTER_UP:
          generatedMap[y][x] = new MonsterUp()
          break;
        case RawTile.MONSTER_RIGHT:
          generatedMap[y][x] = new MonsterRight()
          break;
        case RawTile.TMP_MONSTER_RIGHT:
          generatedMap[y][x] = new TmpMonsterRight()
          break;
        case RawTile.MONSTER_DOWN:
          generatedMap[y][x] = new MonsterDown()
          break;
        case RawTile.TMP_MONSTER_DOWN:
          generatedMap[y][x] = new TmpMonsterDown()
          break;
        case RawTile.MONSTER_LEFT:
          generatedMap[y][x] = new MonsterLeft()
          break;
        default:
          ((value: never)=>{
          throw new Error(`Unhandled case ${value}`)})(sourceMap[y][x] as never)
      }
    }
  }
  return generatedMap;
}


let inputs: Input[] = [];

let delay = 0;
let bombs = 1;
let gameOver = false;

function explode(x: number, y: number, type: Tile) {
  if (gameMap[y][x].isStone() === new Stone().isStone()) {
    if (Math.random() < 0.01) gameMap[y][x] = new ExtraBomb();
    else gameMap[y][x] = type;
  } else if (gameMap[y][x].isUnbreakable() !== new Unbreakable().isUnbreakable()) {
    if (
      gameMap[y][x].isBomb() === new Bomb().isBomb() ||
      gameMap[y][x].isBombClose() === new BombClose().isBombClose() ||
      gameMap[y][x].isBombReallyClose() === new BombReallyClose().isBombReallyClose()
    )
      bombs++;
    gameMap[y][x] = type;
  }
}

function move(x: number, y: number) {
  if (
    gameMap[playery + y][playerx + x].isAir() === new Air().isAir() ||
    gameMap[playery + y][playerx + x].isFire() === new Fire().isFire()
  ) {
    playery += y;
    playerx += x;
  } else if (gameMap[playery + y][playerx + x].isExtraBomb() === new ExtraBomb().isExtraBomb()) {
    playery += y;
    playerx += x;
    bombs++;
    gameMap[playery][playerx] = new Air();
  }
}

function update() {
  while (!gameOver && inputs.length > 0) {
    (inputs.pop())?.move()
  }

  checkGameOver();

  if (--delay > 0) return;
  delay = DELAY;

  for (let y = 1; y < map.length; y++) {
    for (let x = 1; x < map[y].length; x++) {
      tileHandler(y, x);
    }
  }
}

function checkGameOver() {
  if (gameMap[playery][playerx].isFire() === new Fire().isFire() ||
    gameMap[playery][playerx].isMonsterDown() === new MonsterDown().isMonsterDown() ||
    gameMap[playery][playerx].isMonsterUp() === new MonsterUp().isMonsterUp() ||
    gameMap[playery][playerx].isMonsterLeft() === new MonsterLeft().isMonsterLeft() ||
    gameMap[playery][playerx].isMonsterRight() === new MonsterRight().isMonsterRight())
    gameOver = true;
}

function tileHandler(y: number, x: number) {
  if (gameMap[y][x].isBomb() === new Bomb().isBomb()) {
    gameMap[y][x] = new BombClose();
  } else if (gameMap[y][x].isBombClose() === new BombClose().isBombClose()) {
    gameMap[y][x] = new BombReallyClose();
  } else if (gameMap[y][x].isBombReallyClose() === new BombReallyClose().isBombReallyClose()) {
    explode(x + 0, y - 1, new Fire());
    explode(x + 0, y + 1, new TmpFire());
    explode(x - 1, y + 0, new Fire());
    explode(x + 1, y + 0, new TmpFire());
    gameMap[y][x] = new Fire();
    bombs++;
  } else if (gameMap[y][x].isTmpFire() === new TmpFire().isTmpFire()) {
    gameMap[y][x] = new Fire();
  } else if (gameMap[y][x].isFire() === new Fire().isFire()) {
    gameMap[y][x] = new Air();
  } else if (gameMap[y][x].isTmpMonsterDown() === new TmpMonsterDown().isTmpMonsterDown()) {
    gameMap[y][x] = new MonsterDown();
  } else if (gameMap[y][x].isTmpMonsterRight() === new TmpMonsterRight().isTmpMonsterRight()) {
    gameMap[y][x] = new MonsterRight();
  } else if (gameMap[y][x].isMonsterRight() === new MonsterRight().isMonsterRight()) {
    if (gameMap[y][x + 1].isAir() === new Air().isAir()) {
      gameMap[y][x] = new Air();
      gameMap[y][x + 1] = new TmpMonsterRight();
    } else {
      gameMap[y][x] = new MonsterDown();
    }
  } else if (gameMap[y][x].isMonsterDown() === new MonsterDown().isMonsterDown()) {
    if (gameMap[y + 1][x].isAir() === new Air().isAir()) {
      gameMap[y][x] = new Air();
      gameMap[y + 1][x] = new TmpMonsterDown();
    } else {
      gameMap[y][x] = new MonsterLeft();
    }
  } else if (gameMap[y][x].isMonsterLeft() === new MonsterLeft().isMonsterLeft()) {
    if (gameMap[y][x - 1].isAir() === new Air().isAir()) {
      gameMap[y][x] = new Air();
      gameMap[y][x - 1] = new MonsterLeft();
    } else {
      gameMap[y][x] = new MonsterUp();
    }
  } else if (gameMap[y][x].isMonsterUp() === new MonsterUp().isMonsterUp()) {
    if (gameMap[y - 1][x].isAir() === new Air().isAir()) {
      gameMap[y][x] = new Air();
      gameMap[y - 1][x] = new MonsterUp();
    } else {
      gameMap[y][x] = new MonsterRight();
    }
  }
}

function draw() {
  let canvas = <HTMLCanvasElement>document.getElementById("GameCanvas");
  let g = canvas.getContext("2d")!;

  g.clearRect(0, 0, canvas.width, canvas.height);

  // Draw map
  for (let y = 0; y < gameMap.length; y++) {
    for (let x = 0; x < gameMap[y].length; x++) {
      gameMap[y][x].draw(y, x, g);
    }
  }

  // Draw player
  g.fillStyle = "#00ff00";
  if (!gameOver)
    g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}


const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";


function browserMain() {
  window.onload = () => {
    gameLoop();
  };


  window.addEventListener("keydown", (e) => {
    if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
    else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
    else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
    else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
    else if (e.key === " ") inputs.push(new Place());
  });
}

if (typeof document !== "undefined") browserMain();




export { map, inputs,  update, delay };

export function resetDelay() {delay = 0}

export function getMap() {return gameMap}

export function getPlayer() {return {x: playerx, y: playery}}
export function isGameOver(){ return gameOver}
export function getMonster(): {x: number, y: number} {
  let monster: {x: number, y: number} = {x: -1, y: -1}
  gameMap.some((row, y)=>
    row.some((tile, x)=>{
      if (
          tile.isMonsterUp() === new MonsterUp().isMonsterUp() || 
          tile.isMonsterDown() === new MonsterDown().isMonsterDown() || 
          tile.isMonsterLeft() === new MonsterLeft().isMonsterLeft() || 
          tile.isMonsterRight() === new MonsterRight().isMonsterRight() ||
          tile.isTmpMonsterDown() === new TmpMonsterDown().isTmpMonsterDown()||
          tile.isTmpMonsterRight() === new TmpMonsterRight().isTmpMonsterRight()
        ) {
        monster =  {x, y}
      }
  }))
  return monster
}
export function isMonsterThere(): boolean {
  return gameMap.some((row)=>
    row.some((tile)=>{
      return (
        tile.isMonsterUp() === new MonsterUp().isMonsterUp() || 
          tile.isMonsterDown() === new MonsterDown().isMonsterDown() || 
          tile.isMonsterLeft() === new MonsterLeft().isMonsterLeft() || 
          tile.isMonsterRight() === new MonsterRight().isMonsterRight() ||
          tile.isTmpMonsterDown() === new TmpMonsterDown().isTmpMonsterDown()||
          tile.isTmpMonsterRight() === new TmpMonsterRight().isTmpMonsterRight()
      ) 
  }))
}
