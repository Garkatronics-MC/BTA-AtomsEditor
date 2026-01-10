<script lang="ts">
  import { formData } from "../../stores";
  import Section from "./Section.svelte";

  // svelte-ignore export_let_unused
  export let errors: Record<string, string>;

  if (!$formData.lang.locales) {
    $formData.lang.locales = {};
  }

  // Ensure en_US object exists
  if (!$formData.lang.locales.en_US) {
    $formData.lang.locales.en_US = {
      name: "",
      desc: "",
      tooltip: "",
    };
  }

  // Get list of current locales
  $: localeKeys = Object.keys($formData.lang.locales);

  let newLocaleName = "";

  function addLocale() {
    if (newLocaleName && !$formData.lang.locales[newLocaleName]) {
      $formData.lang.locales[newLocaleName] = {
        name: "",
        desc: "",
        tooltip: "",
      };
      newLocaleName = "";
      $formData = $formData; // Trigger reactivity
    }
  }

  function removeLocale(localeKey: string) {
    if (localeKey !== "en_US") { // Prevent removing en_US
      delete $formData.lang.locales[localeKey];
      $formData = $formData; // Trigger reactivity
    }
  }
</script>

<Section title="Lang" subtitle="Localization">
  <div class="mb-6">
    <label for="lang-key" class="block text-sm font-medium text-foreground mb-2">
      Translation Key
    </label>
    <input
      id="lang-key"
      type="text"
      bind:value={$formData.lang.key}
      class="w-full px-3 py-2
             bg-background text-foreground
             border border-border rounded-md
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  </div>

  <!-- Add new locale -->
  <div class="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
    <label for="new-locale" class="block text-sm font-medium text-foreground mb-2">
      Add New Locale
    </label>
    <div class="flex gap-2">
      <input
        id="new-locale"
        type="text"
        bind:value={newLocaleName}
        placeholder="e.g., es_ES, fr_FR, de_DE"
        class="flex-1 px-3 py-2
               bg-background text-foreground
               border border-border rounded-md
               focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <button
        type="button"
        on:click={addLocale}
        disabled={!newLocaleName}
        class="px-4 py-2 bg-primary text-primary-foreground rounded-md
               hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
               transition-colors font-medium"
      >
        Add
      </button>
    </div>
  </div>

  <!-- Locales list -->
  <div class="space-y-6">
    {#each localeKeys as localeKey}
      <div class="p-4 bg-background border border-border rounded-lg">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-semibold text-foreground">
            Locale: {localeKey}
            {#if localeKey === "en_US"}
              <span class="ml-2 text-xs text-muted-foreground">(default)</span>
            {/if}
          </p>
          {#if localeKey !== "en_US"}
            <button
              type="button"
              on:click={() => removeLocale(localeKey)}
              class="text-sm text-destructive hover:text-destructive/80 font-medium"
            >
              Remove
            </button>
          {/if}
        </div>

        <div class="space-y-4">
          <div>
            <label for="locale-name-{localeKey}" class="block text-sm font-medium text-foreground mb-2">
              Name
            </label>
            <input
              id="locale-name-{localeKey}"
              type="text"
              bind:value={$formData.lang.locales[localeKey].name}
              class="w-full px-3 py-2
                     bg-background text-foreground
                     border border-border rounded-md
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label for="locale-desc-{localeKey}" class="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              id="locale-desc-{localeKey}"
              bind:value={$formData.lang.locales[localeKey].desc}
              rows="2"
              class="w-full px-3 py-2
                     bg-background text-foreground
                     border border-border rounded-md
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     resize-y"
            ></textarea>
          </div>

          <div>
            <label for="locale-tooltip-{localeKey}" class="block text-sm font-medium text-foreground mb-2">
              Tooltip
            </label>
            <input
              id="locale-tooltip-{localeKey}"
              type="text"
              bind:value={$formData.lang.locales[localeKey].tooltip}
              class="w-full px-3 py-2
                     bg-background text-foreground
                     border border-border rounded-md
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
    {/each}
  </div>
</Section>