// src/lib/utils/schemaToForm.ts
import { z, ZodObject, ZodArray, ZodBoolean, ZodNumber, ZodString } from "zod";
import type { ZodTypeAny } from "zod/v3";

export type FormField = {
  key: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  value: any;
  children?: FormField[];
};

// Convierte un Zod schema en campos de formulario
export function schemaToFields(schema: ZodTypeAny, prefix = ""): FormField[] {
  if (schema instanceof ZodObject) {
    const shape = schema.shape;
    return Object.keys(shape).map((key) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const fieldSchema = shape[key];
      const defaultValue = (fieldSchema as any)._def.defaultValue?.()
      const children = schemaToFields(fieldSchema, fullKey);
      return {
        key: fullKey,
        type: children.length ? "object" : inferType(fieldSchema),
        value: defaultValue !== undefined ? defaultValue : getDefaultValue(fieldSchema),
        children: children.length ? children : undefined,
      };
    });
  }

  if (schema instanceof ZodArray) {
    return [{
      key: prefix,
      type: "array",
      value: [],
      children: [],
    }];
  }

  return [{
    key: prefix,
    type: inferType(schema),
    value: getDefaultValue(schema),
  }];
}

function inferType(schema: ZodTypeAny): "string" | "number" | "boolean" | "object" | "array" {
  if (schema instanceof ZodString) return "string";
  if (schema instanceof ZodNumber) return "number";
  if (schema instanceof ZodBoolean) return "boolean";
  if (schema instanceof ZodObject) return "object";
  if (schema instanceof ZodArray) return "array";
  return "string";
}

function getDefaultValue(schema: ZodTypeAny) {
  try {
    if ((schema as any)._def.defaultValue) return (schema as any)._def.defaultValue();
  } catch {}
  if (schema instanceof ZodString) return "";
  if (schema instanceof ZodNumber) return 0;
  if (schema instanceof ZodBoolean) return false;
  if (schema instanceof ZodArray) return [];
  if (schema instanceof ZodObject) return {};
  return null;
}
