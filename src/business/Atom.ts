import { stringify } from "smol-toml";
import { z } from "zod";
import type { FormField } from "./test";

// Parsear TOML a objeto
// const config = TOML.parse(fileContent);


export function getNested(obj: any, path: string) {
  return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}

export function setNested(obj: any, path: string, value: any) {
  const keys = path.split(".");
  let o = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!o[keys[i]]) o[keys[i]] = {};
    o = o[keys[i]];
  }
  o[keys[keys.length - 1]] = value;
}
type Field = { name: string; label: string; type: string };

type FormField = {
  key: string;        // el path en el schema
  value: any;         // valor actual
  label?: string;     // etiqueta visible
  type?: string;      // "text", "checkbox", "number", etc.
  errors?: string[];  // errores actuales
};
function schemaToFields(schema: any, prefix = ""): FormField[] {
  const fields: FormField[] = [];
  for (const [key, value] of Object.entries(schema.shape)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (value instanceof z.ZodObject) {
      fields.push(...schemaToFields(value, path));
    } else if (value instanceof z.ZodBoolean) {
      fields.push({ key: path, value: false, label: key, type: "checkbox", errors: [] });
    } else if (value instanceof z.ZodNumber) {
      fields.push({ key: path, value: 0, label: key, type: "number", errors: [] });
    } else if (value instanceof z.ZodString) {
      fields.push({ key: path, value: "", label: key, type: "text", errors: [] });
    }
  }
  return fields;
}



export function downloadBlock(name: string, block: any) {
    const stringdata = block.toTOML();


    const blob = new Blob([stringdata], { type: "text/plain" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name}.atom.toml`;
    a.click();

    URL.revokeObjectURL(a.href);
}

export function buildSchema(obj: any): z.ZodType<any> {
  if (Array.isArray(obj)) {
    return z.array(buildSchema(obj[0] ?? {}));
  } else if (obj === null) {
    return z.any();
  } else if (typeof obj === "object") {
    const shape: Record<string, z.ZodType<any>> = {};
    for (const [key, value] of Object.entries(obj)) {
      shape[key] = buildSchema(value);
    }
    return z.object(shape);
  } else if (typeof obj === "string") {
    return z.string();
  } else if (typeof obj === "number") {
    return z.number();
  } else if (typeof obj === "boolean") {
    return z.boolean();
  } else {
    return z.any();
  }
}
/*

div class="mt-4 space-y-4">
      {#each langIds as id (id)}
        <LangForm
          bind:id={langs[id].id}
          bind:name={langs[id].name}
          bind:description={langs[id].description}
        />
      {/each}

*/