/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkTreeNode, CdkTreeNodeDef } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, Directive, Input } from '@angular/core';
import { NzNodeBase } from './node-base';
import * as i0 from "@angular/core";
import * as i1 from "./tree";
import * as i2 from "./indent";
import * as i3 from "@angular/common";
import * as i4 from "./toggle";
export class NzTreeNodeComponent extends NzNodeBase {
    constructor(elementRef, tree, renderer, cdr) {
        super(elementRef, tree);
        this.elementRef = elementRef;
        this.tree = tree;
        this.renderer = renderer;
        this.cdr = cdr;
        this.indents = [];
        this.disabled = false;
        this.selected = false;
        this.isLeaf = false;
        this._elementRef.nativeElement.classList.add('ant-tree-treenode');
    }
    ngOnInit() {
        this.isLeaf = !this.tree.treeControl.isExpandable(this.data);
    }
    disable() {
        this.disabled = true;
        this.updateDisabledClass();
    }
    enable() {
        this.disabled = false;
        this.updateDisabledClass();
    }
    select() {
        this.selected = true;
        this.updateSelectedClass();
    }
    deselect() {
        this.selected = false;
        this.updateSelectedClass();
    }
    setIndents(indents) {
        this.indents = indents;
        this.cdr.markForCheck();
    }
    updateSelectedClass() {
        if (this.selected) {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-tree-treenode-selected');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-tree-treenode-selected');
        }
    }
    updateDisabledClass() {
        if (this.disabled) {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-tree-treenode-disabled');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-tree-treenode-disabled');
        }
    }
}
NzTreeNodeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeComponent, deps: [{ token: i0.ElementRef }, { token: i1.NzTreeView }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeComponent, selector: "nz-tree-node:not([builtin])", host: { properties: { "class.ant-tree-treenode-switcher-open": "isExpanded", "class.ant-tree-treenode-switcher-close": "!isExpanded" } }, providers: [
        { provide: CdkTreeNode, useExisting: NzTreeNodeComponent },
        { provide: NzNodeBase, useExisting: NzTreeNodeComponent }
    ], exportAs: ["nzTreeNode"], usesInheritance: true, ngImport: i0, template: `
    <nz-tree-node-indents [indents]="indents" *ngIf="indents.length"></nz-tree-node-indents>
    <ng-content select="nz-tree-node-toggle, [nz-tree-node-toggle]"></ng-content>
    <nz-tree-node-toggle class="nz-tree-leaf-line-icon" *ngIf="indents.length && isLeaf" nzTreeNodeNoopToggle>
      <span class="ant-tree-switcher-leaf-line"></span>
    </nz-tree-node-toggle>
    <ng-content select="nz-tree-node-checkbox"></ng-content>
    <ng-content select="nz-tree-node-option"></ng-content>
    <ng-content></ng-content>
  `, isInline: true, components: [{ type: i2.NzTreeNodeIndentsComponent, selector: "nz-tree-node-indents", inputs: ["indents"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NzTreeNodeNoopToggleDirective, selector: "nz-tree-node-toggle[nzTreeNodeNoopToggle], [nzTreeNodeNoopToggle]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node:not([builtin])',
                    exportAs: 'nzTreeNode',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: CdkTreeNode, useExisting: NzTreeNodeComponent },
                        { provide: NzNodeBase, useExisting: NzTreeNodeComponent }
                    ],
                    template: `
    <nz-tree-node-indents [indents]="indents" *ngIf="indents.length"></nz-tree-node-indents>
    <ng-content select="nz-tree-node-toggle, [nz-tree-node-toggle]"></ng-content>
    <nz-tree-node-toggle class="nz-tree-leaf-line-icon" *ngIf="indents.length && isLeaf" nzTreeNodeNoopToggle>
      <span class="ant-tree-switcher-leaf-line"></span>
    </nz-tree-node-toggle>
    <ng-content select="nz-tree-node-checkbox"></ng-content>
    <ng-content select="nz-tree-node-option"></ng-content>
    <ng-content></ng-content>
  `,
                    host: {
                        '[class.ant-tree-treenode-switcher-open]': 'isExpanded',
                        '[class.ant-tree-treenode-switcher-close]': '!isExpanded'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NzTreeView }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; } });
