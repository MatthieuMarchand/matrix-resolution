<template>
  <form class="container" @submit.prevent="resoudre">
    <h2>Nombre d'inconnues :</h2>
    <input v-model.number="nb_inconnues" type="number" min="2" @input="initialise_matrice_vide" />

    <h2>Remplissez les coefficients :</h2>

    <table v-if="matrice.length">
      <tr>
        <th v-for="(nom_var, index) in noms_variables" :key="index">{{ nom_var }}</th>
        <th>Résultat</th>
      </tr>

      <tr v-for="(row, rowIndex) in matrice" :key="rowIndex">
        <td v-for="(cell, colIndex) in row" :key="colIndex">
          <input v-model.number="matrice[rowIndex][colIndex]" type="number" />
        </td>
      </tr>
    </table>

    <button type="submit">Résoudre la matrice</button>
  </form>

  <p v-if="solution_matrice == null">Pas de solution</p>
  <ul v-else>
    <li v-for="(solution, index) in solution_matrice" :key="index">
      {{ noms_variables[index] }} = {{ solution }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Systeme } from './core/gauss'

const nb_inconnues = ref(3)
const matrice = ref<number[][]>([])
const solution_matrice = ref<number[] | null>([])

// Génération automatique des noms de variables (ex: x, y, z)
const noms_variables = computed(() =>
  Array.from({ length: nb_inconnues.value }, (_, i) => String.fromCharCode(97 + i)),
)

const initialise_matrice_vide = () => {
  matrice.value = Array(nb_inconnues.value)
    .fill(null)
    .map(() => Array(nb_inconnues.value + 1).fill(0))
}

function resoudre() {
  try {
    solution_matrice.value = new Systeme(matrice.value).solutions
  } catch (erreur) {
    solution_matrice.value = null
  }
}

onMounted(() => {
  initialise_matrice_vide()
})
</script>

<style>
.container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

input {
  width: 50px;
  padding: 5px;
  text-align: center;
}

table {
  margin: 20px auto;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}
</style>
