<template>
  <div class="flex flex-col gap-4">
    <!-- Header with Add Button -->
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Activity Timeline</h3>
      <PipeButton
        id="add-activity-btn"
        label="Add Activity"
        :icon="{ class: 'pi pi-plus' }"
        severity="primary"
        size="small"
        @click="showActivityDialog = true"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-8">
      <i class="pi pi-spinner pi-spin text-3xl text-blue-500"></i>
    </div>

    <!-- Error Message -->
    <PipeMessage v-else-if="error" severity="error" :text="error" />

    <!-- Empty State -->
    <div
      v-else-if="activities.length === 0"
      class="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-300 rounded-lg"
    >
      <i class="pi pi-history text-4xl text-gray-400 mb-2"></i>
      <p class="text-gray-500 text-sm">No activities yet</p>
      <p class="text-gray-400 text-xs">
        Add your first activity to start tracking
      </p>
    </div>

    <!-- Activities List -->
    <div v-else class="flex flex-col gap-3">
      <PipeActivityCard
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        :show-actions="true"
        @edit="handleEditActivity"
        @delete="handleDeleteActivity"
      />
    </div>

    <!-- Activity Form Dialog -->
    <PipeDialog
      :model-value="showActivityDialog"
      :header="editingActivity ? 'Edit Activity' : 'New Activity'"
      :modal="true"
      width="500px"
      @update:model-value="handleCloseDialog"
    >
      <PipeActivityForm
        :activity="editingActivity"
        :deal-id="dealId"
        :loading="submitting"
        @submit="handleSubmitActivity"
        @cancel="handleCloseDialog"
      />
    </PipeDialog>

    <!-- Delete Confirmation Dialog -->
    <PipeDialog
      :model-value="showDeleteDialog"
      header="Delete Activity"
      :modal="true"
      width="400px"
      @update:model-value="showDeleteDialog = false"
    >
      <p class="text-gray-700 mb-4">
        Are you sure you want to delete this activity? This action cannot be
        undone.
      </p>
      <div class="flex justify-end gap-3">
        <PipeButton
          id="cancel-delete-btn"
          label="Cancel"
          severity="secondary"
          variant="outlined"
          @click="showDeleteDialog = false"
        />
        <PipeButton
          id="confirm-delete-btn"
          label="Delete"
          severity="danger"
          :conditions="{ loading: submitting }"
          @click="confirmDelete"
        />
      </div>
    </PipeDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useActivities } from '@/composables/useActivities';
import type {
  DealActivity,
  DealActivityInsert,
  DealActivityUpdate,
} from '@/types/activities.types';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import PipeDialog from '@/components/ui/dialog/PipeDialog.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';
import PipeActivityCard from '@/components/ui/activity/PipeActivityCard.vue';
import PipeActivityForm from '@/components/ui/activity/PipeActivityForm.vue';

interface Props {
  dealId: string;
}

const props = defineProps<Props>();

const {
  activities,
  loading,
  error,
  fetchActivitiesByDeal,
  createActivity,
  updateActivity,
  deleteActivity,
} = useActivities();

const showActivityDialog = ref(false);
const showDeleteDialog = ref(false);
const editingActivity = ref<DealActivity | undefined>(undefined);
const activityToDelete = ref<string | null>(null);
const submitting = ref(false);

// Load activities on mount
onMounted(() => {
  fetchActivitiesByDeal(props.dealId);
});

const handleEditActivity = (activity: DealActivity) => {
  editingActivity.value = activity;
  showActivityDialog.value = true;
};

const handleDeleteActivity = (activityId: string) => {
  activityToDelete.value = activityId;
  showDeleteDialog.value = true;
};

const handleSubmitActivity = async (
  payload: DealActivityInsert | DealActivityUpdate
) => {
  submitting.value = true;

  try {
    if (editingActivity.value) {
      await updateActivity(
        editingActivity.value.id,
        payload as DealActivityUpdate
      );
    } else {
      await createActivity(payload as DealActivityInsert);
    }
    handleCloseDialog();
  } catch (e) {
    console.error('Error submitting activity:', e);
  } finally {
    submitting.value = false;
  }
};

const confirmDelete = async () => {
  if (!activityToDelete.value) return;

  submitting.value = true;

  try {
    await deleteActivity(activityToDelete.value);
    showDeleteDialog.value = false;
    activityToDelete.value = null;
  } catch (e) {
    console.error('Error deleting activity:', e);
  } finally {
    submitting.value = false;
  }
};

const handleCloseDialog = () => {
  showActivityDialog.value = false;
  editingActivity.value = undefined;
};
</script>
