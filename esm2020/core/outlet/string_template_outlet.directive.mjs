/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export class NzStringTemplateOutletDirective {
    constructor(viewContainer, templateRef) {
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
        this.embeddedViewRef = null;
        this.context = new NzStringTemplateOutletContext();
        this.nzStringTemplateOutletContext = null;
        this.nzStringTemplateOutlet = null;
    }
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    recreateView() {
        this.viewContainer.clear();
        const isTemplateRef = this.nzStringTemplateOutlet instanceof TemplateRef;
        const templateRef = (isTemplateRef ? this.nzStringTemplateOutlet : this.templateRef);
        this.embeddedViewRef = this.viewContainer.createEmbeddedView(templateRef, isTemplateRef ? this.nzStringTemplateOutletContext : this.context);
    }
    updateContext() {
        const isTemplateRef = this.nzStringTemplateOutlet instanceof TemplateRef;
        const newCtx = isTemplateRef ? this.nzStringTemplateOutletContext : this.context;
        const oldCtx = this.embeddedViewRef.context;
        if (newCtx) {
            for (const propName of Object.keys(newCtx)) {
                oldCtx[propName] = newCtx[propName];
            }
        }
    }
    ngOnChanges(changes) {
        const { nzStringTemplateOutletContext, nzStringTemplateOutlet } = changes;
        const shouldRecreateView = () => {
            let shouldOutletRecreate = false;
            if (nzStringTemplateOutlet) {
                if (nzStringTemplateOutlet.firstChange) {
                    shouldOutletRecreate = true;
                }
                else {
                    const isPreviousOutletTemplate = nzStringTemplateOutlet.previousValue instanceof TemplateRef;
                    const isCurrentOutletTemplate = nzStringTemplateOutlet.currentValue instanceof TemplateRef;
                    shouldOutletRecreate = isPreviousOutletTemplate || isCurrentOutletTemplate;
                }
            }
            const hasContextShapeChanged = (ctxChange) => {
                const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
                const currCtxKeys = Object.keys(ctxChange.currentValue || {});
                if (prevCtxKeys.length === currCtxKeys.length) {
                    for (const propName of currCtxKeys) {
                        if (prevCtxKeys.indexOf(propName) === -1) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return true;
                }
            };
            const shouldContextRecreate = nzStringTemplateOutletContext && hasContextShapeChanged(nzStringTemplateOutletContext);
            return shouldContextRecreate || shouldOutletRecreate;
        };
        if (nzStringTemplateOutlet) {
            this.context.$implicit = nzStringTemplateOutlet.currentValue;
        }
        const recreateView = shouldRecreateView();
        if (recreateView) {
            /** recreate view when context shape or outlet change **/
            this.recreateView();
        }
        else {
            /** update context **/
            this.updateContext();
        }
    }
}
NzStringTemplateOutletDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStringTemplateOutletDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NzStringTemplateOutletDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: { nzStringTemplateOutletContext: "nzStringTemplateOutletContext", nzStringTemplateOutlet: "nzStringTemplateOutlet" }, exportAs: ["nzStringTemplateOutlet"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStringTemplateOutletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzStringTemplateOutlet]',
                    exportAs: 'nzStringTemplateOutlet'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }]; }, propDecorators: { nzStringTemplateOutletContext: [{
                type: Input
            }], nzStringTemplateOutlet: [{
                type: Input
            }] } });
