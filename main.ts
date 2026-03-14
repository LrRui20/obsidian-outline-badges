import { Plugin, TFile, MarkdownView } from 'obsidian';

interface Heading {
  level: number;
  text: string;
}

export default class OutlineLevelsBadges extends Plugin {
  private currentFile: TFile | null = null;
  private styleLink: HTMLLinkElement | null = null;

  async onload() {
    this.loadStyles();
    this.registerEvent(
      this.app.workspace.on('active-leaf-change', (leaf) => {
        if (leaf?.view instanceof MarkdownView) {
          this.currentFile = leaf.view.file;
          setTimeout(() => this.decorateOutline(), 100);
        }
      })
    );

    this.registerEvent(
      this.app.workspace.on('editor-change', (editor, view) => {
        if (view instanceof MarkdownView && view.file) {
          this.currentFile = view.file;
          setTimeout(() => this.decorateOutline(), 100);
        }
      })
    );

    this.registerEvent(
      this.app.vault.on('modify', (file) => {
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

    const treeItems = outlineEl.querySelectorAll('.tree-item');
    
    treeItems.forEach((item, index) => {
      const self = item.querySelector('.tree-item-self');
      if (!self) return;

      const headingEl = self as HTMLElement;
      const existingBadge = headingEl.querySelector('.outline-level-badge');
      if (existingBadge) {
        existingBadge.remove();
      }

      const level = headings[index]?.level;
      if (level) {
        const badge = document.createElement('span');
        badge.className = 'outline-level-badge';
        badge.textContent = 'H' + level;
        badge.dataset.level = level.toString();
        headingEl.insertBefore(badge, headingEl.firstChild);
      }
    });
  }

  async getHeadings(file: TFile): Promise<Heading[]> {
    const content = await this.app.vault.read(file);
    const headings: Heading[] = [];

    const lines = content.split('\n');
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
    const pluginId = this.manifest.id;
    this.styleLink = document.createElement('link');
    this.styleLink.rel = 'stylesheet';
    this.styleLink.href = this.app.vault.configDir + '/plugins/' + pluginId + '/styles.css';
    document.head.appendChild(this.styleLink);
  }
}
