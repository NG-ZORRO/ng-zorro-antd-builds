import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { delay, filter, startWith, switchMap, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
import * as i2 from "ng-zorro-antd/core/services";
import * as i3 from "./table-content.component";
import * as i4 from "@angular/cdk/scrolling";
import * as i5 from "./tbody.component";
import * as i6 from "@angular/common";
export class NzTableInnerScrollComponent {
    constructor(renderer, ngZone, platform, resizeService) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.platform = platform;
        this.resizeService = resizeService;
        this.data = [];
        this.scrollX = null;
        this.scrollY = null;
        this.contentTemplate = null;
        this.widthConfig = [];
        this.listOfColWidth = [];
        this.theadTemplate = null;
        this.virtualTemplate = null;
        this.virtualItemSize = 0;
        this.virtualMaxBufferPx = 200;
        this.virtualMinBufferPx = 100;
        this.virtualForTrackBy = index => index;
        this.headerStyleMap = {};
        this.bodyStyleMap = {};
        this.verticalScrollBarWidth = 0;
        this.noDateVirtualHeight = '182px';
        this.data$ = new Subject();
        this.scroll$ = new Subject();
        this.destroy$ = new Subject();
    }
    setScrollPositionClassName(clear = false) {
        const { scrollWidth, scrollLeft, clientWidth } = this.tableBodyElement.nativeElement;
        const leftClassName = 'ant-table-ping-left';
        const rightClassName = 'ant-table-ping-right';
        if ((scrollWidth === clientWidth && scrollWidth !== 0) || clear) {
            this.renderer.removeClass(this.tableMainElement, leftClassName);
            this.renderer.removeClass(this.tableMainElement, rightClassName);
        }
        else if (scrollLeft === 0) {
            this.renderer.removeClass(this.tableMainElement, leftClassName);
            this.renderer.addClass(this.tableMainElement, rightClassName);
        }
        else if (scrollWidth === scrollLeft + clientWidth) {
            this.renderer.removeClass(this.tableMainElement, rightClassName);
            this.renderer.addClass(this.tableMainElement, leftClassName);
        }
        else {
            this.renderer.addClass(this.tableMainElement, leftClassName);
            this.renderer.addClass(this.tableMainElement, rightClassName);
        }
    }
    ngOnChanges(changes) {
        const { scrollX, scrollY, data } = changes;
        if (scrollX || scrollY) {
            const hasVerticalScrollBar = this.verticalScrollBarWidth !== 0;
            this.headerStyleMap = {
                overflowX: 'hidden',
                overflowY: this.scrollY && hasVerticalScrollBar ? 'scroll' : 'hidden'
            };
            this.bodyStyleMap = {
                overflowY: this.scrollY ? 'scroll' : 'hidden',
                overflowX: this.scrollX ? 'auto' : null,
                maxHeight: this.scrollY
            };
            this.scroll$.next();
        }
        if (data) {
            this.data$.next();
        }
    }
    ngAfterViewInit() {
        if (this.platform.isBrowser) {
            this.ngZone.runOutsideAngular(() => {
                const scrollEvent$ = this.scroll$.pipe(startWith(null), delay(0), switchMap(() => fromEvent(this.tableBodyElement.nativeElement, 'scroll').pipe(startWith(true))), takeUntil(this.destroy$));
                const resize$ = this.resizeService.subscribe().pipe(takeUntil(this.destroy$));
                const data$ = this.data$.pipe(takeUntil(this.destroy$));
                const setClassName$ = merge(scrollEvent$, resize$, data$, this.scroll$).pipe(startWith(true), delay(0), takeUntil(this.destroy$));
                setClassName$.subscribe(() => this.setScrollPositionClassName());
                scrollEvent$
                    .pipe(filter(() => !!this.scrollY))
                    .subscribe(() => (this.tableHeaderElement.nativeElement.scrollLeft = this.tableBodyElement.nativeElement.scrollLeft));
            });
        }
    }
    ngOnDestroy() {
        this.setScrollPositionClassName(true);
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTableInnerScrollComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableInnerScrollComponent, deps: [{ token: i0.Renderer2 }, { token: i0.NgZone }, { token: i1.Platform }, { token: i2.NzResizeService }], target: i0.ɵɵFactoryTarget.Component });
NzTableInnerScrollComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableInnerScrollComponent, selector: "nz-table-inner-scroll", inputs: { data: "data", scrollX: "scrollX", scrollY: "scrollY", contentTemplate: "contentTemplate", widthConfig: "widthConfig", listOfColWidth: "listOfColWidth", theadTemplate: "theadTemplate", virtualTemplate: "virtualTemplate", virtualItemSize: "virtualItemSize", virtualMaxBufferPx: "virtualMaxBufferPx", virtualMinBufferPx: "virtualMinBufferPx", tableMainElement: "tableMainElement", virtualForTrackBy: "virtualForTrackBy", verticalScrollBarWidth: "verticalScrollBarWidth" }, host: { classAttribute: "ant-table-container" }, viewQueries: [{ propertyName: "tableHeaderElement", first: true, predicate: ["tableHeaderElement"], descendants: true, read: ElementRef }, { propertyName: "tableBodyElement", first: true, predicate: ["tableBodyElement"], descendants: true, read: ElementRef }, { propertyName: "cdkVirtualScrollViewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true, read: CdkVirtualScrollViewport }], usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="scrollY">
      <div #tableHeaderElement [ngStyle]="headerStyleMap" class="ant-table-header nz-table-hide-scrollbar">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
        ></table>
      </div>
      <div #tableBodyElement *ngIf="!virtualTemplate" class="ant-table-body" [ngStyle]="bodyStyleMap">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [contentTemplate]="contentTemplate"
        ></table>
      </div>
      <cdk-virtual-scroll-viewport
        #tableBodyElement
        *ngIf="virtualTemplate"
        [itemSize]="virtualItemSize"
        [maxBufferPx]="virtualMaxBufferPx"
        [minBufferPx]="virtualMinBufferPx"
        [style.height]="data.length ? scrollY : noDateVirtualHeight"
      >
        <table nz-table-content tableLayout="fixed" [scrollX]="scrollX" [listOfColWidth]="listOfColWidth">
          <tbody>
            <ng-container *cdkVirtualFor="let item of data; let i = index; trackBy: virtualForTrackBy">
              <ng-template
                [ngTemplateOutlet]="virtualTemplate"
                [ngTemplateOutletContext]="{ $implicit: item, index: i }"
              ></ng-template>
            </ng-container>
          </tbody>
        </table>
      </cdk-virtual-scroll-viewport>
    </ng-container>
    <div class="ant-table-content" #tableBodyElement *ngIf="!scrollY" [ngStyle]="bodyStyleMap">
      <table
        nz-table-content
        tableLayout="fixed"
        [scrollX]="scrollX"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
        [contentTemplate]="contentTemplate"
      ></table>
    </div>
  `, isInline: true, components: [{ type: i3.NzTableContentComponent, selector: "table[nz-table-content]", inputs: ["tableLayout", "theadTemplate", "contentTemplate", "listOfColWidth", "scrollX"] }, { type: i4.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { type: i5.NzTbodyComponent, selector: "tbody" }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i4.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i4.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableInnerScrollComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table-inner-scroll',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-container *ngIf="scrollY">
      <div #tableHeaderElement [ngStyle]="headerStyleMap" class="ant-table-header nz-table-hide-scrollbar">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
        ></table>
      </div>
      <div #tableBodyElement *ngIf="!virtualTemplate" class="ant-table-body" [ngStyle]="bodyStyleMap">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [contentTemplate]="contentTemplate"
        ></table>
      </div>
      <cdk-virtual-scroll-viewport
        #tableBodyElement
        *ngIf="virtualTemplate"
        [itemSize]="virtualItemSize"
        [maxBufferPx]="virtualMaxBufferPx"
        [minBufferPx]="virtualMinBufferPx"
        [style.height]="data.length ? scrollY : noDateVirtualHeight"
      >
        <table nz-table-content tableLayout="fixed" [scrollX]="scrollX" [listOfColWidth]="listOfColWidth">
          <tbody>
            <ng-container *cdkVirtualFor="let item of data; let i = index; trackBy: virtualForTrackBy">
              <ng-template
                [ngTemplateOutlet]="virtualTemplate"
                [ngTemplateOutletContext]="{ $implicit: item, index: i }"
              ></ng-template>
            </ng-container>
          </tbody>
        </table>
      </cdk-virtual-scroll-viewport>
    </ng-container>
    <div class="ant-table-content" #tableBodyElement *ngIf="!scrollY" [ngStyle]="bodyStyleMap">
      <table
        nz-table-content
        tableLayout="fixed"
        [scrollX]="scrollX"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
        [contentTemplate]="contentTemplate"
      ></table>
    </div>
  `,
                    host: { class: 'ant-table-container' }
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.NgZone }, { type: i1.Platform }, { type: i2.NzResizeService }]; }, propDecorators: { data: [{
                type: Input
            }], scrollX: [{
                type: Input
            }], scrollY: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], widthConfig: [{
                type: Input
            }], listOfColWidth: [{
                type: Input
            }], theadTemplate: [{
                type: Input
            }], virtualTemplate: [{
                type: Input
            }], virtualItemSize: [{
                type: Input
            }], virtualMaxBufferPx: [{
                type: Input
            }], virtualMinBufferPx: [{
                type: Input
            }], tableMainElement: [{
                type: Input
            }], virtualForTrackBy: [{
                type: Input
            }], tableHeaderElement: [{
                type: ViewChild,
                args: ['tableHeaderElement', { read: ElementRef }]
            }], tableBodyElement: [{
                type: ViewChild,
                args: ['tableBodyElement', { read: ElementRef }]
            }], cdkVirtualScrollViewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport }]
            }], verticalScrollBarWidth: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaW5uZXItc2Nyb2xsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvdGFibGUvc3JjL3RhYmxlL3RhYmxlLWlubmVyLXNjcm9sbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFRTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7OztBQThEaEYsTUFBTSxPQUFPLDJCQUEyQjtJQTZDdEMsWUFDVSxRQUFtQixFQUNuQixNQUFjLEVBQ2QsUUFBa0IsRUFDbEIsYUFBOEI7UUFIOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFoRC9CLFNBQUksR0FBaUIsRUFBRSxDQUFDO1FBQ3hCLFlBQU8sR0FBa0IsSUFBSSxDQUFDO1FBQzlCLFlBQU8sR0FBa0IsSUFBSSxDQUFDO1FBQzlCLG9CQUFlLEdBQWtDLElBQUksQ0FBQztRQUN0RCxnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQUMzQixtQkFBYyxHQUFpQyxFQUFFLENBQUM7UUFDbEQsa0JBQWEsR0FBa0MsSUFBSSxDQUFDO1FBQ3BELG9CQUFlLEdBQWtDLElBQUksQ0FBQztRQUN0RCxvQkFBZSxHQUFHLENBQUMsQ0FB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S0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ2lELGtCQUFrQjtzQkFBeEUsU0FBUzt1QkFBQyxvQkFBb0IsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Z0JBQ0EsZ0JBQWdCO3NCQUFwRSxTQUFTO3VCQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFFbkQsd0JBQXdCO3NCQUR2QixTQUFTO3VCQUFDLHdCQUF3QixFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFO2dCQUk5RCxzQkFBc0I7c0JBQTlCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBUcmFja0J5RnVuY3Rpb24sXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgZmlsdGVyLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOelJlc2l6ZVNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvc2VydmljZXMnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdGFibGUtaW5uZXItc2Nyb2xsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNjcm9sbFlcIj5cbiAgICAgIDxkaXYgI3RhYmxlSGVhZGVyRWxlbWVudCBbbmdTdHlsZV09XCJoZWFkZXJTdHlsZU1hcFwiIGNsYXNzPVwiYW50LXRhYmxlLWhlYWRlciBuei10YWJsZS1oaWRlLXNjcm9sbGJhclwiPlxuICAgICAgICA8dGFibGVcbiAgICAgICAgICBuei10YWJsZS1jb250ZW50XG4gICAgICAgICAgdGFibGVMYXlvdXQ9XCJmaXhlZFwiXG4gICAgICAgICAgW3Njcm9sbFhdPVwic2Nyb2xsWFwiXG4gICAgICAgICAgW2xpc3RPZkNvbFdpZHRoXT1cImxpc3RPZkNvbFdpZHRoXCJcbiAgICAgICAgICBbdGhlYWRUZW1wbGF0ZV09XCJ0aGVhZFRlbXBsYXRlXCJcbiAgICAgICAgPjwvdGFibGU+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgI3RhYmxlQm9keUVsZW1lbnQgKm5nSWY9XCIhdmlydHVhbFRlbXBsYXRlXCIgY2xhc3M9XCJhbnQtdGFibGUtYm9keVwiIFtuZ1N0eWxlXT1cImJvZHlTdHlsZU1hcFwiPlxuICAgICAgICA8dGFibGVcbiAgICAgICAgICBuei10YWJsZS1jb250ZW50XG4gICAgICAgICAgdGFibGVMYXlvdXQ9XCJmaXhlZFwiXG4gICAgICAgICAgW3Njcm9sbFhdPVwic2Nyb2xsWFwiXG4gICAgICAgICAgW2xpc3RPZkNvbFdpZHRoXT1cImxpc3RPZkNvbFdpZHRoXCJcbiAgICAgICAgICBbY29udGVudFRlbXBsYXRlXT1cImNvbnRlbnRUZW1wbGF0ZVwiXG4gICAgICAgID48L3RhYmxlPlxuICAgICAgPC9kaXY+XG4gICAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0XG4gICAgICAgICN0YWJsZUJvZHlFbGVtZW50XG4gICAgICAgICpuZ0lmPVwidmlydHVhbFRlbXBsYXRlXCJcbiAgICAgICAgW2l0ZW1TaXplXT1cInZpcnR1YWxJdGVtU2l6ZVwiXG4gICAgICAgIFttYXhCdWZmZXJQeF09XCJ2aXJ0dWFsTWF4QnVmZmVyUHhcIlxuICAgICAgICBbbWluQnVmZmVyUHhdPVwidmlydHVhbE1pbkJ1ZmZlclB4XCJcbiAgICAgICAgW3N0eWxlLmhlaWdodF09XCJkYXRhLmxlbmd0aCA/IHNjcm9sbFkgOiBub0RhdGVWaXJ0dWFsSGVpZ2h0XCJcbiAgICAgID5cbiAgICAgICAgPHRhYmxlIG56LXRhYmxlLWNvbnRlbnQgdGFibGVMYXlvdXQ9XCJmaXhlZFwiIFtzY3JvbGxYXT1cInNjcm9sbFhcIiBbbGlzdE9mQ29sV2lkdGhdPVwibGlzdE9mQ29sV2lkdGhcIj5cbiAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpjZGtWaXJ0dWFsRm9yPVwibGV0IGl0ZW0gb2YgZGF0YTsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogdmlydHVhbEZvclRyYWNrQnlcIj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidmlydHVhbFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGl0ZW0sIGluZGV4OiBpIH1cIlxuICAgICAgICAgICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8ZGl2IGNsYXNzPVwiYW50LXRhYmxlLWNvbnRlbnRcIiAjdGFibGVCb2R5RWxlbWVudCAqbmdJZj1cIiFzY3JvbGxZXCIgW25nU3R5bGVdPVwiYm9keVN0eWxlTWFwXCI+XG4gICAgICA8dGFibGVcbiAgICAgICAgbnotdGFibGUtY29udGVudFxuICAgICAgICB0YWJsZUxheW91dD1cImZpeGVkXCJcbiAgICAgICAgW3Njcm9sbFhdPVwic2Nyb2xsWFwiXG4gICAgICAgIFtsaXN0T2ZDb2xXaWR0aF09XCJsaXN0T2ZDb2xXaWR0aFwiXG4gICAgICAgIFt0aGVhZFRlbXBsYXRlXT1cInRoZWFkVGVtcGxhdGVcIlxuICAgICAgICBbY29udGVudFRlbXBsYXRlXT1cImNvbnRlbnRUZW1wbGF0ZVwiXG4gICAgICA+PC90YWJsZT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDogeyBjbGFzczogJ2FudC10YWJsZS1jb250YWluZXInIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZUlubmVyU2Nyb2xsQ29tcG9uZW50PFQ+IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBkYXRhOiByZWFkb25seSBUW10gPSBbXTtcbiAgQElucHV0KCkgc2Nyb2xsWDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHNjcm9sbFk6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgd2lkdGhDb25maWc6IHN0cmluZ1tdID0gW107XG4gIEBJbnB1dCgpIGxpc3RPZkNvbFdpZHRoOiBSZWFkb25seUFycmF5PHN0cmluZyB8IG51bGw+ID0gW107XG4gIEBJbnB1dCgpIHRoZWFkVGVtcGxhdGU6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgdmlydHVhbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHZpcnR1YWxJdGVtU2l6ZSA9IDA7XG4gIEBJbnB1dCgpIHZpcnR1YWxNYXhCdWZmZXJQeCA9IDIwMDtcbiAgQElucHV0KCkgdmlydHVhbE1pbkJ1ZmZlclB4ID0gMTAwO1xuICBASW5wdXQoKSB0YWJsZU1haW5FbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gIEBJbnB1dCgpIHZpcnR1YWxGb3JUcmFja0J5OiBUcmFja0J5RnVuY3Rpb248VD4gPSBpbmRleCA9PiBpbmRleDtcbiAgQFZpZXdDaGlsZCgndGFibGVIZWFkZXJFbGVtZW50JywgeyByZWFkOiBFbGVtZW50UmVmIH0pIHRhYmxlSGVhZGVyRWxlbWVudCE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3RhYmxlQm9keUVsZW1lbnQnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgdGFibGVCb2R5RWxlbWVudCE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LCB7IHJlYWQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCB9KVxuICBjZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ/OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG4gIGhlYWRlclN0eWxlTWFwID0ge307XG4gIGJvZHlTdHlsZU1hcCA9IHt9O1xuICBASW5wdXQoKSB2ZXJ0aWNhbFNjcm9sbEJhcldpZHRoID0gMDtcbiAgbm9EYXRlVmlydHVhbEhlaWdodCA9ICcxODJweCc7XG4gIHByaXZhdGUgZGF0YSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIHNjcm9sbCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBzZXRTY3JvbGxQb3NpdGlvbkNsYXNzTmFtZShjbGVhcjogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgeyBzY3JvbGxXaWR0aCwgc2Nyb2xsTGVmdCwgY2xpZW50V2lkdGggfSA9IHRoaXMudGFibGVCb2R5RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGxlZnRDbGFzc05hbWUgPSAnYW50LXRhYmxlLXBpbmctbGVmdCc7XG4gICAgY29uc3QgcmlnaHRDbGFzc05hbWUgPSAnYW50LXRhYmxlLXBpbmctcmlnaHQnO1xuICAgIGlmICgoc2Nyb2xsV2lkdGggPT09IGNsaWVudFdpZHRoICYmIHNjcm9sbFdpZHRoICE9PSAwKSB8fCBjbGVhcikge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLnRhYmxlTWFpbkVsZW1lbnQsIGxlZnRDbGFzc05hbWUpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLnRhYmxlTWFpbkVsZW1lbnQsIHJpZ2h0Q2xhc3NOYW1lKTtcbiAgICB9IGVsc2UgaWYgKHNjcm9sbExlZnQgPT09IDApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy50YWJsZU1haW5FbGVtZW50LCBsZWZ0Q2xhc3NOYW1lKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50YWJsZU1haW5FbGVtZW50LCByaWdodENsYXNzTmFtZSk7XG4gICAgfSBlbHNlIGlmIChzY3JvbGxXaWR0aCA9PT0gc2Nyb2xsTGVmdCArIGNsaWVudFdpZHRoKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMudGFibGVNYWluRWxlbWVudCwgcmlnaHRDbGFzc05hbWUpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRhYmxlTWFpbkVsZW1lbnQsIGxlZnRDbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudGFibGVNYWluRWxlbWVudCwgbGVmdENsYXNzTmFtZSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudGFibGVNYWluRWxlbWVudCwgcmlnaHRDbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgcmVzaXplU2VydmljZTogTnpSZXNpemVTZXJ2aWNlXG4gICkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBzY3JvbGxYLCBzY3JvbGxZLCBkYXRhIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChzY3JvbGxYIHx8IHNjcm9sbFkpIHtcbiAgICAgIGNvbnN0IGhhc1ZlcnRpY2FsU2Nyb2xsQmFyID0gdGhpcy52ZXJ0aWNhbFNjcm9sbEJhcldpZHRoICE9PSAwO1xuICAgICAgdGhpcy5oZWFkZXJTdHlsZU1hcCA9IHtcbiAgICAgICAgb3ZlcmZsb3dYOiAnaGlkZGVuJyxcbiAgICAgICAgb3ZlcmZsb3dZOiB0aGlzLnNjcm9sbFkgJiYgaGFzVmVydGljYWxTY3JvbGxCYXIgPyAnc2Nyb2xsJyA6ICdoaWRkZW4nXG4gICAgICB9O1xuICAgICAgdGhpcy5ib2R5U3R5bGVNYXAgPSB7XG4gICAgICAgIG92ZXJmbG93WTogdGhpcy5zY3JvbGxZID8gJ3Njcm9sbCcgOiAnaGlkZGVuJyxcbiAgICAgICAgb3ZlcmZsb3dYOiB0aGlzLnNjcm9sbFggPyAnYXV0bycgOiBudWxsLFxuICAgICAgICBtYXhIZWlnaHQ6IHRoaXMuc2Nyb2xsWVxuICAgICAgfTtcbiAgICAgIHRoaXMuc2Nyb2xsJC5uZXh0KCk7XG4gICAgfVxuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLmRhdGEkLm5leHQoKTtcbiAgICB9XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBjb25zdCBzY3JvbGxFdmVudCQgPSB0aGlzLnNjcm9sbCQucGlwZShcbiAgICAgICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICAgICAgZGVsYXkoMCksXG4gICAgICAgICAgc3dpdGNoTWFwKCgpID0+IGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLnRhYmxlQm9keUVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3Njcm9sbCcpLnBpcGUoc3RhcnRXaXRoKHRydWUpKSksXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlc2l6ZSQgPSB0aGlzLnJlc2l6ZVNlcnZpY2Uuc3Vic2NyaWJlKCkucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpO1xuICAgICAgICBjb25zdCBkYXRhJCA9IHRoaXMuZGF0YSQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpO1xuICAgICAgICBjb25zdCBzZXRDbGFzc05hbWUkID0gbWVyZ2Uoc2Nyb2xsRXZlbnQkLCByZXNpemUkLCBkYXRhJCwgdGhpcy5zY3JvbGwkKS5waXBlKFxuICAgICAgICAgIHN0YXJ0V2l0aCh0cnVlKSxcbiAgICAgICAgICBkZWxheSgwKSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgICAgKTtcbiAgICAgICAgc2V0Q2xhc3NOYW1lJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRTY3JvbGxQb3NpdGlvbkNsYXNzTmFtZSgpKTtcbiAgICAgICAgc2Nyb2xsRXZlbnQkXG4gICAgICAgICAgLnBpcGUoZmlsdGVyKCgpID0+ICEhdGhpcy5zY3JvbGxZKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKCkgPT4gKHRoaXMudGFibGVIZWFkZXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA9IHRoaXMudGFibGVCb2R5RWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQpXG4gICAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFNjcm9sbFBvc2l0aW9uQ2xhc3NOYW1lKHRydWUpO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19