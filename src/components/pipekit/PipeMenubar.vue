<template>
  <Menubar v-bind="$attrs" :model="model">
    <template v-for="(_, slot) in $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </Menubar>
</template>

<script lang="ts" setup>
import Menubar from 'primevue/menubar'
import type { MenuItem } from 'primevue/menuitem'

defineProps<{
  model?: MenuItem[]
}>()
</script>

<style scoped>
/* PrimeVue Menubar with app color palette */
:deep(.p-menubar) {
  background: #FEFFF4;
  border-color: #B3B4BC;
  color: #3A4B59;
}

:deep(.p-menubar-item-link) {
  color: #3A4B59;
}

:deep(.p-menubar-item-link:hover) {
  background: rgba(184, 40, 75, 0.1);
  color: #B8284B;
}

:deep(.p-menubar-item-link:focus) {
  box-shadow: 0 0 0 0.2rem rgba(184, 40, 75, 0.2);
}
</style>
