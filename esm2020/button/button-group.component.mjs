import { ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
export class NzButtonGroupComponent {
    constructor(directionality) {
        this.directionality = directionality;
        this.nzSize = 'default';
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzButtonGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonGroupComponent, deps: [{ token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzButtonGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzButtonGroupComponent, selector: "nz-button-group", inputs: { nzSize: "nzSize" }, host: { properties: { "class.ant-btn-group-lg": "nzSize === 'large'", "class.ant-btn-group-sm": "nzSize === 'small'", "class.ant-btn-group-rtl": "dir === 'rtl'" }, classAttribute: "ant-btn-group" }, exportAs: ["nzButtonGroup"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-button-group',
                    exportAs: 'nzButtonGroup',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-btn-group',
                        '[class.ant-btn-group-lg]': `nzSize === 'large'`,
                        '[class.ant-btn-group-sm]': `nzSize === 'small'`,
                        '[class.ant-btn-group-rtl]': `dir === 'rtl'`
                    },
                    preserveWhitespaces: false,
                    template: ` <ng-content></ng-content> `
                }]
        }], ctorParameters: function () { return [{ type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzSize: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbi1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUdMLFFBQVEsRUFDUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQWtCM0MsTUFBTSxPQUFPLHNCQUFzQjtJQU9qQyxZQUFnQyxjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFOckQsV0FBTSxHQUFzQixTQUFTLENBQUM7UUFFL0MsUUFBRyxHQUFjLEtBQUssQ0FBQztRQUVmLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBRTBCLENBQUM7SUFDbEUsUUFBUTtRQUNOLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUU7WUFDNUYsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzttSEFsQlUsc0JBQXNCO3VHQUF0QixzQkFBc0IseVRBRnZCLDZCQUE2QjsyRkFFNUIsc0JBQXNCO2tCQWRsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxlQUFlO29CQUN6QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsZUFBZTt3QkFDdEIsMEJBQTBCLEVBQUUsb0JBQW9CO3dCQUNoRCwwQkFBMEIsRUFBRSxvQkFBb0I7d0JBQ2hELDJCQUEyQixFQUFFLGVBQWU7cUJBQzdDO29CQUNELG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLFFBQVEsRUFBRSw2QkFBNkI7aUJBQ3hDOzswQkFRYyxRQUFROzRDQU5aLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IHR5cGUgTnpCdXR0b25Hcm91cFNpemUgPSAnbGFyZ2UnIHwgJ2RlZmF1bHQnIHwgJ3NtYWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYnV0dG9uLWdyb3VwJyxcbiAgZXhwb3J0QXM6ICduekJ1dHRvbkdyb3VwJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1idG4tZ3JvdXAnLFxuICAgICdbY2xhc3MuYW50LWJ0bi1ncm91cC1sZ10nOiBgbnpTaXplID09PSAnbGFyZ2UnYCxcbiAgICAnW2NsYXNzLmFudC1idG4tZ3JvdXAtc21dJzogYG56U2l6ZSA9PT0gJ3NtYWxsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtYnRuLWdyb3VwLXJ0bF0nOiBgZGlyID09PSAncnRsJ2BcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYFxufSlcbmV4cG9ydCBjbGFzcyBOekJ1dHRvbkdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBASW5wdXQoKSBuelNpemU6IE56QnV0dG9uR3JvdXBTaXplID0gJ2RlZmF1bHQnO1xuXG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHkpIHt9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=