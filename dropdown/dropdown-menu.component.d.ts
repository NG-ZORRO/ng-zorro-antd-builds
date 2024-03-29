/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AnimationEvent } from '@angular/animations';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { IndexableObject, NzSafeAny } from 'ng-zorro-antd/core/types';
import { MenuService } from 'ng-zorro-antd/menu';
import * as i0 from "@angular/core";
export declare type NzPlacementType = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';
export declare class NzDropdownMenuComponent implements AfterContentInit, OnDestroy, OnInit {
    private cdr;
    private elementRef;
    private renderer;
    viewContainerRef: ViewContainerRef;
    nzMenuService: MenuService;
    private directionality;
    noAnimation?: NzNoAnimationDirective | undefined;
    mouseState$: BehaviorSubject<boolean>;
    isChildSubMenuOpen$: BehaviorSubject<boolean>;
    descendantMenuItemClick$: Subject<any>;
    animationStateChange$: EventEmitter<AnimationEvent>;
    nzOverlayClassName: string;
    nzOverlayStyle: IndexableObject;
    templateRef: TemplateRef<NzSafeAny>;
    dir: Direction;
    private destroy$;
    onAnimationEvent(event: AnimationEvent): void;
    setMouseState(visible: boolean): void;
    setValue<T extends keyof NzDropdownMenuComponent>(key: T, value: this[T]): void;
    constructor(cdr: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2, viewContainerRef: ViewContainerRef, nzMenuService: MenuService, directionality: Directionality, noAnimation?: NzNoAnimationDirective | undefined);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzDropdownMenuComponent, [null, null, null, null, null, { optional: true; }, { optional: true; host: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzDropdownMenuComponent, "nz-dropdown-menu", ["nzDropdownMenu"], {}, {}, never, ["*"]>;
}
