import * as i4 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i2 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, InjectionToken, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, Inject, ContentChildren, ViewChild, Input, Output, NgModule } from '@angular/core';
import { __decorate } from 'tslib';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Subject, fromEvent, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import * as i3 from 'ng-zorro-antd/core/services';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCarouselContentDirective {
    constructor(elementRef, renderer) {
        this.renderer = renderer;
        this._active = false;
        this.el = elementRef.nativeElement;
        this.renderer.addClass(elementRef.nativeElement, 'slick-slide');
    }
    set isActive(value) {
        this._active = value;
        if (this.isActive) {
            this.renderer.addClass(this.el, 'slick-active');
        }
        else {
            this.renderer.removeClass(this.el, 'slick-active');
        }
    }
    get isActive() {
        return this._active;
    }
}
NzCarouselContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCarouselContentDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
NzCarouselContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCarouselContentDirective, selector: "[nz-carousel-content]", exportAs: ["nzCarouselContent"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCarouselContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-carousel-content]',
                    exportAs: 'nzCarouselContent'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCarouselBaseStrategy {
    constructor(carouselComponent, cdr, renderer, platform, options) {
        this.cdr = cdr;
        this.renderer = renderer;
        this.platform = platform;
        this.options = options;
        this.carouselComponent = carouselComponent;
    }
    get maxIndex() {
        return this.length - 1;
    }
    get firstEl() {
        return this.contents[0].el;
    }
    get lastEl() {
        return this.contents[this.maxIndex].el;
    }
    /**
     * Initialize dragging sequences.
     *
     * @param contents
     */
    withCarouselContents(contents) {
        const carousel = this.carouselComponent;
        this.slickListEl = carousel.slickListEl;
        this.slickTrackEl = carousel.slickTrackEl;
        this.contents = (contents === null || contents === void 0 ? void 0 : contents.toArray()) || [];
        this.length = this.contents.length;
        if (this.platform.isBrowser) {
            const rect = carousel.el.getBoundingClientRect();
            this.unitWidth = rect.width;
            this.unitHeight = rect.height;
        }
        else {
            // Since we cannot call getBoundingClientRect in server, we just hide all items except for the first one.
            contents === null || contents === void 0 ? void 0 : contents.forEach((content, index) => {
                if (index === 0) {
                    this.renderer.setStyle(content.el, 'width', '100%');
                }
                else {
                    this.renderer.setStyle(content.el, 'display', 'none');
                }
            });
        }
    }
    /**
     * When user drag the carousel component.
     *
     * @optional
     */
    dragging(_vector) { }
    /**
     * Destroy a scroll strategy.
     */
    dispose() { }
    getFromToInBoundary(f, t) {
        const length = this.maxIndex + 1;
        return { from: (f + length) % length, to: (t + length) % length };
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCarouselOpacityStrategy extends NzCarouselBaseStrategy {
    withCarouselContents(contents) {
        super.withCarouselContents(contents);
        if (this.contents) {
            this.slickTrackEl.style.width = `${this.length * this.unitWidth}px`;
            this.contents.forEach((content, i) => {
                this.renderer.setStyle(content.el, 'opacity', this.carouselComponent.activeIndex === i ? '1' : '0');
                this.renderer.setStyle(content.el, 'position', 'relative');
                this.renderer.setStyle(content.el, 'width', `${this.unitWidth}px`);
                this.renderer.setStyle(content.el, 'left', `${-this.unitWidth * i}px`);
                this.renderer.setStyle(content.el, 'transition', ['opacity 500ms ease 0s', 'visibility 500ms ease 0s']);
            });
        }
    }
    switch(_f, _t) {
        const { to: t } = this.getFromToInBoundary(_f, _t);
        const complete$ = new Subject();
        this.contents.forEach((content, i) => {
            this.renderer.setStyle(content.el, 'opacity', t === i ? '1' : '0');
        });
        setTimeout(() => {
            complete$.next();
            complete$.complete();
        }, this.carouselComponent.nzTransitionSpeed);
        return complete$;
    }
    dispose() {
        this.contents.forEach((content) => {
            this.renderer.setStyle(content.el, 'transition', null);
            this.renderer.setStyle(content.el, 'opacity', null);
            this.renderer.setStyle(content.el, 'width', null);
            this.renderer.setStyle(content.el, 'left', null);
        });
        super.dispose();
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCarouselTransformStrategy extends NzCarouselBaseStrategy {
    constructor(carouselComponent, cdr, renderer, platform, options) {
        super(carouselComponent, cdr, renderer, platform, options);
        this.isDragging = false;
        this.isTransitioning = false;
    }
    get vertical() {
        return this.carouselComponent.vertical;
    }
    dispose() {
        super.dispose();
        this.renderer.setStyle(this.slickTrackEl, 'transform', null);
    }
    withCarouselContents(contents) {
        super.withCarouselContents(contents);
        const carousel = this.carouselComponent;
        const activeIndex = carousel.activeIndex;
        // We only do when we are in browser.
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
    switch(_f, _t) {
        const { to: t } = this.getFromToInBoundary(_f, _t);
        const complete$ = new Subject();
        this.renderer.setStyle(this.slickTrackEl, 'transition', `transform ${this.carouselComponent.nzTransitionSpeed}ms ease`);
        if (this.vertical) {
            this.verticalTransform(_f, _t);
        }
        else {
            this.horizontalTransform(_f, _t);
        }
        this.isTransitioning = true;
        this.isDragging = false;
        // TODO@wendellhu95: use transitionEnd event instead of setTimeout
        setTimeout(() => {
            this.renderer.setStyle(this.slickTrackEl, 'transition', null);
            this.contents.forEach((content) => {
                this.renderer.setStyle(content.el, this.vertical ? 'top' : 'left', null);
            });
            if (this.vertical) {
                this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-t * this.unitHeight}px, 0)`);
            }
            else {
                this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-t * this.unitWidth}px, 0, 0)`);
            }
            this.isTransitioning = false;
            complete$.next();
            complete$.complete();
        }, this.carouselComponent.nzTransitionSpeed);
        return complete$.asObservable();
    }
    dragging(_vector) {
        if (this.isTransitioning) {
            return;
        }
        const activeIndex = this.carouselComponent.activeIndex;
        if (this.carouselComponent.vertical) {
            if (!this.isDragging && this.length > 2) {
                if (activeIndex === this.maxIndex) {
                    this.prepareVerticalContext(true);
                }
                else if (activeIndex === 0) {
                    this.prepareVerticalContext(false);
                }
            }
            this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-activeIndex * this.unitHeight + _vector.x}px, 0)`);
        }
        else {
            if (!this.isDragging && this.length > 2) {
                if (activeIndex === this.maxIndex) {
                    this.prepareHorizontalContext(true);
                }
                else if (activeIndex === 0) {
                    this.prepareHorizontalContext(false);
                }
            }
            this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-activeIndex * this.unitWidth + _vector.x}px, 0, 0)`);
        }
        this.isDragging = true;
    }
    verticalTransform(_f, _t) {
        const { from: f, to: t } = this.getFromToInBoundary(_f, _t);
        const needToAdjust = this.length > 2 && _t !== t;
        if (needToAdjust) {
            this.prepareVerticalContext(t < f);
            this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-_t * this.unitHeight}px, 0)`);
        }
        else {
            this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-t * this.unitHeight}px, 0`);
        }
    }
    horizontalTransform(_f, _t) {
        const { from: f, to: t } = this.getFromToInBoundary(_f, _t);
        const needToAdjust = this.length > 2 && _t !== t;
        if (needToAdjust) {
            this.prepareHorizontalContext(t < f);
            this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-_t * this.unitWidth}px, 0, 0)`);
        }
        else {
            this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-t * this.unitWidth}px, 0, 0`);
        }
    }
    prepareVerticalContext(lastToFirst) {
        if (lastToFirst) {
            this.renderer.setStyle(this.firstEl, 'top', `${this.length * this.unitHeight}px`);
            this.renderer.setStyle(this.lastEl, 'top', null);
        }
        else {
            this.renderer.setStyle(this.firstEl, 'top', null);
            this.renderer.setStyle(this.lastEl, 'top', `${-this.unitHeight * this.length}px`);
        }
    }
    prepareHorizontalContext(lastToFirst) {
        if (lastToFirst) {
            this.renderer.setStyle(this.firstEl, 'left', `${this.length * this.unitWidth}px`);
            this.renderer.setStyle(this.lastEl, 'left', null);
        }
        else {
            this.renderer.setStyle(this.firstEl, 'left', null);
            this.renderer.setStyle(this.lastEl, 'left', `${-this.unitWidth * this.length}px`);
        }
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CAROUSEL_CUSTOM_STRATEGIES = new InjectionToken('nz-carousel-custom-strategies');

const NZ_CONFIG_MODULE_NAME = 'carousel';
class NzCarouselComponent {
    constructor(elementRef, nzConfigService, ngZone, renderer, cdr, platform, resizeService, nzDragService, directionality, customStrategies) {
        this.nzConfigService = nzConfigService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.cdr = cdr;
        this.platform = platform;
        this.resizeService = resizeService;
        this.nzDragService = nzDragService;
        this.directionality = directionality;
        this.customStrategies = customStrategies;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzEffect = 'scrollx';
        this.nzEnableSwipe = true;
        this.nzDots = true;
        this.nzAutoPlay = false;
        this.nzAutoPlaySpeed = 3000;
        this.nzTransitionSpeed = 500;
        /**
         * this property is passed directly to an NzCarouselBaseStrategy
         */
        this.nzStrategyOptions = undefined;
        this._dotPosition = 'bottom';
        this.nzBeforeChange = new EventEmitter();
        this.nzAfterChange = new EventEmitter();
        this.activeIndex = 0;
        this.vertical = false;
        this.transitionInProgress = null;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.gestureRect = null;
        this.pointerDelta = null;
        this.isTransiting = false;
        this.isDragging = false;
        this.onLiClick = (index) => {
            if (this.dir === 'rtl') {
                this.goTo(this.carouselContents.length - 1 - index);
            }
            else {
                this.goTo(index);
            }
        };
        /**
         * Drag carousel.
         */
        this.pointerDown = (event) => {
            if (!this.isDragging && !this.isTransiting && this.nzEnableSwipe) {
                this.clearScheduledTransition();
                this.gestureRect = this.slickListEl.getBoundingClientRect();
                this.nzDragService.requestDraggingSequence(event).subscribe(delta => {
                    var _a;
                    this.pointerDelta = delta;
                    this.isDragging = true;
                    (_a = this.strategy) === null || _a === void 0 ? void 0 : _a.dragging(this.pointerDelta);
                }, () => { }, () => {
                    if (this.nzEnableSwipe && this.isDragging) {
                        const xDelta = this.pointerDelta ? this.pointerDelta.x : 0;
                        // Switch to another slide if delta is bigger than third of the width.
                        if (Math.abs(xDelta) > this.gestureRect.width / 3) {
                            this.goTo(xDelta > 0 ? this.activeIndex - 1 : this.activeIndex + 1);
                        }
                        else {
                            this.goTo(this.activeIndex);
                        }
                        this.gestureRect = null;
                        this.pointerDelta = null;
                    }
                    this.isDragging = false;
                });
            }
        };
        this.nzDotPosition = 'bottom';
        this.renderer.addClass(elementRef.nativeElement, 'ant-carousel');
        this.el = elementRef.nativeElement;
    }
    set nzDotPosition(value) {
        this._dotPosition = value;
        if (value === 'left' || value === 'right') {
            this.vertical = true;
        }
        else {
            this.vertical = false;
        }
    }
    get nzDotPosition() {
        return this._dotPosition;
    }
    ngOnInit() {
        this.slickListEl = this.slickList.nativeElement;
        this.slickTrackEl = this.slickTrack.nativeElement;
        this.dir = this.directionality.value;
        this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.markContentActive(this.activeIndex);
            this.cdr.detectChanges();
        });
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.slickListEl, 'keydown')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                const { keyCode } = event;
                if (keyCode !== LEFT_ARROW && keyCode !== RIGHT_ARROW) {
                    return;
                }
                event.preventDefault();
                this.ngZone.run(() => {
                    if (keyCode === LEFT_ARROW) {
                        this.pre();
                    }
                    else {
                        this.next();
                    }
                    this.cdr.markForCheck();
                });
            });
        });
    }
    ngAfterContentInit() {
        this.markContentActive(0);
    }
    ngAfterViewInit() {
        this.carouselContents.changes.subscribe(() => {
            this.markContentActive(0);
            this.layout();
        });
        this.resizeService
            .subscribe()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.layout();
        });
        this.switchStrategy();
        this.markContentActive(0);
        this.layout();
        // If embedded in an entry component, it may do initial render at an inappropriate time.
        // ngZone.onStable won't do this trick
        // TODO: need to change this.
        Promise.resolve().then(() => {
            this.layout();
        });
    }
    ngOnChanges(changes) {
        const { nzEffect, nzDotPosition } = changes;
        if (nzEffect && !nzEffect.isFirstChange()) {
            this.switchStrategy();
            this.markContentActive(0);
            this.layout();
        }
        if (nzDotPosition && !nzDotPosition.isFirstChange()) {
            this.switchStrategy();
            this.markContentActive(0);
            this.layout();
        }
        if (!this.nzAutoPlay || !this.nzAutoPlaySpeed) {
            this.clearScheduledTransition();
        }
        else {
            this.scheduleNextTransition();
        }
    }
    ngOnDestroy() {
        this.clearScheduledTransition();
        if (this.strategy) {
            this.strategy.dispose();
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
    next() {
        this.goTo(this.activeIndex + 1);
    }
    pre() {
        this.goTo(this.activeIndex - 1);
    }
    goTo(index) {
        if (this.carouselContents && this.carouselContents.length && !this.isTransiting) {
            const length = this.carouselContents.length;
            const from = this.activeIndex;
            const to = (index + length) % length;
            this.isTransiting = true;
            this.nzBeforeChange.emit({ from, to });
            this.strategy.switch(this.activeIndex, index).subscribe(() => {
                this.scheduleNextTransition();
                this.nzAfterChange.emit(index);
                this.isTransiting = false;
            });
            this.markContentActive(to);
            this.cdr.markForCheck();
        }
    }
    switchStrategy() {
        if (this.strategy) {
            this.strategy.dispose();
        }
        // Load custom strategies first.
        const customStrategy = this.customStrategies ? this.customStrategies.find(s => s.name === this.nzEffect) : null;
        if (customStrategy) {
            this.strategy = new customStrategy.strategy(this, this.cdr, this.renderer, this.platform);
            return;
        }
        this.strategy =
            this.nzEffect === 'scrollx'
                ? new NzCarouselTransformStrategy(this, this.cdr, this.renderer, this.platform)
                : new NzCarouselOpacityStrategy(this, this.cdr, this.renderer, this.platform);
    }
    scheduleNextTransition() {
        this.clearScheduledTransition();
        if (this.nzAutoPlay && this.nzAutoPlaySpeed > 0 && this.platform.isBrowser) {
            this.transitionInProgress = setTimeout(() => {
                this.goTo(this.activeIndex + 1);
            }, this.nzAutoPlaySpeed);
        }
    }
    clearScheduledTransition() {
        if (this.transitionInProgress) {
            clearTimeout(this.transitionInProgress);
            this.transitionInProgress = null;
        }
    }
    markContentActive(index) {
        this.activeIndex = index;
        if (this.carouselContents) {
            this.carouselContents.forEach((slide, i) => {
                if (this.dir === 'rtl') {
                    slide.isActive = index === this.carouselContents.length - 1 - i;
                }
                else {
                    slide.isActive = index === i;
                }
            });
        }
        this.cdr.markForCheck();
    }
    layout() {
        if (this.strategy) {
            this.strategy.withCarouselContents(this.carouselContents);
        }
    }
}
NzCarouselComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCarouselComponent, deps: [{ token: i0.ElementRef }, { token: i1.NzConfigService }, { token: i0.NgZone }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i2.Platform }, { token: i3.NzResizeService }, { token: i3.NzDragService }, { token: i4.Directionality, optional: true }, { token: NZ_CAROUSEL_CUSTOM_STRATEGIES, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCarouselComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCarouselComponent, selector: "nz-carousel", inputs: { nzDotRender: "nzDotRender", nzEffect: "nzEffect", nzEnableSwipe: "nzEnableSwipe", nzDots: "nzDots", nzAutoPlay: "nzAutoPlay", nzAutoPlaySpeed: "nzAutoPlaySpeed", nzTransitionSpeed: "nzTransitionSpeed", nzStrategyOptions: "nzStrategyOptions", nzDotPosition: "nzDotPosition" }, outputs: { nzBeforeChange: "nzBeforeChange", nzAfterChange: "nzAfterChange" }, host: { properties: { "class.ant-carousel-vertical": "vertical", "class.ant-carousel-rtl": "dir ==='rtl'" } }, queries: [{ propertyName: "carouselContents", predicate: NzCarouselContentDirective }], viewQueries: [{ propertyName: "slickList", first: true, predicate: ["slickList"], descendants: true, static: true }, { propertyName: "slickTrack", first: true, predicate: ["slickTrack"], descendants: true, static: true }], exportAs: ["nzCarousel"], usesOnChanges: true, ngImport: i0, template: `
    <div
      class="slick-initialized slick-slider"
      [class.slick-vertical]="nzDotPosition === 'left' || nzDotPosition === 'right'"
    >
      <div
        #slickList
        class="slick-list"
        tabindex="-1"
        (mousedown)="pointerDown($event)"
        (touchstart)="pointerDown($event)"
      >
        <!-- Render carousel items. -->
        <div class="slick-track" #slickTrack>
          <ng-content></ng-content>
        </div>
      </div>
      <!-- Render dots. -->
      <ul
        class="slick-dots"
        *ngIf="nzDots"
        [class.slick-dots-top]="nzDotPosition === 'top'"
        [class.slick-dots-bottom]="nzDotPosition === 'bottom'"
        [class.slick-dots-left]="nzDotPosition === 'left'"
        [class.slick-dots-right]="nzDotPosition === 'right'"
      >
        <li
          *ngFor="let content of carouselContents; let i = index"
          [class.slick-active]="i === activeIndex"
          (click)="onLiClick(i)"
        >
          <ng-template
            [ngTemplateOutlet]="nzDotRender || renderDotTemplate"
            [ngTemplateOutletContext]="{ $implicit: i }"
          ></ng-template>
        </li>
      </ul>
    </div>

    <ng-template #renderDotTemplate let-index>
      <button>{{ index + 1 }}</button>
    </ng-template>
  `, isInline: true, directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzCarouselComponent.prototype, "nzEffect", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzCarouselComponent.prototype, "nzEnableSwipe", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzCarouselComponent.prototype, "nzDots", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzCarouselComponent.prototype, "nzAutoPlay", void 0);
__decorate([
    WithConfig(),
    InputNumber()
], NzCarouselComponent.prototype, "nzAutoPlaySpeed", void 0);
__decorate([
    InputNumber()
], NzCarouselComponent.prototype, "nzTransitionSpeed", void 0);
__decorate([
    WithConfig()
], NzCarouselComponent.prototype, "nzDotPosition", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCarouselComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-carousel',
                    exportAs: 'nzCarousel',
                    preserveWhitespaces: false,
                    template: `
    <div
      class="slick-initialized slick-slider"
      [class.slick-vertical]="nzDotPosition === 'left' || nzDotPosition === 'right'"
    >
      <div
        #slickList
        class="slick-list"
        tabindex="-1"
        (mousedown)="pointerDown($event)"
        (touchstart)="pointerDown($event)"
      >
        <!-- Render carousel items. -->
        <div class="slick-track" #slickTrack>
          <ng-content></ng-content>
        </div>
      </div>
      <!-- Render dots. -->
      <ul
        class="slick-dots"
        *ngIf="nzDots"
        [class.slick-dots-top]="nzDotPosition === 'top'"
        [class.slick-dots-bottom]="nzDotPosition === 'bottom'"
        [class.slick-dots-left]="nzDotPosition === 'left'"
        [class.slick-dots-right]="nzDotPosition === 'right'"
      >
        <li
          *ngFor="let content of carouselContents; let i = index"
          [class.slick-active]="i === activeIndex"
          (click)="onLiClick(i)"
        >
          <ng-template
            [ngTemplateOutlet]="nzDotRender || renderDotTemplate"
            [ngTemplateOutletContext]="{ $implicit: i }"
          ></ng-template>
        </li>
      </ul>
    </div>

    <ng-template #renderDotTemplate let-index>
      <button>{{ index + 1 }}</button>
    </ng-template>
  `,
                    host: {
                        '[class.ant-carousel-vertical]': 'vertical',
                        '[class.ant-carousel-rtl]': `dir ==='rtl'`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i1.NzConfigService }, { type: i0.NgZone }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i2.Platform }, { type: i3.NzResizeService }, { type: i3.NzDragService }, { type: i4.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [NZ_CAROUSEL_CUSTOM_STRATEGIES]
                    }] }];
    }, propDecorators: { carouselContents: [{
                type: ContentChildren,
                args: [NzCarouselContentDirective]
            }], slickList: [{
                type: ViewChild,
                args: ['slickList', { static: true }]
            }], slickTrack: [{
                type: ViewChild,
                args: ['slickTrack', { static: true }]
            }], nzDotRender: [{
                type: Input
            }], nzEffect: [{
                type: Input
            }], nzEnableSwipe: [{
                type: Input
            }], nzDots: [{
                type: Input
            }], nzAutoPlay: [{
                type: Input
            }], nzAutoPlaySpeed: [{
                type: Input
            }], nzTransitionSpeed: [{
                type: Input
            }], nzStrategyOptions: [{
                type: Input
            }], nzDotPosition: [{
                type: Input
            }], nzBeforeChange: [{
                type: Output
            }], nzAfterChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCarouselModule {
}
NzCarouselModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCarouselModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzCarouselModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCarouselModule, declarations: [NzCarouselComponent, NzCarouselContentDirective], imports: [BidiModule, CommonModule, PlatformModule], exports: [NzCarouselComponent, NzCarouselContentDirective] });
NzCarouselModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCarouselModule, imports: [[BidiModule, CommonModule, PlatformModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCarouselModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzCarouselComponent, NzCarouselContentDirective],
                    exports: [NzCarouselComponent, NzCarouselContentDirective],
                    imports: [BidiModule, CommonModule, PlatformModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * this strategy is very much like NzCarouselTransformStrategy, but it doesn't loop between the first and the last one
 */
class NzCarouselTransformNoLoopStrategy extends NzCarouselBaseStrategy {
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

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCarouselFlipStrategy extends NzCarouselBaseStrategy {
    withCarouselContents(contents) {
        super.withCarouselContents(contents);
        if (this.contents) {
            this.renderer.setStyle(this.slickListEl, 'width', `${this.unitWidth}px`);
            this.renderer.setStyle(this.slickTrackEl, 'width', `${this.length * this.unitWidth}px`);
            this.contents.forEach((content, i) => {
                const cur = this.carouselComponent.activeIndex === i;
                this.renderer.setStyle(content.el, 'transform', cur ? 'rotateY(0deg)' : 'rotateY(180deg)');
                this.renderer.setStyle(content.el, 'position', 'relative');
                this.renderer.setStyle(content.el, 'width', `${this.unitWidth}px`);
                this.renderer.setStyle(content.el, 'left', `${-this.unitWidth * i}px`);
                this.renderer.setStyle(content.el, 'transform-style', 'preserve-3d');
                this.renderer.setStyle(content.el, 'backface-visibility', 'hidden');
            });
            timer(this.carouselComponent.nzTransitionSpeed).subscribe(() => {
                this.contents.forEach(c => this.renderer.setStyle(c.el, 'transition', ['transform 500ms ease 0s']));
            });
        }
    }
    switch(rawF, rawT) {
        const { from, to } = this.getFromToInBoundary(rawF, rawT);
        const complete$ = new Subject();
        const speed = this.carouselComponent.nzTransitionSpeed;
        timer(speed).subscribe(() => {
            complete$.next();
            complete$.complete();
        });
        if (rawF === rawT) {
            return complete$;
        }
        this.contents.forEach((content, i) => {
            if (i === from) {
                this.renderer.setStyle(content.el, 'transform', 'rotateY(180deg)');
            }
            else if (i === to) {
                this.renderer.setStyle(content.el, 'transform', 'rotateY(0deg)');
            }
        });
        return complete$.asObservable();
    }
    dispose() {
        this.contents.forEach((content) => {
            this.renderer.setStyle(content.el, 'transition', null);
            this.renderer.setStyle(content.el, 'transform', null);
            this.renderer.setStyle(content.el, 'width', null);
            this.renderer.setStyle(content.el, 'left', null);
            this.renderer.setStyle(content.el, 'transform-style', null);
            this.renderer.setStyle(content.el, 'backface-visibility', null);
        });
        super.dispose();
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NZ_CAROUSEL_CUSTOM_STRATEGIES, NzCarouselBaseStrategy, NzCarouselComponent, NzCarouselContentDirective, NzCarouselFlipStrategy, NzCarouselModule, NzCarouselOpacityStrategy, NzCarouselTransformNoLoopStrategy, NzCarouselTransformStrategy };
//# sourceMappingURL=ng-zorro-antd-carousel.mjs.map
