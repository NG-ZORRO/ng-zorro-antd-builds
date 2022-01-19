import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Pipe, NgModule } from '@angular/core';
import { sum, isNumberFinite, toDecimal, isNil } from 'ng-zorro-antd/core/util';
import * as i1 from '@angular/platform-browser';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzAggregatePipe {
    transform(value, method) {
        if (!Array.isArray(value)) {
            return value;
        }
        if (value.length === 0) {
            return undefined;
        }
        switch (method) {
            case 'sum':
                return sum(value);
            case 'avg':
                return sum(value) / value.length;
            case 'max':
                return Math.max(...value);
            case 'min':
                return Math.min(...value);
            default:
                throw Error(`Invalid Pipe Arguments: Aggregate pipe doesn't support this type`);
        }
    }
}
NzAggregatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAggregatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzAggregatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAggregatePipe, name: "nzAggregate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAggregatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzAggregate'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBytesPipe {
    transform(input, decimal = 0, from = 'B', to) {
        if (!(isNumberFinite(input) && isNumberFinite(decimal) && decimal % 1 === 0 && decimal >= 0)) {
            return input;
        }
        let bytes = input;
        let unit = from;
        while (unit !== 'B') {
            bytes *= 1024;
            unit = NzBytesPipe.formats[unit].prev;
        }
        if (to) {
            const format = NzBytesPipe.formats[to];
            const result = toDecimal(NzBytesPipe.calculateResult(format, bytes), decimal);
            return NzBytesPipe.formatResult(result, to);
        }
        for (const key in NzBytesPipe.formats) {
            if (NzBytesPipe.formats.hasOwnProperty(key)) {
                const format = NzBytesPipe.formats[key];
                if (bytes < format.max) {
                    const result = toDecimal(NzBytesPipe.calculateResult(format, bytes), decimal);
                    return NzBytesPipe.formatResult(result, key);
                }
            }
        }
    }
    static formatResult(result, unit) {
        return `${result} ${unit}`;
    }
    static calculateResult(format, bytes) {
        const prev = format.prev ? NzBytesPipe.formats[format.prev] : undefined;
        return prev ? bytes / prev.max : bytes;
    }
}
NzBytesPipe.formats = {
    B: { max: 1024 },
    kB: { max: Math.pow(1024, 2), prev: 'B' },
    KB: { max: Math.pow(1024, 2), prev: 'B' },
    MB: { max: Math.pow(1024, 3), prev: 'kB' },
    GB: { max: Math.pow(1024, 4), prev: 'MB' },
    TB: { max: Number.MAX_SAFE_INTEGER, prev: 'GB' }
};
NzBytesPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBytesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzBytesPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBytesPipe, name: "nzBytes" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBytesPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzBytes'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzToCssUnitPipe {
    transform(value, defaultUnit = 'px') {
        const absoluteLengthUnit = ['cm', 'mm', 'Q', 'in', 'pc', 'pt', 'px'];
        const relativeLengthUnit = ['em', 'ex', 'ch', 'rem', '1h', 'vw', 'vh', 'vmin', 'vmax'];
        const percentagesUnit = ['%'];
        const listOfUnit = [...absoluteLengthUnit, ...relativeLengthUnit, ...percentagesUnit];
        let unit = 'px';
        if (listOfUnit.some(u => u === defaultUnit)) {
            unit = defaultUnit;
        }
        return typeof value === 'number' ? `${value}${unit}` : `${value}`;
    }
}
NzToCssUnitPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToCssUnitPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzToCssUnitPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToCssUnitPipe, name: "nzToCssUnit" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToCssUnitPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzToCssUnit'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzEllipsisPipe {
    transform(value, length, suffix = '') {
        if (typeof value !== 'string') {
            return value;
        }
        const len = typeof length === 'undefined' ? value.length : length;
        if (value.length <= len) {
            return value;
        }
        return value.substring(0, len) + suffix;
    }
}
NzEllipsisPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzEllipsisPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzEllipsisPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzEllipsisPipe, name: "nzEllipsis" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzEllipsisPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzEllipsis'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSafeNullPipe {
    transform(value, replace = '') {
        if (isNil(value)) {
            return replace;
        }
        return value;
    }
}
NzSafeNullPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSafeNullPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzSafeNullPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSafeNullPipe, name: "nzSafeNull" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSafeNullPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzSafeNull'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSanitizerPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, type = 'html') {
        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Invalid safe type specified`);
        }
    }
}
NzSanitizerPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSanitizerPipe, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
NzSanitizerPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSanitizerPipe, name: "nzSanitizer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSanitizerPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzSanitizer'
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTrimPipe {
    // TODO(chensimeng) trimEnd, trimStart
    transform(text) {
        return text.trim();
    }
}
NzTrimPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrimPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzTrimPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrimPipe, name: "nzTrim" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrimPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzTrim'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const pipes = [
    NzToCssUnitPipe,
    NzSafeNullPipe,
    NzSanitizerPipe,
    NzTrimPipe,
    NzBytesPipe,
    NzAggregatePipe,
    NzEllipsisPipe
];
class NzPipesModule {
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

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzAggregatePipe, NzBytesPipe, NzEllipsisPipe, NzPipesModule, NzSafeNullPipe, NzSanitizerPipe, NzToCssUnitPipe, NzTrimPipe };
//# sourceMappingURL=ng-zorro-antd-pipes.mjs.map
