/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Subject } from 'rxjs';
import { NzCarouselBaseStrategy } from './base-strategy';
export class NzCarouselOpacityStrategy extends NzCarouselBaseStrategy {
    withCarouselContents(contents) {
        super.withCarouselContents(contents);
        if (this.contents) {
            this.slickTrackEl.style.width = `${this.length * this.unitWidth}px`;
            this.contents.forEach((content, i) => {
                this.renderer.setStyle(content.el, 'opacity', this.carouselComponent.activeIndex === i ? '1' : '0');
                this.renderer.setStyle(content.el, 'position', 'relative');
                this.renderer.setStyle(content.el, 'width', `${this.unitWidth}px`);
                this.renderer.setStyle(content.el, 'left', `${-this.unitWidth * i}px`);
                this.renderer.setStyle(content.el, 'transition', ['opacity 500ms ease 0s', 'visibility 500ms ease 0s']);
            });
        }
    }
    switch(_f, _t) {
        const { to: t } = this.getFromToInBoundary(_f, _t);
        const complete$ = new Subject();
        this.contents.forEach((content, i) => {
            this.renderer.setStyle(content.el, 'opacity', t === i ? '1' : '0');
        });
        setTimeout(() => {
            complete$.next();
            complete$.complete();
        }, this.carouselComponent.nzTransitionSpeed);
        return complete$;
    }
    dispose() {
        this.contents.forEach((content) => {
            this.renderer.setStyle(content.el, 'transition', null);
        });
        super.dispose();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BhY2l0eS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2Fyb3VzZWwvc3RyYXRlZ2llcy9vcGFjaXR5LXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUdILE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFekQsTUFBTSxPQUFPLHlCQUEwQixTQUFRLHNCQUFzQjtJQUNuRSxvQkFBb0IsQ0FBQyxRQUFzRDtRQUN6RSxLQUFLLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFckMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDO1lBRXBFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBbUMsRUFBRSxDQUFTLEVBQUUsRUFBRTtnQkFDdkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFrQixDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLHVCQUF1QixFQUFFLDBCQUEwQixDQUFDLENBQUMsQ0FBQztZQUMxRyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFVLEVBQUUsRUFBVTtRQUMzQixNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUV0QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQW1DLEVBQUUsQ0FBUyxFQUFFLEVBQUU7WUFDdkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakIsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU5QyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBbUMsRUFBRSxFQUFFO1lBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOekNhcm91c2VsQ29udGVudERpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsLWNvbnRlbnQuZGlyZWN0aXZlJztcblxuaW1wb3J0IHsgTnpDYXJvdXNlbEJhc2VTdHJhdGVneSB9IGZyb20gJy4vYmFzZS1zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBOekNhcm91c2VsT3BhY2l0eVN0cmF0ZWd5IGV4dGVuZHMgTnpDYXJvdXNlbEJhc2VTdHJhdGVneSB7XG4gIHdpdGhDYXJvdXNlbENvbnRlbnRzKGNvbnRlbnRzOiBRdWVyeUxpc3Q8TnpDYXJvdXNlbENvbnRlbnREaXJlY3RpdmU+IHwgbnVsbCk6IHZvaWQge1xuICAgIHN1cGVyLndpdGhDYXJvdXNlbENvbnRlbnRzKGNvbnRlbnRzKTtcblxuICAgIGlmICh0aGlzLmNvbnRlbnRzKSB7XG4gICAgICB0aGlzLnNsaWNrVHJhY2tFbC5zdHlsZS53aWR0aCA9IGAke3RoaXMubGVuZ3RoICogdGhpcy51bml0V2lkdGh9cHhgO1xuXG4gICAgICB0aGlzLmNvbnRlbnRzLmZvckVhY2goKGNvbnRlbnQ6IE56Q2Fyb3VzZWxDb250ZW50RGlyZWN0aXZlLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250ZW50LmVsLCAnb3BhY2l0eScsIHRoaXMuY2Fyb3VzZWxDb21wb25lbnQhLmFjdGl2ZUluZGV4ID09PSBpID8gJzEnIDogJzAnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250ZW50LmVsLCAncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250ZW50LmVsLCAnd2lkdGgnLCBgJHt0aGlzLnVuaXRXaWR0aH1weGApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRlbnQuZWwsICdsZWZ0JywgYCR7LXRoaXMudW5pdFdpZHRoICogaX1weGApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRlbnQuZWwsICd0cmFuc2l0aW9uJywgWydvcGFjaXR5IDUwMG1zIGVhc2UgMHMnLCAndmlzaWJpbGl0eSA1MDBtcyBlYXNlIDBzJ10pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoKF9mOiBudW1iZXIsIF90OiBudW1iZXIpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHRvOiB0IH0gPSB0aGlzLmdldEZyb21Ub0luQm91bmRhcnkoX2YsIF90KTtcbiAgICBjb25zdCBjb21wbGV0ZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgdGhpcy5jb250ZW50cy5mb3JFYWNoKChjb250ZW50OiBOekNhcm91c2VsQ29udGVudERpcmVjdGl2ZSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRlbnQuZWwsICdvcGFjaXR5JywgdCA9PT0gaSA/ICcxJyA6ICcwJyk7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbXBsZXRlJC5uZXh0KCk7XG4gICAgICBjb21wbGV0ZSQuY29tcGxldGUoKTtcbiAgICB9LCB0aGlzLmNhcm91c2VsQ29tcG9uZW50IS5uelRyYW5zaXRpb25TcGVlZCk7XG5cbiAgICByZXR1cm4gY29tcGxldGUkO1xuICB9XG5cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRzLmZvckVhY2goKGNvbnRlbnQ6IE56Q2Fyb3VzZWxDb250ZW50RGlyZWN0aXZlKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRlbnQuZWwsICd0cmFuc2l0aW9uJywgbnVsbCk7XG4gICAgfSk7XG5cbiAgICBzdXBlci5kaXNwb3NlKCk7XG4gIH1cbn1cbiJdfQ==