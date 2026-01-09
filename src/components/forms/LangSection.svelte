<script lang="ts">
  import { formData } from "../../stores";
  import Section from "./Section.svelte";

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
</script>

<Section title="Lang" subtitle="Localization">
  <div class="mb-4">
    <label for="lang-key" class="block text-sm font-medium text-gray-900 mb-2"
      >Translation Key</label
    >
    <input
      id="lang-key"
      type="text"
      bind:value={$formData.lang.key}
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
    />
  </div>
  <p class="text-sm font-medium text-gray-700 mb-3 mt-6">Locale: en_US</p>
  <div class="mb-4">
    <label
      for="locale-name"
      class="block text-sm font-medium text-gray-900 mb-2">Name</label
    >
    <input
      id="locale-name"
      type="text"
      bind:value={$formData.lang.locales.en_US.name}
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
    />
  </div>
  <div class="mb-4">
    <label
      for="locale-desc"
      class="block text-sm font-medium text-gray-900 mb-2">Description</label
    >
    <textarea
      id="locale-desc"
      bind:value={$formData.lang.locales.en_US.desc}
      rows="2"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-y"
    ></textarea>
  </div>
  <div class="mb-4">
    <label
      for="locale-tooltip"
      class="block text-sm font-medium text-gray-900 mb-2">Tooltip</label
    >
    <input
      id="locale-tooltip"
      type="text"
      bind:value={$formData.lang.locales.en_US.tooltip}
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
    />
  </div>
</Section>
