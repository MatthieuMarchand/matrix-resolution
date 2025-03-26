<template>
  <span
    >{{ variableName.letter }}<sub>{{ variableName.index }}</sub></span
  >
</template>
<script setup lang="ts">
defineProps<{
  variableName: {
    letter: string
    index: number
  }
}>()
</script>
<style>
span {
  font-style: italic;
}

sub {
  font-size: 0.8rem;
}
</style>
