import { it, describe } from "node:test";
import { strict as assert } from 'node:assert'

import { update, inputs, Input, resetDelay, getMap, getPlayer, isGameOver} from '../index'
import { isMonsterThere, getMonster } from "../index";
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

describe('how player kills monster with bomb', ()=>{
  it('detonates bomb at 1,2', ()=>{
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
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    update()
    resetDelay()
    
    const expectedPlayer = {x: 2, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[2][1]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 1,3', ()=>{
    update()
    resetDelay()
    inputs.push(Input.LEFT)
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
    
    const expectedPlayer = {x: 1, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[3][1]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 1,4', ()=>{
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
    
    const expectedPlayer = {x: 1, y: 2}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[4][1]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 1,5', ()=>{
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
    
    const expectedPlayer = {x: 1, y: 3}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[5][1]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 1,6', ()=>{
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
    
    const expectedPlayer = {x: 1, y: 4}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[6][1]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 1,7', ()=>{
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
    
    const expectedPlayer = {x: 1, y: 5}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[7][1]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 2,7', ()=>{
    update()
    resetDelay()
    inputs.push(Input.DOWN)
    update()
    resetDelay()
    inputs.push(Input.DOWN)
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
    inputs.push(Input.UP)
    update()
    resetDelay()
    update()
    resetDelay()
    
    const expectedPlayer = {x: 1, y: 6}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[7][2]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('detonates bomb at 3,7', ()=>{
    inputs.push(Input.DOWN)
    update()
    resetDelay()
    inputs.push(Input.RIGHT)
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

    
    const expectedPlayer = {x: 1, y: 7}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    const expectedAir = getMap()[7][4]
    assert.strictEqual(expectedAir, Tile.AIR)
  })
  it('expected that monster is at 7,6', ()=>{
    assert.ok(isMonsterThere())
    assert.deepStrictEqual(getMonster(), {x:7, y:6})
  })
  it('expected that player is at 5,7', ()=>{
    inputs.push(Input.RIGHT)
    inputs.push(Input.RIGHT)
    inputs.push(Input.RIGHT)
    inputs.push(Input.RIGHT)
    update()
    resetDelay()
    const expectedPlayer = {x: 5, y: 7}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)
  })

  it('expected that monster is at 7,7', ()=>{
    assert.ok(isMonsterThere())
    assert.deepStrictEqual(getMonster(), {x:7, y:7})
  })
  it('expected that bomb is at 5,7 and player is at 3,7', ()=>{
    inputs.push(Input.PLACE)
    update()
    inputs.push(Input.LEFT)
    update()
    inputs.push(Input.LEFT)
    update()
    resetDelay()
    const expectedPlayer = {x: 3, y: 7}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)
  })
  it('expected that monster is at 7,7', ()=>{
    assert.ok(isMonsterThere())
    assert.deepStrictEqual(getMonster(), {x:7, y:7})
  })
  it('expected that bomb is at 5,7', ()=>{
    assert.strictEqual(getMap()[7][5], Tile.BOMB_CLOSE)
  })
  it('expected that bomb is BOMB_REALLY_CLOSE)', ()=>{
    update()
    resetDelay()
    assert.strictEqual(getMap()[7][5], Tile.BOMB_REALLY_CLOSE)
  })
  it('expected that monster is at 6,7', ()=>{
    assert.ok(isMonsterThere())
    assert.deepStrictEqual(getMonster(), {x:6, y:7})
  })

  it('expected that FIRE is at 5,7, 4,7 ans 3,7)', ()=>{
    update()
    resetDelay()
    assert.strictEqual(getMap()[7][6], Tile.FIRE, `getMap()[7][6] ${getMap()[7][6]}`)
    assert.strictEqual(getMap()[7][5], Tile.FIRE, `getMap()[7][5] ${getMap()[7][5]}`)
    assert.strictEqual(getMap()[7][4], Tile.FIRE, `getMap()[7][4] ${getMap()[7][4]}`)
  })

  it('should be game over after monster is eaten by fire but it is not', ()=>{
    update()
    resetDelay()
    update()
    resetDelay()
    update()
    resetDelay()
    assert.strictEqual(isGameOver(), false)

    assert.ok(!isMonsterThere())
  })

})