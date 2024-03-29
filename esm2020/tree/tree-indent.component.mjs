/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NzTreeIndentComponent {
    constructor() {
        this.nzTreeLevel = 0;
        this.nzIsStart = [];
        this.nzIsEnd = [];
        this.nzSelectMode = false;
        this.listOfUnit = [];
    }
    ngOnChanges(changes) {
        const { nzTreeLevel } = changes;
        if (nzTreeLevel) {
            this.listOfUnit = [...new Array(nzTreeLevel.currentValue || 0)];
        }
    }
}
NzTreeIndentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeIndentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTreeIndentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeIndentComponent, selector: "nz-tree-indent", inputs: { nzTreeLevel: "nzTreeLevel", nzIsStart: "nzIsStart", nzIsEnd: "nzIsEnd", nzSelectMode: "nzSelectMode" }, host: { properties: { "attr.aria-hidden": "true", "class.ant-tree-indent": "!nzSelectMode", "class.ant-select-tree-indent": "nzSelectMode" } }, exportAs: ["nzTreeIndent"], usesOnChanges: true, ngImport: i0, template: `
    <span
      [class.ant-tree-indent-unit]="!nzSelectMode"
      [class.ant-select-tree-indent-unit]="nzSelectMode"
      [class.ant-select-tree-indent-unit-start]="nzSelectMode && nzIsStart[i]"
      [class.ant-tree-indent-unit-start]="!nzSelectMode && nzIsStart[i]"
      [class.ant-select-tree-indent-unit-end]="nzSelectMode && nzIsEnd[i]"
      [class.ant-tree-indent-unit-end]="!nzSelectMode && nzIsEnd[i]"
      *ngFor="let _ of listOfUnit; let i = index"
    ></span>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeIndentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-indent',
                    exportAs: 'nzTreeIndent',
                    template: `
    <span
      [class.ant-tree-indent-unit]="!nzSelectMode"
      [class.ant-select-tree-indent-unit]="nzSelectMode"
      [class.ant-select-tree-indent-unit-start]="nzSelectMode && nzIsStart[i]"
      [class.ant-tree-indent-unit-start]="!nzSelectMode && nzIsStart[i]"
      [class.ant-select-tree-indent-unit-end]="nzSelectMode && nzIsEnd[i]"
      [class.ant-tree-indent-unit-end]="!nzSelectMode && nzIsEnd[i]"
      *ngFor="let _ of listOfUnit; let i = index"
    ></span>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '[attr.aria-hidden]': 'true',
                        '[class.ant-tree-indent]': '!nzSelectMode',
                        '[class.ant-select-tree-indent]': 'nzSelectMode'
                    }
                }]
        }], propDecorators: { nzTreeLevel: [{
                type: Input
            }], nzIsStart: [{
                type: Input
            }], nzIsEnd: [{
                type: Input
            }], nzSelectMode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1pbmRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlL3RyZWUtaW5kZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7OztBQXdCcEcsTUFBTSxPQUFPLHFCQUFxQjtJQXRCbEM7UUF1QlcsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsY0FBUyxHQUFjLEVBQUUsQ0FBQztRQUMxQixZQUFPLEdBQWMsRUFBRSxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRTlCLGVBQVUsR0FBYSxFQUFFLENBQUM7S0FRM0I7SUFOQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNoQyxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqRTtJQUNILENBQUM7O2tIQWJVLHFCQUFxQjtzR0FBckIscUJBQXFCLHlXQW5CdEI7Ozs7Ozs7Ozs7R0FVVDsyRkFTVSxxQkFBcUI7a0JBdEJqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7R0FVVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsSUFBSSxFQUFFO3dCQUNKLG9CQUFvQixFQUFFLE1BQU07d0JBQzVCLHlCQUF5QixFQUFFLGVBQWU7d0JBQzFDLGdDQUFnQyxFQUFFLGNBQWM7cUJBQ2pEO2lCQUNGOzhCQUVVLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS1pbmRlbnQnLFxuICBleHBvcnRBczogJ256VHJlZUluZGVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW5cbiAgICAgIFtjbGFzcy5hbnQtdHJlZS1pbmRlbnQtdW5pdF09XCIhbnpTZWxlY3RNb2RlXCJcbiAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LXRyZWUtaW5kZW50LXVuaXRdPVwibnpTZWxlY3RNb2RlXCJcbiAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LXRyZWUtaW5kZW50LXVuaXQtc3RhcnRdPVwibnpTZWxlY3RNb2RlICYmIG56SXNTdGFydFtpXVwiXG4gICAgICBbY2xhc3MuYW50LXRyZWUtaW5kZW50LXVuaXQtc3RhcnRdPVwiIW56U2VsZWN0TW9kZSAmJiBueklzU3RhcnRbaV1cIlxuICAgICAgW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1pbmRlbnQtdW5pdC1lbmRdPVwibnpTZWxlY3RNb2RlICYmIG56SXNFbmRbaV1cIlxuICAgICAgW2NsYXNzLmFudC10cmVlLWluZGVudC11bml0LWVuZF09XCIhbnpTZWxlY3RNb2RlICYmIG56SXNFbmRbaV1cIlxuICAgICAgKm5nRm9yPVwibGV0IF8gb2YgbGlzdE9mVW5pdDsgbGV0IGkgPSBpbmRleFwiXG4gICAgPjwvc3Bhbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLWluZGVudF0nOiAnIW56U2VsZWN0TW9kZScsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtaW5kZW50XSc6ICduelNlbGVjdE1vZGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlSW5kZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbnpUcmVlTGV2ZWwgPSAwO1xuICBASW5wdXQoKSBueklzU3RhcnQ6IGJvb2xlYW5bXSA9IFtdO1xuICBASW5wdXQoKSBueklzRW5kOiBib29sZWFuW10gPSBbXTtcbiAgQElucHV0KCkgbnpTZWxlY3RNb2RlID0gZmFsc2U7XG5cbiAgbGlzdE9mVW5pdDogbnVtYmVyW10gPSBbXTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelRyZWVMZXZlbCB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpUcmVlTGV2ZWwpIHtcbiAgICAgIHRoaXMubGlzdE9mVW5pdCA9IFsuLi5uZXcgQXJyYXkobnpUcmVlTGV2ZWwuY3VycmVudFZhbHVlIHx8IDApXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==