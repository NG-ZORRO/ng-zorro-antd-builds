import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toNumber } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "./pagination-item.component";
export class NzPaginationSimpleComponent {
    constructor(cdr, renderer, elementRef, directionality) {
        this.cdr = cdr;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.directionality = directionality;
        this.itemRender = null;
        this.disabled = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageIndexChange = new EventEmitter();
        this.lastIndex = 0;
        this.isFirstIndex = false;
        this.isLastIndex = false;
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
    jumpToPageViaInput($event) {
        const target = $event.target;
        const index = toNumber(target.value, this.pageIndex);
        this.onPageIndexChange(index);
        target.value = `${this.pageIndex}`;
    }
    prePage() {
        this.onPageIndexChange(this.pageIndex - 1);
    }
    nextPage() {
        this.onPageIndexChange(this.pageIndex + 1);
    }
    onPageIndexChange(index) {
        this.pageIndexChange.next(index);
    }
    updateBindingValue() {
        this.lastIndex = Math.ceil(this.total / this.pageSize);
        this.isFirstIndex = this.pageIndex === 1;
        this.isLastIndex = this.pageIndex === this.lastIndex;
    }
    ngOnChanges(changes) {
        const { pageIndex, total, pageSize } = changes;
        if (pageIndex || total || pageSize) {
            this.updateBindingValue();
        }
    }
}
NzPaginationSimpleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationSimpleComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzPaginationSimpleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPaginationSimpleComponent, selector: "nz-pagination-simple", inputs: { itemRender: "itemRender", disabled: "disabled", locale: "locale", total: "total", pageIndex: "pageIndex", pageSize: "pageSize" }, outputs: { pageIndexChange: "pageIndexChange" }, viewQueries: [{ propertyName: "template", first: true, predicate: ["containerTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #containerTemplate>
      <li
        nz-pagination-item
        [attr.title]="locale.prev_page"
        [disabled]="isFirstIndex"
        [direction]="dir"
        (click)="prePage()"
        type="prev"
        [itemRender]="itemRender"
      ></li>
      <li [attr.title]="pageIndex + '/' + lastIndex" class="ant-pagination-simple-pager">
        <input [disabled]="disabled" [value]="pageIndex" (keydown.enter)="jumpToPageViaInput($event)" size="3" />
        <span class="ant-pagination-slash">/</span>
        {{ lastIndex }}
      </li>
      <li
        nz-pagination-item
        [attr.title]="locale?.next_page"
        [disabled]="isLastIndex"
        [direction]="dir"
        (click)="nextPage()"
        type="next"
        [itemRender]="itemRender"
      ></li>
    </ng-template>
  `, isInline: true, components: [{ type: i2.NzPaginationItemComponent, selector: "li[nz-pagination-item]", inputs: ["active", "locale", "index", "disabled", "direction", "type", "itemRender"], outputs: ["diffIndex", "gotoIndex"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationSimpleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-pagination-simple',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #containerTemplate>
      <li
        nz-pagination-item
        [attr.title]="locale.prev_page"
        [disabled]="isFirstIndex"
        [direction]="dir"
        (click)="prePage()"
        type="prev"
        [itemRender]="itemRender"
      ></li>
      <li [attr.title]="pageIndex + '/' + lastIndex" class="ant-pagination-simple-pager">
        <input [disabled]="disabled" [value]="pageIndex" (keydown.enter)="jumpToPageViaInput($event)" size="3" />
        <span class="ant-pagination-slash">/</span>
        {{ lastIndex }}
      </li>
      <li
        nz-pagination-item
        [attr.title]="locale?.next_page"
        [disabled]="isLastIndex"
        [direction]="dir"
        (click)="nextPage()"
        type="next"
        [itemRender]="itemRender"
      ></li>
    </ng-template>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { template: [{
                type: ViewChild,
                args: ['containerTemplate', { static: true }]
            }], itemRender: [{
                type: Input
            }], disabled: [{
                type: Input
            }], locale: [{
                type: Input
            }], total: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageIndexChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1zaW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9wYWdpbmF0aW9uL3BhZ2luYXRpb24tc2ltcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUlMLFFBQVEsRUFDUixNQUFNLEVBSU4sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFzQ25ELE1BQU0sT0FBTywyQkFBMkI7SUFnQnRDLFlBQ1UsR0FBc0IsRUFDdEIsUUFBbUIsRUFDbkIsVUFBc0IsRUFDVixjQUE4QjtRQUgxQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDVixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFsQjNDLGVBQVUsR0FBb0QsSUFBSSxDQUFDO1FBQ25FLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ0osb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ2hFLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVwQixRQUFHLEdBQWMsS0FBSyxDQUFDO1FBQ2YsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENB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Q3ZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJUO2lCQUNGOzswQkFxQkksUUFBUTs0Q0FuQnVDLFFBQVE7c0JBQXpELFNBQVM7dUJBQUMsbUJBQW1CLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUN2QyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ2EsZUFBZTtzQkFBakMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IHRvTnVtYmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgTnpQYWdpbmF0aW9uSTE4bkludGVyZmFjZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5cbmltcG9ydCB7IFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dCB9IGZyb20gJy4vcGFnaW5hdGlvbi50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXBhZ2luYXRpb24tc2ltcGxlJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGFpbmVyVGVtcGxhdGU+XG4gICAgICA8bGlcbiAgICAgICAgbnotcGFnaW5hdGlvbi1pdGVtXG4gICAgICAgIFthdHRyLnRpdGxlXT1cImxvY2FsZS5wcmV2X3BhZ2VcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiaXNGaXJzdEluZGV4XCJcbiAgICAgICAgW2RpcmVjdGlvbl09XCJkaXJcIlxuICAgICAgICAoY2xpY2spPVwicHJlUGFnZSgpXCJcbiAgICAgICAgdHlwZT1cInByZXZcIlxuICAgICAgICBbaXRlbVJlbmRlcl09XCJpdGVtUmVuZGVyXCJcbiAgICAgID48L2xpPlxuICAgICAgPGxpIFthdHRyLnRpdGxlXT1cInBhZ2VJbmRleCArICcvJyArIGxhc3RJbmRleFwiIGNsYXNzPVwiYW50LXBhZ2luYXRpb24tc2ltcGxlLXBhZ2VyXCI+XG4gICAgICAgIDxpbnB1dCBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbdmFsdWVdPVwicGFnZUluZGV4XCIgKGtleWRvd24uZW50ZXIpPVwianVtcFRvUGFnZVZpYUlucHV0KCRldmVudClcIiBzaXplPVwiM1wiIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXBhZ2luYXRpb24tc2xhc2hcIj4vPC9zcGFuPlxuICAgICAgICB7eyBsYXN0SW5kZXggfX1cbiAgICAgIDwvbGk+XG4gICAgICA8bGlcbiAgICAgICAgbnotcGFnaW5hdGlvbi1pdGVtXG4gICAgICAgIFthdHRyLnRpdGxlXT1cImxvY2FsZT8ubmV4dF9wYWdlXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImlzTGFzdEluZGV4XCJcbiAgICAgICAgW2RpcmVjdGlvbl09XCJkaXJcIlxuICAgICAgICAoY2xpY2spPVwibmV4dFBhZ2UoKVwiXG4gICAgICAgIHR5cGU9XCJuZXh0XCJcbiAgICAgICAgW2l0ZW1SZW5kZXJdPVwiaXRlbVJlbmRlclwiXG4gICAgICA+PC9saT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56UGFnaW5hdGlvblNpbXBsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQge1xuICBAVmlld0NoaWxkKCdjb250YWluZXJUZW1wbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIHRlbXBsYXRlITogVGVtcGxhdGVSZWY8TnpTYWZlQW55PjtcbiAgQElucHV0KCkgaXRlbVJlbmRlcjogVGVtcGxhdGVSZWY8UGFnaW5hdGlvbkl0ZW1SZW5kZXJDb250ZXh0PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBsb2NhbGUhOiBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlO1xuICBASW5wdXQoKSB0b3RhbCA9IDA7XG4gIEBJbnB1dCgpIHBhZ2VJbmRleCA9IDE7XG4gIEBJbnB1dCgpIHBhZ2VTaXplID0gMTA7XG4gIEBPdXRwdXQoKSByZWFkb25seSBwYWdlSW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgbGFzdEluZGV4ID0gMDtcbiAgaXNGaXJzdEluZGV4ID0gZmFsc2U7XG4gIGlzTGFzdEluZGV4ID0gZmFsc2U7XG5cbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7XG4gICAgcmVuZGVyZXIucmVtb3ZlQ2hpbGQocmVuZGVyZXIucGFyZW50Tm9kZShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLCBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLnVwZGF0ZVJ0bFN0eWxlKCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgIHRoaXMudXBkYXRlUnRsU3R5bGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUnRsU3R5bGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlyID09PSAncnRsJykge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1wYWdpbmF0aW9uLXJ0bCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LXBhZ2luYXRpb24tcnRsJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAganVtcFRvUGFnZVZpYUlucHV0KCRldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXQgPSAkZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgaW5kZXggPSB0b051bWJlcih0YXJnZXQudmFsdWUsIHRoaXMucGFnZUluZGV4KTtcbiAgICB0aGlzLm9uUGFnZUluZGV4Q2hhbmdlKGluZGV4KTtcbiAgICB0YXJnZXQudmFsdWUgPSBgJHt0aGlzLnBhZ2VJbmRleH1gO1xuICB9XG5cbiAgcHJlUGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLm9uUGFnZUluZGV4Q2hhbmdlKHRoaXMucGFnZUluZGV4IC0gMSk7XG4gIH1cbiAgbmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5vblBhZ2VJbmRleENoYW5nZSh0aGlzLnBhZ2VJbmRleCArIDEpO1xuICB9XG5cbiAgb25QYWdlSW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucGFnZUluZGV4Q2hhbmdlLm5leHQoaW5kZXgpO1xuICB9XG5cbiAgdXBkYXRlQmluZGluZ1ZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMubGFzdEluZGV4ID0gTWF0aC5jZWlsKHRoaXMudG90YWwgLyB0aGlzLnBhZ2VTaXplKTtcbiAgICB0aGlzLmlzRmlyc3RJbmRleCA9IHRoaXMucGFnZUluZGV4ID09PSAxO1xuICAgIHRoaXMuaXNMYXN0SW5kZXggPSB0aGlzLnBhZ2VJbmRleCA9PT0gdGhpcy5sYXN0SW5kZXg7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBwYWdlSW5kZXgsIHRvdGFsLCBwYWdlU2l6ZSB9ID0gY2hhbmdlcztcbiAgICBpZiAocGFnZUluZGV4IHx8IHRvdGFsIHx8IHBhZ2VTaXplKSB7XG4gICAgICB0aGlzLnVwZGF0ZUJpbmRpbmdWYWx1ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19