import { ChangeDetectionStrategy, Component, computed, effect, input, OnDestroy, signal } from '@angular/core';
import { BlockItem } from '../models/block-builder.model';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-block-builder',
  imports: [DragDropModule, FormsModule],
  templateUrl: './block-builder.component.html',
  styleUrl: './block-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockBuilderComponent {
  readonly data = input<Record<string, unknown>>({});

  readonly flatEntries = computed(() => Object.entries(this.data()).filter(([, value]) => !this.isNestedObject(value)));

  readonly availableKeys = computed(() => this.flatEntries().map(([key]) => key));

  readonly flatEntryMap = computed(() => new Map(this.flatEntries()));

  readonly blocks = signal<BlockItem[]>([]);

  readonly activeChallengeBlockId = signal<string | null>(null);

  private challengeTimerId: ReturnType<typeof setTimeout> | null = null;

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
    this.startChallengeTimer();
  }

  ngOnDestroy(): void {
    this.clearChallengeTimer();
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

    this.restartChallengeTimerIfNeeded();
  }

  removeBlock(id: string): void {
    this.blocks.update((current) => current.filter((block) => block.id !== id));

    if (this.activeChallengeBlockId() === id) {
      this.activeChallengeBlockId.set(null);
      this.startChallengeTimer();
    }
  }

  updateBlockKey(id: string, newKey: string): void {
    let changedChallengeBlock = false;

    this.blocks.update((current) =>
      current.map((block) => {
        if (block.id !== id) {
          return block;
        }

        if (this.activeChallengeBlockId() === id && block.key !== newKey) {
          changedChallengeBlock = true;
        }

        return {
          ...block,
          key: newKey,
        };
      }),
    );

    if (changedChallengeBlock) {
      this.activeChallengeBlockId.set(null);
      this.startChallengeTimer();
    }
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

  isChallengeActive(blockId: string): boolean {
    return this.activeChallengeBlockId() === blockId;
  }

  private startChallengeTimer(): void {
    this.clearChallengeTimer();

    if (!this.blocks().length || this.activeChallengeBlockId()) {
      return;
    }

    this.challengeTimerId = setTimeout(() => {
      const currentBlocks = this.blocks();

      if (!currentBlocks.length) {
        return;
      }

      const randomIndex = Math.floor(Math.random() * currentBlocks.length);
      const randomBlock = currentBlocks[randomIndex];

      this.activeChallengeBlockId.set(randomBlock.id);
      this.challengeTimerId = null;
    }, 5000);
  }

  private restartChallengeTimerIfNeeded(): void {
    if (!this.activeChallengeBlockId()) {
      this.startChallengeTimer();
    }
  }

  private clearChallengeTimer(): void {
    if (this.challengeTimerId) {
      clearTimeout(this.challengeTimerId);
      this.challengeTimerId = null;
    }
  }

  private isNestedObject(value: unknown): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
}
