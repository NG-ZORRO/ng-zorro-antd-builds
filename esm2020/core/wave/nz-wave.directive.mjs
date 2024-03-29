/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Inject, InjectionToken, Input, Optional, PLATFORM_ID } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { NzWaveRenderer } from './nz-wave-renderer';
import * as i0 from "@angular/core";
export const NZ_WAVE_GLOBAL_DEFAULT_CONFIG = {
    disabled: false
};
export const NZ_WAVE_GLOBAL_CONFIG = new InjectionToken('nz-wave-global-options', {
    providedIn: 'root',
    factory: NZ_WAVE_GLOBAL_CONFIG_FACTORY
});
export function NZ_WAVE_GLOBAL_CONFIG_FACTORY() {
    return NZ_WAVE_GLOBAL_DEFAULT_CONFIG;
}
export class NzWaveDirective {
    constructor(ngZone, elementRef, config, animationType, platformId) {
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.config = config;
        this.animationType = animationType;
        this.platformId = platformId;
        this.nzWaveExtraNode = false;
        this.waveDisabled = false;
        this.waveDisabled = this.isConfigDisabled();
    }
    get disabled() {
        return this.waveDisabled;
    }
    get rendererRef() {
        return this.waveRenderer;
    }
    isConfigDisabled() {
        let disabled = false;
        if (this.config && typeof this.config.disabled === 'boolean') {
            disabled = this.config.disabled;
        }
        if (this.animationType === 'NoopAnimations') {
            disabled = true;
        }
        return disabled;
    }
    ngOnDestroy() {
        if (this.waveRenderer) {
            this.waveRenderer.destroy();
        }
    }
    ngOnInit() {
        this.renderWaveIfEnabled();
    }
    renderWaveIfEnabled() {
        if (!this.waveDisabled && this.elementRef.nativeElement) {
            this.waveRenderer = new NzWaveRenderer(this.elementRef.nativeElement, this.ngZone, this.nzWaveExtraNode, this.platformId);
        }
    }
    disable() {
        this.waveDisabled = true;
        if (this.waveRenderer) {
            this.waveRenderer.removeTriggerEvent();
            this.waveRenderer.removeStyleAndExtraNode();
        }
    }
    enable() {
        // config priority
        this.waveDisabled = this.isConfigDisabled() || false;
        if (this.waveRenderer) {
            this.waveRenderer.bindTriggerEvent();
        }
    }
}
NzWaveDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzWaveDirective, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: NZ_WAVE_GLOBAL_CONFIG, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
NzWaveDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: { nzWaveExtraNode: "nzWaveExtraNode" }, exportAs: ["nzWave"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzWaveDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-wave],button[nz-button]:not([nzType="link"]):not([nzType="text"])',
                    exportAs: 'nzWave'
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NZ_WAVE_GLOBAL_CONFIG]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { nzWaveExtraNode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotd2F2ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvd2F2ZS9uei13YXZlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUVULE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUlMLFFBQVEsRUFDUixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFJN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQU1wRCxNQUFNLENBQUMsTUFBTSw2QkFBNkIsR0FBaUI7SUFDekQsUUFBUSxFQUFFLEtBQUs7Q0FDaEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUFlLHdCQUF3QixFQUFFO0lBQzlGLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSw2QkFBNkI7Q0FDdkMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxVQUFVLDZCQUE2QjtJQUMzQyxPQUFPLDZCQUE2QixDQUFDO0FBQ3ZDLENBQUM7QUFNRCxNQUFNLE9BQU8sZUFBZTtJQWMxQixZQUNVLE1BQWMsRUFDZCxVQUFzQixFQUNxQixNQUFvQixFQUNwQixhQUFxQixFQUMzQyxVQUFxQjtRQUoxQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNxQixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3BCLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQzNDLGVBQVUsR0FBVixVQUFVLENBQVc7UUFsQjNDLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBR3pCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBaUJwQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFoQkQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQVlELGdCQUFnQjtRQUNkLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDNUQsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLGdCQUFnQixFQUFFO1lBQzNDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDakI7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxjQUFjLENBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUM3QixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxlQUFlLEVBQ3BCLElBQUksQ0FBQyxVQUFVLENBQ2hCLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEtBQUssQ0FBQztRQUNyRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7NEdBdEVVLGVBQWUsa0VBaUJKLHFCQUFxQiw2QkFDckIscUJBQXFCLDZCQUNqQyxXQUFXO2dHQW5CVixlQUFlOzJGQUFmLGVBQWU7a0JBSjNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVFQUF1RTtvQkFDakYsUUFBUSxFQUFFLFFBQVE7aUJBQ25COzswQkFrQkksUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxxQkFBcUI7OzBCQUN4QyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLHFCQUFxQjs7MEJBQ3hDLE1BQU07MkJBQUMsV0FBVzs0Q0FsQlosZUFBZTtzQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFOSU1BVElPTl9NT0RVTEVfVFlQRSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56V2F2ZVJlbmRlcmVyIH0gZnJvbSAnLi9uei13YXZlLXJlbmRlcmVyJztcblxuZXhwb3J0IGludGVyZmFjZSBOeldhdmVDb25maWcge1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBOWl9XQVZFX0dMT0JBTF9ERUZBVUxUX0NPTkZJRzogTnpXYXZlQ29uZmlnID0ge1xuICBkaXNhYmxlZDogZmFsc2Vcbn07XG5cbmV4cG9ydCBjb25zdCBOWl9XQVZFX0dMT0JBTF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48TnpXYXZlQ29uZmlnPignbnotd2F2ZS1nbG9iYWwtb3B0aW9ucycsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiBOWl9XQVZFX0dMT0JBTF9DT05GSUdfRkFDVE9SWVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBOWl9XQVZFX0dMT0JBTF9DT05GSUdfRkFDVE9SWSgpOiBOeldhdmVDb25maWcge1xuICByZXR1cm4gTlpfV0FWRV9HTE9CQUxfREVGQVVMVF9DT05GSUc7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei13YXZlXSxidXR0b25bbnotYnV0dG9uXTpub3QoW256VHlwZT1cImxpbmtcIl0pOm5vdChbbnpUeXBlPVwidGV4dFwiXSknLFxuICBleHBvcnRBczogJ256V2F2ZSdcbn0pXG5leHBvcnQgY2xhc3MgTnpXYXZlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBueldhdmVFeHRyYU5vZGUgPSBmYWxzZTtcblxuICBwcml2YXRlIHdhdmVSZW5kZXJlcj86IE56V2F2ZVJlbmRlcmVyO1xuICBwcml2YXRlIHdhdmVEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy53YXZlRGlzYWJsZWQ7XG4gIH1cblxuICBnZXQgcmVuZGVyZXJSZWYoKTogTnpXYXZlUmVuZGVyZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLndhdmVSZW5kZXJlcjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTlpfV0FWRV9HTE9CQUxfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogTnpXYXZlQ29uZmlnLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBwcml2YXRlIGFuaW1hdGlvblR5cGU6IHN0cmluZyxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE56U2FmZUFueVxuICApIHtcbiAgICB0aGlzLndhdmVEaXNhYmxlZCA9IHRoaXMuaXNDb25maWdEaXNhYmxlZCgpO1xuICB9XG5cbiAgaXNDb25maWdEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBsZXQgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5jb25maWcgJiYgdHlwZW9mIHRoaXMuY29uZmlnLmRpc2FibGVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGRpc2FibGVkID0gdGhpcy5jb25maWcuZGlzYWJsZWQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmFuaW1hdGlvblR5cGUgPT09ICdOb29wQW5pbWF0aW9ucycpIHtcbiAgICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGRpc2FibGVkO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMud2F2ZVJlbmRlcmVyKSB7XG4gICAgICB0aGlzLndhdmVSZW5kZXJlci5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJXYXZlSWZFbmFibGVkKCk7XG4gIH1cblxuICByZW5kZXJXYXZlSWZFbmFibGVkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy53YXZlRGlzYWJsZWQgJiYgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMud2F2ZVJlbmRlcmVyID0gbmV3IE56V2F2ZVJlbmRlcmVyKFxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgdGhpcy5uZ1pvbmUsXG4gICAgICAgIHRoaXMubnpXYXZlRXh0cmFOb2RlLFxuICAgICAgICB0aGlzLnBsYXRmb3JtSWRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZSgpOiB2b2lkIHtcbiAgICB0aGlzLndhdmVEaXNhYmxlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMud2F2ZVJlbmRlcmVyKSB7XG4gICAgICB0aGlzLndhdmVSZW5kZXJlci5yZW1vdmVUcmlnZ2VyRXZlbnQoKTtcbiAgICAgIHRoaXMud2F2ZVJlbmRlcmVyLnJlbW92ZVN0eWxlQW5kRXh0cmFOb2RlKCk7XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlKCk6IHZvaWQge1xuICAgIC8vIGNvbmZpZyBwcmlvcml0eVxuICAgIHRoaXMud2F2ZURpc2FibGVkID0gdGhpcy5pc0NvbmZpZ0Rpc2FibGVkKCkgfHwgZmFsc2U7XG4gICAgaWYgKHRoaXMud2F2ZVJlbmRlcmVyKSB7XG4gICAgICB0aGlzLndhdmVSZW5kZXJlci5iaW5kVHJpZ2dlckV2ZW50KCk7XG4gICAgfVxuICB9XG59XG4iXX0=