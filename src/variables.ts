const ASCII_A = 97
const NB_LETTRES = 26

// Génération automatique des noms de variables (ex: x, y, z)
export const noms_variables = (nb_inconnues: number) =>
  Array.from({ length: nb_inconnues }, (_, i) => ({
    letter: String.fromCharCode(ASCII_A + (i % NB_LETTRES)),
    index: Math.floor(i / NB_LETTRES),
  }))
