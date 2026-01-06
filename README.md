# BTA Atoms - Block Editor Tutorial

## Overview
BTA Atoms is a visual editor that allows you to create custom blocks for Minecraft without writing code manually. This tutorial will guide you through the entire process.

---

## Getting Started

### 1. Access the Editor
Navigate to the BTA Atoms Editor:
👉 **https://garkatronics-mc.github.io/BTA-AtomsEditor/**

![BTA Atoms Editor Interface](https://github.com/user-attachments/assets/70f359ae-927f-46bf-bc98-c1b48e66df25)

---

## Creating Your Block

### 2. Configure Block Properties
Use the left toolbar to set up your block's basic properties:

![Toolbar Configuration](https://github.com/user-attachments/assets/c00acc98-fb99-46af-82be-ac5d73e71ffe)

**Available Options:**
- **Name**: Internal identifier for your block
- **Language Key**: Translation key (e.g., `atom`)
- **Author**: Your name or username
- **Cube Shaped**: Whether the block is a full cube
- **Solid Render**: Enables solid rendering
- **Collidable**: Whether players can collide with it
---

### 3. Apply Textures
Select textures for each face of your block (top, bottom, sides):

![Texture Selection](https://github.com/user-attachments/assets/74e40e7a-3444-4009-af3d-796c283b0549)

**Texture Options:**
- Upload custom 16x16 PNG images
- Use base64-encoded textures
- Apply different textures per face (top, bottom, north, south, east, west)

---

### 4. Choose a Material
Select the material type that determines block behavior:

![Material Selection](https://github.com/user-attachments/assets/e63886ef-8d73-4331-9edf-197f272872fc)

**Material Types Affect:**
- Mining speed
- Required tools
- Sound effects
- Block hardness

---

### 5. Add Translations
Define how your block appears in different languages:

![Translation Key](https://github.com/user-attachments/assets/c9099106-038e-4234-91f3-8bf3da32a747)

![Translation Values](https://github.com/user-attachments/assets/e1ca34e2-025d-4605-aa1f-a3e828a0b708)

**Translation Fields:**
- **Name**: Display name (e.g., "Atom")
- **Description**: Block description (e.g., "Testing block")
- **Language**: Target language code (e.g., `en_US`)

---

### 6. Download Your Block

Once everything is configured, download your block definition:

![Download Button](https://github.com/user-attachments/assets/d1770903-5b19-43d5-87f8-eddb0a1e5b73)

![Download Confirmation](https://github.com/user-attachments/assets/01d41be6-8f82-45f2-ab5c-f2826cc00e24)

---

## Example Output

Here's what a complete block definition looks like:

```toml
name = "Atom"
base64 = true
langkey = "atom"
author = "Garkatron"
iscubeshaped = true
issolidrender = true
iscollidable = true
dropitemid = "minecraft:block/stone"

textures = [
    ["top", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASUlEQVQ4jWNkYGD4z0ABYKJEMwMDAwMLjPH/P2kOYWRkpI4LRg0YdAasNTbGyibJBcRqxGlA8NmzJBmCNQyCz54l2gBGhoHOjQDibw1Fa9elgQAAAABJRU5ErkJggg=="],
    ["bottom", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAKklEQVQokWO0tA9lwAZevXiAVZwJqygeMKqBGMCCK7zFJBSoY8OoBmIAAC/hBqHyKo3BAAAAAElFTkSuQmCC"],
    ["west", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAKklEQVQokWO0tA9lwAZevXiAVZwJqygeMKqBGMCCK7zFJBSoY8OoBmIAAC/hBqHyKo3BAAAAAElFTkSuQmCC"],
    ["east", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAKklEQVQokWO0tA9lwAZevXiAVZwJqygeMKqBGMCCK7zFJBSoY8OoBmIAAC/hBqHyKo3BAAAAAElFTkSuQmCC"],
    ["north", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAKklEQVQokWO0tA9lwAZevXiAVZwJqygeMKqBGMCCK7zFJBSoY8OoBmIAAC/hBqHyKo3BAAAAAElFTkSuQmCC"],
    ["south", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAKklEQVQokWO0tA9lwAZevXiAVZwJqygeMKqBGMCCK7zFJBSoY8OoBmIAAC/hBqHyKo3BAAAAAElFTkSuQmCC"]
]

[header]
version = 0

[lang.en_US]
name = "Atom"
desc = "Testing block"
```

---

## Installation

1. Save the downloaded `.toml` file
2. Place it in your BTA Atoms blocks directory | ej: `.bta-minecraft/atoms/blocks/`
3. Restart Minecraft
4. Your custom block will be available in-game! **(In creative mode, or through commands)**

---

## Tips & Best Practices

- **Texture Size**: Always use 16x16 pixel textures for compatibility
- **Testing**: Test your blocks in creative mode first
- **Backups**: Keep copies of your TOML files before making changes
- **Naming**: Use clear, descriptive names for easy identification
- **Materials**: Choose materials that match your block's intended behavior

---

## Troubleshooting

**Block doesn't appear in-game:**
- Check that the TOML file is in the correct directory
- Verify all required fields are filled
- Ensure texture encoding is correct

**Textures look wrong:**
- Confirm images are 16x16 pixels
- Check base64 encoding is valid
- Verify face assignments (top, bottom, sides)

---

## Additional Resources

- [BTA Atoms Editor](https://garkatronics-mc.github.io/BTA-AtomsEditor/)
- Report issues on the GitHub repository
- Join the community for support and examples

---

*Created by Garkatron | BTA Atoms*
