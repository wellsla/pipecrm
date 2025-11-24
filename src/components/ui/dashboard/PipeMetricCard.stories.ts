import type { Meta, StoryObj } from '@storybook/vue3'
import PipeMetricCard from './PipeMetricCard.vue'

const meta: Meta<typeof PipeMetricCard> = {
  title: 'Components/Dashboard/PipeMetricCard',
  component: PipeMetricCard,
  tags: ['autodocs'],
  argTypes: {
    iconColor: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warn', 'danger', 'secondary']
    }
  }
}

export default meta
type Story = StoryObj<typeof PipeMetricCard>

export const Primary: Story = {
  args: {
    title: 'Total de Negócios',
    value: 156,
    icon: 'pi pi-briefcase',
    iconColor: 'primary',
    subtitle: 'Todos os negócios ativos'
  }
}

export const WithTrendUp: Story = {
  args: {
    title: 'Receita Mensal',
    value: 'R$ 245.000',
    icon: 'pi pi-dollar',
    iconColor: 'success',
    subtitle: 'Comparado ao mês anterior',
    trend: {
      value: 12.5,
      direction: 'up',
      label: 'vs mês anterior'
    }
  }
}

export const WithTrendDown: Story = {
  args: {
    title: 'Taxa de Conversão',
    value: '34%',
    icon: 'pi pi-chart-line',
    iconColor: 'warn',
    subtitle: 'Últimos 30 dias',
    trend: {
      value: 5.2,
      direction: 'down',
      label: 'vs período anterior'
    }
  }
}

export const Success: Story = {
  args: {
    title: 'Negócios Ganhos',
    value: 89,
    icon: 'pi pi-check-circle',
    iconColor: 'success',
    subtitle: '57% taxa de conversão'
  }
}

export const Info: Story = {
  args: {
    title: 'Contatos Ativos',
    value: 1234,
    icon: 'pi pi-users',
    iconColor: 'info',
    subtitle: '234 adicionados este mês'
  }
}

export const Danger: Story = {
  args: {
    title: 'Negócios Perdidos',
    value: 23,
    icon: 'pi pi-times-circle',
    iconColor: 'danger',
    subtitle: '15% do total'
  }
}

export const LargeNumber: Story = {
  args: {
    title: 'Valor Total Pipeline',
    value: 1234567,
    icon: 'pi pi-dollar',
    iconColor: 'primary',
    subtitle: 'Soma de todos os negócios'
  }
}
