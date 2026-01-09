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

  let errors: Record<string, string> = $state({});

  function handleSubmit() {
    errors = {};
    formData.update((data) => {
      try {
        const validatedData = CompiledBlockSchema.parse(data);
        console.log("✅ Validated data:", validatedData);
        alert("✅ Block compiled successfully! Check console for JSON.");
        downloadJSON(validatedData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            const path = err.path.join(".");
            errors[path] = err.message;
          });
          alert("❌ Validation errors. Check the marked fields.");
        }
      }
      return data; // Must return current data
    });
  }

  function downloadJSON(data: any) {
    const blob = new Blob([TOML.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.data.name || "block"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="min-h-screen bg-gray-50">
  <form onsubmit={handleSubmit} class="max-w-4xl mx-auto">
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
      class="w-full mt-6 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
    >
      Download Atom
    </button>
  </form>
</div>
