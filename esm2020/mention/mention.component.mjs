import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { ConnectionPositionPair, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, Inject, Input, Optional, Output, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { DEFAULT_MENTION_BOTTOM_POSITIONS, DEFAULT_MENTION_TOP_POSITIONS } from 'ng-zorro-antd/core/overlay';
import { getCaretCoordinates, getMentions, InputBoolean } from 'ng-zorro-antd/core/util';
import { NZ_MENTION_CONFIG } from './config';
import { NzMentionSuggestionDirective } from './mention-suggestions';
import { NzMentionService } from './mention.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "./mention.service";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/icon";
export class NzMentionComponent {
    constructor(ngZone, ngDocument, cdr, overlay, viewContainerRef, nzMentionService) {
        this.ngZone = ngZone;
        this.ngDocument = ngDocument;
        this.cdr = cdr;
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.nzMentionService = nzMentionService;
        this.nzValueWith = value => value;
        this.nzPrefix = '@';
        this.nzLoading = false;
        this.nzNotFoundContent = '无匹配结果，轻敲空格完成输入';
        this.nzPlacement = 'bottom';
        this.nzSuggestions = [];
        this.nzOnSelect = new EventEmitter();
        this.nzOnSearchChange = new EventEmitter();
        this.isOpen = false;
        this.filteredSuggestions = [];
        this.suggestionTemplate = null;
        this.activeIndex = -1;
        this.previousValue = null;
        this.cursorMention = null;
        this.overlayRef = null;
    }
    set suggestionChild(value) {
        if (value) {
            this.suggestionTemplate = value;
        }
    }
    get triggerNativeElement() {
        return this.trigger.el.nativeElement;
    }
    get focusItemElement() {
        const itemArr = this.items?.toArray();
        if (itemArr && itemArr[this.activeIndex]) {
            return itemArr[this.activeIndex].nativeElement;
        }
        return null;
    }
    ngOnInit() {
        this.nzMentionService.triggerChanged().subscribe(trigger => {
            this.trigger = trigger;
            this.bindTriggerEvents();
            this.closeDropdown();
            this.overlayRef = null;
        });
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('nzSuggestions')) {
            if (this.isOpen) {
                this.previousValue = null;
                this.activeIndex = -1;
                this.resetDropdown(false);
            }
        }
    }
    ngAfterViewInit() {
        this.items.changes
            .pipe(startWith(this.items), switchMap(() => {
            const items = this.items.toArray();
            // Caretaker note: we explicitly should call `subscribe()` within the root zone.
            // `runOutsideAngular(() => fromEvent(...))` will just create an observable within the root zone,
            // but `addEventListener` is called when the `fromEvent` is subscribed.
            return new Observable(subscriber => this.ngZone.runOutsideAngular(() => merge(...items.map(item => fromEvent(item.nativeElement, 'mousedown'))).subscribe(subscriber)));
        }))
            .subscribe(event => {
            event.preventDefault();
        });
    }
    ngOnDestroy() {
        this.closeDropdown();
    }
    closeDropdown() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
            this.overlayOutsideClickSubscription.unsubscribe();
            this.isOpen = false;
            this.cdr.markForCheck();
        }
    }
    openDropdown() {
        this.attachOverlay();
        this.isOpen = true;
        this.cdr.markForCheck();
    }
    getMentions() {
        return this.trigger ? getMentions(this.trigger.value, this.nzPrefix) : [];
    }
    selectSuggestion(suggestion) {
        const value = this.nzValueWith(suggestion);
        this.trigger.insertMention({
            mention: value,
            startPos: this.cursorMentionStart,
            endPos: this.cursorMentionEnd
        });
        this.nzOnSelect.emit(suggestion);
        this.closeDropdown();
        this.activeIndex = -1;
    }
    handleInput(event) {
        const target = event.target;
        this.trigger.onChange(target.value);
        this.trigger.value = target.value;
        this.resetDropdown();
    }
    handleKeydown(event) {
        const keyCode = event.keyCode;
        if (this.isOpen && keyCode === ENTER && this.activeIndex !== -1 && this.filteredSuggestions.length) {
            this.selectSuggestion(this.filteredSuggestions[this.activeIndex]);
            event.preventDefault();
        }
        else if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
            this.resetDropdown();
            event.stopPropagation();
        }
        else {
            if (this.isOpen && (keyCode === TAB || keyCode === ESCAPE)) {
                this.closeDropdown();
                return;
            }
            if (this.isOpen && keyCode === UP_ARROW) {
                this.setPreviousItemActive();
                event.preventDefault();
                event.stopPropagation();
            }
            if (this.isOpen && keyCode === DOWN_ARROW) {
                this.setNextItemActive();
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
    handleClick() {
        this.resetDropdown();
    }
    bindTriggerEvents() {
        this.trigger.onInput.subscribe((e) => this.handleInput(e));
        this.trigger.onKeydown.subscribe((e) => this.handleKeydown(e));
        this.trigger.onClick.subscribe(() => this.handleClick());
    }
    suggestionsFilter(value, emit) {
        const suggestions = value.substring(1);
        /**
         * Should always emit (nzOnSearchChange) when value empty
         *
         * @[something]... @[empty]... @[empty]
         *     ^             ^           ^
         * preValue        preValue  (should emit)
         */
        if (this.previousValue === value && value !== this.cursorMention[0]) {
            return;
        }
        this.previousValue = value;
        if (emit) {
            this.nzOnSearchChange.emit({
                value: this.cursorMention.substring(1),
                prefix: this.cursorMention[0]
            });
        }
        const searchValue = suggestions.toLowerCase();
        this.filteredSuggestions = this.nzSuggestions.filter(suggestion => this.nzValueWith(suggestion).toLowerCase().includes(searchValue));
    }
    resetDropdown(emit = true) {
        this.resetCursorMention();
        if (typeof this.cursorMention !== 'string' || !this.canOpen()) {
            this.closeDropdown();
            return;
        }
        this.suggestionsFilter(this.cursorMention, emit);
        const activeIndex = this.filteredSuggestions.indexOf(this.cursorMention.substring(1));
        this.activeIndex = activeIndex >= 0 ? activeIndex : 0;
        this.openDropdown();
    }
    setNextItemActive() {
        this.activeIndex = this.activeIndex + 1 <= this.filteredSuggestions.length - 1 ? this.activeIndex + 1 : 0;
        this.cdr.markForCheck();
        this.scrollToFocusItem();
    }
    setPreviousItemActive() {
        this.activeIndex = this.activeIndex - 1 < 0 ? this.filteredSuggestions.length - 1 : this.activeIndex - 1;
        this.cdr.markForCheck();
        this.scrollToFocusItem();
    }
    scrollToFocusItem() {
        if (this.focusItemElement) {
            this.focusItemElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
    }
    canOpen() {
        const element = this.triggerNativeElement;
        return !element.readOnly && !element.disabled;
    }
    resetCursorMention() {
        const value = this.triggerNativeElement.value.replace(/[\r\n]/g, NZ_MENTION_CONFIG.split) || '';
        const selectionStart = this.triggerNativeElement.selectionStart;
        const prefix = typeof this.nzPrefix === 'string' ? [this.nzPrefix] : this.nzPrefix;
        let i = prefix.length;
        while (i >= 0) {
            const startPos = value.lastIndexOf(prefix[i], selectionStart);
            const endPos = value.indexOf(NZ_MENTION_CONFIG.split, selectionStart) > -1
                ? value.indexOf(NZ_MENTION_CONFIG.split, selectionStart)
                : value.length;
            const mention = value.substring(startPos, endPos);
            if ((startPos > 0 && value[startPos - 1] !== NZ_MENTION_CONFIG.split) ||
                startPos < 0 ||
                mention.includes(prefix[i], 1) ||
                mention.includes(NZ_MENTION_CONFIG.split)) {
                this.cursorMention = null;
                this.cursorMentionStart = -1;
                this.cursorMentionEnd = -1;
            }
            else {
                this.cursorMention = mention;
                this.cursorMentionStart = startPos;
                this.cursorMentionEnd = endPos;
                return;
            }
            i--;
        }
    }
    updatePositions() {
        const coordinates = getCaretCoordinates(this.triggerNativeElement, this.cursorMentionStart);
        const top = coordinates.top -
            this.triggerNativeElement.getBoundingClientRect().height -
            this.triggerNativeElement.scrollTop +
            (this.nzPlacement === 'bottom' ? coordinates.height - 6 : -6);
        const left = coordinates.left - this.triggerNativeElement.scrollLeft;
        this.positionStrategy.withDefaultOffsetX(left).withDefaultOffsetY(top);
        if (this.nzPlacement === 'bottom') {
            this.positionStrategy.withPositions([...DEFAULT_MENTION_BOTTOM_POSITIONS]);
        }
        if (this.nzPlacement === 'top') {
            this.positionStrategy.withPositions([...DEFAULT_MENTION_TOP_POSITIONS]);
        }
        this.positionStrategy.apply();
    }
    subscribeOverlayOutsideClick() {
        return merge(this.overlayRef.outsidePointerEvents(), fromEvent(this.ngDocument, 'touchend')).subscribe((event) => {
            const clickTarget = event.target;
            if (this.isOpen &&
                clickTarget !== this.trigger.el.nativeElement &&
                !this.overlayRef?.overlayElement.contains(clickTarget)) {
                this.closeDropdown();
            }
        });
    }
    attachOverlay() {
        if (!this.overlayRef) {
            this.portal = new TemplatePortal(this.suggestionsTemp, this.viewContainerRef);
            this.overlayRef = this.overlay.create(this.getOverlayConfig());
        }
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
            this.overlayOutsideClickSubscription = this.subscribeOverlayOutsideClick();
        }
        this.updatePositions();
    }
    getOverlayConfig() {
        return new OverlayConfig({
            positionStrategy: this.getOverlayPosition(),
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            disposeOnNavigation: true
        });
    }
    getOverlayPosition() {
        const positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
        ];
        this.positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.trigger.el)
            .withPositions(positions)
            .withFlexibleDimensions(false)
            .withPush(false);
        return this.positionStrategy;
    }
}
NzMentionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMentionComponent, deps: [{ token: i0.NgZone }, { token: DOCUMENT, optional: true }, { token: i0.ChangeDetectorRef }, { token: i1.Overlay }, { token: i0.ViewContainerRef }, { token: i2.NzMentionService }], target: i0.ɵɵFactoryTarget.Component });
NzMentionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzMentionComponent, selector: "nz-mention", inputs: { nzValueWith: "nzValueWith", nzPrefix: "nzPrefix", nzLoading: "nzLoading", nzNotFoundContent: "nzNotFoundContent", nzPlacement: "nzPlacement", nzSuggestions: "nzSuggestions" }, outputs: { nzOnSelect: "nzOnSelect", nzOnSearchChange: "nzOnSearchChange" }, providers: [NzMentionService], queries: [{ propertyName: "suggestionChild", first: true, predicate: NzMentionSuggestionDirective, descendants: true, read: TemplateRef }], viewQueries: [{ propertyName: "suggestionsTemp", first: true, predicate: TemplateRef, descendants: true }, { propertyName: "items", predicate: ["items"], descendants: true, read: ElementRef }], exportAs: ["nzMention"], usesOnChanges: true, ngImport: i0, template: `
    <ng-content></ng-content>
    <ng-template #suggestions>
      <ul class="ant-mention-dropdown">
        <li
          #items
          class="ant-mention-dropdown-item"
          *ngFor="let suggestion of filteredSuggestions; let i = index"
          [class.focus]="i === activeIndex"
          (click)="selectSuggestion(suggestion)"
        >
          <ng-container *ngIf="suggestionTemplate; else defaultSuggestion">
            <ng-container *ngTemplateOutlet="suggestionTemplate; context: { $implicit: suggestion }"></ng-container>
          </ng-container>
          <ng-template #defaultSuggestion>{{ nzValueWith(suggestion) }}</ng-template>
        </li>
        <li class="ant-mention-dropdown-notfound ant-mention-dropdown-item" *ngIf="filteredSuggestions.length === 0">
          <span *ngIf="nzLoading"><i nz-icon nzType="loading"></i></span>
          <span *ngIf="!nzLoading">{{ nzNotFoundContent }}</span>
        </li>
      </ul>
    </ng-template>
  `, isInline: true, directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean()
], NzMentionComponent.prototype, "nzLoading", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMentionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-mention',
                    exportAs: 'nzMention',
                    template: `
    <ng-content></ng-content>
    <ng-template #suggestions>
      <ul class="ant-mention-dropdown">
        <li
          #items
          class="ant-mention-dropdown-item"
          *ngFor="let suggestion of filteredSuggestions; let i = index"
          [class.focus]="i === activeIndex"
          (click)="selectSuggestion(suggestion)"
        >
          <ng-container *ngIf="suggestionTemplate; else defaultSuggestion">
            <ng-container *ngTemplateOutlet="suggestionTemplate; context: { $implicit: suggestion }"></ng-container>
          </ng-container>
          <ng-template #defaultSuggestion>{{ nzValueWith(suggestion) }}</ng-template>
        </li>
        <li class="ant-mention-dropdown-notfound ant-mention-dropdown-item" *ngIf="filteredSuggestions.length === 0">
          <span *ngIf="nzLoading"><i nz-icon nzType="loading"></i></span>
          <span *ngIf="!nzLoading">{{ nzNotFoundContent }}</span>
        </li>
      </ul>
    </ng-template>
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [NzMentionService]
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }, { type: i1.Overlay }, { type: i0.ViewContainerRef }, { type: i2.NzMentionService }]; }, propDecorators: { nzValueWith: [{
                type: Input
            }], nzPrefix: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzNotFoundContent: [{
                type: Input
            }], nzPlacement: [{
                type: Input
            }], nzSuggestions: [{
                type: Input
            }], nzOnSelect: [{
                type: Output
            }], nzOnSearchChange: [{
                type: Output
            }], suggestionsTemp: [{
                type: ViewChild,
                args: [TemplateRef, { static: false }]
            }], items: [{
                type: ViewChildren,
                args: ['items', { read: ElementRef }]
            }], suggestionChild: [{
                type: ContentChild,
                args: [NzMentionSuggestionDirective, { static: false, read: TemplateRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL21lbnRpb24vbWVudGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRyxPQUFPLEVBQ0wsc0JBQXNCLEVBR3RCLGFBQWEsRUFHZCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFLTCxRQUFRLEVBQ1IsTUFBTSxFQUdOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVyRSxPQUFPLEVBQUUsZ0JB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RUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUV6QyxLQUFLO3NCQURKLFlBQVk7dUJBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFJdkMsZUFBZTtzQkFEbEIsWUFBWTt1QkFBQyw0QkFBNEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBFU0NBUEUsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBUQUIsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsXG4gIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgT3ZlcmxheVJlZixcbiAgUG9zaXRpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgREVGQVVMVF9NRU5USU9OX0JPVFRPTV9QT1NJVElPTlMsIERFRkFVTFRfTUVOVElPTl9UT1BfUE9TSVRJT05TIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL292ZXJsYXknO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0Q2FyZXRDb29yZGluYXRlcywgZ2V0TWVudGlvbnMsIElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTlpfTUVOVElPTl9DT05GSUcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBOek1lbnRpb25TdWdnZXN0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW50aW9uLXN1Z2dlc3Rpb25zJztcbmltcG9ydCB7IE56TWVudGlvblRyaWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL21lbnRpb24tdHJpZ2dlcic7XG5pbXBvcnQgeyBOek1lbnRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tZW50aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lbnRpb25PblNlYXJjaFR5cGVzIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgcHJlZml4OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVudGlvbiB7XG4gIHN0YXJ0UG9zOiBudW1iZXI7XG4gIGVuZFBvczogbnVtYmVyO1xuICBtZW50aW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE1lbnRpb25QbGFjZW1lbnQgPSAndG9wJyB8ICdib3R0b20nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1tZW50aW9uJyxcbiAgZXhwb3J0QXM6ICduek1lbnRpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8bmctdGVtcGxhdGUgI3N1Z2dlc3Rpb25zPlxuICAgICAgPHVsIGNsYXNzPVwiYW50LW1lbnRpb24tZHJvcGRvd25cIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgI2l0ZW1zXG4gICAgICAgICAgY2xhc3M9XCJhbnQtbWVudGlvbi1kcm9wZG93bi1pdGVtXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgc3VnZ2VzdGlvbiBvZiBmaWx0ZXJlZFN1Z2dlc3Rpb25zOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICBbY2xhc3MuZm9jdXNdPVwiaSA9PT0gYWN0aXZlSW5kZXhcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RTdWdnZXN0aW9uKHN1Z2dlc3Rpb24pXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdWdnZXN0aW9uVGVtcGxhdGU7IGVsc2UgZGVmYXVsdFN1Z2dlc3Rpb25cIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzdWdnZXN0aW9uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBzdWdnZXN0aW9uIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRTdWdnZXN0aW9uPnt7IG56VmFsdWVXaXRoKHN1Z2dlc3Rpb24pIH19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpIGNsYXNzPVwiYW50LW1lbnRpb24tZHJvcGRvd24tbm90Zm91bmQgYW50LW1lbnRpb24tZHJvcGRvd24taXRlbVwiICpuZ0lmPVwiZmlsdGVyZWRTdWdnZXN0aW9ucy5sZW5ndGggPT09IDBcIj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cIm56TG9hZGluZ1wiPjxpIG56LWljb24gbnpUeXBlPVwibG9hZGluZ1wiPjwvaT48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCIhbnpMb2FkaW5nXCI+e3sgbnpOb3RGb3VuZENvbnRlbnQgfX08L3NwYW4+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbTnpNZW50aW9uU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTnpNZW50aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekxvYWRpbmc6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuelZhbHVlV2l0aDogKHZhbHVlOiBOelNhZmVBbnkpID0+IHN0cmluZyA9IHZhbHVlID0+IHZhbHVlO1xuICBASW5wdXQoKSBuelByZWZpeDogc3RyaW5nIHwgc3RyaW5nW10gPSAnQCc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekxvYWRpbmcgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpOb3RGb3VuZENvbnRlbnQ6IHN0cmluZyA9ICfml6DljLnphY3nu5PmnpzvvIzovbvmlbLnqbrmoLzlrozmiJDovpPlhaUnO1xuICBASW5wdXQoKSBuelBsYWNlbWVudDogTWVudGlvblBsYWNlbWVudCA9ICdib3R0b20nO1xuICBASW5wdXQoKSBuelN1Z2dlc3Rpb25zOiBOelNhZmVBbnlbXSA9IFtdO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPblNlbGVjdDogRXZlbnRFbWl0dGVyPE56U2FmZUFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uU2VhcmNoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWVudGlvbk9uU2VhcmNoVHlwZXM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHRyaWdnZXIhOiBOek1lbnRpb25UcmlnZ2VyRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogZmFsc2UgfSkgc3VnZ2VzdGlvbnNUZW1wPzogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBWaWV3Q2hpbGRyZW4oJ2l0ZW1zJywgeyByZWFkOiBFbGVtZW50UmVmIH0pXG4gIGl0ZW1zITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIEBDb250ZW50Q2hpbGQoTnpNZW50aW9uU3VnZ2VzdGlvbkRpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBUZW1wbGF0ZVJlZiB9KVxuICBzZXQgc3VnZ2VzdGlvbkNoaWxkKHZhbHVlOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogTnpTYWZlQW55IH0+KSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnN1Z2dlc3Rpb25UZW1wbGF0ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGlzT3BlbiA9IGZhbHNlO1xuICBmaWx0ZXJlZFN1Z2dlc3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuICBzdWdnZXN0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOelNhZmVBbnkgfT4gfCBudWxsID0gbnVsbDtcbiAgYWN0aXZlSW5kZXggPSAtMTtcblxuICBwcml2YXRlIHByZXZpb3VzVmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGN1cnNvck1lbnRpb246IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGN1cnNvck1lbnRpb25TdGFydD86IG51bWJlcjtcbiAgcHJpdmF0ZSBjdXJzb3JNZW50aW9uRW5kPzogbnVtYmVyO1xuICBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBwb3J0YWw/OiBUZW1wbGF0ZVBvcnRhbDx2b2lkPjtcbiAgcHJpdmF0ZSBwb3NpdGlvblN0cmF0ZWd5ITogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuICBwcml2YXRlIG92ZXJsYXlPdXRzaWRlQ2xpY2tTdWJzY3JpcHRpb24hOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBnZXQgdHJpZ2dlck5hdGl2ZUVsZW1lbnQoKTogSFRNTFRleHRBcmVhRWxlbWVudCB8IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLnRyaWdnZXIuZWwubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGZvY3VzSXRlbUVsZW1lbnQoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCBpdGVtQXJyID0gdGhpcy5pdGVtcz8udG9BcnJheSgpO1xuICAgIGlmIChpdGVtQXJyICYmIGl0ZW1BcnJbdGhpcy5hY3RpdmVJbmRleF0pIHtcbiAgICAgIHJldHVybiBpdGVtQXJyW3RoaXMuYWN0aXZlSW5kZXhdLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIG5nRG9jdW1lbnQ6IE56U2FmZUFueSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIG56TWVudGlvblNlcnZpY2U6IE56TWVudGlvblNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubnpNZW50aW9uU2VydmljZS50cmlnZ2VyQ2hhbmdlZCgpLnN1YnNjcmliZSh0cmlnZ2VyID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlciA9IHRyaWdnZXI7XG4gICAgICB0aGlzLmJpbmRUcmlnZ2VyRXZlbnRzKCk7XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZiA9IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ256U3VnZ2VzdGlvbnMnKSkge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5yZXNldERyb3Bkb3duKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtcy5jaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHRoaXMuaXRlbXMpLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy50b0FycmF5KCk7XG4gICAgICAgICAgLy8gQ2FyZXRha2VyIG5vdGU6IHdlIGV4cGxpY2l0bHkgc2hvdWxkIGNhbGwgYHN1YnNjcmliZSgpYCB3aXRoaW4gdGhlIHJvb3Qgem9uZS5cbiAgICAgICAgICAvLyBgcnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gZnJvbUV2ZW50KC4uLikpYCB3aWxsIGp1c3QgY3JlYXRlIGFuIG9ic2VydmFibGUgd2l0aGluIHRoZSByb290IHpvbmUsXG4gICAgICAgICAgLy8gYnV0IGBhZGRFdmVudExpc3RlbmVyYCBpcyBjYWxsZWQgd2hlbiB0aGUgYGZyb21FdmVudGAgaXMgc3Vic2NyaWJlZC5cbiAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8TW91c2VFdmVudD4oc3Vic2NyaWJlciA9PlxuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgICAgICAgICAgbWVyZ2UoLi4uaXRlbXMubWFwKGl0ZW0gPT4gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGl0ZW0ubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicpKSkuc3Vic2NyaWJlKHN1YnNjcmliZXIpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgdGhpcy5vdmVybGF5T3V0c2lkZUNsaWNrU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkRyb3Bkb3duKCk6IHZvaWQge1xuICAgIHRoaXMuYXR0YWNoT3ZlcmxheSgpO1xuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldE1lbnRpb25zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy50cmlnZ2VyID8gZ2V0TWVudGlvbnModGhpcy50cmlnZ2VyLnZhbHVlISwgdGhpcy5uelByZWZpeCkgOiBbXTtcbiAgfVxuXG4gIHNlbGVjdFN1Z2dlc3Rpb24oc3VnZ2VzdGlvbjogc3RyaW5nIHwge30pOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMubnpWYWx1ZVdpdGgoc3VnZ2VzdGlvbik7XG4gICAgdGhpcy50cmlnZ2VyLmluc2VydE1lbnRpb24oe1xuICAgICAgbWVudGlvbjogdmFsdWUsXG4gICAgICBzdGFydFBvczogdGhpcy5jdXJzb3JNZW50aW9uU3RhcnQhLFxuICAgICAgZW5kUG9zOiB0aGlzLmN1cnNvck1lbnRpb25FbmQhXG4gICAgfSk7XG4gICAgdGhpcy5uek9uU2VsZWN0LmVtaXQoc3VnZ2VzdGlvbik7XG4gICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgdGhpcy5hY3RpdmVJbmRleCA9IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVJbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICB0aGlzLnRyaWdnZXIub25DaGFuZ2UodGFyZ2V0LnZhbHVlKTtcbiAgICB0aGlzLnRyaWdnZXIudmFsdWUgPSB0YXJnZXQudmFsdWU7XG4gICAgdGhpcy5yZXNldERyb3Bkb3duKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICBpZiAodGhpcy5pc09wZW4gJiYga2V5Q29kZSA9PT0gRU5URVIgJiYgdGhpcy5hY3RpdmVJbmRleCAhPT0gLTEgJiYgdGhpcy5maWx0ZXJlZFN1Z2dlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5zZWxlY3RTdWdnZXN0aW9uKHRoaXMuZmlsdGVyZWRTdWdnZXN0aW9uc1t0aGlzLmFjdGl2ZUluZGV4XSk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVyB8fCBrZXlDb2RlID09PSBSSUdIVF9BUlJPVykge1xuICAgICAgdGhpcy5yZXNldERyb3Bkb3duKCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuICYmIChrZXlDb2RlID09PSBUQUIgfHwga2V5Q29kZSA9PT0gRVNDQVBFKSkge1xuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc09wZW4gJiYga2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgdGhpcy5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzT3BlbiAmJiBrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgIHRoaXMuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0RHJvcGRvd24oKTtcbiAgfVxuXG4gIHByaXZhdGUgYmluZFRyaWdnZXJFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy50cmlnZ2VyLm9uSW5wdXQuc3Vic2NyaWJlKChlOiBLZXlib2FyZEV2ZW50KSA9PiB0aGlzLmhhbmRsZUlucHV0KGUpKTtcbiAgICB0aGlzLnRyaWdnZXIub25LZXlkb3duLnN1YnNjcmliZSgoZTogS2V5Ym9hcmRFdmVudCkgPT4gdGhpcy5oYW5kbGVLZXlkb3duKGUpKTtcbiAgICB0aGlzLnRyaWdnZXIub25DbGljay5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oYW5kbGVDbGljaygpKTtcbiAgfVxuXG4gIHByaXZhdGUgc3VnZ2VzdGlvbnNGaWx0ZXIodmFsdWU6IHN0cmluZywgZW1pdDogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHN1Z2dlc3Rpb25zID0gdmFsdWUuc3Vic3RyaW5nKDEpO1xuICAgIC8qKlxuICAgICAqIFNob3VsZCBhbHdheXMgZW1pdCAobnpPblNlYXJjaENoYW5nZSkgd2hlbiB2YWx1ZSBlbXB0eVxuICAgICAqXG4gICAgICogQFtzb21ldGhpbmddLi4uIEBbZW1wdHldLi4uIEBbZW1wdHldXG4gICAgICogICAgIF4gICAgICAgICAgICAgXiAgICAgICAgICAgXlxuICAgICAqIHByZVZhbHVlICAgICAgICBwcmVWYWx1ZSAgKHNob3VsZCBlbWl0KVxuICAgICAqL1xuICAgIGlmICh0aGlzLnByZXZpb3VzVmFsdWUgPT09IHZhbHVlICYmIHZhbHVlICE9PSB0aGlzLmN1cnNvck1lbnRpb24hWzBdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xuICAgIGlmIChlbWl0KSB7XG4gICAgICB0aGlzLm56T25TZWFyY2hDaGFuZ2UuZW1pdCh7XG4gICAgICAgIHZhbHVlOiB0aGlzLmN1cnNvck1lbnRpb24hLnN1YnN0cmluZygxKSxcbiAgICAgICAgcHJlZml4OiB0aGlzLmN1cnNvck1lbnRpb24hWzBdXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3Qgc2VhcmNoVmFsdWUgPSBzdWdnZXN0aW9ucy50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMuZmlsdGVyZWRTdWdnZXN0aW9ucyA9IHRoaXMubnpTdWdnZXN0aW9ucy5maWx0ZXIoc3VnZ2VzdGlvbiA9PlxuICAgICAgdGhpcy5uelZhbHVlV2l0aChzdWdnZXN0aW9uKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFZhbHVlKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RHJvcGRvd24oZW1pdDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0Q3Vyc29yTWVudGlvbigpO1xuICAgIGlmICh0eXBlb2YgdGhpcy5jdXJzb3JNZW50aW9uICE9PSAnc3RyaW5nJyB8fCAhdGhpcy5jYW5PcGVuKCkpIHtcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnN1Z2dlc3Rpb25zRmlsdGVyKHRoaXMuY3Vyc29yTWVudGlvbiwgZW1pdCk7XG4gICAgY29uc3QgYWN0aXZlSW5kZXggPSB0aGlzLmZpbHRlcmVkU3VnZ2VzdGlvbnMuaW5kZXhPZih0aGlzLmN1cnNvck1lbnRpb24uc3Vic3RyaW5nKDEpKTtcbiAgICB0aGlzLmFjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXggPj0gMCA/IGFjdGl2ZUluZGV4IDogMDtcbiAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXROZXh0SXRlbUFjdGl2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZUluZGV4ID0gdGhpcy5hY3RpdmVJbmRleCArIDEgPD0gdGhpcy5maWx0ZXJlZFN1Z2dlc3Rpb25zLmxlbmd0aCAtIDEgPyB0aGlzLmFjdGl2ZUluZGV4ICsgMSA6IDA7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5zY3JvbGxUb0ZvY3VzSXRlbSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVJbmRleCA9IHRoaXMuYWN0aXZlSW5kZXggLSAxIDwgMCA/IHRoaXMuZmlsdGVyZWRTdWdnZXN0aW9ucy5sZW5ndGggLSAxIDogdGhpcy5hY3RpdmVJbmRleCAtIDE7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5zY3JvbGxUb0ZvY3VzSXRlbSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxUb0ZvY3VzSXRlbSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5mb2N1c0l0ZW1FbGVtZW50KSB7XG4gICAgICB0aGlzLmZvY3VzSXRlbUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCcgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYW5PcGVuKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50ID0gdGhpcy50cmlnZ2VyTmF0aXZlRWxlbWVudDtcbiAgICByZXR1cm4gIWVsZW1lbnQucmVhZE9ubHkgJiYgIWVsZW1lbnQuZGlzYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Q3Vyc29yTWVudGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudHJpZ2dlck5hdGl2ZUVsZW1lbnQudmFsdWUucmVwbGFjZSgvW1xcclxcbl0vZywgTlpfTUVOVElPTl9DT05GSUcuc3BsaXQpIHx8ICcnO1xuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy50cmlnZ2VyTmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCE7XG4gICAgY29uc3QgcHJlZml4ID0gdHlwZW9mIHRoaXMubnpQcmVmaXggPT09ICdzdHJpbmcnID8gW3RoaXMubnpQcmVmaXhdIDogdGhpcy5uelByZWZpeDtcbiAgICBsZXQgaSA9IHByZWZpeC5sZW5ndGg7XG4gICAgd2hpbGUgKGkgPj0gMCkge1xuICAgICAgY29uc3Qgc3RhcnRQb3MgPSB2YWx1ZS5sYXN0SW5kZXhPZihwcmVmaXhbaV0sIHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgIGNvbnN0IGVuZFBvcyA9XG4gICAgICAgIHZhbHVlLmluZGV4T2YoTlpfTUVOVElPTl9DT05GSUcuc3BsaXQsIHNlbGVjdGlvblN0YXJ0KSA+IC0xXG4gICAgICAgICAgPyB2YWx1ZS5pbmRleE9mKE5aX01FTlRJT05fQ09ORklHLnNwbGl0LCBzZWxlY3Rpb25TdGFydClcbiAgICAgICAgICA6IHZhbHVlLmxlbmd0aDtcbiAgICAgIGNvbnN0IG1lbnRpb24gPSB2YWx1ZS5zdWJzdHJpbmcoc3RhcnRQb3MsIGVuZFBvcyk7XG4gICAgICBpZiAoXG4gICAgICAgIChzdGFydFBvcyA+IDAgJiYgdmFsdWVbc3RhcnRQb3MgLSAxXSAhPT0gTlpfTUVOVElPTl9DT05GSUcuc3BsaXQpIHx8XG4gICAgICAgIHN0YXJ0UG9zIDwgMCB8fFxuICAgICAgICBtZW50aW9uLmluY2x1ZGVzKHByZWZpeFtpXSwgMSkgfHxcbiAgICAgICAgbWVudGlvbi5pbmNsdWRlcyhOWl9NRU5USU9OX0NPTkZJRy5zcGxpdClcbiAgICAgICkge1xuICAgICAgICB0aGlzLmN1cnNvck1lbnRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnNvck1lbnRpb25TdGFydCA9IC0xO1xuICAgICAgICB0aGlzLmN1cnNvck1lbnRpb25FbmQgPSAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3Vyc29yTWVudGlvbiA9IG1lbnRpb247XG4gICAgICAgIHRoaXMuY3Vyc29yTWVudGlvblN0YXJ0ID0gc3RhcnRQb3M7XG4gICAgICAgIHRoaXMuY3Vyc29yTWVudGlvbkVuZCA9IGVuZFBvcztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaS0tO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUG9zaXRpb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0Q2FyZXRDb29yZGluYXRlcyh0aGlzLnRyaWdnZXJOYXRpdmVFbGVtZW50LCB0aGlzLmN1cnNvck1lbnRpb25TdGFydCEpO1xuICAgIGNvbnN0IHRvcCA9XG4gICAgICBjb29yZGluYXRlcy50b3AgLVxuICAgICAgdGhpcy50cmlnZ2VyTmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgLVxuICAgICAgdGhpcy50cmlnZ2VyTmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgK1xuICAgICAgKHRoaXMubnpQbGFjZW1lbnQgPT09ICdib3R0b20nID8gY29vcmRpbmF0ZXMuaGVpZ2h0IC0gNiA6IC02KTtcbiAgICBjb25zdCBsZWZ0ID0gY29vcmRpbmF0ZXMubGVmdCAtIHRoaXMudHJpZ2dlck5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kud2l0aERlZmF1bHRPZmZzZXRYKGxlZnQpLndpdGhEZWZhdWx0T2Zmc2V0WSh0b3ApO1xuICAgIGlmICh0aGlzLm56UGxhY2VtZW50ID09PSAnYm90dG9tJykge1xuICAgICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5LndpdGhQb3NpdGlvbnMoWy4uLkRFRkFVTFRfTUVOVElPTl9CT1RUT01fUE9TSVRJT05TXSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm56UGxhY2VtZW50ID09PSAndG9wJykge1xuICAgICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5LndpdGhQb3NpdGlvbnMoWy4uLkRFRkFVTFRfTUVOVElPTl9UT1BfUE9TSVRJT05TXSk7XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb25TdHJhdGVneS5hcHBseSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVPdmVybGF5T3V0c2lkZUNsaWNrKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIG1lcmdlPE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50PihcbiAgICAgIHRoaXMub3ZlcmxheVJlZiEub3V0c2lkZVBvaW50ZXJFdmVudHMoKSxcbiAgICAgIGZyb21FdmVudDxUb3VjaEV2ZW50Pih0aGlzLm5nRG9jdW1lbnQsICd0b3VjaGVuZCcpXG4gICAgKS5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgY29uc3QgY2xpY2tUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuaXNPcGVuICYmXG4gICAgICAgIGNsaWNrVGFyZ2V0ICE9PSB0aGlzLnRyaWdnZXIuZWwubmF0aXZlRWxlbWVudCAmJlxuICAgICAgICAhdGhpcy5vdmVybGF5UmVmPy5vdmVybGF5RWxlbWVudC5jb250YWlucyhjbGlja1RhcmdldClcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoT3ZlcmxheSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5wb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5zdWdnZXN0aW9uc1RlbXAhLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh0aGlzLmdldE92ZXJsYXlDb25maWcoKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgIXRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKHRoaXMucG9ydGFsKTtcbiAgICAgIHRoaXMub3ZlcmxheU91dHNpZGVDbGlja1N1YnNjcmlwdGlvbiA9IHRoaXMuc3Vic2NyaWJlT3ZlcmxheU91dHNpZGVDbGljaygpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9ucygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPdmVybGF5Q29uZmlnKCk6IE92ZXJsYXlDb25maWcge1xuICAgIHJldHVybiBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLmdldE92ZXJsYXlQb3NpdGlvbigpLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKSxcbiAgICAgIGRpc3Bvc2VPbk5hdmlnYXRpb246IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtcbiAgICAgIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2JvdHRvbScgfSwgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICd0b3AnIH0pLFxuICAgICAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSlcbiAgICBdO1xuICAgIHRoaXMucG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheVxuICAgICAgLnBvc2l0aW9uKClcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMudHJpZ2dlci5lbClcbiAgICAgIC53aXRoUG9zaXRpb25zKHBvc2l0aW9ucylcbiAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgLndpdGhQdXNoKGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvblN0cmF0ZWd5O1xuICB9XG59XG4iXX0=