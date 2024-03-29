/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class NzTreeNodeNoopToggleDirective {
}
NzTreeNodeNoopToggleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeNoopToggleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeNoopToggleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeNoopToggleDirective, selector: "nz-tree-node-toggle[nzTreeNodeNoopToggle], [nzTreeNodeNoopToggle]", host: { classAttribute: "ant-tree-switcher ant-tree-switcher-noop" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeNoopToggleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-tree-node-toggle[nzTreeNodeNoopToggle], [nzTreeNodeNoopToggle]',
                    host: {
                        class: 'ant-tree-switcher ant-tree-switcher-noop'
                    }
                }]
        }] });
export class NzTreeNodeToggleDirective extends CdkTreeNodeToggle {
    get recursive() {
        return this._recursive;
    }
    set recursive(value) {
        this._recursive = coerceBooleanProperty(value);
    }
    get isExpanded() {
        return this._treeNode.isExpanded;
    }
}
NzTreeNodeToggleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeToggleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeToggleDirective, selector: "nz-tree-node-toggle:not([nzTreeNodeNoopToggle]), [nzTreeNodeToggle]", inputs: { recursive: ["nzTreeNodeToggleRecursive", "recursive"] }, host: { properties: { "class.ant-tree-switcher_open": "isExpanded", "class.ant-tree-switcher_close": "!isExpanded" }, classAttribute: "ant-tree-switcher" }, providers: [{ provide: CdkTreeNodeToggle, useExisting: NzTreeNodeToggleDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-tree-node-toggle:not([nzTreeNodeNoopToggle]), [nzTreeNodeToggle]',
                    providers: [{ provide: CdkTreeNodeToggle, useExisting: NzTreeNodeToggleDirective }],
                    host: {
                        class: 'ant-tree-switcher',
                        '[class.ant-tree-switcher_open]': 'isExpanded',
                        '[class.ant-tree-switcher_close]': '!isExpanded'
                    }
                }]
        }], propDecorators: { recursive: [{
                type: Input,
                args: ['nzTreeNodeToggleRecursive']
            }] } });
export class NzTreeNodeToggleRotateIconDirective {
}
NzTreeNodeToggleRotateIconDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleRotateIconDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeToggleRotateIconDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeToggleRotateIconDirective, selector: "[nz-icon][nzTreeNodeToggleRotateIcon]", host: { classAttribute: "ant-tree-switcher-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleRotateIconDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-icon][nzTreeNodeToggleRotateIcon]',
                    host: {
                        class: 'ant-tree-switcher-icon'
                    }
                }]
        }] });
export class NzTreeNodeToggleActiveIconDirective {
}
NzTreeNodeToggleActiveIconDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleActiveIconDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeToggleActiveIconDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeToggleActiveIconDirective, selector: "[nz-icon][nzTreeNodeToggleActiveIcon]", host: { classAttribute: "ant-tree-switcher-loading-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeToggleActiveIconDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-icon][nzTreeNodeToggleActiveIcon]',
                    host: {
                        class: 'ant-tree-switcher-loading-icon'
                    }
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVVqRCxNQUFNLE9BQU8sNkJBQTZCOzswSEFBN0IsNkJBQTZCOzhHQUE3Qiw2QkFBNkI7MkZBQTdCLDZCQUE2QjtrQkFOekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUVBQW1FO29CQUM3RSxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLDBDQUEwQztxQkFDbEQ7aUJBQ0Y7O0FBWUQsTUFBTSxPQUFPLHlCQUE2QixTQUFRLGlCQUFvQjtJQUdwRSxJQUNhLFNBQVM7UUFDcEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFhLFNBQVMsQ0FBQyxLQUFjO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDbkMsQ0FBQzs7c0hBYlUseUJBQXlCOzBHQUF6Qix5QkFBeUIsOFRBUHpCLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLHlCQUF5QixFQUFFLENBQUM7MkZBT3hFLHlCQUF5QjtrQkFUckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUVBQXFFO29CQUMvRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLDJCQUEyQixFQUFFLENBQUM7b0JBQ25GLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsbUJBQW1CO3dCQUMxQixnQ0FBZ0MsRUFBRSxZQUFZO3dCQUM5QyxpQ0FBaUMsRUFBRSxhQUFhO3FCQUNqRDtpQkFDRjs4QkFLYyxTQUFTO3NCQURyQixLQUFLO3VCQUFDLDJCQUEyQjs7QUFtQnBDLE1BQU0sT0FBTyxtQ0FBbUM7O2dJQUFuQyxtQ0FBbUM7b0hBQW5DLG1DQUFtQzsyRkFBbkMsbUNBQW1DO2tCQU4vQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1Q0FBdUM7b0JBQ2pELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsd0JBQXdCO3FCQUNoQztpQkFDRjs7QUFTRCxNQUFNLE9BQU8sbUNBQW1DOztnSUFBbkMsbUNBQW1DO29IQUFuQyxtQ0FBbUM7MkZBQW5DLG1DQUFtQztrQkFOL0MsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUNBQXVDO29CQUNqRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGdDQUFnQztxQkFDeEM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2RrVHJlZU5vZGVUb2dnbGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ256LXRyZWUtbm9kZS10b2dnbGVbbnpUcmVlTm9kZU5vb3BUb2dnbGVdLCBbbnpUcmVlTm9kZU5vb3BUb2dnbGVdJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRyZWUtc3dpdGNoZXIgYW50LXRyZWUtc3dpdGNoZXItbm9vcCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVOb2RlTm9vcFRvZ2dsZURpcmVjdGl2ZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduei10cmVlLW5vZGUtdG9nZ2xlOm5vdChbbnpUcmVlTm9kZU5vb3BUb2dnbGVdKSwgW256VHJlZU5vZGVUb2dnbGVdJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtUcmVlTm9kZVRvZ2dsZSwgdXNlRXhpc3Rpbmc6IE56VHJlZU5vZGVUb2dnbGVEaXJlY3RpdmUgfV0sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10cmVlLXN3aXRjaGVyJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLXN3aXRjaGVyX29wZW5dJzogJ2lzRXhwYW5kZWQnLFxuICAgICdbY2xhc3MuYW50LXRyZWUtc3dpdGNoZXJfY2xvc2VdJzogJyFpc0V4cGFuZGVkJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVUb2dnbGVEaXJlY3RpdmU8VD4gZXh0ZW5kcyBDZGtUcmVlTm9kZVRvZ2dsZTxUPiB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZWN1cnNpdmU6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoJ256VHJlZU5vZGVUb2dnbGVSZWN1cnNpdmUnKVxuICBvdmVycmlkZSBnZXQgcmVjdXJzaXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWN1cnNpdmU7XG4gIH1cbiAgb3ZlcnJpZGUgc2V0IHJlY3Vyc2l2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlY3Vyc2l2ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICBnZXQgaXNFeHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdHJlZU5vZGUuaXNFeHBhbmRlZDtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotaWNvbl1bbnpUcmVlTm9kZVRvZ2dsZVJvdGF0ZUljb25dJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRyZWUtc3dpdGNoZXItaWNvbidcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVOb2RlVG9nZ2xlUm90YXRlSWNvbkRpcmVjdGl2ZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotaWNvbl1bbnpUcmVlTm9kZVRvZ2dsZUFjdGl2ZUljb25dJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRyZWUtc3dpdGNoZXItbG9hZGluZy1pY29uJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVUb2dnbGVBY3RpdmVJY29uRGlyZWN0aXZlIHt9XG4iXX0=