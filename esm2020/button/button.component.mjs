import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/icon";
import * as i5 from "ng-zorro-antd/core/transition-patch";
const NZ_CONFIG_MODULE_NAME = 'button';
export class NzButtonComponent {
    constructor(ngZone, elementRef, cdr, renderer, nzConfigService, directionality) {
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.renderer = renderer;
        this.nzConfigService = nzConfigService;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzBlock = false;
        this.nzGhost = false;
        this.nzSearch = false;
        this.nzLoading = false;
        this.nzDanger = false;
        this.disabled = false;
        this.tabIndex = null;
        this.nzType = null;
        this.nzShape = null;
        this.nzSize = 'default';
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.loading$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    insertSpan(nodes, renderer) {
        nodes.forEach(node => {
            if (node.nodeName === '#text') {
                const span = renderer.createElement('span');
                const parent = renderer.parentNode(node);
                renderer.insertBefore(parent, span, node);
                renderer.appendChild(span, node);
            }
        });
    }
    assertIconOnly(element, renderer) {
        const listOfNode = Array.from(element.childNodes);
        const iconCount = listOfNode.filter(node => node.nodeName === 'I').length;
        const noText = listOfNode.every(node => node.nodeName !== '#text');
        const noSpan = listOfNode.every(node => node.nodeName !== 'SPAN');
        const isIconOnly = noSpan && noText && iconCount >= 1;
        if (isIconOnly) {
            renderer.addClass(element, 'ant-btn-icon-only');
        }
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.ngZone.runOutsideAngular(() => {
            // Caretaker note: this event listener could've been added through `host.click` or `HostListener`.
            // The compiler generates the `ɵɵlistener` instruction which wraps the actual listener internally into the
            // function, which runs `markDirty()` before running the actual listener (the decorated class method).
            // Since we're preventing the default behavior and stopping event propagation this doesn't require Angular to run the change detection.
            fromEvent(this.elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                if (this.disabled && event.target?.tagName === 'A') {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            });
        });
    }
    ngOnChanges(changes) {
        const { nzLoading } = changes;
        if (nzLoading) {
            this.loading$.next(this.nzLoading);
        }
    }
    ngAfterViewInit() {
        this.assertIconOnly(this.elementRef.nativeElement, this.renderer);
        this.insertSpan(this.elementRef.nativeElement.childNodes, this.renderer);
    }
    ngAfterContentInit() {
        this.loading$
            .pipe(startWith(this.nzLoading), filter(() => !!this.nzIconDirectiveElement), takeUntil(this.destroy$))
            .subscribe(loading => {
            const nativeElement = this.nzIconDirectiveElement.nativeElement;
            if (loading) {
                this.renderer.setStyle(nativeElement, 'display', 'none');
            }
            else {
                this.renderer.removeStyle(nativeElement, 'display');
            }
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i1.NzConfigService }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: { nzBlock: "nzBlock", nzGhost: "nzGhost", nzSearch: "nzSearch", nzLoading: "nzLoading", nzDanger: "nzDanger", disabled: "disabled", tabIndex: "tabIndex", nzType: "nzType", nzShape: "nzShape", nzSize: "nzSize" }, host: { properties: { "class.ant-btn-primary": "nzType === 'primary'", "class.ant-btn-dashed": "nzType === 'dashed'", "class.ant-btn-link": "nzType === 'link'", "class.ant-btn-text": "nzType === 'text'", "class.ant-btn-circle": "nzShape === 'circle'", "class.ant-btn-round": "nzShape === 'round'", "class.ant-btn-lg": "nzSize === 'large'", "class.ant-btn-sm": "nzSize === 'small'", "class.ant-btn-dangerous": "nzDanger", "class.ant-btn-loading": "nzLoading", "class.ant-btn-background-ghost": "nzGhost", "class.ant-btn-block": "nzBlock", "class.ant-input-search-button": "nzSearch", "class.ant-btn-rtl": "dir === 'rtl'", "attr.tabindex": "disabled ? -1 : (tabIndex === null ? null : tabIndex)", "attr.disabled": "disabled || null" }, classAttribute: "ant-btn" }, queries: [{ propertyName: "nzIconDirectiveElement", first: true, predicate: NzIconDirective, descendants: true, read: ElementRef }], exportAs: ["nzButton"], usesOnChanges: true, ngImport: i0, template: `
    <i nz-icon nzType="loading" *ngIf="nzLoading"></i>
    <ng-content></ng-content>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i5.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "nzBlock", void 0);
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "nzGhost", void 0);
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "nzSearch", void 0);
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "nzDanger", void 0);
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "disabled", void 0);
__decorate([
    WithConfig()
], NzButtonComponent.prototype, "nzSize", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'button[nz-button], a[nz-button]',
                    exportAs: 'nzButton',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <i nz-icon nzType="loading" *ngIf="nzLoading"></i>
    <ng-content></ng-content>
  `,
                    host: {
                        class: 'ant-btn',
                        '[class.ant-btn-primary]': `nzType === 'primary'`,
                        '[class.ant-btn-dashed]': `nzType === 'dashed'`,
                        '[class.ant-btn-link]': `nzType === 'link'`,
                        '[class.ant-btn-text]': `nzType === 'text'`,
                        '[class.ant-btn-circle]': `nzShape === 'circle'`,
                        '[class.ant-btn-round]': `nzShape === 'round'`,
                        '[class.ant-btn-lg]': `nzSize === 'large'`,
                        '[class.ant-btn-sm]': `nzSize === 'small'`,
                        '[class.ant-btn-dangerous]': `nzDanger`,
                        '[class.ant-btn-loading]': `nzLoading`,
                        '[class.ant-btn-background-ghost]': `nzGhost`,
                        '[class.ant-btn-block]': `nzBlock`,
                        '[class.ant-input-search-button]': `nzSearch`,
                        '[class.ant-btn-rtl]': `dir === 'rtl'`,
                        '[attr.tabindex]': 'disabled ? -1 : (tabIndex === null ? null : tabIndex)',
                        '[attr.disabled]': 'disabled || null'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i1.NzConfigService }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzIconDirectiveElement: [{
                type: ContentChild,
                args: [NzIconDirective, { read: ElementRef }]
            }], nzBlock: [{
                type: Input
            }], nzGhost: [{
                type: Input
            }], nzSearch: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzDanger: [{
                type: Input
            }], disabled: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzShape: [{
                type: Input
            }], nzSize: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFHTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUtMLFFBQVEsRUFHUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUQsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7O0FBTXJELE1BQU0scUJBQXFCLEdBQWdCLFFBQVEsQ0FBQztBQWdDcEQsTUFBTSxPQUFPLGlCQUFpQjtJQThDNUIsWUFDVSxNQUFjLEVBQ2QsVUFBc0IsRUFDdEIsR0FBc0IsRUFDdEIsUUFBbUIsRUFDcEIsZUFBZ0MsRUFDbkIsY0FBOEI7UUFMMUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNwQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDbkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbkQzQyxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQVNuQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsYUFBUSxHQUFZLEtBQUssQ0FB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c0JBQXNCLEVBQUUsbUJBQW1CO3dCQUMzQyxzQkFBc0IsRUFBRSxtQkFBbUI7d0JBQzNDLHdCQUF3QixFQUFFLHNCQUFzQjt3QkFDaEQsdUJBQXVCLEVBQUUscUJBQXFCO3dCQUM5QyxvQkFBb0IsRUFBRSxvQkFBb0I7d0JBQzFDLG9CQUFvQixFQUFFLG9CQUFvQjt3QkFDMUMsMkJBQTJCLEVBQUUsVUFBVTt3QkFDdkMseUJBQXlCLEVBQUUsV0FBVzt3QkFDdEMsa0NBQWtDLEVBQUUsU0FBUzt3QkFDN0MsdUJBQXVCLEVBQUUsU0FBUzt3QkFDbEMsaUNBQWlDLEVBQUUsVUFBVTt3QkFDN0MscUJBQXFCLEVBQUUsZUFBZTt3QkFDdEMsaUJBQWlCLEVBQUUsdURBQXVEO3dCQUMxRSxpQkFBaUIsRUFBRSxrQkFBa0I7cUJBQ3RDO2lCQUNGOzswQkFxREksUUFBUTs0Q0EzQzBDLHNCQUFzQjtzQkFBMUUsWUFBWTt1QkFBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUMxQixPQUFPO3NCQUEvQixLQUFLO2dCQUNtQixPQUFPO3NCQUEvQixLQUFLO2dCQUNtQixRQUFRO3NCQUFoQyxLQUFLO2dCQUNtQixTQUFTO3NCQUFqQyxLQUFLO2dCQUNtQixRQUFRO3NCQUFoQyxLQUFLO2dCQUNtQixRQUFRO3NCQUFoQyxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDaUIsTUFBTTtzQkFBNUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzdGFydFdpdGgsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56SWNvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmV4cG9ydCB0eXBlIE56QnV0dG9uVHlwZSA9ICdwcmltYXJ5JyB8ICdkZWZhdWx0JyB8ICdkYXNoZWQnIHwgJ2xpbmsnIHwgJ3RleHQnIHwgbnVsbDtcbmV4cG9ydCB0eXBlIE56QnV0dG9uU2hhcGUgPSAnY2lyY2xlJyB8ICdyb3VuZCcgfCBudWxsO1xuZXhwb3J0IHR5cGUgTnpCdXR0b25TaXplID0gJ2xhcmdlJyB8ICdkZWZhdWx0JyB8ICdzbWFsbCc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnYnV0dG9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW256LWJ1dHRvbl0sIGFbbnotYnV0dG9uXScsXG4gIGV4cG9ydEFzOiAnbnpCdXR0b24nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgbnotaWNvbiBuelR5cGU9XCJsb2FkaW5nXCIgKm5nSWY9XCJuekxvYWRpbmdcIj48L2k+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtYnRuJyxcbiAgICAnW2NsYXNzLmFudC1idG4tcHJpbWFyeV0nOiBgbnpUeXBlID09PSAncHJpbWFyeSdgLFxuICAgICdbY2xhc3MuYW50LWJ0bi1kYXNoZWRdJzogYG56VHlwZSA9PT0gJ2Rhc2hlZCdgLFxuICAgICdbY2xhc3MuYW50LWJ0bi1saW5rXSc6IGBuelR5cGUgPT09ICdsaW5rJ2AsXG4gICAgJ1tjbGFzcy5hbnQtYnRuLXRleHRdJzogYG56VHlwZSA9PT0gJ3RleHQnYCxcbiAgICAnW2NsYXNzLmFudC1idG4tY2lyY2xlXSc6IGBuelNoYXBlID09PSAnY2lyY2xlJ2AsXG4gICAgJ1tjbGFzcy5hbnQtYnRuLXJvdW5kXSc6IGBuelNoYXBlID09PSAncm91bmQnYCxcbiAgICAnW2NsYXNzLmFudC1idG4tbGddJzogYG56U2l6ZSA9PT0gJ2xhcmdlJ2AsXG4gICAgJ1tjbGFzcy5hbnQtYnRuLXNtXSc6IGBuelNpemUgPT09ICdzbWFsbCdgLFxuICAgICdbY2xhc3MuYW50LWJ0bi1kYW5nZXJvdXNdJzogYG56RGFuZ2VyYCxcbiAgICAnW2NsYXNzLmFudC1idG4tbG9hZGluZ10nOiBgbnpMb2FkaW5nYCxcbiAgICAnW2NsYXNzLmFudC1idG4tYmFja2dyb3VuZC1naG9zdF0nOiBgbnpHaG9zdGAsXG4gICAgJ1tjbGFzcy5hbnQtYnRuLWJsb2NrXSc6IGBuekJsb2NrYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1zZWFyY2gtYnV0dG9uXSc6IGBuelNlYXJjaGAsXG4gICAgJ1tjbGFzcy5hbnQtYnRuLXJ0bF0nOiBgZGlyID09PSAncnRsJ2AsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IC0xIDogKHRhYkluZGV4ID09PSBudWxsID8gbnVsbCA6IHRhYkluZGV4KScsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56QnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCB7XG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpCbG9jazogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpHaG9zdDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTZWFyY2g6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TG9hZGluZzogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEYW5nZXI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG5cbiAgQENvbnRlbnRDaGlsZChOekljb25EaXJlY3RpdmUsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBuekljb25EaXJlY3RpdmVFbGVtZW50ITogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56QmxvY2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56R2hvc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2VhcmNoOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGFuZ2VyOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56VHlwZTogTnpCdXR0b25UeXBlID0gbnVsbDtcbiAgQElucHV0KCkgbnpTaGFwZTogTnpCdXR0b25TaGFwZSA9IG51bGw7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpTaXplOiBOekJ1dHRvblNpemUgPSAnZGVmYXVsdCc7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGxvYWRpbmckID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBpbnNlcnRTcGFuKG5vZGVzOiBOb2RlTGlzdCwgcmVuZGVyZXI6IFJlbmRlcmVyMik6IHZvaWQge1xuICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBpZiAobm9kZS5ub2RlTmFtZSA9PT0gJyN0ZXh0Jykge1xuICAgICAgICBjb25zdCBzcGFuID0gcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBwYXJlbnQgPSByZW5kZXJlci5wYXJlbnROb2RlKG5vZGUpO1xuICAgICAgICByZW5kZXJlci5pbnNlcnRCZWZvcmUocGFyZW50LCBzcGFuLCBub2RlKTtcbiAgICAgICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQoc3Bhbiwgbm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhc3NlcnRJY29uT25seShlbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudCwgcmVuZGVyZXI6IFJlbmRlcmVyMik6IHZvaWQge1xuICAgIGNvbnN0IGxpc3RPZk5vZGUgPSBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGROb2Rlcyk7XG4gICAgY29uc3QgaWNvbkNvdW50ID0gbGlzdE9mTm9kZS5maWx0ZXIobm9kZSA9PiBub2RlLm5vZGVOYW1lID09PSAnSScpLmxlbmd0aDtcbiAgICBjb25zdCBub1RleHQgPSBsaXN0T2ZOb2RlLmV2ZXJ5KG5vZGUgPT4gbm9kZS5ub2RlTmFtZSAhPT0gJyN0ZXh0Jyk7XG4gICAgY29uc3Qgbm9TcGFuID0gbGlzdE9mTm9kZS5ldmVyeShub2RlID0+IG5vZGUubm9kZU5hbWUgIT09ICdTUEFOJyk7XG4gICAgY29uc3QgaXNJY29uT25seSA9IG5vU3BhbiAmJiBub1RleHQgJiYgaWNvbkNvdW50ID49IDE7XG4gICAgaWYgKGlzSWNvbk9ubHkpIHtcbiAgICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsICdhbnQtYnRuLWljb24tb25seScpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5XG4gICkge1xuICAgIHRoaXMubnpDb25maWdTZXJ2aWNlXG4gICAgICAuZ2V0Q29uZmlnQ2hhbmdlRXZlbnRGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgLy8gQ2FyZXRha2VyIG5vdGU6IHRoaXMgZXZlbnQgbGlzdGVuZXIgY291bGQndmUgYmVlbiBhZGRlZCB0aHJvdWdoIGBob3N0LmNsaWNrYCBvciBgSG9zdExpc3RlbmVyYC5cbiAgICAgIC8vIFRoZSBjb21waWxlciBnZW5lcmF0ZXMgdGhlIGDJtcm1bGlzdGVuZXJgIGluc3RydWN0aW9uIHdoaWNoIHdyYXBzIHRoZSBhY3R1YWwgbGlzdGVuZXIgaW50ZXJuYWxseSBpbnRvIHRoZVxuICAgICAgLy8gZnVuY3Rpb24sIHdoaWNoIHJ1bnMgYG1hcmtEaXJ0eSgpYCBiZWZvcmUgcnVubmluZyB0aGUgYWN0dWFsIGxpc3RlbmVyICh0aGUgZGVjb3JhdGVkIGNsYXNzIG1ldGhvZCkuXG4gICAgICAvLyBTaW5jZSB3ZSdyZSBwcmV2ZW50aW5nIHRoZSBkZWZhdWx0IGJlaGF2aW9yIGFuZCBzdG9wcGluZyBldmVudCBwcm9wYWdhdGlvbiB0aGlzIGRvZXNuJ3QgcmVxdWlyZSBBbmd1bGFyIHRvIHJ1biB0aGUgY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2NsaWNrJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCAmJiAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KT8udGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56TG9hZGluZyB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpMb2FkaW5nKSB7XG4gICAgICB0aGlzLmxvYWRpbmckLm5leHQodGhpcy5uekxvYWRpbmcpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFzc2VydEljb25Pbmx5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnJlbmRlcmVyKTtcbiAgICB0aGlzLmluc2VydFNwYW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2RlcywgdGhpcy5yZW5kZXJlcik7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLm56TG9hZGluZyksXG4gICAgICAgIGZpbHRlcigoKSA9PiAhIXRoaXMubnpJY29uRGlyZWN0aXZlRWxlbWVudCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShsb2FkaW5nID0+IHtcbiAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMubnpJY29uRGlyZWN0aXZlRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAobG9hZGluZykge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUobmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==