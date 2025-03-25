<template>
  <form class="container" @submit.prevent="resoudre">
    <h2>Nombre d'inconnues :</h2>
    <input v-model.number="nb_inconnues" type="number" min="2" @change="initialise_matrice_vide" />

    <h2>Remplissez les coefficients :</h2>

    <table v-if="matrice.length">
      <tr>
        <th v-for="(varName, index) in variableNames" :key="index">{{ varName }}</th>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const nb_inconnues = ref(3)
const matrice = ref([])

// Génération automatique des noms de variables (ex: x, y, z)
const variableNames = computed(
  () => Array.from({ length: nb_inconnues.value }, (_, i) => String.fromCharCode(120 + i)), // 120 = 'x'
)

const initialise_matrice_vide = () => {
  matrice.value = Array(nb_inconnues.value)
    .fill(null)
    .map(() => Array(nb_inconnues.value + 1).fill(0))
}

function resoudre() {}

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
