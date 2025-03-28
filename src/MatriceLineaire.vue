<template>
  <ul>
    <li v-for="(ligne, ligne_i) in matrice" :key="ligne_i">
      <template v-for="(_, col_i) in ligne" :key="`${ligne_i}-${col_i}`">
        <!-- Coefficient -->
        <span v-if="col_i < ligne.length - 1" :data-disabled="matrice[ligne_i][col_i] == 0">
          <input
            v-if="editable"
            :value="strValue(ligne_i, col_i)"
            @input="
              (event) =>
                event.target &&
                'value' in event.target &&
                typeof event.target.value == 'string' &&
                handleStrValueChange(event.target.value, ligne_i, col_i)
            "
          />

          <template v-else>
            <span v-if="col_i > 0">{{ matrice[ligne_i][col_i] > 0 ? '+' : '-' }}</span>

            <span>{{ Math.abs(matrice[ligne_i][col_i]) }}</span>
          </template>

          <VariableName v-if="variables[col_i]" :variable-name="variables[col_i]" />
        </span>

        <!-- Résultat -->
        <template v-else>
          <span> = </span>

          <input v-if="editable" v-model.number="matrice[ligne_i][col_i]" />
          <span v-else>{{ matrice[ligne_i][col_i] }}</span>
        </template>
      </template>
    </li>
  </ul>
</template>
<script setup lang="ts">
import VariableName from '@/VariableName.vue'
import { noms_variables } from '@/variables'
import { computed } from 'vue'

defineProps<{
  editable?: boolean
}>()
const matrice = defineModel<number[][]>({
  required: true,
})

const strValue = (ligne_i: number, col_i: number) => {
  const number = matrice.value[ligne_i][col_i]

  if (col_i == 0 || number < 0) return number.toString()

  return `+${number}`
}

const handleStrValueChange = (strValue: string, ligne_i: number, col_i: number) => {
  const number = Number.parseFloat(strValue)
  matrice.value[ligne_i][col_i] = Number.isNaN(number) ? 0 : number
}

const variables = computed(() => noms_variables(matrice.value.length))
</script>

<style lang="scss">
input {
  background: #fafafa;
  width: 4ch;
  padding: 4px;
  border-radius: 4px;
  border: none;
  font-size: 1.2rem;
}

ul {
  padding: 0;
  font-size: 1.2rem;
  overflow: auto;

  input {
    padding: 2px 0px;
    width: 3ch;
    min-width: 0;
    text-align: right;
  }

  li {
    list-style: none;
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
</style>
