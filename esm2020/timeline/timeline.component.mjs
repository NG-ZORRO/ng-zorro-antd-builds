import { ChangeDetectionStrategy, Component, ContentChildren, Input, Optional, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzTimelineItemComponent } from './timeline-item.component';
import { TimelineService } from './timeline.service';
import * as i0 from "@angular/core";
import * as i1 from "./timeline.service";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/core/outlet";
import * as i5 from "ng-zorro-antd/icon";
export class NzTimelineComponent {
    constructor(cdr, timelineService, directionality) {
        this.cdr = cdr;
        this.timelineService = timelineService;
        this.directionality = directionality;
        this.nzMode = 'left';
        this.nzReverse = false;
        this.isPendingBoolean = false;
        this.timelineItems = [];
        this.dir = 'ltr';
        this.hasLabelItem = false;
        this.destroy$ = new Subject();
    }
    ngOnChanges(changes) {
        const { nzMode, nzReverse, nzPending } = changes;
        if (simpleChangeActivated(nzMode) || simpleChangeActivated(nzReverse)) {
            this.updateChildren();
        }
        if (nzPending) {
            this.isPendingBoolean = nzPending.currentValue === true;
        }
    }
    ngOnInit() {
        this.timelineService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cdr.markForCheck();
        });
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngAfterContentInit() {
        this.updateChildren();
        this.listOfItems.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.updateChildren();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateChildren() {
        if (this.listOfItems && this.listOfItems.length) {
            const length = this.listOfItems.length;
            let hasLabelItem = false;
            this.listOfItems.forEach((item, index) => {
                item.isLast = !this.nzReverse ? index === length - 1 : index === 0;
                item.position = getInferredTimelineItemPosition(index, this.nzMode);
                if (!hasLabelItem && item.nzLabel) {
                    hasLabelItem = true;
                }
                item.detectChanges();
            });
            this.timelineItems = this.nzReverse ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
            this.hasLabelItem = hasLabelItem;
        }
        else {
            this.timelineItems = [];
            this.hasLabelItem = false;
        }
        this.cdr.markForCheck();
    }
}
NzTimelineComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimelineComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.TimelineService }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTimelineComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTimelineComponent, selector: "nz-timeline", inputs: { nzMode: "nzMode", nzPending: "nzPending", nzPendingDot: "nzPendingDot", nzReverse: "nzReverse" }, providers: [TimelineService], queries: [{ propertyName: "listOfItems", predicate: NzTimelineItemComponent }], exportAs: ["nzTimeline"], usesOnChanges: true, ngImport: i0, template: `
    <ul
      class="ant-timeline"
      [class.ant-timeline-label]="hasLabelItem"
      [class.ant-timeline-right]="!hasLabelItem && nzMode === 'right'"
      [class.ant-timeline-alternate]="nzMode === 'alternate' || nzMode === 'custom'"
      [class.ant-timeline-pending]="!!nzPending"
      [class.ant-timeline-reverse]="nzReverse"
      [class.ant-timeline-rtl]="dir === 'rtl'"
    >
      <!-- pending dot (reversed) -->
      <ng-container *ngIf="nzReverse" [ngTemplateOutlet]="pendingTemplate"></ng-container>
      <!-- timeline items -->
      <ng-container *ngFor="let item of timelineItems">
        <ng-template [ngTemplateOutlet]="item.template"></ng-template>
      </ng-container>
      <ng-container *ngIf="!nzReverse" [ngTemplateOutlet]="pendingTemplate"></ng-container>
      <!-- pending dot -->
    </ul>
    <ng-template #pendingTemplate>
      <li *ngIf="nzPending" class="ant-timeline-item ant-timeline-item-pending">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-custom ant-timeline-item-head-blue">
          <ng-container *nzStringTemplateOutlet="nzPendingDot">
            {{ nzPendingDot }}
            <i *ngIf="!nzPendingDot" nz-icon nzType="loading"></i>
          </ng-container>
        </div>
        <div class="ant-timeline-item-content">
          <ng-container *nzStringTemplateOutlet="nzPending">
            {{ isPendingBoolean ? '' : nzPending }}
          </ng-container>
        </div>
      </li>
    </ng-template>
    <!-- Grasp items -->
    <ng-content></ng-content>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimelineComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    selector: 'nz-timeline',
                    providers: [TimelineService],
                    exportAs: 'nzTimeline',
                    template: `
    <ul
      class="ant-timeline"
      [class.ant-timeline-label]="hasLabelItem"
      [class.ant-timeline-right]="!hasLabelItem && nzMode === 'right'"
      [class.ant-timeline-alternate]="nzMode === 'alternate' || nzMode === 'custom'"
      [class.ant-timeline-pending]="!!nzPending"
      [class.ant-timeline-reverse]="nzReverse"
      [class.ant-timeline-rtl]="dir === 'rtl'"
    >
      <!-- pending dot (reversed) -->
      <ng-container *ngIf="nzReverse" [ngTemplateOutlet]="pendingTemplate"></ng-container>
      <!-- timeline items -->
      <ng-container *ngFor="let item of timelineItems">
        <ng-template [ngTemplateOutlet]="item.template"></ng-template>
      </ng-container>
      <ng-container *ngIf="!nzReverse" [ngTemplateOutlet]="pendingTemplate"></ng-container>
      <!-- pending dot -->
    </ul>
    <ng-template #pendingTemplate>
      <li *ngIf="nzPending" class="ant-timeline-item ant-timeline-item-pending">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-custom ant-timeline-item-head-blue">
          <ng-container *nzStringTemplateOutlet="nzPendingDot">
            {{ nzPendingDot }}
            <i *ngIf="!nzPendingDot" nz-icon nzType="loading"></i>
          </ng-container>
        </div>
        <div class="ant-timeline-item-content">
          <ng-container *nzStringTemplateOutlet="nzPending">
            {{ isPendingBoolean ? '' : nzPending }}
          </ng-container>
        </div>
      </li>
    </ng-template>
    <!-- Grasp items -->
    <ng-content></ng-content>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.TimelineService }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { listOfItems: [{
                type: ContentChildren,
                args: [NzTimelineItemComponent]
            }], nzMode: [{
                type: Input
            }], nzPending: [{
                type: Input
            }], nzPendingDot: [{
                type: Input
            }], nzReverse: [{
                type: Input
            }] } });
