import * as i5$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i1 from '@angular/cdk/clipboard';
import { ClipboardModule } from '@angular/cdk/clipboard';
import * as i2$1 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i8 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, ViewChild, Inject, Optional, NgModule } from '@angular/core';
import * as i5 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i3 from 'ng-zorro-antd/core/trans-button';
import { NzTransButtonModule } from 'ng-zorro-antd/core/trans-button';
import * as i2 from 'ng-zorro-antd/i18n';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import * as i6 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i7 from 'ng-zorro-antd/input';
import { NzAutosizeDirective, NzInputModule } from 'ng-zorro-antd/input';
import * as i4 from 'ng-zorro-antd/tooltip';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { __decorate } from 'tslib';
import * as i1$1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { cancelRequestAnimationFrame, reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import { isStyleSupport, measure, InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import * as i4$1 from 'ng-zorro-antd/core/services';

class NzTextCopyComponent {
    constructor(host, cdr, clipboard, i18n) {
        this.host = host;
        this.cdr = cdr;
        this.clipboard = clipboard;
        this.i18n = i18n;
        this.copied = false;
        this.copyId = -1;
        this.nativeElement = this.host.nativeElement;
        this.copyTooltip = null;
        this.copedTooltip = null;
        this.copyIcon = 'copy';
        this.copedIcon = 'check';
        this.destroy$ = new Subject();
        this.icons = ['copy', 'check'];
        this.textCopy = new EventEmitter();
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Text');
            this.updateTooltips();
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { tooltips, icons } = changes;
        if (tooltips) {
            this.updateTooltips();
        }
        if (icons) {
            this.updateIcons();
        }
    }
    ngOnDestroy() {
        clearTimeout(this.copyId);
        this.destroy$.next();
        this.destroy$.complete();
    }
    onClick() {
        if (this.copied) {
            return;
        }
        this.copied = true;
        this.cdr.detectChanges();
        const text = this.text;
        this.textCopy.emit(text);
        this.clipboard.copy(text);
        this.onCopied();
    }
    onCopied() {
        clearTimeout(this.copyId);
        this.copyId = setTimeout(() => {
            this.copied = false;
            this.cdr.detectChanges();
        }, 3000);
    }
    updateTooltips() {
        if (this.tooltips === null) {
            this.copedTooltip = null;
            this.copyTooltip = null;
        }
        else if (Array.isArray(this.tooltips)) {
            const [copyTooltip, copedTooltip] = this.tooltips;
            this.copyTooltip = copyTooltip || this.locale?.copy;
            this.copedTooltip = copedTooltip || this.locale?.copied;
        }
        else {
            this.copyTooltip = this.locale?.copy;
            this.copedTooltip = this.locale?.copied;
        }
        this.cdr.markForCheck();
    }
    updateIcons() {
        const [copyIcon, copedIcon] = this.icons;
        this.copyIcon = copyIcon;
        this.copedIcon = copedIcon;
        this.cdr.markForCheck();
    }
}
NzTextCopyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTextCopyComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.Clipboard }, { token: i2.NzI18nService }], target: i0.ɵɵFactoryTarget.Component });
NzTextCopyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTextCopyComponent, selector: "nz-text-copy", inputs: { text: "text", tooltips: "tooltips", icons: "icons" }, outputs: { textCopy: "textCopy" }, exportAs: ["nzTextCopy"], usesOnChanges: true, ngImport: i0, template: `
    <button
      type="button"
      nz-tooltip
      nz-trans-button
      [nzTooltipTitle]="copied ? copedTooltip : copyTooltip"
      class="ant-typography-copy"
      [class.ant-typography-copy-success]="copied"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="copied ? copedIcon : copyIcon; let icon">
        <i nz-icon [nzType]="icon"></i>
      </ng-container>
    </button>
  `, isInline: true, directives: [{ type: i3.NzTransButtonDirective, selector: "button[nz-trans-button]" }, { type: i4.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTextCopyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-text-copy',
                    exportAs: 'nzTextCopy',
                    template: `
    <button
      type="button"
      nz-tooltip
      nz-trans-button
      [nzTooltipTitle]="copied ? copedTooltip : copyTooltip"
      class="ant-typography-copy"
      [class.ant-typography-copy-success]="copied"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="copied ? copedIcon : copyIcon; let icon">
        <i nz-icon [nzType]="icon"></i>
      </ng-container>
    </button>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.Clipboard }, { type: i2.NzI18nService }]; }, propDecorators: { text: [{
                type: Input
            }], tooltips: [{
                type: Input
            }], icons: [{
                type: Input
            }], textCopy: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTextEditComponent {
    constructor(zone, host, cdr, i18n) {
        this.zone = zone;
        this.host = host;
        this.cdr = cdr;
        this.i18n = i18n;
        this.editing = false;
        this.destroy$ = new Subject();
        this.icon = 'edit';
        this.startEditing = new EventEmitter();
        this.endEditing = new EventEmitter(true);
        this.nativeElement = this.host.nativeElement;
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Text');
            this.cdr.markForCheck();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    onClick() {
        this.beforeText = this.text;
        this.currentText = this.beforeText;
        this.editing = true;
        this.startEditing.emit();
        this.focusAndSetValue();
    }
    confirm() {
        this.editing = false;
        this.endEditing.emit(this.currentText);
    }
    onInput(event) {
        const target = event.target;
        this.currentText = target.value;
    }
    onEnter(event) {
        event.stopPropagation();
        event.preventDefault();
        this.confirm();
    }
    onCancel() {
        this.currentText = this.beforeText;
        this.confirm();
    }
    focusAndSetValue() {
        this.zone.onStable.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
            if (this.textarea?.nativeElement) {
                this.textarea.nativeElement.focus();
                this.textarea.nativeElement.value = this.currentText || '';
                this.autosizeDirective.resizeToFitContent();
                this.cdr.markForCheck();
            }
        });
    }
}
NzTextEditComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTextEditComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.NzI18nService }], target: i0.ɵɵFactoryTarget.Component });
NzTextEditComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTextEditComponent, selector: "nz-text-edit", inputs: { text: "text", icon: "icon", tooltip: "tooltip" }, outputs: { startEditing: "startEditing", endEditing: "endEditing" }, viewQueries: [{ propertyName: "textarea", first: true, predicate: ["textarea"], descendants: true }, { propertyName: "autosizeDirective", first: true, predicate: NzAutosizeDirective, descendants: true }], exportAs: ["nzTextEdit"], ngImport: i0, template: `
    <button
      *ngIf="!editing"
      nz-tooltip
      nz-trans-button
      class="ant-typography-edit"
      [nzTooltipTitle]="tooltip === null ? null : tooltip || locale?.edit"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="icon; let icon">
        <i nz-icon [nzType]="icon"></i>
      </ng-container>
    </button>
    <ng-container *ngIf="editing">
      <textarea
        #textarea
        nz-input
        nzAutosize
        (input)="onInput($event)"
        (blur)="confirm()"
        (keydown.esc)="onCancel()"
        (keydown.enter)="onEnter($event)"
      ></textarea>
      <button nz-trans-button class="ant-typography-edit-content-confirm" (click)="confirm()">
        <i nz-icon nzType="enter"></i>
      </button>
    </ng-container>
  `, isInline: true, directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzTransButtonDirective, selector: "button[nz-trans-button]" }, { type: i4.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i7.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "disabled"], exportAs: ["nzInput"] }, { type: i7.NzAutosizeDirective, selector: "textarea[nzAutosize]", inputs: ["nzAutosize"], exportAs: ["nzAutosize"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTextEditComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-text-edit',
                    exportAs: 'nzTextEdit',
                    template: `
    <button
      *ngIf="!editing"
      nz-tooltip
      nz-trans-button
      class="ant-typography-edit"
      [nzTooltipTitle]="tooltip === null ? null : tooltip || locale?.edit"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="icon; let icon">
        <i nz-icon [nzType]="icon"></i>
      </ng-container>
    </button>
    <ng-container *ngIf="editing">
      <textarea
        #textarea
        nz-input
        nzAutosize
        (input)="onInput($event)"
        (blur)="confirm()"
        (keydown.esc)="onCancel()"
        (keydown.enter)="onEnter($event)"
      ></textarea>
      <button nz-trans-button class="ant-typography-edit-content-confirm" (click)="confirm()">
        <i nz-icon nzType="enter"></i>
      </button>
    </ng-container>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.NzI18nService }]; }, propDecorators: { text: [{
                type: Input
            }], icon: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], startEditing: [{
                type: Output
            }], endEditing: [{
                type: Output
            }], textarea: [{
                type: ViewChild,
                args: ['textarea', { static: false }]
            }], autosizeDirective: [{
                type: ViewChild,
                args: [NzAutosizeDirective, { static: false }]
            }] } });

