import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Optional, Inject, Input, NgModule } from '@angular/core';
import { __decorate } from 'tslib';
import { coerceElement } from '@angular/cdk/coercion';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { InputBoolean } from 'ng-zorro-antd/core/util';

const DISABLED_CLASSNAME = 'nz-animate-disabled';
class NzNoAnimationDirective {
    constructor(element, renderer, animationType) {
        this.element = element;
        this.renderer = renderer;
        this.animationType = animationType;
        this.nzNoAnimation = false;
    }
    ngOnChanges() {
        this.updateClass();
    }
    ngAfterViewInit() {
        this.updateClass();
    }
    updateClass() {
        const element = coerceElement(this.element);
        if (!element) {
            return;
        }
        if (this.nzNoAnimation || this.animationType === 'NoopAnimations') {
            this.renderer.addClass(element, DISABLED_CLASSNAME);
        }
        else {
            this.renderer.removeClass(element, DISABLED_CLASSNAME);
        }
    }
}
NzNoAnimationDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNoAnimationDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzNoAnimationDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: { nzNoAnimation: "nzNoAnimation" }, exportAs: ["nzNoAnimation"], usesOnChanges: true, ngImport: i0 });
__decorate([
    InputBoolean()
], NzNoAnimationDirective.prototype, "nzNoAnimation", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNoAnimationDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzNoAnimation]',
                    exportAs: 'nzNoAnimation'
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [ANIMATION_MODULE_TYPE]
                    }] }];
    }, propDecorators: { nzNoAnimation: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzNoAnimationModule {
}
NzNoAnimationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNoAnimationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzNoAnimationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNoAnimationModule, declarations: [NzNoAnimationDirective], imports: [CommonModule], exports: [NzNoAnimationDirective] });
NzNoAnimationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNoAnimationModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNoAnimationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzNoAnimationDirective],
                    exports: [NzNoAnimationDirective],
                    imports: [CommonModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzNoAnimationDirective, NzNoAnimationModule };
//# sourceMappingURL=ng-zorro-antd-core-no-animation.mjs.map
