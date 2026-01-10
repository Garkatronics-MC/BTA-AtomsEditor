<script lang="ts">
  import { slide } from 'svelte/transition';
  export let title: string;
  export let subtitle: string;
  export let expanded: boolean = false;

  function toggle() {
    expanded = !expanded;
  }
</script>

<div class="bg-background rounded-lg shadow-sm mb-4 overflow-hidden border border-border">
  <button 
    type="button" 
    on:click={toggle}
    class="w-full px-5 py-4 flex items-center justify-between
           hover:bg-muted hover:text-foreground transition-colors"
  >
    <div class="flex flex-col items-start gap-1">
      <span class="font-semibold text-foreground text-sm">{title}</span>
      <span class="text-xs text-muted-foreground">{subtitle}</span>
    </div>
    <span class="text-xl text-muted-foreground font-light">{expanded ? '−' : '+'}</span>
  </button>
  {#if expanded}
    <div class="px-5 pb-5" transition:slide>
      <slot />
    </div>
  {/if}
</div>
