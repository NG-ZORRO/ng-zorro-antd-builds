/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { arraysEqual } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/i18n";
import * as i2 from "./filter-trigger.component";
import * as i3 from "ng-zorro-antd/dropdown";
import * as i4 from "ng-zorro-antd/radio";
import * as i5 from "ng-zorro-antd/checkbox";
import * as i6 from "ng-zorro-antd/button";
import * as i7 from "@angular/common";
import * as i8 from "ng-zorro-antd/core/transition-patch";
import * as i9 from "ng-zorro-antd/icon";
import * as i10 from "ng-zorro-antd/menu";
import * as i11 from "@angular/forms";
import * as i12 from "ng-zorro-antd/core/wave";
export class NzTableFilterComponent {
    constructor(cdr, i18n) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.contentTemplate = null;
        this.customFilter = false;
        this.extraTemplate = null;
        this.filterMultiple = true;
        this.listOfFilter = [];
        this.filterChange = new EventEmitter();
        this.destroy$ = new Subject();
        this.isChecked = false;
        this.isVisible = false;
        this.listOfParsedFilter = [];
        this.listOfChecked = [];
    }
    trackByValue(_, item) {
        return item.value;
    }
    check(filter) {
        if (this.filterMultiple) {
            this.listOfParsedFilter = this.listOfParsedFilter.map(item => {
                if (item === filter) {
                    return { ...item, checked: !filter.checked };
                }
                else {
                    return item;
                }
            });
            filter.checked = !filter.checked;
        }
        else {
            this.listOfParsedFilter = this.listOfParsedFilter.map(item => ({ ...item, checked: item === filter }));
        }
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    }
    confirm() {
        this.isVisible = false;
        this.emitFilterData();
    }
    reset() {
        this.isVisible = false;
        this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        this.emitFilterData();
    }
    onVisibleChange(value) {
        this.isVisible = value;
        if (!value) {
            this.emitFilterData();
        }
        else {
            this.listOfChecked = this.listOfParsedFilter.filter(item => item.checked).map(item => item.value);
        }
    }
    emitFilterData() {
        const listOfChecked = this.listOfParsedFilter.filter(item => item.checked).map(item => item.value);
        if (!arraysEqual(this.listOfChecked, listOfChecked)) {
            if (this.filterMultiple) {
                this.filterChange.emit(listOfChecked);
            }
            else {
                this.filterChange.emit(listOfChecked.length > 0 ? listOfChecked[0] : null);
            }
        }
    }
    parseListOfFilter(listOfFilter, reset) {
        return listOfFilter.map(item => {
            const checked = reset ? false : !!item.byDefault;
            return { text: item.text, value: item.value, checked };
        });
    }
    getCheckedStatus(listOfParsedFilter) {
        return listOfParsedFilter.some(item => item.checked);
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Table');
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { listOfFilter } = changes;
        if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
            this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
            this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTableFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableFilterComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzI18nService }], target: i0.ɵɵFactoryTarget.Component });
NzTableFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableFilterComponent, selector: "nz-table-filter", inputs: { contentTemplate: "contentTemplate", customFilter: "customFilter", extraTemplate: "extraTemplate", filterMultiple: "filterMultiple", listOfFilter: "listOfFilter" }, outputs: { filterChange: "filterChange" }, host: { classAttribute: "ant-table-filter-column" }, usesOnChanges: true, ngImport: i0, template: `
    <span class="ant-table-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    <ng-container *ngIf="!customFilter; else extraTemplate">
      <nz-filter-trigger
        [nzVisible]="isVisible"
        [nzActive]="isChecked"
        [nzDropdownMenu]="filterMenu"
        (nzVisibleChange)="onVisibleChange($event)"
      >
        <i nz-icon nzType="filter" nzTheme="fill"></i>
      </nz-filter-trigger>
      <nz-dropdown-menu #filterMenu="nzDropdownMenu">
        <div class="ant-table-filter-dropdown">
          <ul nz-menu>
            <li
              nz-menu-item
              [nzSelected]="f.checked"
              *ngFor="let f of listOfParsedFilter; trackBy: trackByValue"
              (click)="check(f)"
            >
              <label nz-radio *ngIf="!filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <label nz-checkbox *ngIf="filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <span>{{ f.text }}</span>
            </li>
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isChecked">
              {{ locale.filterReset }}
            </button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    </ng-container>
  `, isInline: true, components: [{ type: i2.NzFilterTriggerComponent, selector: "nz-filter-trigger", inputs: ["nzActive", "nzDropdownMenu", "nzVisible", "nzBackdrop"], outputs: ["nzVisibleChange"], exportAs: ["nzFilterTrigger"] }, { type: i3.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { type: i4.NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: ["nzValue", "nzDisabled", "nzAutoFocus"], exportAs: ["nzRadio"] }, { type: i5.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { type: i6.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i9.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i10.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i10.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { type: i11.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i11.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i12.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table-filter',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <span class="ant-table-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    <ng-container *ngIf="!customFilter; else extraTemplate">
      <nz-filter-trigger
        [nzVisible]="isVisible"
        [nzActive]="isChecked"
        [nzDropdownMenu]="filterMenu"
        (nzVisibleChange)="onVisibleChange($event)"
      >
        <i nz-icon nzType="filter" nzTheme="fill"></i>
      </nz-filter-trigger>
      <nz-dropdown-menu #filterMenu="nzDropdownMenu">
        <div class="ant-table-filter-dropdown">
          <ul nz-menu>
            <li
              nz-menu-item
              [nzSelected]="f.checked"
              *ngFor="let f of listOfParsedFilter; trackBy: trackByValue"
              (click)="check(f)"
            >
              <label nz-radio *ngIf="!filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <label nz-checkbox *ngIf="filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <span>{{ f.text }}</span>
            </li>
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isChecked">
              {{ locale.filterReset }}
            </button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    </ng-container>
  `,
                    host: { class: 'ant-table-filter-column' }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NzI18nService }]; }, propDecorators: { contentTemplate: [{
                type: Input
            }], customFilter: [{
                type: Input
            }], extraTemplate: [{
                type: Input
            }], filterMultiple: [{
                type: Input
            }], listOfFilter: [{
                type: Input
            }], filterChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvdGFibGUvc3JjL2FkZG9uL2ZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUF1RHRELE1BQU0sT0FBTyxzQkFBc0I7SUE2RWpDLFlBQW9CLEdBQXNCLEVBQVUsSUFBbUI7UUFBbkQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBNUU5RCxvQkFBZSxHQUFrQyxJQUFJLENBQUM7UUFDdEQsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsa0JBQWEsR0FBa0MsSUFBSSxDQUFDO1FBQ3BELG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGlCQUFZLEdBQXNCLEVBQUUsQ0FBQztRQUMzQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO1FBQ3RFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRWpDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQix1QkFBa0IsR0FBd0IsRUFBRSxDQUFDO1FBQzdDLGtCQUFhLEdBQWdCLEVBQUUsQ0FBQztJQWlFMEMsQ0FBQztJQS9EM0UsWUFBWSxDQUFDLENBQVMsRUFBRSxJQUF1QjtRQUM3QyxPQUFPLElBQUksQ0FBQyxL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QUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7bUhBaEdVLHNCQUFzQjt1R0FBdEIsc0JBQXNCLDBWQXZDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DVDsyRkFHVSxzQkFBc0I7a0JBNUNsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ1Q7b0JBQ0QsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFO2lCQUMzQztvSUFFVSxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ2EsWUFBWTtzQkFBOUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IGFycmF5c0VxdWFsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgTnpJMThuU2VydmljZSwgTnpUYWJsZUkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5pbXBvcnQgeyBOelRhYmxlRmlsdGVyTGlzdCB9IGZyb20gJy4uL3RhYmxlLnR5cGVzJztcblxuaW50ZXJmYWNlIE56VGhJdGVtSW50ZXJmYWNlIHtcbiAgdGV4dDogc3RyaW5nO1xuICB2YWx1ZTogTnpTYWZlQW55O1xuICBjaGVja2VkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10YWJsZS1maWx0ZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gY2xhc3M9XCJhbnQtdGFibGUtY29sdW1uLXRpdGxlXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L3NwYW4+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjdXN0b21GaWx0ZXI7IGVsc2UgZXh0cmFUZW1wbGF0ZVwiPlxuICAgICAgPG56LWZpbHRlci10cmlnZ2VyXG4gICAgICAgIFtuelZpc2libGVdPVwiaXNWaXNpYmxlXCJcbiAgICAgICAgW256QWN0aXZlXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgIFtuekRyb3Bkb3duTWVudV09XCJmaWx0ZXJNZW51XCJcbiAgICAgICAgKG56VmlzaWJsZUNoYW5nZSk9XCJvblZpc2libGVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZmlsdGVyXCIgbnpUaGVtZT1cImZpbGxcIj48L2k+XG4gICAgICA8L256LWZpbHRlci10cmlnZ2VyPlxuICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI2ZpbHRlck1lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRhYmxlLWZpbHRlci1kcm9wZG93blwiPlxuICAgICAgICAgIDx1bCBuei1tZW51PlxuICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgIG56LW1lbnUtaXRlbVxuICAgICAgICAgICAgICBbbnpTZWxlY3RlZF09XCJmLmNoZWNrZWRcIlxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgZiBvZiBsaXN0T2ZQYXJzZWRGaWx0ZXI7IHRyYWNrQnk6IHRyYWNrQnlWYWx1ZVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJjaGVjayhmKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxsYWJlbCBuei1yYWRpbyAqbmdJZj1cIiFmaWx0ZXJNdWx0aXBsZVwiIFtuZ01vZGVsXT1cImYuY2hlY2tlZFwiIChuZ01vZGVsQ2hhbmdlKT1cImNoZWNrKGYpXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGxhYmVsIG56LWNoZWNrYm94ICpuZ0lmPVwiZmlsdGVyTXVsdGlwbGVcIiBbbmdNb2RlbF09XCJmLmNoZWNrZWRcIiAobmdNb2RlbENoYW5nZSk9XCJjaGVjayhmKVwiPjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IGYudGV4dCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRhYmxlLWZpbHRlci1kcm9wZG93bi1idG5zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIG56LWJ1dHRvbiBuelR5cGU9XCJsaW5rXCIgbnpTaXplPVwic21hbGxcIiAoY2xpY2spPVwicmVzZXQoKVwiIFtkaXNhYmxlZF09XCIhaXNDaGVja2VkXCI+XG4gICAgICAgICAgICAgIHt7IGxvY2FsZS5maWx0ZXJSZXNldCB9fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG56LWJ1dHRvbiBuelR5cGU9XCJwcmltYXJ5XCIgbnpTaXplPVwic21hbGxcIiAoY2xpY2spPVwiY29uZmlybSgpXCI+e3sgbG9jYWxlLmZpbHRlckNvbmZpcm0gfX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L256LWRyb3Bkb3duLW1lbnU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGhvc3Q6IHsgY2xhc3M6ICdhbnQtdGFibGUtZmlsdGVyLWNvbHVtbicgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRhYmxlRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjdXN0b21GaWx0ZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgZXh0cmFUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBmaWx0ZXJNdWx0aXBsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGxpc3RPZkZpbHRlcjogTnpUYWJsZUZpbHRlckxpc3QgPSBbXTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGZpbHRlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpTYWZlQW55W10gfCBOelNhZmVBbnk+KCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBsb2NhbGUhOiBOelRhYmxlSTE4bkludGVyZmFjZTtcbiAgaXNDaGVja2VkID0gZmFsc2U7XG4gIGlzVmlzaWJsZSA9IGZhbHNlO1xuICBsaXN0T2ZQYXJzZWRGaWx0ZXI6IE56VGhJdGVtSW50ZXJmYWNlW10gPSBbXTtcbiAgbGlzdE9mQ2hlY2tlZDogTnpTYWZlQW55W10gPSBbXTtcblxuICB0cmFja0J5VmFsdWUoXzogbnVtYmVyLCBpdGVtOiBOelRoSXRlbUludGVyZmFjZSk6IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIGl0ZW0udmFsdWU7XG4gIH1cblxuICBjaGVjayhmaWx0ZXI6IE56VGhJdGVtSW50ZXJmYWNlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmlsdGVyTXVsdGlwbGUpIHtcbiAgICAgIHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyID0gdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIubWFwKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbSA9PT0gZmlsdGVyKSB7XG4gICAgICAgICAgcmV0dXJuIHsgLi4uaXRlbSwgY2hlY2tlZDogIWZpbHRlci5jaGVja2VkIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZmlsdGVyLmNoZWNrZWQgPSAhZmlsdGVyLmNoZWNrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyID0gdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIubWFwKGl0ZW0gPT4gKHsgLi4uaXRlbSwgY2hlY2tlZDogaXRlbSA9PT0gZmlsdGVyIH0pKTtcbiAgICB9XG4gICAgdGhpcy5pc0NoZWNrZWQgPSB0aGlzLmdldENoZWNrZWRTdGF0dXModGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIpO1xuICB9XG5cbiAgY29uZmlybSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdEZpbHRlckRhdGEoKTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIgPSB0aGlzLnBhcnNlTGlzdE9mRmlsdGVyKHRoaXMubGlzdE9mRmlsdGVyLCB0cnVlKTtcbiAgICB0aGlzLmlzQ2hlY2tlZCA9IHRoaXMuZ2V0Q2hlY2tlZFN0YXR1cyh0aGlzLmxpc3RPZlBhcnNlZEZpbHRlcik7XG4gICAgdGhpcy5lbWl0RmlsdGVyRGF0YSgpO1xuICB9XG5cbiAgb25WaXNpYmxlQ2hhbmdlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc1Zpc2libGUgPSB2YWx1ZTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLmVtaXRGaWx0ZXJEYXRhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdE9mQ2hlY2tlZCA9IHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyLmZpbHRlcihpdGVtID0+IGl0ZW0uY2hlY2tlZCkubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZW1pdEZpbHRlckRhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgbGlzdE9mQ2hlY2tlZCA9IHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyLmZpbHRlcihpdGVtID0+IGl0ZW0uY2hlY2tlZCkubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSk7XG4gICAgaWYgKCFhcnJheXNFcXVhbCh0aGlzLmxpc3RPZkNoZWNrZWQsIGxpc3RPZkNoZWNrZWQpKSB7XG4gICAgICBpZiAodGhpcy5maWx0ZXJNdWx0aXBsZSkge1xuICAgICAgICB0aGlzLmZpbHRlckNoYW5nZS5lbWl0KGxpc3RPZkNoZWNrZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maWx0ZXJDaGFuZ2UuZW1pdChsaXN0T2ZDaGVja2VkLmxlbmd0aCA+IDAgPyBsaXN0T2ZDaGVja2VkWzBdIDogbnVsbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGFyc2VMaXN0T2ZGaWx0ZXIobGlzdE9mRmlsdGVyOiBOelRhYmxlRmlsdGVyTGlzdCwgcmVzZXQ/OiBib29sZWFuKTogTnpUaEl0ZW1JbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIGxpc3RPZkZpbHRlci5tYXAoaXRlbSA9PiB7XG4gICAgICBjb25zdCBjaGVja2VkID0gcmVzZXQgPyBmYWxzZSA6ICEhaXRlbS5ieURlZmF1bHQ7XG4gICAgICByZXR1cm4geyB0ZXh0OiBpdGVtLnRleHQsIHZhbHVlOiBpdGVtLnZhbHVlLCBjaGVja2VkIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXRDaGVja2VkU3RhdHVzKGxpc3RPZlBhcnNlZEZpbHRlcjogTnpUaEl0ZW1JbnRlcmZhY2VbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsaXN0T2ZQYXJzZWRGaWx0ZXIuc29tZShpdGVtID0+IGl0ZW0uY2hlY2tlZCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnVGFibGUnKTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbGlzdE9mRmlsdGVyIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChsaXN0T2ZGaWx0ZXIgJiYgdGhpcy5saXN0T2ZGaWx0ZXIgJiYgdGhpcy5saXN0T2ZGaWx0ZXIubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlciA9IHRoaXMucGFyc2VMaXN0T2ZGaWx0ZXIodGhpcy5saXN0T2ZGaWx0ZXIpO1xuICAgICAgdGhpcy5pc0NoZWNrZWQgPSB0aGlzLmdldENoZWNrZWRTdGF0dXModGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIpO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==