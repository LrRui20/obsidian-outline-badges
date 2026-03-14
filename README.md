# Obsidian Outline Badges

English | [中文](./README-CN.md)

Add H1-H6 level badges to the Obsidian Outline panel.

![Obsidian](https://img.shields.io/badge/Obsidian-0.15.0+-purple?style=flat&logo=obsidian)
![GitHub release](https://img.shields.io/github/v/release/LrRui20/obsidian-outline-badges)
![License](https://img.shields.io/github/license/LrRui20/obsidian-outline-badges)

## Preview

![Default Theme](./screenshots/obsidian-outline-badges_without-theme.png)

## Features

- Display H1-H6 badges in the Outline panel
- Badges are displayed before each heading
- Follows your theme's colors
  - ![With Theme](./screenshots/obsidian-outline-badges.png)

## Installation

1. Download `main.js`, `styles.css`, and `manifest.json` from [GitHub Releases](https://github.com/LrRui20/obsidian-outline-levels-badges/releases)
2. Create a folder named `obsidian-outline-levels-badges` in your vault's `/.obsidian/plugins/` directory
3. Place the three downloaded files into the `obsidian-outline-levels-badges` folder
4. Enable the plugin in Settings → Community Plugins

## Customization

Edit `styles.css` to customize the badge appearance:

```css
/* Badge base style */
.outline-level-badge {
  min-width: 20px;      /* Badge width */
  height: 18px;          /* Badge height */
  margin-right: 4px;     /* Spacing from heading */
  padding: 0 1px;        /* Internal padding */
  border-radius: 3px;    /* Corner radius */
  font-size: 10px;      /* Font size */
  font-weight: 600;     /* Font weight */
  color: var(--text-muted);       /* Text color */
  background: var(--background-secondary); /* Background */
  border: 1px solid var(--border-color);  /* Border color */
}

```

## Build from Source

If you want to modify the code and build the plugin yourself:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### Build Steps

```bash
# 1. Clone the repository
git clone https://github.com/LrRui20/obsidian-outline-levels-badges.git
cd obsidian-outline-levels-badges

# 2. Install dependencies
npm install

# 3. Build the plugin
npm run build
```

After building, `main.js` will be generated in the project root.

### Project Structure

```
obsidian-outline-levels-badges/
├── main.ts          # Plugin source code
├── styles.css       # Badge styles
├── manifest.json    # Plugin manifest
├── esbuild.config.mjs  # Build configuration
└── tsconfig.json    # TypeScript configuration
```

## Or use CSS Snippets (Deprecated)

I have deprecated the CSS snippets approach as it cannot correctly read the outline levels. Using the plugin version is recommended. If you still want to use snippets:

1. Create a new file `outline-badges.css` in your vault's `/.obsidian/snippets/` directory
2. Copy and paste the following CSS code into the new file:

```css
 /* Obsidian Outline Heading Level Badges */
.workspace-leaf-content[data-type="outline"] .tree-item-self {
  position: relative;
}

/* Use ::before pseudo-element to display badges */
.workspace-leaf-content[data-type="outline"] .tree-item-self::before {
  content: "";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 18px;
  margin-right: 4px;
  padding: 0.5px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  font-family: var(--font-text);
  color: var(--text-muted);
  background: var(--background-secondary);
  border: 1px solid var(--border-color);
  position: relative;
  top: 1px;
}

/* Infer level based on margin-inline-start */
.workspace-leaf-content[data-type="outline"] .tree-item-self[style*="padding-inline-start: 24px"]::before {
  content: "H1";
}

.workspace-leaf-content[data-type="outline"] .tree-item-self[style*="padding-inline-start: 41px"]::before {
  content: "H2";
}

.workspace-leaf-content[data-type="outline"] .tree-item-self[style*="padding-inline-start: 58px"]::before {
  content: "H3";
}

.workspace-leaf-content[data-type="outline"] .tree-item-self[style*="padding-inline-start: 75px"]::before {
  content: "H4";
}

.workspace-leaf-content[data-type="outline"] .tree-item-self[style*="padding-inline-start: 92px"]::before {
  content: "H5";
}

.workspace-leaf-content[data-type="outline"] .tree-item-self[style*="padding-inline-start: 109px"]::before {
  content: "H6";
}

/* If above doesn't work, try more general selectors */
.workspace-leaf-content[data-type="outline"] .tree-item > .tree-item-self::before {
  content: "H1";
}

.workspace-leaf-content[data-type="outline"] .tree-item > .tree-item-children > .tree-item > .tree-item-self::before {
  content: "H2";
}

.workspace-leaf-content[data-type="outline"] .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-self::before {
  content: "H3";
}

.workspace-leaf-content[data-type="outline"] .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-self::before {
  content: "H4";
}

.workspace-leaf-content[data-type="outline"] .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-self::before {
  content: "H5";
}

.workspace-leaf-content[data-type="outline"] .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-self::before {
  content: "H6";
}
```
3. Enable the `outline-badges.css` snippet in Settings → Appearance → CSS Snippets

## License

MIT License - see [LICENSE](LICENSE)
