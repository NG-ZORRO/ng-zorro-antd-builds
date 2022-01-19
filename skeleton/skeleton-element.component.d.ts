/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, SimpleChanges } from '@angular/core';
import { NzSkeletonAvatarShape, NzSkeletonAvatarSize, NzSkeletonButtonShape, NzSkeletonButtonSize, NzSkeletonInputSize } from './skeleton.type';
import * as i0 from "@angular/core";
export declare class NzSkeletonElementDirective {
    nzActive: boolean;
    nzType: 'button' | 'input' | 'avatar' | 'image';
    nzBlock: boolean;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSkeletonElementDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzSkeletonElementDirective, "nz-skeleton-element", never, { "nzActive": "nzActive"; "nzType": "nzType"; "nzBlock": "nzBlock"; }, {}, never>;
}
export declare class NzSkeletonElementButtonComponent {
    nzShape: NzSkeletonButtonShape;
    nzSize: NzSkeletonButtonSize;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSkeletonElementButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSkeletonElementButtonComponent, "nz-skeleton-element[nzType=\"button\"]", never, { "nzShape": "nzShape"; "nzSize": "nzSize"; }, {}, never, never>;
}
export declare class NzSkeletonElementAvatarComponent implements OnChanges {
    nzShape: NzSkeletonAvatarShape;
    nzSize: NzSkeletonAvatarSize;
    styleMap: {};
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSkeletonElementAvatarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSkeletonElementAvatarComponent, "nz-skeleton-element[nzType=\"avatar\"]", never, { "nzShape": "nzShape"; "nzSize": "nzSize"; }, {}, never, never>;
}
export declare class NzSkeletonElementInputComponent {
    nzSize: NzSkeletonInputSize;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSkeletonElementInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSkeletonElementInputComponent, "nz-skeleton-element[nzType=\"input\"]", never, { "nzSize": "nzSize"; }, {}, never, never>;
}
export declare class NzSkeletonElementImageComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSkeletonElementImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSkeletonElementImageComponent, "nz-skeleton-element[nzType=\"image\"]", never, {}, {}, never, never>;
}
