/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { NzContextMenuServiceModule } from './context-menu.service.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
const listOfPositions = [
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
];
export class NzContextMenuService {
    constructor(overlay) {
        this.overlay = overlay;
        this.overlayRef = null;
        this.closeSubscription = Subscription.EMPTY;
    }
    create($event, nzDropdownMenuComponent) {
        this.close(true);
        const { x, y } = $event;
        if ($event instanceof MouseEvent) {
            $event.preventDefault();
        }
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo({ x, y })
            .withPositions(listOfPositions)
            .withTransformOriginOn('.ant-dropdown');
        this.overlayRef = this.overlay.create({
            positionStrategy,
            disposeOnNavigation: true,
            scrollStrategy: this.overlay.scrollStrategies.close()
        });
        this.closeSubscription = merge(nzDropdownMenuComponent.descendantMenuItemClick$, fromEvent(document, 'click').pipe(filter(event => !!this.overlayRef && !this.overlayRef.overlayElement.contains(event.target)), 
        /** handle firefox contextmenu event **/
        filter(event => event.button !== 2), take(1))).subscribe(() => {
            this.close();
        });
        this.overlayRef.attach(new TemplatePortal(nzDropdownMenuComponent.templateRef, nzDropdownMenuComponent.viewContainerRef));
    }
    close(clear = false) {
        if (this.overlayRef) {
            this.overlayRef.detach();
            if (clear) {
                this.overlayRef.dispose();
            }
            this.overlayRef = null;
            this.closeSubscription.unsubscribe();
        }
    }
}
NzContextMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContextMenuService, deps: [{ token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable });
NzContextMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContextMenuService, providedIn: NzContextMenuServiceModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContextMenuService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: NzContextMenuServiceModule
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2Ryb3Bkb3duL2NvbnRleHQtbWVudS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxzQkFBc0IsRUFBdUIsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7O0FBRzNFLE1BQU0sZUFBZSxHQUFHO0lBQ3RCLElBQUksc0JBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3hHLElBQUksc0JBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQzNHLElBQUksc0JBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3pHLElBQUksc0JBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO0NBQ3ZHLENBQUM7QUFLRixNQUFNLE9BQU8sb0JBQW9CO0lBSS9CLFlBQW9CLE9BQWdCO1FBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFINUIsZUFBVSxHQUFzQixJQUFJLENBQUM7UUFDckMsc0JBQWlCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUVSLENBQUM7SUFFeEMsTUFBTSxDQUFDLE1BQTZDLEVBQUUsdUJBQWdEO1FBQ3BHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDeEIsSUFBSSxNQUFNLFlBQVksVUFBVSxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtRQUNELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDbEMsUUFBUSxFQUFFO2FBQ1YsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDN0IsYUFBYSxDQUFDLGVBQWUsQ0FBQzthQUM5QixxQkFBcUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3BDLGdCQUFnQjtZQUNoQixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRTtTQUN0RCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUM1Qix1QkFBdUIsQ0FBQyx3QkFBd0IsRUFDaEQsU0FBUyxDQUFhLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFxQixDQUFDLENBQUM7UUFDM0csd0NBQXdDO1FBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQ25DLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUNGLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ3BCLElBQUksY0FBYyxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUNsRyxDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFpQixLQUFLO1FBQzFCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEM7SUFDSCxDQUFDOztpSEEvQ1Usb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsMEJBQTBCOzJGQUUzQixvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLDBCQUEwQjtpQkFDdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDb25uZWN0aW9uUG9zaXRpb25QYWlyLCBPdmVybGF5LCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOekNvbnRleHRNZW51U2VydmljZU1vZHVsZSB9IGZyb20gJy4vY29udGV4dC1tZW51LnNlcnZpY2UubW9kdWxlJztcbmltcG9ydCB7IE56RHJvcGRvd25NZW51Q29tcG9uZW50IH0gZnJvbSAnLi9kcm9wZG93bi1tZW51LmNvbXBvbmVudCc7XG5cbmNvbnN0IGxpc3RPZlBvc2l0aW9ucyA9IFtcbiAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcgfSksXG4gIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdib3R0b20nIH0pLFxuICBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICd0b3AnIH0sIHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSksXG4gIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAndG9wJyB9KVxuXTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBOekNvbnRleHRNZW51U2VydmljZU1vZHVsZVxufSlcbmV4cG9ydCBjbGFzcyBOekNvbnRleHRNZW51U2VydmljZSB7XG4gIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGNsb3NlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSkge31cblxuICBjcmVhdGUoJGV2ZW50OiBNb3VzZUV2ZW50IHwgeyB4OiBudW1iZXI7IHk6IG51bWJlciB9LCBuekRyb3Bkb3duTWVudUNvbXBvbmVudDogTnpEcm9wZG93bk1lbnVDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlKHRydWUpO1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gJGV2ZW50O1xuICAgIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheVxuICAgICAgLnBvc2l0aW9uKClcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHsgeCwgeSB9KVxuICAgICAgLndpdGhQb3NpdGlvbnMobGlzdE9mUG9zaXRpb25zKVxuICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLmFudC1kcm9wZG93bicpO1xuICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneSxcbiAgICAgIGRpc3Bvc2VPbk5hdmlnYXRpb246IHRydWUsXG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuY2xvc2UoKVxuICAgIH0pO1xuICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24gPSBtZXJnZShcbiAgICAgIG56RHJvcGRvd25NZW51Q29tcG9uZW50LmRlc2NlbmRhbnRNZW51SXRlbUNsaWNrJCxcbiAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+ICEhdGhpcy5vdmVybGF5UmVmICYmICF0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSksXG4gICAgICAgIC8qKiBoYW5kbGUgZmlyZWZveCBjb250ZXh0bWVudSBldmVudCAqKi9cbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LmJ1dHRvbiAhPT0gMiksXG4gICAgICAgIHRha2UoMSlcbiAgICAgIClcbiAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaChcbiAgICAgIG5ldyBUZW1wbGF0ZVBvcnRhbChuekRyb3Bkb3duTWVudUNvbXBvbmVudC50ZW1wbGF0ZVJlZiwgbnpEcm9wZG93bk1lbnVDb21wb25lbnQudmlld0NvbnRhaW5lclJlZilcbiAgICApO1xuICB9XG5cbiAgY2xvc2UoY2xlYXI6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgIGlmIChjbGVhcikge1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5vdmVybGF5UmVmID0gbnVsbDtcbiAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==