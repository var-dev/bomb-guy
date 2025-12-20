import {it, describe} from 'node:test'
import { strict as assert } from 'node:assert'

import {map, update, inputs, Input, resetDelay} from '../index'
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
    assert.deepStrictEqual(map, expectedMap)
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
    assert.deepStrictEqual(map, expectedMap)
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
    assert.deepStrictEqual(map, expectedMap)
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
    assert.deepStrictEqual(map, expectedMap)
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
    assert.deepStrictEqual(map, expectedMap)
  })
})