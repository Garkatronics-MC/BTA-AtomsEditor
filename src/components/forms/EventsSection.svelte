<script lang="ts">
  import { DropSchema } from "../../business/CompiledBlock";
  import { DropCause } from "../../business/types";
  import { formData } from "../../stores";
  import Section from "./Section.svelte";

  export let errors: Record<string, string>;

  if (!$formData.events.break) {
    $formData.events.break = {
      drop_itself: true, // default value
      drops: [],
    };
  } else if (!$formData.events.break.drops) {
    $formData.events.break.drops = [];
  }

  function addDrop() {
    $formData.events.break.drops = [
      ...$formData.events.break.drops,
      DropSchema.parse({}),
    ];
  }

  function removeDrop(index: number) {
    $formData.events.break.drops = $formData.events.break.drops.filter(
      (_: any, i: number) => i !== index
    );
  }
</script>

<Section title="Events" subtitle="Block events">
  <div class="mb-4">
    <label
      class="flex items-center gap-2 text-sm font-medium text-gray-900 cursor-pointer"
    >
      <input
        type="checkbox"
        bind:checked={$formData.events.break.drop_itself}
        class="cursor-pointer"
      />
      Drop Itself on Break
    </label>
  </div>

  <p class="text-sm font-medium text-gray-700 mb-3 mt-6">Break Drops</p>
  {#each $formData.events.break.drops as drop, i}
    <div class="bg-gray-50 p-4 rounded-md mb-3">
      <div class="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2"
            >Item ID</label
          >
          <input
            type="number"
            bind:value={$formData.events.break.drops[i].item}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2"
            >Chance (%)</label
          >
          <input
            type="number"
            bind:value={$formData.events.break.drops[i].chance}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </div>
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-900 mb-2">Cause</label
        >

        <select
          id="data-dropcause"
          bind:value={$formData.events.break.drops[i].cause}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        >
          {#each Object.values(DropCause) as dropCause}
            <option value={dropCause}>{dropCause}</option>
          {/each}
        </select>
      </div>
      <button
        type="button"
        on:click={() => removeDrop(i)}
        class="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
      >
        Remove Drop
      </button>
    </div>
  {/each}
  <button
    type="button"
    on:click={addDrop}
    class="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
  >
    Add Drop
  </button>
</Section>
