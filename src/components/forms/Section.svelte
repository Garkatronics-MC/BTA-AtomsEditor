<script lang="ts">
  import { slide } from 'svelte/transition';
  export let title: string;
  export let subtitle: string;
  export let expanded: boolean = true;

  function toggle() {
    expanded = !expanded;
  }
</script>

<div class="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
  <button 
    type="button" 
    on:click={toggle}
    class="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
  >
    <div class="flex flex-col items-start gap-1">
      <span class="font-semibold text-gray-900 text-sm">{title}</span>
      <span class="text-xs text-gray-500">{subtitle}</span>
    </div>
    <span class="text-xl text-gray-600 font-light">{expanded ? '−' : '+'}</span>
  </button>
  {#if expanded}
    <div class="px-5 pb-5" transition:slide>
      <slot />
    </div>
  {/if}
</div>
