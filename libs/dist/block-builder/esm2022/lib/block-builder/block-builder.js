import { Component, computed, effect, input, signal } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
export class BlockBuilder {
    data = input({}, ...(ngDevMode ? [{ debugName: "data" }] : []));
    flatEntries = computed(() => Object.entries(this.data()).filter(([, value]) => !this.isNestedObject(value)), ...(ngDevMode ? [{ debugName: "flatEntries" }] : []));
    availableKeys = computed(() => this.flatEntries().map(([key]) => key), ...(ngDevMode ? [{ debugName: "availableKeys" }] : []));
    flatEntryMap = computed(() => new Map(this.flatEntries()), ...(ngDevMode ? [{ debugName: "flatEntryMap" }] : []));
    blocks = signal([], ...(ngDevMode ? [{ debugName: "blocks" }] : []));
    constructor() {
        effect(() => {
            const keys = this.availableKeys();
            if (!keys.length || this.blocks().length) {
                return;
            }
            this.blocks.set(keys.map((key) => ({
                id: crypto.randomUUID(),
                key,
            })));
        });
    }
    getValue(key) {
        return this.flatEntryMap().get(key) ?? '';
    }
    addBlock() {
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
    removeBlock(id) {
        this.blocks.update((current) => current.filter((block) => block.id !== id));
    }
    updateBlockKey(id, newKey) {
        this.blocks.update((current) => current.map((block) => block.id === id
            ? {
                ...block,
                key: newKey,
            }
            : block));
    }
    drop(event) {
        if (event.previousIndex === event.currentIndex) {
            return;
        }
        this.blocks.update((current) => {
            const next = [...current];
            moveItemInArray(next, event.previousIndex, event.currentIndex);
            return next;
        });
    }
    isNestedObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }
    static ɵfac = function BlockBuilder_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BlockBuilder)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BlockBuilder, selectors: [["lib-block-builder"]], inputs: { data: [1, "data"] }, decls: 2, vars: 0, template: function BlockBuilder_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "p");
            i0.ɵɵtext(1, "BlockBuilder works!");
            i0.ɵɵdomElementEnd();
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlockBuilder, [{
        type: Component,
        args: [{ selector: 'lib-block-builder', imports: [], template: "<p>BlockBuilder works!</p>\n" }]
    }], () => [], { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BlockBuilder, { className: "BlockBuilder", filePath: "lib/block-builder/block-builder.ts", lineNumber: 11 }); })();
//# sourceMappingURL=block-builder.js.map