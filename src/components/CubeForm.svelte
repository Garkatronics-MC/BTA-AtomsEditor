<script lang="ts">
  import TOML from "smol-toml";
  import { z } from "zod";
  import {
    CompiledBlockSchema,
    currentFormatVersion,
  } from "../business/CompiledBlock";
  import DataSection from "./forms/DataSection.svelte";
  import FlammabilitySection from "./forms/FlammabilitySection.svelte";
  import RenderSection from "./forms/RenderSection.svelte";
  import SoundsSection from "./forms/SoundsSection.svelte";
  import PhysicsSection from "./forms/PhysicsSection.svelte";
  import TexturesSection from "./forms/TexturesSection.svelte";
  import EventsSection from "./forms/EventsSection.svelte";
  import LangSection from "./forms/LangSection.svelte";
  import RecipeSection from "./forms/RecipeSection.svelte";
  import MetaSection from "./forms/MetaSection.svelte";
  import type { CompiledBlock } from "../business/types";
  import { formData } from "../stores";
  import Workbench from "./Workbench.svelte";
  import Inventory from "./Inventory.svelte";
  import { get } from "svelte/store";

  let errors: Record<string, string> = $state({});

  function check(data: any): boolean {
    try {
      const validatedData = CompiledBlockSchema.parse(data);
      console.log("Validated data:", validatedData);
      alert("Block compiled successfully! Check console for JSON.");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          errors[path] = err.message;
        });
        alert("Validation errors. Check the marked fields.");
      }
      return false;
    }
  }

  function handleSubmit() {
    errors = {};
    
    const data = get(formData);
    
    if (check(data)) {
      downloadTOML(data);
    } else {
      alert("Errors!")
    }
  }

  function downloadTOML(data: any) {
    const blob = new Blob([TOML.stringify(data)], { type: "application/toml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.data.name || "block"}.atom.toml`;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="min-h-screen bg-background text-foreground">
  <form class="max-w-4xl mx-auto">
    <MetaSection {errors} />
    <DataSection {errors} />
    <TexturesSection {errors} />
    <EventsSection {errors} />
    <SoundsSection {errors} />
    <RecipeSection {errors} />
    <LangSection {errors} />
    <FlammabilitySection {errors} />
    <RenderSection {errors} />
    <PhysicsSection {errors} />

    <button
      type="submit"
      onclick={handleSubmit}
      class="w-full mt-6 px-4 py-3
             bg-primary text-primary-foreground
             rounded-lg font-medium
             hover:bg-primary/90
             transition-colors shadow-sm"
    >
      Download Atom
    </button>
  </form>
</div>
