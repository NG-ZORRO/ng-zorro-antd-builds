/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { TimelineService } from './timeline.service';
import { NzTimelineItemColor, NzTimelinePosition } from './typings';
export declare class NzTimelineItemComponent implements OnChanges {
    private cdr;
    private timelineService;
    template: TemplateRef<void>;
    nzPosition?: NzTimelinePosition;
    nzColor: NzTimelineItemColor;
    nzDot?: string | TemplateRef<void>;
    isLast: boolean;
    borderColor: string | null;
    position?: NzTimelinePosition;
    constructor(cdr: ChangeDetectorRef, timelineService: TimelineService);
    ngOnChanges(changes: SimpleChanges): void;
    detectChanges(): void;
    private updateCustomColor;
}
