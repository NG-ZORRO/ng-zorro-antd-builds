import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Renderer2, Optional, Inject, Input, NgModule } from '@angular/core';
import { __decorate, __metadata } from 'tslib';
import { coerceElement } from '@angular/cdk/coercion';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { InputBoolean } from 'ng-zorro-antd/core/util';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
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
NzNoAnimationDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nzNoAnimation]',
                exportAs: 'nzNoAnimation'
            },] }
];
NzNoAnimationDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
NzNoAnimationDirective.propDecorators = {
    nzNoAnimation: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzNoAnimationDirective.prototype, "nzNoAnimation", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzNoAnimationModule {
}
NzNoAnimationModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzNoAnimationDirective],
                exports: [NzNoAnimationDirective],
                imports: [CommonModule]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzNoAnimationDirective, NzNoAnimationModule };
//# sourceMappingURL=ng-zorro-antd-core-no-animation.js.map
