import { writable } from "svelte/store";
import {
    BlockSound,
    BlockTag,
    DropCause,
    Material,
    MinecraftBlocks,
    type CompiledBlock,
    type Face,
} from "./business/types";

export const missingTexure =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAKklEQVQokWO0tA9lwAZevXiAVZwJqygeMKqBGMCCK7zFJBSoY8OoBmIAAC/hBqHyKo3BAAAAAElFTkSuQmCC";

const defaultFaces: Record<Face, string> = {
    top: missingTexure,
    bottom: missingTexure,
    north: missingTexure,
    south: missingTexure,
    east: missingTexure,
    west: missingTexure,
};

const stored = localStorage.getItem("formData");

export const formData = writable<CompiledBlock>(
    stored
        ? JSON.parse(stored)
        : {
              meta: {
                  author: "@Garkatron",
                  object_type: "BLOCK",
                  format_version: 1,
              },
              data: {
                  name: "",
                  tags: [BlockTag.MINEABLE_BY_PICKAXE],
                  immovable: false,
                  unbreakable: false,
                  resistance: 0,
                  slipperiness: 0.6,
                  hardness: 0,
                  material: Material.Stone,
                  luminance: 0,
              },
              textures: {
                  encoding: "base64",
                  faces: {
                      ...defaultFaces,
                  },
              },
              events: {
                  on_break: {
                      drop_itself: true,
                      drops: [
                          {
                              item: 0,
                              cause: DropCause.PROPER_TOOL,
                              chance: 0,
                          },
                      ],
                  },
              },
              sounds: {
                  sound: BlockSound.STONE,
              },
              recipe: {
                  enable_workbench: false,
                  enable_furnace: false,
                  furnace: {
                      out_item_id: MinecraftBlocks.STONE,
                      output_amount: 0,
                  },
                  workbench: {
                      pattern: [
                          ["X", "X", "X"],
                          ["X", "X", "X"],
                          ["X", "X", "X"],
                      ],
                      symbols: [{ X: MinecraftBlocks.STONE }],
                      output_amount: 0
                  },
              },
              lang: {
                  key: "",
                  locales: {},
              },
              flammability: {
                  chance_to_catch_fire: 0,
                  change_to_degrade: 0,
              },
              render: {
                  is_cube_shaped: true,
                  is_solid_render: true,
              },
              physics: {
                  is_collidable: true,
              },
          }
);

formData.subscribe((v) => {
    localStorage.setItem("formData", JSON.stringify(v));
});
