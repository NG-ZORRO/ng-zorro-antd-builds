import { Directive, Host, Input, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNotNil } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "./row.directive";
import * as i2 from "@angular/cdk/bidi";
export class NzColDirective {
    constructor(elementRef, nzRowDirective, renderer, directionality) {
        this.elementRef = elementRef;
        this.nzRowDirective = nzRowDirective;
        this.renderer = renderer;
        this.directionality = directionality;
        this.classMap = {};
        this.destroy$ = new Subject();
        this.hostFlexStyle = null;
        this.dir = 'ltr';
        this.nzFlex = null;
        this.nzSpan = null;
        this.nzOrder = null;
        this.nzOffset = null;
        this.nzPush = null;
        this.nzPull = null;
        this.nzXs = null;
        this.nzSm = null;
        this.nzMd = null;
        this.nzLg = null;
        this.nzXl = null;
        this.nzXXl = null;
    }
    setHostClassMap() {
        const hostClassMap = {
            ['ant-col']: true,
            [`ant-col-${this.nzSpan}`]: isNotNil(this.nzSpan),
            [`ant-col-order-${this.nzOrder}`]: isNotNil(this.nzOrder),
            [`ant-col-offset-${this.nzOffset}`]: isNotNil(this.nzOffset),
            [`ant-col-pull-${this.nzPull}`]: isNotNil(this.nzPull),
            [`ant-col-push-${this.nzPush}`]: isNotNil(this.nzPush),
            ['ant-col-rtl']: this.dir === 'rtl',
            ...this.generateClass()
        };
        for (const i in this.classMap) {
            if (this.classMap.hasOwnProperty(i)) {
                this.renderer.removeClass(this.elementRef.nativeElement, i);
            }
        }
        this.classMap = { ...hostClassMap };
        for (const i in this.classMap) {
            if (this.classMap.hasOwnProperty(i) && this.classMap[i]) {
                this.renderer.addClass(this.elementRef.nativeElement, i);
            }
        }
    }
    setHostFlexStyle() {
        this.hostFlexStyle = this.parseFlex(this.nzFlex);
    }
    parseFlex(flex) {
        if (typeof flex === 'number') {
            return `${flex} ${flex} auto`;
        }
        else if (typeof flex === 'string') {
            if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
                return `0 0 ${flex}`;
            }
        }
        return flex;
    }
    generateClass() {
        const listOfSizeInputName = ['nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl'];
        const listClassMap = {};
        listOfSizeInputName.forEach(name => {
            const sizeName = name.replace('nz', '').toLowerCase();
            if (isNotNil(this[name])) {
                if (typeof this[name] === 'number' || typeof this[name] === 'string') {
                    listClassMap[`ant-col-${sizeName}-${this[name]}`] = true;
                }
                else {
                    const embedded = this[name];
                    const prefixArray = ['span', 'pull', 'push', 'offset', 'order'];
                    prefixArray.forEach(prefix => {
                        const prefixClass = prefix === 'span' ? '-' : `-${prefix}-`;
                        listClassMap[`ant-col-${sizeName}${prefixClass}${embedded[prefix]}`] =
                            embedded && isNotNil(embedded[prefix]);
                    });
                }
            }
        });
        return listClassMap;
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.setHostClassMap();
        });
        this.setHostClassMap();
        this.setHostFlexStyle();
    }
    ngOnChanges(changes) {
        this.setHostClassMap();
        const { nzFlex } = changes;
        if (nzFlex) {
            this.setHostFlexStyle();
        }
    }
    ngAfterViewInit() {
        if (this.nzRowDirective) {
            this.nzRowDirective.actualGutter$
                .pipe(takeUntil(this.destroy$))
                .subscribe(([horizontalGutter, verticalGutter]) => {
                const renderGutter = (name, gutter) => {
                    const nativeElement = this.elementRef.nativeElement;
                    if (gutter !== null) {
                        this.renderer.setStyle(nativeElement, name, `${gutter / 2}px`);
                    }
                };
                renderGutter('padding-left', horizontalGutter);
                renderGutter('padding-right', horizontalGutter);
                renderGutter('padding-top', verticalGutter);
                renderGutter('padding-bottom', verticalGutter);
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzColDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzColDirective, deps: [{ token: i0.ElementRef }, { token: i1.NzRowDirective, host: true, optional: true }, { token: i0.Renderer2 }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzColDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: { nzFlex: "nzFlex", nzSpan: "nzSpan", nzOrder: "nzOrder", nzOffset: "nzOffset", nzPush: "nzPush", nzPull: "nzPull", nzXs: "nzXs", nzSm: "nzSm", nzMd: "nzMd", nzLg: "nzLg", nzXl: "nzXl", nzXXl: "nzXXl" }, host: { properties: { "style.flex": "hostFlexStyle" } }, exportAs: ["nzCol"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzColDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-col],nz-col,nz-form-control,nz-form-label',
                    exportAs: 'nzCol',
                    host: {
                        '[style.flex]': 'hostFlexStyle'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NzRowDirective, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }, { type: i0.Renderer2 }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzFlex: [{
                type: Input
            }], nzSpan: [{
                type: Input
            }], nzOrder: [{
                type: Input
            }], nzOffset: [{
                type: Input
            }], nzPush: [{
                type: Input
            }], nzPull: [{
                type: Input
            }], nzXs: [{
                type: Input
            }], nzSm: [{
                type: Input
            }], nzMd: [{
                type: Input
            }], nzLg: [{
                type: Input
            }], nzXl: [{
                type: Input
            }], nzXXl: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9jb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFFTCxTQUFTLEVBRVQsSUFBSSxFQUNKLEtBQUssRUFJTCxRQUFRLEVBR1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBbUJuRCxNQUFNLE9BQU8sY0FBYztJQStFekIsWUFDVSxVQUFzQixFQUNILGNBQThCLEVBQ2xELFFBQW1CLEVBQ04sY0FBOEI7UUFIMUMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNILG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ04sbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbEY1QyxhQUFRLEdBQStCLEVBQUUsQ0FBQztRQUMxQyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxrQkFBYSxHQUFrQixJQUFJLENBQUM7UUFDcEMsUUFBRyxHQUFjLEtBQUssQ0FBQztRQUNkLFdBQU0sR0FBMkIsSUFBSSxDQUFDO1FBQ3RDLFdBQU0sR0FBMkIsSUFBSSxDQUFDO1FBQ3RDLFlBQU8sR0FBMkIsSUFBSSxDQUFDO1FBQ3ZDLGFBQVEsR0FBMkIsSUFBSSxDQUFDO1FBQ3hDLFdBQU0sR0FBMkIsSUFBSSxDQUFDO1FBQ3RDLFdBQU0sR0FBMkIsSUFBSSxDQUFDO1FBQ3RDLFNBQUksR0FBOEMsSUFBSSxDQUFDO1FBQ3ZELFNBQUksR0FBOEMsSUFBSSxDQUFDO1FBQ3ZELFNBQUksR0FBOEMsSUFBSSxDQUFDO1FBQ3ZELFNBQUksR0FBOEMsSUFBSSxDQUFD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SUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzsyR0EvSFUsY0FBYzsrRkFBZCxjQUFjOzJGQUFkLGNBQWM7a0JBUDFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLCtDQUErQztvQkFDekQsUUFBUSxFQUFFLE9BQU87b0JBQ2pCLElBQUksRUFBRTt3QkFDSixjQUFjLEVBQUUsZUFBZTtxQkFDaEM7aUJBQ0Y7OzBCQWtGSSxRQUFROzswQkFBSSxJQUFJOzswQkFFaEIsUUFBUTs0Q0E5RUYsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5nQ2xhc3NJbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56Um93RGlyZWN0aXZlIH0gZnJvbSAnLi9yb3cuZGlyZWN0aXZlJztcblxuZXhwb3J0IGludGVyZmFjZSBFbWJlZGRlZFByb3BlcnR5IHtcbiAgc3Bhbj86IG51bWJlcjtcbiAgcHVsbD86IG51bWJlcjtcbiAgcHVzaD86IG51bWJlcjtcbiAgb2Zmc2V0PzogbnVtYmVyO1xuICBvcmRlcj86IG51bWJlcjtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256LWNvbF0sbnotY29sLG56LWZvcm0tY29udHJvbCxuei1mb3JtLWxhYmVsJyxcbiAgZXhwb3J0QXM6ICduekNvbCcsXG4gIGhvc3Q6IHtcbiAgICAnW3N0eWxlLmZsZXhdJzogJ2hvc3RGbGV4U3R5bGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpDb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBjbGFzc01hcDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIGhvc3RGbGV4U3R5bGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuICBASW5wdXQoKSBuekZsZXg6IHN0cmluZyB8IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelNwYW46IHN0cmluZyB8IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuek9yZGVyOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpPZmZzZXQ6IHN0cmluZyB8IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelB1c2g6IHN0cmluZyB8IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelB1bGw6IHN0cmluZyB8IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelhzOiBzdHJpbmcgfCBudW1iZXIgfCBFbWJlZGRlZFByb3BlcnR5IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56U206IHN0cmluZyB8IG51bWJlciB8IEVtYmVkZGVkUHJvcGVydHkgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpNZDogc3RyaW5nIHwgbnVtYmVyIHwgRW1iZWRkZWRQcm9wZXJ0eSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekxnOiBzdHJpbmcgfCBudW1iZXIgfCBFbWJlZGRlZFByb3BlcnR5IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56WGw6IHN0cmluZyB8IG51bWJlciB8IEVtYmVkZGVkUHJvcGVydHkgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpYWGw6IHN0cmluZyB8IG51bWJlciB8IEVtYmVkZGVkUHJvcGVydHkgfCBudWxsID0gbnVsbDtcblxuICBzZXRIb3N0Q2xhc3NNYXAoKTogdm9pZCB7XG4gICAgY29uc3QgaG9zdENsYXNzTWFwID0ge1xuICAgICAgWydhbnQtY29sJ106IHRydWUsXG4gICAgICBbYGFudC1jb2wtJHt0aGlzLm56U3Bhbn1gXTogaXNOb3ROaWwodGhpcy5uelNwYW4pLFxuICAgICAgW2BhbnQtY29sLW9yZGVyLSR7dGhpcy5uek9yZGVyfWBdOiBpc05vdE5pbCh0aGlzLm56T3JkZXIpLFxuICAgICAgW2BhbnQtY29sLW9mZnNldC0ke3RoaXMubnpPZmZzZXR9YF06IGlzTm90TmlsKHRoaXMubnpPZmZzZXQpLFxuICAgICAgW2BhbnQtY29sLXB1bGwtJHt0aGlzLm56UHVsbH1gXTogaXNOb3ROaWwodGhpcy5uelB1bGwpLFxuICAgICAgW2BhbnQtY29sLXB1c2gtJHt0aGlzLm56UHVzaH1gXTogaXNOb3ROaWwodGhpcy5uelB1c2gpLFxuICAgICAgWydhbnQtY29sLXJ0bCddOiB0aGlzLmRpciA9PT0gJ3J0bCcsXG4gICAgICAuLi50aGlzLmdlbmVyYXRlQ2xhc3MoKVxuICAgIH07XG4gICAgZm9yIChjb25zdCBpIGluIHRoaXMuY2xhc3NNYXApIHtcbiAgICAgIGlmICh0aGlzLmNsYXNzTWFwLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGkpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNsYXNzTWFwID0geyAuLi5ob3N0Q2xhc3NNYXAgfTtcbiAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5jbGFzc01hcCkge1xuICAgICAgaWYgKHRoaXMuY2xhc3NNYXAuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5jbGFzc01hcFtpXSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRIb3N0RmxleFN0eWxlKCk6IHZvaWQge1xuICAgIHRoaXMuaG9zdEZsZXhTdHlsZSA9IHRoaXMucGFyc2VGbGV4KHRoaXMubnpGbGV4KTtcbiAgfVxuXG4gIHBhcnNlRmxleChmbGV4OiBudW1iZXIgfCBzdHJpbmcgfCBudWxsKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKHR5cGVvZiBmbGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIGAke2ZsZXh9ICR7ZmxleH0gYXV0b2A7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmxleCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICgvXlxcZCsoXFwuXFxkKyk/KHB4fGVtfHJlbXwlKSQvLnRlc3QoZmxleCkpIHtcbiAgICAgICAgcmV0dXJuIGAwIDAgJHtmbGV4fWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmbGV4O1xuICB9XG5cbiAgZ2VuZXJhdGVDbGFzcygpOiBvYmplY3Qge1xuICAgIGNvbnN0IGxpc3RPZlNpemVJbnB1dE5hbWU6IEFycmF5PGtleW9mIE56Q29sRGlyZWN0aXZlPiA9IFsnbnpYcycsICduelNtJywgJ256TWQnLCAnbnpMZycsICduelhsJywgJ256WFhsJ107XG4gICAgY29uc3QgbGlzdENsYXNzTWFwOiBOZ0NsYXNzSW50ZXJmYWNlID0ge307XG4gICAgbGlzdE9mU2l6ZUlucHV0TmFtZS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgY29uc3Qgc2l6ZU5hbWUgPSBuYW1lLnJlcGxhY2UoJ256JywgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoaXNOb3ROaWwodGhpc1tuYW1lXSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzW25hbWVdID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdGhpc1tuYW1lXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBsaXN0Q2xhc3NNYXBbYGFudC1jb2wtJHtzaXplTmFtZX0tJHt0aGlzW25hbWVdfWBdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBlbWJlZGRlZCA9IHRoaXNbbmFtZV0gYXMgRW1iZWRkZWRQcm9wZXJ0eTtcbiAgICAgICAgICBjb25zdCBwcmVmaXhBcnJheTogQXJyYXk8a2V5b2YgRW1iZWRkZWRQcm9wZXJ0eT4gPSBbJ3NwYW4nLCAncHVsbCcsICdwdXNoJywgJ29mZnNldCcsICdvcmRlciddO1xuICAgICAgICAgIHByZWZpeEFycmF5LmZvckVhY2gocHJlZml4ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByZWZpeENsYXNzID0gcHJlZml4ID09PSAnc3BhbicgPyAnLScgOiBgLSR7cHJlZml4fS1gO1xuICAgICAgICAgICAgbGlzdENsYXNzTWFwW2BhbnQtY29sLSR7c2l6ZU5hbWV9JHtwcmVmaXhDbGFzc30ke2VtYmVkZGVkW3ByZWZpeF19YF0gPVxuICAgICAgICAgICAgICBlbWJlZGRlZCAmJiBpc05vdE5pbChlbWJlZGRlZFtwcmVmaXhdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBsaXN0Q2xhc3NNYXA7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwdWJsaWMgbnpSb3dEaXJlY3RpdmU6IE56Um93RGlyZWN0aXZlLFxuICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5zZXRIb3N0Q2xhc3NNYXAoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0SG9zdENsYXNzTWFwKCk7XG4gICAgdGhpcy5zZXRIb3N0RmxleFN0eWxlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5zZXRIb3N0Q2xhc3NNYXAoKTtcbiAgICBjb25zdCB7IG56RmxleCB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpGbGV4KSB7XG4gICAgICB0aGlzLnNldEhvc3RGbGV4U3R5bGUoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpSb3dEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMubnpSb3dEaXJlY3RpdmUuYWN0dWFsR3V0dGVyJFxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKFtob3Jpem9udGFsR3V0dGVyLCB2ZXJ0aWNhbEd1dHRlcl0pID0+IHtcbiAgICAgICAgICBjb25zdCByZW5kZXJHdXR0ZXIgPSAobmFtZTogc3RyaW5nLCBndXR0ZXI6IG51bWJlciB8IG51bGwpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChndXR0ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbGVtZW50LCBuYW1lLCBgJHtndXR0ZXIgLyAyfXB4YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZW5kZXJHdXR0ZXIoJ3BhZGRpbmctbGVmdCcsIGhvcml6b250YWxHdXR0ZXIpO1xuICAgICAgICAgIHJlbmRlckd1dHRlcigncGFkZGluZy1yaWdodCcsIGhvcml6b250YWxHdXR0ZXIpO1xuICAgICAgICAgIHJlbmRlckd1dHRlcigncGFkZGluZy10b3AnLCB2ZXJ0aWNhbEd1dHRlcik7XG4gICAgICAgICAgcmVuZGVyR3V0dGVyKCdwYWRkaW5nLWJvdHRvbScsIHZlcnRpY2FsR3V0dGVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=