/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAggregatePipe } from './nz-aggregate.pipe';
import { NzBytesPipe } from './nz-bytes.pipe';
import { NzToCssUnitPipe } from './nz-css-unit.pipe';
import { NzEllipsisPipe } from './nz-ellipsis.pipe';
import { NzSafeNullPipe } from './nz-safe-null.pipe';
import { NzSanitizerPipe } from './nz-sanitizer.pipe';
import { NzTrimPipe } from './nz-trim.pipe';
import * as i0 from "@angular/core";
const pipes = [
    NzToCssUnitPipe,
    NzSafeNullPipe,
    NzSanitizerPipe,
    NzTrimPipe,
    NzBytesPipe,
    NzAggregatePipe,
    NzEllipsisPipe
];
export class NzPipesModule {
}
NzPipesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzPipesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPipesModule, declarations: [NzToCssUnitPipe,
        NzSafeNullPipe,
        NzSanitizerPipe,
        NzTrimPipe,
        NzBytesPipe,
        NzAggregatePipe,
        NzEllipsisPipe], imports: [CommonModule], exports: [NzToCssUnitPipe,
        NzSafeNullPipe,
        NzSanitizerPipe,
        NzTrimPipe,
        NzBytesPipe,
        NzAggregatePipe,
        NzEllipsisPipe] });
NzPipesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPipesModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPipesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [pipes],
                    declarations: [pipes]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotcGlwZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9waXBlcy9uei1waXBlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUU1QyxNQUFNLEtBQUssR0FBRztJQUNaLGVBQWU7SUFDZixjQUFjO0lBQ2QsZUFBZTtJQUNmLFVBQVU7SUFDVixXQUFXO0lBQ1gsZUFBZTtJQUNmLGNBQWM7Q0FDZixDQUFDO0FBT0YsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxpQkFkeEIsZUFBZTtRQUNmLGNBQWM7UUFDZCxlQUFlO1FBQ2YsVUFBVTtRQUNWLFdBQVc7UUFDWCxlQUFlO1FBQ2YsY0FBYyxhQUlKLFlBQVksYUFWdEIsZUFBZTtRQUNmLGNBQWM7UUFDZCxlQUFlO1FBQ2YsVUFBVTtRQUNWLFdBQVc7UUFDWCxlQUFlO1FBQ2YsY0FBYzsyR0FRSCxhQUFhLFlBSmYsQ0FBQyxZQUFZLENBQUM7MkZBSVosYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQztvQkFDaEIsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDO2lCQUN0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekFnZ3JlZ2F0ZVBpcGUgfSBmcm9tICcuL256LWFnZ3JlZ2F0ZS5waXBlJztcbmltcG9ydCB7IE56Qnl0ZXNQaXBlIH0gZnJvbSAnLi9uei1ieXRlcy5waXBlJztcbmltcG9ydCB7IE56VG9Dc3NVbml0UGlwZSB9IGZyb20gJy4vbnotY3NzLXVuaXQucGlwZSc7XG5pbXBvcnQgeyBOekVsbGlwc2lzUGlwZSB9IGZyb20gJy4vbnotZWxsaXBzaXMucGlwZSc7XG5pbXBvcnQgeyBOelNhZmVOdWxsUGlwZSB9IGZyb20gJy4vbnotc2FmZS1udWxsLnBpcGUnO1xuaW1wb3J0IHsgTnpTYW5pdGl6ZXJQaXBlIH0gZnJvbSAnLi9uei1zYW5pdGl6ZXIucGlwZSc7XG5pbXBvcnQgeyBOelRyaW1QaXBlIH0gZnJvbSAnLi9uei10cmltLnBpcGUnO1xuXG5jb25zdCBwaXBlcyA9IFtcbiAgTnpUb0Nzc1VuaXRQaXBlLFxuICBOelNhZmVOdWxsUGlwZSxcbiAgTnpTYW5pdGl6ZXJQaXBlLFxuICBOelRyaW1QaXBlLFxuICBOekJ5dGVzUGlwZSxcbiAgTnpBZ2dyZWdhdGVQaXBlLFxuICBOekVsbGlwc2lzUGlwZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtwaXBlc10sXG4gIGRlY2xhcmF0aW9uczogW3BpcGVzXVxufSlcbmV4cG9ydCBjbGFzcyBOelBpcGVzTW9kdWxlIHt9XG4iXX0=