import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * Generated from: animation-consts.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
var AnimationDuration = /** @class */ (function () {
    function AnimationDuration() {
    }
    AnimationDuration.SLOW = '0.3s'; // Modal
    // Modal
    AnimationDuration.BASE = '0.2s';
    AnimationDuration.FAST = '0.1s'; // Tooltip
    return AnimationDuration;
}());
if (false) {
    /** @type {?} */
    AnimationDuration.SLOW;
    /** @type {?} */
    AnimationDuration.BASE;
    /** @type {?} */
    AnimationDuration.FAST;
}
var AnimationCurves = /** @class */ (function () {
    function AnimationCurves() {
    }
    AnimationCurves.EASE_BASE_OUT = 'cubic-bezier(0.7, 0.3, 0.1, 1)';
    AnimationCurves.EASE_BASE_IN = 'cubic-bezier(0.9, 0, 0.3, 0.7)';
    AnimationCurves.EASE_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
    AnimationCurves.EASE_IN = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
    AnimationCurves.EASE_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
    AnimationCurves.EASE_OUT_BACK = 'cubic-bezier(0.12, 0.4, 0.29, 1.46)';
    AnimationCurves.EASE_IN_BACK = 'cubic-bezier(0.71, -0.46, 0.88, 0.6)';
    AnimationCurves.EASE_IN_OUT_BACK = 'cubic-bezier(0.71, -0.46, 0.29, 1.46)';
    AnimationCurves.EASE_OUT_CIRC = 'cubic-bezier(0.08, 0.82, 0.17, 1)';
    AnimationCurves.EASE_IN_CIRC = 'cubic-bezier(0.6, 0.04, 0.98, 0.34)';
    AnimationCurves.EASE_IN_OUT_CIRC = 'cubic-bezier(0.78, 0.14, 0.15, 0.86)';
    AnimationCurves.EASE_OUT_QUINT = 'cubic-bezier(0.23, 1, 0.32, 1)';
    AnimationCurves.EASE_IN_QUINT = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';
    AnimationCurves.EASE_IN_OUT_QUINT = 'cubic-bezier(0.86, 0, 0.07, 1)';
    return AnimationCurves;
}());
if (false) {
    /** @type {?} */
    AnimationCurves.EASE_BASE_OUT;
    /** @type {?} */
    AnimationCurves.EASE_BASE_IN;
    /** @type {?} */
    AnimationCurves.EASE_OUT;
    /** @type {?} */
    AnimationCurves.EASE_IN;
    /** @type {?} */
    AnimationCurves.EASE_IN_OUT;
    /** @type {?} */
    AnimationCurves.EASE_OUT_BACK;
    /** @type {?} */
    AnimationCurves.EASE_IN_BACK;
    /** @type {?} */
    AnimationCurves.EASE_IN_OUT_BACK;
    /** @type {?} */
    AnimationCurves.EASE_OUT_CIRC;
    /** @type {?} */
    AnimationCurves.EASE_IN_CIRC;
    /** @type {?} */
    AnimationCurves.EASE_IN_OUT_CIRC;
    /** @type {?} */
    AnimationCurves.EASE_OUT_QUINT;
    /** @type {?} */
    AnimationCurves.EASE_IN_QUINT;
    /** @type {?} */
    AnimationCurves.EASE_IN_OUT_QUINT;
}

/**
 * @fileoverview added by tsickle
 * Generated from: collapse.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var collapseMotion = trigger('collapseMotion', [
    state('expanded', style({ height: '*' })),
    state('collapsed', style({ height: 0, overflow: 'hidden' })),
    state('hidden', style({ height: 0, overflow: 'hidden', borderTopWidth: '0' })),
    transition('expanded => collapsed', animate("150ms " + AnimationCurves.EASE_IN_OUT)),
    transition('expanded => hidden', animate("150ms " + AnimationCurves.EASE_IN_OUT)),
    transition('collapsed => expanded', animate("150ms " + AnimationCurves.EASE_IN_OUT)),
    transition('hidden => expanded', animate("150ms " + AnimationCurves.EASE_IN_OUT))
]);
/** @type {?} */
var treeCollapseMotion = trigger('treeCollapseMotion', [
    transition('* => *', [
        query('nz-tree-node:leave', [style({ overflow: 'hidden' }), stagger(0, [animate("150ms " + AnimationCurves.EASE_IN_OUT, style({ height: 0 }))])], {
            optional: true
        }),
        query('nz-tree-node:enter', [
            style({ overflow: 'hidden', height: 0 }),
            stagger(0, [animate("150ms " + AnimationCurves.EASE_IN_OUT, style({ overflow: 'hidden', height: '*' }))])
        ], {
            optional: true
        })
    ])
]);