export class NzTreeNodeDefDirective extends CdkTreeNodeDef {
}
NzTreeNodeDefDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeDefDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeDefDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeDefDirective, selector: "[nzTreeNodeDef]", inputs: { when: ["nzTreeNodeDefWhen", "when"] }, providers: [{ provide: CdkTreeNodeDef, useExisting: NzTreeNodeDefDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzTreeNodeDef]',
                    providers: [{ provide: CdkTreeNodeDef, useExisting: NzTreeNodeDefDirective }]
                }]
        }], propDecorators: { when: [{
                type: Input,
                args: ['nzTreeNodeDefWhen']
            }] } });
export class NzTreeVirtualScrollNodeOutletDirective {
    constructor(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
        this._viewRef = null;
    }
    ngOnChanges(changes) {
        const recreateView = this.shouldRecreateView(changes);
        if (recreateView) {
            const viewContainerRef = this._viewContainerRef;
            if (this._viewRef) {
                viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
            }
            this._viewRef = this.data
                ? viewContainerRef.createEmbeddedView(this.data.nodeDef.template, this.data.context)
                : null;
            if (CdkTreeNode.mostRecentTreeNode && this._viewRef) {
                CdkTreeNode.mostRecentTreeNode.data = this.data.data;
            }
        }
        else if (this._viewRef && this.data.context) {
            this.updateExistingContext(this.data.context);
        }
    }
    shouldRecreateView(changes) {
        const ctxChange = changes.data;
        return ctxChange && this.hasContextShapeChanged(ctxChange);
    }
    hasContextShapeChanged(ctxChange) {
        const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
        const currCtxKeys = Object.keys(ctxChange.currentValue || {});
        if (prevCtxKeys.length === currCtxKeys.length) {
            for (const propName of currCtxKeys) {
                if (prevCtxKeys.indexOf(propName) === -1) {
                    return true;
                }
            }
            return ctxChange.previousValue?.data !== ctxChange.currentValue?.data;
        }
        return true;
    }
    updateExistingContext(ctx) {
        for (const propName of Object.keys(ctx)) {
            this._viewRef.context[propName] = this.data.context[propName];
        }
    }
}
NzTreeVirtualScrollNodeOutletDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeVirtualScrollNodeOutletDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
NzTreeVirtualScrollNodeOutletDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeVirtualScrollNodeOutletDirective, selector: "[nzTreeVirtualScrollNodeOutlet]", inputs: { data: "data" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeVirtualScrollNodeOutletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzTreeVirtualScrollNodeOutlet]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdHJlZS12aWV3L25vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQTRCLE1BQU0sbUJBQW1CLENBQUM7QUFDMUYsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsU0FBUyxFQUdULEtBQUssRUFRTixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7QUFnQ3pDLE1BQU0sT0FBTyxtQkFBdUIsU0FBUSxVQUFhO0lBTXZELFlBQ1ksVUFBbUMsRUFDbkMsSUFBbUIsRUFDckIsUUFBbUIsRUFDbkIsR0FBc0I7UUFFOUIsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUxkLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLFNBQUksR0FBSixJQUFJLENBQWU7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVRoQyxZQUFPLEdBQWMsRUFBRSxDQUFDO1FBQ3hCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBU2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFUSxRQUFRO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENB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QUFTLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUU5RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUM3QyxLQUFLLE1BQU0sUUFBUSxJQUFJLFdBQVcsRUFBRTtnQkFDbEMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUN4QyxPQUFPLElBQUksQ0FBQztpQkFDYjthQUNGO1lBQ0QsT0FBTyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksS0FBSyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQztTQUN2RTtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLHFCQUFxQixDQUFDLEdBQWM7UUFDMUMsS0FBSyxNQUFNLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxRQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvRTtJQUNILENBQUM7O21JQW5EVSxzQ0FBc0M7dUhBQXRDLHNDQUFzQzsyRkFBdEMsc0NBQXNDO2tCQUhsRCxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQ0FBaUM7aUJBQzVDO3VHQUdVLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENka1RyZWVOb2RlLCBDZGtUcmVlTm9kZURlZiwgQ2RrVHJlZU5vZGVPdXRsZXRDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RyZWUnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56Tm9kZUJhc2UgfSBmcm9tICcuL25vZGUtYmFzZSc7XG5pbXBvcnQgeyBOelRyZWVWaWV3IH0gZnJvbSAnLi90cmVlJztcblxuZXhwb3J0IGludGVyZmFjZSBOelRyZWVWaXJ0dWFsTm9kZURhdGE8VD4ge1xuICBkYXRhOiBUO1xuICBjb250ZXh0OiBDZGtUcmVlTm9kZU91dGxldENvbnRleHQ8VD47XG4gIG5vZGVEZWY6IENka1RyZWVOb2RlRGVmPFQ+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10cmVlLW5vZGU6bm90KFtidWlsdGluXSknLFxuICBleHBvcnRBczogJ256VHJlZU5vZGUnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtUcmVlTm9kZSwgdXNlRXhpc3Rpbmc6IE56VHJlZU5vZGVDb21wb25lbnQgfSxcbiAgICB7IHByb3ZpZGU6IE56Tm9kZUJhc2UsIHVzZUV4aXN0aW5nOiBOelRyZWVOb2RlQ29tcG9uZW50IH1cbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotdHJlZS1ub2RlLWluZGVudHMgW2luZGVudHNdPVwiaW5kZW50c1wiICpuZ0lmPVwiaW5kZW50cy5sZW5ndGhcIj48L256LXRyZWUtbm9kZS1pbmRlbnRzPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LXRyZWUtbm9kZS10b2dnbGUsIFtuei10cmVlLW5vZGUtdG9nZ2xlXVwiPjwvbmctY29udGVudD5cbiAgICA8bnotdHJlZS1ub2RlLXRvZ2dsZSBjbGFzcz1cIm56LXRyZWUtbGVhZi1saW5lLWljb25cIiAqbmdJZj1cImluZGVudHMubGVuZ3RoICYmIGlzTGVhZlwiIG56VHJlZU5vZGVOb29wVG9nZ2xlPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtdHJlZS1zd2l0Y2hlci1sZWFmLWxpbmVcIj48L3NwYW4+XG4gICAgPC9uei10cmVlLW5vZGUtdG9nZ2xlPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LXRyZWUtbm9kZS1jaGVja2JveFwiPjwvbmctY29udGVudD5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuei10cmVlLW5vZGUtb3B0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRyZWUtdHJlZW5vZGUtc3dpdGNoZXItb3Blbl0nOiAnaXNFeHBhbmRlZCcsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS10cmVlbm9kZS1zd2l0Y2hlci1jbG9zZV0nOiAnIWlzRXhwYW5kZWQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlTm9kZUNvbXBvbmVudDxUPiBleHRlbmRzIE56Tm9kZUJhc2U8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGluZGVudHM6IGJvb2xlYW5bXSA9IFtdO1xuICBkaXNhYmxlZCA9IGZhbHNlO1xuICBzZWxlY3RlZCA9IGZhbHNlO1xuICBpc0xlYWYgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJvdGVjdGVkIHRyZWU6IE56VHJlZVZpZXc8VD4sXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCB0cmVlKTtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYW50LXRyZWUtdHJlZW5vZGUnKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaXNMZWFmID0gIXRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGFibGUodGhpcy5kYXRhKTtcbiAgfVxuXG4gIGRpc2FibGUoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZENsYXNzKCk7XG4gIH1cblxuICBlbmFibGUoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudXBkYXRlRGlzYWJsZWRDbGFzcygpO1xuICB9XG5cbiAgc2VsZWN0KCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRDbGFzcygpO1xuICB9XG5cbiAgZGVzZWxlY3QoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRDbGFzcygpO1xuICB9XG5cbiAgc2V0SW5kZW50cyhpbmRlbnRzOiBib29sZWFuW10pOiB2b2lkIHtcbiAgICB0aGlzLmluZGVudHMgPSBpbmRlbnRzO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTZWxlY3RlZENsYXNzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LXRyZWUtdHJlZW5vZGUtc2VsZWN0ZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC10cmVlLXRyZWVub2RlLXNlbGVjdGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVEaXNhYmxlZENsYXNzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LXRyZWUtdHJlZW5vZGUtZGlzYWJsZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC10cmVlLXRyZWVub2RlLWRpc2FibGVkJyk7XG4gICAgfVxuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuelRyZWVOb2RlRGVmXScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrVHJlZU5vZGVEZWYsIHVzZUV4aXN0aW5nOiBOelRyZWVOb2RlRGVmRGlyZWN0aXZlIH1dXG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVEZWZEaXJlY3RpdmU8VD4gZXh0ZW5kcyBDZGtUcmVlTm9kZURlZjxUPiB7XG4gIEBJbnB1dCgnbnpUcmVlTm9kZURlZldoZW4nKSBvdmVycmlkZSB3aGVuITogKGluZGV4OiBudW1iZXIsIG5vZGVEYXRhOiBUKSA9PiBib29sZWFuO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnpUcmVlVmlydHVhbFNjcm9sbE5vZGVPdXRsZXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVWaXJ0dWFsU2Nyb2xsTm9kZU91dGxldERpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgX3ZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGRhdGEhOiBOelRyZWVWaXJ0dWFsTm9kZURhdGE8VD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgcmVjcmVhdGVWaWV3ID0gdGhpcy5zaG91bGRSZWNyZWF0ZVZpZXcoY2hhbmdlcyk7XG4gICAgaWYgKHJlY3JlYXRlVmlldykge1xuICAgICAgY29uc3Qgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuX3ZpZXdDb250YWluZXJSZWY7XG5cbiAgICAgIGlmICh0aGlzLl92aWV3UmVmKSB7XG4gICAgICAgIHZpZXdDb250YWluZXJSZWYucmVtb3ZlKHZpZXdDb250YWluZXJSZWYuaW5kZXhPZih0aGlzLl92aWV3UmVmKSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3ZpZXdSZWYgPSB0aGlzLmRhdGFcbiAgICAgICAgPyB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmRhdGEubm9kZURlZi50ZW1wbGF0ZSwgdGhpcy5kYXRhLmNvbnRleHQpXG4gICAgICAgIDogbnVsbDtcblxuICAgICAgaWYgKENka1RyZWVOb2RlLm1vc3RSZWNlbnRUcmVlTm9kZSAmJiB0aGlzLl92aWV3UmVmKSB7XG4gICAgICAgIENka1RyZWVOb2RlLm1vc3RSZWNlbnRUcmVlTm9kZS5kYXRhID0gdGhpcy5kYXRhLmRhdGE7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3UmVmICYmIHRoaXMuZGF0YS5jb250ZXh0KSB7XG4gICAgICB0aGlzLnVwZGF0ZUV4aXN0aW5nQ29udGV4dCh0aGlzLmRhdGEuY29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzaG91bGRSZWNyZWF0ZVZpZXcoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGN0eENoYW5nZSA9IGNoYW5nZXMuZGF0YTtcbiAgICByZXR1cm4gY3R4Q2hhbmdlICYmIHRoaXMuaGFzQ29udGV4dFNoYXBlQ2hhbmdlZChjdHhDaGFuZ2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNDb250ZXh0U2hhcGVDaGFuZ2VkKGN0eENoYW5nZTogU2ltcGxlQ2hhbmdlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcHJldkN0eEtleXMgPSBPYmplY3Qua2V5cyhjdHhDaGFuZ2UucHJldmlvdXNWYWx1ZSB8fCB7fSk7XG4gICAgY29uc3QgY3VyckN0eEtleXMgPSBPYmplY3Qua2V5cyhjdHhDaGFuZ2UuY3VycmVudFZhbHVlIHx8IHt9KTtcblxuICAgIGlmIChwcmV2Q3R4S2V5cy5sZW5ndGggPT09IGN1cnJDdHhLZXlzLmxlbmd0aCkge1xuICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBjdXJyQ3R4S2V5cykge1xuICAgICAgICBpZiAocHJldkN0eEtleXMuaW5kZXhPZihwcm9wTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjdHhDaGFuZ2UucHJldmlvdXNWYWx1ZT8uZGF0YSAhPT0gY3R4Q2hhbmdlLmN1cnJlbnRWYWx1ZT8uZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUV4aXN0aW5nQ29udGV4dChjdHg6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgcHJvcE5hbWUgb2YgT2JqZWN0LmtleXMoY3R4KSkge1xuICAgICAgdGhpcy5fdmlld1JlZiEuY29udGV4dFtwcm9wTmFtZV0gPSAodGhpcy5kYXRhLmNvbnRleHQgYXMgTnpTYWZlQW55KVtwcm9wTmFtZV07XG4gICAgfVxuICB9XG59XG4iXX0=