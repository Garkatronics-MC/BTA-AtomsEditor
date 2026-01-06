import { stringify } from "smol-toml";

// Parsear TOML a objeto
// const config = TOML.parse(fileContent);

export interface IBounds {
    minY: number;
    minX: number;
    minZ: number;
    maxX: number;
    maxY: number;
    maxZ: number;
}

export interface ITranslation {
    name: string;
    desc: string;
}

export class BlockBuilder {
    private block: Record<string, any> = {};
    private lang: Record<string, ITranslation> = {};

    constructor() {
        this.block = {};
        this.lang = {};
    }

    public build() {
        this.block.header = { version: 0 };
        return this;
    }

    public base64() {
        this.block.base64 = true;
        return this;
    }

    public name(name: string = "default") {
        this.block.name = name;
        return this;
    }

    public author(author: string = "default") {
        this.block.author = author;
        return this;
    }

    public iscubeshaped(b: boolean = true) {
        this.block.iscubeshaped = b;
        return this;
    }

    public material(material: string = "stone") {
        this.block.material = material;
        return this;
    }

    public bounds(
        bounds: IBounds = {
            minX: 0.0,
            minY: 0.0,
            minZ: 0.0,
            maxX: 1.0,
            maxY: 1.0,
            maxZ: 1.0,
        }
    ) {
        this.block.bounds = bounds;
        return this;
    }

    public langkey(langkey: string) {
        this.block.langkey = langkey;
        return this;
    }

    public tags(tags: string[]) {
        this.block.tags = tags;
        return this;
    }

    public issolidrender(b: boolean = true) {
        this.block.issolidrender = b;
        return this;
    }

    public iscollidable(b: boolean = true) {
        this.block.iscollidable = b;
        return this;
    }

    public dropitemid(dropitemid: string = "minecraft:block/stone") {
        this.block.dropitemid = dropitemid;
        return this;
    }

    public textures(textures: [string, string][]) {
        this.block.textures = textures;
        return this;
    }

    public addLang(id: string, translation: ITranslation) {
        this.lang[id] = translation;
        return this;
    }

    public toObject() {
        return {
            ...this.block,
            lang: this.lang,
        };
    }

    public toTOML(): string {
        const langJson: Record<string, Record<string, string>> = {};
        for (const key in this.lang) {
            langJson[key] = {
                name: this.lang[key].name,
                desc: this.lang[key].desc,
            };
        }

        return stringify({
            ...this.block,
            lang: langJson,
        });
    }
}

export function downloadBlock(name: string, block: BlockBuilder) {
    const stringdata = block.toTOML();


    const blob = new Blob([stringdata], { type: "text/plain" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name}.atom.toml`;
    a.click();

    URL.revokeObjectURL(a.href);
}

