export class SystemeInvalideError extends Error {}
export class SystemeNonResolvableError extends Error {}

export class SystemeLineaire {
  /**
   * Solveur de système linéaires. Le système doit comporter autant d'équations que de variables.
   *
   * @param matrice Liste d'équations du système sous la forme coefficients puis résultat.
   * Ex: 2x+3y+4z = 5; 3x+4y+5z = 6 => [[2, 3, 4, 5], [3, 4, 5, 6]]
   */
  constructor(private matrice: number[][]) {
    if (matrice.some((ligne) => ligne.length !== matrice.length + 1)) {
      throw new SystemeInvalideError(
        'Il doit y avoir autant de lignes que de variables. Chaque ligne doit comporter les coefficients des variables puis le résultat',
      )
    }
  }

  get matrice_triangle() {
    // Copie de la matrice pour ne pas modifier l'original
    const matrice = this.matrice.map((ligne) => ligne.slice())

    // Fonction pour mettre à zéro le coefficient en faisant une combinaison linéaire avec la ligne d'au dessus
    const mettre_a_zero = (systeme: Array<Array<number>>, ligne: number, colonne: number) => {
      const coef = 1 / (systeme[colonne][colonne] / systeme[ligne][colonne])

      for (let i = 0; i < systeme[ligne].length; i++) {
        systeme[ligne][i] -= systeme[colonne][i] * coef
      }

      return systeme
    }

    // Création de la matrice triangulaire supérieure
    // en mettant à 0 les coefficiants du triangle bas gauche
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

    // Utiliser la matrice triangle pour résoudre la dernière équation du système, qui n'a qu'une inconnue.
    // Passer à l'équation au-dessus : injecter l'inconnue précedemment trouvée pour n'avoir qu'une inconnue dans l'équation et trouver sa valeur.
    // On applique cette méthode jusqu'en haut du système pour avoir toutes les inconnues.
    for (let ligne_i = mat_triangle.length - 1; ligne_i >= 0; ligne_i--) {
      const ligne = mat_triangle[ligne_i]

      solutions[ligne_i] = ligne[ligne.length - 1]

      for (let i = ligne_i + 1; i < ligne.length - 1; i++) {
        solutions[ligne_i] -= ligne[i] * solutions[i]
      }

      if (ligne[ligne_i] == 0) {
        throw new SystemeNonResolvableError()
      }

      solutions[ligne_i] /= ligne[ligne_i]
    }

    return solutions
  }
}
