<template>
  <Menubar class="pipe-menubar" v-bind="$attrs" :model="model">
    <template v-for="(_, slot) in $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </Menubar>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Menubar from 'primevue/menubar'
import './css/menubar.css'
import type { MenuItem } from 'primevue/menuitem'

export default defineComponent({
  name: 'PipeMenubar',
  components: {
    Menubar,
  },
  props: {
    model: {
      type: Array as PropType<MenuItem[]>,
      default: undefined,
    },
  },
})
</script>
