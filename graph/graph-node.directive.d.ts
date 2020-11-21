/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AnimationBuilder } from '@angular/animations';
import { AfterViewInit, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { NzGraphGroupNode, NzGraphNode } from './interface';
interface Info {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class NzGraphNodeDirective implements AfterViewInit {
    private el;
    private builder;
    private renderer2;
    node: NzGraphNode | NzGraphGroupNode;
    readonly nodeClick: EventEmitter<NzGraphNode | NzGraphGroupNode>;
    onTriggerClick(event: MouseEvent): void;
    animationInfo: Info | null;
    private animationPlayer;
    constructor(el: ElementRef, builder: AnimationBuilder, renderer2: Renderer2);
    makeAnimation(isFirstChange?: boolean): Observable<void>;
    getAnimationInfo(): Info;
    nodeTransform(): {
        x: number;
        y: number;
    };
    computeCXPositionOfNodeShape(): number;
    ngAfterViewInit(): void;
}
export {};
