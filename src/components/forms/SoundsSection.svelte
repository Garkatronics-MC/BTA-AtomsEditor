<script lang="ts">
  import { BlockSound } from "../../business/types";
  import { formData } from "../../stores";
  import Section from "./Section.svelte";

  export let errors: Record<string, string>;
</script>

<Section title="Sounds" subtitle="Sound effects">
  <div class="mb-4">
    <label for="sound" class="block text-sm font-medium text-gray-900 mb-2"
      >Sound</label
    >
    <select
      id="data-dropcause"
      bind:value={$formData.sounds.sound}
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
    >
      {#each Object.values(BlockSound) as sound}
        <option value={sound}>{sound}</option>
      {/each}
    </select>
  </div>
</Section>
