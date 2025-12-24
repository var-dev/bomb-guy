import { it, describe } from "node:test";
import { strict as assert } from 'node:assert'

import { Game, Input, resetDelay, getMap, getPlayer, isGameOver, MonsterUp, Air, MonsterRight} from '../index'
import { Place, Left, Right, Up, Down } from "../index";
import { Tile, convertToGameMap } from '../index'

const expectedMap: Tile[][] = convertToGameMap([
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 0, 0, 12, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);

// assert.deepStrictEqual(getMap(), [])
const gameInstance = Game.getInstance()

describe('how monster interactions kill player', ()=>{
  it('detonates bomb at 2,1', ()=>{
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Place())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Left())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Down())
    gameInstance.update()
    resetDelay()
    gameInstance.update()
    resetDelay()
    
    const expectedPlayer = {x: 1, y: 2} 
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[1][3]
    assert.strictEqual(expectedAir.isAir(), new Air().isAir())
  })
  it('detonates bomb at 3,1', ()=>{
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Up())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Place())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Left())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Left())
    gameInstance.update()
    resetDelay()
    gameInstance.update()
    resetDelay()
    
    const expectedPlayer = {x: 1, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[1][3]
    assert.strictEqual(expectedAir.isAir(), new Air().isAir())
  })
  it('detonates bomb at 4,1', ()=>{
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Place())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Left())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Left())
    gameInstance.update()
    resetDelay()
    gameInstance.update()
    resetDelay()
    
    const expectedPlayer = {x: 2, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[1][4]
    assert.strictEqual(expectedAir.isAir(), new Air().isAir())
  })
  it('detonates bomb at 5,1', ()=>{
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Place())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Left())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Left())
    gameInstance.update()
    resetDelay()
    gameInstance.update()
    resetDelay()
    
    const expectedPlayer = {x: 3, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[1][5]
    assert.strictEqual(expectedAir.isAir(), new Air().isAir())
  })
  it('detonates bomb at 5,2', ()=>{
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Down())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Place())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Up())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Left())
    gameInstance.update()
    resetDelay()
    gameInstance.update()
    resetDelay()
    
    const expectedPlayer = {x: 4, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[2][5]
    assert.strictEqual(expectedAir.isAir(), new Air().isAir())
  })
  it('detonates bomb at 5,3', ()=>{
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Right())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Down())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Down())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Place())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Up())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Up())
    gameInstance.update()
    resetDelay()
    gameInstance.update()
    resetDelay()
    
    const expectedPlayer = {x: 5, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[3][5]
    assert.strictEqual(expectedAir.isAir(), new Air().isAir())
  })
  it('expected that monster is at 7,5', ()=>{
    const expectedMonster = getMap()[5][7]
    assert.strictEqual(expectedMonster.isMonsterRight(), new MonsterRight().isMonsterRight())
  })
  it('detonates bomb at 5,4', ()=>{
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Down())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Down())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Down())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Place())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Up())
    gameInstance.update()
    resetDelay()
    Game._inputs.push(new Up())
    gameInstance.update()
    resetDelay()
    gameInstance.update()
    resetDelay()
    
    const expectedPlayer = {x: 5, y: 2}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[4][5]
    assert.strictEqual(expectedAir.isAir(), new Air().isAir())///
  })
  it('expected that monster is at 5,6', ()=>{
    const expectedMonster = getMap()[6][5]
    assert.strictEqual(expectedMonster.isMonsterUp(), new MonsterUp().isMonsterUp())
  })
  it('expected that monster is at 5,5', ()=>{
    gameInstance.update()
    resetDelay()
    const expectedMonster = getMap()[5][5]
    assert.strictEqual(expectedMonster.isMonsterUp(), new MonsterUp().isMonsterUp())
  })
  it('expected that monster is at 5,4', ()=>{
    gameInstance.update()
    resetDelay()
    const expectedPlayer = {x: 5, y: 2}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)
    const expectedMonster = getMap()[4][5]
    assert.strictEqual(expectedMonster.isMonsterUp(), new MonsterUp().isMonsterUp())
  })
  it('expected that monster is at 5,3', ()=>{
    gameInstance.update()
    resetDelay()
    const expectedPlayer = {x: 5, y: 2}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)
    const expectedMonster = getMap()[3][5]
    assert.strictEqual(expectedMonster.isMonsterUp(), new MonsterUp().isMonsterUp())
  })
  it('expected that monster is at 5,2', ()=>{
    gameInstance.update()
    resetDelay()
    const expectedPlayer = {x: 5, y: 2}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)
    const expectedMonster = getMap()[2][5]
    assert.strictEqual(expectedMonster.isMonsterUp(), new MonsterUp().isMonsterUp())
  })
  it('should be game over', ()=>{
    gameInstance.update()
    resetDelay()
    assert.strictEqual(isGameOver(), true)
  })
})