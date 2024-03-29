import { BidiModule } from '@angular/cdk/bidi';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, TemplateRef, Component, ChangeDetectionStrategy, Input, ContentChildren, NgModule } from '@angular/core';
import { __decorate } from 'tslib';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSpaceItemDirective {
    constructor() { }
}
NzSpaceItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceItemDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzSpaceItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzSpaceItemDirective, selector: "[nzSpaceItem]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzSpaceItem]'
                }]
        }], ctorParameters: function () { return []; } });

const NZ_CONFIG_MODULE_NAME = 'space';
const SPACE_SIZE = {
    small: 8,
    middle: 16,
    large: 24
};
class NzSpaceComponent {
    constructor(nzConfigService, cdr) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzDirection = 'horizontal';
        this.nzSplit = null;
        this.nzWrap = false;
        this.nzSize = 'small';
        this.spaceSize = SPACE_SIZE.small;
        this.destroy$ = new Subject();
    }
    updateSpaceItems() {
        const numberSize = typeof this.nzSize === 'string' ? SPACE_SIZE[this.nzSize] : this.nzSize;
        this.spaceSize = numberSize / (this.nzSplit ? 2 : 1);
        this.cdr.markForCheck();
    }
    ngOnChanges() {
        this.updateSpaceItems();
        this.mergedAlign = this.nzAlign === undefined && this.nzDirection === 'horizontal' ? 'center' : this.nzAlign;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngAfterContentInit() {
        this.updateSpaceItems();
        this.items.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cdr.markForCheck();
        });
    }
}
NzSpaceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzSpaceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSpaceComponent, selector: "nz-space, [nz-space]", inputs: { nzDirection: "nzDirection", nzAlign: "nzAlign", nzSplit: "nzSplit", nzWrap: "nzWrap", nzSize: "nzSize" }, host: { properties: { "class.ant-space-horizontal": "nzDirection === \"horizontal\"", "class.ant-space-vertical": "nzDirection === \"vertical\"", "class.ant-space-align-start": "mergedAlign === \"start\"", "class.ant-space-align-end": "mergedAlign === \"end\"", "class.ant-space-align-center": "mergedAlign === \"center\"", "class.ant-space-align-baseline": "mergedAlign === \"baseline\"", "style.flex-wrap": "nzWrap ? \"wrap\" : null" }, classAttribute: "ant-space" }, queries: [{ propertyName: "items", predicate: NzSpaceItemDirective, read: TemplateRef }], exportAs: ["NzSpace"], usesOnChanges: true, ngImport: i0, template: `
    <ng-content></ng-content>
    <ng-template ngFor let-item let-last="last" let-index="index" [ngForOf]="items">
      <div
        class="ant-space-item"
        [style.margin-bottom.px]="nzDirection === 'vertical' ? (last ? null : spaceSize) : null"
        [style.margin-right.px]="nzDirection === 'horizontal' ? (last ? null : spaceSize) : null"
      >
        <ng-container [ngTemplateOutlet]="item"></ng-container>
      </div>
      <span
        *ngIf="nzSplit && !last"
        class="ant-space-split"
        [style.margin-bottom.px]="nzDirection === 'vertical' ? (last ? null : spaceSize) : null"
        [style.margin-right.px]="nzDirection === 'horizontal' ? (last ? null : spaceSize) : null"
      >
        <ng-template [ngTemplateOutlet]="nzSplit" [ngTemplateOutletContext]="{ $implicit: index }"></ng-template>
      </span>
    </ng-template>
  `, isInline: true, directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean()
], NzSpaceComponent.prototype, "nzWrap", void 0);
__decorate([
    WithConfig()
], NzSpaceComponent.prototype, "nzSize", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-space, [nz-space]',
                    exportAs: 'NzSpace',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-content></ng-content>
    <ng-template ngFor let-item let-last="last" let-index="index" [ngForOf]="items">
      <div
        class="ant-space-item"
        [style.margin-bottom.px]="nzDirection === 'vertical' ? (last ? null : spaceSize) : null"
        [style.margin-right.px]="nzDirection === 'horizontal' ? (last ? null : spaceSize) : null"
      >
        <ng-container [ngTemplateOutlet]="item"></ng-container>
      </div>
      <span
        *ngIf="nzSplit && !last"
        class="ant-space-split"
        [style.margin-bottom.px]="nzDirection === 'vertical' ? (last ? null : spaceSize) : null"
        [style.margin-right.px]="nzDirection === 'horizontal' ? (last ? null : spaceSize) : null"
      >
        <ng-template [ngTemplateOutlet]="nzSplit" [ngTemplateOutletContext]="{ $implicit: index }"></ng-template>
      </span>
    </ng-template>
  `,
                    host: {
                        class: 'ant-space',
                        '[class.ant-space-horizontal]': 'nzDirection === "horizontal"',
                        '[class.ant-space-vertical]': 'nzDirection === "vertical"',
                        '[class.ant-space-align-start]': 'mergedAlign === "start"',
                        '[class.ant-space-align-end]': 'mergedAlign === "end"',
                        '[class.ant-space-align-center]': 'mergedAlign === "center"',
                        '[class.ant-space-align-baseline]': 'mergedAlign === "baseline"',
                        '[style.flex-wrap]': 'nzWrap ? "wrap" : null'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { nzDirection: [{
                type: Input
            }], nzAlign: [{
                type: Input
            }], nzSplit: [{
                type: Input
            }], nzWrap: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], items: [{
                type: ContentChildren,
                args: [NzSpaceItemDirective, { read: TemplateRef }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSpaceModule {
}
NzSpaceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzSpaceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceModule, declarations: [NzSpaceComponent, NzSpaceItemDirective], imports: [BidiModule, CommonModule], exports: [NzSpaceComponent, NzSpaceItemDirective] });
NzSpaceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceModule, imports: [[BidiModule, CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzSpaceComponent, NzSpaceItemDirective],
                    exports: [NzSpaceComponent, NzSpaceItemDirective],
                    imports: [BidiModule, CommonModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzSpaceComponent, NzSpaceItemDirective, NzSpaceModule };
//# sourceMappingURL=ng-zorro-antd-space.mjs.map
