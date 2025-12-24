import {it, describe} from 'node:test'
import { strict as assert } from 'node:assert'

import { Game, resetDelay, getMap, getPlayer, isGameOver} from '../index'
import { Place, Left, Right, Up, Down } from "../index";
import { convertToGameMap } from '../index';
import type { Tile } from '../index'

const gameInstance = Game.getInstance()

describe('how the bomb setting off process works', ()=>{
  it('should set the bomb', ()=>{
    const expectedMap: Tile[][] = convertToGameMap([
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 3, 2, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 0, 0, 12, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);
    gameInstance.update()
    Game._inputs.push(new Right())
    gameInstance.update()
    Game._inputs.push(new Place())
    gameInstance.update()
    Game._inputs.push(new Left())
    gameInstance.update()
    Game._inputs.push(new Down())
    gameInstance.update()
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should get bomb CLOSE', ()=>{
    const expectedMap: Tile[][] = convertToGameMap([
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 4, 2, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 0, 0, 14, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);
    gameInstance.update()
    resetDelay()
    gameInstance.update()
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should get BOMB_REALLY_CLOSE', ()=>{
    const expectedMap: Tile[][] = convertToGameMap([
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 5, 2, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 0, 14,0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);
    gameInstance.update()
    resetDelay()
    gameInstance.update()
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should get bomb explosion', ()=>{
    const expectedMap: Tile[][] = convertToGameMap([
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 7, 7, 7, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 14,0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);
    gameInstance.update()
    resetDelay()
    gameInstance.update()
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should clear after bomb explosion', ()=>{
    const expectedMap: Tile[][] = convertToGameMap([
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 2, 2, 2, 2, 1],
      [1, 0, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 9, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);
    gameInstance.update()
    resetDelay()
    gameInstance.update()
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should get current player position', ()=>{
    const expectedPlayer = {x: 1, y: 2}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)
  })
  it('should get player dead after setting another bomb', ()=>{
    const expectedMap: Tile[][] = convertToGameMap([
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 2, 2, 2, 1],
      [1, 0, 1, 0, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 0, 0,12, 1],
      [1, 2, 1, 2, 1, 0, 1, 0, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);
    gameInstance.update()
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
    resetDelay() // 5 - BOMB_REALLY_CLOSE
    const expectedPlayer = {x: 2, y: 1}
    assert.deepStrictEqual(getPlayer(), expectedPlayer)

    gameInstance.update()
    resetDelay() // 1, 0, 7, 7, 7 - FIRE
    
    gameInstance.update()
    resetDelay() // 1, 0, 0, 0, 0 - AIR
    assert.deepStrictEqual(getMap(), expectedMap)
  })
  it('should be game over', ()=>{
    assert.strictEqual(isGameOver(), true)
  })
})