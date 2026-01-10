<script lang="ts">
  import { DropSchema } from "../../business/CompiledBlock";
  import { DropCause } from "../../business/types";
  import { formData } from "../../stores";
  import Section from "./Section.svelte";

  // svelte-ignore export_let_unused
  export let errors: Record<string, string>;

  if (!$formData.events.on_break) {
    $formData.events.on_break = {
      drop_itself: true,
      drops: [],
    };
  } else if (!$formData.events.on_break.drops) {
    $formData.events.on_break.drops = [];
  }

  function addDrop() {
    $formData.events.on_break.drops = [
      ...$formData.events.on_break.drops,
      DropSchema.parse({}),
    ];
  }

  function removeDrop(index: number) {
    $formData.events.on_break.drops = $formData.events.on_break.drops.filter(
      (_: any, i: number) => i !== index
    );
  }
</script>

<Section title="Events" subtitle="Block events">
  <div class="mb-4">
    <label class="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
      <input
        type="checkbox"
        bind:checked={$formData.events.on_break.drop_itself}
        class="cursor-pointer accent-primary"
      />
      Drop Itself on on_break
    </label>
  </div>

  <p class="text-sm font-medium text-muted-foreground mb-3 mt-6">on_break Drops</p>

  {#each $formData.events.on_break.drops as drop, i}
    <div class="bg-muted p-4 rounded-md mb-3 border border-border">
      <div class="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">Item ID</label>
          <input
            type="number"
            bind:value={$formData.events.on_break.drops[i].item}
            class="w-full px-3 py-2
                   bg-background text-foreground
                   border border-border rounded-md
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-2">Chance (%)</label>
          <input
            type="number"
            bind:value={$formData.events.on_break.drops[i].chance}
            class="w-full px-3 py-2
                   bg-background text-foreground
                   border border-border rounded-md
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div class="mb-3">
        <label class="block text-sm font-medium text-foreground mb-2">Cause</label>
        <select
          id="data-dropcause"
          bind:value={$formData.events.on_break.drops[i].cause}
          class="w-full px-3 py-2
                 bg-background text-foreground
                 border border-border rounded-md
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {#each Object.values(DropCause) as dropCause}
            <option value={dropCause}>{dropCause}</option>
          {/each}
        </select>
      </div>

      <button
        type="button"
        on:click={() => removeDrop(i)}
        class="px-3 py-1 text-sm
               border border-red-500 rounded-md
               text-red-600 bg-transparent
               hover:bg-red-50 transition-colors"
      >
        Remove Drop
      </button>
    </div>
  {/each}

  <button
    type="button"
    on:click={addDrop}
    class="px-4 py-2
           border border-border rounded-md
           text-sm text-foreground
           bg-muted hover:bg-accent hover:text-foreground
           transition-colors"
  >
    Add Drop
  </button>
</Section>
