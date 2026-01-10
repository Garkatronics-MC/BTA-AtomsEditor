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
  class="modal-dialog
         w-screen h-screen 
         open:flex open:items-center open:justify-center 
         bg-transparent"
>
  <div
    class="
      bg-background text-foreground border-border rounded
      p-4
      min-w-[300px]
      max-w-[90vw]
      max-h-[90vh]
      overflow-y-auto
      border
    "
  >
    {@render header?.()}
    <hr class="my-2 border-border" />
    {@render children?.()}
    <hr class="my-2 border-border" />
    <button
      autofocus
      type="button"
      onclick={() => dialog.close()}
      class="mt-2 px-3 py-1
             bg-muted text-foreground border-border border rounded
             hover:bg-accent hover:text-foreground transition-colors"
    >
      Close
    </button>
  </div>
</dialog>

<style>
  .modal-dialog::backdrop {
    background-color: rgb(var(--bg));
  }

</style>