<script lang="ts">
  export let textures: Record<string, string> = {};
  let fileinput: HTMLInputElement;
  let currentSide: string | null = null;

  const sides = ["top", "bottom", "west", "east", "south", "north"];

  const triggerFileInput = (side: string) => {
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
      textures[currentSide!] = reader.result as string;
      textures = { ...textures };
      currentSide = null;
    };
  };
</script>

<div class="flex flex-col items-center space-y-4">
  <div class="grid grid-cols-3 gap-3">
    {#each sides as side}
      <button
        on:click={() => triggerFileInput(side)}
        class="group relative bg-gray-100 hover:bg-gray-200 rounded-lg p-2 transition-all duration-200 hover:shadow-md"
      >
        <div class="relative overflow-hidden rounded-md">
       <img
  id={side}
  class="w-16 h-16 object-cover rounded-md"
  src={textures[side]}
  alt={side}
  style="image-rendering: pixelated;"
/>
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center"
          >
            <span
              class="opacity-0 group-hover:opacity-100 text-white text-2xl drop-shadow-lg"
              >+</span
            >
          </div>
        </div>
        <span class="block mt-1.5 text-xs font-medium text-gray-600 capitalize"
          >{side}</span
        >
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

