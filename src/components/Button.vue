<script setup lang="ts">
defineEmits(["click"]);

defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button
    class="text-white px-4 py-2 rounded-md bg-black disabled:bg-gray-500"
    @click="$emit('click')"

  >
    {{ text }}
  </button>
</template>
