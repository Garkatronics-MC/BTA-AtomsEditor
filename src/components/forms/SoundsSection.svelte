<script lang="ts">
  import { BlockSound } from "../../business/types";
  import { formData } from "../../stores";
  import Section from "./Section.svelte";

  // svelte-ignore export_let_unused
    export let errors: Record<string, string>;
</script>

<Section title="Sounds" subtitle="Sound effects">
  <div class="mb-4">
    <label for="sound" class="block text-sm font-medium text-foreground mb-2">
      Sound
    </label>
    <select
      id="data-dropcause"
      bind:value={$formData.sounds.sound}
      class="w-full px-3 py-2
             bg-background text-foreground
             border border-border rounded-md
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    >
      {#each Object.values(BlockSound) as sound}
        <option value={sound}>{sound}</option>
      {/each}
    </select>
  </div>
</Section>
