export class InvalidSystemError extends Error {}
export class UnresolvableSystemError extends Error {}

export class Systeme {
  constructor(private matrice: number[][]) {
    if (matrice.some((ligne) => ligne.length !== matrice.length + 1)) {
      throw new InvalidSystemError()
    }
  }

  get matrice_triangle() {
    const matrice = this.matrice.map((ligne) => ligne.slice())

    // Mettre à zéro le coefficient en faisant une combinaison linéaire avec la ligne d'au dessus
    const mettre_a_zero = (systeme: Array<Array<number>>, ligne: number, colonne: number) => {
      const coef = 1 / (systeme[colonne][colonne] / systeme[ligne][colonne])

      for (let i = 0; i < systeme[ligne].length; i++) {
        systeme[ligne][i] -= systeme[colonne][i] * coef
      }

      return systeme
    }

    // Création de la matrice triangulaire en appliquant le pivot de gauss
    for (let ligne = 1; ligne < matrice.length; ligne++) {
      for (let colonne = 0; colonne < ligne; colonne++) {
        mettre_a_zero(matrice, ligne, colonne)
      }
    }

    return matrice
  }

  get solutions() {
    const mat_triangle = this.matrice_triangle

    const solutions: number[] = Array(mat_triangle.length)

    for (let ligne_i = mat_triangle.length - 1; ligne_i >= 0; ligne_i--) {
      const ligne = mat_triangle[ligne_i]

      solutions[ligne_i] = ligne[ligne.length - 1]

      for (let i = ligne_i + 1; i < ligne.length - 1; i++) {
        solutions[ligne_i] -= ligne[i] * solutions[i]
      }

      if (ligne[ligne_i] == 0) {
        throw new UnresolvableSystemError()
      }

      solutions[ligne_i] /= ligne[ligne_i]
    }

    return solutions
  }
}
