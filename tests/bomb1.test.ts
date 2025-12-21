import {it, describe} from 'node:test'
import { strict as assert } from 'node:assert'

import { update, inputs, Input, resetDelay, getMap, getPlayer, isGameOver} from '../index'
import type { Tile } from '../index'


describe('how the bomb setting off process works', ()=>{
  it('should set the bomb', ()=>{
    const expectedMap: Tile[][] = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 3, 2, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 0, 0, 12, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    update()
    inputs.push(Input.RIGHT)
    update()
    inputs.push(Input.PLACE)
    update()
    inputs.push(Input.LEFT)
    update()
    inputs.push(Input.DOWN)
    update()
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should get bomb CLOSE', ()=>{
    const expectedMap: Tile[][] = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 4, 2, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 0, 0, 14, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    // update()
    // inputs.push(Input.RIGHT)
    // update()
    // inputs.push(Input.PLACE)
    // update()
    update()
    resetDelay()
    update()
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should get BOMB_REALLY_CLOSE', ()=>{
    const expectedMap: Tile[][] = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 5, 2, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 0, 14,0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    update()
    resetDelay()
    update()
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should get bomb explosion', ()=>{
    const expectedMap: Tile[][] = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 7, 7, 7, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 14,0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    update()
    resetDelay()
    update()
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should clear after bomb explosion', ()=>{
    const expectedMap: Tile[][] = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 9, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    update()
    resetDelay()
    update()
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should get current player position', ()=>{
    const expectedPlayer = {x: 1, y: 2}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)
  })
  it('should get player dead after setting another bomb', ()=>{
    const expectedMap: Tile[][] = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 2, 2, 2, 1],
      [1, 0, 1, 0, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0,12, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    update()
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
    resetDelay() // 5 - BOMB_REALLY_CLOSE
    const expectedPlayer = {x: 2, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    update()
    resetDelay() // 1, 0, 7, 7, 7 - FIRE
    
    update()
    resetDelay() // 1, 0, 0, 0, 0 - AIR
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should be game over', ()=>{
    assert.strictEqual(isGameOver(), true)
  })
})