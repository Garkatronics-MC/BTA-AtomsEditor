<script lang="ts">
  import { AtomType } from "../../business/types";
  import { formData } from "../../stores";
  import Section from "./Section.svelte";

  export let errors: Record<string, string>;
</script>

<Section title="Meta" subtitle="Author information" expanded={true}>
  <div class="mb-4">
    <label
      for="meta-author"
      class="block text-sm font-medium text-foreground mb-2"
    >
      Author
    </label>
    <input
      id="meta-author"
      type="text"
      bind:value={$formData.meta.author}
      class="w-full px-3 py-2
             bg-background text-foreground
             border border-border rounded-md
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  </div>

  <div class="mb-4">
    <label
      for="meta-type"
      class="block text-sm font-medium text-foreground mb-2"
    >
      Object Type
    </label>

    <select
      id="data-dropcause"
      bind:value={$formData.meta.object_type}
      class="w-full px-3 py-2
             bg-background text-foreground
             border border-border rounded-md
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    >
      {#each Object.values(AtomType) as atomType}
        <option value={atomType}>{atomType}</option>
      {/each}
    </select>
  </div>

  <div class="mb-4">
    <label
      for="meta-version"
      class="block text-sm font-medium text-foreground mb-2"
    >
      Format Version
    </label>
    <input
      id="meta-version"
      type="number"
      bind:value={$formData.meta.format_version}
      readonly
      class="w-full px-3 py-2
             bg-muted text-muted-foreground
             border border-border rounded-md"
    />
  </div>
</Section>
