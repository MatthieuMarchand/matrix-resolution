import { InvalidSystemError, Systeme, UnresolvableSystemError } from '@/core/gauss'
import { describe, expect, it } from 'vitest'

describe('Système', () => {
  it('Erreur si le système est invalide', () => {
    expect(
      () =>
        new Systeme([
          [1, 1],
          [1, 1, 1],
        ]).solutions,
    ).toThrow(InvalidSystemError)
  })

  describe('solutions', () => {
    it('Résout un système à 2 équations', () => {
      const resultat = new Systeme([
        [2, 2, 4],
        [2, -2, 0],
      ]).solutions
      expect(resultat).toStrictEqual([1, 1])
    })

    it('Résout un système à 2 équations avec un coefficient nul', () => {
      const resultat = new Systeme([
        [1, 0, 1],
        [1, -1, 0],
      ]).solutions
      expect(resultat).toStrictEqual([1, 1])
    })

    it("Erreur quand un système n'a pas de solutions", () => {
      expect(
        () =>
          new Systeme([
            [1, 1, 2],
            [1, 1, 1],
          ]).solutions,
      ).toThrow(UnresolvableSystemError)
    })

    it('Résout un système à 3 équations', () => {
      const resultat = new Systeme([
        [1, 1, 2, -1],
        [2, -1, 2, -4],
        [4, 1, 4, -2],
      ]).solutions
      expect(resultat).toStrictEqual([1, 2, -2])
    })
  })
})
