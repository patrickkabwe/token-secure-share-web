<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
});
const modelValue = defineModel<string>({
  default: "",
  required: true,
});
</script>

<template>
  <textarea
    :id="id"
    cols="30"
    rows="10"
    name="secret"
    class="border w-full rounded-md resize-none my-4 p-4 shadow"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as any).value)"
  />
</template>
