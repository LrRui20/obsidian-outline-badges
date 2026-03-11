"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => OutlineLevels
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var OutlineLevels = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.currentFile = null;
    this.styleLink = null;
  }
  async onload() {
    this.loadStyles();
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", (leaf) => {
        if ((leaf == null ? void 0 : leaf.view) instanceof import_obsidian.MarkdownView) {
          this.currentFile = leaf.view.file;
          setTimeout(() => this.decorateOutline(), 100);
        }
      })
    );
    this.registerEvent(
      this.app.workspace.on("editor-change", (editor, view) => {
        if (view instanceof import_obsidian.MarkdownView && view.file) {
          this.currentFile = view.file;
          setTimeout(() => this.decorateOutline(), 100);
        }
      })
    );
    this.registerEvent(
      this.app.vault.on("modify", (file) => {
        if (file === this.currentFile) {
          setTimeout(() => this.decorateOutline(), 100);
        }
      })
    );
    this.app.workspace.onLayoutReady(() => {
      setTimeout(() => this.decorateOutline(), 500);
    });
  }
  async decorateOutline() {
    if (!this.currentFile) {
      this.currentFile = this.app.workspace.getActiveFile();
    }
    if (!this.currentFile) return;
    const headings = await this.getHeadings(this.currentFile);
    if (headings.length === 0) return;
    const outlineEl = document.querySelector('.workspace-leaf-content[data-type="outline"]');
    if (!outlineEl) return;
    const treeItems = outlineEl.querySelectorAll(".tree-item");
    treeItems.forEach((item, index) => {
      var _a;
      const self = item.querySelector(".tree-item-self");
      if (!self) return;
      const headingEl = self;
      const existingBadge = headingEl.querySelector(".outline-level-badge");
      if (existingBadge) {
        existingBadge.remove();
      }
      const level = (_a = headings[index]) == null ? void 0 : _a.level;
      if (level) {
        const badge = document.createElement("span");
        badge.className = "outline-level-badge";
        badge.textContent = "H" + level;
        badge.dataset.level = level.toString();
        headingEl.insertBefore(badge, headingEl.firstChild);
      }
    });
  }
  async getHeadings(file) {
    const content = await this.app.vault.read(file);
    const headings = [];
    const lines = content.split("\n");
    for (const line of lines) {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        headings.push({
          level: match[1].length,
          text: match[2].trim()
        });
      }
    }
    return headings;
  }
  onunload() {
    if (this.styleLink) {
      this.styleLink.remove();
    }
  }
  loadStyles() {
    this.styleLink = document.createElement("link");
    this.styleLink.rel = "stylesheet";
    this.styleLink.href = this.app.vault.configDir + "/plugins/obsidian-outline-levels/styles.css";
    document.head.appendChild(this.styleLink);
  }
};
//# sourceMappingURL=main.js.map
