import { Component, computed, effect, input, signal } from '@angular/core';
import { BlockItem } from '../models/block-builder.model';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-block-builder',
  imports: [DragDropModule, FormsModule],
  templateUrl: './block-builder.component.html',
  styleUrl: './block-builder.component.scss',
})
export class BlockBuilderComponent {
  readonly data = input<Record<string, unknown>>({});

  readonly flatEntries = computed(() => Object.entries(this.data()).filter(([, value]) => !this.isNestedObject(value)));

  readonly availableKeys = computed(() => this.flatEntries().map(([key]) => key));

  readonly flatEntryMap = computed(() => new Map(this.flatEntries()));

  readonly blocks = signal<BlockItem[]>([]);

  constructor() {
    effect(() => {
      const keys = this.availableKeys();

      if (!keys.length || this.blocks().length) {
        return;
      }

      this.blocks.set(
        keys.map((key) => ({
          id: crypto.randomUUID(),
          key,
        })),
      );
    });
  }

  getValue(key: string): unknown {
    return this.flatEntryMap().get(key) ?? '';
  }

  addBlock(): void {
    const firstKey = this.availableKeys()[0];

    if (!firstKey) {
      return;
    }

    this.blocks.update((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        key: firstKey,
      },
    ]);
  }

  removeBlock(id: string): void {
    this.blocks.update((current) => current.filter((block) => block.id !== id));
  }

  updateBlockKey(id: string, newKey: string): void {
    this.blocks.update((current) =>
      current.map((block) =>
        block.id === id
          ? {
              ...block,
              key: newKey,
            }
          : block,
      ),
    );
  }

  drop(event: CdkDragDrop<BlockItem[]>): void {
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    this.blocks.update((current) => {
      const next = [...current];
      moveItemInArray(next, event.previousIndex, event.currentIndex);
      return next;
    });
  }

  private isNestedObject(value: unknown): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
}
