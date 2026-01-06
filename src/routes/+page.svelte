<script lang="ts">
  import { BlockBuilder, downloadBlock } from "../business/Atom";
  import Cube from "../components/Cube.svelte";
  import LangForm from "../components/LangForm.svelte";
  import TextureSelector from "../components/TextureSelector.svelte";

  const MATERIALS = [
    "air",
    "grass",
    "dirt",
    "wood",
    "stone",
    "basalt",
    "limestone",
    "granite",
    "permafrost",
    "marble",
    "slate",
    "netherrack",
    "metal",
    "steel",
    "water",
    "lava",
    "leaves",
    "plant",
    "sponge",
    "cloth",
    "fire",
    "sand",
    "soulsand",
    "decoration",
    "glass",
    "explosive",
    "coral",
    "ice",
    "topSnow",
    "snow",
    "cactus",
    "clay",
    "vegetable",
    "portal",
    "cake",
    "web",
    "piston",
    "moss",
    "woodWet",
  ] as const;

  const builder = new BlockBuilder();

  let author = "";
  let name = "";
  let langkey = "";
  let material = "";
  let solid = true;
  let cubeshaped = true;
  let collidable = true;

  // Temp
  let newLangId = "";
  let newLangName = "";
  let newLangDesc = "";

  let textures: Record<string, string> = {};

  // Registers
  let langs: Record<string, { id: string; name: string; description: string }> =
    {};

  let langIds: string[] = [];

  function onDownloadClick() {
    builder
      .name(name)
      .base64()
      .langkey(langkey)
      .author(author)
      .iscubeshaped(cubeshaped)
      .issolidrender(solid)
      .iscollidable(collidable)
      .dropitemid("minecraft:block/stone");

    const textureList: [string, string][] = Object.entries(textures)
      .filter(([_, value]) => value && value !== "")
      .map(([face, texture]) => [face, texture]);

    builder.textures(textureList);

    for (const key of langIds) {
      const entry = langs[key];

      builder.addLang(key, {
        name: entry.name,
        desc: entry.description,
      });
    }

    downloadBlock(name || "block", builder.build());
  }

  function clear() {
    author = "";
    name = "";
    langkey = "";
    material = "";
    solid = true;
    cubeshaped = true;
    collidable = false;

    // Temp
    newLangId = "";
    newLangName = "";
    newLangDesc = "";
  }

  function addLang() {
    if (!newLangId) return;

    langs[newLangId] = {
      id: newLangId,
      name: newLangName,
      description: newLangDesc,
    };

    langIds = [...langIds, newLangId];

    newLangId = "";
    newLangName = "";
    newLangDesc = "";
  }
</script>

<div class="flex h-screen">
  <div
    id="visor"
    class="flex-1 bg-gray-100 border border-gray-300 m-2 rounded-md"
  >
    <Cube
      bind:top={textures["top"]}
      bind:bottom={textures["bottom"]}
      bind:south={textures["south"]}
      bind:north={textures["north"]}
      bind:east={textures["east"]}
      bind:west={textures["west"]}
    />
  </div>

  <div
    id="tools"
    class="w-80 bg-white border border-gray-300 m-2 rounded-md p-4 overflow-y-auto"
  >
    <h2 class="text-lg font-bold mb-2">Tools</h2>
    <ol class="space-y-2">
      <li class="flex space-x-2 mb-16">
        <button
          on:click={clear}
          class="w-full bg-red-500 text-white px-2 py-1 rounded">Clear</button
        >
      </li>
      <li class="flex space-x-2">
        <button
          class="w-full bg-green-500 text-white px-2 py-1 rounded"
          on:click={onDownloadClick}>Download</button
        >
      </li>

      <li class="flex flex-col">
        <label for="author" class="text-sm mb-1">Author</label>
        <input
          id="author"
          type="text"
          class="border rounded px-2 py-1"
          bind:value={author}
        />
      </li>

      <li class="flex flex-col">
        <label for="name" class="text-sm mb-1">Name</label>
        <input
          id="name"
          type="text"
          class="border rounded px-2 py-1"
          bind:value={name}
        />
      </li>
      <li class="flex flex-col">
        <label for="langkey" class="text-sm mb-1">LangKey</label>
        <input
          id="langkey"
          type="text"
          class="border rounded px-2 py-1"
          bind:value={langkey}
        />
      </li>
      <li class="flex space-x-2">
        <button class="{ !solid ? "bg-red-500" : "bg-green-500"} text-white px-2 py-1 rounded" on:click={()=>{solid = !solid}}>Solid</button>
        <button class="{ !collidable ? "bg-red-500" : "bg-green-500"} text-white px-2 py-1 rounded" on:click={()=>{collidable = !collidable}}
          >Collidable</button
        >
        <button class="{ !cubeshaped ? "bg-red-500" : "bg-green-500"} text-white px-2 py-1 rounded" on:click={()=>{cubeshaped = !cubeshaped}}
          >Cube shaped</button
        >
      </li>
      <li class="flex flex-col">
        <label for="material" class="text-sm mb-1">Material</label>
        <select
          id="material"
          bind:value={material}
          class="border rounded px-2 py-1"
        >
          <option value="">-- Select material --</option>

          {#each MATERIALS as m}
            <option value={m}>{m}</option>
          {/each}
        </select>
      </li>
    </ol>

    <div class="mt-4 flex flex-col">
      <TextureSelector bind:textures />
    </div>

    <div class="mt-4 flex flex-col">
      <label for="lang_id" class="text-sm font-medium mb-1">Lang ID</label>
      <input
        id="lang_id"
        type="text"
        class="border rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        bind:value={newLangId}
      />
      <button
        class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
        on:click={addLang}
      >
        Add Lang
      </button>
    </div>

    <div class="mt-4 space-y-4">
      {#each langIds as id (id)}
        <LangForm
          bind:id={langs[id].id}
          bind:name={langs[id].name}
          bind:description={langs[id].description}
        />
      {/each}
    </div>
  </div>
</div>
