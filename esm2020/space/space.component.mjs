import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ContentChildren, Input, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzSpaceItemDirective } from './space-item.directive';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/common";
const NZ_CONFIG_MODULE_NAME = 'space';
const SPACE_SIZE = {
    small: 8,
    middle: 16,
    large: 24
};
export class NzSpaceComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9zcGFjZS9zcGFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFDZixLQUFLLEVBSUwsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBZ0MsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBRzlELE1BQU0scUJBQXFCLEdBQWdCLE9BQU8sQ0FBQztBQUNuRCxNQUFNLFVBQVUsR0FFWjtJQUNGLEtBQUssRUFBRSxDQUFDO0lBQ1IsTUFBTSxFQUFFLEVBQUU7SUFDVixLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUM7QUFxQ0YsTUFBTSxPQUFPLGdCQUFnQjtJQWlCM0IsWUFBbUIsZUFBZ0MsRUFBVSxHQUFzQjtRQUFoRSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWQxRSxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQUVuRCxnQkFBVyxHQUFxQixZQUFZLENBQUM7UUFFN0MsWUFBTyxHQUE4QyxJQUFJLENBQUM7UUFDMUMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUMxQixXQUFNLEdBQWdCLE9BQU8sQ0FBQztRQUtyRCxjQUFTLEdBQVcsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUM3QixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUVxRCxDQUFDO0lBRS9FLGdCQUFnQjtRQUN0QixNQUFNLFVBQVUsR0FBRyxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNGLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQy9HLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQy9ELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs2R0F4Q1UsZ0JBQWdCO2lHQUFoQixnQkFBZ0IsNHBCQVdWLG9CQUFvQixRQUFVLFdBQVcseUVBMUNoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CVDtBQW9Cd0I7SUFBZixZQUFZLEVBQUU7Z0RBQXlCO0FBQzFCO0lBQWIsVUFBVSxFQUFFO2dEQUErQjsyRkFUMUMsZ0JBQWdCO2tCQW5DNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsU0FBUztvQkFDbkIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLFdBQVc7d0JBQ2xCLDhCQUE4QixFQUFFLDhCQUE4Qjt3QkFDOUQsNEJBQTRCLEVBQUUsNEJBQTRCO3dCQUMxRCwrQkFBK0IsRUFBRSx5QkFBeUI7d0JBQzFELDZCQUE2QixFQUFFLHVCQUF1Qjt3QkFDdEQsZ0NBQWdDLEVBQUUsMEJBQTBCO3dCQUM1RCxrQ0FBa0MsRUFBRSw0QkFBNEI7d0JBQ2hFLG1CQUFtQixFQUFFLHdCQUF3QjtxQkFDOUM7aUJBQ0Y7c0lBTVUsV0FBVztzQkFBbkIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNtQixNQUFNO3NCQUE5QixLQUFLO2dCQUNpQixNQUFNO3NCQUE1QixLQUFLO2dCQUV3RCxLQUFLO3NCQUFsRSxlQUFlO3VCQUFDLG9CQUFvQixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBOelNwYWNlSXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vc3BhY2UtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpTcGFjZUFsaWduLCBOelNwYWNlRGlyZWN0aW9uLCBOelNwYWNlU2l6ZSwgTnpTcGFjZVR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdzcGFjZSc7XG5jb25zdCBTUEFDRV9TSVpFOiB7XG4gIFtzaXplS2V5IGluIE56U3BhY2VUeXBlXTogbnVtYmVyO1xufSA9IHtcbiAgc21hbGw6IDgsXG4gIG1pZGRsZTogMTYsXG4gIGxhcmdlOiAyNFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotc3BhY2UsIFtuei1zcGFjZV0nLFxuICBleHBvcnRBczogJ056U3BhY2UnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIGxldC1sYXN0PVwibGFzdFwiIGxldC1pbmRleD1cImluZGV4XCIgW25nRm9yT2ZdPVwiaXRlbXNcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhbnQtc3BhY2UtaXRlbVwiXG4gICAgICAgIFtzdHlsZS5tYXJnaW4tYm90dG9tLnB4XT1cIm56RGlyZWN0aW9uID09PSAndmVydGljYWwnID8gKGxhc3QgPyBudWxsIDogc3BhY2VTaXplKSA6IG51bGxcIlxuICAgICAgICBbc3R5bGUubWFyZ2luLXJpZ2h0LnB4XT1cIm56RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAobGFzdCA/IG51bGwgOiBzcGFjZVNpemUpIDogbnVsbFwiXG4gICAgICA+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8c3BhblxuICAgICAgICAqbmdJZj1cIm56U3BsaXQgJiYgIWxhc3RcIlxuICAgICAgICBjbGFzcz1cImFudC1zcGFjZS1zcGxpdFwiXG4gICAgICAgIFtzdHlsZS5tYXJnaW4tYm90dG9tLnB4XT1cIm56RGlyZWN0aW9uID09PSAndmVydGljYWwnID8gKGxhc3QgPyBudWxsIDogc3BhY2VTaXplKSA6IG51bGxcIlxuICAgICAgICBbc3R5bGUubWFyZ2luLXJpZ2h0LnB4XT1cIm56RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAobGFzdCA/IG51bGwgOiBzcGFjZVNpemUpIDogbnVsbFwiXG4gICAgICA+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJuelNwbGl0XCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBpbmRleCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtc3BhY2UnLFxuICAgICdbY2xhc3MuYW50LXNwYWNlLWhvcml6b250YWxdJzogJ256RGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gICAgJ1tjbGFzcy5hbnQtc3BhY2UtdmVydGljYWxdJzogJ256RGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCInLFxuICAgICdbY2xhc3MuYW50LXNwYWNlLWFsaWduLXN0YXJ0XSc6ICdtZXJnZWRBbGlnbiA9PT0gXCJzdGFydFwiJyxcbiAgICAnW2NsYXNzLmFudC1zcGFjZS1hbGlnbi1lbmRdJzogJ21lcmdlZEFsaWduID09PSBcImVuZFwiJyxcbiAgICAnW2NsYXNzLmFudC1zcGFjZS1hbGlnbi1jZW50ZXJdJzogJ21lcmdlZEFsaWduID09PSBcImNlbnRlclwiJyxcbiAgICAnW2NsYXNzLmFudC1zcGFjZS1hbGlnbi1iYXNlbGluZV0nOiAnbWVyZ2VkQWxpZ24gPT09IFwiYmFzZWxpbmVcIicsXG4gICAgJ1tzdHlsZS5mbGV4LXdyYXBdJzogJ256V3JhcCA/IFwid3JhcFwiIDogbnVsbCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelNwYWNlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpXcmFwOiBCb29sZWFuSW5wdXQ7XG5cbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG5cbiAgQElucHV0KCkgbnpEaXJlY3Rpb246IE56U3BhY2VEaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XG4gIEBJbnB1dCgpIG56QWxpZ24/OiBOelNwYWNlQWxpZ247XG4gIEBJbnB1dCgpIG56U3BsaXQ6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBudW1iZXIgfT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56V3JhcDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56U2l6ZTogTnpTcGFjZVNpemUgPSAnc21hbGwnO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTnpTcGFjZUl0ZW1EaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgaXRlbXMhOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8TnpTYWZlQW55Pj47XG5cbiAgbWVyZ2VkQWxpZ24/OiBOelNwYWNlQWxpZ247XG4gIHNwYWNlU2l6ZTogbnVtYmVyID0gU1BBQ0VfU0laRS5zbWFsbDtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTcGFjZUl0ZW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IG51bWJlclNpemUgPSB0eXBlb2YgdGhpcy5uelNpemUgPT09ICdzdHJpbmcnID8gU1BBQ0VfU0laRVt0aGlzLm56U2l6ZV0gOiB0aGlzLm56U2l6ZTtcbiAgICB0aGlzLnNwYWNlU2l6ZSA9IG51bWJlclNpemUgLyAodGhpcy5uelNwbGl0ID8gMiA6IDEpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVTcGFjZUl0ZW1zKCk7XG4gICAgdGhpcy5tZXJnZWRBbGlnbiA9IHRoaXMubnpBbGlnbiA9PT0gdW5kZWZpbmVkICYmIHRoaXMubnpEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/ICdjZW50ZXInIDogdGhpcy5uekFsaWduO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlU3BhY2VJdGVtcygpO1xuICAgIHRoaXMuaXRlbXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=