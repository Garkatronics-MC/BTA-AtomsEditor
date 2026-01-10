<script>
  let { showModal = $bindable(), header, children } = $props();
  let dialog = $state();

  $effect(() => {
    if (showModal) dialog.showModal();
  });

  export function close() {
    dialog?.close();
    showModal = false;
  }


</script>

<dialog
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => e.target === dialog && dialog.close()}
  class="w-screen h-screen open:flex open:items-center open:justify-center bg-transparent"
>
  <div
    class="
      bg-white rounded
      p-4
      min-w-[300px]
      max-w-[90vw]
      max-h-[90vh]
      overflow-y-auto
    "
  >
    {@render header?.()}
    <hr class="my-2" />
    {@render children?.()}
    <hr class="my-2" />
    <button
      autofocus
      type="button"
      onclick={() => dialog.close()}
      class="mt-2 px-3 py-1 border rounded"
    >
      Close
    </button>
  </div>
</dialog>
