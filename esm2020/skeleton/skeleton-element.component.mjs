import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Directive, Input } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NzSkeletonElementDirective {
    constructor() {
        this.nzActive = false;
        this.nzBlock = false;
    }
}
NzSkeletonElementDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzSkeletonElementDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonElementDirective, selector: "nz-skeleton-element", inputs: { nzActive: "nzActive", nzType: "nzType", nzBlock: "nzBlock" }, host: { properties: { "class.ant-skeleton-active": "nzActive", "class.ant-skeleton-block": "nzBlock" }, classAttribute: "ant-skeleton ant-skeleton-element" }, ngImport: i0 });
__decorate([
    InputBoolean()
], NzSkeletonElementDirective.prototype, "nzBlock", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-skeleton-element',
                    host: {
                        class: 'ant-skeleton ant-skeleton-element',
                        '[class.ant-skeleton-active]': 'nzActive',
                        '[class.ant-skeleton-block]': 'nzBlock'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzActive: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzBlock: [{
                type: Input
            }] } });
export class NzSkeletonElementButtonComponent {
    constructor() {
        this.nzShape = 'default';
        this.nzSize = 'default';
    }
}
NzSkeletonElementButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSkeletonElementButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonElementButtonComponent, selector: "nz-skeleton-element[nzType=\"button\"]", inputs: { nzShape: "nzShape", nzSize: "nzSize" }, ngImport: i0, template: `
    <span
      class="ant-skeleton-button"
      [class.ant-skeleton-button-round]="nzShape === 'round'"
      [class.ant-skeleton-button-circle]="nzShape === 'circle'"
      [class.ant-skeleton-button-lg]="nzSize === 'large'"
      [class.ant-skeleton-button-sm]="nzSize === 'small'"
    ></span>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementButtonComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-skeleton-element[nzType="button"]',
                    template: `
    <span
      class="ant-skeleton-button"
      [class.ant-skeleton-button-round]="nzShape === 'round'"
      [class.ant-skeleton-button-circle]="nzShape === 'circle'"
      [class.ant-skeleton-button-lg]="nzSize === 'large'"
      [class.ant-skeleton-button-sm]="nzSize === 'small'"
    ></span>
  `
                }]
        }], propDecorators: { nzShape: [{
                type: Input
            }], nzSize: [{
                type: Input
            }] } });
export class NzSkeletonElementAvatarComponent {
    constructor() {
        this.nzShape = 'circle';
        this.nzSize = 'default';
        this.styleMap = {};
    }
    ngOnChanges(changes) {
        if (changes.nzSize && typeof this.nzSize === 'number') {
            const sideLength = `${this.nzSize}px`;
            this.styleMap = { width: sideLength, height: sideLength, 'line-height': sideLength };
        }
        else {
            this.styleMap = {};
        }
    }
}
NzSkeletonElementAvatarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSkeletonElementAvatarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonElementAvatarComponent, selector: "nz-skeleton-element[nzType=\"avatar\"]", inputs: { nzShape: "nzShape", nzSize: "nzSize" }, usesOnChanges: true, ngImport: i0, template: `
    <span
      class="ant-skeleton-avatar"
      [class.ant-skeleton-avatar-square]="nzShape === 'square'"
      [class.ant-skeleton-avatar-circle]="nzShape === 'circle'"
      [class.ant-skeleton-avatar-lg]="nzSize === 'large'"
      [class.ant-skeleton-avatar-sm]="nzSize === 'small'"
      [ngStyle]="styleMap"
    ></span>
  `, isInline: true, directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementAvatarComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-skeleton-element[nzType="avatar"]',
                    template: `
    <span
      class="ant-skeleton-avatar"
      [class.ant-skeleton-avatar-square]="nzShape === 'square'"
      [class.ant-skeleton-avatar-circle]="nzShape === 'circle'"
      [class.ant-skeleton-avatar-lg]="nzSize === 'large'"
      [class.ant-skeleton-avatar-sm]="nzSize === 'small'"
      [ngStyle]="styleMap"
    ></span>
  `
                }]
        }], propDecorators: { nzShape: [{
                type: Input
            }], nzSize: [{
                type: Input
            }] } });
export class NzSkeletonElementInputComponent {
    constructor() {
        this.nzSize = 'default';
    }
}
NzSkeletonElementInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSkeletonElementInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonElementInputComponent, selector: "nz-skeleton-element[nzType=\"input\"]", inputs: { nzSize: "nzSize" }, ngImport: i0, template: `
    <span
      class="ant-skeleton-input"
      [class.ant-skeleton-input-lg]="nzSize === 'large'"
      [class.ant-skeleton-input-sm]="nzSize === 'small'"
    ></span>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementInputComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-skeleton-element[nzType="input"]',
                    template: `
    <span
      class="ant-skeleton-input"
      [class.ant-skeleton-input-lg]="nzSize === 'large'"
      [class.ant-skeleton-input-sm]="nzSize === 'small'"
    ></span>
  `
                }]
        }], propDecorators: { nzSize: [{
                type: Input
            }] } });
