import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/bidi";
const NZ_CONFIG_MODULE_NAME = 'collapse';
export class NzCollapseComponent {
    constructor(nzConfigService, cdr, directionality) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzAccordion = false;
        this.nzBordered = true;
        this.nzGhost = false;
        this.nzExpandIconPosition = 'left';
        this.dir = 'ltr';
        this.listOfNzCollapsePanelComponent = [];
        this.destroy$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    addPanel(value) {
        this.listOfNzCollapsePanelComponent.push(value);
    }
    removePanel(value) {
        this.listOfNzCollapsePanelComponent.splice(this.listOfNzCollapsePanelComponent.indexOf(value), 1);
    }
    click(collapse) {
        if (this.nzAccordion && !collapse.nzActive) {
            this.listOfNzCollapsePanelComponent
                .filter(item => item !== collapse)
                .forEach(item => {
                if (item.nzActive) {
                    item.nzActive = false;
                    item.nzActiveChange.emit(item.nzActive);
                    item.markForCheck();
                }
            });
        }
        collapse.nzActive = !collapse.nzActive;
        collapse.nzActiveChange.emit(collapse.nzActive);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzCollapseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCollapseComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCollapseComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCollapseComponent, selector: "nz-collapse", inputs: { nzAccordion: "nzAccordion", nzBordered: "nzBordered", nzGhost: "nzGhost", nzExpandIconPosition: "nzExpandIconPosition" }, host: { properties: { "class.ant-collapse-icon-position-left": "nzExpandIconPosition === 'left'", "class.ant-collapse-icon-position-right": "nzExpandIconPosition === 'right'", "class.ant-collapse-ghost": "nzGhost", "class.ant-collapse-borderless": "!nzBordered", "class.ant-collapse-rtl": "dir === 'rtl'" }, classAttribute: "ant-collapse" }, exportAs: ["nzCollapse"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig(),
    InputBoolean()
], NzCollapseComponent.prototype, "nzAccordion", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzCollapseComponent.prototype, "nzBordered", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzCollapseComponent.prototype, "nzGhost", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCollapseComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-collapse',
                    exportAs: 'nzCollapse',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'ant-collapse',
                        '[class.ant-collapse-icon-position-left]': `nzExpandIconPosition === 'left'`,
                        '[class.ant-collapse-icon-position-right]': `nzExpandIconPosition === 'right'`,
                        '[class.ant-collapse-ghost]': `nzGhost`,
                        '[class.ant-collapse-borderless]': '!nzBordered',
                        '[class.ant-collapse-rtl]': "dir === 'rtl'"
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzAccordion: [{
                type: Input
            }], nzBordered: [{
                type: Input
            }], nzGhost: [{
                type: Input
            }], nzExpandIconPosition: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9jb2xsYXBzZS9jb2xsYXBzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULEtBQUssRUFHTCxRQUFRLEVBQ1IsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBZ0MsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBSXZELE1BQU0scUJBQXFCLEdBQWdCLFVBQVUsQ0FBQztBQWlCdEQsTUFBTSxPQUFPLG1CQUFtQjtJQWU5QixZQUNTLGVBQWdDLEVBQy9CLEdBQXNCLEVBQ1YsY0FBOEI7UUFGM0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQy9CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBakIzQyxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQUtyQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDdkQseUJBQW9CLEdBQXFCLE1BQU0sQ0FBQztRQUV6RCxRQUFHLEdBQWMsS0FBSyxDQUFDO1FBRWYsbUNBQThCLEdBQStCLEVBQUUsQ0FBQztRQUNoRSxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQU0vQixJQUFJLENBQUMsZUFBZTthQUNqQixnQ0FBZ0MsQ0FBQyxxQkFBcUIsQ0FBQzthQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUks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QUFoRCxLQUFLO2dCQUNpQyxPQUFPO3NCQUE3QyxLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56Q29sbGFwc2VQYW5lbENvbXBvbmVudCB9IGZyb20gJy4vY29sbGFwc2UtcGFuZWwuY29tcG9uZW50JztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdjb2xsYXBzZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWNvbGxhcHNlJyxcbiAgZXhwb3J0QXM6ICduekNvbGxhcHNlJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LWNvbGxhcHNlJyxcbiAgICAnW2NsYXNzLmFudC1jb2xsYXBzZS1pY29uLXBvc2l0aW9uLWxlZnRdJzogYG56RXhwYW5kSWNvblBvc2l0aW9uID09PSAnbGVmdCdgLFxuICAgICdbY2xhc3MuYW50LWNvbGxhcHNlLWljb24tcG9zaXRpb24tcmlnaHRdJzogYG56RXhwYW5kSWNvblBvc2l0aW9uID09PSAncmlnaHQnYCxcbiAgICAnW2NsYXNzLmFudC1jb2xsYXBzZS1naG9zdF0nOiBgbnpHaG9zdGAsXG4gICAgJ1tjbGFzcy5hbnQtY29sbGFwc2UtYm9yZGVybGVzc10nOiAnIW56Qm9yZGVyZWQnLFxuICAgICdbY2xhc3MuYW50LWNvbGxhcHNlLXJ0bF0nOiBcImRpciA9PT0gJ3J0bCdcIlxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56Q29sbGFwc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBY2NvcmRpb246IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Qm9yZGVyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256R2hvc3Q6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekFjY29yZGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekJvcmRlcmVkOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpHaG9zdDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBuekV4cGFuZEljb25Qb3NpdGlvbjogJ2xlZnQnIHwgJ3JpZ2h0JyA9ICdsZWZ0JztcblxuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuXG4gIHByaXZhdGUgbGlzdE9mTnpDb2xsYXBzZVBhbmVsQ29tcG9uZW50OiBOekNvbGxhcHNlUGFuZWxDb21wb25lbnRbXSA9IFtdO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHtcbiAgICB0aGlzLm56Q29uZmlnU2VydmljZVxuICAgICAgLmdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgfVxuXG4gIGFkZFBhbmVsKHZhbHVlOiBOekNvbGxhcHNlUGFuZWxDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RPZk56Q29sbGFwc2VQYW5lbENvbXBvbmVudC5wdXNoKHZhbHVlKTtcbiAgfVxuXG4gIHJlbW92ZVBhbmVsKHZhbHVlOiBOekNvbGxhcHNlUGFuZWxDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RPZk56Q29sbGFwc2VQYW5lbENvbXBvbmVudC5zcGxpY2UodGhpcy5saXN0T2ZOekNvbGxhcHNlUGFuZWxDb21wb25lbnQuaW5kZXhPZih2YWx1ZSksIDEpO1xuICB9XG5cbiAgY2xpY2soY29sbGFwc2U6IE56Q29sbGFwc2VQYW5lbENvbXBvbmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56QWNjb3JkaW9uICYmICFjb2xsYXBzZS5uekFjdGl2ZSkge1xuICAgICAgdGhpcy5saXN0T2ZOekNvbGxhcHNlUGFuZWxDb21wb25lbnRcbiAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGNvbGxhcHNlKVxuICAgICAgICAuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5uekFjdGl2ZSkge1xuICAgICAgICAgICAgaXRlbS5uekFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaXRlbS5uekFjdGl2ZUNoYW5nZS5lbWl0KGl0ZW0ubnpBY3RpdmUpO1xuICAgICAgICAgICAgaXRlbS5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb2xsYXBzZS5uekFjdGl2ZSA9ICFjb2xsYXBzZS5uekFjdGl2ZTtcbiAgICBjb2xsYXBzZS5uekFjdGl2ZUNoYW5nZS5lbWl0KGNvbGxhcHNlLm56QWN0aXZlKTtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==