import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Pipe, NgModule } from '@angular/core';
import { timeUnits } from 'ng-zorro-antd/core/time';
import { padStart } from 'ng-zorro-antd/core/util';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTimeRangePipe {
    transform(value, format = 'HH:mm:ss') {
        let duration = Number(value || 0);
        return timeUnits.reduce((current, [name, unit]) => {
            if (current.indexOf(name) !== -1) {
                const v = Math.floor(duration / unit);
                duration -= v * unit;
                return current.replace(new RegExp(`${name}+`, 'g'), (match) => padStart(v.toString(), match.length, '0'));
            }
            return current;
        }, format);
    }
}
NzTimeRangePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimeRangePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzTimeRangePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimeRangePipe, name: "nzTimeRange" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimeRangePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzTimeRange',
                    pure: true
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzPipesModule {
}
NzPipesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzPipesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPipesModule, declarations: [NzTimeRangePipe], imports: [CommonModule], exports: [NzTimeRangePipe] });
NzPipesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPipesModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPipesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [NzTimeRangePipe],
                    declarations: [NzTimeRangePipe]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzPipesModule, NzTimeRangePipe };
//# sourceMappingURL=ng-zorro-antd-core-pipe.mjs.map
