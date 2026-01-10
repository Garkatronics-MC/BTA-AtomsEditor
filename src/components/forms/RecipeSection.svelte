<script lang="ts">
  import { formData } from "../../stores";
  import Workbench from "../Workbench.svelte";
  import Section from "./Section.svelte";

  export let errors: Record<string, string>;
</script>

<Section title="Recipe" subtitle="Crafting recipes">
  <div class="mb-4">
    <label class="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
      <input
        type="checkbox"
        bind:checked={$formData.recipe.enable_workbench}
        class="cursor-pointer accent-primary"
      />
      Enable Workbench Crafting
    </label>
  </div>

  <div class="mb-4">
    <label class="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
      <input
        type="checkbox"
        bind:checked={$formData.recipe.enable_furnace}
        class="cursor-pointer accent-primary"
      />
      Enable Furnace Crafting
    </label>
  </div>

  {#if $formData.recipe.enable_workbench}
    <Workbench />
  {/if}
</Section>
