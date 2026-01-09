import { writable } from "svelte/store";
import { BlockSound, BlockTag, Material, type CompiledBlock, type Face } from "./business/types";

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

export const formData = writable<CompiledBlock>({
    meta: { author: "@Garkatron", object_type: "BLOCK", format_version: 1 },
    data: {
        name: "",
        tags: [BlockTag.MINEABLE_BY_PICKAXE],
        immovable: false,
        unbreakable: false,
        resistance: 0,
        slipperiness: 0,
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
        break: {
            drop_itself: false,
            drops: [],
        },
    },
    sounds: {
        sound: BlockSound.STONE,
    },
    recipe: {
        enable_workbench: false,
        enable_furnace: false,
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
        is_cube_shaped: false,
        is_solid_render: false,
    },
    physics: {
        is_collidable: false,
    },
});
