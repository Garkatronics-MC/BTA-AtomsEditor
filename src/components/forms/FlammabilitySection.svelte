<script lang="ts">
  import { formData } from '../../stores';
  import Section from './Section.svelte';
  
  export let errors: Record<string, string>;
</script>

<Section title="Flammability" subtitle="Fire properties">
  <div class="mb-4">
    <label for="flam-catch" class="block text-sm font-medium text-gray-900 mb-2">Chance to Catch Fire</label>
    <input 
      id="flam-catch" 
      type="number" 
      bind:value={$formData.flammability.chance_to_catch_fire}
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
    />
  </div>
  <div class="mb-4">
    <label for="flam-degrade" class="block text-sm font-medium text-gray-900 mb-2">Chance to Degrade</label>
    <input 
      id="flam-degrade" 
      type="number" 
      bind:value={$formData.flammability.change_to_degrade}
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
    />
  </div>
</Section>
