/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BACKSPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, Host, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzSelectSearchComponent } from './select-search.component';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/no-animation";
import * as i2 from "./select-search.component";
import * as i3 from "./select-item.component";
import * as i4 from "./select-placeholder.component";
import * as i5 from "@angular/common";
import * as i6 from "ng-zorro-antd/core/transition-patch";
export class NzSelectTopControlComponent {
    constructor(elementRef, ngZone, noAnimation) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.noAnimation = noAnimation;
        this.nzId = null;
        this.showSearch = false;
        this.placeHolder = null;
        this.open = false;
        this.maxTagCount = Infinity;
        this.autofocus = false;
        this.disabled = false;
        this.mode = 'default';
        this.customTemplate = null;
        this.maxTagPlaceholder = null;
        this.removeIcon = null;
        this.listOfTopItem = [];
        this.tokenSeparators = [];
        this.tokenize = new EventEmitter();
        this.inputValueChange = new EventEmitter();
        this.deleteItem = new EventEmitter();
        this.listOfSlicedItem = [];
        this.isShowPlaceholder = true;
        this.isShowSingleLabel = false;
        this.isComposing = false;
        this.inputValue = null;
        this.destroy$ = new Subject();
    }
    updateTemplateVariable() {
        const isSelectedValueEmpty = this.listOfTopItem.length === 0;
        this.isShowPlaceholder = isSelectedValueEmpty && !this.isComposing && !this.inputValue;
        this.isShowSingleLabel = !isSelectedValueEmpty && !this.isComposing && !this.inputValue;
    }
    isComposingChange(isComposing) {
        this.isComposing = isComposing;
        this.updateTemplateVariable();
    }
    onInputValueChange(value) {
        if (value !== this.inputValue) {
            this.inputValue = value;
            this.updateTemplateVariable();
            this.inputValueChange.emit(value);
            this.tokenSeparate(value, this.tokenSeparators);
        }
    }
    tokenSeparate(inputValue, tokenSeparators) {
        const includesSeparators = (str, separators) => {
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < separators.length; ++i) {
                if (str.lastIndexOf(separators[i]) > 0) {
                    return true;
                }
            }
            return false;
        };
        const splitBySeparators = (str, separators) => {
            const reg = new RegExp(`[${separators.join()}]`);
            const array = str.split(reg).filter(token => token);
            return [...new Set(array)];
        };
        if (inputValue &&
            inputValue.length &&
            tokenSeparators.length &&
            this.mode !== 'default' &&
            includesSeparators(inputValue, tokenSeparators)) {
            const listOfLabel = splitBySeparators(inputValue, tokenSeparators);
            this.tokenize.next(listOfLabel);
        }
    }
    clearInputValue() {
        if (this.nzSelectSearchComponent) {
            this.nzSelectSearchComponent.clearInputValue();
        }
    }
    focus() {
        if (this.nzSelectSearchComponent) {
            this.nzSelectSearchComponent.focus();
        }
    }
    blur() {
        if (this.nzSelectSearchComponent) {
            this.nzSelectSearchComponent.blur();
        }
    }
    trackValue(_index, option) {
        return option.nzValue;
    }
    onDeleteItem(item) {
        if (!this.disabled && !item.nzDisabled) {
            this.deleteItem.next(item);
        }
    }
    ngOnChanges(changes) {
        const { listOfTopItem, maxTagCount, customTemplate, maxTagPlaceholder } = changes;
        if (listOfTopItem) {
            this.updateTemplateVariable();
        }
        if (listOfTopItem || maxTagCount || customTemplate || maxTagPlaceholder) {
            const listOfSlicedItem = this.listOfTopItem.slice(0, this.maxTagCount).map(o => ({
                nzLabel: o.nzLabel,
                nzValue: o.nzValue,
                nzDisabled: o.nzDisabled,
                contentTemplateOutlet: this.customTemplate,
                contentTemplateOutletContext: o
            }));
            if (this.listOfTopItem.length > this.maxTagCount) {
                const exceededLabel = `+ ${this.listOfTopItem.length - this.maxTagCount} ...`;
                const listOfSelectedValue = this.listOfTopItem.map(item => item.nzValue);
                const exceededItem = {
                    nzLabel: exceededLabel,
                    nzValue: '$$__nz_exceeded_item',
                    nzDisabled: true,
                    contentTemplateOutlet: this.maxTagPlaceholder,
                    contentTemplateOutletContext: listOfSelectedValue.slice(this.maxTagCount)
                };
                listOfSlicedItem.push(exceededItem);
            }
            this.listOfSlicedItem = listOfSlicedItem;
        }
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                // `HTMLElement.focus()` is a native DOM API which doesn't require Angular to run change detection.
                if (event.target !== this.nzSelectSearchComponent.inputElement.nativeElement) {
                    this.nzSelectSearchComponent.focus();
                }
            });
            fromEvent(this.elementRef.nativeElement, 'keydown')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                if (event.target instanceof HTMLInputElement) {
                    const inputValue = event.target.value;
                    if (event.keyCode === BACKSPACE &&
                        this.mode !== 'default' &&
                        !inputValue &&
                        this.listOfTopItem.length > 0) {
                        event.preventDefault();
                        // Run change detection only if the user has pressed the `Backspace` key and the following condition is met.
                        this.ngZone.run(() => this.onDeleteItem(this.listOfTopItem[this.listOfTopItem.length - 1]));
                    }
                }
            });
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
}
NzSelectTopControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSelectTopControlComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i1.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzSelectTopControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSelectTopControlComponent, selector: "nz-select-top-control", inputs: { nzId: "nzId", showSearch: "showSearch", placeHolder: "placeHolder", open: "open", maxTagCount: "maxTagCount", autofocus: "autofocus", disabled: "disabled", mode: "mode", customTemplate: "customTemplate", maxTagPlaceholder: "maxTagPlaceholder", removeIcon: "removeIcon", listOfTopItem: "listOfTopItem", tokenSeparators: "tokenSeparators" }, outputs: { tokenize: "tokenize", inputValueChange: "inputValueChange", deleteItem: "deleteItem" }, host: { classAttribute: "ant-select-selector" }, viewQueries: [{ propertyName: "nzSelectSearchComponent", first: true, predicate: NzSelectSearchComponent, descendants: true }], exportAs: ["nzSelectTopControl"], usesOnChanges: true, ngImport: i0, template: `
    <!--single mode-->
    <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'default'">
        <nz-select-search
          [nzId]="nzId"
          [disabled]="disabled"
          [value]="inputValue!"
          [showInput]="showSearch"
          [mirrorSync]="false"
          [autofocus]="autofocus"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
        <nz-select-item
          *ngIf="isShowSingleLabel"
          [deletable]="false"
          [disabled]="false"
          [removeIcon]="removeIcon"
          [label]="listOfTopItem[0].nzLabel"
          [contentTemplateOutlet]="customTemplate"
          [contentTemplateOutletContext]="listOfTopItem[0]"
        ></nz-select-item>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <!--multiple or tags mode-->
        <nz-select-item
          *ngFor="let item of listOfSlicedItem; trackBy: trackValue"
          [removeIcon]="removeIcon"
          [label]="item.nzLabel"
          [disabled]="item.nzDisabled || disabled"
          [contentTemplateOutlet]="item.contentTemplateOutlet"
          [deletable]="true"
          [contentTemplateOutletContext]="item.contentTemplateOutletContext"
          (delete)="onDeleteItem(item.contentTemplateOutletContext)"
        ></nz-select-item>
        <nz-select-search
          [nzId]="nzId"
          [disabled]="disabled"
          [value]="inputValue!"
          [autofocus]="autofocus"
          [showInput]="true"
          [mirrorSync]="true"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
      </ng-container>
    </ng-container>
    <nz-select-placeholder *ngIf="isShowPlaceholder" [placeholder]="placeHolder"></nz-select-placeholder>
  `, isInline: true, components: [{ type: i2.NzSelectSearchComponent, selector: "nz-select-search", inputs: ["nzId", "disabled", "mirrorSync", "showInput", "focusTrigger", "value", "autofocus"], outputs: ["valueChange", "isComposingChange"] }, { type: i3.NzSelectItemComponent, selector: "nz-select-item", inputs: ["disabled", "label", "deletable", "removeIcon", "contentTemplateOutletContext", "contentTemplateOutlet"], outputs: ["delete"] }, { type: i4.NzSelectPlaceholderComponent, selector: "nz-select-placeholder", inputs: ["placeholder"] }], directives: [{ type: i5.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i5.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSelectTopControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-select-top-control',
                    exportAs: 'nzSelectTopControl',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <!--single mode-->
    <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'default'">
        <nz-select-search
          [nzId]="nzId"
          [disabled]="disabled"
          [value]="inputValue!"
          [showInput]="showSearch"
          [mirrorSync]="false"
          [autofocus]="autofocus"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
        <nz-select-item
          *ngIf="isShowSingleLabel"
          [deletable]="false"
          [disabled]="false"
          [removeIcon]="removeIcon"
          [label]="listOfTopItem[0].nzLabel"
          [contentTemplateOutlet]="customTemplate"
          [contentTemplateOutletContext]="listOfTopItem[0]"
        ></nz-select-item>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <!--multiple or tags mode-->
        <nz-select-item
          *ngFor="let item of listOfSlicedItem; trackBy: trackValue"
          [removeIcon]="removeIcon"
          [label]="item.nzLabel"
          [disabled]="item.nzDisabled || disabled"
          [contentTemplateOutlet]="item.contentTemplateOutlet"
          [deletable]="true"
          [contentTemplateOutletContext]="item.contentTemplateOutletContext"
          (delete)="onDeleteItem(item.contentTemplateOutletContext)"
        ></nz-select-item>
        <nz-select-search
          [nzId]="nzId"
          [disabled]="disabled"
          [value]="inputValue!"
          [autofocus]="autofocus"
          [showInput]="true"
          [mirrorSync]="true"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
      </ng-container>
    </ng-container>
    <nz-select-placeholder *ngIf="isShowPlaceholder" [placeholder]="placeHolder"></nz-select-placeholder>
  `,
                    host: { class: 'ant-select-selector' }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }]; }, propDecorators: { nzId: [{
                type: Input
            }], showSearch: [{
                type: Input
            }], placeHolder: [{
                type: Input
            }], open: [{
                type: Input
            }], maxTagCount: [{
                type: Input
            }], autofocus: [{
                type: Input
            }], disabled: [{
                type: Input
            }], mode: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], maxTagPlaceholder: [{
                type: Input
            }], removeIcon: [{
                type: Input
            }], listOfTopItem: [{
                type: Input
            }], tokenSeparators: [{
                type: Input
            }], tokenize: [{
                type: Output
            }], inputValueChange: [{
                type: Output
            }], deleteItem: [{
                type: Output
            }], nzSelectSearchComponent: [{
                type: ViewChild,
                args: [NzSelectSearchComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXRvcC1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC10b3AtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixJQUFJLEVBQ0osS0FBSyxFQUtMLFFBQVEsRUFDUixNQUFNLEVBR04sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7O0FBK0RwRSxNQUFNLE9BQU8sMkJBQTJCO0lBcUd0QyxZQUNVLFVBQW1DLEVBQ25DLE1BQWMsRUFDSyxXQUEwQztRQUY3RCxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ0ssZ0JBQVcsR0FBWCxXQUFXLENBQStCO1FBdkc5RCxTQUFJLEdBQWtCLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGdCQUFXLEdBQTJDLElBQUksQ0FBQztRQUMzRCxTQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsZ0JBQVcsR0FBVyxRQUFRLENBQUM7UUFDL0IsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFNBQUksR0FBcUIsU0FBUyxDQUFDO1FBQ25DLG1CQUFjLEdBQTZELElBQUksQ0FBQztRQUNoRixzQkFBaUIsR0FBbUQsSUFB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ZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCQUNLU1BBQ0UgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOek5vQW5pbWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL25vLWFuaW1hdGlvbic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBOelNlbGVjdFNlYXJjaENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXNlYXJjaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTZWxlY3RJdGVtSW50ZXJmYWNlLCBOelNlbGVjdE1vZGVUeXBlLCBOelNlbGVjdFRvcENvbnRyb2xJdGVtVHlwZSB9IGZyb20gJy4vc2VsZWN0LnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotc2VsZWN0LXRvcC1jb250cm9sJyxcbiAgZXhwb3J0QXM6ICduelNlbGVjdFRvcENvbnRyb2wnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLXNpbmdsZSBtb2RlLS0+XG4gICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwibW9kZVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2RlZmF1bHQnXCI+XG4gICAgICAgIDxuei1zZWxlY3Qtc2VhcmNoXG4gICAgICAgICAgW256SWRdPVwibnpJZFwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICBbdmFsdWVdPVwiaW5wdXRWYWx1ZSFcIlxuICAgICAgICAgIFtzaG93SW5wdXRdPVwic2hvd1NlYXJjaFwiXG4gICAgICAgICAgW21pcnJvclN5bmNdPVwiZmFsc2VcIlxuICAgICAgICAgIFthdXRvZm9jdXNdPVwiYXV0b2ZvY3VzXCJcbiAgICAgICAgICBbZm9jdXNUcmlnZ2VyXT1cIm9wZW5cIlxuICAgICAgICAgIChpc0NvbXBvc2luZ0NoYW5nZSk9XCJpc0NvbXBvc2luZ0NoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAodmFsdWVDaGFuZ2UpPVwib25JbnB1dFZhbHVlQ2hhbmdlKCRldmVudClcIlxuICAgICAgICA+PC9uei1zZWxlY3Qtc2VhcmNoPlxuICAgICAgICA8bnotc2VsZWN0LWl0ZW1cbiAgICAgICAgICAqbmdJZj1cImlzU2hvd1NpbmdsZUxhYmVsXCJcbiAgICAgICAgICBbZGVsZXRhYmxlXT1cImZhbHNlXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiZmFsc2VcIlxuICAgICAgICAgIFtyZW1vdmVJY29uXT1cInJlbW92ZUljb25cIlxuICAgICAgICAgIFtsYWJlbF09XCJsaXN0T2ZUb3BJdGVtWzBdLm56TGFiZWxcIlxuICAgICAgICAgIFtjb250ZW50VGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGVcIlxuICAgICAgICAgIFtjb250ZW50VGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImxpc3RPZlRvcEl0ZW1bMF1cIlxuICAgICAgICA+PC9uei1zZWxlY3QtaXRlbT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICA8IS0tbXVsdGlwbGUgb3IgdGFncyBtb2RlLS0+XG4gICAgICAgIDxuei1zZWxlY3QtaXRlbVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGxpc3RPZlNsaWNlZEl0ZW07IHRyYWNrQnk6IHRyYWNrVmFsdWVcIlxuICAgICAgICAgIFtyZW1vdmVJY29uXT1cInJlbW92ZUljb25cIlxuICAgICAgICAgIFtsYWJlbF09XCJpdGVtLm56TGFiZWxcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJpdGVtLm56RGlzYWJsZWQgfHwgZGlzYWJsZWRcIlxuICAgICAgICAgIFtjb250ZW50VGVtcGxhdGVPdXRsZXRdPVwiaXRlbS5jb250ZW50VGVtcGxhdGVPdXRsZXRcIlxuICAgICAgICAgIFtkZWxldGFibGVdPVwidHJ1ZVwiXG4gICAgICAgICAgW2NvbnRlbnRUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiaXRlbS5jb250ZW50VGVtcGxhdGVPdXRsZXRDb250ZXh0XCJcbiAgICAgICAgICAoZGVsZXRlKT1cIm9uRGVsZXRlSXRlbShpdGVtLmNvbnRlbnRUZW1wbGF0ZU91dGxldENvbnRleHQpXCJcbiAgICAgICAgPjwvbnotc2VsZWN0LWl0ZW0+XG4gICAgICAgIDxuei1zZWxlY3Qtc2VhcmNoXG4gICAgICAgICAgW256SWRdPVwibnpJZFwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICBbdmFsdWVdPVwiaW5wdXRWYWx1ZSFcIlxuICAgICAgICAgIFthdXRvZm9jdXNdPVwiYXV0b2ZvY3VzXCJcbiAgICAgICAgICBbc2hvd0lucHV0XT1cInRydWVcIlxuICAgICAgICAgIFttaXJyb3JTeW5jXT1cInRydWVcIlxuICAgICAgICAgIFtmb2N1c1RyaWdnZXJdPVwib3BlblwiXG4gICAgICAgICAgKGlzQ29tcG9zaW5nQ2hhbmdlKT1cImlzQ29tcG9zaW5nQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICh2YWx1ZUNoYW5nZSk9XCJvbklucHV0VmFsdWVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID48L256LXNlbGVjdC1zZWFyY2g+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bnotc2VsZWN0LXBsYWNlaG9sZGVyICpuZ0lmPVwiaXNTaG93UGxhY2Vob2xkZXJcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2VIb2xkZXJcIj48L256LXNlbGVjdC1wbGFjZWhvbGRlcj5cbiAgYCxcbiAgaG9zdDogeyBjbGFzczogJ2FudC1zZWxlY3Qtc2VsZWN0b3InIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpTZWxlY3RUb3BDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG56SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBzaG93U2VhcmNoID0gZmFsc2U7XG4gIEBJbnB1dCgpIHBsYWNlSG9sZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG9wZW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbWF4VGFnQ291bnQ6IG51bWJlciA9IEluZmluaXR5O1xuICBASW5wdXQoKSBhdXRvZm9jdXMgPSBmYWxzZTtcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbW9kZTogTnpTZWxlY3RNb2RlVHlwZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOelNlbGVjdEl0ZW1JbnRlcmZhY2UgfT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbWF4VGFnUGxhY2Vob2xkZXI6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOelNhZmVBbnlbXSB9PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSByZW1vdmVJY29uOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGxpc3RPZlRvcEl0ZW06IE56U2VsZWN0SXRlbUludGVyZmFjZVtdID0gW107XG4gIEBJbnB1dCgpIHRva2VuU2VwYXJhdG9yczogc3RyaW5nW10gPSBbXTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHRva2VuaXplID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGlucHV0VmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRlbGV0ZUl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE56U2VsZWN0SXRlbUludGVyZmFjZT4oKTtcbiAgQFZpZXdDaGlsZChOelNlbGVjdFNlYXJjaENvbXBvbmVudCkgbnpTZWxlY3RTZWFyY2hDb21wb25lbnQhOiBOelNlbGVjdFNlYXJjaENvbXBvbmVudDtcbiAgbGlzdE9mU2xpY2VkSXRlbTogTnpTZWxlY3RUb3BDb250cm9sSXRlbVR5cGVbXSA9IFtdO1xuICBpc1Nob3dQbGFjZWhvbGRlciA9IHRydWU7XG4gIGlzU2hvd1NpbmdsZUxhYmVsID0gZmFsc2U7XG4gIGlzQ29tcG9zaW5nID0gZmFsc2U7XG4gIGlucHV0VmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHVwZGF0ZVRlbXBsYXRlVmFyaWFibGUoKTogdm9pZCB7XG4gICAgY29uc3QgaXNTZWxlY3RlZFZhbHVlRW1wdHkgPSB0aGlzLmxpc3RPZlRvcEl0ZW0ubGVuZ3RoID09PSAwO1xuICAgIHRoaXMuaXNTaG93UGxhY2Vob2xkZXIgPSBpc1NlbGVjdGVkVmFsdWVFbXB0eSAmJiAhdGhpcy5pc0NvbXBvc2luZyAmJiAhdGhpcy5pbnB1dFZhbHVlO1xuICAgIHRoaXMuaXNTaG93U2luZ2xlTGFiZWwgPSAhaXNTZWxlY3RlZFZhbHVlRW1wdHkgJiYgIXRoaXMuaXNDb21wb3NpbmcgJiYgIXRoaXMuaW5wdXRWYWx1ZTtcbiAgfVxuXG4gIGlzQ29tcG9zaW5nQ2hhbmdlKGlzQ29tcG9zaW5nOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc0NvbXBvc2luZyA9IGlzQ29tcG9zaW5nO1xuICAgIHRoaXMudXBkYXRlVGVtcGxhdGVWYXJpYWJsZSgpO1xuICB9XG5cbiAgb25JbnB1dFZhbHVlQ2hhbmdlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuaW5wdXRWYWx1ZSkge1xuICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnVwZGF0ZVRlbXBsYXRlVmFyaWFibGUoKTtcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgIHRoaXMudG9rZW5TZXBhcmF0ZSh2YWx1ZSwgdGhpcy50b2tlblNlcGFyYXRvcnMpO1xuICAgIH1cbiAgfVxuXG4gIHRva2VuU2VwYXJhdGUoaW5wdXRWYWx1ZTogc3RyaW5nLCB0b2tlblNlcGFyYXRvcnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3QgaW5jbHVkZXNTZXBhcmF0b3JzID0gKHN0cjogc3RyaW5nIHwgc3RyaW5nW10sIHNlcGFyYXRvcnM6IHN0cmluZ1tdKTogYm9vbGVhbiA9PiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3ByZWZlci1mb3Itb2ZcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VwYXJhdG9ycy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoc3RyLmxhc3RJbmRleE9mKHNlcGFyYXRvcnNbaV0pID4gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBjb25zdCBzcGxpdEJ5U2VwYXJhdG9ycyA9IChzdHI6IHN0cmluZyB8IHN0cmluZ1tdLCBzZXBhcmF0b3JzOiBzdHJpbmdbXSk6IHN0cmluZ1tdID0+IHtcbiAgICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYFske3NlcGFyYXRvcnMuam9pbigpfV1gKTtcbiAgICAgIGNvbnN0IGFycmF5ID0gKHN0ciBhcyBzdHJpbmcpLnNwbGl0KHJlZykuZmlsdGVyKHRva2VuID0+IHRva2VuKTtcbiAgICAgIHJldHVybiBbLi4ubmV3IFNldChhcnJheSldO1xuICAgIH07XG4gICAgaWYgKFxuICAgICAgaW5wdXRWYWx1ZSAmJlxuICAgICAgaW5wdXRWYWx1ZS5sZW5ndGggJiZcbiAgICAgIHRva2VuU2VwYXJhdG9ycy5sZW5ndGggJiZcbiAgICAgIHRoaXMubW9kZSAhPT0gJ2RlZmF1bHQnICYmXG4gICAgICBpbmNsdWRlc1NlcGFyYXRvcnMoaW5wdXRWYWx1ZSwgdG9rZW5TZXBhcmF0b3JzKVxuICAgICkge1xuICAgICAgY29uc3QgbGlzdE9mTGFiZWwgPSBzcGxpdEJ5U2VwYXJhdG9ycyhpbnB1dFZhbHVlLCB0b2tlblNlcGFyYXRvcnMpO1xuICAgICAgdGhpcy50b2tlbml6ZS5uZXh0KGxpc3RPZkxhYmVsKTtcbiAgICB9XG4gIH1cblxuICBjbGVhcklucHV0VmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpTZWxlY3RTZWFyY2hDb21wb25lbnQpIHtcbiAgICAgIHRoaXMubnpTZWxlY3RTZWFyY2hDb21wb25lbnQuY2xlYXJJbnB1dFZhbHVlKCk7XG4gICAgfVxuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpTZWxlY3RTZWFyY2hDb21wb25lbnQpIHtcbiAgICAgIHRoaXMubnpTZWxlY3RTZWFyY2hDb21wb25lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBibHVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56U2VsZWN0U2VhcmNoQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLm56U2VsZWN0U2VhcmNoQ29tcG9uZW50LmJsdXIoKTtcbiAgICB9XG4gIH1cblxuICB0cmFja1ZhbHVlKF9pbmRleDogbnVtYmVyLCBvcHRpb246IE56U2VsZWN0VG9wQ29udHJvbEl0ZW1UeXBlKTogTnpTYWZlQW55IHtcbiAgICByZXR1cm4gb3B0aW9uLm56VmFsdWU7XG4gIH1cblxuICBvbkRlbGV0ZUl0ZW0oaXRlbTogTnpTZWxlY3RJdGVtSW50ZXJmYWNlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICFpdGVtLm56RGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZGVsZXRlSXRlbS5uZXh0KGl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBASG9zdCgpIEBPcHRpb25hbCgpIHB1YmxpYyBub0FuaW1hdGlvbjogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB8IG51bGxcbiAgKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IGxpc3RPZlRvcEl0ZW0sIG1heFRhZ0NvdW50LCBjdXN0b21UZW1wbGF0ZSwgbWF4VGFnUGxhY2Vob2xkZXIgfSA9IGNoYW5nZXM7XG4gICAgaWYgKGxpc3RPZlRvcEl0ZW0pIHtcbiAgICAgIHRoaXMudXBkYXRlVGVtcGxhdGVWYXJpYWJsZSgpO1xuICAgIH1cbiAgICBpZiAobGlzdE9mVG9wSXRlbSB8fCBtYXhUYWdDb3VudCB8fCBjdXN0b21UZW1wbGF0ZSB8fCBtYXhUYWdQbGFjZWhvbGRlcikge1xuICAgICAgY29uc3QgbGlzdE9mU2xpY2VkSXRlbTogTnpTZWxlY3RUb3BDb250cm9sSXRlbVR5cGVbXSA9IHRoaXMubGlzdE9mVG9wSXRlbS5zbGljZSgwLCB0aGlzLm1heFRhZ0NvdW50KS5tYXAobyA9PiAoe1xuICAgICAgICBuekxhYmVsOiBvLm56TGFiZWwsXG4gICAgICAgIG56VmFsdWU6IG8ubnpWYWx1ZSxcbiAgICAgICAgbnpEaXNhYmxlZDogby5uekRpc2FibGVkLFxuICAgICAgICBjb250ZW50VGVtcGxhdGVPdXRsZXQ6IHRoaXMuY3VzdG9tVGVtcGxhdGUsXG4gICAgICAgIGNvbnRlbnRUZW1wbGF0ZU91dGxldENvbnRleHQ6IG9cbiAgICAgIH0pKTtcbiAgICAgIGlmICh0aGlzLmxpc3RPZlRvcEl0ZW0ubGVuZ3RoID4gdGhpcy5tYXhUYWdDb3VudCkge1xuICAgICAgICBjb25zdCBleGNlZWRlZExhYmVsID0gYCsgJHt0aGlzLmxpc3RPZlRvcEl0ZW0ubGVuZ3RoIC0gdGhpcy5tYXhUYWdDb3VudH0gLi4uYDtcbiAgICAgICAgY29uc3QgbGlzdE9mU2VsZWN0ZWRWYWx1ZSA9IHRoaXMubGlzdE9mVG9wSXRlbS5tYXAoaXRlbSA9PiBpdGVtLm56VmFsdWUpO1xuICAgICAgICBjb25zdCBleGNlZWRlZEl0ZW0gPSB7XG4gICAgICAgICAgbnpMYWJlbDogZXhjZWVkZWRMYWJlbCxcbiAgICAgICAgICBuelZhbHVlOiAnJCRfX256X2V4Y2VlZGVkX2l0ZW0nLFxuICAgICAgICAgIG56RGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgY29udGVudFRlbXBsYXRlT3V0bGV0OiB0aGlzLm1heFRhZ1BsYWNlaG9sZGVyLFxuICAgICAgICAgIGNvbnRlbnRUZW1wbGF0ZU91dGxldENvbnRleHQ6IGxpc3RPZlNlbGVjdGVkVmFsdWUuc2xpY2UodGhpcy5tYXhUYWdDb3VudClcbiAgICAgICAgfTtcbiAgICAgICAgbGlzdE9mU2xpY2VkSXRlbS5wdXNoKGV4Y2VlZGVkSXRlbSk7XG4gICAgICB9XG4gICAgICB0aGlzLmxpc3RPZlNsaWNlZEl0ZW0gPSBsaXN0T2ZTbGljZWRJdGVtO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2NsaWNrJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAvLyBgSFRNTEVsZW1lbnQuZm9jdXMoKWAgaXMgYSBuYXRpdmUgRE9NIEFQSSB3aGljaCBkb2Vzbid0IHJlcXVpcmUgQW5ndWxhciB0byBydW4gY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSB0aGlzLm56U2VsZWN0U2VhcmNoQ29tcG9uZW50LmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm56U2VsZWN0U2VhcmNoQ29tcG9uZW50LmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gQkFDS1NQQUNFICYmXG4gICAgICAgICAgICAgIHRoaXMubW9kZSAhPT0gJ2RlZmF1bHQnICYmXG4gICAgICAgICAgICAgICFpbnB1dFZhbHVlICYmXG4gICAgICAgICAgICAgIHRoaXMubGlzdE9mVG9wSXRlbS5sZW5ndGggPiAwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gb25seSBpZiB0aGUgdXNlciBoYXMgcHJlc3NlZCB0aGUgYEJhY2tzcGFjZWAga2V5IGFuZCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbiBpcyBtZXQuXG4gICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLm9uRGVsZXRlSXRlbSh0aGlzLmxpc3RPZlRvcEl0ZW1bdGhpcy5saXN0T2ZUb3BJdGVtLmxlbmd0aCAtIDFdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICB9XG59XG4iXX0=