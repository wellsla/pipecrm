<script setup lang="ts">
interface PipeAuthFormProps {
  title: string;
  subtitle?: string;
  heroTitle?: string;
  heroDescription?: string;
  showHero?: boolean;
}

withDefaults(defineProps<PipeAuthFormProps>(), {
  subtitle: '',
  heroTitle: 'Gerencie seu pipeline com eficiência',
  heroDescription: 'CRM moderno para equipes que querem vender mais e melhor',
  showHero: true,
});
</script>

<template>
  <div :class="['flex h-full', showHero ? '' : 'justify-center']">
    <div
      v-if="showHero"
      class="relative hidden flex-1 items-center justify-center overflow-hidden lg:flex"
    >
      <div class="bg-hero-gradient absolute inset-0"></div>

      <div class="absolute inset-0 opacity-30"></div>

      <div class="hero-content relative z-10 max-w-xl px-10 lg:px-20">
        <div class="mb-12 flex items-center gap-5">
          <div
            class="flex h-16 w-16 items-center justify-center rounded-2xl backdrop-blur-sm shadow-lg ring-1"
          >
            <i class="pi pi-database text-3xl"></i>
          </div>
          <h1 class="text-4xl font-semibold tracking-tight drop-shadow-sm">
            PipeCRM
          </h1>
        </div>

        <h2
          class="mb-6 text-4xl font-semibold leading-tight tracking-tight drop-shadow-sm"
        >
          {{ heroTitle }}
        </h2>
        <p class="text-lg leading-relaxed drop-shadow-sm max-w-md">
          {{ heroDescription }}
        </p>

        <div class="mt-14 space-y-5">
          <div
            class="flex items-center gap-4 transition-transform hover:translate-x-1"
          >
            <i class="pi pi-check-circle text-2xl drop-shadow-sm"></i>
            <span class="text-base font-medium drop-shadow-sm"
              >Pipeline visual e intuitivo</span
            >
          </div>
          <div
            class="flex items-center gap-4 transition-transform hover:translate-x-1"
          >
            <i class="pi pi-check-circle text-2xl drop-shadow-sm"></i>
            <span class="text-base font-medium drop-shadow-sm"
              >Relatórios em tempo real</span
            >
          </div>
          <div
            class="flex items-center gap-4 transition-transform hover:translate-x-1"
          >
            <i class="pi pi-check-circle text-2xl drop-shadow-sm"></i>
            <span class="text-base font-medium drop-shadow-sm"
              >Integração com Google Workspace</span
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-14 lg:max-w-2xl lg:px-20 lg:py-20"
    >
      <div class="w-full max-w-[480px]">
        <div
          class="form-card rounded-3xl border p-10 sm:p-12 shadow-lg transition-all duration-300"
        >
          <div class="mb-10">
            <div class="mb-9 flex items-center justify-center gap-4 lg:hidden">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-xl ring-1"
              >
                <i class="pi pi-database text-2xl"></i>
              </div>
              <h1 class="text-2xl font-semibold tracking-tight">PipeCRM</h1>
            </div>

            <h2
              class="mb-5 text-center text-3xl font-semibold leading-tight tracking-tight lg:text-left"
            >
              {{ title }}
            </h2>

            <p
              v-if="subtitle"
              class="text-center text-base leading-relaxed lg:text-left"
            >
              {{ subtitle }}
            </p>
          </div>

          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 30% 50%,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%
  );
  animation: gradientShift 8s ease-in-out infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(20px, -20px) scale(1.1);
  }
}

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-card {
  animation: fadeInScale 0.6s ease-out 0.2s both;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.dark .hero-section {
  opacity: 0.95;
}
</style>
