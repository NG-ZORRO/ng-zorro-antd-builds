/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ContentChild, Input, isDevMode } from '@angular/core';
import { EMPTY, merge, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { isNotNil } from 'ng-zorro-antd/core/util';
import { NzInputDirective } from './input.directive';
import * as i0 from "@angular/core";
export class NzTextareaCountComponent {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.nzMaxCharacterCount = 0;
        this.nzComputeCharacterCount = v => v.length;
        this.nzFormatter = (c, m) => `${c}${m > 0 ? `/${m}` : ``}`;
        this.configChange$ = new Subject();
        this.destroy$ = new Subject();
    }
    ngAfterContentInit() {
        if (!this.nzInputDirective && isDevMode()) {
            throw new Error('[nz-textarea-count]: Could not find matching textarea[nz-input] child.');
        }
        if (this.nzInputDirective.ngControl) {
            const valueChanges = this.nzInputDirective.ngControl.valueChanges || EMPTY;
            merge(valueChanges, this.configChange$)
                .pipe(takeUntil(this.destroy$), map(() => this.nzInputDirective.ngControl.value), startWith(this.nzInputDirective.ngControl.value))
                .subscribe(value => {
                this.setDataCount(value);
            });
        }
    }
    setDataCount(value) {
        const inputValue = isNotNil(value) ? String(value) : '';
        const currentCount = this.nzComputeCharacterCount(inputValue);
        const dataCount = this.nzFormatter(currentCount, this.nzMaxCharacterCount);
        this.renderer.setAttribute(this.elementRef.nativeElement, 'data-count', dataCount);
    }
    ngOnDestroy() {
        this.configChange$.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTextareaCountComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTextareaCountComponent, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NzTextareaCountComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTextareaCountComponent, selector: "nz-textarea-count", inputs: { nzMaxCharacterCount: "nzMaxCharacterCount", nzComputeCharacterCount: "nzComputeCharacterCount", nzFormatter: "nzFormatter" }, host: { classAttribute: "ant-input-textarea-show-count" }, queries: [{ propertyName: "nzInputDirective", first: true, predicate: NzInputDirective, descendants: true, static: true }], ngImport: i0, template: ` <ng-content select="textarea[nz-input]"></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTextareaCountComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-textarea-count',
                    template: ` <ng-content select="textarea[nz-input]"></ng-content> `,
                    host: {
                        class: 'ant-input-textarea-show-count'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzInputDirective: [{
                type: ContentChild,
                args: [NzInputDirective, { static: true }]
            }], nzMaxCharacterCount: [{
                type: Input
            }], nzComputeCharacterCount: [{
                type: Input
            }], nzFormatter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEtY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9pbnB1dC90ZXh0YXJlYS1jb3VudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUVaLEtBQUssRUFDTCxTQUFTLEVBR1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFVckQsTUFBTSxPQUFPLHdCQUF3QjtJQVNuQyxZQUFvQixRQUFtQixFQUFVLFVBQW1DO1FBQWhFLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQVAzRSx3QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFDaEMsNEJBQXVCLEdBQTBCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMvRCxnQkFBVyxHQUF5QyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBRTdGLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM5QixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUVzRCxDQUFDO0lBRXhGLGtCQUFrQjtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0VBQXdFLENBQUMsQ0FBQztTQUMzRjtRQUVELElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtZQUNuQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUM7WUFDM0UsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDO2lCQUNwQyxJQUFJLENBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDeEIsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQ2hELFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQWUsQ0FBQyxDQUMzRDtpQkFDQSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFRCxZQUFZLENBQUMsS0FBYTtRQUN4QixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3hELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOztxSEF6Q1Usd0JBQXdCO3lHQUF4Qix3QkFBd0IsMFNBQ3JCLGdCQUFnQiw4REFQcEIseURBQXlEOzJGQU14RCx3QkFBd0I7a0JBUnBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLHlEQUF5RDtvQkFDbkUsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSwrQkFBK0I7cUJBQ3ZDO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDt5SEFFbUQsZ0JBQWdCO3NCQUFqRSxZQUFZO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDdkMsbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgaXNEZXZNb2RlLFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVNUFRZLCBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGgsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56SW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL2lucHV0LmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRleHRhcmVhLWNvdW50JyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQgc2VsZWN0PVwidGV4dGFyZWFbbnotaW5wdXRdXCI+PC9uZy1jb250ZW50PiBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtaW5wdXQtdGV4dGFyZWEtc2hvdy1jb3VudCdcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTnpUZXh0YXJlYUNvdW50Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZChOeklucHV0RGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBueklucHV0RGlyZWN0aXZlITogTnpJbnB1dERpcmVjdGl2ZTtcbiAgQElucHV0KCkgbnpNYXhDaGFyYWN0ZXJDb3VudDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgbnpDb21wdXRlQ2hhcmFjdGVyQ291bnQ6ICh2OiBzdHJpbmcpID0+IG51bWJlciA9IHYgPT4gdi5sZW5ndGg7XG4gIEBJbnB1dCgpIG56Rm9ybWF0dGVyOiAoY3VyOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBzdHJpbmcgPSAoYywgbSkgPT4gYCR7Y30ke20gPiAwID8gYC8ke219YCA6IGBgfWA7XG5cbiAgcHJpdmF0ZSBjb25maWdDaGFuZ2UkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpJbnB1dERpcmVjdGl2ZSAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbbnotdGV4dGFyZWEtY291bnRdOiBDb3VsZCBub3QgZmluZCBtYXRjaGluZyB0ZXh0YXJlYVtuei1pbnB1dF0gY2hpbGQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubnpJbnB1dERpcmVjdGl2ZS5uZ0NvbnRyb2wpIHtcbiAgICAgIGNvbnN0IHZhbHVlQ2hhbmdlcyA9IHRoaXMubnpJbnB1dERpcmVjdGl2ZS5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzIHx8IEVNUFRZO1xuICAgICAgbWVyZ2UodmFsdWVDaGFuZ2VzLCB0aGlzLmNvbmZpZ0NoYW5nZSQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgICBtYXAoKCkgPT4gdGhpcy5ueklucHV0RGlyZWN0aXZlLm5nQ29udHJvbC52YWx1ZSksXG4gICAgICAgICAgc3RhcnRXaXRoKHRoaXMubnpJbnB1dERpcmVjdGl2ZS5uZ0NvbnRyb2wudmFsdWUgYXMgc3RyaW5nKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YUNvdW50KHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0RGF0YUNvdW50KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dFZhbHVlID0gaXNOb3ROaWwodmFsdWUpID8gU3RyaW5nKHZhbHVlKSA6ICcnO1xuICAgIGNvbnN0IGN1cnJlbnRDb3VudCA9IHRoaXMubnpDb21wdXRlQ2hhcmFjdGVyQ291bnQoaW5wdXRWYWx1ZSk7XG4gICAgY29uc3QgZGF0YUNvdW50ID0gdGhpcy5uekZvcm1hdHRlcihjdXJyZW50Q291bnQsIHRoaXMubnpNYXhDaGFyYWN0ZXJDb3VudCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWNvdW50JywgZGF0YUNvdW50KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnQ2hhbmdlJC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19