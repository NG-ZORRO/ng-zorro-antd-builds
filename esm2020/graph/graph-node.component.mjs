import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { animate, group, query, style } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations";
import * as i2 from "./graph";
import * as i3 from "@angular/common";
export class NzGraphNodeComponent {
    constructor(ngZone, el, builder, renderer2, graphComponent) {
        this.ngZone = ngZone;
        this.el = el;
        this.builder = builder;
        this.renderer2 = renderer2;
        this.graphComponent = graphComponent;
        this.animationInfo = null;
        this.initialState = true;
        this.destroy$ = new Subject();
        this.animationPlayer = null;
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.el.nativeElement, 'click')
                .pipe(filter(event => {
                event.preventDefault();
                return this.graphComponent.nzNodeClick.observers.length > 0;
            }), takeUntil(this.destroy$))
                .subscribe(() => {
                // Re-enter the Angular zone and run the change detection only if there're any `nzNodeClick` listeners,
                // e.g.: `<nz-graph (nzNodeClick)="..."></nz-graph>`.
                this.ngZone.run(() => this.graphComponent.nzNodeClick.emit(this.node));
            });
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    makeAnimation() {
        const cur = this.getAnimationInfo();
        if (this.animationPlayer) {
            this.animationPlayer.destroy();
        }
        let animationFactory;
        const pre = { ...this.animationInfo };
        if (this.initialState) {
            animationFactory = this.builder.build([
                style({ transform: `translate(${cur.x}px, ${cur.y}px)` }),
                query('g', [
                    style({
                        width: `${cur.width}px`,
                        height: `${cur.height}px`
                    })
                ])
            ]);
            this.initialState = false;
        }
        else {
            animationFactory = this.builder.build([
                style({ transform: `translate(${pre.x}px, ${pre.y}px)` }),
                query('g', [
                    style({
                        width: `${pre.width}px`,
                        height: `${pre.height}px`
                    })
                ]),
                group([
                    query('g', [
                        animate('150ms ease-out', style({
                            width: `${cur.width}px`,
                            height: `${cur.height}px`
                        }))
                    ]),
                    animate('150ms ease-out', style({ transform: `translate(${cur.x}px, ${cur.y}px)` }))
                ])
            ]);
        }
        this.animationInfo = cur;
        this.animationPlayer = animationFactory.create(this.el.nativeElement);
        this.animationPlayer.play();
        const done$ = new Subject();
        this.animationPlayer.onDone(() => {
            // Need this for canvas for now.
            this.renderer2.setAttribute(this.el.nativeElement, 'transform', `translate(${cur.x}, ${cur.y})`);
            done$.next();
            done$.complete();
        });
        return done$.asObservable();
    }
    makeNoAnimation() {
        const cur = this.getAnimationInfo();
        // Need this for canvas for now.
        this.renderer2.setAttribute(this.el.nativeElement, 'transform', `translate(${cur.x}, ${cur.y})`);
    }
    getAnimationInfo() {
        const { x, y } = this.nodeTransform();
        return {
            width: this.node.width,
            height: this.node.height,
            x,
            y
        };
    }
    nodeTransform() {
        const x = this.computeCXPositionOfNodeShape() - this.node.width / 2;
        const y = this.node.y - this.node.height / 2;
        return { x, y };
    }
    computeCXPositionOfNodeShape() {
        if (this.node.expanded) {
            return this.node.x;
        }
        return this.node.x - this.node.width / 2 + this.node.coreBox.width / 2;
    }
}
NzGraphNodeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphNodeComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i1.AnimationBuilder }, { token: i0.Renderer2 }, { token: i2.NzGraph }], target: i0.ɵɵFactoryTarget.Component });
NzGraphNodeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzGraphNodeComponent, selector: "[nz-graph-node]", inputs: { node: "node", noAnimation: "noAnimation", customTemplate: "customTemplate" }, host: { properties: { "id": "node.id || node.name", "class.nz-graph-node-expanded": "node.expanded", "class.nz-graph-group-node": "node.type===0", "class.nz-graph-base-node": "node.type===1" } }, ngImport: i0, template: `
    <svg:g>
      <ng-container
        *ngIf="customTemplate"
        [ngTemplateOutlet]="customTemplate"
        [ngTemplateOutletContext]="{ $implicit: node }"
      ></ng-container>
      <ng-container *ngIf="!customTemplate">
        <svg:rect class="nz-graph-node-rect" [attr.width]="node.width" [attr.height]="node.height"></svg:rect>
        <svg:text x="10" y="20">{{ node.id || node.name }}</svg:text>
      </ng-container>
    </svg:g>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean()
], NzGraphNodeComponent.prototype, "noAnimation", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphNodeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-graph-node]',
                    template: `
    <svg:g>
      <ng-container
        *ngIf="customTemplate"
        [ngTemplateOutlet]="customTemplate"
        [ngTemplateOutletContext]="{ $implicit: node }"
      ></ng-container>
      <ng-container *ngIf="!customTemplate">
        <svg:rect class="nz-graph-node-rect" [attr.width]="node.width" [attr.height]="node.height"></svg:rect>
        <svg:text x="10" y="20">{{ node.id || node.name }}</svg:text>
      </ng-container>
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[id]': 'node.id || node.name',
                        '[class.nz-graph-node-expanded]': 'node.expanded',
                        '[class.nz-graph-group-node]': 'node.type===0',
                        '[class.nz-graph-base-node]': 'node.type===1'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i1.AnimationBuilder }, { type: i0.Renderer2 }, { type: i2.NzGraph }]; }, propDecorators: { node: [{
                type: Input
            }], noAnimation: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtbm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2dyYXBoL2dyYXBoLW5vZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsT0FBTyxFQUF1RCxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULEtBQUssRUFNTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFrQ3ZELE1BQU0sT0FBTyxvQkFBb0I7SUFhL0IsWUFDVSxNQUFjLEVBQ2QsRUFBMkIsRUFDM0IsT0FBeUIsRUFDekIsU0FBb0IsRUFDcEIsY0FBdUI7UUFKdkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLE9BQUUsR0FBRixFQUFFLENBQXlCO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsbUJBQWMsR0FBZCxjQUFjLENBQVM7UUFYakMsa0JBQWEsR0FBZ0IsSUFBSSxDQUFDO1FBQ2xDLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBRVosYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDL0Isb0JBQWUsR0FBMkIsSUFBSSxDQUFDO0lBUXBELENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDakMsU0FBUyxDQUFhLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFF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LEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCw0QkFBNEI7UUFDMUIsSUFBSyxJQUFJLENBQUMsSUFBeUIsQ0FBQyxRQUFRLEVBQUU7WUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNwQjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDekUsQ0FBQzs7aUhBN0hVLG9CQUFvQjtxR0FBcEIsb0JBQW9CLG1WQXJCckI7Ozs7Ozs7Ozs7OztHQVlUO0FBV3dCO0lBQWYsWUFBWSxFQUFFO3lEQUF1QjsyRkFGcEMsb0JBQW9CO2tCQXZCaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLHNCQUFzQjt3QkFDOUIsZ0NBQWdDLEVBQUUsZUFBZTt3QkFDakQsNkJBQTZCLEVBQUUsZUFBZTt3QkFDOUMsNEJBQTRCLEVBQUUsZUFBZTtxQkFDOUM7aUJBQ0Y7bU1BRVUsSUFBSTtzQkFBWixLQUFLO2dCQUNtQixXQUFXO3NCQUFuQyxLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25CdWlsZGVyLCBBbmltYXRpb25GYWN0b3J5LCBBbmltYXRpb25QbGF5ZXIsIGdyb3VwLCBxdWVyeSwgc3R5bGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBOekdyYXBoIH0gZnJvbSAnLi9ncmFwaCc7XG5pbXBvcnQgeyBOekdyYXBoR3JvdXBOb2RlLCBOekdyYXBoTm9kZSB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuaW50ZXJmYWNlIEluZm8ge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbnotZ3JhcGgtbm9kZV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6Zz5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgKm5nSWY9XCJjdXN0b21UZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBub2RlIH1cIlxuICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjdXN0b21UZW1wbGF0ZVwiPlxuICAgICAgICA8c3ZnOnJlY3QgY2xhc3M9XCJuei1ncmFwaC1ub2RlLXJlY3RcIiBbYXR0ci53aWR0aF09XCJub2RlLndpZHRoXCIgW2F0dHIuaGVpZ2h0XT1cIm5vZGUuaGVpZ2h0XCI+PC9zdmc6cmVjdD5cbiAgICAgICAgPHN2Zzp0ZXh0IHg9XCIxMFwiIHk9XCIyMFwiPnt7IG5vZGUuaWQgfHwgbm9kZS5uYW1lIH19PC9zdmc6dGV4dD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ1tpZF0nOiAnbm9kZS5pZCB8fCBub2RlLm5hbWUnLFxuICAgICdbY2xhc3MubnotZ3JhcGgtbm9kZS1leHBhbmRlZF0nOiAnbm9kZS5leHBhbmRlZCcsXG4gICAgJ1tjbGFzcy5uei1ncmFwaC1ncm91cC1ub2RlXSc6ICdub2RlLnR5cGU9PT0wJyxcbiAgICAnW2NsYXNzLm56LWdyYXBoLWJhc2Utbm9kZV0nOiAnbm9kZS50eXBlPT09MSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekdyYXBoTm9kZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgbm9kZSE6IE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG5vQW5pbWF0aW9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjx7XG4gICAgJGltcGxpY2l0OiBOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGU7XG4gIH0+O1xuXG4gIGFuaW1hdGlvbkluZm86IEluZm8gfCBudWxsID0gbnVsbDtcbiAgaW5pdGlhbFN0YXRlID0gdHJ1ZTtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBhbmltYXRpb25QbGF5ZXI6IEFuaW1hdGlvblBsYXllciB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBidWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLFxuICAgIHByaXZhdGUgcmVuZGVyZXIyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBncmFwaENvbXBvbmVudDogTnpHcmFwaFxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2NsaWNrJylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ncmFwaENvbXBvbmVudC5uek5vZGVDbGljay5vYnNlcnZlcnMubGVuZ3RoID4gMDtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAvLyBSZS1lbnRlciB0aGUgQW5ndWxhciB6b25lIGFuZCBydW4gdGhlIGNoYW5nZSBkZXRlY3Rpb24gb25seSBpZiB0aGVyZSdyZSBhbnkgYG56Tm9kZUNsaWNrYCBsaXN0ZW5lcnMsXG4gICAgICAgICAgLy8gZS5nLjogYDxuei1ncmFwaCAobnpOb2RlQ2xpY2spPVwiLi4uXCI+PC9uei1ncmFwaD5gLlxuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmdyYXBoQ29tcG9uZW50Lm56Tm9kZUNsaWNrLmVtaXQodGhpcy5ub2RlKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gIH1cblxuICBtYWtlQW5pbWF0aW9uKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGNvbnN0IGN1ciA9IHRoaXMuZ2V0QW5pbWF0aW9uSW5mbygpO1xuICAgIGlmICh0aGlzLmFuaW1hdGlvblBsYXllcikge1xuICAgICAgdGhpcy5hbmltYXRpb25QbGF5ZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgICBsZXQgYW5pbWF0aW9uRmFjdG9yeTogQW5pbWF0aW9uRmFjdG9yeTtcbiAgICBjb25zdCBwcmUgPSB7IC4uLnRoaXMuYW5pbWF0aW9uSW5mbyB9IGFzIEluZm87XG5cbiAgICBpZiAodGhpcy5pbml0aWFsU3RhdGUpIHtcbiAgICAgIGFuaW1hdGlvbkZhY3RvcnkgPSB0aGlzLmJ1aWxkZXIuYnVpbGQoW1xuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke2N1ci54fXB4LCAke2N1ci55fXB4KWAgfSksXG4gICAgICAgIHF1ZXJ5KCdnJywgW1xuICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgIHdpZHRoOiBgJHtjdXIud2lkdGh9cHhgLFxuICAgICAgICAgICAgaGVpZ2h0OiBgJHtjdXIuaGVpZ2h0fXB4YFxuICAgICAgICAgIH0pXG4gICAgICAgIF0pXG4gICAgICBdKTtcbiAgICAgIHRoaXMuaW5pdGlhbFN0YXRlID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFuaW1hdGlvbkZhY3RvcnkgPSB0aGlzLmJ1aWxkZXIuYnVpbGQoW1xuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke3ByZSEueH1weCwgJHtwcmUhLnl9cHgpYCB9KSxcbiAgICAgICAgcXVlcnkoJ2cnLCBbXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgd2lkdGg6IGAke3ByZSEud2lkdGh9cHhgLFxuICAgICAgICAgICAgaGVpZ2h0OiBgJHtwcmUhLmhlaWdodH1weGBcbiAgICAgICAgICB9KVxuICAgICAgICBdKSxcbiAgICAgICAgZ3JvdXAoW1xuICAgICAgICAgIHF1ZXJ5KCdnJywgW1xuICAgICAgICAgICAgYW5pbWF0ZShcbiAgICAgICAgICAgICAgJzE1MG1zIGVhc2Utb3V0JyxcbiAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHdpZHRoOiBgJHtjdXIud2lkdGh9cHhgLFxuICAgICAgICAgICAgICAgIGhlaWdodDogYCR7Y3VyLmhlaWdodH1weGBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBhbmltYXRlKCcxNTBtcyBlYXNlLW91dCcsIHN0eWxlKHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7Y3VyLnh9cHgsICR7Y3VyLnl9cHgpYCB9KSlcbiAgICAgICAgXSlcbiAgICAgIF0pO1xuICAgIH1cbiAgICB0aGlzLmFuaW1hdGlvbkluZm8gPSBjdXI7XG4gICAgdGhpcy5hbmltYXRpb25QbGF5ZXIgPSBhbmltYXRpb25GYWN0b3J5LmNyZWF0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuYW5pbWF0aW9uUGxheWVyLnBsYXkoKTtcbiAgICBjb25zdCBkb25lJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgdGhpcy5hbmltYXRpb25QbGF5ZXIub25Eb25lKCgpID0+IHtcbiAgICAgIC8vIE5lZWQgdGhpcyBmb3IgY2FudmFzIGZvciBub3cuXG4gICAgICB0aGlzLnJlbmRlcmVyMi5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke2N1ci54fSwgJHtjdXIueX0pYCk7XG4gICAgICBkb25lJC5uZXh0KCk7XG4gICAgICBkb25lJC5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICAgIHJldHVybiBkb25lJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG1ha2VOb0FuaW1hdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBjdXIgPSB0aGlzLmdldEFuaW1hdGlvbkluZm8oKTtcbiAgICAvLyBOZWVkIHRoaXMgZm9yIGNhbnZhcyBmb3Igbm93LlxuICAgIHRoaXMucmVuZGVyZXIyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7Y3VyLnh9LCAke2N1ci55fSlgKTtcbiAgfVxuXG4gIGdldEFuaW1hdGlvbkluZm8oKTogSW5mbyB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLm5vZGVUcmFuc2Zvcm0oKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMubm9kZS53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5ub2RlLmhlaWdodCxcbiAgICAgIHgsXG4gICAgICB5XG4gICAgfTtcbiAgfVxuXG4gIG5vZGVUcmFuc2Zvcm0oKTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHtcbiAgICBjb25zdCB4ID0gdGhpcy5jb21wdXRlQ1hQb3NpdGlvbk9mTm9kZVNoYXBlKCkgLSB0aGlzLm5vZGUud2lkdGggLyAyO1xuICAgIGNvbnN0IHkgPSB0aGlzLm5vZGUueSAtIHRoaXMubm9kZS5oZWlnaHQgLyAyO1xuICAgIHJldHVybiB7IHgsIHkgfTtcbiAgfVxuXG4gIGNvbXB1dGVDWFBvc2l0aW9uT2ZOb2RlU2hhcGUoKTogbnVtYmVyIHtcbiAgICBpZiAoKHRoaXMubm9kZSBhcyBOekdyYXBoR3JvdXBOb2RlKS5leHBhbmRlZCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS54O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ub2RlLnggLSB0aGlzLm5vZGUud2lkdGggLyAyICsgdGhpcy5ub2RlLmNvcmVCb3gud2lkdGggLyAyO1xuICB9XG59XG4iXX0=