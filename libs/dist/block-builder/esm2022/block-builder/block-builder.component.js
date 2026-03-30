import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/drag-drop";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function BlockBuilderComponent_For_5_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const key_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", key_r4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(key_r4);
} }
function BlockBuilderComponent_For_5_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "span", 6);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 7);
    i0.ɵɵlistener("ngModelChange", function BlockBuilderComponent_For_5_Template_select_ngModelChange_3_listener($event) { const block_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateBlockKey(block_r2.id, $event)); });
    i0.ɵɵrepeaterCreate(4, BlockBuilderComponent_For_5_For_5_Template, 2, 2, "option", 8, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 9);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 4);
    i0.ɵɵlistener("click", function BlockBuilderComponent_For_5_Template_button_click_8_listener() { const block_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.removeBlock(block_r2.id)); });
    i0.ɵɵtext(9, "Delete");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const block_r2 = ctx.$implicit;
    const $index_r5 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("builder-item--active", ctx_r2.isChallengeActive(block_r2.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Block #", $index_r5 + 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", block_r2.key);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.availableKeys());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.getValue(block_r2.key));
} }
export class BlockBuilderComponent {
    data = input({}, ...(ngDevMode ? [{ debugName: "data" }] : []));
    flatEntries = computed(() => Object.entries(this.data()).filter(([, value]) => !this.isNestedObject(value)), ...(ngDevMode ? [{ debugName: "flatEntries" }] : []));
    availableKeys = computed(() => this.flatEntries().map(([key]) => key), ...(ngDevMode ? [{ debugName: "availableKeys" }] : []));
    flatEntryMap = computed(() => new Map(this.flatEntries()), ...(ngDevMode ? [{ debugName: "flatEntryMap" }] : []));
    blocks = signal([], ...(ngDevMode ? [{ debugName: "blocks" }] : []));
    activeChallengeBlockId = signal(null, ...(ngDevMode ? [{ debugName: "activeChallengeBlockId" }] : []));
    challengeTimerId = null;
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
        this.startChallengeTimer();
    }
    ngOnDestroy() {
        this.clearChallengeTimer();
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
        this.restartChallengeTimerIfNeeded();
    }
    removeBlock(id) {
        this.blocks.update((current) => current.filter((block) => block.id !== id));
        if (this.activeChallengeBlockId() === id) {
            this.activeChallengeBlockId.set(null);
            this.startChallengeTimer();
        }
    }
    updateBlockKey(id, newKey) {
        let changedChallengeBlock = false;
        this.blocks.update((current) => current.map((block) => {
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
        }));
        if (changedChallengeBlock) {
            this.activeChallengeBlockId.set(null);
            this.startChallengeTimer();
        }
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
    isChallengeActive(blockId) {
        return this.activeChallengeBlockId() === blockId;
    }
    startChallengeTimer() {
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
    restartChallengeTimerIfNeeded() {
        if (!this.activeChallengeBlockId()) {
            this.startChallengeTimer();
        }
    }
    clearChallengeTimer() {
        if (this.challengeTimerId) {
            clearTimeout(this.challengeTimerId);
            this.challengeTimerId = null;
        }
    }
    isNestedObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }
    static ɵfac = function BlockBuilderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BlockBuilderComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BlockBuilderComponent, selectors: [["app-block-builder"]], inputs: { data: [1, "data"] }, decls: 8, vars: 1, consts: [[1, "builder"], [1, "builder-hint"], ["cdkDropList", "", 1, "builder-list", 3, "cdkDropListDropped", "cdkDropListData"], ["cdkDrag", "", 1, "builder-item", 3, "builder-item--active"], ["type", "button", 3, "click"], ["cdkDrag", "", 1, "builder-item"], [1, "builder-label"], [3, "ngModelChange", "ngModel"], [3, "value"], [1, "builder-value"]], template: function BlockBuilderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "p", 1);
            i0.ɵɵtext(2, "Every 1 minute one random block is selected. Change its key to complete the challenge.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2);
            i0.ɵɵlistener("cdkDropListDropped", function BlockBuilderComponent_Template_div_cdkDropListDropped_3_listener($event) { return ctx.drop($event); });
            i0.ɵɵrepeaterCreate(4, BlockBuilderComponent_For_5_Template, 10, 5, "div", 3, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "button", 4);
            i0.ɵɵlistener("click", function BlockBuilderComponent_Template_button_click_6_listener() { return ctx.addBlock(); });
            i0.ɵɵtext(7, "Add block");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("cdkDropListData", ctx.blocks());
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.blocks());
        } }, dependencies: [DragDropModule, i1.CdkDropList, i1.CdkDrag, FormsModule, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgModel], styles: [".builder[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px}.builder-hint[_ngcontent-%COMP%]{margin:0;font-size:14px;color:#555}.builder-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px}.builder-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px;border:1px solid #dcdcdc;border-radius:8px;background:#fff;transition:border-color .2s ease,box-shadow .2s ease}.builder-item--active[_ngcontent-%COMP%]{border-color:#f59e0b;box-shadow:0 0 0 3px #f59e0b33}.builder-label[_ngcontent-%COMP%]{min-width:72px;font-weight:600}.builder-value[_ngcontent-%COMP%]{min-width:120px}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlockBuilderComponent, [{
        type: Component,
        args: [{ selector: 'app-block-builder', imports: [DragDropModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"builder\">\n  <p class=\"builder-hint\">Every 1 minute one random block is selected. Change its key to complete the challenge.</p>\n\n  <div class=\"builder-list\" cdkDropList [cdkDropListData]=\"blocks()\" (cdkDropListDropped)=\"drop($event)\">\n    @for (block of blocks(); track block.id) {\n      <div class=\"builder-item\" cdkDrag [class.builder-item--active]=\"isChallengeActive(block.id)\">\n        <span class=\"builder-label\">Block #{{ $index + 1 }}</span>\n\n        <select [ngModel]=\"block.key\" (ngModelChange)=\"updateBlockKey(block.id, $event)\">\n          @for (key of availableKeys(); track key) {\n            <option [value]=\"key\">{{ key }}</option>\n          }\n        </select>\n\n        <span class=\"builder-value\">{{ getValue(block.key) }}</span>\n\n        <button type=\"button\" (click)=\"removeBlock(block.id)\">Delete</button>\n      </div>\n    }\n  </div>\n\n  <button type=\"button\" (click)=\"addBlock()\">Add block</button>\n</div>\n", styles: [".builder{display:flex;flex-direction:column;gap:12px}.builder-hint{margin:0;font-size:14px;color:#555}.builder-list{display:flex;flex-direction:column;gap:12px}.builder-item{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px;border:1px solid #dcdcdc;border-radius:8px;background:#fff;transition:border-color .2s ease,box-shadow .2s ease}.builder-item--active{border-color:#f59e0b;box-shadow:0 0 0 3px #f59e0b33}.builder-label{min-width:72px;font-weight:600}.builder-value{min-width:120px}\n"] }]
    }], () => [], { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BlockBuilderComponent, { className: "BlockBuilderComponent", filePath: "block-builder/block-builder.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=block-builder.component.js.map