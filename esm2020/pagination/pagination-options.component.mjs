/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { toNumber } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/select";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class NzPaginationOptionsComponent {
    constructor() {
        this.nzSize = 'default';
        this.disabled = false;
        this.showSizeChanger = false;
        this.showQuickJumper = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [];
        this.pageIndexChange = new EventEmitter();
        this.pageSizeChange = new EventEmitter();
        this.listOfPageSizeOption = [];
    }
    onPageSizeChange(size) {
        if (this.pageSize !== size) {
            this.pageSizeChange.next(size);
        }
    }
    jumpToPageViaInput($event) {
        const target = $event.target;
        const index = Math.floor(toNumber(target.value, this.pageIndex));
        this.pageIndexChange.next(index);
        target.value = '';
    }
    trackByOption(_, option) {
        return option.value;
    }
    ngOnChanges(changes) {
        const { pageSize, pageSizeOptions, locale } = changes;
        if (pageSize || pageSizeOptions || locale) {
            this.listOfPageSizeOption = [...new Set([...this.pageSizeOptions, this.pageSize])].map(item => ({
                value: item,
                label: `${item} ${this.locale.items_per_page}`
            }));
        }
    }
}
NzPaginationOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationOptionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzPaginationOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPaginationOptionsComponent, selector: "div[nz-pagination-options]", inputs: { nzSize: "nzSize", disabled: "disabled", showSizeChanger: "showSizeChanger", showQuickJumper: "showQuickJumper", locale: "locale", total: "total", pageIndex: "pageIndex", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { pageIndexChange: "pageIndexChange", pageSizeChange: "pageSizeChange" }, host: { classAttribute: "ant-pagination-options" }, usesOnChanges: true, ngImport: i0, template: `
    <nz-select
      class="ant-pagination-options-size-changer"
      *ngIf="showSizeChanger"
      [nzDisabled]="disabled"
      [nzSize]="nzSize"
      [ngModel]="pageSize"
      (ngModelChange)="onPageSizeChange($event)"
    >
      <nz-option
        *ngFor="let option of listOfPageSizeOption; trackBy: trackByOption"
        [nzLabel]="option.label"
        [nzValue]="option.value"
      ></nz-option>
    </nz-select>
    <div class="ant-pagination-options-quick-jumper" *ngIf="showQuickJumper">
      {{ locale.jump_to }}
      <input [disabled]="disabled" (keydown.enter)="jumpToPageViaInput($event)" />
      {{ locale.page }}
    </div>
  `, isInline: true, components: [{ type: i1.NzSelectComponent, selector: "nz-select", inputs: ["nzId", "nzSize", "nzOptionHeightPx", "nzOptionOverflowSize", "nzDropdownClassName", "nzDropdownMatchSelectWidth", "nzDropdownStyle", "nzNotFoundContent", "nzPlaceHolder", "nzMaxTagCount", "nzDropdownRender", "nzCustomTemplate", "nzSuffixIcon", "nzClearIcon", "nzRemoveIcon", "nzMenuItemSelectedIcon", "nzTokenSeparators", "nzMaxTagPlaceholder", "nzMaxMultipleCount", "nzMode", "nzFilterOption", "compareWith", "nzAllowClear", "nzBorderless", "nzShowSearch", "nzLoading", "nzAutoFocus", "nzAutoClearSearchValue", "nzServerSearch", "nzDisabled", "nzOpen", "nzBackdrop", "nzOptions", "nzShowArrow"], outputs: ["nzOnSearch", "nzScrollToBottom", "nzOpenChange", "nzBlur", "nzFocus"], exportAs: ["nzSelect"] }, { type: i1.NzOptionComponent, selector: "nz-option", inputs: ["nzLabel", "nzValue", "nzDisabled", "nzHide", "nzCustomContent"], exportAs: ["nzOption"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'div[nz-pagination-options]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <nz-select
      class="ant-pagination-options-size-changer"
      *ngIf="showSizeChanger"
      [nzDisabled]="disabled"
      [nzSize]="nzSize"
      [ngModel]="pageSize"
      (ngModelChange)="onPageSizeChange($event)"
    >
      <nz-option
        *ngFor="let option of listOfPageSizeOption; trackBy: trackByOption"
        [nzLabel]="option.label"
        [nzValue]="option.value"
      ></nz-option>
    </nz-select>
    <div class="ant-pagination-options-quick-jumper" *ngIf="showQuickJumper">
      {{ locale.jump_to }}
      <input [disabled]="disabled" (keydown.enter)="jumpToPageViaInput($event)" />
      {{ locale.page }}
    </div>
  `,
                    host: { class: 'ant-pagination-options' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzSize: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showSizeChanger: [{
                type: Input
            }], showQuickJumper: [{
                type: Input
            }], locale: [{
                type: Input
            }], total: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], pageIndexChange: [{
                type: Output
            }], pageSizeChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1vcHRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLW9wdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7O0FBK0JuRCxNQUFNLE9BQU8sNEJBQTRCO0lBY3ZDO1FBYlMsV0FBTSxHQUF3QixTQUFTLENBQUM7UUFDeEMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUV4QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxvQkFBZSxHQUFhLEVBQUUsQ0FBQztRQUNyQixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDN0MsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQy9ELHlCQUFvQixHQUE0QyxFQUFFLENBQUM7SUFFcEQsQ0FBQztJQUVoQixnQkFBZ0IsQ0FBQyxJQUFZO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsTUFBYTtRQUM5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBMEIsQ0FBQztRQUNqRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxhQUFhLENBQUMsQ0FBUyxFQUFFLE1BQXdDO1FBQy9ELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUN0RCxJQUFJLFFBQVEsSUFBSSxlQUFlLElBQUksTUFBTSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RixLQUFLLEVBQUUsSUFBSTtnQkFDWCxLQUFLLEVBQUUsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7YUFDL0MsQ0FBQyxDQUFDLENBQUM7U0FDTDtJQUNILENBQUM7O3lIQXpDVSw0QkFBNEI7NkdBQTVCLDRCQUE0Qiw4Y0F2QjdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDsyRkFHVSw0QkFBNEI7a0JBNUJ4QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDtvQkFDRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUU7aUJBQzFDOzBFQUVVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNhLGVBQWU7c0JBQWpDLE1BQU07Z0JBQ1ksY0FBYztzQkFBaEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgdG9OdW1iZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGl2W256LXBhZ2luYXRpb24tb3B0aW9uc10nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG56LXNlbGVjdFxuICAgICAgY2xhc3M9XCJhbnQtcGFnaW5hdGlvbi1vcHRpb25zLXNpemUtY2hhbmdlclwiXG4gICAgICAqbmdJZj1cInNob3dTaXplQ2hhbmdlclwiXG4gICAgICBbbnpEaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICBbbnpTaXplXT1cIm56U2l6ZVwiXG4gICAgICBbbmdNb2RlbF09XCJwYWdlU2l6ZVwiXG4gICAgICAobmdNb2RlbENoYW5nZSk9XCJvblBhZ2VTaXplQ2hhbmdlKCRldmVudClcIlxuICAgID5cbiAgICAgIDxuei1vcHRpb25cbiAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBsaXN0T2ZQYWdlU2l6ZU9wdGlvbjsgdHJhY2tCeTogdHJhY2tCeU9wdGlvblwiXG4gICAgICAgIFtuekxhYmVsXT1cIm9wdGlvbi5sYWJlbFwiXG4gICAgICAgIFtuelZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiXG4gICAgICA+PC9uei1vcHRpb24+XG4gICAgPC9uei1zZWxlY3Q+XG4gICAgPGRpdiBjbGFzcz1cImFudC1wYWdpbmF0aW9uLW9wdGlvbnMtcXVpY2stanVtcGVyXCIgKm5nSWY9XCJzaG93UXVpY2tKdW1wZXJcIj5cbiAgICAgIHt7IGxvY2FsZS5qdW1wX3RvIH19XG4gICAgICA8aW5wdXQgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGtleWRvd24uZW50ZXIpPVwianVtcFRvUGFnZVZpYUlucHV0KCRldmVudClcIiAvPlxuICAgICAge3sgbG9jYWxlLnBhZ2UgfX1cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDogeyBjbGFzczogJ2FudC1wYWdpbmF0aW9uLW9wdGlvbnMnIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpQYWdpbmF0aW9uT3B0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG56U2l6ZTogJ2RlZmF1bHQnIHwgJ3NtYWxsJyA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1NpemVDaGFuZ2VyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dRdWlja0p1bXBlciA9IGZhbHNlO1xuICBASW5wdXQoKSBsb2NhbGUhOiBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlO1xuICBASW5wdXQoKSB0b3RhbCA9IDA7XG4gIEBJbnB1dCgpIHBhZ2VJbmRleCA9IDE7XG4gIEBJbnB1dCgpIHBhZ2VTaXplID0gMTA7XG4gIEBJbnB1dCgpIHBhZ2VTaXplT3B0aW9uczogbnVtYmVyW10gPSBbXTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHBhZ2VJbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcGFnZVNpemVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgbGlzdE9mUGFnZVNpemVPcHRpb246IEFycmF5PHsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBvblBhZ2VTaXplQ2hhbmdlKHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2VTaXplICE9PSBzaXplKSB7XG4gICAgICB0aGlzLnBhZ2VTaXplQ2hhbmdlLm5leHQoc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAganVtcFRvUGFnZVZpYUlucHV0KCRldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXQgPSAkZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKHRvTnVtYmVyKHRhcmdldC52YWx1ZSwgdGhpcy5wYWdlSW5kZXgpKTtcbiAgICB0aGlzLnBhZ2VJbmRleENoYW5nZS5uZXh0KGluZGV4KTtcbiAgICB0YXJnZXQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHRyYWNrQnlPcHRpb24oXzogbnVtYmVyLCBvcHRpb246IHsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9KTogbnVtYmVyIHtcbiAgICByZXR1cm4gb3B0aW9uLnZhbHVlO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgcGFnZVNpemUsIHBhZ2VTaXplT3B0aW9ucywgbG9jYWxlIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChwYWdlU2l6ZSB8fCBwYWdlU2l6ZU9wdGlvbnMgfHwgbG9jYWxlKSB7XG4gICAgICB0aGlzLmxpc3RPZlBhZ2VTaXplT3B0aW9uID0gWy4uLm5ldyBTZXQoWy4uLnRoaXMucGFnZVNpemVPcHRpb25zLCB0aGlzLnBhZ2VTaXplXSldLm1hcChpdGVtID0+ICh7XG4gICAgICAgIHZhbHVlOiBpdGVtLFxuICAgICAgICBsYWJlbDogYCR7aXRlbX0gJHt0aGlzLmxvY2FsZS5pdGVtc19wZXJfcGFnZX1gXG4gICAgICB9KSk7XG4gICAgfVxuICB9XG59XG4iXX0=