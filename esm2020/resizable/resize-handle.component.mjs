/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./resizable.service";
export class NzResizeHandleMouseDownEvent {
    constructor(direction, mouseEvent) {
        this.direction = direction;
        this.mouseEvent = mouseEvent;
    }
}
export class NzResizeHandleComponent {
    constructor(nzResizableService, renderer, elementRef) {
        this.nzResizableService = nzResizableService;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.nzDirection = 'bottomRight';
        this.nzMouseDown = new EventEmitter();
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        // Caretaker note: `mouseEntered$` subject will emit events within the `<root>` zone,
        // see `NzResizableDirective#ngAfterViewInit`. There're event listeners are added within the `<root>` zone.
        this.nzResizableService.mouseEntered$.pipe(takeUntil(this.destroy$)).subscribe(entered => {
            if (entered) {
                this.renderer.addClass(this.elementRef.nativeElement, 'nz-resizable-handle-box-hover');
            }
            else {
                this.renderer.removeClass(this.elementRef.nativeElement, 'nz-resizable-handle-box-hover');
            }
        });
    }
    onMousedown(event) {
        this.nzResizableService.handleMouseDown$.next(new NzResizeHandleMouseDownEvent(this.nzDirection, event));
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzResizeHandleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeHandleComponent, deps: [{ token: i1.NzResizableService }, { token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NzResizeHandleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzResizeHandleComponent, selector: "nz-resize-handle, [nz-resize-handle]", inputs: { nzDirection: "nzDirection" }, outputs: { nzMouseDown: "nzMouseDown" }, host: { listeners: { "mousedown": "onMousedown($event)", "touchstart": "onMousedown($event)" }, properties: { "class.nz-resizable-handle-top": "nzDirection === 'top'", "class.nz-resizable-handle-right": "nzDirection === 'right'", "class.nz-resizable-handle-bottom": "nzDirection === 'bottom'", "class.nz-resizable-handle-left": "nzDirection === 'left'", "class.nz-resizable-handle-topRight": "nzDirection === 'topRight'", "class.nz-resizable-handle-bottomRight": "nzDirection === 'bottomRight'", "class.nz-resizable-handle-bottomLeft": "nzDirection === 'bottomLeft'", "class.nz-resizable-handle-topLeft": "nzDirection === 'topLeft'" }, classAttribute: "nz-resizable-handle" }, exportAs: ["nzResizeHandle"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeHandleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-resize-handle, [nz-resize-handle]',
                    exportAs: 'nzResizeHandle',
                    template: ` <ng-content></ng-content> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'nz-resizable-handle',
                        '[class.nz-resizable-handle-top]': `nzDirection === 'top'`,
                        '[class.nz-resizable-handle-right]': `nzDirection === 'right'`,
                        '[class.nz-resizable-handle-bottom]': `nzDirection === 'bottom'`,
                        '[class.nz-resizable-handle-left]': `nzDirection === 'left'`,
                        '[class.nz-resizable-handle-topRight]': `nzDirection === 'topRight'`,
                        '[class.nz-resizable-handle-bottomRight]': `nzDirection === 'bottomRight'`,
                        '[class.nz-resizable-handle-bottomLeft]': `nzDirection === 'bottomLeft'`,
                        '[class.nz-resizable-handle-topLeft]': `nzDirection === 'topLeft'`,
                        '(mousedown)': 'onMousedown($event)',
                        '(touchstart)': 'onMousedown($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzResizableService }, { type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzDirection: [{
                type: Input
            }], nzMouseDown: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLWhhbmRsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3Jlc2l6YWJsZS9yZXNpemUtaGFuZGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBYzNDLE1BQU0sT0FBTyw0QkFBNEI7SUFDdkMsWUFBbUIsU0FBNEIsRUFBUyxVQUFtQztRQUF4RSxjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUFTLGVBQVUsR0FBVixVQUFVLENBQXlCO0lBQUcsQ0FBQztDQUNoRztBQXFCRCxNQUFNLE9BQU8sdUJBQXVCO0lBTWxDLFlBQ1Usa0JBQXNDLEVBQ3RDLFFBQW1CLEVBQ25CLFVBQXNCO1FBRnRCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUnZCLGdCQUFXLEdBQXNCLGFBQWEsQ0FBQztRQUNyQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFnQyxDQUFDO1FBRTFFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBTXBDLENBQUM7SUFFSixRQUFRO1FBQ04scUZBQXFGO1FBQ3JGLDJHQUEyRztRQUMzRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZGLElBQUksT0FBTyxFQUFFO2dCQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLCtCQUErQixDQUFDLENBQUM7YUFDeEY7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsK0JBQStCLENBQUMsQ0FBQzthQUMzRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUE4QjtRQUN4QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNEJBQTRCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7O29IQS9CVSx1QkFBdUI7d0dBQXZCLHVCQUF1QixnMkJBaEJ4Qiw2QkFBNkI7MkZBZ0I1Qix1QkFBdUI7a0JBbkJuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLHFCQUFxQjt3QkFDNUIsaUNBQWlDLEVBQUUsdUJBQXVCO3dCQUMxRCxtQ0FBbUMsRUFBRSx5QkFBeUI7d0JBQzlELG9DQUFvQyxFQUFFLDBCQUEwQjt3QkFDaEUsa0NBQWtDLEVBQUUsd0JBQXdCO3dCQUM1RCxzQ0FBc0MsRUFBRSw0QkFBNEI7d0JBQ3BFLHlDQUF5QyxFQUFFLCtCQUErQjt3QkFDMUUsd0NBQXdDLEVBQUUsOEJBQThCO3dCQUN4RSxxQ0FBcUMsRUFBRSwyQkFBMkI7d0JBQ2xFLGFBQWEsRUFBRSxxQkFBcUI7d0JBQ3BDLGNBQWMsRUFBRSxxQkFBcUI7cUJBQ3RDO2lCQUNGOzBKQUVVLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ2EsV0FBVztzQkFBN0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpSZXNpemFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZXNpemFibGUuc2VydmljZSc7XG5cbmV4cG9ydCB0eXBlIE56UmVzaXplRGlyZWN0aW9uID1cbiAgfCAndG9wJ1xuICB8ICdyaWdodCdcbiAgfCAnYm90dG9tJ1xuICB8ICdsZWZ0J1xuICB8ICd0b3BSaWdodCdcbiAgfCAnYm90dG9tUmlnaHQnXG4gIHwgJ2JvdHRvbUxlZnQnXG4gIHwgJ3RvcExlZnQnO1xuXG5leHBvcnQgY2xhc3MgTnpSZXNpemVIYW5kbGVNb3VzZURvd25FdmVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaXJlY3Rpb246IE56UmVzaXplRGlyZWN0aW9uLCBwdWJsaWMgbW91c2VFdmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHt9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXJlc2l6ZS1oYW5kbGUsIFtuei1yZXNpemUtaGFuZGxlXScsXG4gIGV4cG9ydEFzOiAnbnpSZXNpemVIYW5kbGUnLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICduei1yZXNpemFibGUtaGFuZGxlJyxcbiAgICAnW2NsYXNzLm56LXJlc2l6YWJsZS1oYW5kbGUtdG9wXSc6IGBuekRpcmVjdGlvbiA9PT0gJ3RvcCdgLFxuICAgICdbY2xhc3MubnotcmVzaXphYmxlLWhhbmRsZS1yaWdodF0nOiBgbnpEaXJlY3Rpb24gPT09ICdyaWdodCdgLFxuICAgICdbY2xhc3MubnotcmVzaXphYmxlLWhhbmRsZS1ib3R0b21dJzogYG56RGlyZWN0aW9uID09PSAnYm90dG9tJ2AsXG4gICAgJ1tjbGFzcy5uei1yZXNpemFibGUtaGFuZGxlLWxlZnRdJzogYG56RGlyZWN0aW9uID09PSAnbGVmdCdgLFxuICAgICdbY2xhc3MubnotcmVzaXphYmxlLWhhbmRsZS10b3BSaWdodF0nOiBgbnpEaXJlY3Rpb24gPT09ICd0b3BSaWdodCdgLFxuICAgICdbY2xhc3MubnotcmVzaXphYmxlLWhhbmRsZS1ib3R0b21SaWdodF0nOiBgbnpEaXJlY3Rpb24gPT09ICdib3R0b21SaWdodCdgLFxuICAgICdbY2xhc3MubnotcmVzaXphYmxlLWhhbmRsZS1ib3R0b21MZWZ0XSc6IGBuekRpcmVjdGlvbiA9PT0gJ2JvdHRvbUxlZnQnYCxcbiAgICAnW2NsYXNzLm56LXJlc2l6YWJsZS1oYW5kbGUtdG9wTGVmdF0nOiBgbnpEaXJlY3Rpb24gPT09ICd0b3BMZWZ0J2AsXG4gICAgJyhtb3VzZWRvd24pJzogJ29uTW91c2Vkb3duKCRldmVudCknLFxuICAgICcodG91Y2hzdGFydCknOiAnb25Nb3VzZWRvd24oJGV2ZW50KSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelJlc2l6ZUhhbmRsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgbnpEaXJlY3Rpb246IE56UmVzaXplRGlyZWN0aW9uID0gJ2JvdHRvbVJpZ2h0JztcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56TW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxOelJlc2l6ZUhhbmRsZU1vdXNlRG93bkV2ZW50PigpO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbnpSZXNpemFibGVTZXJ2aWNlOiBOelJlc2l6YWJsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gQ2FyZXRha2VyIG5vdGU6IGBtb3VzZUVudGVyZWQkYCBzdWJqZWN0IHdpbGwgZW1pdCBldmVudHMgd2l0aGluIHRoZSBgPHJvb3Q+YCB6b25lLFxuICAgIC8vIHNlZSBgTnpSZXNpemFibGVEaXJlY3RpdmUjbmdBZnRlclZpZXdJbml0YC4gVGhlcmUncmUgZXZlbnQgbGlzdGVuZXJzIGFyZSBhZGRlZCB3aXRoaW4gdGhlIGA8cm9vdD5gIHpvbmUuXG4gICAgdGhpcy5uelJlc2l6YWJsZVNlcnZpY2UubW91c2VFbnRlcmVkJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGVudGVyZWQgPT4ge1xuICAgICAgaWYgKGVudGVyZWQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ256LXJlc2l6YWJsZS1oYW5kbGUtYm94LWhvdmVyJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbnotcmVzaXphYmxlLWhhbmRsZS1ib3gtaG92ZXInKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uTW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIHRoaXMubnpSZXNpemFibGVTZXJ2aWNlLmhhbmRsZU1vdXNlRG93biQubmV4dChuZXcgTnpSZXNpemVIYW5kbGVNb3VzZURvd25FdmVudCh0aGlzLm56RGlyZWN0aW9uLCBldmVudCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=