import { resoudre } from '@/core/gauss'
import { describe, expect, it } from 'vitest'

describe('resoudre', () => {
  it('Résout un système à 2 équations', () => {
    const resultat = resoudre([
      [2, 2, 4],
      [2, -2, 0],
    ])
    expect(resultat).toStrictEqual([1, 1])
  })

  it('Résout un système à 2 équations avec un coefficient nul', () => {
    const resultat = resoudre([
      [1, 0, 1],
      [1, -1, 0],
    ])
    expect(resultat).toStrictEqual([1, 1])
  })

  it("Indique quand un système n'a pas de solutions", () => {
    expect(() =>
      resoudre([
        [1, 1, 2],
        [1, 1, 1],
      ]),
    ).toThrow('Impossible de résoudre le système')
  })

  it('Résout un système à 3 équations', () => {
    const resultat = resoudre([
      [1, 1, 2, -1],
      [2, -1, 2, -4],
      [4, 1, 4, -2],
    ])
    expect(resultat).toStrictEqual([1, 2, -2])
  })
})
