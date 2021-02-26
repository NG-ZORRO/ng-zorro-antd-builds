/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { filter, take } from 'rxjs/operators';
export class NzImagePreviewRef {
    constructor(previewInstance, config, overlayRef) {
        this.previewInstance = previewInstance;
        this.config = config;
        this.overlayRef = overlayRef;
        overlayRef
            .keydownEvents()
            .pipe(filter(event => {
            return this.config.nzKeyboard && event.keyCode === ESCAPE && !hasModifierKey(event);
        }))
            .subscribe(event => {
            event.preventDefault();
            this.close();
        });
        overlayRef.detachments().subscribe(() => {
            this.overlayRef.dispose();
        });
        previewInstance.containerClick.pipe(take(1)).subscribe(() => {
            this.close();
        });
        previewInstance.closeClick.pipe(take(1)).subscribe(() => {
            this.close();
        });
        previewInstance.animationStateChanged
            .pipe(filter(event => event.phaseName === 'done' && event.toState === 'leave'), take(1))
            .subscribe(() => {
            this.dispose();
        });
    }
    switchTo(index) {
        this.previewInstance.switchTo(index);
    }
    next() {
        this.previewInstance.next();
    }
    prev() {
        this.previewInstance.prev();
    }
    close() {
        this.previewInstance.startLeaveAnimation();
    }
    dispose() {
        this.overlayRef.dispose();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtcHJldmlldy1yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2ltYWdlL2ltYWdlLXByZXZpZXctcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFL0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUs5QyxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQW1CLGVBQXdDLEVBQVUsTUFBNkIsRUFBVSxVQUFzQjtRQUEvRyxvQkFBZSxHQUFmLGVBQWUsQ0FBeUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDaEksVUFBVTthQUNQLGFBQWEsRUFBRTthQUNmLElBQUksQ0FDSCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDYixPQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBc0IsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRyxDQUFDLENBQUMsQ0FDSDthQUNBLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7UUFFTCxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMxRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdEQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMscUJBQXFCO2FBQ2xDLElBQUksQ0FDSCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxFQUN4RSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1I7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVPLE9BQU87UUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5pbXBvcnQgeyBFU0NBUEUsIGhhc01vZGlmaWVyS2V5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56SW1hZ2VQcmV2aWV3T3B0aW9ucyB9IGZyb20gJy4vaW1hZ2UtcHJldmlldy1vcHRpb25zJztcbmltcG9ydCB7IE56SW1hZ2VQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZS1wcmV2aWV3LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBOekltYWdlUHJldmlld1JlZiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcmV2aWV3SW5zdGFuY2U6IE56SW1hZ2VQcmV2aWV3Q29tcG9uZW50LCBwcml2YXRlIGNvbmZpZzogTnpJbWFnZVByZXZpZXdPcHRpb25zLCBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYpIHtcbiAgICBvdmVybGF5UmVmXG4gICAgICAua2V5ZG93bkV2ZW50cygpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHtcbiAgICAgICAgICByZXR1cm4gKHRoaXMuY29uZmlnLm56S2V5Ym9hcmQgYXMgYm9vbGVhbikgJiYgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmICFoYXNNb2RpZmllcktleShldmVudCk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfSk7XG5cbiAgICBvdmVybGF5UmVmLmRldGFjaG1lbnRzKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgfSk7XG5cbiAgICBwcmV2aWV3SW5zdGFuY2UuY29udGFpbmVyQ2xpY2sucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgcHJldmlld0luc3RhbmNlLmNsb3NlQ2xpY2sucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgcHJldmlld0luc3RhbmNlLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSAnbGVhdmUnKSxcbiAgICAgICAgdGFrZSgxKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgfSk7XG4gIH1cblxuICBzd2l0Y2hUbyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wcmV2aWV3SW5zdGFuY2Uuc3dpdGNoVG8oaW5kZXgpO1xuICB9XG5cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLnByZXZpZXdJbnN0YW5jZS5uZXh0KCk7XG4gIH1cblxuICBwcmV2KCk6IHZvaWQge1xuICAgIHRoaXMucHJldmlld0luc3RhbmNlLnByZXYoKTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMucHJldmlld0luc3RhbmNlLnN0YXJ0TGVhdmVBbmltYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICB9XG59XG4iXX0=