function simpleChangeActivated(simpleChange) {
    return !!(simpleChange && (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange()));
}
function getInferredTimelineItemPosition(index, mode) {
    return mode === 'custom'
        ? undefined
        : mode === 'left'
            ? 'left'
            : mode === 'right'
                ? 'right'
                : mode === 'alternate' && index % 2 === 0
                    ? 'left'
                    : 'right';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90aW1lbGluZS90aW1lbGluZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFJTCxRQUFRLEVBS1IsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7OztBQWlEckQsTUFBTSxPQUFPLG1CQUFtQjtJQWU5QixZQUNVLEdBQXNCLEVBQ3RCLGVBQWdDLEVBQ3BCLGNBQThCO1FBRjFDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFmM0MsV0FBTSxHQUFtQixNQUFNLENBQUM7UUFHaEMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUVwQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsa0JBQWEsR0FBOEIsRUFBRSxDQUFDO1FBQzlDLFFBQUcsR0FBYyxLQUFLLENBQUM7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFYixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQU1wQyxDQUFDO0lBRUosV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUVqRCxJQUFJLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLHFC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QUksS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUN6QyxDQUFDLENBQUMsTUFBTTtvQkFDUixDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56VGltZWxpbmVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lbGluZS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lbGluZVNlcnZpY2UgfSBmcm9tICcuL3RpbWVsaW5lLnNlcnZpY2UnO1xuaW1wb3J0IHsgTnpUaW1lbGluZU1vZGUsIE56VGltZWxpbmVQb3NpdGlvbiB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHNlbGVjdG9yOiAnbnotdGltZWxpbmUnLFxuICBwcm92aWRlcnM6IFtUaW1lbGluZVNlcnZpY2VdLFxuICBleHBvcnRBczogJ256VGltZWxpbmUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx1bFxuICAgICAgY2xhc3M9XCJhbnQtdGltZWxpbmVcIlxuICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1sYWJlbF09XCJoYXNMYWJlbEl0ZW1cIlxuICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1yaWdodF09XCIhaGFzTGFiZWxJdGVtICYmIG56TW9kZSA9PT0gJ3JpZ2h0J1wiXG4gICAgICBbY2xhc3MuYW50LXRpbWVsaW5lLWFsdGVybmF0ZV09XCJuek1vZGUgPT09ICdhbHRlcm5hdGUnIHx8IG56TW9kZSA9PT0gJ2N1c3RvbSdcIlxuICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1wZW5kaW5nXT1cIiEhbnpQZW5kaW5nXCJcbiAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtcmV2ZXJzZV09XCJuelJldmVyc2VcIlxuICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1ydGxdPVwiZGlyID09PSAncnRsJ1wiXG4gICAgPlxuICAgICAgPCEtLSBwZW5kaW5nIGRvdCAocmV2ZXJzZWQpIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56UmV2ZXJzZVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBlbmRpbmdUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPCEtLSB0aW1lbGluZSBpdGVtcyAtLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdGltZWxpbmVJdGVtc1wiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbS50ZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbnpSZXZlcnNlXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwicGVuZGluZ1RlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8IS0tIHBlbmRpbmcgZG90IC0tPlxuICAgIDwvdWw+XG4gICAgPG5nLXRlbXBsYXRlICNwZW5kaW5nVGVtcGxhdGU+XG4gICAgICA8bGkgKm5nSWY9XCJuelBlbmRpbmdcIiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtIGFudC10aW1lbGluZS1pdGVtLXBlbmRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLXRhaWxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLWhlYWQgYW50LXRpbWVsaW5lLWl0ZW0taGVhZC1jdXN0b20gYW50LXRpbWVsaW5lLWl0ZW0taGVhZC1ibHVlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56UGVuZGluZ0RvdFwiPlxuICAgICAgICAgICAge3sgbnpQZW5kaW5nRG90IH19XG4gICAgICAgICAgICA8aSAqbmdJZj1cIiFuelBlbmRpbmdEb3RcIiBuei1pY29uIG56VHlwZT1cImxvYWRpbmdcIj48L2k+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRpbWVsaW5lLWl0ZW0tY29udGVudFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelBlbmRpbmdcIj5cbiAgICAgICAgICAgIHt7IGlzUGVuZGluZ0Jvb2xlYW4gPyAnJyA6IG56UGVuZGluZyB9fVxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8IS0tIEdyYXNwIGl0ZW1zIC0tPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelRpbWVsaW5lQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpUaW1lbGluZUl0ZW1Db21wb25lbnQpIGxpc3RPZkl0ZW1zITogUXVlcnlMaXN0PE56VGltZWxpbmVJdGVtQ29tcG9uZW50PjtcblxuICBASW5wdXQoKSBuek1vZGU6IE56VGltZWxpbmVNb2RlID0gJ2xlZnQnO1xuICBASW5wdXQoKSBuelBlbmRpbmc/OiBzdHJpbmcgfCBib29sZWFuIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56UGVuZGluZ0RvdD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuelJldmVyc2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBpc1BlbmRpbmdCb29sZWFuOiBib29sZWFuID0gZmFsc2U7XG4gIHRpbWVsaW5lSXRlbXM6IE56VGltZWxpbmVJdGVtQ29tcG9uZW50W10gPSBbXTtcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcbiAgaGFzTGFiZWxJdGVtID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdGltZWxpbmVTZXJ2aWNlOiBUaW1lbGluZVNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56TW9kZSwgbnpSZXZlcnNlLCBuelBlbmRpbmcgfSA9IGNoYW5nZXM7XG5cbiAgICBpZiAoc2ltcGxlQ2hhbmdlQWN0aXZhdGVkKG56TW9kZSkgfHwgc2ltcGxlQ2hhbmdlQWN0aXZhdGVkKG56UmV2ZXJzZSkpIHtcbiAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW4oKTtcbiAgICB9XG5cbiAgICBpZiAobnpQZW5kaW5nKSB7XG4gICAgICB0aGlzLmlzUGVuZGluZ0Jvb2xlYW4gPSBuelBlbmRpbmcuY3VycmVudFZhbHVlID09PSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudGltZWxpbmVTZXJ2aWNlLmNoZWNrJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUNoaWxkcmVuKCk7XG5cbiAgICB0aGlzLmxpc3RPZkl0ZW1zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUNoaWxkcmVuKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNoaWxkcmVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RPZkl0ZW1zICYmIHRoaXMubGlzdE9mSXRlbXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxpc3RPZkl0ZW1zLmxlbmd0aDtcbiAgICAgIGxldCBoYXNMYWJlbEl0ZW0gPSBmYWxzZTtcblxuICAgICAgdGhpcy5saXN0T2ZJdGVtcy5mb3JFYWNoKChpdGVtOiBOelRpbWVsaW5lSXRlbUNvbXBvbmVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpdGVtLmlzTGFzdCA9ICF0aGlzLm56UmV2ZXJzZSA/IGluZGV4ID09PSBsZW5ndGggLSAxIDogaW5kZXggPT09IDA7XG4gICAgICAgIGl0ZW0ucG9zaXRpb24gPSBnZXRJbmZlcnJlZFRpbWVsaW5lSXRlbVBvc2l0aW9uKGluZGV4LCB0aGlzLm56TW9kZSk7XG5cbiAgICAgICAgaWYgKCFoYXNMYWJlbEl0ZW0gJiYgaXRlbS5uekxhYmVsKSB7XG4gICAgICAgICAgaGFzTGFiZWxJdGVtID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudGltZWxpbmVJdGVtcyA9IHRoaXMubnpSZXZlcnNlID8gdGhpcy5saXN0T2ZJdGVtcy50b0FycmF5KCkucmV2ZXJzZSgpIDogdGhpcy5saXN0T2ZJdGVtcy50b0FycmF5KCk7XG4gICAgICB0aGlzLmhhc0xhYmVsSXRlbSA9IGhhc0xhYmVsSXRlbTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aW1lbGluZUl0ZW1zID0gW107XG4gICAgICB0aGlzLmhhc0xhYmVsSXRlbSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNpbXBsZUNoYW5nZUFjdGl2YXRlZChzaW1wbGVDaGFuZ2U/OiBTaW1wbGVDaGFuZ2UpOiBib29sZWFuIHtcbiAgcmV0dXJuICEhKHNpbXBsZUNoYW5nZSAmJiAoc2ltcGxlQ2hhbmdlLnByZXZpb3VzVmFsdWUgIT09IHNpbXBsZUNoYW5nZS5jdXJyZW50VmFsdWUgfHwgc2ltcGxlQ2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSkpO1xufVxuXG5mdW5jdGlvbiBnZXRJbmZlcnJlZFRpbWVsaW5lSXRlbVBvc2l0aW9uKGluZGV4OiBudW1iZXIsIG1vZGU6IE56VGltZWxpbmVNb2RlKTogTnpUaW1lbGluZVBvc2l0aW9uIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIG1vZGUgPT09ICdjdXN0b20nXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IG1vZGUgPT09ICdsZWZ0J1xuICAgID8gJ2xlZnQnXG4gICAgOiBtb2RlID09PSAncmlnaHQnXG4gICAgPyAncmlnaHQnXG4gICAgOiBtb2RlID09PSAnYWx0ZXJuYXRlJyAmJiBpbmRleCAlIDIgPT09IDBcbiAgICA/ICdsZWZ0J1xuICAgIDogJ3JpZ2h0Jztcbn1cbiJdfQ==