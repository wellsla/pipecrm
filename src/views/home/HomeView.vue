<script setup lang="ts">
// HomeView - Dashboard principal
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <div class="rounded-xl p-6 sm:p-8 shadow-sm mb-8 border">
      <h2 class="mb-3 text-2xl font-bold tracking-tight">
        Bem-vindo ao PipeCRM! 👋
      </h2>
      <p class="text-base leading-relaxed">
        Seu hub central para gerenciar relacionamentos com clientes de forma
        eficiente.
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        class="border-2 group rounded-xl p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
      >
        <div class="mb-5 flex items-center gap-4">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-110"
          >
            <i class="pi pi-users text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold tracking-tight">Clientes</h3>
        </div>
        <p class="text-sm leading-relaxed">
          Gerencie seus clientes e leads de forma organizada.
        </p>
      </div>

      <div
        class="border-2 group rounded-xl p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
      >
        <div class="mb-5 flex items-center gap-4">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-110"
          >
            <i class="pi pi-chart-line text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold tracking-tight">Pipeline</h3>
        </div>
        <p class="text-sm leading-relaxed">
          Visualize e gerencie seu funil de vendas.
        </p>
      </div>

      <div
        class="border-2 group rounded-xl p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
      >
        <div class="mb-5 flex items-center gap-4">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-110"
          >
            <i class="pi pi-calendar text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold tracking-tight">Atividades</h3>
        </div>
        <p class="text-sm leading-relaxed">
          Acompanhe tarefas e compromissos importantes.
        </p>
      </div>
    </div>
  </div>
</template>
