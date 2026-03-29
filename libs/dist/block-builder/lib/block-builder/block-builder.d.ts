import { BlockItem } from '../models/block-builder.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
export declare class BlockBuilder {
    readonly data: import("@angular/core").InputSignal<Record<string, unknown>>;
    readonly flatEntries: import("@angular/core").Signal<[string, unknown][]>;
    readonly availableKeys: import("@angular/core").Signal<string[]>;
    readonly flatEntryMap: import("@angular/core").Signal<Map<string, unknown>>;
    readonly blocks: import("@angular/core").WritableSignal<BlockItem[]>;
    constructor();
    getValue(key: string): unknown;
    addBlock(): void;
    removeBlock(id: string): void;
    updateBlockKey(id: string, newKey: string): void;
    drop(event: CdkDragDrop<BlockItem[]>): void;
    private isNestedObject;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlockBuilder, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BlockBuilder, "lib-block-builder", never, { "data": { "alias": "data"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
