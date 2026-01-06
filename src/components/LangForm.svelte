<script lang="ts">
  export let id = '';
  export let name = '';
  export let description = '';
</script>

<div class="border-2 rounded-xl p-6 m-2 bg-white shadow-sm">
  <h3 class="font-semibold mb-4 text-lg">Language: {id || 'New'}</h3>
  
  <ol class="space-y-4">
    <!-- ID -->
    <li class="flex flex-col">
      <label for="lang_id" class="text-sm font-medium mb-1">ID</label>
      <input
        id="lang_id"
        type="text"
        class="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        bind:value={id}
      />
    </li>

    <!-- Name -->
    <li class="flex flex-col">
      <label for="lang_name" class="text-sm font-medium mb-1">Name</label>
      <input
        id="lang_name"
        type="text"
        class="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        bind:value={name}
      />
    </li>

    <!-- Description -->
    <li class="flex flex-col">
      <label for="lang_description" class="text-sm font-medium mb-1">Description</label>
      <input
        id="lang_description"
        type="text"
        class="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        bind:value={description}
      />
    </li>
  </ol>
</div>
