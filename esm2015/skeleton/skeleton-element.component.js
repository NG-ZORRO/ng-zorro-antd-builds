/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input } from '@angular/core';
export class NzSkeletonElementDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.nzActive = false;
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-skeleton', 'ant-skeleton-element');
    }
}
NzSkeletonElementDirective.decorators = [
    { type: Directive, args: [{
                selector: 'nz-skeleton-element',
                host: {
                    '[class.ant-skeleton-active]': 'nzActive'
                }
            },] }
];
NzSkeletonElementDirective.ctorParameters = () => [
    { type: ElementRef }
];
NzSkeletonElementDirective.propDecorators = {
    nzActive: [{ type: Input }],
    nzType: [{ type: Input }]
};
export class NzSkeletonElementButtonComponent {
    constructor() {
        this.nzShape = 'default';
        this.nzSize = 'default';
    }
}
NzSkeletonElementButtonComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
NzSkeletonElementButtonComponent.propDecorators = {
    nzShape: [{ type: Input }],
    nzSize: [{ type: Input }]
};
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
NzSkeletonElementAvatarComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
NzSkeletonElementAvatarComponent.propDecorators = {
    nzShape: [{ type: Input }],
    nzSize: [{ type: Input }]
};
export class NzSkeletonElementInputComponent {
    constructor() {
        this.nzSize = 'default';
    }
}
NzSkeletonElementInputComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'nz-skeleton-element[nzType="input"]',
                template: `
    <span
      class="ant-skeleton-input"
      [class.ant-skeleton-input-lg]="nzSize === 'large'"
      [class.ant-skeleton-input-sm]="nzSize === 'small'"
    ></span>
  `
            },] }
];
NzSkeletonElementInputComponent.propDecorators = {
    nzSize: [{ type: Input }]
};
export class NzSkeletonElementImageComponent {
}
NzSkeletonElementImageComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24tZWxlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3NrZWxldG9uL3NrZWxldG9uLWVsZW1lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBZTNILE1BQU0sT0FBTywwQkFBMEI7SUFJckMsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUhqQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBSWpDLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7OztZQWJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixJQUFJLEVBQUU7b0JBQ0osNkJBQTZCLEVBQUUsVUFBVTtpQkFDMUM7YUFDRjs7O1lBZHVELFVBQVU7Ozt1QkFnQi9ELEtBQUs7cUJBQ0wsS0FBSzs7QUFxQlIsTUFBTSxPQUFPLGdDQUFnQztJQWI3QztRQWNXLFlBQU8sR0FBMEIsU0FBUyxDQUFDO1FBQzNDLFdBQU0sR0FBeUIsU0FBUyxDQUFDO0lBQ3BELENBQUM7OztZQWhCQSxTQUFTLFNBQUM7Z0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRTs7Ozs7Ozs7R0FRVDthQUNGOzs7c0JBRUUsS0FBSztxQkFDTCxLQUFLOztBQWlCUixNQUFNLE9BQU8sZ0NBQWdDO0lBZDdDO1FBZVcsWUFBTyxHQUEwQixRQUFRLENBQUM7UUFDMUMsV0FBTSxHQUF5QixTQUFTLENBQUM7UUFFbEQsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQVVoQixDQUFDO0lBUkMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3JELE1BQU0sVUFBVSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxDQUFDO1NBQ3RGO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7OztZQTNCRixTQUFTLFNBQUM7Z0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7YUFDRjs7O3NCQUVFLEtBQUs7cUJBQ0wsS0FBSzs7QUF5QlIsTUFBTSxPQUFPLCtCQUErQjtJQVg1QztRQVlXLFdBQU0sR0FBd0IsU0FBUyxDQUFDO0lBQ25ELENBQUM7OztZQWJBLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFLHFDQUFxQztnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7R0FNVDthQUNGOzs7cUJBRUUsS0FBSzs7QUFpQlIsTUFBTSxPQUFPLCtCQUErQjs7O1lBZDNDLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFLHFDQUFxQztnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOelNrZWxldG9uQXZhdGFyU2hhcGUsXG4gIE56U2tlbGV0b25BdmF0YXJTaXplLFxuICBOelNrZWxldG9uQnV0dG9uU2hhcGUsXG4gIE56U2tlbGV0b25CdXR0b25TaXplLFxuICBOelNrZWxldG9uSW5wdXRTaXplXG59IGZyb20gJy4vc2tlbGV0b24udHlwZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ256LXNrZWxldG9uLWVsZW1lbnQnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtc2tlbGV0b24tYWN0aXZlXSc6ICduekFjdGl2ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelNrZWxldG9uRWxlbWVudERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIG56QWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56VHlwZSE6ICdidXR0b24nIHwgJ2lucHV0JyB8ICdhdmF0YXInIHwgJ2ltYWdlJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAvLyBUT0RPOiBtb3ZlIHRvIGhvc3QgYWZ0ZXIgVmlldyBFbmdpbmUgZGVwcmVjYXRpb25cbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhbnQtc2tlbGV0b24nLCAnYW50LXNrZWxldG9uLWVsZW1lbnQnKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnbnotc2tlbGV0b24tZWxlbWVudFtuelR5cGU9XCJidXR0b25cIl0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuXG4gICAgICBjbGFzcz1cImFudC1za2VsZXRvbi1idXR0b25cIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1idXR0b24tcm91bmRdPVwibnpTaGFwZSA9PT0gJ3JvdW5kJ1wiXG4gICAgICBbY2xhc3MuYW50LXNrZWxldG9uLWJ1dHRvbi1jaXJjbGVdPVwibnpTaGFwZSA9PT0gJ2NpcmNsZSdcIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1idXR0b24tbGddPVwibnpTaXplID09PSAnbGFyZ2UnXCJcbiAgICAgIFtjbGFzcy5hbnQtc2tlbGV0b24tYnV0dG9uLXNtXT1cIm56U2l6ZSA9PT0gJ3NtYWxsJ1wiXG4gICAgPjwvc3Bhbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelNrZWxldG9uRWxlbWVudEJ1dHRvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG56U2hhcGU6IE56U2tlbGV0b25CdXR0b25TaGFwZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgbnpTaXplOiBOelNrZWxldG9uQnV0dG9uU2l6ZSA9ICdkZWZhdWx0Jztcbn1cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ256LXNrZWxldG9uLWVsZW1lbnRbbnpUeXBlPVwiYXZhdGFyXCJdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhblxuICAgICAgY2xhc3M9XCJhbnQtc2tlbGV0b24tYXZhdGFyXCJcbiAgICAgIFtjbGFzcy5hbnQtc2tlbGV0b24tYXZhdGFyLXNxdWFyZV09XCJuelNoYXBlID09PSAnc3F1YXJlJ1wiXG4gICAgICBbY2xhc3MuYW50LXNrZWxldG9uLWF2YXRhci1jaXJjbGVdPVwibnpTaGFwZSA9PT0gJ2NpcmNsZSdcIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1hdmF0YXItbGddPVwibnpTaXplID09PSAnbGFyZ2UnXCJcbiAgICAgIFtjbGFzcy5hbnQtc2tlbGV0b24tYXZhdGFyLXNtXT1cIm56U2l6ZSA9PT0gJ3NtYWxsJ1wiXG4gICAgICBbbmdTdHlsZV09XCJzdHlsZU1hcFwiXG4gICAgPjwvc3Bhbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelNrZWxldG9uRWxlbWVudEF2YXRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG56U2hhcGU6IE56U2tlbGV0b25BdmF0YXJTaGFwZSA9ICdjaXJjbGUnO1xuICBASW5wdXQoKSBuelNpemU6IE56U2tlbGV0b25BdmF0YXJTaXplID0gJ2RlZmF1bHQnO1xuXG4gIHN0eWxlTWFwID0ge307XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLm56U2l6ZSAmJiB0eXBlb2YgdGhpcy5uelNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICBjb25zdCBzaWRlTGVuZ3RoID0gYCR7dGhpcy5uelNpemV9cHhgO1xuICAgICAgdGhpcy5zdHlsZU1hcCA9IHsgd2lkdGg6IHNpZGVMZW5ndGgsIGhlaWdodDogc2lkZUxlbmd0aCwgJ2xpbmUtaGVpZ2h0Jzogc2lkZUxlbmd0aCB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0eWxlTWFwID0ge307XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICduei1za2VsZXRvbi1lbGVtZW50W256VHlwZT1cImlucHV0XCJdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhblxuICAgICAgY2xhc3M9XCJhbnQtc2tlbGV0b24taW5wdXRcIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1pbnB1dC1sZ109XCJuelNpemUgPT09ICdsYXJnZSdcIlxuICAgICAgW2NsYXNzLmFudC1za2VsZXRvbi1pbnB1dC1zbV09XCJuelNpemUgPT09ICdzbWFsbCdcIlxuICAgID48L3NwYW4+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpTa2VsZXRvbkVsZW1lbnRJbnB1dENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG56U2l6ZTogTnpTa2VsZXRvbklucHV0U2l6ZSA9ICdkZWZhdWx0Jztcbn1cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ256LXNrZWxldG9uLWVsZW1lbnRbbnpUeXBlPVwiaW1hZ2VcIl0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuIGNsYXNzPVwiYW50LXNrZWxldG9uLWltYWdlXCI+XG4gICAgICA8c3ZnIGNsYXNzPVwiYW50LXNrZWxldG9uLWltYWdlLXN2Z1wiIHZpZXdCb3g9XCIwIDAgMTA5OCAxMDI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGQ9XCJNMzY1LjcxNDI4NiAzMjkuMTQyODU3cTAgNDUuNzE0Mjg2LTMyLjAzNjU3MSA3Ny42Nzc3MTR0LTc3LjY3NzcxNCAzMi4wMzY1NzEtNzcuNjc3NzE0LTMyLjAzNjU3MS0zMi4wMzY1NzEtNzcuNjc3NzE0IDMyLjAzNjU3MS03Ny42Nzc3MTQgNzcuNjc3NzE0LTMyLjAzNjU3MSA3Ny42Nzc3MTQgMzIuMDM2NTcxIDMyLjAzNjU3MSA3Ny42Nzc3MTR6TTk1MC44NTcxNDMgNTQ4LjU3MTQyOWwwIDI1Ni04MDQuNTcxNDI5IDAgMC0xMDkuNzE0Mjg2IDE4Mi44NTcxNDMtMTgyLjg1NzE0MyA5MS40Mjg1NzEgOTEuNDI4NTcxIDI5Mi41NzE0MjktMjkyLjU3MTQyOXpNMTAwNS43MTQyODYgMTQ2LjI4NTcxNGwtOTE0LjI4NTcxNCAwcS03LjQ2MDU3MSAwLTEyLjg3MzE0MyA1LjQxMjU3MXQtNS40MTI1NzEgMTIuODczMTQzbDAgNjk0Ljg1NzE0M3EwIDcuNDYwNTcxIDUuNDEyNTcxIDEyLjg3MzE0M3QxMi44NzMxNDMgNS40MTI1NzFsOTE0LjI4NTcxNCAwcTcuNDYwNTcxIDAgMTIuODczMTQzLTUuNDEyNTcxdDUuNDEyNTcxLTEyLjg3MzE0M2wwLTY5NC44NTcxNDNxMC03LjQ2MDU3MS01LjQxMjU3MS0xMi44NzMxNDN0LTEyLjg3MzE0My01LjQxMjU3MXpNMTA5Ny4xNDI4NTcgMTY0LjU3MTQyOWwwIDY5NC44NTcxNDNxMCAzNy43NDE3MTQtMjYuODQzNDI5IDY0LjU4NTE0M3QtNjQuNTg1MTQzIDI2Ljg0MzQyOWwtOTE0LjI4NTcxNCAwcS0zNy43NDE3MTQgMC02NC41ODUxNDMtMjYuODQzNDI5dC0yNi44NDM0MjktNjQuNTg1MTQzbDAtNjk0Ljg1NzE0M3EwLTM3Ljc0MTcxNCAyNi44NDM0MjktNjQuNTg1MTQzdDY0LjU4NTE0My0yNi44NDM0MjlsOTE0LjI4NTcxNCAwcTM3Ljc0MTcxNCAwIDY0LjU4NTE0MyAyNi44NDM0Mjl0MjYuODQzNDI5IDY0LjU4NTE0M3pcIlxuICAgICAgICAgIGNsYXNzPVwiYW50LXNrZWxldG9uLWltYWdlLXBhdGhcIlxuICAgICAgICAvPlxuICAgICAgPC9zdmc+XG4gICAgPC9zcGFuPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56U2tlbGV0b25FbGVtZW50SW1hZ2VDb21wb25lbnQge31cbiJdfQ==