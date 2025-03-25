// let matrice = [
//   [2, 3, -2, 5],
//   [1, 0, -3, 2],
//   [2, 4, 2, 6],
// ];
let matrice = [
  [2, 3, -2, 4, 5],
  [1, 0, -3, 6, 2],
  [2, 4, 2, 7, 6],
  [9, -4, -2, 1, 12],
];

function afficher_matrice(m: Array<Array<number>>) {
  console.log("Matrix :");
  for (let i = 0; i < m.length; i++) {
    let row = m[i].map((val) => `[${val}]`).join("");
    console.log(row);
  }
}

function rendre_zero(m: Array<Array<number>>, colone: number, ligne: number) {
  const multiplicateur = m[ligne][colone] / m[0][colone];
  for (let i = colone; i < m[ligne - colone].length; i++) {
    m[ligne][i] = m[ligne][i] - multiplicateur * m[0][i];
  }
}

afficher_matrice(matrice);
for (let i = 1; i < matrice.length; i++) {
  for (let j = 0; j < i; j++) {
    rendre_zero(matrice, j, i);
  }
}
afficher_matrice(matrice);
