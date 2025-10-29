<template>
  <PanelMenu class="pipe-panelmenu" v-bind="$attrs" :model="model" />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import PanelMenu from 'primevue/panelmenu'
import './css/panelmenu.css'
import type { MenuItem } from 'primevue/menuitem'

export default defineComponent({
  name: 'PipePanelMenu',
  components: {
    PanelMenu
  },
  props: {
    model: {
      type: Array as PropType<MenuItem[]>,
      default: undefined
    }
  }
})
</script>
