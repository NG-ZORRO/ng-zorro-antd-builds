/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, Inject, InjectionToken, Input, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { NzWaveRenderer } from './nz-wave-renderer';
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
NzWaveDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-wave],button[nz-button]:not([nzType="link"]):not([nzType="text"])',
                exportAs: 'nzWave'
            },] }
];
NzWaveDirective.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_WAVE_GLOBAL_CONFIG,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
NzWaveDirective.propDecorators = {
    nzWaveExtraNode: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotd2F2ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb3JlL3dhdmUvIiwic291cmNlcyI6WyJuei13YXZlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQXFCLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkksT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBTXBELE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFpQjtJQUN6RCxRQUFRLEVBQUUsS0FBSztDQUNoQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQWUsd0JBQXdCLEVBQUU7SUFDOUYsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLDZCQUE2QjtDQUN2QyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsNkJBQTZCO0lBQzNDLE9BQU8sNkJBQTZCLENBQUM7QUFDdkMsQ0FBQztBQU1ELE1BQU0sT0FBTyxlQUFlO0lBYzFCLFlBQ1UsTUFBYyxFQUNkLFVBQXNCLEVBQ3FCLE1BQW9CLEVBQ3BCLGFBQXFCLEVBQzNDLFVBQXFCO1FBSjFDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3FCLFdBQU0sR0FBTixNQUFNLENBQWM7UUFDcEIsa0JBQWEsR0FBYixhQUFhLENBQVE7UUFDM0MsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQWxCM0Msb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHekIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFpQnBDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDOUMsQ0FBQztJQWhCRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBWUQsZ0JBQWdCO1FBQ2QsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUM1RCxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDakM7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssZ0JBQWdCLEVBQUU7WUFDM0MsUUFBUSxHQUFHLElBQUksQ0FBQztTQUNqQjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNIO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUM3QztJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksS0FBSyxDQUFDO1FBQ3JELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDdEM7SUFDSCxDQUFDOzs7WUFyRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1RUFBdUU7Z0JBQ2pGLFFBQVEsRUFBRSxRQUFRO2FBQ25COzs7WUF6QjhELE1BQU07WUFBakQsVUFBVTs0Q0EyQ3pCLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCO3lDQUN4QyxRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs0Q0FDeEMsTUFBTSxTQUFDLFdBQVc7Ozs4QkFsQnBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0LCBPcHRpb25hbCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFOSU1BVElPTl9NT0RVTEVfVFlQRSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpXYXZlUmVuZGVyZXIgfSBmcm9tICcuL256LXdhdmUtcmVuZGVyZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIE56V2F2ZUNvbmZpZyB7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IE5aX1dBVkVfR0xPQkFMX0RFRkFVTFRfQ09ORklHOiBOeldhdmVDb25maWcgPSB7XG4gIGRpc2FibGVkOiBmYWxzZVxufTtcblxuZXhwb3J0IGNvbnN0IE5aX1dBVkVfR0xPQkFMX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxOeldhdmVDb25maWc+KCduei13YXZlLWdsb2JhbC1vcHRpb25zJywge1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIGZhY3Rvcnk6IE5aX1dBVkVfR0xPQkFMX0NPTkZJR19GQUNUT1JZXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIE5aX1dBVkVfR0xPQkFMX0NPTkZJR19GQUNUT1JZKCk6IE56V2F2ZUNvbmZpZyB7XG4gIHJldHVybiBOWl9XQVZFX0dMT0JBTF9ERUZBVUxUX0NPTkZJRztcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256LXdhdmVdLGJ1dHRvbltuei1idXR0b25dOm5vdChbbnpUeXBlPVwibGlua1wiXSk6bm90KFtuelR5cGU9XCJ0ZXh0XCJdKScsXG4gIGV4cG9ydEFzOiAnbnpXYXZlJ1xufSlcbmV4cG9ydCBjbGFzcyBOeldhdmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG56V2F2ZUV4dHJhTm9kZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgd2F2ZVJlbmRlcmVyPzogTnpXYXZlUmVuZGVyZXI7XG4gIHByaXZhdGUgd2F2ZURpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLndhdmVEaXNhYmxlZDtcbiAgfVxuXG4gIGdldCByZW5kZXJlclJlZigpOiBOeldhdmVSZW5kZXJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMud2F2ZVJlbmRlcmVyO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOWl9XQVZFX0dMT0JBTF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBOeldhdmVDb25maWcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHByaXZhdGUgYW5pbWF0aW9uVHlwZTogc3RyaW5nLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogTnpTYWZlQW55XG4gICkge1xuICAgIHRoaXMud2F2ZURpc2FibGVkID0gdGhpcy5pc0NvbmZpZ0Rpc2FibGVkKCk7XG4gIH1cblxuICBpc0NvbmZpZ0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0eXBlb2YgdGhpcy5jb25maWcuZGlzYWJsZWQgPT09ICdib29sZWFuJykge1xuICAgICAgZGlzYWJsZWQgPSB0aGlzLmNvbmZpZy5kaXNhYmxlZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uVHlwZSA9PT0gJ05vb3BBbmltYXRpb25zJykge1xuICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZGlzYWJsZWQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy53YXZlUmVuZGVyZXIpIHtcbiAgICAgIHRoaXMud2F2ZVJlbmRlcmVyLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcldhdmVJZkVuYWJsZWQoKTtcbiAgfVxuXG4gIHJlbmRlcldhdmVJZkVuYWJsZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndhdmVEaXNhYmxlZCAmJiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy53YXZlUmVuZGVyZXIgPSBuZXcgTnpXYXZlUmVuZGVyZXIodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMubmdab25lLCB0aGlzLm56V2F2ZUV4dHJhTm9kZSwgdGhpcy5wbGF0Zm9ybUlkKTtcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlKCk6IHZvaWQge1xuICAgIHRoaXMud2F2ZURpc2FibGVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy53YXZlUmVuZGVyZXIpIHtcbiAgICAgIHRoaXMud2F2ZVJlbmRlcmVyLnJlbW92ZVRyaWdnZXJFdmVudCgpO1xuICAgICAgdGhpcy53YXZlUmVuZGVyZXIucmVtb3ZlU3R5bGVBbmRFeHRyYU5vZGUoKTtcbiAgICB9XG4gIH1cblxuICBlbmFibGUoKTogdm9pZCB7XG4gICAgLy8gY29uZmlnIHByaW9yaXR5XG4gICAgdGhpcy53YXZlRGlzYWJsZWQgPSB0aGlzLmlzQ29uZmlnRGlzYWJsZWQoKSB8fCBmYWxzZTtcbiAgICBpZiAodGhpcy53YXZlUmVuZGVyZXIpIHtcbiAgICAgIHRoaXMud2F2ZVJlbmRlcmVyLmJpbmRUcmlnZ2VyRXZlbnQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==