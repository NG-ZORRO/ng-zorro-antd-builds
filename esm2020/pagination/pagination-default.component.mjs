import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "./pagination-item.component";
import * as i3 from "./pagination-options.component";
import * as i4 from "@angular/common";
export class NzPaginationDefaultComponent {
    constructor(cdr, renderer, elementRef, directionality) {
        this.cdr = cdr;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.directionality = directionality;
        this.nzSize = 'default';
        this.itemRender = null;
        this.showTotal = null;
        this.disabled = false;
        this.showSizeChanger = false;
        this.showQuickJumper = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 20, 30, 40];
        this.pageIndexChange = new EventEmitter();
        this.pageSizeChange = new EventEmitter();
        this.ranges = [0, 0];
        this.listOfPageItem = [];
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.updateRtlStyle();
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.updateRtlStyle();
    }
    updateRtlStyle() {
        if (this.dir === 'rtl') {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    jumpPage(index) {
        this.onPageIndexChange(index);
    }
    jumpDiff(diff) {
        this.jumpPage(this.pageIndex + diff);
    }
    trackByPageItem(_, value) {
        return `${value.type}-${value.index}`;
    }
    onPageIndexChange(index) {
        this.pageIndexChange.next(index);
    }
    onPageSizeChange(size) {
        this.pageSizeChange.next(size);
    }
    getLastIndex(total, pageSize) {
        return Math.ceil(total / pageSize);
    }
    buildIndexes() {
        const lastIndex = this.getLastIndex(this.total, this.pageSize);
        this.listOfPageItem = this.getListOfPageItem(this.pageIndex, lastIndex);
    }
    getListOfPageItem(pageIndex, lastIndex) {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const concatWithPrevNext = (listOfPage) => {
            const prevItem = {
                type: 'prev',
                disabled: pageIndex === 1
            };
            const nextItem = {
                type: 'next',
                disabled: pageIndex === lastIndex
            };
            return [prevItem, ...listOfPage, nextItem];
        };
        const generatePage = (start, end) => {
            const list = [];
            for (let i = start; i <= end; i++) {
                list.push({
                    index: i,
                    type: 'page'
                });
            }
            return list;
        };
        if (lastIndex <= 9) {
            return concatWithPrevNext(generatePage(1, lastIndex));
        }
        else {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const generateRangeItem = (selected, last) => {
                let listOfRange = [];
                const prevFiveItem = {
                    type: 'prev_5'
                };
                const nextFiveItem = {
                    type: 'next_5'
                };
                const firstPageItem = generatePage(1, 1);
                const lastPageItem = generatePage(lastIndex, lastIndex);
                if (selected < 5) {
                    // If the 4th is selected, one more page will be displayed.
                    const maxLeft = selected === 4 ? 6 : 5;
                    listOfRange = [...generatePage(2, maxLeft), nextFiveItem];
                }
                else if (selected < last - 3) {
                    listOfRange = [prevFiveItem, ...generatePage(selected - 2, selected + 2), nextFiveItem];
                }
                else {
                    // If the 4th from last is selected, one more page will be displayed.
                    const minRight = selected === last - 3 ? last - 5 : last - 4;
                    listOfRange = [prevFiveItem, ...generatePage(minRight, last - 1)];
                }
                return [...firstPageItem, ...listOfRange, ...lastPageItem];
            };
            return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
        }
    }
    ngOnChanges(changes) {
        const { pageIndex, pageSize, total } = changes;
        if (pageIndex || pageSize || total) {
            this.ranges = [(this.pageIndex - 1) * this.pageSize + 1, Math.min(this.pageIndex * this.pageSize, this.total)];
            this.buildIndexes();
        }
    }
}
NzPaginationDefaultComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationDefaultComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzPaginationDefaultComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPaginationDefaultComponent, selector: "nz-pagination-default", inputs: { nzSize: "nzSize", itemRender: "itemRender", showTotal: "showTotal", disabled: "disabled", locale: "locale", showSizeChanger: "showSizeChanger", showQuickJumper: "showQuickJumper", total: "total", pageIndex: "pageIndex", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { pageIndexChange: "pageIndexChange", pageSizeChange: "pageSizeChange" }, viewQueries: [{ propertyName: "template", first: true, predicate: ["containerTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #containerTemplate>
      <li class="ant-pagination-total-text" *ngIf="showTotal">
        <ng-template
          [ngTemplateOutlet]="showTotal"
          [ngTemplateOutletContext]="{ $implicit: total, range: ranges }"
        ></ng-template>
      </li>
      <li
        *ngFor="let page of listOfPageItem; trackBy: trackByPageItem"
        nz-pagination-item
        [locale]="locale"
        [type]="page.type"
        [index]="page.index"
        [disabled]="!!page.disabled"
        [itemRender]="itemRender"
        [active]="pageIndex === page.index"
        (gotoIndex)="jumpPage($event)"
        (diffIndex)="jumpDiff($event)"
        [direction]="dir"
      ></li>
      <div
        nz-pagination-options
        *ngIf="showQuickJumper || showSizeChanger"
        [total]="total"
        [locale]="locale"
        [disabled]="disabled"
        [nzSize]="nzSize"
        [showSizeChanger]="showSizeChanger"
        [showQuickJumper]="showQuickJumper"
        [pageIndex]="pageIndex"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (pageIndexChange)="onPageIndexChange($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      ></div>
    </ng-template>
  `, isInline: true, components: [{ type: i2.NzPaginationItemComponent, selector: "li[nz-pagination-item]", inputs: ["active", "locale", "index", "disabled", "direction", "type", "itemRender"], outputs: ["diffIndex", "gotoIndex"] }, { type: i3.NzPaginationOptionsComponent, selector: "div[nz-pagination-options]", inputs: ["nzSize", "disabled", "showSizeChanger", "showQuickJumper", "locale", "total", "pageIndex", "pageSize", "pageSizeOptions"], outputs: ["pageIndexChange", "pageSizeChange"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationDefaultComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-pagination-default',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #containerTemplate>
      <li class="ant-pagination-total-text" *ngIf="showTotal">
        <ng-template
          [ngTemplateOutlet]="showTotal"
          [ngTemplateOutletContext]="{ $implicit: total, range: ranges }"
        ></ng-template>
      </li>
      <li
        *ngFor="let page of listOfPageItem; trackBy: trackByPageItem"
        nz-pagination-item
        [locale]="locale"
        [type]="page.type"
        [index]="page.index"
        [disabled]="!!page.disabled"
        [itemRender]="itemRender"
        [active]="pageIndex === page.index"
        (gotoIndex)="jumpPage($event)"
        (diffIndex)="jumpDiff($event)"
        [direction]="dir"
      ></li>
      <div
        nz-pagination-options
        *ngIf="showQuickJumper || showSizeChanger"
        [total]="total"
        [locale]="locale"
        [disabled]="disabled"
        [nzSize]="nzSize"
        [showSizeChanger]="showSizeChanger"
        [showQuickJumper]="showQuickJumper"
        [pageIndex]="pageIndex"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (pageIndexChange)="onPageIndexChange($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      ></div>
    </ng-template>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { template: [{
                type: ViewChild,
                args: ['containerTemplate', { static: true }]
            }], nzSize: [{
                type: Input
            }], itemRender: [{
                type: Input
            }], showTotal: [{
                type: Input
            }], disabled: [{
                type: Input
            }], locale: [{
                type: Input
            }], showSizeChanger: [{
                type: Input
            }], showQuickJumper: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1kZWZhdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLWRlZmF1bHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFJTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFvRDNDLE1BQU0sT0FBTyw0QkFBNEI7SUFxQnZDLFlBQ1UsR0FBc0IsRUFDdEIsUUFBbUIsRUFDbkIsVUFBc0IsRUFDVixjQUE4QjtRQUgxQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDVixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF2QjNDLFdBQU0sR0FBd0IsU0FBUyxDQUFDO1FBQ3hDLGVBQVUsR0FBb0QsSUFBSSxDQUFDO1FBQ25FLGNBQVMsR0FBdUUsSUFBSSxDQUFDO1FBQ3JGLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2Qsb0JBQWUsR0FBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztR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QWM7c0JBQWhDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcblxuaW1wb3J0IHsgTnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uSXRlbVJlbmRlckNvbnRleHQgfSBmcm9tICcuL3BhZ2luYXRpb24udHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1wYWdpbmF0aW9uLWRlZmF1bHQnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNjb250YWluZXJUZW1wbGF0ZT5cbiAgICAgIDxsaSBjbGFzcz1cImFudC1wYWdpbmF0aW9uLXRvdGFsLXRleHRcIiAqbmdJZj1cInNob3dUb3RhbFwiPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJzaG93VG90YWxcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdG90YWwsIHJhbmdlOiByYW5nZXMgfVwiXG4gICAgICAgID48L25nLXRlbXBsYXRlPlxuICAgICAgPC9saT5cbiAgICAgIDxsaVxuICAgICAgICAqbmdGb3I9XCJsZXQgcGFnZSBvZiBsaXN0T2ZQYWdlSXRlbTsgdHJhY2tCeTogdHJhY2tCeVBhZ2VJdGVtXCJcbiAgICAgICAgbnotcGFnaW5hdGlvbi1pdGVtXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgW3R5cGVdPVwicGFnZS50eXBlXCJcbiAgICAgICAgW2luZGV4XT1cInBhZ2UuaW5kZXhcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiISFwYWdlLmRpc2FibGVkXCJcbiAgICAgICAgW2l0ZW1SZW5kZXJdPVwiaXRlbVJlbmRlclwiXG4gICAgICAgIFthY3RpdmVdPVwicGFnZUluZGV4ID09PSBwYWdlLmluZGV4XCJcbiAgICAgICAgKGdvdG9JbmRleCk9XCJqdW1wUGFnZSgkZXZlbnQpXCJcbiAgICAgICAgKGRpZmZJbmRleCk9XCJqdW1wRGlmZigkZXZlbnQpXCJcbiAgICAgICAgW2RpcmVjdGlvbl09XCJkaXJcIlxuICAgICAgPjwvbGk+XG4gICAgICA8ZGl2XG4gICAgICAgIG56LXBhZ2luYXRpb24tb3B0aW9uc1xuICAgICAgICAqbmdJZj1cInNob3dRdWlja0p1bXBlciB8fCBzaG93U2l6ZUNoYW5nZXJcIlxuICAgICAgICBbdG90YWxdPVwidG90YWxcIlxuICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIFtuelNpemVdPVwibnpTaXplXCJcbiAgICAgICAgW3Nob3dTaXplQ2hhbmdlcl09XCJzaG93U2l6ZUNoYW5nZXJcIlxuICAgICAgICBbc2hvd1F1aWNrSnVtcGVyXT1cInNob3dRdWlja0p1bXBlclwiXG4gICAgICAgIFtwYWdlSW5kZXhdPVwicGFnZUluZGV4XCJcbiAgICAgICAgW3BhZ2VTaXplXT1cInBhZ2VTaXplXCJcbiAgICAgICAgW3BhZ2VTaXplT3B0aW9uc109XCJwYWdlU2l6ZU9wdGlvbnNcIlxuICAgICAgICAocGFnZUluZGV4Q2hhbmdlKT1cIm9uUGFnZUluZGV4Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAocGFnZVNpemVDaGFuZ2UpPVwib25QYWdlU2l6ZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgID48L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56UGFnaW5hdGlvbkRlZmF1bHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyVGVtcGxhdGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSB0ZW1wbGF0ZSE6IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG4gIEBJbnB1dCgpIG56U2l6ZTogJ2RlZmF1bHQnIHwgJ3NtYWxsJyA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgaXRlbVJlbmRlcjogVGVtcGxhdGVSZWY8UGFnaW5hdGlvbkl0ZW1SZW5kZXJDb250ZXh0PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBzaG93VG90YWw6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBudW1iZXI7IHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIH0+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGxvY2FsZSE6IE56UGFnaW5hdGlvbkkxOG5JbnRlcmZhY2U7XG4gIEBJbnB1dCgpIHNob3dTaXplQ2hhbmdlciA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93UXVpY2tKdW1wZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgdG90YWwgPSAwO1xuICBASW5wdXQoKSBwYWdlSW5kZXggPSAxO1xuICBASW5wdXQoKSBwYWdlU2l6ZSA9IDEwO1xuICBASW5wdXQoKSBwYWdlU2l6ZU9wdGlvbnM6IG51bWJlcltdID0gWzEwLCAyMCwgMzAsIDQwXTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHBhZ2VJbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcGFnZVNpemVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcmFuZ2VzID0gWzAsIDBdO1xuICBsaXN0T2ZQYWdlSXRlbTogQXJyYXk8UGFydGlhbDxOelBhZ2luYXRpb25JdGVtQ29tcG9uZW50Pj4gPSBbXTtcblxuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHtcbiAgICByZW5kZXJlci5yZW1vdmVDaGlsZChyZW5kZXJlci5wYXJlbnROb2RlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCksIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMudXBkYXRlUnRsU3R5bGUoKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgdGhpcy51cGRhdGVSdGxTdHlsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSdGxTdHlsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXIgPT09ICdydGwnKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LXBhZ2luYXRpb24tcnRsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhbnQtcGFnaW5hdGlvbi1ydGwnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBqdW1wUGFnZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5vblBhZ2VJbmRleENoYW5nZShpbmRleCk7XG4gIH1cblxuICBqdW1wRGlmZihkaWZmOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmp1bXBQYWdlKHRoaXMucGFnZUluZGV4ICsgZGlmZik7XG4gIH1cblxuICB0cmFja0J5UGFnZUl0ZW0oXzogbnVtYmVyLCB2YWx1ZTogUGFydGlhbDxOelBhZ2luYXRpb25JdGVtQ29tcG9uZW50Pik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3ZhbHVlLnR5cGV9LSR7dmFsdWUuaW5kZXh9YDtcbiAgfVxuXG4gIG9uUGFnZUluZGV4Q2hhbmdlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VJbmRleENoYW5nZS5uZXh0KGluZGV4KTtcbiAgfVxuXG4gIG9uUGFnZVNpemVDaGFuZ2Uoc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlU2l6ZUNoYW5nZS5uZXh0KHNpemUpO1xuICB9XG5cbiAgZ2V0TGFzdEluZGV4KHRvdGFsOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmNlaWwodG90YWwgLyBwYWdlU2l6ZSk7XG4gIH1cblxuICBidWlsZEluZGV4ZXMoKTogdm9pZCB7XG4gICAgY29uc3QgbGFzdEluZGV4ID0gdGhpcy5nZXRMYXN0SW5kZXgodGhpcy50b3RhbCwgdGhpcy5wYWdlU2l6ZSk7XG4gICAgdGhpcy5saXN0T2ZQYWdlSXRlbSA9IHRoaXMuZ2V0TGlzdE9mUGFnZUl0ZW0odGhpcy5wYWdlSW5kZXgsIGxhc3RJbmRleCk7XG4gIH1cblxuICBnZXRMaXN0T2ZQYWdlSXRlbShwYWdlSW5kZXg6IG51bWJlciwgbGFzdEluZGV4OiBudW1iZXIpOiBBcnJheTxQYXJ0aWFsPE56UGFnaW5hdGlvbkl0ZW1Db21wb25lbnQ+PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1mdW5jdGlvbi1yZXR1cm4tdHlwZVxuICAgIGNvbnN0IGNvbmNhdFdpdGhQcmV2TmV4dCA9IChsaXN0T2ZQYWdlOiBBcnJheTxQYXJ0aWFsPE56UGFnaW5hdGlvbkl0ZW1Db21wb25lbnQ+PikgPT4ge1xuICAgICAgY29uc3QgcHJldkl0ZW0gPSB7XG4gICAgICAgIHR5cGU6ICdwcmV2JyxcbiAgICAgICAgZGlzYWJsZWQ6IHBhZ2VJbmRleCA9PT0gMVxuICAgICAgfTtcbiAgICAgIGNvbnN0IG5leHRJdGVtID0ge1xuICAgICAgICB0eXBlOiAnbmV4dCcsXG4gICAgICAgIGRpc2FibGVkOiBwYWdlSW5kZXggPT09IGxhc3RJbmRleFxuICAgICAgfTtcbiAgICAgIHJldHVybiBbcHJldkl0ZW0sIC4uLmxpc3RPZlBhZ2UsIG5leHRJdGVtXTtcbiAgICB9O1xuICAgIGNvbnN0IGdlbmVyYXRlUGFnZSA9IChzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IEFycmF5PFBhcnRpYWw8TnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudD4+ID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICBsaXN0LnB1c2goe1xuICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgIHR5cGU6ICdwYWdlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH07XG4gICAgaWYgKGxhc3RJbmRleCA8PSA5KSB7XG4gICAgICByZXR1cm4gY29uY2F0V2l0aFByZXZOZXh0KGdlbmVyYXRlUGFnZSgxLCBsYXN0SW5kZXgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1mdW5jdGlvbi1yZXR1cm4tdHlwZVxuICAgICAgY29uc3QgZ2VuZXJhdGVSYW5nZUl0ZW0gPSAoc2VsZWN0ZWQ6IG51bWJlciwgbGFzdDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGxldCBsaXN0T2ZSYW5nZSA9IFtdO1xuICAgICAgICBjb25zdCBwcmV2Rml2ZUl0ZW0gPSB7XG4gICAgICAgICAgdHlwZTogJ3ByZXZfNSdcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgbmV4dEZpdmVJdGVtID0ge1xuICAgICAgICAgIHR5cGU6ICduZXh0XzUnXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGZpcnN0UGFnZUl0ZW0gPSBnZW5lcmF0ZVBhZ2UoMSwgMSk7XG4gICAgICAgIGNvbnN0IGxhc3RQYWdlSXRlbSA9IGdlbmVyYXRlUGFnZShsYXN0SW5kZXgsIGxhc3RJbmRleCk7XG4gICAgICAgIGlmIChzZWxlY3RlZCA8IDUpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgNHRoIGlzIHNlbGVjdGVkLCBvbmUgbW9yZSBwYWdlIHdpbGwgYmUgZGlzcGxheWVkLlxuICAgICAgICAgIGNvbnN0IG1heExlZnQgPSBzZWxlY3RlZCA9PT0gNCA/IDYgOiA1O1xuICAgICAgICAgIGxpc3RPZlJhbmdlID0gWy4uLmdlbmVyYXRlUGFnZSgyLCBtYXhMZWZ0KSwgbmV4dEZpdmVJdGVtXTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZCA8IGxhc3QgLSAzKSB7XG4gICAgICAgICAgbGlzdE9mUmFuZ2UgPSBbcHJldkZpdmVJdGVtLCAuLi5nZW5lcmF0ZVBhZ2Uoc2VsZWN0ZWQgLSAyLCBzZWxlY3RlZCArIDIpLCBuZXh0Rml2ZUl0ZW1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIElmIHRoZSA0dGggZnJvbSBsYXN0IGlzIHNlbGVjdGVkLCBvbmUgbW9yZSBwYWdlIHdpbGwgYmUgZGlzcGxheWVkLlxuICAgICAgICAgIGNvbnN0IG1pblJpZ2h0ID0gc2VsZWN0ZWQgPT09IGxhc3QgLSAzID8gbGFzdCAtIDUgOiBsYXN0IC0gNDtcbiAgICAgICAgICBsaXN0T2ZSYW5nZSA9IFtwcmV2Rml2ZUl0ZW0sIC4uLmdlbmVyYXRlUGFnZShtaW5SaWdodCwgbGFzdCAtIDEpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gWy4uLmZpcnN0UGFnZUl0ZW0sIC4uLmxpc3RPZlJhbmdlLCAuLi5sYXN0UGFnZUl0ZW1dO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBjb25jYXRXaXRoUHJldk5leHQoZ2VuZXJhdGVSYW5nZUl0ZW0ocGFnZUluZGV4LCBsYXN0SW5kZXgpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBwYWdlSW5kZXgsIHBhZ2VTaXplLCB0b3RhbCB9ID0gY2hhbmdlcztcbiAgICBpZiAocGFnZUluZGV4IHx8IHBhZ2VTaXplIHx8IHRvdGFsKSB7XG4gICAgICB0aGlzLnJhbmdlcyA9IFsodGhpcy5wYWdlSW5kZXggLSAxKSAqIHRoaXMucGFnZVNpemUgKyAxLCBNYXRoLm1pbih0aGlzLnBhZ2VJbmRleCAqIHRoaXMucGFnZVNpemUsIHRoaXMudG90YWwpXTtcbiAgICAgIHRoaXMuYnVpbGRJbmRleGVzKCk7XG4gICAgfVxuICB9XG59XG4iXX0=