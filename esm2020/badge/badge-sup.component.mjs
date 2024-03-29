/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/core/no-animation";
export class NzBadgeSupComponent {
    constructor() {
        this.nzStyle = null;
        this.nzDot = false;
        this.nzOverflowCount = 99;
        this.disableAnimation = false;
        this.noAnimation = false;
        this.maxNumberArray = [];
        this.countArray = [];
        this.count = 0;
        this.countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    generateMaxNumberArray() {
        this.maxNumberArray = this.nzOverflowCount.toString().split('');
    }
    ngOnInit() {
        this.generateMaxNumberArray();
    }
    ngOnChanges(changes) {
        const { nzOverflowCount, nzCount } = changes;
        if (nzCount && typeof nzCount.currentValue === 'number') {
            this.count = Math.max(0, nzCount.currentValue);
            this.countArray = this.count
                .toString()
                .split('')
                .map(item => +item);
        }
        if (nzOverflowCount) {
            this.generateMaxNumberArray();
        }
    }
}
NzBadgeSupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeSupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzBadgeSupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzBadgeSupComponent, selector: "nz-badge-sup", inputs: { nzOffset: "nzOffset", nzTitle: "nzTitle", nzStyle: "nzStyle", nzDot: "nzDot", nzOverflowCount: "nzOverflowCount", disableAnimation: "disableAnimation", nzCount: "nzCount", noAnimation: "noAnimation" }, host: { properties: { "@.disabled": "disableAnimation", "@zoomBadgeMotion": "", "attr.title": "nzTitle === null ? '' : nzTitle || nzCount", "style": "nzStyle", "style.right.px": "nzOffset && nzOffset[0] ? -nzOffset[0] : null", "style.margin-top.px": "nzOffset && nzOffset[1] ? nzOffset[1] : null", "class.ant-badge-count": "!nzDot", "class.ant-badge-dot": "nzDot", "class.ant-badge-multiple-words": "countArray.length >= 2" }, classAttribute: "ant-scroll-number" }, exportAs: ["nzBadgeSup"], usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="count <= nzOverflowCount; else overflowTemplate">
      <span
        [nzNoAnimation]="noAnimation"
        *ngFor="let n of maxNumberArray; let i = index"
        class="ant-scroll-number-only"
        [style.transform]="'translateY(' + -countArray[i] * 100 + '%)'"
      >
        <ng-container *ngIf="!nzDot && countArray[i] !== undefined">
          <p
            *ngFor="let p of countSingleArray"
            class="ant-scroll-number-only-unit"
            [class.current]="p === countArray[i]"
          >
            {{ p }}
          </p>
        </ng-container>
      </span>
    </ng-container>
    <ng-template #overflowTemplate>{{ nzOverflowCount }}+</ng-template>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }], animations: [zoomBadgeMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeSupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-badge-sup',
                    exportAs: 'nzBadgeSup',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [zoomBadgeMotion],
                    template: `
    <ng-container *ngIf="count <= nzOverflowCount; else overflowTemplate">
      <span
        [nzNoAnimation]="noAnimation"
        *ngFor="let n of maxNumberArray; let i = index"
        class="ant-scroll-number-only"
        [style.transform]="'translateY(' + -countArray[i] * 100 + '%)'"
      >
        <ng-container *ngIf="!nzDot && countArray[i] !== undefined">
          <p
            *ngFor="let p of countSingleArray"
            class="ant-scroll-number-only-unit"
            [class.current]="p === countArray[i]"
          >
            {{ p }}
          </p>
        </ng-container>
      </span>
    </ng-container>
    <ng-template #overflowTemplate>{{ nzOverflowCount }}+</ng-template>
  `,
                    host: {
                        class: 'ant-scroll-number',
                        '[@.disabled]': `disableAnimation`,
                        '[@zoomBadgeMotion]': '',
                        '[attr.title]': `nzTitle === null ? '' : nzTitle || nzCount`,
                        '[style]': `nzStyle`,
                        '[style.right.px]': `nzOffset && nzOffset[0] ? -nzOffset[0] : null`,
                        '[style.margin-top.px]': `nzOffset && nzOffset[1] ? nzOffset[1] : null`,
                        '[class.ant-badge-count]': `!nzDot`,
                        '[class.ant-badge-dot]': `nzDot`,
                        '[class.ant-badge-multiple-words]': `countArray.length >= 2`
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzOffset: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzStyle: [{
                type: Input
            }], nzDot: [{
                type: Input
            }], nzOverflowCount: [{
                type: Input
            }], disableAnimation: [{
                type: Input
            }], nzCount: [{
                type: Input
            }], noAnimation: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2Utc3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYmFkZ2UvYmFkZ2Utc3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBS0wsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7OztBQTRDL0QsTUFBTSxPQUFPLG1CQUFtQjtJQWM5QjtRQVhTLFlBQU8sR0FBcUMsSUFBSSxDQUFDO1FBQ2pELFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxvQkFBZSxHQUFXLEVBQUUsQ0FBQztRQUM3QixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFekIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsbUJBQWMsR0FBYSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUMxQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLHFCQUFnQixHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFbkMsQ0FBQztJQUVoQixzQkFBc0I7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDN0MsSUFBSSxPQUFPLElBQUksT0FBTyxPQUFPLENBQUMsWUFBWSxLQUFLLFFBQVEsRUFBRTtZQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLO2lCQUN6QixRQUFRLEVBQUU7aUJBQ1YsS0FBSyxDQUFDLEVBQUUsQ0FBQztpQkFDVCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxlQUFlLEVBQUU7WUFDbkIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDOztnSEFwQ1UsbUJBQW1CO29HQUFuQixtQkFBbUIseXdCQWxDcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JULGlXQXJCVyxDQUFDLGVBQWUsQ0FBQzsyRkFtQ2xCLG1CQUFtQjtrQkF6Qy9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxZQUFZO29CQUN0QixtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFVBQVUsRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLG1CQUFtQjt3QkFDMUIsY0FBYyxFQUFFLGtCQUFrQjt3QkFDbEMsb0JBQW9CLEVBQUUsRUFBRTt3QkFDeEIsY0FBYyxFQUFFLDRDQUE0Qzt3QkFDNUQsU0FBUyxFQUFFLFNBQVM7d0JBQ3BCLGtCQUFrQixFQUFFLCtDQUErQzt3QkFDbkUsdUJBQXVCLEVBQUUsOENBQThDO3dCQUN2RSx5QkFBeUIsRUFBRSxRQUFRO3dCQUNuQyx1QkFBdUIsRUFBRSxPQUFPO3dCQUNoQyxrQ0FBa0MsRUFBRSx3QkFBd0I7cUJBQzdEO2lCQUNGOzBFQUVVLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgem9vbUJhZGdlTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1iYWRnZS1zdXAnLFxuICBleHBvcnRBczogJ256QmFkZ2VTdXAnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFt6b29tQmFkZ2VNb3Rpb25dLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb3VudCA8PSBuek92ZXJmbG93Q291bnQ7IGVsc2Ugb3ZlcmZsb3dUZW1wbGF0ZVwiPlxuICAgICAgPHNwYW5cbiAgICAgICAgW256Tm9BbmltYXRpb25dPVwibm9BbmltYXRpb25cIlxuICAgICAgICAqbmdGb3I9XCJsZXQgbiBvZiBtYXhOdW1iZXJBcnJheTsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIGNsYXNzPVwiYW50LXNjcm9sbC1udW1iZXItb25seVwiXG4gICAgICAgIFtzdHlsZS50cmFuc2Zvcm1dPVwiJ3RyYW5zbGF0ZVkoJyArIC1jb3VudEFycmF5W2ldICogMTAwICsgJyUpJ1wiXG4gICAgICA+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbnpEb3QgJiYgY291bnRBcnJheVtpXSAhPT0gdW5kZWZpbmVkXCI+XG4gICAgICAgICAgPHBcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBwIG9mIGNvdW50U2luZ2xlQXJyYXlcIlxuICAgICAgICAgICAgY2xhc3M9XCJhbnQtc2Nyb2xsLW51bWJlci1vbmx5LXVuaXRcIlxuICAgICAgICAgICAgW2NsYXNzLmN1cnJlbnRdPVwicCA9PT0gY291bnRBcnJheVtpXVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgcCB9fVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3NwYW4+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLXRlbXBsYXRlICNvdmVyZmxvd1RlbXBsYXRlPnt7IG56T3ZlcmZsb3dDb3VudCB9fSs8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtc2Nyb2xsLW51bWJlcicsXG4gICAgJ1tALmRpc2FibGVkXSc6IGBkaXNhYmxlQW5pbWF0aW9uYCxcbiAgICAnW0B6b29tQmFkZ2VNb3Rpb25dJzogJycsXG4gICAgJ1thdHRyLnRpdGxlXSc6IGBuelRpdGxlID09PSBudWxsID8gJycgOiBuelRpdGxlIHx8IG56Q291bnRgLFxuICAgICdbc3R5bGVdJzogYG56U3R5bGVgLFxuICAgICdbc3R5bGUucmlnaHQucHhdJzogYG56T2Zmc2V0ICYmIG56T2Zmc2V0WzBdID8gLW56T2Zmc2V0WzBdIDogbnVsbGAsXG4gICAgJ1tzdHlsZS5tYXJnaW4tdG9wLnB4XSc6IGBuek9mZnNldCAmJiBuek9mZnNldFsxXSA/IG56T2Zmc2V0WzFdIDogbnVsbGAsXG4gICAgJ1tjbGFzcy5hbnQtYmFkZ2UtY291bnRdJzogYCFuekRvdGAsXG4gICAgJ1tjbGFzcy5hbnQtYmFkZ2UtZG90XSc6IGBuekRvdGAsXG4gICAgJ1tjbGFzcy5hbnQtYmFkZ2UtbXVsdGlwbGUtd29yZHNdJzogYGNvdW50QXJyYXkubGVuZ3RoID49IDJgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpCYWRnZVN1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbnpPZmZzZXQ/OiBbbnVtYmVyLCBudW1iZXJdO1xuICBASW5wdXQoKSBuelRpdGxlPzogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgbnpTdHlsZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekRvdCA9IGZhbHNlO1xuICBASW5wdXQoKSBuek92ZXJmbG93Q291bnQ6IG51bWJlciA9IDk5O1xuICBASW5wdXQoKSBkaXNhYmxlQW5pbWF0aW9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56Q291bnQ/OiBudW1iZXIgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xuICBASW5wdXQoKSBub0FuaW1hdGlvbiA9IGZhbHNlO1xuICBtYXhOdW1iZXJBcnJheTogc3RyaW5nW10gPSBbXTtcbiAgY291bnRBcnJheTogbnVtYmVyW10gPSBbXTtcbiAgY291bnQ6IG51bWJlciA9IDA7XG4gIGNvdW50U2luZ2xlQXJyYXkgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV07XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdlbmVyYXRlTWF4TnVtYmVyQXJyYXkoKTogdm9pZCB7XG4gICAgdGhpcy5tYXhOdW1iZXJBcnJheSA9IHRoaXMubnpPdmVyZmxvd0NvdW50LnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5nZW5lcmF0ZU1heE51bWJlckFycmF5KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuek92ZXJmbG93Q291bnQsIG56Q291bnQgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56Q291bnQgJiYgdHlwZW9mIG56Q291bnQuY3VycmVudFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5jb3VudCA9IE1hdGgubWF4KDAsIG56Q291bnQuY3VycmVudFZhbHVlKTtcbiAgICAgIHRoaXMuY291bnRBcnJheSA9IHRoaXMuY291bnRcbiAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAubWFwKGl0ZW0gPT4gK2l0ZW0pO1xuICAgIH1cbiAgICBpZiAobnpPdmVyZmxvd0NvdW50KSB7XG4gICAgICB0aGlzLmdlbmVyYXRlTWF4TnVtYmVyQXJyYXkoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==