export class NzSkeletonElementImageComponent {
}
NzSkeletonElementImageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementImageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSkeletonElementImageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonElementImageComponent, selector: "nz-skeleton-element[nzType=\"image\"]", ngImport: i0, template: `
    <span class="ant-skeleton-image">
      <svg class="ant-skeleton-image-svg" viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
          class="ant-skeleton-image-path"
        />
      </svg>
    </span>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementImageComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-skeleton-element[nzType="image"]',
                    template: `
    <span class="ant-skeleton-image">
      <svg class="ant-skeleton-image-svg" viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
          class="ant-skeleton-image-path"
        />
      </svg>
    </span>
  `
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24tZWxlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3NrZWxldG9uL3NrZWxldG9uLWVsZW1lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRS9HLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBa0J2RCxNQUFNLE9BQU8sMEJBQTBCO0lBS3JDO1FBSlMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUVWLFlBQU8sR0FBWSxLQUFLLENBQUM7SUFFbkMsQ0FBQzs7dUhBTEwsMEJBQTBCOzJHQUExQiwwQkFBMEI7QUFHWjtJQUFmLFlBQVksRUFBRTsyREFBMEI7MkZBSHZDLDBCQUEwQjtrQkFSdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLG1DQUFtQzt3QkFDMUMsNkJBQTZCLEVBQUUsVUFBVTt3QkFDekMsNEJBQTRCLEVBQUUsU0FBUztxQkFDeEM7aUJBQ0Y7MEVBRVUsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ21CLE9BQU87c0JBQS9CLEtBQUs7O0FBa0JSLE1BQU0sT0FBTyxnQ0FBZ0M7SUFiN0M7UUFjVyxZQUFPLEdBQTBCLFNBQVMsQ0FBQztRQUMzQyxXQUFNLEdBQXlCLFNBQVMsQ0FBQztLQUNuRDs7NkhBSFksZ0NBQWdDO2lIQUFoQyxnQ0FBZ0MsZ0lBVmpDOzs7Ozs7OztHQVFUOzJGQUVVLGdDQUFnQztrQkFiNUMsU0FBUzttQkFBQztvQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFLHNDQUFzQztvQkFDaEQsUUFBUSxFQUFFOzs7Ozs7OztHQVFUO2lCQUNGOzhCQUVVLE9BQU87c0JBQWYsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7O0FBaUJSLE1BQU0sT0FBTyxnQ0FBZ0M7SUFkN0M7UUFlVyxZQUFPLEdBQTBCLFFBQVEsQ0FBQztRQUMxQyxXQUFNLEdBQXlCLFNBQVMsQ0FBQztRQUVsRCxhQUFRLEdBQUcsRUFBRSxDQUFDO0tBVWY7SUFSQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDckQsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUM7U0FDdEY7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzs7NkhBYlUsZ0NBQWdDO2lIQUFoQyxnQ0FBZ0MscUpBWGpDOzs7Ozs7Ozs7R0FTVDsyRkFFVSxnQ0FBZ0M7a0JBZDVDLFNBQVM7bUJBQUM7b0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7aUJBQ0Y7OEJBRVUsT0FBTztzQkFBZixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSzs7QUF5QlIsTUFBTSxPQUFPLCtCQUErQjtJQVg1QztRQVlXLFdBQU0sR0FBd0IsU0FBUyxDQUFDO0tBQ2xEOzs0SEFGWSwrQkFBK0I7Z0hBQS9CLCtCQUErQiwyR0FSaEM7Ozs7OztHQU1UOzJGQUVVLCtCQUErQjtrQkFYM0MsU0FBUzttQkFBQztvQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFLHFDQUFxQztvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7R0FNVDtpQkFDRjs4QkFFVSxNQUFNO3NCQUFkLEtBQUs7O0FBaUJSLE1BQU0sT0FBTywrQkFBK0I7OzRIQUEvQiwrQkFBK0I7Z0hBQS9CLCtCQUErQiw2RUFYaEM7Ozs7Ozs7OztHQVNUOzJGQUVVLCtCQUErQjtrQkFkM0MsU0FBUzttQkFBQztvQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFLHFDQUFxQztvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7XG4gIE56U2tlbGV0b25BdmF0YXJTaGFwZSxcbiAgTnpTa2VsZXRvbkF2YXRhclNpemUsXG4gIE56U2tlbGV0b25CdXR0b25TaGFwZSxcbiAgTnpTa2VsZXRvbkJ1dHRvblNpemUsXG4gIE56U2tlbGV0b25JbnB1dFNpemVcbn0gZnJvbSAnLi9za2VsZXRvbi50eXBlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbnotc2tlbGV0b24tZWxlbWVudCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1za2VsZXRvbiBhbnQtc2tlbGV0b24tZWxlbWVudCcsXG4gICAgJ1tjbGFzcy5hbnQtc2tlbGV0b24tYWN0aXZlXSc6ICduekFjdGl2ZScsXG4gICAgJ1tjbGFzcy5hbnQtc2tlbGV0b24tYmxvY2tdJzogJ256QmxvY2snXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpTa2VsZXRvbkVsZW1lbnREaXJlY3RpdmUge1xuICBASW5wdXQoKSBuekFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBuelR5cGUhOiAnYnV0dG9uJyB8ICdpbnB1dCcgfCAnYXZhdGFyJyB8ICdpbWFnZSc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekJsb2NrOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxufVxuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnbnotc2tlbGV0b24tZWxlbWVudFtuelR5cGU9XCJidXR0b25cIl0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuXG4gICAgICBjbGFzcz1cImFudC1za2VsZXRvbi1idXR0b25cIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1idXR0b24tcm91bmRdPVwibnpTaGFwZSA9PT0gJ3JvdW5kJ1wiXG4gICAgICBbY2xhc3MuYW50LXNrZWxldG9uLWJ1dHRvbi1jaXJjbGVdPVwibnpTaGFwZSA9PT0gJ2NpcmNsZSdcIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1idXR0b24tbGddPVwibnpTaXplID09PSAnbGFyZ2UnXCJcbiAgICAgIFtjbGFzcy5hbnQtc2tlbGV0b24tYnV0dG9uLXNtXT1cIm56U2l6ZSA9PT0gJ3NtYWxsJ1wiXG4gICAgPjwvc3Bhbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelNrZWxldG9uRWxlbWVudEJ1dHRvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG56U2hhcGU6IE56U2tlbGV0b25CdXR0b25TaGFwZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgbnpTaXplOiBOelNrZWxldG9uQnV0dG9uU2l6ZSA9ICdkZWZhdWx0Jztcbn1cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ256LXNrZWxldG9uLWVsZW1lbnRbbnpUeXBlPVwiYXZhdGFyXCJdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhblxuICAgICAgY2xhc3M9XCJhbnQtc2tlbGV0b24tYXZhdGFyXCJcbiAgICAgIFtjbGFzcy5hbnQtc2tlbGV0b24tYXZhdGFyLXNxdWFyZV09XCJuelNoYXBlID09PSAnc3F1YXJlJ1wiXG4gICAgICBbY2xhc3MuYW50LXNrZWxldG9uLWF2YXRhci1jaXJjbGVdPVwibnpTaGFwZSA9PT0gJ2NpcmNsZSdcIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1hdmF0YXItbGddPVwibnpTaXplID09PSAnbGFyZ2UnXCJcbiAgICAgIFtjbGFzcy5hbnQtc2tlbGV0b24tYXZhdGFyLXNtXT1cIm56U2l6ZSA9PT0gJ3NtYWxsJ1wiXG4gICAgICBbbmdTdHlsZV09XCJzdHlsZU1hcFwiXG4gICAgPjwvc3Bhbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelNrZWxldG9uRWxlbWVudEF2YXRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG56U2hhcGU6IE56U2tlbGV0b25BdmF0YXJTaGFwZSA9ICdjaXJjbGUnO1xuICBASW5wdXQoKSBuelNpemU6IE56U2tlbGV0b25BdmF0YXJTaXplID0gJ2RlZmF1bHQnO1xuXG4gIHN0eWxlTWFwID0ge307XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLm56U2l6ZSAmJiB0eXBlb2YgdGhpcy5uelNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICBjb25zdCBzaWRlTGVuZ3RoID0gYCR7dGhpcy5uelNpemV9cHhgO1xuICAgICAgdGhpcy5zdHlsZU1hcCA9IHsgd2lkdGg6IHNpZGVMZW5ndGgsIGhlaWdodDogc2lkZUxlbmd0aCwgJ2xpbmUtaGVpZ2h0Jzogc2lkZUxlbmd0aCB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0eWxlTWFwID0ge307XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICduei1za2VsZXRvbi1lbGVtZW50W256VHlwZT1cImlucHV0XCJdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhblxuICAgICAgY2xhc3M9XCJhbnQtc2tlbGV0b24taW5wdXRcIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1pbnB1dC1sZ109XCJuelNpemUgPT09ICdsYXJnZSdcIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1pbnB1dC1zbV09XCJuelNpemUgPT09ICdzbWFsbCdcIlxuICAgID48L3NwYW4+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpTa2VsZXRvbkVsZW1lbnRJbnB1dENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG56U2l6ZTogTnpTa2VsZXRvbklucHV0U2l6ZSA9ICdkZWZhdWx0Jztcbn1cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ256LXNrZWxldG9uLWVsZW1lbnRbbnpUeXBlPVwiaW1hZ2VcIl0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuIGNsYXNzPVwiYW50LXNrZWxldG9uLWltYWdlXCI+XG4gICAgICA8c3ZnIGNsYXNzPVwiYW50LXNrZWxldG9uLWltYWdlLXN2Z1wiIHZpZXdCb3g9XCIwIDAgMTA5OCAxMDI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGQ9XCJNMzY1LjcxNDI4NiAzMjkuMTQyODU3cTAgNDUuNzE0Mjg2LTMyLjAzNjU3MSA3Ny42Nzc3MTR0LTc3LjY3NzcxNCAzMi4wMzY1NzEtNzcuNjc3NzE0LTMyLjAzNjU3MS0zMi4wMzY1NzEtNzcuNjc3NzE0IDMyLjAzNjU3MS03Ny42Nzc3MTQgNzcuNjc3NzE0LTMyLjAzNjU3MSA3Ny42Nzc3MTQgMzIuMDM2NTcxIDMyLjAzNjU3MSA3Ny42Nzc3MTR6TTk1MC44NTcxNDMgNTQ4LjU3MTQyOWwwIDI1Ni04MDQuNTcxNDI5IDAgMC0xMDkuNzE0Mjg2IDE4Mi44NTcxNDMtMTgyLjg1NzE0MyA5MS40Mjg1NzEgOTEuNDI4NTcxIDI5Mi41NzE0MjktMjkyLjU3MTQyOXpNMTAwNS43MTQyODYgMTQ2LjI4NTcxNGwtOTE0LjI4NTcxNCAwcS03LjQ2MDU3MSAwLTEyLjg3MzE0MyA1LjQxMjU3MXQtNS40MTI1NzEgMTIuODczMTQzbDAgNjk0Ljg1NzE0M3EwIDcuNDYwNTcxIDUuNDEyNTcxIDEyLjg3MzE0M3QxMi44NzMxNDMgNS40MTI1NzFsOTE0LjI4NTcxNCAwcTcuNDYwNTcxIDAgMTIuODczMTQzLTUuNDEyNTcxdDUuNDEyNTcxLTEyLjg3MzE0M2wwLTY5NC44NTcxNDNxMC03LjQ2MDU3MS01LjQxMjU3MS0xMi44NzMxNDN0LTEyLjg3MzE0My01LjQxMjU3MXpNMTA5Ny4xNDI4NTcgMTY0LjU3MTQyOWwwIDY5NC44NTcxNDNxMCAzNy43NDE3MTQtMjYuODQzNDI5IDY0LjU4NTE0M3QtNjQuNTg1MTQzIDI2Ljg0MzQyOWwtOTE0LjI4NTcxNCAwcS0zNy43NDE3MTQgMC02NC41ODUxNDMtMjYuODQzNDI5dC0yNi44NDM0MjktNjQuNTg1MTQzbDAtNjk0Ljg1NzE0M3EwLTM3Ljc0MTcxNCAyNi44NDM0MjktNjQuNTg1MTQzdDY0LjU4NTE0My0yNi44NDM0MjlsOTE0LjI4NTcxNCAwcTM3Ljc0MTcxNCAwIDY0LjU4NTE0MyAyNi44NDM0Mjl0MjYuODQzNDI5IDY0LjU4NTE0M3pcIlxuICAgICAgICAgIGNsYXNzPVwiYW50LXNrZWxldG9uLWltYWdlLXBhdGhcIlxuICAgICAgICAvPlxuICAgICAgPC9zdmc+XG4gICAgPC9zcGFuPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56U2tlbGV0b25FbGVtZW50SW1hZ2VDb21wb25lbnQge31cbiJdfQ==