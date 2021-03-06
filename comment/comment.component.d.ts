/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, OnDestroy, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { NzCommentActionComponent as CommentAction } from './comment-cells';
export declare class NzCommentComponent implements OnDestroy, OnInit {
    private cdr;
    private directionality;
    nzAuthor?: string | TemplateRef<void>;
    nzDatetime?: string | TemplateRef<void>;
    dir: Direction;
    private destroy$;
    actions: QueryList<CommentAction>;
    constructor(cdr: ChangeDetectorRef, directionality: Directionality);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
