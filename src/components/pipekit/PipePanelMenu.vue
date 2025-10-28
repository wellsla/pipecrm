<template>
  <PanelMenu v-bind="$attrs" :model="model" />
</template>

<script lang="ts" setup>
import PanelMenu from 'primevue/panelmenu'
import type { MenuItem } from 'primevue/menuitem'

defineProps<{
  model?: MenuItem[]
}>()
</script>

<style scoped>
/* PrimeVue PanelMenu with app color palette */
:deep(.p-panelmenu) {
  color: #3A4B59;
}

:deep(.p-panelmenu-header-link) {
  background: #FEFFF4;
  border-color: #B3B4BC;
  color: #3A4B59;
}

:deep(.p-panelmenu-header-link:hover) {
  background: rgba(184, 40, 75, 0.1);
  color: #B8284B;
}

:deep(.p-panelmenu-content) {
  background: #FEFFF4;
  border-color: #B3B4BC;
  color: #3A4B59;
}

:deep(.p-menuitem-link) {
  color: #3A4B59;
}

:deep(.p-menuitem-link:hover) {
  background: rgba(184, 40, 75, 0.05);
  color: #B8284B;
}

:deep(.p-menuitem-icon) {
  color: #3A4B59;
}

:deep(.p-menuitem-link:hover .p-menuitem-icon) {
  color: #B8284B;
}
</style>
