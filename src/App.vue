<template>
  <div class="container">
    <main>
      <form @submit.prevent="resoudre">
        <h1>Solveur de systèmes linéaires</h1>

        <h2>Nombre d'inconnues</h2>
        <input
          v-model.number="nb_inconnues"
          type="number"
          min="2"
          @input="initialise_matrice_vide"
        />

        <h2>Équations</h2>

        <MatriceLineaire v-model="matrice" editable />

        <button type="submit">Chercher les solutions</button>
      </form>

      <div class="no-solutions" v-if="solution_matrice == null">
        <h2>Pas de solutions</h2>
        Nous n'avons pas trouvé de solution unique pour ce système
      </div>
      <div v-else-if="solution_matrice.length" class="solutions">
        <h2>Solutions</h2>
        <ul>
          <li v-for="(solution, index) in solution_matrice" :key="index">
            <VariableName :variable-name="variables[index]" /> =
            {{ Math.round(solution * 100) / 100 }}
          </li>
        </ul>

        <h3>Matrice triangle intermédiare</h3>
        <MatriceLineaire v-model="matrice_triangle" />
      </div>
    </main>

    <footer>
      <p>
        Par <a href="https://matthieumarchand.fr">Matthieu Marchand</a> et
        <a href="https://arthaudproust.fr">Arthaud Proust</a>
      </p>
      <p>
        <a href="https://github.com/MatthieuMarchand/matrix-resolution">Code source</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { SystemeLineaire, SystemeNonResolvableError } from '@/core/systemeLineaire'
import MatriceLineaire from '@/MatriceLineaire.vue'
import VariableName from '@/VariableName.vue'
import { noms_variables } from '@/variables'
import { computed, ref } from 'vue'

const nb_inconnues = ref(3)
const matrice = ref<number[][]>([
  [1, 1, 2, -1],
  [2, -1, 2, -4],
  [4, 1, 4, -2],
])
const matrice_triangle = ref<number[][]>([])
const solution_matrice = ref<number[] | null>([])

const variables = computed(() => noms_variables(matrice.value.length))

const initialise_matrice_vide = () => {
  matrice.value = Array(nb_inconnues.value)
    .fill(null)
    .map(() => Array(nb_inconnues.value + 1).fill(1))
}

function resoudre() {
  try {
    const systeme = new SystemeLineaire(matrice.value)
    matrice_triangle.value = systeme.matrice_triangle
    solution_matrice.value = systeme.solutions
  } catch (e) {
    if (e instanceof SystemeNonResolvableError) {
      solution_matrice.value = null
    } else {
      throw e
    }
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  background: #f5f5f5;
}

main {
  min-height: 100vh;
  padding: 2rem 0;
  box-sizing: border-box;
}

.container {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 600px;
  margin: auto;
}

form {
  h2 {
    margin-top: 3rem;
  }
}

input {
  background: white;
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

footer {
  padding-top: 4rem;
  padding-bottom: 1rem;
}
</style>
