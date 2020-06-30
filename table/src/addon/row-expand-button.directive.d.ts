/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter } from '@angular/core';
export declare class NzRowExpandButtonDirective {
    expand: boolean;
    spaceMode: boolean;
    readonly expandChange: EventEmitter<any>;
    onHostClick(): void;
}
