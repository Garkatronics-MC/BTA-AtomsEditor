import { z } from "zod";
import { BlockSound, BlockTag, DropCause, Material } from "./types";

export const currentFormatVersion: number = 1;
// --- Sub-esquemas ---
const MetaSchema = z.object({
  author: z.string().default("Unknown"),
  object_type: z.string().default("block"),
  format_version: z.number().min(currentFormatVersion).max(currentFormatVersion).default(currentFormatVersion),
});

const DataSchema = z.object({
  name: z.string().default("UnnamedBlock"),
  tags: z.array(z.enum(BlockTag)).default([BlockTag.MINEABLE_BY_PICKAXE]),
  immovable: z.boolean().default(false),
  unbreakable: z.boolean().default(false),
  resistance: z.number().default(1),
  slipperiness: z.number().default(0.6),
  hardness: z.number().default(1),
  material: z.enum(Material).default(Material.Stone),
  luminance: z.number().default(0),
});

const FlammabilitySchema = z.object({
  chance_to_catch_fire: z.number().default(0),
  change_to_degrade: z.number().default(0),
});

const RenderSchema = z.object({
  is_cube_shaped: z.boolean().default(true),
  is_solid_render: z.boolean().default(true),
});

const SoundsSchema = z.object({
  sound: z.enum(BlockSound).default(BlockSound.STONE),
});

const PhysicsSchema = z.object({
  is_collidable: z.boolean().default(true),
});

const FacesSchema = z.object({
  top: z.string().default(""),
  bottom: z.string().default(""),
  north: z.string().default(""),
  south: z.string().default(""),
  west: z.string().default(""),
  east: z.string().default(""),
});

const TexturesSchema = z.object({
  encoding: z.string().default("base64"),
  faces: FacesSchema.default({}),
});

export const DropSchema = z.object({
  item: z.number().default(1),
  cause: z.enum(DropCause).default(DropCause.PROPER_TOOL),
  chance: z.number().default(100),
});

const BreakEventSchema = z.object({
  drop_itself: z.boolean().default(true),
  drops: z.array(DropSchema).default([]),
});

const EventsSchema = z.object({
  break: BreakEventSchema.default({}),
});

const LangLocaleSchema = z.object({
  name: z.string().default("en_EN"),
  desc: z.string().default("A unnamed block"),
  tooltip: z.string().default("No tooltip here."),
});

const LangSchema = z.object({
  key: z.string().default("unnamed_block"),
  locales: z.record(z.string(),LangLocaleSchema).default({
    en_US: LangLocaleSchema.parse({}),
  }),
});

const WorkbenchSchema = z.object({
  output_amount: z.number().default(0),
  pattern: z.array(z.array(z.string()).max(3)).max(3).default([]),
  symbols: z.array(z.record(z.string(),z.number())).default([]),
});

const FurnaceSchema = z.object({
  out_item_id: z.number().default(0),
  output_amount: z.number().default(0),
});

const RecipeSchema = z.object({
  enable_workbench: z.boolean().default(false),
  enable_furnace: z.boolean().default(false),
  workbench: WorkbenchSchema.optional(),
  furnace: FurnaceSchema.optional(),
});

// --- Schema principal ---
export const CompiledBlockSchema = z.object({
  meta: MetaSchema.default({}),
  data: DataSchema.default({}),
  flammability: FlammabilitySchema.default({}),
  render: RenderSchema.default({}),
  sounds: SoundsSchema.default({}),
  physics: PhysicsSchema.default({}),
  textures: TexturesSchema.default({}),
  events: EventsSchema.default({}),
  lang: LangSchema.default({}),
  recipe: RecipeSchema.default({}),
});
