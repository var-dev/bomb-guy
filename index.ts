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

export class Game {
  public static readonly TILE_SIZE = 30;
  public static readonly FPS = 30;
  public static readonly SLEEP = 1000 / Game.FPS;
  public static readonly TPS = 2;
  public static readonly DELAY = Game.FPS / Game.TPS;
  public static _inputs: Input[] = [];
  public static delay = 0;
  public static bombs = 1;
  public static readonly gameOver = false;
  public static  playerX: number = 1;
  public static  playerY: number = 1;
  
  private static gameInstance: Game|undefined;
  public static getInstance(): Game {
    if (Game.gameInstance === undefined) {
      Game.gameInstance = new Game(convertToGameMap(map));
    }
    return Game.gameInstance;
  }
  public static over() {
    // @ts-ignore
    Game.gameOver = true
  }
  private constructor(public _gameMap: Tile[][]) {}

  public getTile(x: number, y: number): Tile {
    return this._gameMap[y][x];
  }
  public setTile(x: number, y: number, tileConstructor: new (x: number, y: number) => Tile): void {
    this._gameMap[y][x] = new tileConstructor(x, y);
  }
  public drawTile(x: number, y: number, g: CanvasRenderingContext2D): void {
    this._gameMap[y][x].draw(g)
  }
  public transitionTile(x: number, y: number, g: CanvasRenderingContext2D): void {
    this._gameMap[y][x].transition()
  }
  public get mapRo(): Tile[][] {
    return structuredClone(this._gameMap)
  }
  update() {
    while (!Game.gameOver && Game._inputs.length > 0) {
      (Game._inputs.pop())?.move()
    }

    this._gameMap[Game.playerY][Game.playerX].isGameOver()

    if (--Game.delay > 0) return;
    Game.delay = Game.DELAY;

    for (let y = 1; y < this._gameMap.length; y++) {
      for (let x = 1; x < this._gameMap[y].length; x++) {
        this._gameMap[y][x].transition()
      }
    }
  }
  draw(){
    let canvas = <HTMLCanvasElement>document.getElementById("GameCanvas");
    let g = canvas.getContext("2d")!;
    g.clearRect(0, 0, canvas.width, canvas.height);
    // Draw map
    this._gameMap.forEach((row) => {
      row.forEach((tile) => {
        tile.draw(g);
      });
    });
    // Draw player
    g.fillStyle = "#00ff00";
    if (!Game.gameOver)
      g.fillRect(Game.playerX * Game.TILE_SIZE, Game.playerY * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isMonsterThere(): boolean {
    return this._gameMap.some((row)=>
      row.some((tile)=>{
        return (
          tile.isMonsterUp() || 
            tile.isMonsterDown() || 
            tile.isMonsterLeft() || 
            tile.isMonsterRight() ||
            tile.isTmpMonsterDown() ||
            tile.isTmpMonsterRight()
        ) 
      }
  ))}
  getMonster(): {x: number, y: number} {
    let monster: {x: number, y: number} = {x: -1, y: -1}
    this._gameMap.some((row, y)=>
      row.some((tile, x)=>{
        if (
            tile.isMonsterUp() || 
            tile.isMonsterDown() || 
            tile.isMonsterLeft() || 
            tile.isMonsterRight() ||
            tile.isTmpMonsterDown()||
            tile.isTmpMonsterRight()
          ) {
          monster =  {x, y}
        }
    }))
    return monster
  }
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
  draw(g: CanvasRenderingContext2D): void,
  isGameOver(): void,
  transition(): void,
  isExplosive(): boolean,
  walkIn(dX: number, dY: number): void
}
export class Air implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){}
  isGameOver(){}
  transition(){}
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){
    Game.playerY += dY;
    Game.playerX += dX;
  }
}
export class Unbreakable implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){ 
    g.fillStyle = "#999999";
    g.fillRect(this._x * Game.TILE_SIZE, this._y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isGameOver(){}
  transition(){}
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){}
}
export class Stone implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){ 
    g.fillStyle = "#0000cc";
    g.fillRect(this._x * Game.TILE_SIZE, this._y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isGameOver(){}
  transition(){}
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){}
}
export class Bomb implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){ 
    g.fillStyle = "#770000";
    g.fillRect(this._x * Game.TILE_SIZE, this._y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isGameOver(){}
  transition(){ Game.getInstance().setTile(this._x, this._y, BombClose);}
  isExplosive(){ return true;}
  walkIn(dX: number, dY: number){}
}
export class BombClose implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){ 
    g.fillStyle = "#cc0000";
    g.fillRect(this._x * Game.TILE_SIZE, this._y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isGameOver(){}
  transition(){ Game.getInstance().setTile(this._x, this._y, BombReallyClose);}
  isExplosive(){ return true;}
  walkIn(dX: number, dY: number){}
}
export class BombReallyClose implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){ 
    g.fillStyle = "#ff0000";
    g.fillRect(this._x * Game.TILE_SIZE, this._y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isGameOver(){}
  transition(){
    explode(this._x + 0, this._y - 1, new Fire(this._x, this._y - 1));
    explode(this._x + 0, this._y + 1, new TmpFire(this._x, this._y + 1));
    explode(this._x - 1, this._y + 0, new Fire(this._x - 1, this._y));
    explode(this._x + 1, this._y + 0, new TmpFire(this._x + 1, this._y));
    Game.getInstance().setTile(this._x, this._y, Fire);
    Game.bombs++;
  }
  isExplosive(){ return true;}
  walkIn(dX: number, dY: number){}
}
export class TmpFire implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){}
  isGameOver(){}
  transition(){ Game.getInstance().setTile(this._x, this._y, Fire);}
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){}
}
export class Fire implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){ 
    g.fillStyle = "#ffcc00";
    g.fillRect(this._x * Game.TILE_SIZE, this._y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isGameOver(){ Game.over()}
  transition(){ Game.getInstance().setTile(this._x, this._y, Air);}
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){
    Game.playerY += dY;
    Game.playerX += dX;
  }
}
export class ExtraBomb implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){ 
    g.fillStyle = "#00cc00";
    g.fillRect(this._x * Game.TILE_SIZE, this._y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isGameOver(){}
  transition(){}
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){
    Game.playerY += dY;
    Game.playerX += dX;
    Game.bombs++;
    Game.getInstance().setTile(Game.playerX, Game.playerX, Air);
  }
}
export class MonsterUp implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){ 
    g.fillStyle = "#cc00cc";
    g.fillRect(this._x * Game.TILE_SIZE, this._y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isGameOver(){ Game.over()}
  transition(){
    if (Game.getInstance().getTile(this._x, this._y - 1).isAir()) {
      Game.getInstance().setTile(this._x, this._y, Air);
      Game.getInstance().setTile(this._x, this._y - 1 , MonsterUp);
    } else {
      Game.getInstance().setTile(this._x, this._y, MonsterRight);
    }
  }
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){}
}
export class MonsterRight implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){ 
    g.fillStyle = "#cc00cc";
    g.fillRect(this._x * Game.TILE_SIZE, this._y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isGameOver(){ Game.over()}
  transition(){
    if (Game.getInstance().getTile(this._x + 1, this._y).isAir()) {
      Game.getInstance().setTile(this._x, this._y, Air);
      Game.getInstance().setTile(this._x + 1, this._y, TmpMonsterRight);
    } else {
      Game.getInstance().setTile(this._x, this._y, MonsterDown);
    }
  }
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){}
}
export class TmpMonsterRight implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){}
  isGameOver(){}
  transition(){ Game.getInstance().setTile(this._x, this._y, MonsterRight);}
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){}
}
export class MonsterDown implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){
    g.fillStyle = "#cc00cc";
    g.fillRect(this._x * Game.TILE_SIZE, this._y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isGameOver(){ Game.over()}
  transition(){
    if (Game.getInstance().getTile(this._x, this._y + 1).isAir()) {
      Game.getInstance().setTile(this._x, this._y, Air);
      Game.getInstance().setTile(this._x, this._y + 1, TmpMonsterDown);
    } else {
      Game.getInstance().setTile(this._x, this._y, MonsterLeft);
    }
  }
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){}
}
export class TmpMonsterDown implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){}
  isGameOver(){}
  transition(){ Game.getInstance().setTile(this._x, this._y, MonsterDown);}
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){}
}
export class MonsterLeft implements Tile {
  constructor(private _x: number, private _y: number){}
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
  draw(g: CanvasRenderingContext2D){ 
    g.fillStyle = "#cc00cc";
    g.fillRect(this._x * Game.TILE_SIZE, this._y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
  }
  isGameOver(){ Game.over()}
  transition(){  // below swapLeft
    if (Game.getInstance().getTile(this._x - 1, this._y).isAir()) {
      Game.getInstance().setTile(this._x    , this._y, Air);
      Game.getInstance().setTile(this._x - 1, this._y, MonsterLeft);
    } else {
      Game.getInstance().setTile(this._x, this._y, MonsterUp);
    }
  }
  isExplosive(){ return false;}
  walkIn(dX: number, dY: number){}
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
  move(): void { Game.getInstance().getTile(Game.playerX, Game.playerY-1).walkIn(0, -1); }
}
export class Down implements Input {
  isUp(): boolean { return false; }
  isDown(): boolean { return true; }
  isLeft(): boolean { return false; }
  isRight(): boolean { return false; }
  isPlaceBomb(): boolean { return false; }
  move(): void { Game.getInstance().getTile(Game.playerX, Game.playerY+1).walkIn(0, 1); }
}
export class Left implements Input {
  isUp(): boolean { return false; }
  isDown(): boolean { return false; }
  isLeft(): boolean { return true; }
  isRight(): boolean { return false; }
  isPlaceBomb(): boolean { return false; }
  move(): void { Game.getInstance().getTile(Game.playerX-1, Game.playerY).walkIn(-1, 0); }
}
export class Right implements Input {
  isUp(): boolean { return false; }
  isDown(): boolean { return false; }
  isLeft(): boolean { return false; }
  isRight(): boolean { return true; }
  isPlaceBomb(): boolean { return false; }
  move(): void { Game.getInstance().getTile(Game.playerX+1, Game.playerY).walkIn(1, 0); }
}
export class Place implements Input {
  isUp(): boolean { return false; }
  isDown(): boolean { return false; }
  isLeft(): boolean { return false; }
  isRight(): boolean { return false; }
  isPlaceBomb(): boolean { return true; }
  move(): void { 
    if (Game.bombs > 0) {
      Game.getInstance().setTile(Game.playerX, Game.playerY, Bomb);
      Game.bombs--;
    }
  }
}

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
let gameMap = Game.getInstance()._gameMap

export function convertToGameMap(sourceMap: RawTile[][]): Tile[][]{
  // initialize generatedMap with the same dimensions as sourceMap
  let generatedMap: Tile[][] = sourceMap.map((row, y) => row.map((_, x) => new Unbreakable(x, y)));

  for (let y = 0; y < sourceMap.length; y++) {
    for (let x = 0; x < sourceMap[y].length; x++) {
      switch (sourceMap[y][x]){
        case RawTile.AIR:
          generatedMap[y][x] = new Air(x, y)
          break;
        case RawTile.UNBREAKABLE:
          generatedMap[y][x] = new Unbreakable(x, y)
          break;
        case RawTile.STONE:
          generatedMap[y][x] = new Stone(x, y)
          break;
        case RawTile.BOMB:
          generatedMap[y][x] = new Bomb(x, y)
          break;
        case RawTile.BOMB_CLOSE:
          generatedMap[y][x] = new BombClose(x, y)
          break;
        case RawTile.BOMB_REALLY_CLOSE:
          generatedMap[y][x] = new BombReallyClose(x, y)
          break;
        case RawTile.TMP_FIRE:
          generatedMap[y][x] = new TmpFire(x, y)
          break;
        case RawTile.FIRE:
          generatedMap[y][x] = new Fire(x, y)
          break;
        case RawTile.EXTRA_BOMB:
          generatedMap[y][x] = new ExtraBomb(x, y)
          break;
        case RawTile.MONSTER_UP:
          generatedMap[y][x] = new MonsterUp(x, y)
          break;
        case RawTile.MONSTER_RIGHT:
          generatedMap[y][x] = new MonsterRight(x, y)
          break;
        case RawTile.TMP_MONSTER_RIGHT:
          generatedMap[y][x] = new TmpMonsterRight(x, y)
          break;
        case RawTile.MONSTER_DOWN:
          generatedMap[y][x] = new MonsterDown(x, y)
          break;
        case RawTile.TMP_MONSTER_DOWN:
          generatedMap[y][x] = new TmpMonsterDown(x, y)
          break;
        case RawTile.MONSTER_LEFT:
          generatedMap[y][x] = new MonsterLeft(x, y)
          break;
        default:
          ((value: never)=>{
          throw new Error(`Unhandled case ${value}`)})(sourceMap[y][x] as never)
      }
    }
  }
  return generatedMap;
}


function explode(x: number, y: number, type: Tile) {
  if (Game.getInstance().getTile(x, y).isStone()) {
    if (Math.random() < 0.01) Game.getInstance().setTile(x, y, ExtraBomb);
    else gameMap[y][x] = type;
  } else if (!Game.getInstance().getTile(x, y).isUnbreakable()) {
    if (Game.getInstance().getTile(x, y).isExplosive()) Game.bombs++;
    gameMap[y][x] = type;
  }
}

function gameLoop() {
  let before = Date.now();
  Game.getInstance().update();
  Game.getInstance().draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = Game.SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}


function browserMain() {
  window.onload = () => {
    gameLoop();
  };


  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") Game._inputs.push(new Left());
    else if (e.key === "ArrowUp" || e.key === "w") Game._inputs.push(new Up());
    else if (e.key === "ArrowRight" || e.key === "d") Game._inputs.push(new Right());
    else if (e.key === "ArrowDown" || e.key === "s") Game._inputs.push(new Down());
    else if (e.key === " ") Game._inputs.push(new Place());
  });
}

if (typeof document !== "undefined") browserMain();

export function resetDelay() {Game.delay = 0}

export function getMap() {return Game.getInstance()._gameMap}

export function getPlayer() {return {x: Game.playerX, y: Game.playerY}}
export function isGameOver(){ return Game.gameOver}
