import { __decorate } from "tslib";
import { CdkTree } from '@angular/cdk/tree';
import { Component, Host, Input, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/no-animation";
import * as i2 from "@angular/cdk/bidi";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class NzTreeView extends CdkTree {
    constructor(differs, changeDetectorRef, noAnimation, directionality) {
        super(differs, changeDetectorRef);
        this.differs = differs;
        this.changeDetectorRef = changeDetectorRef;
        this.noAnimation = noAnimation;
        this.directionality = directionality;
        this.destroy$ = new Subject();
        this.dir = 'ltr';
        this._dataSourceChanged = new Subject();
        this.nzDirectoryTree = false;
        this.nzBlockNode = false;
    }
    get dataSource() {
        return super.dataSource;
    }
    set dataSource(dataSource) {
        super.dataSource = dataSource;
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.directionality) {
            this.dir = this.directionality.value;
            this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.changeDetectorRef.detectChanges();
            });
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.destroy$.next();
        this.destroy$.complete();
    }
    renderNodeChanges(data, dataDiffer, viewContainer, parentData) {
        super.renderNodeChanges(data, dataDiffer, viewContainer, parentData);
        this._dataSourceChanged.next();
    }
}
NzTreeView.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeView, deps: [{ token: i0.IterableDiffers }, { token: i0.ChangeDetectorRef }, { token: i1.NzNoAnimationDirective, host: true, optional: true }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTreeView.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeView, selector: "ng-component", inputs: { treeControl: ["nzTreeControl", "treeControl"], dataSource: ["nzDataSource", "dataSource"], nzDirectoryTree: "nzDirectoryTree", nzBlockNode: "nzBlockNode" }, usesInheritance: true, ngImport: i0, template: '', isInline: true });
__decorate([
    InputBoolean()
], NzTreeView.prototype, "nzDirectoryTree", void 0);
__decorate([
    InputBoolean()
], NzTreeView.prototype, "nzBlockNode", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeView, decorators: [{
            type: Component,
            args: [{ template: '' }]
        }], ctorParameters: function () { return [{ type: i0.IterableDiffers }, { type: i0.ChangeDetectorRef }, { type: i1.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { treeControl: [{
                type: Input,
                args: ['nzTreeControl']
            }], dataSource: [{
                type: Input,
                args: ['nzDataSource']
            }], nzDirectoryTree: [{
                type: Input
            }], nzBlockNode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdHJlZS12aWV3L3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFBRSxPQUFPLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6RCxPQUFPLEVBRUwsU0FBUyxFQUNULElBQUksRUFDSixLQUFLLEVBS0wsUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQUd2RCxrRUFBa0U7QUFDbEUsTUFBTSxPQUFPLFVBQWMsU0FBUSxPQUFVO0lBa0IzQyxZQUNZLE9BQXdCLEVBQ3hCLGlCQUFvQyxFQUNuQixXQUFvQyxFQUMzQyxjQUErQjtRQUVuRCxLQUFLLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFMeEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDM0MsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBbEI3QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxRQUFHLEdBQWMsS0FBSyxDQUFDO1FBQ3ZCLHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFTaEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFTN0MsQ0FBQztJQWpCRCxJQUNhLFVBQVU7UUFDckIsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFhLFVBQVUsQ0FBQyxVQUFpRDtRQUN2RSxLQUFLLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNoQyxDQUFDO0lBYVEsUUFBUTtRQUNmLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztZQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRTtnQkFDNUYsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVRLFdBQVc7UUFDbEIsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRVEsaUJBQWlCLENBQ3hCLElBQXdCLEVBQ3hCLFVBQThCLEVBQzlCLGFBQWdDLEVBQ2hDLFVBQWM7UUFFZCxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7O3VHQXJEVSxVQUFVOzJGQUFWLFVBQVUsa1BBRkEsRUFBRTtBQWlCRTtJQUFmLFlBQVksRUFBRTttREFBeUI7QUFDeEI7SUFBZixZQUFZLEVBQUU7K0NBQXFCOzJGQWhCbEMsVUFBVTtrQkFGdEIsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7OzBCQXVCdEIsSUFBSTs7MEJBQUksUUFBUTs7MEJBQ2hCLFFBQVE7NENBZnNCLFdBQVc7c0JBQTNDLEtBQUs7dUJBQUMsZUFBZTtnQkFFVCxVQUFVO3NCQUR0QixLQUFLO3VCQUFDLGNBQWM7Z0JBT0ksZUFBZTtzQkFBdkMsS0FBSztnQkFDbUIsV0FBVztzQkFBbkMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IENka1RyZWUsIFRyZWVDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RyZWUnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5AQ29tcG9uZW50KHsgdGVtcGxhdGU6ICcnIH0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBOelRyZWVWaWV3PFQ+IGV4dGVuZHMgQ2RrVHJlZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlyZWN0b3J5VHJlZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpCbG9ja05vZGU6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcbiAgX2RhdGFTb3VyY2VDaGFuZ2VkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgQElucHV0KCduelRyZWVDb250cm9sJykgb3ZlcnJpZGUgdHJlZUNvbnRyb2whOiBUcmVlQ29udHJvbDxULCBOelNhZmVBbnk+O1xuICBASW5wdXQoJ256RGF0YVNvdXJjZScpXG4gIG92ZXJyaWRlIGdldCBkYXRhU291cmNlKCk6IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPFRbXT4gfCBUW10ge1xuICAgIHJldHVybiBzdXBlci5kYXRhU291cmNlO1xuICB9XG4gIG92ZXJyaWRlIHNldCBkYXRhU291cmNlKGRhdGFTb3VyY2U6IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPFRbXT4gfCBUW10pIHtcbiAgICBzdXBlci5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgfVxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXJlY3RvcnlUcmVlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekJsb2NrTm9kZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASG9zdCgpIEBPcHRpb25hbCgpIHB1YmxpYyBub0FuaW1hdGlvbj86IE56Tm9BbmltYXRpb25EaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eT86IERpcmVjdGlvbmFsaXR5XG4gICkge1xuICAgIHN1cGVyKGRpZmZlcnMsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICBpZiAodGhpcy5kaXJlY3Rpb25hbGl0eSkge1xuICAgICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVuZGVyTm9kZUNoYW5nZXMoXG4gICAgZGF0YTogVFtdIHwgcmVhZG9ubHkgVFtdLFxuICAgIGRhdGFEaWZmZXI/OiBJdGVyYWJsZURpZmZlcjxUPixcbiAgICB2aWV3Q29udGFpbmVyPzogVmlld0NvbnRhaW5lclJlZixcbiAgICBwYXJlbnREYXRhPzogVFxuICApOiB2b2lkIHtcbiAgICBzdXBlci5yZW5kZXJOb2RlQ2hhbmdlcyhkYXRhLCBkYXRhRGlmZmVyLCB2aWV3Q29udGFpbmVyLCBwYXJlbnREYXRhKTtcbiAgICB0aGlzLl9kYXRhU291cmNlQ2hhbmdlZC5uZXh0KCk7XG4gIH1cbn1cbiJdfQ==