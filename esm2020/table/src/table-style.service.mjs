/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class NzTableStyleService {
    constructor() {
        this.theadTemplate$ = new ReplaySubject(1);
        this.hasFixLeft$ = new ReplaySubject(1);
        this.hasFixRight$ = new ReplaySubject(1);
        this.hostWidth$ = new ReplaySubject(1);
        this.columnCount$ = new ReplaySubject(1);
        this.showEmpty$ = new ReplaySubject(1);
        this.noResult$ = new ReplaySubject(1);
        this.listOfThWidthConfigPx$ = new BehaviorSubject([]);
        this.tableWidthConfigPx$ = new BehaviorSubject([]);
        this.manualWidthConfigPx$ = combineLatest([this.tableWidthConfigPx$, this.listOfThWidthConfigPx$]).pipe(map(([widthConfig, listOfWidth]) => (widthConfig.length ? widthConfig : listOfWidth)));
        this.listOfAutoWidthPx$ = new ReplaySubject(1);
        this.listOfListOfThWidthPx$ = merge(
        /** init with manual width **/
        this.manualWidthConfigPx$, combineLatest([this.listOfAutoWidthPx$, this.manualWidthConfigPx$]).pipe(map(([autoWidth, manualWidth]) => {
            /** use autoWidth until column length match **/
            if (autoWidth.length === manualWidth.length) {
                return autoWidth.map((width, index) => {
                    if (width === '0px') {
                        return manualWidth[index] || null;
                    }
                    else {
                        return manualWidth[index] || width;
                    }
                });
            }
            else {
                return manualWidth;
            }
        })));
        this.listOfMeasureColumn$ = new ReplaySubject(1);
        this.listOfListOfThWidth$ = this.listOfAutoWidthPx$.pipe(map(list => list.map(width => parseInt(width, 10))));
        this.enableAutoMeasure$ = new ReplaySubject(1);
    }
    setTheadTemplate(template) {
        this.theadTemplate$.next(template);
    }
    setHasFixLeft(hasFixLeft) {
        this.hasFixLeft$.next(hasFixLeft);
    }
    setHasFixRight(hasFixRight) {
        this.hasFixRight$.next(hasFixRight);
    }
    setTableWidthConfig(widthConfig) {
        this.tableWidthConfigPx$.next(widthConfig);
    }
    setListOfTh(listOfTh) {
        let columnCount = 0;
        listOfTh.forEach(th => {
            columnCount += (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
        });
        const listOfThPx = listOfTh.map(item => item.nzWidth);
        this.columnCount$.next(columnCount);
        this.listOfThWidthConfigPx$.next(listOfThPx);
    }
    setListOfMeasureColumn(listOfTh) {
        const listOfKeys = [];
        listOfTh.forEach(th => {
            const length = (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
            for (let i = 0; i < length; i++) {
                listOfKeys.push(`measure_key_${i}`);
            }
        });
        this.listOfMeasureColumn$.next(listOfKeys);
    }
    setListOfAutoWidth(listOfAutoWidth) {
        this.listOfAutoWidthPx$.next(listOfAutoWidth.map(width => `${width}px`));
    }
    setShowEmpty(showEmpty) {
        this.showEmpty$.next(showEmpty);
    }
    setNoResult(noResult) {
        this.noResult$.next(noResult);
    }
    setScroll(scrollX, scrollY) {
        const enableAutoMeasure = !!(scrollX || scrollY);
        if (!enableAutoMeasure) {
            this.setListOfAutoWidth([]);
        }
        this.enableAutoMeasure$.next(enableAutoMeasure);
    }
}
NzTableStyleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableStyleService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NzTableStyleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableStyleService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableStyleService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvdGFibGUvc3JjL3RhYmxlLXN0eWxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFPckMsTUFBTSxPQUFPLG1CQUFtQjtJQStGOUI7UUE5RkEsbUJBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBeUIsQ0FBQyxDQUFDLENBQUM7UUFDOUQsZ0JBQVcsR0FBRyxJQUFJLGFBQWEsQ0FBVSxDQUFDLENBQUMsQ0FBQztRQUM1QyxpQkFBWSxHQUFHLElBQUksYUFBYSxDQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzdDLGVBQVUsR0FBRyxJQUFJLGFBQWEsQ0FBUyxDQUFDLENBQUMsQ0FBQztRQUMxQyxpQkFBWSxHQUFHLElBQUksYUFBYSxDQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzVDLGVBQVUsR0FBRyxJQUFJLGFBQWEsQ0FBVSxDQUFDLENBQUMsQ0FBQztRQUMzQyxjQUFTLEdBQUcsSUFBSSxhQUFhLENBQThDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLDJCQUFzQixHQUFHLElBQUksZUFBZSxDQUErQixFQUFFLENBQUMsQ0FBQztRQUMvRSx3QkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBK0IsRUFBRSxDQUFDLENBQUM7UUFDcEYseUJBQW9CLEdBQUcsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNoRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcs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QUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7O2dIQTdGVSxtQkFBbUI7b0hBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgbWVyZ2UsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgTnpUaE1lYXN1cmVEaXJlY3RpdmUgfSBmcm9tICcuL2NlbGwvdGgtbWVhc3VyZS5kaXJlY3RpdmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTnpUYWJsZVN0eWxlU2VydmljZSB7XG4gIHRoZWFkVGVtcGxhdGUkID0gbmV3IFJlcGxheVN1YmplY3Q8VGVtcGxhdGVSZWY8TnpTYWZlQW55Pj4oMSk7XG4gIGhhc0ZpeExlZnQkID0gbmV3IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4oMSk7XG4gIGhhc0ZpeFJpZ2h0JCA9IG5ldyBSZXBsYXlTdWJqZWN0PGJvb2xlYW4+KDEpO1xuICBob3N0V2lkdGgkID0gbmV3IFJlcGxheVN1YmplY3Q8bnVtYmVyPigxKTtcbiAgY29sdW1uQ291bnQkID0gbmV3IFJlcGxheVN1YmplY3Q8bnVtYmVyPigxKTtcbiAgc2hvd0VtcHR5JCA9IG5ldyBSZXBsYXlTdWJqZWN0PGJvb2xlYW4+KDEpO1xuICBub1Jlc3VsdCQgPSBuZXcgUmVwbGF5U3ViamVjdDxzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgdW5kZWZpbmVkPigxKTtcbiAgcHJpdmF0ZSBsaXN0T2ZUaFdpZHRoQ29uZmlnUHgkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSZWFkb25seUFycmF5PHN0cmluZyB8IG51bGw+PihbXSk7XG4gIHByaXZhdGUgdGFibGVXaWR0aENvbmZpZ1B4JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UmVhZG9ubHlBcnJheTxzdHJpbmcgfCBudWxsPj4oW10pO1xuICBtYW51YWxXaWR0aENvbmZpZ1B4JCA9IGNvbWJpbmVMYXRlc3QoW3RoaXMudGFibGVXaWR0aENvbmZpZ1B4JCwgdGhpcy5saXN0T2ZUaFdpZHRoQ29uZmlnUHgkXSkucGlwZShcbiAgICBtYXAoKFt3aWR0aENvbmZpZywgbGlzdE9mV2lkdGhdKSA9PiAod2lkdGhDb25maWcubGVuZ3RoID8gd2lkdGhDb25maWcgOiBsaXN0T2ZXaWR0aCkpXG4gICk7XG4gIHByaXZhdGUgbGlzdE9mQXV0b1dpZHRoUHgkID0gbmV3IFJlcGxheVN1YmplY3Q8cmVhZG9ubHkgc3RyaW5nW10+KDEpO1xuICBsaXN0T2ZMaXN0T2ZUaFdpZHRoUHgkID0gbWVyZ2UoXG4gICAgLyoqIGluaXQgd2l0aCBtYW51YWwgd2lkdGggKiovXG4gICAgdGhpcy5tYW51YWxXaWR0aENvbmZpZ1B4JCxcbiAgICBjb21iaW5lTGF0ZXN0KFt0aGlzLmxpc3RPZkF1dG9XaWR0aFB4JCwgdGhpcy5tYW51YWxXaWR0aENvbmZpZ1B4JF0pLnBpcGUoXG4gICAgICBtYXAoKFthdXRvV2lkdGgsIG1hbnVhbFdpZHRoXSkgPT4ge1xuICAgICAgICAvKiogdXNlIGF1dG9XaWR0aCB1bnRpbCBjb2x1bW4gbGVuZ3RoIG1hdGNoICoqL1xuICAgICAgICBpZiAoYXV0b1dpZHRoLmxlbmd0aCA9PT0gbWFudWFsV2lkdGgubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGF1dG9XaWR0aC5tYXAoKHdpZHRoLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpZHRoID09PSAnMHB4Jykge1xuICAgICAgICAgICAgICByZXR1cm4gbWFudWFsV2lkdGhbaW5kZXhdIHx8IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gbWFudWFsV2lkdGhbaW5kZXhdIHx8IHdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBtYW51YWxXaWR0aDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICk7XG4gIGxpc3RPZk1lYXN1cmVDb2x1bW4kID0gbmV3IFJlcGxheVN1YmplY3Q8cmVhZG9ubHkgc3RyaW5nW10+KDEpO1xuICBsaXN0T2ZMaXN0T2ZUaFdpZHRoJCA9IHRoaXMubGlzdE9mQXV0b1dpZHRoUHgkLnBpcGUobWFwKGxpc3QgPT4gbGlzdC5tYXAod2lkdGggPT4gcGFyc2VJbnQod2lkdGgsIDEwKSkpKTtcbiAgZW5hYmxlQXV0b01lYXN1cmUkID0gbmV3IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4oMSk7XG5cbiAgc2V0VGhlYWRUZW1wbGF0ZSh0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55Pik6IHZvaWQge1xuICAgIHRoaXMudGhlYWRUZW1wbGF0ZSQubmV4dCh0ZW1wbGF0ZSk7XG4gIH1cblxuICBzZXRIYXNGaXhMZWZ0KGhhc0ZpeExlZnQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmhhc0ZpeExlZnQkLm5leHQoaGFzRml4TGVmdCk7XG4gIH1cblxuICBzZXRIYXNGaXhSaWdodChoYXNGaXhSaWdodDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaGFzRml4UmlnaHQkLm5leHQoaGFzRml4UmlnaHQpO1xuICB9XG5cbiAgc2V0VGFibGVXaWR0aENvbmZpZyh3aWR0aENvbmZpZzogUmVhZG9ubHlBcnJheTxzdHJpbmcgfCBudWxsPik6IHZvaWQge1xuICAgIHRoaXMudGFibGVXaWR0aENvbmZpZ1B4JC5uZXh0KHdpZHRoQ29uZmlnKTtcbiAgfVxuXG4gIHNldExpc3RPZlRoKGxpc3RPZlRoOiByZWFkb25seSBOelRoTWVhc3VyZURpcmVjdGl2ZVtdKTogdm9pZCB7XG4gICAgbGV0IGNvbHVtbkNvdW50ID0gMDtcbiAgICBsaXN0T2ZUaC5mb3JFYWNoKHRoID0+IHtcbiAgICAgIGNvbHVtbkNvdW50ICs9ICh0aC5jb2xzcGFuICYmICt0aC5jb2xzcGFuKSB8fCAodGguY29sU3BhbiAmJiArdGguY29sU3BhbikgfHwgMTtcbiAgICB9KTtcbiAgICBjb25zdCBsaXN0T2ZUaFB4ID0gbGlzdE9mVGgubWFwKGl0ZW0gPT4gaXRlbS5ueldpZHRoKTtcbiAgICB0aGlzLmNvbHVtbkNvdW50JC5uZXh0KGNvbHVtbkNvdW50KTtcbiAgICB0aGlzLmxpc3RPZlRoV2lkdGhDb25maWdQeCQubmV4dChsaXN0T2ZUaFB4KTtcbiAgfVxuXG4gIHNldExpc3RPZk1lYXN1cmVDb2x1bW4obGlzdE9mVGg6IHJlYWRvbmx5IE56VGhNZWFzdXJlRGlyZWN0aXZlW10pOiB2b2lkIHtcbiAgICBjb25zdCBsaXN0T2ZLZXlzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxpc3RPZlRoLmZvckVhY2godGggPT4ge1xuICAgICAgY29uc3QgbGVuZ3RoID0gKHRoLmNvbHNwYW4gJiYgK3RoLmNvbHNwYW4pIHx8ICh0aC5jb2xTcGFuICYmICt0aC5jb2xTcGFuKSB8fCAxO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBsaXN0T2ZLZXlzLnB1c2goYG1lYXN1cmVfa2V5XyR7aX1gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmxpc3RPZk1lYXN1cmVDb2x1bW4kLm5leHQobGlzdE9mS2V5cyk7XG4gIH1cblxuICBzZXRMaXN0T2ZBdXRvV2lkdGgobGlzdE9mQXV0b1dpZHRoOiBudW1iZXJbXSk6IHZvaWQge1xuICAgIHRoaXMubGlzdE9mQXV0b1dpZHRoUHgkLm5leHQobGlzdE9mQXV0b1dpZHRoLm1hcCh3aWR0aCA9PiBgJHt3aWR0aH1weGApKTtcbiAgfVxuXG4gIHNldFNob3dFbXB0eShzaG93RW1wdHk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnNob3dFbXB0eSQubmV4dChzaG93RW1wdHkpO1xuICB9XG5cbiAgc2V0Tm9SZXN1bHQobm9SZXN1bHQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLm5vUmVzdWx0JC5uZXh0KG5vUmVzdWx0KTtcbiAgfVxuXG4gIHNldFNjcm9sbChzY3JvbGxYOiBzdHJpbmcgfCBudWxsLCBzY3JvbGxZOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgY29uc3QgZW5hYmxlQXV0b01lYXN1cmUgPSAhIShzY3JvbGxYIHx8IHNjcm9sbFkpO1xuICAgIGlmICghZW5hYmxlQXV0b01lYXN1cmUpIHtcbiAgICAgIHRoaXMuc2V0TGlzdE9mQXV0b1dpZHRoKFtdKTtcbiAgICB9XG4gICAgdGhpcy5lbmFibGVBdXRvTWVhc3VyZSQubmV4dChlbmFibGVBdXRvTWVhc3VyZSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHt9XG59XG4iXX0=