<script lang="ts">
  // Static info page for AtomEditor
</script>

<div class="flex h-screen">
  <div
    id="visor"
    class="flex-1 bg-gray-100 border border-gray-300 m-2 rounded-md p-6 overflow-y-auto"
  >
    <div class="max-w-3xl mx-auto">
      <div class="flex w-full justify-center text-center">
        <img src="logo.svg" alt="AtomEditor Logo" class="w-[200px] p-5 m-5" />
      </div>

      <h1 class="text-center text-2xl font-semibold mb-4">
        AtomEditor & AtomMod
      </h1>

      <p class="text-sm text-gray-700 mb-4">
        <strong>AtomMod</strong> is the core mod developed by
        <strong>@Garkatron / Garkatronics-MC</strong>.
      </p>

      <p class="text-sm text-gray-700 mb-4">
        It introduces <strong>Atoms</strong>: modular, data-driven blocks
        defined entirely through configuration files instead of hardcoded logic.
      </p>

      <p class="text-sm text-gray-700 mb-4">
        Blocks are described using a <strong>TOML-based format</strong>, making
        them easy to read, edit, version, and share. Most gameplay behavior—such
        as physics, rendering, drops, recipes, sounds, and translation is
        controlled through data.
      </p>

      <p class="text-sm text-gray-700 mb-4">
        <strong>AtomEditor</strong> is a dedicated editor built specifically for
        this format. It allows players and creators to edit atoms visually, validate
        data, and preview results without manually writing TOML files.
      </p>

      <h2 class="text-lg font-medium mt-6 mb-2">Key features</h2>
      <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
        <li>Modular block definitions</li>
        <li>Fully data-driven behavior</li>
        <li>TOML configuration format</li>
        <li>Per-face textures and rendering control</li>
        <li>Conditional drops and events</li>
        <li>Localization support</li>
        <li>Workbench and furnace recipes</li>
      </ul>

      <div class="mt-6 text-sm text-gray-600">
        <p>
          Organization:
          <a
            href="https://github.com/Garkatronics-MC"
            target="_blank"
            class="text-blue-600 hover:underline"
          >
            https://github.com/Garkatronics-MC
          </a>
        </p>
        <p>
          AtomMod repository:
          <a
            href="https://github.com/Garkatronics-MC/BTA-Atoms"
            target="_blank"
            class="text-blue-600 hover:underline"
          >
            https://github.com/Garkatronics-MC/BTA-Atoms
          </a>
          <br>
          AtomEditor repository:
          <a
            href="https://github.com/Garkatronics-MC/BTA-AtomsEditor"
            target="_blank"
            class="text-blue-600 hover:underline"
            >https://github.com/Garkatronics-MC/BTA-AtomsEditor</a
          >
        </p>
      </div>
    </div>
  </div>
</div>
