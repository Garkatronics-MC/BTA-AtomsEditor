<script lang="ts">
  import { formData } from '../../stores';
  import Section from './Section.svelte';
  
  // svelte-ignore export_let_unused
  export let errors: Record<string, string>;
</script>

<Section title="Physics" subtitle="Physical properties">
  <div class="mb-4">
    <label class="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
      <input
        type="checkbox"
        bind:checked={$formData.physics.is_collidable}
        class="cursor-pointer accent-primary"
      />
      Collidable
    </label>
  </div>
</Section>
