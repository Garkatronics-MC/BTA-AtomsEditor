<script lang="ts">
  import { MinecraftBlocks, MinecraftItems } from "../business/types";
  import Modal from "./modal.svelte";

  let { showModal = $bindable(), onSelect } = $props();

  const allItems = [
    ...Object.values(MinecraftBlocks).filter(v => typeof v === "number"),
    ...Object.values(MinecraftItems).filter(v => typeof v === "number")
  ];

  function getItemName(value: number) {
    if (MinecraftBlocks[value]) return MinecraftBlocks[value];
    if (MinecraftItems[value]) return MinecraftItems[value];
    return "";
  }

  let modal: any;
  let search = $state("");
  let filteredItems: (MinecraftBlocks | MinecraftItems)[] = $state(allItems);

  function updateFilter() {
    const term = search.trim().toLowerCase();
    filteredItems = term
      ? allItems.filter(f => getItemName(f).toLowerCase().includes(term))
      : allItems;
  }
  
</script>

<Modal showModal={showModal} bind:this={modal}>
  {#snippet header()}
    <h2>
      Inventory
      <br />
      <input
        type="text"
        bind:value={search}
        oninput={updateFilter}
        placeholder="Search items..."
        class="border px-2 py-1 rounded w-full"
      />
    </h2>
  {/snippet}

  <div class="mt-4 max-h-96 overflow-y-auto overflow-x-hidden">
    <div class="grid grid-cols-6 grid-rows-6 gap-2">
      {#each filteredItems as item}
        <button
        type="button"
          class="flex items-center justify-center border rounded h-16 w-50 text-sm text-center hover:bg-gray-100 cursor-pointer"
          onclick={() => {
            onSelect(item);
            modal.close();
          }}
        >
          {getItemName(item)}
        </button>
      {/each}
    </div>
  </div>
</Modal>