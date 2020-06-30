/**
 * @fileoverview added by tsickle
 * Generated from: src/addon/filter.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * @record
 */
function NzThItemInterface() { }
if (false) {
    /** @type {?} */
    NzThItemInterface.prototype.text;
    /** @type {?} */
    NzThItemInterface.prototype.value;
    /** @type {?} */
    NzThItemInterface.prototype.checked;
}
export class NzTableFilterComponent {
    /**
     * @param {?} cdr
     * @param {?} i18n
     */
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
        this.isChanged = false;
        this.isChecked = false;
        this.isVisible = false;
        this.listOfParsedFilter = [];
    }
    /**
     * @param {?} _
     * @param {?} item
     * @return {?}
     */
    trackByValue(_, item) {
        return item.value;
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    check(filter) {
        this.isChanged = true;
        if (this.filterMultiple) {
            this.listOfParsedFilter = this.listOfParsedFilter.map((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (item === filter) {
                    return Object.assign(Object.assign({}, item), { checked: !filter.checked });
                }
                else {
                    return item;
                }
            }));
            filter.checked = !filter.checked;
        }
        else {
            this.listOfParsedFilter = this.listOfParsedFilter.map((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                return Object.assign(Object.assign({}, item), { checked: item === filter });
            }));
        }
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    }
    /**
     * @return {?}
     */
    confirm() {
        this.isVisible = false;
        this.emitFilterData();
    }
    /**
     * @return {?}
     */
    reset() {
        this.isChanged = true;
        this.isVisible = false;
        this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        this.emitFilterData();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onVisibleChange(value) {
        this.isVisible = value;
        if (!value) {
            this.emitFilterData();
        }
    }
    /**
     * @return {?}
     */
    emitFilterData() {
        if (this.isChanged) {
            /** @type {?} */
            const listOfChecked = this.listOfParsedFilter.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => item.checked)).map((/**
             * @param {?} item
             * @return {?}
             */
            item => item.value));
            if (this.filterMultiple) {
                this.filterChange.emit(listOfChecked);
            }
            else {
                this.filterChange.emit(listOfChecked[0] || null);
            }
            this.isChanged = false;
        }
    }
    /**
     * @param {?} listOfFilter
     * @param {?=} reset
     * @return {?}
     */
    parseListOfFilter(listOfFilter, reset) {
        return listOfFilter.map((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            /** @type {?} */
            const checked = reset ? false : !!item.byDefault;
            return { text: item.text, value: item.value, checked };
        }));
    }
    /**
     * @param {?} listOfParsedFilter
     * @return {?}
     */
    getCheckedStatus(listOfParsedFilter) {
        return listOfParsedFilter.some((/**
         * @param {?} item
         * @return {?}
         */
        item => item.checked));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        () => {
            this.locale = this.i18n.getLocaleData('Table');
            this.cdr.markForCheck();
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { listOfFilter } = changes;
        if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
            this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
            this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTableFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table-filter',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <span class="ant-table-filter-column-title">
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
            <li nz-menu-item [nzSelected]="f.checked" *ngFor="let f of listOfParsedFilter; trackBy: trackByValue" (click)="check(f)">
              <label nz-radio *ngIf="!filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <label nz-checkbox *ngIf="filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <span>{{ f.text }}</span>
            </li>
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isChecked">{{ locale.filterReset }}</button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    </ng-container>
  `,
                host: {
                    '[class.ant-table-filter-column]': 'true'
                }
            }] }
];
/** @nocollapse */
NzTableFilterComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzI18nService }
];
NzTableFilterComponent.propDecorators = {
    contentTemplate: [{ type: Input }],
    customFilter: [{ type: Input }],
    extraTemplate: [{ type: Input }],
    filterMultiple: [{ type: Input }],
    listOfFilter: [{ type: Input }],
    filterChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NzTableFilterComponent.prototype.contentTemplate;
    /** @type {?} */
    NzTableFilterComponent.prototype.customFilter;
    /** @type {?} */
    NzTableFilterComponent.prototype.extraTemplate;
    /** @type {?} */
    NzTableFilterComponent.prototype.filterMultiple;
    /** @type {?} */
    NzTableFilterComponent.prototype.listOfFilter;
    /** @type {?} */
    NzTableFilterComponent.prototype.filterChange;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.destroy$;
    /** @type {?} */
    NzTableFilterComponent.prototype.locale;
    /** @type {?} */
    NzTableFilterComponent.prototype.isChanged;
    /** @type {?} */
    NzTableFilterComponent.prototype.isChecked;
    /** @type {?} */
    NzTableFilterComponent.prototype.isVisible;
    /** @type {?} */
    NzTableFilterComponent.prototype.listOfParsedFilter;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.i18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdGFibGUvIiwic291cmNlcyI6WyJzcmMvYWRkb24vZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0sb0JBQW9CLENBQUM7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHM0MsZ0NBSUM7OztJQUhDLGlDQUFhOztJQUNiLGtDQUFpQjs7SUFDakIsb0NBQWlCOztBQTBDbkIsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFnRmpDLFlBQW9CLEdBQXNCLEVBQVUsSUFBbUI7UUFBbkQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBL0U5RCxvQkFBZSxHQUFrQyxJQUFJLENBQUM7UUFDdEQsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsa0JBQWEsR0FBa0MsSUFBSSxDQUFDO1FBQ3BELG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGlCQUFZLEdBQXNCLEVBQUUsQ0FBQztRQUMzQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO1FBQ3RFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRWpDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHVCQUFrQixHQUF3QixFQUFFLENBQUM7SUFvRTZCLENBQUM7Ozs7OztJ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WUExSUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osaUNBQWlDLEVBQUUsTUFBTTtpQkFDMUM7YUFDRjs7OztZQTlEQyxpQkFBaUI7WUFhVixhQUFhOzs7OEJBbURuQixLQUFLOzJCQUNMLEtBQUs7NEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsTUFBTTs7OztJQUxQLGlEQUErRDs7SUFDL0QsOENBQThCOztJQUM5QiwrQ0FBNkQ7O0lBQzdELGdEQUErQjs7SUFDL0IsOENBQThDOztJQUM5Qyw4Q0FBOEU7Ozs7O0lBQzlFLDBDQUFpQzs7SUFDakMsd0NBQThCOztJQUM5QiwyQ0FBa0I7O0lBQ2xCLDJDQUFrQjs7SUFDbEIsMkNBQWtCOztJQUNsQixvREFBNkM7Ozs7O0lBb0VqQyxxQ0FBOEI7Ozs7O0lBQUUsc0NBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UsIE56VGFibGVJMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56VGFibGVGaWx0ZXJMaXN0IH0gZnJvbSAnLi4vdGFibGUudHlwZXMnO1xuXG5pbnRlcmZhY2UgTnpUaEl0ZW1JbnRlcmZhY2Uge1xuICB0ZXh0OiBzdHJpbmc7XG4gIHZhbHVlOiBOelNhZmVBbnk7XG4gIGNoZWNrZWQ6IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYmxlLWZpbHRlcicsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBjbGFzcz1cImFudC10YWJsZS1maWx0ZXItY29sdW1uLXRpdGxlXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L3NwYW4+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjdXN0b21GaWx0ZXI7IGVsc2UgZXh0cmFUZW1wbGF0ZVwiPlxuICAgICAgPG56LWZpbHRlci10cmlnZ2VyXG4gICAgICAgIFtuelZpc2libGVdPVwiaXNWaXNpYmxlXCJcbiAgICAgICAgW256QWN0aXZlXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgIFtuekRyb3Bkb3duTWVudV09XCJmaWx0ZXJNZW51XCJcbiAgICAgICAgKG56VmlzaWJsZUNoYW5nZSk9XCJvblZpc2libGVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZmlsdGVyXCIgbnpUaGVtZT1cImZpbGxcIj48L2k+XG4gICAgICA8L256LWZpbHRlci10cmlnZ2VyPlxuICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI2ZpbHRlck1lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRhYmxlLWZpbHRlci1kcm9wZG93blwiPlxuICAgICAgICAgIDx1bCBuei1tZW51PlxuICAgICAgICAgICAgPGxpIG56LW1lbnUtaXRlbSBbbnpTZWxlY3RlZF09XCJmLmNoZWNrZWRcIiAqbmdGb3I9XCJsZXQgZiBvZiBsaXN0T2ZQYXJzZWRGaWx0ZXI7IHRyYWNrQnk6IHRyYWNrQnlWYWx1ZVwiIChjbGljayk9XCJjaGVjayhmKVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgbnotcmFkaW8gKm5nSWY9XCIhZmlsdGVyTXVsdGlwbGVcIiBbbmdNb2RlbF09XCJmLmNoZWNrZWRcIiAobmdNb2RlbENoYW5nZSk9XCJjaGVjayhmKVwiPjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxsYWJlbCBuei1jaGVja2JveCAqbmdJZj1cImZpbHRlck11bHRpcGxlXCIgW25nTW9kZWxdPVwiZi5jaGVja2VkXCIgKG5nTW9kZWxDaGFuZ2UpPVwiY2hlY2soZilcIj48L2xhYmVsPlxuICAgICAgICAgICAgICA8c3Bhbj57eyBmLnRleHQgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC10YWJsZS1maWx0ZXItZHJvcGRvd24tYnRuc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBuei1idXR0b24gbnpUeXBlPVwibGlua1wiIG56U2l6ZT1cInNtYWxsXCIgKGNsaWNrKT1cInJlc2V0KClcIiBbZGlzYWJsZWRdPVwiIWlzQ2hlY2tlZFwiPnt7IGxvY2FsZS5maWx0ZXJSZXNldCB9fTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBuei1idXR0b24gbnpUeXBlPVwicHJpbWFyeVwiIG56U2l6ZT1cInNtYWxsXCIgKGNsaWNrKT1cImNvbmZpcm0oKVwiPnt7IGxvY2FsZS5maWx0ZXJDb25maXJtIH19PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtZmlsdGVyLWNvbHVtbl0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRhYmxlRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjdXN0b21GaWx0ZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgZXh0cmFUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBmaWx0ZXJNdWx0aXBsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGxpc3RPZkZpbHRlcjogTnpUYWJsZUZpbHRlckxpc3QgPSBbXTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGZpbHRlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpTYWZlQW55W10gfCBOelNhZmVBbnk+KCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBsb2NhbGUhOiBOelRhYmxlSTE4bkludGVyZmFjZTtcbiAgaXNDaGFuZ2VkID0gZmFsc2U7XG4gIGlzQ2hlY2tlZCA9IGZhbHNlO1xuICBpc1Zpc2libGUgPSBmYWxzZTtcbiAgbGlzdE9mUGFyc2VkRmlsdGVyOiBOelRoSXRlbUludGVyZmFjZVtdID0gW107XG5cbiAgdHJhY2tCeVZhbHVlKF86IG51bWJlciwgaXRlbTogTnpUaEl0ZW1JbnRlcmZhY2UpOiBOelNhZmVBbnkge1xuICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICB9XG5cbiAgY2hlY2soZmlsdGVyOiBOelRoSXRlbUludGVyZmFjZSk6IHZvaWQge1xuICAgIHRoaXMuaXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5maWx0ZXJNdWx0aXBsZSkge1xuICAgICAgdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIgPSB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlci5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtID09PSBmaWx0ZXIpIHtcbiAgICAgICAgICByZXR1cm4geyAuLi5pdGVtLCBjaGVja2VkOiAhZmlsdGVyLmNoZWNrZWQgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBmaWx0ZXIuY2hlY2tlZCA9ICFmaWx0ZXIuY2hlY2tlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIgPSB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlci5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7IC4uLml0ZW0sIGNoZWNrZWQ6IGl0ZW0gPT09IGZpbHRlciB9O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuaXNDaGVja2VkID0gdGhpcy5nZXRDaGVja2VkU3RhdHVzKHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyKTtcbiAgfVxuXG4gIGNvbmZpcm0oKTogdm9pZCB7XG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXRGaWx0ZXJEYXRhKCk7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzQ2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlciA9IHRoaXMucGFyc2VMaXN0T2ZGaWx0ZXIodGhpcy5saXN0T2ZGaWx0ZXIsIHRydWUpO1xuICAgIHRoaXMuaXNDaGVja2VkID0gdGhpcy5nZXRDaGVja2VkU3RhdHVzKHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyKTtcbiAgICB0aGlzLmVtaXRGaWx0ZXJEYXRhKCk7XG4gIH1cblxuICBvblZpc2libGVDaGFuZ2UodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzVmlzaWJsZSA9IHZhbHVlO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMuZW1pdEZpbHRlckRhdGEoKTtcbiAgICB9XG4gIH1cblxuICBlbWl0RmlsdGVyRGF0YSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0NoYW5nZWQpIHtcbiAgICAgIGNvbnN0IGxpc3RPZkNoZWNrZWQgPSB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlci5maWx0ZXIoaXRlbSA9PiBpdGVtLmNoZWNrZWQpLm1hcChpdGVtID0+IGl0ZW0udmFsdWUpO1xuICAgICAgaWYgKHRoaXMuZmlsdGVyTXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJDaGFuZ2UuZW1pdChsaXN0T2ZDaGVja2VkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmlsdGVyQ2hhbmdlLmVtaXQobGlzdE9mQ2hlY2tlZFswXSB8fCBudWxsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VMaXN0T2ZGaWx0ZXIobGlzdE9mRmlsdGVyOiBOelRhYmxlRmlsdGVyTGlzdCwgcmVzZXQ/OiBib29sZWFuKTogTnpUaEl0ZW1JbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIGxpc3RPZkZpbHRlci5tYXAoaXRlbSA9PiB7XG4gICAgICBjb25zdCBjaGVja2VkID0gcmVzZXQgPyBmYWxzZSA6ICEhaXRlbS5ieURlZmF1bHQ7XG4gICAgICByZXR1cm4geyB0ZXh0OiBpdGVtLnRleHQsIHZhbHVlOiBpdGVtLnZhbHVlLCBjaGVja2VkIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXRDaGVja2VkU3RhdHVzKGxpc3RPZlBhcnNlZEZpbHRlcjogTnpUaEl0ZW1JbnRlcmZhY2VbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsaXN0T2ZQYXJzZWRGaWx0ZXIuc29tZShpdGVtID0+IGl0ZW0uY2hlY2tlZCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnVGFibGUnKTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbGlzdE9mRmlsdGVyIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChsaXN0T2ZGaWx0ZXIgJiYgdGhpcy5saXN0T2ZGaWx0ZXIgJiYgdGhpcy5saXN0T2ZGaWx0ZXIubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlciA9IHRoaXMucGFyc2VMaXN0T2ZGaWx0ZXIodGhpcy5saXN0T2ZGaWx0ZXIpO1xuICAgICAgdGhpcy5pc0NoZWNrZWQgPSB0aGlzLmdldENoZWNrZWRTdGF0dXModGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIpO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==