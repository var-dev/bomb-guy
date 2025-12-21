import { it, describe } from "node:test";
import { strict as assert } from 'node:assert'

import { update, inputs, Input, resetDelay, getMap, getPlayer, isGameOver} from '../index'
import { Tile } from '../index'

const expectedMap: Tile[][] = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 0, 0, 12, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

// assert.deepStrictEqual(getMap(), [])

describe('how monster interactions kill player', ()=>{
  it('detonates bomb at 2,1', ()=>{
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.PLACE)
    update()
    resetDelay()
    inputs.push(Input.LEFT)
    update()
    resetDelay()
    inputs.push(Input.DOWN)
    update()
    resetDelay()
    update()
    resetDelay()
    
    const expectedPlayer = {x: 1, y: 2} 
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[1][3]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 3,1', ()=>{
    update()
    resetDelay()
    inputs.push(Input.UP)
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.PLACE)
    update()
    resetDelay()
    inputs.push(Input.LEFT)
    update()
    resetDelay()
    inputs.push(Input.LEFT)
    update()
    resetDelay()
    update()
    resetDelay()
    
    const expectedPlayer = {x: 1, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[1][3]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 4,1', ()=>{
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.PLACE)
    update()
    resetDelay()
    inputs.push(Input.LEFT)
    update()
    resetDelay()
    inputs.push(Input.LEFT)
    update()
    resetDelay()
    update()
    resetDelay()
    
    const expectedPlayer = {x: 2, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[1][4]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 5,1', ()=>{
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.PLACE)
    update()
    resetDelay()
    inputs.push(Input.LEFT)
    update()
    resetDelay()
    inputs.push(Input.LEFT)
    update()
    resetDelay()
    update()
    resetDelay()
    
    const expectedPlayer = {x: 3, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[1][5]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 5,2', ()=>{
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.DOWN)
    update()
    resetDelay()
    inputs.push(Input.PLACE)
    update()
    resetDelay()
    inputs.push(Input.UP)
    update()
    resetDelay()
    inputs.push(Input.LEFT)
    update()
    resetDelay()
    update()
    resetDelay()
    
    const expectedPlayer = {x: 4, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[2][5]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 5,3', ()=>{
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    inputs.push(Input.DOWN)
    update()
    resetDelay()
    inputs.push(Input.DOWN)
    update()
    resetDelay()
    inputs.push(Input.PLACE)
    update()
    resetDelay()
    inputs.push(Input.UP)
    update()
    resetDelay()
    inputs.push(Input.UP)
    update()
    resetDelay()
    update()
    resetDelay()
    
    const expectedPlayer = {x: 5, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[3][5]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('expected that monster is at 7,5', ()=>{
    const expectedMonster = getMap()[5][7]
    assert.strictEqual(expectedMonster, Tile.MONSTER_RIGHT)
  })
  it('detonates bomb at 5,4', ()=>{
    update()
    resetDelay()
    inputs.push(Input.DOWN)
    update()
    resetDelay()
    inputs.push(Input.DOWN)
    update()
    resetDelay()
    inputs.push(Input.DOWN)
    update()
    resetDelay()
    inputs.push(Input.PLACE)
    update()
    resetDelay()
    inputs.push(Input.UP)
    update()
    resetDelay()
    inputs.push(Input.UP)
    update()
    resetDelay()
    update()
    resetDelay()
    
    const expectedPlayer = {x: 5, y: 2}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[4][5]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('expected that monster is at 5,6', ()=>{
    const expectedMonster = getMap()[6][5]
    assert.strictEqual(expectedMonster, Tile.MONSTER_UP)
  })
  it('expected that monster is at 5,5', ()=>{
    update()
    resetDelay()
    const expectedMonster = getMap()[5][5]
    assert.strictEqual(expectedMonster, Tile.MONSTER_UP)
  })
  it('expected that monster is at 5,4', ()=>{
    update()
    resetDelay()
    const expectedPlayer = {x: 5, y: 2}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)
    const expectedMonster = getMap()[4][5]
    assert.strictEqual(expectedMonster, Tile.MONSTER_UP)
  })
  it('expected that monster is at 5,3', ()=>{
    update()
    resetDelay()
    const expectedPlayer = {x: 5, y: 2}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)
    const expectedMonster = getMap()[3][5]
    assert.strictEqual(expectedMonster, Tile.MONSTER_UP)
  })
  it('expected that monster is at 5,2', ()=>{
    update()
    resetDelay()
    const expectedPlayer = {x: 5, y: 2}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)
    const expectedMonster = getMap()[2][5]
    assert.strictEqual(expectedMonster, Tile.MONSTER_UP)
  })
  it('should be game over', ()=>{
    update()
    resetDelay()
    assert.strictEqual(isGameOver(), true)
  })
})