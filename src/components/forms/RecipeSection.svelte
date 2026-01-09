<script lang="ts">
  import { formData } from '../../stores';
  import Section from './Section.svelte';
  
  export let errors: Record<string, string>;
</script>

<Section title="Recipe" subtitle="Crafting recipes">
  <div class="mb-4">
    <label class="flex items-center gap-2 text-sm font-medium text-gray-900 cursor-pointer">
      <input type="checkbox" bind:checked={$formData.recipe.enable_workbench} class="cursor-pointer" />
      Enable Workbench Crafting
    </label>
  </div>
  <div class="mb-4">
    <label class="flex items-center gap-2 text-sm font-medium text-gray-900 cursor-pointer">
      <input type="checkbox" bind:checked={$formData.recipe.enable_furnace} class="cursor-pointer" />
      Enable Furnace Crafting
    </label>
  </div>
</Section>