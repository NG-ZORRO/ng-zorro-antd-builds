/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ConnectionPositionPair } from '@angular/cdk/overlay';
export const POSITION_MAP = {
    top: new ConnectionPositionPair({ originX: 'center', originY: 'top' }, { overlayX: 'center', overlayY: 'bottom' }),
    topCenter: new ConnectionPositionPair({ originX: 'center', originY: 'top' }, { overlayX: 'center', overlayY: 'bottom' }),
    topLeft: new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
    topRight: new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
    right: new ConnectionPositionPair({ originX: 'end', originY: 'center' }, { overlayX: 'start', overlayY: 'center' }),
    rightTop: new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'start', overlayY: 'top' }),
    rightBottom: new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' }),
    bottom: new ConnectionPositionPair({ originX: 'center', originY: 'bottom' }, { overlayX: 'center', overlayY: 'top' }),
    bottomCenter: new ConnectionPositionPair({ originX: 'center', originY: 'bottom' }, { overlayX: 'center', overlayY: 'top' }),
    bottomLeft: new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    bottomRight: new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }),
    left: new ConnectionPositionPair({ originX: 'start', originY: 'center' }, { overlayX: 'end', overlayY: 'center' }),
    leftTop: new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' }),
    leftBottom: new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'end', overlayY: 'bottom' })
};
export const DEFAULT_TOOLTIP_POSITIONS = [POSITION_MAP.top, POSITION_MAP.right, POSITION_MAP.bottom, POSITION_MAP.left];
export const DEFAULT_CASCADER_POSITIONS = [
    POSITION_MAP.bottomLeft,
    POSITION_MAP.bottomRight,
    POSITION_MAP.topLeft,
    POSITION_MAP.topRight
];
export const DEFAULT_MENTION_TOP_POSITIONS = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'end', overlayY: 'bottom' })
];
export const DEFAULT_MENTION_BOTTOM_POSITIONS = [
    POSITION_MAP.bottomLeft,
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' })
];
export function getPlacementName(position) {
    for (const placement in POSITION_MAP) {
        if (position.connectionPair.originX === POSITION_MAP[placement].originX &&
            position.connectionPair.originY === POSITION_MAP[placement].originY &&
            position.connectionPair.overlayX === POSITION_MAP[placement].overlayX &&
            position.connectionPair.overlayY === POSITION_MAP[placement].overlayY) {
            return placement;
        }
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wb3NpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29yZS9vdmVybGF5L292ZXJsYXktcG9zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFrQyxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRztJQUMxQixHQUFHLEVBQUUsSUFBSSxzQkFBc0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDbEgsU0FBUyxFQUFFLElBQUksc0JBQXNCLENBQ25DLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQ3JDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQzNDO0lBQ0QsT0FBTyxFQUFFLElBQUksc0JBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3BILFFBQVEsRUFBRSxJQUFJLHNCQUFzQixDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUNqSCxLQUFLLEVBQUUsSUFBSSxzQkFBc0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFF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QUFZLENBQUMsVUFBVTtJQUN2QixJQUFJLHNCQUFzQixDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQztDQUMxRyxDQUFDO0FBRUYsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFFBQXdDO0lBQ3ZFLEtBQUssTUFBTSxTQUFTLElBQUksWUFBWSxFQUFFO1FBQ3BDLElBQ0UsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEtBQUssWUFBWSxDQUFDLFNBQTBCLENBQUMsQ0FBQyxPQUFPO1lBQ3BGLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxTQUEwQixDQUFDLENBQUMsT0FBTztZQUNwRixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUMsU0FBMEIsQ0FBQyxDQUFDLFFBQVE7WUFDdEYsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDLFNBQTBCLENBQUMsQ0FBQyxRQUFRLEVBQ3RGO1lBQ0EsT0FBTyxTQUFTLENBQUM7U0FDbEI7S0FDRjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UsIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5cbmV4cG9ydCBjb25zdCBQT1NJVElPTl9NQVAgPSB7XG4gIHRvcDogbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnY2VudGVyJywgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogJ2NlbnRlcicsIG92ZXJsYXlZOiAnYm90dG9tJyB9KSxcbiAgdG9wQ2VudGVyOiBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcihcbiAgICB7IG9yaWdpblg6ICdjZW50ZXInLCBvcmlnaW5ZOiAndG9wJyB9LFxuICAgIHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ2JvdHRvbScgfVxuICApLFxuICB0b3BMZWZ0OiBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICd0b3AnIH0sIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnYm90dG9tJyB9KSxcbiAgdG9wUmlnaHQ6IG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICd0b3AnIH0sIHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSksXG4gIHJpZ2h0OiBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAnY2VudGVyJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2NlbnRlcicgfSksXG4gIHJpZ2h0VG9wOiBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAndG9wJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcgfSksXG4gIHJpZ2h0Qm90dG9tOiBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcihcbiAgICB7IG9yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAnYm90dG9tJyB9LFxuICAgIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnYm90dG9tJyB9XG4gICksXG4gIGJvdHRvbTogbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnY2VudGVyJywgb3JpZ2luWTogJ2JvdHRvbScgfSwgeyBvdmVybGF5WDogJ2NlbnRlcicsIG92ZXJsYXlZOiAndG9wJyB9KSxcbiAgYm90dG9tQ2VudGVyOiBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcihcbiAgICB7IG9yaWdpblg6ICdjZW50ZXInLCBvcmlnaW5ZOiAnYm90dG9tJyB9LFxuICAgIHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ3RvcCcgfVxuICApLFxuICBib3R0b21MZWZ0OiBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcihcbiAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sXG4gICAgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICd0b3AnIH1cbiAgKSxcbiAgYm90dG9tUmlnaHQ6IG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdib3R0b20nIH0sIHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ3RvcCcgfSksXG4gIGxlZnQ6IG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2NlbnRlcicgfSwgeyBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnY2VudGVyJyB9KSxcbiAgbGVmdFRvcDogbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJyB9LCB7IG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICd0b3AnIH0pLFxuICBsZWZ0Qm90dG9tOiBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcihcbiAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sXG4gICAgeyBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnYm90dG9tJyB9XG4gIClcbn07XG5leHBvcnQgdHlwZSBQT1NJVElPTl9UWVBFID0ga2V5b2YgdHlwZW9mIFBPU0lUSU9OX01BUDtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVE9PTFRJUF9QT1NJVElPTlMgPSBbUE9TSVRJT05fTUFQLnRvcCwgUE9TSVRJT05fTUFQLnJpZ2h0LCBQT1NJVElPTl9NQVAuYm90dG9tLCBQT1NJVElPTl9NQVAubGVmdF07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NBU0NBREVSX1BPU0lUSU9OUyA9IFtcbiAgUE9TSVRJT05fTUFQLmJvdHRvbUxlZnQsXG4gIFBPU0lUSU9OX01BUC5ib3R0b21SaWdodCxcbiAgUE9TSVRJT05fTUFQLnRvcExlZnQsXG4gIFBPU0lUSU9OX01BUC50b3BSaWdodFxuXTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUVOVElPTl9UT1BfUE9TSVRJT05TID0gW1xuICBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnYm90dG9tJyB9KSxcbiAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJyB9LCB7IG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICdib3R0b20nIH0pXG5dO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9NRU5USU9OX0JPVFRPTV9QT1NJVElPTlMgPSBbXG4gIFBPU0lUSU9OX01BUC5ib3R0b21MZWZ0LFxuICBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sIHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ3RvcCcgfSlcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbGFjZW1lbnROYW1lKHBvc2l0aW9uOiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBmb3IgKGNvbnN0IHBsYWNlbWVudCBpbiBQT1NJVElPTl9NQVApIHtcbiAgICBpZiAoXG4gICAgICBwb3NpdGlvbi5jb25uZWN0aW9uUGFpci5vcmlnaW5YID09PSBQT1NJVElPTl9NQVBbcGxhY2VtZW50IGFzIFBPU0lUSU9OX1RZUEVdLm9yaWdpblggJiZcbiAgICAgIHBvc2l0aW9uLmNvbm5lY3Rpb25QYWlyLm9yaWdpblkgPT09IFBPU0lUSU9OX01BUFtwbGFjZW1lbnQgYXMgUE9TSVRJT05fVFlQRV0ub3JpZ2luWSAmJlxuICAgICAgcG9zaXRpb24uY29ubmVjdGlvblBhaXIub3ZlcmxheVggPT09IFBPU0lUSU9OX01BUFtwbGFjZW1lbnQgYXMgUE9TSVRJT05fVFlQRV0ub3ZlcmxheVggJiZcbiAgICAgIHBvc2l0aW9uLmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlZID09PSBQT1NJVElPTl9NQVBbcGxhY2VtZW50IGFzIFBPU0lUSU9OX1RZUEVdLm92ZXJsYXlZXG4gICAgKSB7XG4gICAgICByZXR1cm4gcGxhY2VtZW50O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIl19