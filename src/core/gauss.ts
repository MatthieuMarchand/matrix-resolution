// function rendre_zero(m: Array<Array<number>>, colone: number, ligne: number) {
//   const multiplicateur = m[ligne][colone] / m[0][colone]
//   for (let i = colone; i < m[ligne - colone].length; i++) {
//     m[ligne][i] = m[ligne][i] - multiplicateur * m[0][i]
//   }
// }

const triangle_matrix = (systeme: number[][]): number[][] => {
  const sortie = systeme.map((ligne) => ligne.slice())

  // Création de la matrice triangulaire en appliquant le pivot de gauss
  for (let ligne_soustraite_i = 0; ligne_soustraite_i < sortie.length; ligne_soustraite_i++) {
    for (let ligne_i = ligne_soustraite_i + 1; ligne_i < sortie.length; ligne_i++) {
      const coef =
        1 / (sortie[ligne_soustraite_i][ligne_soustraite_i] / sortie[ligne_i][ligne_soustraite_i])
      for (let i = 0; i < sortie[ligne_i].length; i++) {
        sortie[ligne_i][i] -= sortie[ligne_soustraite_i][i] * coef
      }
    }
  }

  return sortie
}

export const resoudre = (systeme: number[][]): number[] => {
  const systeme_triangle = triangle_matrix(systeme)
  // const systeme_triangle = systeme.map((ligne) => ligne.slice())

  // for (let i = 1; i < systeme_triangle.length; i++) {
  //   for (let j = 0; j < i; j++) {
  //     rendre_zero(systeme_triangle, j, i)
  //   }
  // }

  const solutions: number[] = Array(systeme_triangle.length)

  for (let ligne_i = systeme_triangle.length - 1; ligne_i >= 0; ligne_i--) {
    const ligne = systeme_triangle[ligne_i]

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
