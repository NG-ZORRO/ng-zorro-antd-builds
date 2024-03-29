import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzTreeNodeNoopToggleDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeNodeNoopToggleDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzTreeNodeNoopToggleDirective, "nz-tree-node-toggle[nzTreeNodeNoopToggle], [nzTreeNodeNoopToggle]", never, {}, {}, never>;
}
export declare class NzTreeNodeToggleDirective<T> extends CdkTreeNodeToggle<T> {
    static ngAcceptInputType_recursive: BooleanInput;
    get recursive(): boolean;
    set recursive(value: boolean);
    get isExpanded(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeNodeToggleDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzTreeNodeToggleDirective<any>, "nz-tree-node-toggle:not([nzTreeNodeNoopToggle]), [nzTreeNodeToggle]", never, { "recursive": "nzTreeNodeToggleRecursive"; }, {}, never>;
}
export declare class NzTreeNodeToggleRotateIconDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeNodeToggleRotateIconDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzTreeNodeToggleRotateIconDirective, "[nz-icon][nzTreeNodeToggleRotateIcon]", never, {}, {}, never>;
}
export declare class NzTreeNodeToggleActiveIconDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeNodeToggleActiveIconDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzTreeNodeToggleActiveIconDirective, "[nz-icon][nzTreeNodeToggleActiveIcon]", never, {}, {}, never>;
}
