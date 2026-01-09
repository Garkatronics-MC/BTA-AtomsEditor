<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import BlockTab from "./tabs/BlockTab.svelte";
  import AboutTab from "./tabs/AboutTab.svelte";

  interface Item {
    label: string;
    value: number;
    component: typeof SvelteComponent;
  }

  // Array de items
  let items: Item[] = [
    { label: "About", value: 1, component: AboutTab },
    { label: "Block", value: 2, component: BlockTab }
  ];
  export let activeTabValue: number = 2;

  const handleClick = (tabValue: number) => () => {
    activeTabValue = tabValue;
  };

  const addTab = () => {
    const newValue = items.length
      ? Math.max(...items.map((i) => i.value)) + 1
      : 1;
    const newItem: Item = {
      label: `Block ${newValue}`,
      value: newValue,
      component: BlockTab,
    };
    items = [...items, newItem]; 
    activeTabValue = newValue; 
  };
</script>

<ul>
  {#each items as item}
    <li class={activeTabValue === item.value ? "active" : ""}>
      <span on:click={handleClick(item.value)}>{item.label}</span>
    </li>
  {/each}
  <!--
  <li>
    <span on:click={addTab}>+</span>
  </li>
  -->
</ul>

{#each items as item}
  {#if activeTabValue === item.value}
    <div class="box">
      <svelte:component this={item.component} />
    </div>
  {/if}
{/each}

<style>
  .box {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 0 0 0.5rem 0.5rem;
    border-top: 0;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: 1px solid #dee2e6;
  }

  li {
    margin-bottom: -1px;
  }

  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
    user-select: none;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }

  li.active > span {
    color: #495057;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }
</style>