export class NzStringTemplateOutletContext {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nX3RlbXBsYXRlX291dGxldC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvb3V0bGV0L3N0cmluZ190ZW1wbGF0ZV9vdXRsZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUlMLFdBQVcsRUFFWixNQUFNLGVBQWUsQ0FBQzs7QUFRdkIsTUFBTSxPQUFPLCtCQUErQjtJQWtDMUMsWUFBb0IsYUFBK0IsRUFBVSxXQUFtQztRQUE1RSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBd0I7UUFqQ3hGLG9CQUFlLEdBQXNDLElBQUksQ0FBQztRQUMxRCxZQUFPLEdBQUcsSUFBSSw2QkFBNkIsRUFBRSxDQUFDO1FBQzdDLGtDQUE2QixHQUFxQixJQUFJLENBQUM7UUFDdkQsMkJBQXNCLEdBQXVDLElBQUksQ0FBQztJQThCd0IsQ0FBQztJQTVCcEcsTUFBTSxDQUFDLHNCQUFzQixDQUMzQixJQUF3QyxFQUN4QyxJQUFlO1FBRWYsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sWUFBWTtRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsWUFBWSxXQUFXLENBQUM7UUFDekUsTUFBTSxXQUFXLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBYyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FDMUQsV0FBVyxFQUNYLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMs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QkFBOUIsS0FBSzs7QUErRVIsTUFBTSxPQUFPLDZCQUE2QjtDQUV6QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnpTdHJpbmdUZW1wbGF0ZU91dGxldF0nLFxuICBleHBvcnRBczogJ256U3RyaW5nVGVtcGxhdGVPdXRsZXQnXG59KVxuZXhwb3J0IGNsYXNzIE56U3RyaW5nVGVtcGxhdGVPdXRsZXREaXJlY3RpdmU8X1QgPSB1bmtub3duPiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgZW1iZWRkZWRWaWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGNvbnRleHQgPSBuZXcgTnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQoKTtcbiAgQElucHV0KCkgbnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQ6IE56U2FmZUFueSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelN0cmluZ1RlbXBsYXRlT3V0bGV0OiBOelNhZmVBbnkgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+ID0gbnVsbDtcblxuICBzdGF0aWMgbmdUZW1wbGF0ZUNvbnRleHRHdWFyZDxUPihcbiAgICBfZGlyOiBOelN0cmluZ1RlbXBsYXRlT3V0bGV0RGlyZWN0aXZlPFQ+LFxuICAgIF9jdHg6IE56U2FmZUFueVxuICApOiBfY3R4IGlzIE56U3RyaW5nVGVtcGxhdGVPdXRsZXRDb250ZXh0IHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVjcmVhdGVWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgIGNvbnN0IGlzVGVtcGxhdGVSZWYgPSB0aGlzLm56U3RyaW5nVGVtcGxhdGVPdXRsZXQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICBjb25zdCB0ZW1wbGF0ZVJlZiA9IChpc1RlbXBsYXRlUmVmID8gdGhpcy5uelN0cmluZ1RlbXBsYXRlT3V0bGV0IDogdGhpcy50ZW1wbGF0ZVJlZikgYXMgTnpTYWZlQW55O1xuICAgIHRoaXMuZW1iZWRkZWRWaWV3UmVmID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyhcbiAgICAgIHRlbXBsYXRlUmVmLFxuICAgICAgaXNUZW1wbGF0ZVJlZiA/IHRoaXMubnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQgOiB0aGlzLmNvbnRleHRcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDb250ZXh0KCk6IHZvaWQge1xuICAgIGNvbnN0IGlzVGVtcGxhdGVSZWYgPSB0aGlzLm56U3RyaW5nVGVtcGxhdGVPdXRsZXQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICBjb25zdCBuZXdDdHggPSBpc1RlbXBsYXRlUmVmID8gdGhpcy5uelN0cmluZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCA6IHRoaXMuY29udGV4dDtcbiAgICBjb25zdCBvbGRDdHggPSB0aGlzLmVtYmVkZGVkVmlld1JlZiEuY29udGV4dCBhcyBOelNhZmVBbnk7XG4gICAgaWYgKG5ld0N0eCkge1xuICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3Qua2V5cyhuZXdDdHgpKSB7XG4gICAgICAgIG9sZEN0eFtwcm9wTmFtZV0gPSBuZXdDdHhbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TnpTYWZlQW55Pikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelN0cmluZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCwgbnpTdHJpbmdUZW1wbGF0ZU91dGxldCB9ID0gY2hhbmdlcztcbiAgICBjb25zdCBzaG91bGRSZWNyZWF0ZVZpZXcgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgICBsZXQgc2hvdWxkT3V0bGV0UmVjcmVhdGUgPSBmYWxzZTtcbiAgICAgIGlmIChuelN0cmluZ1RlbXBsYXRlT3V0bGV0KSB7XG4gICAgICAgIGlmIChuelN0cmluZ1RlbXBsYXRlT3V0bGV0LmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgc2hvdWxkT3V0bGV0UmVjcmVhdGUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGlzUHJldmlvdXNPdXRsZXRUZW1wbGF0ZSA9IG56U3RyaW5nVGVtcGxhdGVPdXRsZXQucHJldmlvdXNWYWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgICAgICAgIGNvbnN0IGlzQ3VycmVudE91dGxldFRlbXBsYXRlID0gbnpTdHJpbmdUZW1wbGF0ZU91dGxldC5jdXJyZW50VmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICAgICAgICBzaG91bGRPdXRsZXRSZWNyZWF0ZSA9IGlzUHJldmlvdXNPdXRsZXRUZW1wbGF0ZSB8fCBpc0N1cnJlbnRPdXRsZXRUZW1wbGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgaGFzQ29udGV4dFNoYXBlQ2hhbmdlZCA9IChjdHhDaGFuZ2U6IFNpbXBsZUNoYW5nZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBwcmV2Q3R4S2V5cyA9IE9iamVjdC5rZXlzKGN0eENoYW5nZS5wcmV2aW91c1ZhbHVlIHx8IHt9KTtcbiAgICAgICAgY29uc3QgY3VyckN0eEtleXMgPSBPYmplY3Qua2V5cyhjdHhDaGFuZ2UuY3VycmVudFZhbHVlIHx8IHt9KTtcbiAgICAgICAgaWYgKHByZXZDdHhLZXlzLmxlbmd0aCA9PT0gY3VyckN0eEtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBjdXJyQ3R4S2V5cykge1xuICAgICAgICAgICAgaWYgKHByZXZDdHhLZXlzLmluZGV4T2YocHJvcE5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2hvdWxkQ29udGV4dFJlY3JlYXRlID1cbiAgICAgICAgbnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQgJiYgaGFzQ29udGV4dFNoYXBlQ2hhbmdlZChuelN0cmluZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCk7XG4gICAgICByZXR1cm4gc2hvdWxkQ29udGV4dFJlY3JlYXRlIHx8IHNob3VsZE91dGxldFJlY3JlYXRlO1xuICAgIH07XG5cbiAgICBpZiAobnpTdHJpbmdUZW1wbGF0ZU91dGxldCkge1xuICAgICAgdGhpcy5jb250ZXh0LiRpbXBsaWNpdCA9IG56U3RyaW5nVGVtcGxhdGVPdXRsZXQuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlY3JlYXRlVmlldyA9IHNob3VsZFJlY3JlYXRlVmlldygpO1xuICAgIGlmIChyZWNyZWF0ZVZpZXcpIHtcbiAgICAgIC8qKiByZWNyZWF0ZSB2aWV3IHdoZW4gY29udGV4dCBzaGFwZSBvciBvdXRsZXQgY2hhbmdlICoqL1xuICAgICAgdGhpcy5yZWNyZWF0ZVZpZXcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLyoqIHVwZGF0ZSBjb250ZXh0ICoqL1xuICAgICAgdGhpcy51cGRhdGVDb250ZXh0KCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBOelN0cmluZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCB7XG4gIHB1YmxpYyAkaW1wbGljaXQ6IE56U2FmZUFueTtcbn1cbiJdfQ==