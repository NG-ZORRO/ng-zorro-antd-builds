import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { Directive, Inject, Input, Optional } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "./image.service";
import * as i3 from "./image-group.component";
import * as i4 from "@angular/cdk/bidi";
const NZ_CONFIG_MODULE_NAME = 'image';
export class NzImageDirective {
    constructor(document, nzConfigService, elementRef, nzImageService, cdr, parentGroup, directionality) {
        this.document = document;
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.nzImageService = nzImageService;
        this.cdr = cdr;
        this.parentGroup = parentGroup;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzSrc = '';
        this.nzSrcset = '';
        this.nzDisablePreview = false;
        this.nzFallback = null;
        this.nzPlaceholder = null;
        this.status = 'normal';
        this.backLoadDestroy$ = new Subject();
        this.destroy$ = new Subject();
    }
    get previewable() {
        return !this.nzDisablePreview && this.status !== 'error';
    }
    ngOnInit() {
        this.backLoad();
        if (this.parentGroup) {
            this.parentGroup.addImage(this);
        }
        if (this.directionality) {
            this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    onPreview() {
        if (!this.previewable) {
            return;
        }
        if (this.parentGroup) {
            // preview inside image group
            const previewAbleImages = this.parentGroup.images.filter(e => e.previewable);
            const previewImages = previewAbleImages.map(e => ({ src: e.nzSrc, srcset: e.nzSrcset }));
            const previewIndex = previewAbleImages.findIndex(el => this === el);
            const previewRef = this.nzImageService.preview(previewImages, { nzDirection: this.dir });
            previewRef.switchTo(previewIndex);
        }
        else {
            // preview not inside image group
            const previewImages = [{ src: this.nzSrc, srcset: this.nzSrcset }];
            this.nzImageService.preview(previewImages, { nzDirection: this.dir });
        }
    }
    getElement() {
        return this.elementRef;
    }
    ngOnChanges(changes) {
        const { nzSrc } = changes;
        if (nzSrc) {
            this.getElement().nativeElement.src = nzSrc.currentValue;
            this.backLoad();
        }
    }
    /**
     * use internal Image object handle fallback & placeholder
     *
     * @private
     */
    backLoad() {
        this.backLoadImage = this.document.createElement('img');
        this.backLoadImage.src = this.nzSrc;
        this.backLoadImage.srcset = this.nzSrcset;
        this.status = 'loading';
        // unsubscribe last backLoad
        this.backLoadDestroy$.next();
        this.backLoadDestroy$.complete();
        this.backLoadDestroy$ = new Subject();
        if (this.backLoadImage.complete) {
            this.status = 'normal';
            this.getElement().nativeElement.src = this.nzSrc;
            this.getElement().nativeElement.srcset = this.nzSrcset;
        }
        else {
            if (this.nzPlaceholder) {
                this.getElement().nativeElement.src = this.nzPlaceholder;
                this.getElement().nativeElement.srcset = '';
            }
            else {
                this.getElement().nativeElement.src = this.nzSrc;
                this.getElement().nativeElement.srcset = this.nzSrcset;
            }
            // The `nz-image` directive can be destroyed before the `load` or `error` event is dispatched,
            // so there's no sense to keep capturing `this`.
            fromEvent(this.backLoadImage, 'load')
                .pipe(takeUntil(this.backLoadDestroy$), takeUntil(this.destroy$))
                .subscribe(() => {
                this.status = 'normal';
                this.getElement().nativeElement.src = this.nzSrc;
                this.getElement().nativeElement.srcset = this.nzSrcset;
            });
            fromEvent(this.backLoadImage, 'error')
                .pipe(takeUntil(this.backLoadDestroy$), takeUntil(this.destroy$))
                .subscribe(() => {
                this.status = 'error';
                if (this.nzFallback) {
                    this.getElement().nativeElement.src = this.nzFallback;
                    this.getElement().nativeElement.srcset = '';
                }
            });
        }
    }
}
NzImageDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageDirective, deps: [{ token: DOCUMENT }, { token: i1.NzConfigService }, { token: i0.ElementRef }, { token: i2.NzImageService }, { token: i0.ChangeDetectorRef }, { token: i3.NzImageGroupComponent, optional: true }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzImageDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzImageDirective, selector: "img[nz-image]", inputs: { nzSrc: "nzSrc", nzSrcset: "nzSrcset", nzDisablePreview: "nzDisablePreview", nzFallback: "nzFallback", nzPlaceholder: "nzPlaceholder" }, host: { listeners: { "click": "onPreview()" } }, exportAs: ["nzImage"], usesOnChanges: true, ngImport: i0 });
__decorate([
    InputBoolean(),
    WithConfig()
], NzImageDirective.prototype, "nzDisablePreview", void 0);
__decorate([
    WithConfig()
], NzImageDirective.prototype, "nzFallback", void 0);
__decorate([
    WithConfig()
], NzImageDirective.prototype, "nzPlaceholder", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'img[nz-image]',
                    exportAs: 'nzImage',
                    host: {
                        '(click)': 'onPreview()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.NzConfigService }, { type: i0.ElementRef }, { type: i2.NzImageService }, { type: i0.ChangeDetectorRef }, { type: i3.NzImageGroupComponent, decorators: [{
                    type: Optional
                }] }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzSrc: [{
                type: Input
            }], nzSrcset: [{
                type: Input
            }], nzDisablePreview: [{
                type: Input
            }], nzFallback: [{
                type: Input
            }], nzPlaceholder: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsU0FBUyxFQUVULE1BQU0sRUFDTixLQUFLLEVBSUwsUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQWdDLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7O0FBS3ZELE1BQU0scUJBQXFCLEdBQWdCLE9BQU8sQ0FBQztBQVduRCxNQUFNLE9BQU8sZ0JBQWdCO0lBcUIzQixZQUM0QixRQUFtQixFQUN0QyxlQUFnQyxFQUMvQixVQUFzQixFQUN0QixjQUE4QixFQUM1QixHQUFzQixFQUNaLFdBQWtDLEVBQ2xDLGNBQThCO1FBTnhCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDdEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzVCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1osZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQTNCM0Msa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFJbkQsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZ0IscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xELGVBQVUsR0FB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QUNILENBQUM7OzZHQWpJVSxnQkFBZ0Isa0JBc0JqQixRQUFRO2lHQXRCUCxnQkFBZ0I7QUFPWTtJQUE3QixZQUFZLEVBQUU7SUFBRSxVQUFVLEVBQUU7MERBQW1DO0FBQ2xEO0lBQWIsVUFBVSxFQUFFO29EQUFrQztBQUNqQztJQUFiLFVBQVUsRUFBRTt1REFBcUM7MkZBVGhELGdCQUFnQjtrQkFQNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLElBQUksRUFBRTt3QkFDSixTQUFTLEVBQUUsYUFBYTtxQkFDekI7aUJBQ0Y7OzBCQXVCSSxNQUFNOzJCQUFDLFFBQVE7OzBCQUtmLFFBQVE7OzBCQUNSLFFBQVE7NENBdkJGLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNpQyxnQkFBZ0I7c0JBQXRELEtBQUs7Z0JBQ2lCLFVBQVU7c0JBQWhDLEtBQUs7Z0JBQ2lCLGFBQWE7c0JBQW5DLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBOekltYWdlR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlLWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekltYWdlU2VydmljZSB9IGZyb20gJy4vaW1hZ2Uuc2VydmljZSc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnaW1hZ2UnO1xuXG5leHBvcnQgdHlwZSBJbWFnZVN0YXR1c1R5cGUgPSAnZXJyb3InIHwgJ2xvYWRpbmcnIHwgJ25vcm1hbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2ltZ1tuei1pbWFnZV0nLFxuICBleHBvcnRBczogJ256SW1hZ2UnLFxuICBob3N0OiB7XG4gICAgJyhjbGljayknOiAnb25QcmV2aWV3KCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpJbWFnZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlUHJldmlldzogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIG56U3JjID0gJyc7XG4gIEBJbnB1dCgpIG56U3Jjc2V0ID0gJyc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBAV2l0aENvbmZpZygpIG56RGlzYWJsZVByZXZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuekZhbGxiYWNrOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelBsYWNlaG9sZGVyOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBkaXI/OiBEaXJlY3Rpb247XG4gIGJhY2tMb2FkSW1hZ2UhOiBIVE1MSW1hZ2VFbGVtZW50O1xuICBzdGF0dXM6IEltYWdlU3RhdHVzVHlwZSA9ICdub3JtYWwnO1xuICBwcml2YXRlIGJhY2tMb2FkRGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGRlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBnZXQgcHJldmlld2FibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLm56RGlzYWJsZVByZXZpZXcgJiYgdGhpcy5zdGF0dXMgIT09ICdlcnJvcic7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBOelNhZmVBbnksXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIG56SW1hZ2VTZXJ2aWNlOiBOekltYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHBhcmVudEdyb3VwOiBOekltYWdlR3JvdXBDb21wb25lbnQsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYmFja0xvYWQoKTtcbiAgICBpZiAodGhpcy5wYXJlbnRHcm91cCkge1xuICAgICAgdGhpcy5wYXJlbnRHcm91cC5hZGRJbWFnZSh0aGlzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uYWxpdHkpIHtcbiAgICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25QcmV2aWV3KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wcmV2aWV3YWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudEdyb3VwKSB7XG4gICAgICAvLyBwcmV2aWV3IGluc2lkZSBpbWFnZSBncm91cFxuICAgICAgY29uc3QgcHJldmlld0FibGVJbWFnZXMgPSB0aGlzLnBhcmVudEdyb3VwLmltYWdlcy5maWx0ZXIoZSA9PiBlLnByZXZpZXdhYmxlKTtcbiAgICAgIGNvbnN0IHByZXZpZXdJbWFnZXMgPSBwcmV2aWV3QWJsZUltYWdlcy5tYXAoZSA9PiAoeyBzcmM6IGUubnpTcmMsIHNyY3NldDogZS5uelNyY3NldCB9KSk7XG4gICAgICBjb25zdCBwcmV2aWV3SW5kZXggPSBwcmV2aWV3QWJsZUltYWdlcy5maW5kSW5kZXgoZWwgPT4gdGhpcyA9PT0gZWwpO1xuICAgICAgY29uc3QgcHJldmlld1JlZiA9IHRoaXMubnpJbWFnZVNlcnZpY2UucHJldmlldyhwcmV2aWV3SW1hZ2VzLCB7IG56RGlyZWN0aW9uOiB0aGlzLmRpciB9KTtcbiAgICAgIHByZXZpZXdSZWYuc3dpdGNoVG8ocHJldmlld0luZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcHJldmlldyBub3QgaW5zaWRlIGltYWdlIGdyb3VwXG4gICAgICBjb25zdCBwcmV2aWV3SW1hZ2VzID0gW3sgc3JjOiB0aGlzLm56U3JjLCBzcmNzZXQ6IHRoaXMubnpTcmNzZXQgfV07XG4gICAgICB0aGlzLm56SW1hZ2VTZXJ2aWNlLnByZXZpZXcocHJldmlld0ltYWdlcywgeyBuekRpcmVjdGlvbjogdGhpcy5kaXIgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RWxlbWVudCgpOiBFbGVtZW50UmVmPEhUTUxJbWFnZUVsZW1lbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpTcmMgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56U3JjKSB7XG4gICAgICB0aGlzLmdldEVsZW1lbnQoKS5uYXRpdmVFbGVtZW50LnNyYyA9IG56U3JjLmN1cnJlbnRWYWx1ZTtcbiAgICAgIHRoaXMuYmFja0xvYWQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdXNlIGludGVybmFsIEltYWdlIG9iamVjdCBoYW5kbGUgZmFsbGJhY2sgJiBwbGFjZWhvbGRlclxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBiYWNrTG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLmJhY2tMb2FkSW1hZ2UgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHRoaXMuYmFja0xvYWRJbWFnZS5zcmMgPSB0aGlzLm56U3JjO1xuICAgIHRoaXMuYmFja0xvYWRJbWFnZS5zcmNzZXQgPSB0aGlzLm56U3Jjc2V0O1xuICAgIHRoaXMuc3RhdHVzID0gJ2xvYWRpbmcnO1xuXG4gICAgLy8gdW5zdWJzY3JpYmUgbGFzdCBiYWNrTG9hZFxuICAgIHRoaXMuYmFja0xvYWREZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5iYWNrTG9hZERlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5iYWNrTG9hZERlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgICBpZiAodGhpcy5iYWNrTG9hZEltYWdlLmNvbXBsZXRlKSB7XG4gICAgICB0aGlzLnN0YXR1cyA9ICdub3JtYWwnO1xuICAgICAgdGhpcy5nZXRFbGVtZW50KCkubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLm56U3JjO1xuICAgICAgdGhpcy5nZXRFbGVtZW50KCkubmF0aXZlRWxlbWVudC5zcmNzZXQgPSB0aGlzLm56U3Jjc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5uelBsYWNlaG9sZGVyKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5uelBsYWNlaG9sZGVyO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5uYXRpdmVFbGVtZW50LnNyY3NldCA9ICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KCkubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLm56U3JjO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5uYXRpdmVFbGVtZW50LnNyY3NldCA9IHRoaXMubnpTcmNzZXQ7XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBgbnotaW1hZ2VgIGRpcmVjdGl2ZSBjYW4gYmUgZGVzdHJveWVkIGJlZm9yZSB0aGUgYGxvYWRgIG9yIGBlcnJvcmAgZXZlbnQgaXMgZGlzcGF0Y2hlZCxcbiAgICAgIC8vIHNvIHRoZXJlJ3Mgbm8gc2Vuc2UgdG8ga2VlcCBjYXB0dXJpbmcgYHRoaXNgLlxuICAgICAgZnJvbUV2ZW50KHRoaXMuYmFja0xvYWRJbWFnZSwgJ2xvYWQnKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5iYWNrTG9hZERlc3Ryb3kkKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXR1cyA9ICdub3JtYWwnO1xuICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5uelNyYztcbiAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5uYXRpdmVFbGVtZW50LnNyY3NldCA9IHRoaXMubnpTcmNzZXQ7XG4gICAgICAgIH0pO1xuXG4gICAgICBmcm9tRXZlbnQodGhpcy5iYWNrTG9hZEltYWdlLCAnZXJyb3InKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5iYWNrTG9hZERlc3Ryb3kkKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXR1cyA9ICdlcnJvcic7XG4gICAgICAgICAgaWYgKHRoaXMubnpGYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50KCkubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLm56RmFsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5uYXRpdmVFbGVtZW50LnNyY3NldCA9ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=