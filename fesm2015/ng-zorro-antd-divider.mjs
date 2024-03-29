import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { BidiModule } from '@angular/cdk/bidi';

class NzDividerComponent {
    constructor() {
        this.nzType = 'horizontal';
        this.nzOrientation = 'center';
        this.nzDashed = false;
        this.nzPlain = false;
    }
}
NzDividerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzDividerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzDividerComponent, selector: "nz-divider", inputs: { nzText: "nzText", nzType: "nzType", nzOrientation: "nzOrientation", nzDashed: "nzDashed", nzPlain: "nzPlain" }, host: { properties: { "class.ant-divider-horizontal": "nzType === 'horizontal'", "class.ant-divider-vertical": "nzType === 'vertical'", "class.ant-divider-with-text": "nzText", "class.ant-divider-plain": "nzPlain", "class.ant-divider-with-text-left": "nzText && nzOrientation === 'left'", "class.ant-divider-with-text-right": "nzText && nzOrientation === 'right'", "class.ant-divider-with-text-center": "nzText && nzOrientation === 'center'", "class.ant-divider-dashed": "nzDashed" }, classAttribute: "ant-divider" }, exportAs: ["nzDivider"], ngImport: i0, template: `
    <span *ngIf="nzText" class="ant-divider-inner-text">
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
    </span>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzDividerComponent.prototype, "nzDashed", void 0);
__decorate([
    InputBoolean()
], NzDividerComponent.prototype, "nzPlain", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDividerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-divider',
                    exportAs: 'nzDivider',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <span *ngIf="nzText" class="ant-divider-inner-text">
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
    </span>
  `,
                    host: {
                        class: 'ant-divider',
                        '[class.ant-divider-horizontal]': `nzType === 'horizontal'`,
                        '[class.ant-divider-vertical]': `nzType === 'vertical'`,
                        '[class.ant-divider-with-text]': `nzText`,
                        '[class.ant-divider-plain]': `nzPlain`,
                        '[class.ant-divider-with-text-left]': `nzText && nzOrientation === 'left'`,
                        '[class.ant-divider-with-text-right]': `nzText && nzOrientation === 'right'`,
                        '[class.ant-divider-with-text-center]': `nzText && nzOrientation === 'center'`,
                        '[class.ant-divider-dashed]': `nzDashed`
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzText: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzOrientation: [{
                type: Input
            }], nzDashed: [{
                type: Input
            }], nzPlain: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDividerModule {
}
NzDividerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDividerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzDividerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDividerModule, declarations: [NzDividerComponent], imports: [BidiModule, CommonModule, NzOutletModule], exports: [NzDividerComponent] });
NzDividerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDividerModule, imports: [[BidiModule, CommonModule, NzOutletModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDividerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, NzOutletModule],
                    declarations: [NzDividerComponent],
                    exports: [NzDividerComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzDividerComponent, NzDividerModule };
//# sourceMappingURL=ng-zorro-antd-divider.mjs.map
