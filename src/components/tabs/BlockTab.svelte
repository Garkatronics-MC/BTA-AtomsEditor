<script lang="ts">
  import { formData } from "../../stores";
  import Cube from "../Cube.svelte";
  import CubeForm from "../CubeForm.svelte";

</script>

<div class="flex h-screen">
  <div
    id="visor"
    class="flex-1 bg-gray-100 border border-gray-300 m-2 rounded-md"
  >
    <Cube />
  </div>

  <div
    id="tools"
    class="w-1/3 bg-white border border-gray-300 m-2 rounded-md p-4 overflow-y-auto"
  >
    <CubeForm/>
  </div>
</div>
