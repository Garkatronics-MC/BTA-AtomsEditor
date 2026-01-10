<script lang="ts">
  import { formData } from '../../stores';
  import Section from './Section.svelte';
  
  export let errors: Record<string, string>;
</script>

<Section title="Render" subtitle="Rendering properties">
  <div class="mb-4">
    <label class="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
      <input
        type="checkbox"
        bind:checked={$formData.render.is_cube_shaped}
        class="cursor-pointer accent-primary"
      />
      Cube Shaped
    </label>
  </div>

  <div class="mb-4">
    <label class="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
      <input
        type="checkbox"
        bind:checked={$formData.render.is_solid_render}
        class="cursor-pointer accent-primary"
      />
      Solid Render
    </label>
  </div>
</Section>
