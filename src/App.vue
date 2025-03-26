<template>
  <div class="container">
    <form @submit.prevent="resoudre">
      <h1>Solveur de systèmes linéaires</h1>

      <h2>Nombre d'inconnues</h2>
      <input v-model.number="nb_inconnues" type="number" min="2" @input="initialise_matrice_vide" />

      <h2>Équations</h2>

      <ul class="matrice" v-if="matrice.length">
        <li v-for="(ligne, ligne_i) in matrice" :key="ligne_i">
          <div>
            <span
              v-for="(_, col_i) in ligne"
              :key="`${ligne_i}-${col_i}`"
              :data-disabled="col_i < ligne.length - 1 && matrice[ligne_i][col_i] == 0"
            >
              <span v-if="col_i == ligne.length - 1"> = </span>
              <span v-else-if="col_i > 0">+</span>
              <input v-model.number="matrice[ligne_i][col_i]" />
              <VariableName
                v-if="col_i < ligne.length - 1 && noms_variables[col_i]"
                :variable-name="noms_variables[col_i]"
              />
            </span>
          </div>
        </li>
      </ul>

      <button type="submit">Chercher les solutions</button>
    </form>

    <p class="no-solutions" v-if="solution_matrice == null">Pas de solution</p>
    <ul v-else-if="solution_matrice.length" class="solutions">
      <h2>Solutions</h2>
      <li v-for="(solution, index) in solution_matrice" :key="index">
        <VariableName :variable-name="noms_variables[index]" /> = {{ solution }}
      </li>

      <h3>Matrice triangle intermédiare</h3>
      <ul class="matrice" v-if="matrice_triangle.length">
        <li v-for="(ligne, ligne_i) in matrice_triangle" :key="ligne_i">
          <div>
            <span
              v-for="(_, col_i) in ligne"
              :key="`${ligne_i}-${col_i}`"
              :data-disabled="col_i < ligne.length - 1 && matrice_triangle[ligne_i][col_i] == 0"
            >
              <span v-if="col_i == ligne.length - 1"> = </span>
              <span v-else-if="col_i > 0">+</span>
              <span>{{ matrice_triangle[ligne_i][col_i] }}</span>
              <VariableName
                v-if="col_i < ligne.length - 1 && noms_variables[col_i]"
                :variable-name="noms_variables[col_i]"
              />
            </span>
          </div>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script setup lang="ts">
import VariableName from '@/VariableName.vue'
import { computed, ref } from 'vue'
import { Systeme } from './core/gauss'

const nb_inconnues = ref(3)
const matrice = ref<number[][]>([
  [1, 1, 2, -1],
  [2, -1, 2, -4],
  [4, 1, 4, -2],
])
const matrice_triangle = ref<number[][]>([])
const solution_matrice = ref<number[] | null>([])

// Génération automatique des noms de variables (ex: x, y, z)
const ASCII_A = 97
const NB_LETTRES = 26
const noms_variables = computed(() =>
  Array.from({ length: nb_inconnues.value }, (_, i) => ({
    letter: String.fromCharCode(ASCII_A + (i % NB_LETTRES)),
    index: Math.floor(i / NB_LETTRES),
  })),
)

const initialise_matrice_vide = () => {
  matrice.value = Array(nb_inconnues.value)
    .fill(null)
    .map(() => Array(nb_inconnues.value + 1).fill(1))
}

function resoudre() {
  try {
    const systeme = new Systeme(matrice.value)
    matrice_triangle.value = systeme.matrice_triangle
    solution_matrice.value = systeme.solutions
  } catch {
    solution_matrice.value = null
  }
}
</script>

<style lang="scss">
body {
  background: #f5f5f5;
}

.container {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 4rem 0;
}

form {
  h2 {
    margin-top: 3rem;
  }
}

input {
  background: #fafafa;
  width: 4ch;
  padding: 4px;
  border-radius: 4px;
  border: none;
  font-size: 1.2rem;
}

button {
  margin-top: 2rem;
  background: #171717;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  border: none;
  color: white;
  cursor: pointer;
}

.matrice {
  font-size: 1.2rem;
  overflow: auto;

  input {
    padding: 2px 0px;
    width: 3ch;
    min-width: 0;
    text-align: right;
  }

  li {
    white-space: nowrap;

    & + li {
      margin-top: 1rem;
    }

    span[data-disabled='true'] {
      input,
      span {
        opacity: 0.4;
      }
    }
  }
}

ul {
  padding: 0;
}

li {
  list-style: none;

  & + li {
    margin-top: 0.5rem;
  }
}

.solutions,
.no-solutions {
  margin-top: 3rem;
  padding: 1rem;
  border-radius: 0.5rem;

  h2 {
    margin-top: 0;
  }

  h3 {
    margin-top: 2rem;
  }
}

.solutions {
  background: #10b981;
  color: #ecfdf5;
}

.no-solutions {
  background: #ef4444;
  color: #fef2f2;
}
</style>