/**
 * @fileoverview added by tsickle
 * Generated from: fade.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var fadeMotion = trigger('fadeMotion', [
    transition(':enter', [style({ opacity: 0 }), animate("" + AnimationDuration.BASE, style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate("" + AnimationDuration.BASE, style({ opacity: 0 }))])
]);

/**
 * @fileoverview added by tsickle
 * Generated from: help.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var helpMotion = trigger('helpMotion', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateY(-5px)'
        }),
        animate(AnimationDuration.SLOW + " " + AnimationCurves.EASE_IN_OUT, style({
            opacity: 1,
            transform: 'translateY(0)'
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'translateY(0)'
        }),
        animate(AnimationDuration.SLOW + " " + AnimationCurves.EASE_IN_OUT, style({
            opacity: 0,
            transform: 'translateY(-5px)'
        }))
    ])
]);

/**
 * @fileoverview added by tsickle
 * Generated from: move.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var moveUpMotion = trigger('moveUpMotion', [
    transition('* => enter', [
        style({
            transformOrigin: '0 0',
            transform: 'translateY(-100%)',
            opacity: 0
        }),
        animate("" + AnimationDuration.BASE, style({
            transformOrigin: '0 0',
            transform: 'translateY(0%)',
            opacity: 1
        }))
    ]),
    transition('* => leave', [
        style({
            transformOrigin: '0 0',
            transform: 'translateY(0%)',
            opacity: 1
        }),
        animate("" + AnimationDuration.BASE, style({
            transformOrigin: '0 0',
            transform: 'translateY(-100%)',
            opacity: 0
        }))
    ])
]);

/**
 * @fileoverview added by tsickle
 * Generated from: notification.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var notificationMotion = trigger('notificationMotion', [
    state('enterRight', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('* => enterRight', [style({ opacity: 0, transform: 'translateX(5%)' }), animate('100ms linear')]),
    state('enterLeft', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('* => enterLeft', [style({ opacity: 0, transform: 'translateX(-5%)' }), animate('100ms linear')]),
    state('leave', style({
        opacity: 0,
        transform: 'scaleY(0.8)',
        transformOrigin: '0% 0%'
    })),
    transition('* => leave', [
        style({
            opacity: 1,
            transform: 'scaleY(1)',
            transformOrigin: '0% 0%'
        }),
        animate('100ms linear')
    ])
]);

/**
 * @fileoverview added by tsickle
 * Generated from: slide.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var ANIMATION_TRANSITION_IN = AnimationDuration.BASE + " " + AnimationCurves.EASE_OUT_QUINT;
/** @type {?} */
var ANIMATION_TRANSITION_OUT = AnimationDuration.BASE + " " + AnimationCurves.EASE_IN_QUINT;
/** @type {?} */
var slideMotion = trigger('slideMotion', [
    state('void', style({
        opacity: 0,
        transform: 'scaleY(0.8)'
    })),
    state('enter', style({
        opacity: 1,
        transform: 'scaleY(1)'
    })),
    transition('void => *', [animate(ANIMATION_TRANSITION_IN)]),
    transition('* => void', [animate(ANIMATION_TRANSITION_OUT)])
]);
/** @type {?} */
var slideAlertMotion = trigger('slideAlertMotion', [
    transition(':leave', [
        style({ opacity: 1, transform: 'scaleY(1)', transformOrigin: '0% 0%' }),
        animate(AnimationDuration.SLOW + " " + AnimationCurves.EASE_IN_OUT_CIRC, style({
            opacity: 0,
            transform: 'scaleY(0)',
            transformOrigin: '0% 0%'
        }))
    ])
]);

/**
 * @fileoverview added by tsickle
 * Generated from: zoom.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var zoomMotion = trigger('zoomMotion', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.2)' }),
        animate(AnimationDuration.BASE + " " + AnimationCurves.EASE_OUT_CIRC, style({
            opacity: 1,
            transform: 'scale(1)'
        }))
    ]),
    transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate(AnimationDuration.BASE + " " + AnimationCurves.EASE_IN_OUT_CIRC, style({
            opacity: 0,
            transform: 'scale(0.2)'
        }))
    ])
]);
/** @type {?} */
var zoomBigMotion = trigger('zoomBigMotion', [
    transition('void => active', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(AnimationDuration.BASE + " " + AnimationCurves.EASE_OUT_CIRC, style({
            opacity: 1,
            transform: 'scale(1)'
        }))
    ]),
    transition('active => void', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate(AnimationDuration.BASE + " " + AnimationCurves.EASE_IN_OUT_CIRC, style({
            opacity: 0,
            transform: 'scale(0.8)'
        }))
    ])
]);
/** @type {?} */
var zoomBadgeMotion = trigger('zoomBadgeMotion', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0) translate(50%, -50%)' }),
        animate(AnimationDuration.SLOW + " " + AnimationCurves.EASE_OUT_BACK, style({
            opacity: 1,
            transform: 'scale(1) translate(50%, -50%)'
        }))
    ]),
    transition(':leave', [
        style({ opacity: 1, transform: 'scale(1) translate(50%, -50%)' }),
        animate(AnimationDuration.SLOW + " " + AnimationCurves.EASE_IN_BACK, style({
            opacity: 0,
            transform: 'scale(0) translate(50%, -50%)'
        }))
    ])
]);

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-core-animation.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AnimationCurves, AnimationDuration, collapseMotion, fadeMotion, helpMotion, moveUpMotion, notificationMotion, slideAlertMotion, slideMotion, treeCollapseMotion, zoomBadgeMotion, zoomBigMotion, zoomMotion };
//# sourceMappingURL=ng-zorro-antd-core-animation.js.map
