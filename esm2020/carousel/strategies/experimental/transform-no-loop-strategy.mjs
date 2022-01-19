/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Subject } from 'rxjs';
import { NzCarouselBaseStrategy } from '../base-strategy';
/**
 * this strategy is very much like NzCarouselTransformStrategy, but it doesn't loop between the first and the last one
 */
export class NzCarouselTransformNoLoopStrategy extends NzCarouselBaseStrategy {
    constructor(carouselComponent, cdr, renderer, platform, options) {
        super(carouselComponent, cdr, renderer, platform, options);
        this.isTransitioning = false;
    }
    get vertical() {
        return this.carouselComponent.vertical;
    }
    dispose() {
        this.renderer.setStyle(this.slickTrackEl, 'transform', null);
        super.dispose();
    }
    withCarouselContents(contents) {
        super.withCarouselContents(contents);
        const carousel = this.carouselComponent;
        const activeIndex = carousel.activeIndex;
        if (this.platform.isBrowser && this.contents.length) {
            this.renderer.setStyle(this.slickListEl, 'height', `${this.unitHeight}px`);
            if (this.platform.isBrowser && this.contents.length) {
                this.renderer.setStyle(this.slickListEl, 'height', `${this.unitHeight}px`);
                if (this.vertical) {
                    this.renderer.setStyle(this.slickTrackEl, 'width', `${this.unitWidth}px`);
                    this.renderer.setStyle(this.slickTrackEl, 'height', `${this.length * this.unitHeight}px`);
                    this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-activeIndex * this.unitHeight}px, 0)`);
                }
                else {
                    this.renderer.setStyle(this.slickTrackEl, 'height', `${this.unitHeight}px`);
                    this.renderer.setStyle(this.slickTrackEl, 'width', `${this.length * this.unitWidth}px`);
                    this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-activeIndex * this.unitWidth}px, 0, 0)`);
                }
                this.contents.forEach((content) => {
                    this.renderer.setStyle(content.el, 'position', 'relative');
                    this.renderer.setStyle(content.el, 'width', `${this.unitWidth}px`);
                    this.renderer.setStyle(content.el, 'height', `${this.unitHeight}px`);
                });
            }
        }
    }
    switch(_f, _t) {
        const to = (_t + this.length) % this.length;
        const transitionSpeed = this.carouselComponent.nzTransitionSpeed;
        const complete$ = new Subject();
        this.renderer.setStyle(this.slickTrackEl, 'transition', `transform ${transitionSpeed}ms ease`);
        if (this.vertical) {
            this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-to * this.unitHeight}px, 0)`);
        }
        else {
            this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-to * this.unitWidth}px, 0, 0)`);
        }
        this.isTransitioning = true;
        setTimeout(() => {
            // this strategy don't need to do a following adjust
            this.isTransitioning = false;
            complete$.next();
            complete$.complete();
        }, transitionSpeed);
        return complete$.asObservable();
    }
    dragging(vector) {
        if (this.isTransitioning) {
            return;
        }
        const activeIndex = this.carouselComponent.activeIndex;
        if (this.vertical) {
            this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-activeIndex * this.unitHeight + vector.x}px, 0)`);
        }
        else {
            this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-activeIndex * this.unitWidth + vector.x}px, 0, 0)`);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLW5vLWxvb3Atc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL2Nhcm91c2VsL3N0cmF0ZWdpZXMvZXhwZXJpbWVudGFsL3RyYW5zZm9ybS1uby1sb29wLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUlILE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFNMUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8saUNBQWtDLFNBQVEsc0JBQWdFO0lBT3JILFlBQ0UsaUJBQThDLEVBQzlDLEdBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLFFBQWtCLEVBQ2xCLE9BQWtEO1FBRWxELEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQWJyRCxvQkFBZSxHQUFHLEtBQUssQ0FBQztJQWNoQyxDQUFDO0lBWkQsSUFBWSxRQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFrQixDQUFDLFFBQVEsQ0FBQztJQUMxQyxDQUFDO0lBWVEsT0FBTztRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTdELEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRVEsb0JBQW9CLENBQUMsUUFBc0Q7UUFDbEYsS0FBSyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXJDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBa0IsQ0FBQztRQUN6QyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBRXpDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFT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QztTQUNIO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE56Q2Fyb3VzZWxDb250ZW50RGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY2Fyb3VzZWwtY29udGVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpDYXJvdXNlbENvbXBvbmVudEFzU291cmNlLCBQb2ludGVyVmVjdG9yIH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBOekNhcm91c2VsQmFzZVN0cmF0ZWd5IH0gZnJvbSAnLi4vYmFzZS1zdHJhdGVneSc7XG5cbmludGVyZmFjZSBOekNhcm91c2VsVHJhbnNmb3JtT25Mb29wU3RyYXRlZ3lPcHRpb25zIHtcbiAgZGlyZWN0aW9uOiAnbGVmdCcgfCAncmlnaHQnO1xufVxuXG4vKipcbiAqIHRoaXMgc3RyYXRlZ3kgaXMgdmVyeSBtdWNoIGxpa2UgTnpDYXJvdXNlbFRyYW5zZm9ybVN0cmF0ZWd5LCBidXQgaXQgZG9lc24ndCBsb29wIGJldHdlZW4gdGhlIGZpcnN0IGFuZCB0aGUgbGFzdCBvbmVcbiAqL1xuZXhwb3J0IGNsYXNzIE56Q2Fyb3VzZWxUcmFuc2Zvcm1Ob0xvb3BTdHJhdGVneSBleHRlbmRzIE56Q2Fyb3VzZWxCYXNlU3RyYXRlZ3k8TnpDYXJvdXNlbFRyYW5zZm9ybU9uTG9vcFN0cmF0ZWd5T3B0aW9ucz4ge1xuICBwcml2YXRlIGlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgZ2V0IHZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNhcm91c2VsQ29tcG9uZW50IS52ZXJ0aWNhbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNhcm91c2VsQ29tcG9uZW50OiBOekNhcm91c2VsQ29tcG9uZW50QXNTb3VyY2UsXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBvcHRpb25zPzogTnpDYXJvdXNlbFRyYW5zZm9ybU9uTG9vcFN0cmF0ZWd5T3B0aW9uc1xuICApIHtcbiAgICBzdXBlcihjYXJvdXNlbENvbXBvbmVudCwgY2RyLCByZW5kZXJlciwgcGxhdGZvcm0sIG9wdGlvbnMpO1xuICB9XG5cbiAgb3ZlcnJpZGUgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2xpY2tUcmFja0VsLCAndHJhbnNmb3JtJywgbnVsbCk7XG5cbiAgICBzdXBlci5kaXNwb3NlKCk7XG4gIH1cblxuICBvdmVycmlkZSB3aXRoQ2Fyb3VzZWxDb250ZW50cyhjb250ZW50czogUXVlcnlMaXN0PE56Q2Fyb3VzZWxDb250ZW50RGlyZWN0aXZlPiB8IG51bGwpOiB2b2lkIHtcbiAgICBzdXBlci53aXRoQ2Fyb3VzZWxDb250ZW50cyhjb250ZW50cyk7XG5cbiAgICBjb25zdCBjYXJvdXNlbCA9IHRoaXMuY2Fyb3VzZWxDb21wb25lbnQhO1xuICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gY2Fyb3VzZWwuYWN0aXZlSW5kZXg7XG5cbiAgICBpZiAodGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIgJiYgdGhpcy5jb250ZW50cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zbGlja0xpc3RFbCwgJ2hlaWdodCcsIGAke3RoaXMudW5pdEhlaWdodH1weGApO1xuXG4gICAgICBpZiAodGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIgJiYgdGhpcy5jb250ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNsaWNrTGlzdEVsLCAnaGVpZ2h0JywgYCR7dGhpcy51bml0SGVpZ2h0fXB4YCk7XG5cbiAgICAgICAgaWYgKHRoaXMudmVydGljYWwpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2xpY2tUcmFja0VsLCAnd2lkdGgnLCBgJHt0aGlzLnVuaXRXaWR0aH1weGApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zbGlja1RyYWNrRWwsICdoZWlnaHQnLCBgJHt0aGlzLmxlbmd0aCAqIHRoaXMudW5pdEhlaWdodH1weGApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICB0aGlzLnNsaWNrVHJhY2tFbCxcbiAgICAgICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgYHRyYW5zbGF0ZTNkKDAsICR7LWFjdGl2ZUluZGV4ICogdGhpcy51bml0SGVpZ2h0fXB4LCAwKWBcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zbGlja1RyYWNrRWwsICdoZWlnaHQnLCBgJHt0aGlzLnVuaXRIZWlnaHR9cHhgKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2xpY2tUcmFja0VsLCAnd2lkdGgnLCBgJHt0aGlzLmxlbmd0aCAqIHRoaXMudW5pdFdpZHRofXB4YCk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIHRoaXMuc2xpY2tUcmFja0VsLFxuICAgICAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICBgdHJhbnNsYXRlM2QoJHstYWN0aXZlSW5kZXggKiB0aGlzLnVuaXRXaWR0aH1weCwgMCwgMClgXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGVudHMuZm9yRWFjaCgoY29udGVudDogTnpDYXJvdXNlbENvbnRlbnREaXJlY3RpdmUpID0+IHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRlbnQuZWwsICdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGVudC5lbCwgJ3dpZHRoJywgYCR7dGhpcy51bml0V2lkdGh9cHhgKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRlbnQuZWwsICdoZWlnaHQnLCBgJHt0aGlzLnVuaXRIZWlnaHR9cHhgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoKF9mOiBudW1iZXIsIF90OiBudW1iZXIpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBjb25zdCB0byA9IChfdCArIHRoaXMubGVuZ3RoKSAlIHRoaXMubGVuZ3RoO1xuICAgIGNvbnN0IHRyYW5zaXRpb25TcGVlZCA9IHRoaXMuY2Fyb3VzZWxDb21wb25lbnQhLm56VHJhbnNpdGlvblNwZWVkO1xuICAgIGNvbnN0IGNvbXBsZXRlJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2xpY2tUcmFja0VsLCAndHJhbnNpdGlvbicsIGB0cmFuc2Zvcm0gJHt0cmFuc2l0aW9uU3BlZWR9bXMgZWFzZWApO1xuXG4gICAgaWYgKHRoaXMudmVydGljYWwpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zbGlja1RyYWNrRWwsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlM2QoMCwgJHstdG8gKiB0aGlzLnVuaXRIZWlnaHR9cHgsIDApYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zbGlja1RyYWNrRWwsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlM2QoJHstdG8gKiB0aGlzLnVuaXRXaWR0aH1weCwgMCwgMClgKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIHRoaXMgc3RyYXRlZ3kgZG9uJ3QgbmVlZCB0byBkbyBhIGZvbGxvd2luZyBhZGp1c3RcbiAgICAgIHRoaXMuaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cbiAgICAgIGNvbXBsZXRlJC5uZXh0KCk7XG4gICAgICBjb21wbGV0ZSQuY29tcGxldGUoKTtcbiAgICB9LCB0cmFuc2l0aW9uU3BlZWQpO1xuXG4gICAgcmV0dXJuIGNvbXBsZXRlJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGRyYWdnaW5nKHZlY3RvcjogUG9pbnRlclZlY3Rvcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzVHJhbnNpdGlvbmluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gdGhpcy5jYXJvdXNlbENvbXBvbmVudCEuYWN0aXZlSW5kZXg7XG5cbiAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5zbGlja1RyYWNrRWwsXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICBgdHJhbnNsYXRlM2QoMCwgJHstYWN0aXZlSW5kZXggKiB0aGlzLnVuaXRIZWlnaHQgKyB2ZWN0b3IueH1weCwgMClgXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICB0aGlzLnNsaWNrVHJhY2tFbCxcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgIGB0cmFuc2xhdGUzZCgkey1hY3RpdmVJbmRleCAqIHRoaXMudW5pdFdpZHRoICsgdmVjdG9yLnh9cHgsIDAsIDApYFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==