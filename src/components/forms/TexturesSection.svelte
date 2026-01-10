<script lang="ts">
  import type { Face } from '../../business/types';
  import { formData } from '../../stores';
  import Section from './Section.svelte';
  
  // svelte-ignore export_let_unused
  export let errors: Record<string, string> = {};



  let fileinput: HTMLInputElement;
  let currentSide: Face | null = null;

  const sides: Face[] = ["top", "bottom", "west", "east", "south", "north"];

  const triggerFileInput = (side: Face) => {
    currentSide = side;
    fileinput.value = "";
    fileinput.click();
  };

  const onFileSelected = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0 || !currentSide) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      $formData.textures.faces[currentSide!] = reader.result as string;
      // Dispara reactividad en Svelte
      $formData.textures.faces = { ...$formData.textures.faces };
      currentSide = null;
    };
  };
</script>

<Section title="Textures" subtitle="Block textures">
  <div class="mb-4">
    <label for="tex-encoding" class="block text-sm font-medium text-foreground mb-2">
      Encoding
    </label>
    <input 
      id="tex-encoding" 
      type="text" 
      readonly
      bind:value={$formData.textures.encoding}
      class="w-full px-3 py-2
             bg-background text-foreground
             border border-border rounded-md
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  </div>

  <p class="text-sm font-medium text-muted-foreground mb-3 mt-6">Faces</p>

  <div class="flex flex-col items-center space-y-4">
    <div class="grid grid-cols-3 gap-3">
      {#each sides as side}
        <button
          type="button"
          on:click={() => triggerFileInput(side)}
          class="group relative
                 bg-muted hover:bg-accent
                 rounded-lg p-2 transition-all duration-200
                 hover:shadow-md"
        >
          <div class="relative overflow-hidden rounded-md">
            <img
              id={side}
              class="w-16 h-16 object-cover rounded-md"
              src={$formData.textures.faces[side]}
              alt={side}
              style="image-rendering: pixelated;"
            />
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors
                     flex items-center justify-center"
            >
              <span
                class="opacity-0 group-hover:opacity-100 text-white text-2xl drop-shadow-lg"
                >+</span
              >
            </div>
          </div>
          <span class="block mt-1.5 text-xs font-medium text-muted-foreground capitalize">{side}</span>
        </button>
      {/each}
    </div>

    <input
      type="file"
      accept=".jpg, .jpeg, .png"
      class="hidden"
      bind:this={fileinput}
      on:change={onFileSelected}
    />
  </div>
</Section>
