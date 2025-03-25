function rendre_zero(m: Array<Array<number>>, colone: number, ligne: number) {
  const multiplicateur = m[ligne][colone] / m[0][colone]
  for (let i = colone; i < m[ligne - colone].length; i++) {
    m[ligne][i] = m[ligne][i] - multiplicateur * m[0][i]
  }
}

export const resoudre = (systeme: number[][]): number[] => {
  const systeme_copie = systeme.map((ligne) => ligne.slice())

  for (let i = 1; i < systeme_copie.length; i++) {
    for (let j = 0; j < i; j++) {
      rendre_zero(systeme_copie, j, i)
    }
  }

  const solutions: number[] = Array(systeme_copie.length)

  for (let ligne_i = systeme_copie.length - 1; ligne_i >= 0; ligne_i--) {
    const ligne = systeme_copie[ligne_i]

    solutions[ligne_i] = ligne[ligne.length - 1]

    for (let i = ligne_i + 1; i < ligne.length - 1; i++) {
      solutions[ligne_i] -= ligne[i] * solutions[i]
    }

    if (ligne[ligne_i] == 0) {
      throw new Error('Impossible de résoudre le système')
    }

    solutions[ligne_i] /= ligne[ligne_i]
  }

  return solutions
}