const NZ_CONFIG_MODULE_NAME = 'typography';
const EXPAND_ELEMENT_CLASSNAME = 'ant-typography-expand';
class NzTypographyComponent {
    constructor(nzConfigService, host, cdr, viewContainerRef, renderer, platform, i18n, document, resizeService, directionality) {
        this.nzConfigService = nzConfigService;
        this.host = host;
        this.cdr = cdr;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.platform = platform;
        this.i18n = i18n;
        this.resizeService = resizeService;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzCopyable = false;
        this.nzEditable = false;
        this.nzDisabled = false;
        this.nzExpandable = false;
        this.nzEllipsis = false;
        this.nzCopyTooltips = undefined;
        this.nzCopyIcons = ['copy', 'check'];
        this.nzEditTooltip = undefined;
        this.nzEditIcon = 'edit';
        this.nzEllipsisRows = 1;
        this.nzContentChange = new EventEmitter();
        this.nzCopy = new EventEmitter();
        this.nzExpandChange = new EventEmitter();
        // This is not a two-way binding output with {@link nzEllipsis}
        this.nzOnEllipsis = new EventEmitter();
        this.expandableBtnElementCache = null;
        this.editing = false;
        this.cssEllipsis = false;
        this.isEllipsis = true;
        this.expanded = false;
        this.ellipsisStr = '...';
        this.dir = 'ltr';
        this.viewInit = false;
        this.rfaId = -1;
        this.destroy$ = new Subject();
        this.windowResizeSubscription = Subscription.EMPTY;
        this.document = document;
    }
    get hasEllipsisObservers() {
        return this.nzOnEllipsis.observers.length > 0;
    }
    get canCssEllipsis() {
        return this.nzEllipsis && this.cssEllipsis && !this.expanded && !this.hasEllipsisObservers;
    }
    get hasOperationsWithEllipsis() {
        return (this.nzCopyable || this.nzEditable || this.nzExpandable) && this.nzEllipsis;
    }
    get copyText() {
        return (typeof this.nzCopyText === 'string' ? this.nzCopyText : this.nzContent);
    }
    onTextCopy(text) {
        this.nzCopy.emit(text);
    }
    onStartEditing() {
        this.editing = true;
    }
    onEndEditing(text) {
        this.editing = false;
        this.nzContentChange.emit(text);
        if (this.nzContent === text) {
            this.renderOnNextFrame();
        }
        this.cdr.markForCheck();
    }
    onExpand() {
        this.isEllipsis = false;
        this.expanded = true;
        this.nzExpandChange.emit();
        this.nzOnEllipsis.emit(false);
    }
    canUseCSSEllipsis() {
        if (this.nzEditable || this.nzCopyable || this.nzExpandable || this.nzSuffix) {
            return false;
        }
        // make sure {@link nzOnEllipsis} works, will force use JS to calculations
        if (this.hasEllipsisObservers) {
            return false;
        }
        if (this.nzEllipsisRows === 1) {
            return isStyleSupport('textOverflow');
        }
        else {
            return isStyleSupport('webkitLineClamp');
        }
    }
    renderOnNextFrame() {
        cancelRequestAnimationFrame(this.rfaId);
        if (!this.viewInit || !this.nzEllipsis || this.nzEllipsisRows < 0 || this.expanded || !this.platform.isBrowser) {
            return;
        }
        this.rfaId = reqAnimFrame(() => {
            this.syncEllipsis();
        });
    }
    getOriginContentViewRef() {
        const viewRef = this.viewContainerRef.createEmbeddedView(this.contentTemplate, {
            content: this.nzContent
        });
        viewRef.detectChanges();
        return {
            viewRef,
            removeView: () => {
                this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef));
            }
        };
    }
    syncEllipsis() {
        if (this.cssEllipsis) {
            return;
        }
        const { viewRef, removeView } = this.getOriginContentViewRef();
        const fixedNodes = [this.textCopyRef, this.textEditRef]
            .filter(e => e && e.nativeElement)
            .map(e => e.nativeElement);
        const expandableBtnElement = this.getExpandableBtnElement();
        if (expandableBtnElement) {
            fixedNodes.push(expandableBtnElement);
        }
        const { contentNodes, text, ellipsis } = measure(this.host.nativeElement, this.nzEllipsisRows, viewRef.rootNodes, fixedNodes, this.ellipsisStr, this.nzSuffix);
        removeView();
        this.ellipsisText = text;
        if (ellipsis !== this.isEllipsis) {
            this.isEllipsis = ellipsis;
            this.nzOnEllipsis.emit(ellipsis);
        }
        const ellipsisContainerNativeElement = this.ellipsisContainer.nativeElement;
        while (ellipsisContainerNativeElement.firstChild) {
            this.renderer.removeChild(ellipsisContainerNativeElement, ellipsisContainerNativeElement.firstChild);
        }
        contentNodes.forEach(n => {
            this.renderer.appendChild(ellipsisContainerNativeElement, n.cloneNode(true));
        });
        this.cdr.markForCheck();
    }
    // Need to create the element for calculation size before view init
    getExpandableBtnElement() {
        if (this.nzExpandable) {
            const expandText = this.locale ? this.locale.expand : '';
            const cache = this.expandableBtnElementCache;
            if (!cache || cache.innerText === expandText) {
                const el = this.document.createElement('a');
                el.className = EXPAND_ELEMENT_CLASSNAME;
                el.innerText = expandText;
                this.expandableBtnElementCache = el;
            }
            return this.expandableBtnElementCache;
        }
        else {
            this.expandableBtnElementCache = null;
            return null;
        }
    }
    renderAndSubscribeWindowResize() {
        if (this.platform.isBrowser) {
            this.windowResizeSubscription.unsubscribe();
            this.cssEllipsis = this.canUseCSSEllipsis();
            this.renderOnNextFrame();
            this.windowResizeSubscription = this.resizeService
                .subscribe()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.renderOnNextFrame());
        }
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Text');
            this.cdr.markForCheck();
        });
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngAfterViewInit() {
        this.viewInit = true;
        this.renderAndSubscribeWindowResize();
    }
    ngOnChanges(changes) {
        const { nzCopyable, nzEditable, nzExpandable, nzEllipsis, nzContent, nzEllipsisRows, nzSuffix } = changes;
        if (nzCopyable || nzEditable || nzExpandable || nzEllipsis || nzContent || nzEllipsisRows || nzSuffix) {
            if (this.nzEllipsis) {
                if (this.expanded) {
                    this.windowResizeSubscription.unsubscribe();
                }
                else {
                    this.renderAndSubscribeWindowResize();
                }
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.expandableBtnElementCache = null;
        this.windowResizeSubscription.unsubscribe();
    }
}
NzTypographyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyComponent, deps: [{ token: i1$1.NzConfigService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }, { token: i2$1.Platform }, { token: i2.NzI18nService }, { token: DOCUMENT }, { token: i4$1.NzResizeService }, { token: i5$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTypographyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTypographyComponent, selector: "\n  nz-typography,\n  [nz-typography],\n  p[nz-paragraph],\n  span[nz-text],\n  h1[nz-title], h2[nz-title], h3[nz-title], h4[nz-title]\n  ", inputs: { nzCopyable: "nzCopyable", nzEditable: "nzEditable", nzDisabled: "nzDisabled", nzExpandable: "nzExpandable", nzEllipsis: "nzEllipsis", nzCopyTooltips: "nzCopyTooltips", nzCopyIcons: "nzCopyIcons", nzEditTooltip: "nzEditTooltip", nzEditIcon: "nzEditIcon", nzContent: "nzContent", nzEllipsisRows: "nzEllipsisRows", nzType: "nzType", nzCopyText: "nzCopyText", nzSuffix: "nzSuffix" }, outputs: { nzContentChange: "nzContentChange", nzCopy: "nzCopy", nzExpandChange: "nzExpandChange", nzOnEllipsis: "nzOnEllipsis" }, host: { properties: { "class.ant-typography": "!editing", "class.ant-typography-rtl": "dir === \"rtl\"", "class.ant-typography-edit-content": "editing", "class.ant-typography-secondary": "nzType === \"secondary\"", "class.ant-typography-warning": "nzType === \"warning\"", "class.ant-typography-danger": "nzType === \"danger\"", "class.ant-typography-success": "nzType === \"success\"", "class.ant-typography-disabled": "nzDisabled", "class.ant-typography-ellipsis": "nzEllipsis && !expanded", "class.ant-typography-single-line": "nzEllipsis && nzEllipsisRows === 1", "class.ant-typography-ellipsis-single-line": "canCssEllipsis && nzEllipsisRows === 1", "class.ant-typography-ellipsis-multiple-line": "canCssEllipsis && nzEllipsisRows > 1", "style.-webkit-line-clamp": "(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null" } }, viewQueries: [{ propertyName: "textEditRef", first: true, predicate: NzTextEditComponent, descendants: true }, { propertyName: "textCopyRef", first: true, predicate: NzTextCopyComponent, descendants: true }, { propertyName: "ellipsisContainer", first: true, predicate: ["ellipsisContainer"], descendants: true }, { propertyName: "expandableBtn", first: true, predicate: ["expandable"], descendants: true }, { propertyName: "contentTemplate", first: true, predicate: ["contentTemplate"], descendants: true }], exportAs: ["nzTypography"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #contentTemplate let-content="content">
      <ng-content *ngIf="!content"></ng-content>
      {{ content }}
    </ng-template>
    <ng-container *ngIf="!editing">
      <ng-container
        *ngIf="
          expanded ||
            (!hasOperationsWithEllipsis && nzEllipsisRows === 1 && !hasEllipsisObservers) ||
            canCssEllipsis ||
            (nzSuffix && expanded);
          else jsEllipsis
        "
      >
        <ng-template
          [ngTemplateOutlet]="contentTemplate"
          [ngTemplateOutletContext]="{ content: nzContent }"
        ></ng-template>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
      </ng-container>
      <ng-template #jsEllipsis>
        <span #ellipsisContainer></span>
        <ng-container *ngIf="isEllipsis">{{ ellipsisStr }}</ng-container>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
        <a #expandable *ngIf="nzExpandable && isEllipsis" class="ant-typography-expand" (click)="onExpand()">
          {{ locale?.expand }}
        </a>
      </ng-template>
    </ng-container>

    <nz-text-edit
      *ngIf="nzEditable"
      [text]="nzContent"
      [icon]="nzEditIcon"
      [tooltip]="nzEditTooltip"
      (endEditing)="onEndEditing($event)"
      (startEditing)="onStartEditing()"
    ></nz-text-edit>

    <nz-text-copy
      *ngIf="nzCopyable && !editing"
      [text]="copyText"
      [tooltips]="nzCopyTooltips"
      [icons]="nzCopyIcons"
      (textCopy)="onTextCopy($event)"
    ></nz-text-copy>
  `, isInline: true, components: [{ type: NzTextEditComponent, selector: "nz-text-edit", inputs: ["text", "icon", "tooltip"], outputs: ["startEditing", "endEditing"], exportAs: ["nzTextEdit"] }, { type: NzTextCopyComponent, selector: "nz-text-copy", inputs: ["text", "tooltips", "icons"], outputs: ["textCopy"], exportAs: ["nzTextCopy"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzTypographyComponent.prototype, "nzCopyable", void 0);
__decorate([
    InputBoolean()
], NzTypographyComponent.prototype, "nzEditable", void 0);
__decorate([
    InputBoolean()
], NzTypographyComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzTypographyComponent.prototype, "nzExpandable", void 0);
__decorate([
    InputBoolean()
], NzTypographyComponent.prototype, "nzEllipsis", void 0);
__decorate([
    WithConfig()
], NzTypographyComponent.prototype, "nzCopyTooltips", void 0);
__decorate([
    WithConfig()
], NzTypographyComponent.prototype, "nzCopyIcons", void 0);
__decorate([
    WithConfig()
], NzTypographyComponent.prototype, "nzEditTooltip", void 0);
__decorate([
    WithConfig()
], NzTypographyComponent.prototype, "nzEditIcon", void 0);
__decorate([
    WithConfig(),
    InputNumber()
], NzTypographyComponent.prototype, "nzEllipsisRows", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `
  nz-typography,
  [nz-typography],
  p[nz-paragraph],
  span[nz-text],
  h1[nz-title], h2[nz-title], h3[nz-title], h4[nz-title]
  `,
                    exportAs: 'nzTypography',
                    template: `
    <ng-template #contentTemplate let-content="content">
      <ng-content *ngIf="!content"></ng-content>
      {{ content }}
    </ng-template>
    <ng-container *ngIf="!editing">
      <ng-container
        *ngIf="
          expanded ||
            (!hasOperationsWithEllipsis && nzEllipsisRows === 1 && !hasEllipsisObservers) ||
            canCssEllipsis ||
            (nzSuffix && expanded);
          else jsEllipsis
        "
      >
        <ng-template
          [ngTemplateOutlet]="contentTemplate"
          [ngTemplateOutletContext]="{ content: nzContent }"
        ></ng-template>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
      </ng-container>
      <ng-template #jsEllipsis>
        <span #ellipsisContainer></span>
        <ng-container *ngIf="isEllipsis">{{ ellipsisStr }}</ng-container>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
        <a #expandable *ngIf="nzExpandable && isEllipsis" class="ant-typography-expand" (click)="onExpand()">
          {{ locale?.expand }}
        </a>
      </ng-template>
    </ng-container>

    <nz-text-edit
      *ngIf="nzEditable"
      [text]="nzContent"
      [icon]="nzEditIcon"
      [tooltip]="nzEditTooltip"
      (endEditing)="onEndEditing($event)"
      (startEditing)="onStartEditing()"
    ></nz-text-edit>

    <nz-text-copy
      *ngIf="nzCopyable && !editing"
      [text]="copyText"
      [tooltips]="nzCopyTooltips"
      [icons]="nzCopyIcons"
      (textCopy)="onTextCopy($event)"
    ></nz-text-copy>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    host: {
                        '[class.ant-typography]': '!editing',
                        '[class.ant-typography-rtl]': 'dir === "rtl"',
                        '[class.ant-typography-edit-content]': 'editing',
                        '[class.ant-typography-secondary]': 'nzType === "secondary"',
                        '[class.ant-typography-warning]': 'nzType === "warning"',
                        '[class.ant-typography-danger]': 'nzType === "danger"',
                        '[class.ant-typography-success]': 'nzType === "success"',
                        '[class.ant-typography-disabled]': 'nzDisabled',
                        '[class.ant-typography-ellipsis]': 'nzEllipsis && !expanded',
                        '[class.ant-typography-single-line]': 'nzEllipsis && nzEllipsisRows === 1',
                        '[class.ant-typography-ellipsis-single-line]': 'canCssEllipsis && nzEllipsisRows === 1',
                        '[class.ant-typography-ellipsis-multiple-line]': 'canCssEllipsis && nzEllipsisRows > 1',
                        '[style.-webkit-line-clamp]': '(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1$1.NzConfigService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }, { type: i2$1.Platform }, { type: i2.NzI18nService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i4$1.NzResizeService }, { type: i5$1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzCopyable: [{
                type: Input
            }], nzEditable: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzExpandable: [{
                type: Input
            }], nzEllipsis: [{
                type: Input
            }], nzCopyTooltips: [{
                type: Input
            }], nzCopyIcons: [{
                type: Input
            }], nzEditTooltip: [{
                type: Input
            }], nzEditIcon: [{
                type: Input
            }], nzContent: [{
                type: Input
            }], nzEllipsisRows: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzCopyText: [{
                type: Input
            }], nzSuffix: [{
                type: Input
            }], nzContentChange: [{
                type: Output
            }], nzCopy: [{
                type: Output
            }], nzExpandChange: [{
                type: Output
            }], nzOnEllipsis: [{
                type: Output
            }], textEditRef: [{
                type: ViewChild,
                args: [NzTextEditComponent, { static: false }]
            }], textCopyRef: [{
                type: ViewChild,
                args: [NzTextCopyComponent, { static: false }]
            }], ellipsisContainer: [{
                type: ViewChild,
                args: ['ellipsisContainer', { static: false }]
            }], expandableBtn: [{
                type: ViewChild,
                args: ['expandable', { static: false }]
            }], contentTemplate: [{
                type: ViewChild,
                args: ['contentTemplate', { static: false }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTypographyModule {
}
NzTypographyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTypographyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyModule, declarations: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent], imports: [BidiModule,
        CommonModule,
        NzIconModule,
        NzToolTipModule,
        NzInputModule,
        NzI18nModule,
        NzTransButtonModule,
        ClipboardModule,
        NzOutletModule], exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent, PlatformModule] });
NzTypographyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyModule, imports: [[
            BidiModule,
            CommonModule,
            NzIconModule,
            NzToolTipModule,
            NzInputModule,
            NzI18nModule,
            NzTransButtonModule,
            ClipboardModule,
            NzOutletModule
        ], PlatformModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        CommonModule,
                        NzIconModule,
                        NzToolTipModule,
                        NzInputModule,
                        NzI18nModule,
                        NzTransButtonModule,
                        ClipboardModule,
                        NzOutletModule
                    ],
                    exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent, PlatformModule],
                    declarations: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzTextCopyComponent, NzTextEditComponent, NzTypographyComponent, NzTypographyModule };
//# sourceMappingURL=ng-zorro-antd-typography.mjs.map
