import {
  SystemeInvalideError,
  SystemeLineaire,
  SystemeNonResolvableError,
} from '@/core/systemeLineaire'
import { describe, expect, it } from 'vitest'

describe('SystemeLineaire', () => {
  it('Erreur si le système est invalide', () => {
    expect(
      () =>
        new SystemeLineaire([
          [1, 1],
          [1, 1, 1],
        ]).solutions,
    ).toThrow(SystemeInvalideError)
  })

  describe('solutions', () => {
    it('Résout un système à 2 équations', () => {
      const resultat = new SystemeLineaire([
        [2, 2, 4],
        [2, -2, 0],
      ]).solutions
      expect(resultat).toStrictEqual([1, 1])
    })

    it('Résout un système à 2 équations avec un coefficient nul', () => {
      const resultat = new SystemeLineaire([
        [1, 0, 1],
        [1, -1, 0],
      ]).solutions
      expect(resultat).toStrictEqual([1, 1])
    })

    it("Erreur quand un système n'a pas de solutions", () => {
      expect(
        () =>
          new SystemeLineaire([
            [1, 1, 2],
            [1, 1, 1],
          ]).solutions,
      ).toThrow(SystemeNonResolvableError)
    })

    it('Résout un système à 3 équations', () => {
      const resultat = new SystemeLineaire([
        [1, 1, 2, -1],
        [2, -1, 2, -4],
        [4, 1, 4, -2],
      ]).solutions
      expect(resultat).toStrictEqual([1, 2, -2])
    })
  })
})
