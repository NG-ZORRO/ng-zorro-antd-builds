/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { animate, AnimationBuilder, group, query, style } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
export class NzGraphNodeDirective {
    constructor(el, builder, renderer2) {
        this.el = el;
        this.builder = builder;
        this.renderer2 = renderer2;
        this.nodeClick = new EventEmitter();
        this.animationInfo = null;
        this.animationPlayer = null;
    }
    onTriggerClick(event) {
        event.preventDefault();
        this.nodeClick.emit(this.node);
    }
    makeAnimation(isFirstChange = false) {
        if (this.animationPlayer) {
            this.animationPlayer.destroy();
        }
        let animationFactory;
        const cur = this.getAnimationInfo();
        const pre = Object.assign({}, this.animationInfo);
        if (isFirstChange) {
            animationFactory = this.builder.build([
                style({ transform: `translate(${cur.x}px, ${cur.y}px)` }),
                query('.nz-graph-node-rect', [
                    style({
                        width: `${cur.width}px`,
                        height: `${cur.height}px`
                    })
                ])
            ]);
        }
        else {
            animationFactory = this.builder.build([
                style({ transform: `translate(${pre.x}px, ${pre.y}px)` }),
                query('.nz-graph-node-rect', [
                    style({
                        width: `${pre.width}px`,
                        height: `${pre.height}px`
                    })
                ]),
                group([
                    query('.nz-graph-node-rect', [
                        animate('150ms ease-out', style({
                            width: `${cur.width}px`,
                            height: `${cur.height}px`
                        }))
                    ]),
                    animate('150ms ease-out', style({ transform: `translate(${cur.x}px, ${cur.y}px)` }))
                ])
            ]);
        }
        const done$ = new Subject();
        this.animationInfo = cur;
        this.animationPlayer = animationFactory.create(this.el.nativeElement);
        this.animationPlayer.play();
        this.animationPlayer.onDone(() => {
            // Need this for canvas for now.
            this.renderer2.setAttribute(this.el.nativeElement, 'transform', `translate(${cur.x}, ${cur.y})`);
            done$.next();
            done$.complete();
        });
        return done$.asObservable();
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
    ngAfterViewInit() {
        this.makeAnimation(true);
    }
}
NzGraphNodeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'svg:g[nz-graph-node]',
                host: {
                    '[id]': 'node.id || node.name',
                    '[class.nz-graph-node-expanded]': 'node.expanded',
                    '[class.nz-graph-group-node]': 'node.type===0',
                    '[class.nz-graph-base-node]': 'node.type===1',
                    '(click)': 'onTriggerClick($event)'
                }
            },] }
];
NzGraphNodeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: AnimationBuilder },
    { type: Renderer2 }
];
NzGraphNodeDirective.propDecorators = {
    node: [{ type: Input }],
    nodeClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtbm9kZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2dyYXBoLyIsInNvdXJjZXMiOlsiZ3JhcGgtbm9kZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBcUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4SCxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdHLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFvQjNDLE1BQU0sT0FBTyxvQkFBb0I7SUFhL0IsWUFBb0IsRUFBYyxFQUFVLE9BQXlCLEVBQVUsU0FBb0I7UUFBL0UsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVhoRixjQUFTLEdBQWlELElBQUksWUFBWSxFQUFFLENBQUM7UUFPaEcsa0JBQWEsR0FBZ0IsSUFBSSxDQUFDO1FBRTFCLG9CQUFlLEdBQTJCLElBQUksQ0FBQztJQUUrQyxDQUFDO0lBVHZHLGNBQWMsQ0FBQyxLQUFpQjtRQUM5QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFRRCxhQUFhLENBQUMsZ0JBQXlCLEtBQUs7UUFDMUMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEM7UUFDRCxJQUFJLGdCQUFrQyxDQUFDO1FBQ3ZDLE1BQU0sR0FB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QUcsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCw0QkFBNEI7UUFDMUIsSUFBSyxJQUFJLENBQUMsSUFBeUIsQ0FBQyxRQUFRLEVBQUU7WUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNwQjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7OztZQXhHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsSUFBSSxFQUFFO29CQUNKLE1BQU0sRUFBRSxzQkFBc0I7b0JBQzlCLGdDQUFnQyxFQUFFLGVBQWU7b0JBQ2pELDZCQUE2QixFQUFFLGVBQWU7b0JBQzlDLDRCQUE0QixFQUFFLGVBQWU7b0JBQzdDLFNBQVMsRUFBRSx3QkFBd0I7aUJBQ3BDO2FBQ0Y7OztZQXBCa0MsVUFBVTtZQUQzQixnQkFBZ0I7WUFDMEMsU0FBUzs7O21CQXNCbEYsS0FBSzt3QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uQnVpbGRlciwgQW5pbWF0aW9uRmFjdG9yeSwgQW5pbWF0aW9uUGxheWVyLCBncm91cCwgcXVlcnksIHN0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOekdyYXBoR3JvdXBOb2RlLCBOekdyYXBoTm9kZSB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuaW50ZXJmYWNlIEluZm8ge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3N2ZzpnW256LWdyYXBoLW5vZGVdJyxcbiAgaG9zdDoge1xuICAgICdbaWRdJzogJ25vZGUuaWQgfHwgbm9kZS5uYW1lJyxcbiAgICAnW2NsYXNzLm56LWdyYXBoLW5vZGUtZXhwYW5kZWRdJzogJ25vZGUuZXhwYW5kZWQnLFxuICAgICdbY2xhc3MubnotZ3JhcGgtZ3JvdXAtbm9kZV0nOiAnbm9kZS50eXBlPT09MCcsXG4gICAgJ1tjbGFzcy5uei1ncmFwaC1iYXNlLW5vZGVdJzogJ25vZGUudHlwZT09PTEnLFxuICAgICcoY2xpY2spJzogJ29uVHJpZ2dlckNsaWNrKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpHcmFwaE5vZGVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbm9kZSE6IE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG5vZGVDbGljazogRXZlbnRFbWl0dGVyPE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgb25UcmlnZ2VyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMubm9kZUNsaWNrLmVtaXQodGhpcy5ub2RlKTtcbiAgfVxuXG4gIGFuaW1hdGlvbkluZm86IEluZm8gfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIGFuaW1hdGlvblBsYXllcjogQW5pbWF0aW9uUGxheWVyIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBidWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLCBwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyKSB7fVxuXG4gIG1ha2VBbmltYXRpb24oaXNGaXJzdENoYW5nZTogYm9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uUGxheWVyKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvblBsYXllci5kZXN0cm95KCk7XG4gICAgfVxuICAgIGxldCBhbmltYXRpb25GYWN0b3J5OiBBbmltYXRpb25GYWN0b3J5O1xuICAgIGNvbnN0IGN1ciA9IHRoaXMuZ2V0QW5pbWF0aW9uSW5mbygpO1xuICAgIGNvbnN0IHByZSA9IHsgLi4udGhpcy5hbmltYXRpb25JbmZvIH0gYXMgSW5mbztcblxuICAgIGlmIChpc0ZpcnN0Q2hhbmdlKSB7XG4gICAgICBhbmltYXRpb25GYWN0b3J5ID0gdGhpcy5idWlsZGVyLmJ1aWxkKFtcbiAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtjdXIueH1weCwgJHtjdXIueX1weClgIH0pLFxuICAgICAgICBxdWVyeSgnLm56LWdyYXBoLW5vZGUtcmVjdCcsIFtcbiAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICB3aWR0aDogYCR7Y3VyLndpZHRofXB4YCxcbiAgICAgICAgICAgIGhlaWdodDogYCR7Y3VyLmhlaWdodH1weGBcbiAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgICAgXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFuaW1hdGlvbkZhY3RvcnkgPSB0aGlzLmJ1aWxkZXIuYnVpbGQoW1xuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke3ByZSEueH1weCwgJHtwcmUhLnl9cHgpYCB9KSxcbiAgICAgICAgcXVlcnkoJy5uei1ncmFwaC1ub2RlLXJlY3QnLCBbXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgd2lkdGg6IGAke3ByZSEud2lkdGh9cHhgLFxuICAgICAgICAgICAgaGVpZ2h0OiBgJHtwcmUhLmhlaWdodH1weGBcbiAgICAgICAgICB9KVxuICAgICAgICBdKSxcbiAgICAgICAgZ3JvdXAoW1xuICAgICAgICAgIHF1ZXJ5KCcubnotZ3JhcGgtbm9kZS1yZWN0JywgW1xuICAgICAgICAgICAgYW5pbWF0ZShcbiAgICAgICAgICAgICAgJzE1MG1zIGVhc2Utb3V0JyxcbiAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHdpZHRoOiBgJHtjdXIud2lkdGh9cHhgLFxuICAgICAgICAgICAgICAgIGhlaWdodDogYCR7Y3VyLmhlaWdodH1weGBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBhbmltYXRlKCcxNTBtcyBlYXNlLW91dCcsIHN0eWxlKHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7Y3VyLnh9cHgsICR7Y3VyLnl9cHgpYCB9KSlcbiAgICAgICAgXSlcbiAgICAgIF0pO1xuICAgIH1cbiAgICBjb25zdCBkb25lJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgdGhpcy5hbmltYXRpb25JbmZvID0gY3VyO1xuICAgIHRoaXMuYW5pbWF0aW9uUGxheWVyID0gYW5pbWF0aW9uRmFjdG9yeS5jcmVhdGUodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmFuaW1hdGlvblBsYXllci5wbGF5KCk7XG4gICAgdGhpcy5hbmltYXRpb25QbGF5ZXIub25Eb25lKCgpID0+IHtcbiAgICAgIC8vIE5lZWQgdGhpcyBmb3IgY2FudmFzIGZvciBub3cuXG4gICAgICB0aGlzLnJlbmRlcmVyMi5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke2N1ci54fSwgJHtjdXIueX0pYCk7XG4gICAgICBkb25lJC5uZXh0KCk7XG4gICAgICBkb25lJC5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICAgIHJldHVybiBkb25lJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldEFuaW1hdGlvbkluZm8oKTogSW5mbyB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLm5vZGVUcmFuc2Zvcm0oKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMubm9kZS53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5ub2RlLmhlaWdodCxcbiAgICAgIHgsXG4gICAgICB5XG4gICAgfTtcbiAgfVxuXG4gIG5vZGVUcmFuc2Zvcm0oKTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHtcbiAgICBjb25zdCB4ID0gdGhpcy5jb21wdXRlQ1hQb3NpdGlvbk9mTm9kZVNoYXBlKCkgLSB0aGlzLm5vZGUud2lkdGggLyAyO1xuICAgIGNvbnN0IHkgPSB0aGlzLm5vZGUueSAtIHRoaXMubm9kZS5oZWlnaHQgLyAyO1xuICAgIHJldHVybiB7IHgsIHkgfTtcbiAgfVxuXG4gIGNvbXB1dGVDWFBvc2l0aW9uT2ZOb2RlU2hhcGUoKTogbnVtYmVyIHtcbiAgICBpZiAoKHRoaXMubm9kZSBhcyBOekdyYXBoR3JvdXBOb2RlKS5leHBhbmRlZCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS54O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ub2RlLnggLSB0aGlzLm5vZGUud2lkdGggLyAyICsgdGhpcy5ub2RlLmNvcmVCb3gud2lkdGggLyAyO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubWFrZUFuaW1hdGlvbih0cnVlKTtcbiAgfVxufVxuIl19