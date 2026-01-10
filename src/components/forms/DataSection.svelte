<script lang="ts">
  import { BlockTag, Material } from "../../business/types";
  import { formData } from "../../stores";
  import Section from "./Section.svelte";

  export let errors: Record<string, string>;

  function addTag() {
    $formData.data.tags = [...$formData.data.tags, BlockTag.CAN_HANG_OFF];
  }

  function removeTag(index: number) {
    $formData.data.tags = $formData.data.tags.filter(
      (_: any, i: number) => i !== index
    );
  }
</script>
<Section title="Data" subtitle="Core block properties" expanded={true}>
  <div class="mb-4">
    <label
      for="data-name"
      class="block text-sm font-medium text-foreground mb-2"
    >
      Block Name *
    </label>
    <input
      id="data-name"
      type="text"
      bind:value={$formData.data.name}
      class="w-full px-3 py-2
             bg-background text-foreground
             border border-border rounded-md
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  </div>

  <div class="mb-4">
    <label class="block text-sm font-medium text-foreground mb-2">
      Tags
    </label>

    {#each $formData.data.tags as tag, i}
      <div class="flex gap-2 mb-2">
        <select
          bind:value={$formData.data.tags[i]}
          class="w-full px-3 py-2
                 bg-background text-foreground
                 border border-border rounded-md"
        >
          {#each Object.values(BlockTag) as blockTag}
            <option value={blockTag}>{blockTag}</option>
          {/each}
        </select>

        <button
          type="button"
          on:click={() => removeTag(i)}
          class="px-3 rounded-md
                 bg-muted text-muted-foreground
                 border border-border
                 hover:bg-accent transition"
        >
          ×
        </button>
      </div>
    {/each}

    <button
      type="button"
      on:click={addTag}
      class="px-4 py-2
             bg-muted text-muted-foreground
             border border-border rounded-md text-sm
             hover:bg-accent hover:text-foreground
             transition-colors"
    >
      Add Tag
    </button>
  </div>

  <div class="flex gap-6 mb-4">
    <label
      class="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer"
    >
      <input
        type="checkbox"
        bind:checked={$formData.data.immovable}
        class="cursor-pointer accent-primary"
      />
      Immovable
    </label>

    <label
      class="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer"
    >
      <input
        type="checkbox"
        bind:checked={$formData.data.unbreakable}
        class="cursor-pointer accent-primary"
      />
      Unbreakable
    </label>
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label
        for="data-resistance"
        class="block text-sm font-medium text-foreground mb-2"
      >
        Resistance
      </label>
      <input
        id="data-resistance"
        type="number"
        step="0.1"
        bind:value={$formData.data.resistance}
        class="w-full px-3 py-2
               bg-background text-foreground
               border border-border rounded-md
               focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>

    <div>
      <label
        for="data-hardness"
        class="block text-sm font-medium text-foreground mb-2"
      >
        Hardness
      </label>
      <input
        id="data-hardness"
        type="number"
        step="0.1"
        bind:value={$formData.data.hardness}
        class="w-full px-3 py-2
               bg-background text-foreground
               border border-border rounded-md
               focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label
        for="data-slipperiness"
        class="block text-sm font-medium text-foreground mb-2"
      >
        Slipperiness
      </label>
      <input
        id="data-slipperiness"
        type="number"
        step="0.1"
        bind:value={$formData.data.slipperiness}
        class="w-full px-3 py-2
               bg-background text-foreground
               border border-border rounded-md
               focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>

    <div>
      <label
        for="data-luminance"
        class="block text-sm font-medium text-foreground mb-2"
      >
        Luminance
      </label>
      <input
        id="data-luminance"
        type="number"
        bind:value={$formData.data.luminance}
        class="w-full px-3 py-2
               bg-background text-foreground
               border border-border rounded-md
               focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  </div>

  <div class="mb-4">
    <label
      for="data-material"
      class="block text-sm font-medium text-foreground mb-2"
    >
      Material
    </label>
    <select
      id="data-material"
      bind:value={$formData.data.material}
      class="w-full px-3 py-2
             bg-background text-foreground
             border border-border rounded-md
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    >
      {#each Object.values(Material) as material}
        <option value={material}>{material}</option>
      {/each}
    </select>
  </div>
</Section>