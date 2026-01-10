<script lang="ts">
  import { formData } from "../../stores";
  import Cube from "../Cube.svelte";
  import CubeForm from "../CubeForm.svelte";
</script>

<div class="flex h-screen bg-background text-foreground">
  <div
    id="visor"
    class="flex-1
           bg-background
           border border-border
           m-2 rounded-md
           overflow-hidden"
  >
    <Cube />
  </div>

  <div
    id="tools"
    class="w-1/3
           bg-muted
           border border-border
           m-2 rounded-md
           p-4
           overflow-y-auto"
  >
    <CubeForm />
  </div>
</div>
