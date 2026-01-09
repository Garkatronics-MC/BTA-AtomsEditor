import type z from "zod";
import type { CompiledBlockSchema } from "./CompiledBlock";


export type Face = "top" | "bottom" | "north" | "south" | "east" | "west";
export type CompiledBlock = z.infer<typeof CompiledBlockSchema>;

export enum AtomType  {
  BLOCK = "BLOCK"
}

export enum Material {
  Air = "air",
  Grass = "grass",
  Dirt = "dirt",
  Wood = "wood",
  Stone = "stone",
  Basalt = "basalt",
  Limestone = "limestone",
  Granite = "granite",
  Permafrost = "permafrost",
  Marble = "marble",
  Slate = "slate",
  Netherrack = "netherrack",
  Metal = "metal",
  Steel = "steel",
  Water = "water",
  Lava = "lava",
  Leaves = "leaves",
  Plant = "plant",
  Sponge = "sponge",
  Cloth = "cloth",
  Fire = "fire",
  Sand = "sand",
  SoulSand = "soulsand",
  Decoration = "decoration",
  Glass = "glass",
  Explosive = "explosive",
  Coral = "coral",
  Ice = "ice",
  TopSnow = "topSnow",
  Snow = "snow",
  Cactus = "cactus",
  Clay = "clay",
  Vegetable = "vegetable",
  Portal = "portal",
  Cake = "cake",
  Web = "web",
  Piston = "piston",
  Moss = "moss",
  WoodWet = "woodWet"
}

export enum BlockSound {
  DEFAULT = "DEFAULT",
  WOOD = "WOOD",
  GRAVEL = "GRAVEL",
  GRASS = "GRASS",
  STONE = "STONE",
  PERMAFROST = "PERMAFROST",
  METAL = "METAL",
  GLASS = "GLASS",
  CLOTH = "CLOTH",
  SAND = "SAND",
  FIRE = "FIRE",
}

export enum BlockTag {
  MINEABLE_BY_PICKAXE = "mineable_by_pickaxe",
  MINEABLE_BY_AXE = "mineable_by_axe",
  MINEABLE_BY_SHOVEL = "mineable_by_shovel",
  MINEABLE_BY_HOE = "mineable_by_hoe",
  MINEABLE_BY_SWORD = "mineable_by_sword",
  MINEABLE_BY_SHEARS = "mineable_by_shears",
  IS_WATER = "is_water",
  IS_LAVA = "is_lava",
  GROWS_FLOWERS = "grows_flowers",
  GROWS_SUGAR_CANE = "grows_sugar_cane",
  GROWS_CACTI = "grows_cacti",
  GROWS_TREES = "grows_trees",
  GROWS_SPINIFEX = "grows_spinifex",
  BROKEN_BY_FLUIDS = "broken_by_fluids",
  PLACE_OVERWRITES = "place_overwrites",
  PASSIVE_MOBS_SPAWN = "passive_mobs_spawn",
  FIREFLIES_CAN_SPAWN = "fireflies_can_spawn",
  FENCES_CONNECT = "fences_connect",
  NOT_IN_CREATIVE_MENU = "not_in_creative_menu",
  SHEARS_DO_SILK_TOUCH = "shears_do_silk_touch",
  SKATEABLE = "skateable",
  CAVE_GEN_REPLACES_SURFACE = "cave_gen_replaces_surface",
  CAVES_CUT_THROUGH = "caves_cut_through",
  CAN_HANG_OFF = "can_hang_off",
  OVERRIDE_STEPSOUND = "override_stepsound",
  CHAINLINK_FENCES_CONNECT = "chainlink_fences_connect",
  PREVENT_MOB_SPAWNS = "prevent_mob_spawns",
  PLANTABLE_IN_JAR = "plantable_in_jar",
  INFINITE_BURN = "infinite_burn",
  BOAT_BREAKS = "boat_breaks",
  EXTENDS_MOTION_SENSOR_RANGE = "extends_motion_sensor_range",
  INSTANT_PICKUP = "instant_pickup",
  SHEEPS_FAVOURITE_BLOCK = "sheeps_favourite_block",
  PIGS_FAVOURITE_BLOCK = "pigs_favourite_block",
  NETHER_MOBS_SPAWN = "nether_mobs_spawn",
  PISTON_CRUSHING = "piston_crushing",
}

export enum DropCause {
  WORLD = "WORLD",
  PROPER_TOOL = "PROPER_TOOL",
  SILK_TOUCH = "SILK_TOUCH",
  PICK_BLOCK = "PICK_BLOCK",
  IMPROPER_TOOL = "IMPROPER_TOOL",
  EXPLOSION = "EXPLOSION",
  PISTON_CRUSH = "PISTON_CRUSH",
}