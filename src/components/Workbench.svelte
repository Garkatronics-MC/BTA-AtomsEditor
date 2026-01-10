<script lang="ts">
  import { formData } from "../stores";
  import { MinecraftBlocks, MinecraftItems } from "../business/types";
  import Inventory from "./Inventory.svelte";

  let showModal = $state(false);
  let selectedCell = $state<{ r: number; c: number } | null>(null);

  const mayusculas = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const minusculas = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );
  const letters = [...mayusculas, ...minusculas];

  // Inicializar pattern con 3x3 de valores null
  let pattern = $state<(number | null)[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  const allItems = [
    ...Object.values(MinecraftBlocks).filter((v) => typeof v === "number"),
    ...Object.values(MinecraftItems).filter((v) => typeof v === "number"),
  ];

  function getItemName(value: number | null) {
    if (value === null) return "";
    if (MinecraftBlocks[value]) return MinecraftBlocks[value];
    if (MinecraftItems[value]) return MinecraftItems[value];
    return "";
  }

  function onItemSelect(itemId: number) {
    if (selectedCell) {
      pattern[selectedCell.r][selectedCell.c] = itemId;
      savePattern();
      selectedCell = null;
      showModal = false;
    }
  }

  function savePattern() {
    const letter_symbols: Record<string, MinecraftBlocks | MinecraftItems> = {};
    const symbols_letter: Record<number, string> = {};

    pattern.forEach((row: (number | null)[], r) => {
      row.forEach((id, c) => {
        if (id != null && !(id in symbols_letter)) {
          const letter = letters[Object.keys(symbols_letter).length];
          symbols_letter[id] = letter;
          letter_symbols[letter] = id as MinecraftBlocks | MinecraftItems;
        }
      });
    });

    const processedPattern = pattern.map((row) =>
      row.map((id) => (id != null ? symbols_letter[id] : ""))
    );

    formData.update((f) => {
      f.recipe.workbench.pattern = processedPattern;
      f.recipe.workbench.symbols = [letter_symbols];
      return f;
    });
  }

  function clearCell(r: number, c: number, event: MouseEvent) {
    event.stopPropagation();
    pattern[r][c] = null;
    savePattern();
  }
</script>

<div class="flex justify-center gap-4">
  <Inventory bind:showModal onSelect={onItemSelect} />

  <div class="grid grid-cols-3 gap-2">
    {#each pattern as row, r}
      {#each row as cell, c}
        <div class="relative">
          <button
            type="button"
            class="border-2 border-gray-400 p-4 w-60 h-24 hover:bg-gray-100 flex items-center justify-center text-sm"
            onclick={() => {
              selectedCell = { r, c };
              showModal = true;
            }}
          >
            <span class="text-center break-words">
              {getItemName(cell) || "Vacío"}
            </span>
          </button>
          {#if cell !== null}
            <button
              type="button"
              class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
              onclick={(e) => clearCell(r, c, e)}
            >
              ×
            </button>
          {/if}
        </div>
      {/each}
    {/each}
  </div>
</div>