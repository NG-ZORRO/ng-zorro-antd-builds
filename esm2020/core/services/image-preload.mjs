import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
export class ImagePreloadService {
    constructor(document, platform) {
        this.document = document;
        this.platform = platform;
        this.counter = new Map();
        this.linkRefs = new Map();
    }
    addPreload(option) {
        if (this.platform.isBrowser) {
            return () => void 0;
        }
        const uniqueKey = `${option.src}${option.srcset}`;
        let currentCount = this.counter.get(uniqueKey) || 0;
        currentCount++;
        this.counter.set(uniqueKey, currentCount);
        if (!this.linkRefs.has(uniqueKey)) {
            const linkNode = this.appendPreloadLink(option);
            this.linkRefs.set(uniqueKey, linkNode);
        }
        return () => {
            if (this.counter.has(uniqueKey)) {
                let count = this.counter.get(uniqueKey);
                count--;
                if (count === 0) {
                    const linkNode = this.linkRefs.get(uniqueKey);
                    this.removePreloadLink(linkNode);
                    this.counter.delete(uniqueKey);
                    this.linkRefs.delete(uniqueKey);
                }
                else {
                    this.counter.set(uniqueKey, count);
                }
            }
        };
    }
    appendPreloadLink(option) {
        const linkNode = this.document.createElement('link');
        linkNode.setAttribute('rel', 'preload');
        linkNode.setAttribute('as', 'image');
        linkNode.setAttribute('href', option.src);
        if (option.srcset) {
            linkNode.setAttribute('imagesrcset', option.srcset);
        }
        this.document.head.appendChild(linkNode);
        return linkNode;
    }
    removePreloadLink(linkNode) {
        if (this.document.head.contains(linkNode)) {
            this.document.head.removeChild(linkNode);
        }
    }
}
ImagePreloadService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ImagePreloadService, deps: [{ token: DOCUMENT }, { token: i1.Platform }], target: i0.ɵɵFactoryTarget.Injectable });
ImagePreloadService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ImagePreloadService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ImagePreloadService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.Platform }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtcHJlbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29yZS9zZXJ2aWNlcy9pbWFnZS1wcmVsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBY25ELE1BQU0sT0FBTyxtQkFBbUI7SUFJOUIsWUFBc0MsUUFBbUIsRUFBVSxRQUFrQjtRQUEvQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUg3RSxZQUFPLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFDcEMsYUFBUSxHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO0lBRWtDLENBQUM7SUFFekYsVUFBVSxDQUFDLE1BQXFCO1FBQzlCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDM0IsT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQjtRQUNELE1BQU0sU0FBUyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELFlBQVksRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNqQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMvQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUUsQ0FBQztnQkFDekMsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO29CQUNmLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBRSxDQUFDO29CQUMvQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDakM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUNwQzthQUNGO1FBQ0gsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVPLGlCQUFpQixDQUFDLE1BQXFCO1FBQzdDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBb0IsQ0FBQztRQUN4RSxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4QyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyQyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFMUMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLFFBQVEsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QyxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8saUJBQWlCLENBQUMsUUFBeUI7UUFDakQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQzs7Z0hBbkRVLG1CQUFtQixrQkFJVixRQUFRO29IQUpqQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFLYyxNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW50ZXJmYWNlIFByZWxvYWRPcHRpb24ge1xuICBzcmM6IHN0cmluZztcbiAgc3Jjc2V0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBQcmVsb2FkRGlzcG9zZUhhbmRsZSA9ICgpID0+IHZvaWQ7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlUHJlbG9hZFNlcnZpY2Uge1xuICBwcml2YXRlIGNvdW50ZXIgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBwcml2YXRlIGxpbmtSZWZzID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxMaW5rRWxlbWVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBOelNhZmVBbnksIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtKSB7fVxuXG4gIGFkZFByZWxvYWQob3B0aW9uOiBQcmVsb2FkT3B0aW9uKTogUHJlbG9hZERpc3Bvc2VIYW5kbGUge1xuICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgcmV0dXJuICgpID0+IHZvaWQgMDtcbiAgICB9XG4gICAgY29uc3QgdW5pcXVlS2V5ID0gYCR7b3B0aW9uLnNyY30ke29wdGlvbi5zcmNzZXR9YDtcbiAgICBsZXQgY3VycmVudENvdW50ID0gdGhpcy5jb3VudGVyLmdldCh1bmlxdWVLZXkpIHx8IDA7XG4gICAgY3VycmVudENvdW50Kys7XG4gICAgdGhpcy5jb3VudGVyLnNldCh1bmlxdWVLZXksIGN1cnJlbnRDb3VudCk7XG4gICAgaWYgKCF0aGlzLmxpbmtSZWZzLmhhcyh1bmlxdWVLZXkpKSB7XG4gICAgICBjb25zdCBsaW5rTm9kZSA9IHRoaXMuYXBwZW5kUHJlbG9hZExpbmsob3B0aW9uKTtcbiAgICAgIHRoaXMubGlua1JlZnMuc2V0KHVuaXF1ZUtleSwgbGlua05vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY291bnRlci5oYXModW5pcXVlS2V5KSkge1xuICAgICAgICBsZXQgY291bnQgPSB0aGlzLmNvdW50ZXIuZ2V0KHVuaXF1ZUtleSkhO1xuICAgICAgICBjb3VudC0tO1xuICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICBjb25zdCBsaW5rTm9kZSA9IHRoaXMubGlua1JlZnMuZ2V0KHVuaXF1ZUtleSkhO1xuICAgICAgICAgIHRoaXMucmVtb3ZlUHJlbG9hZExpbmsobGlua05vZGUpO1xuICAgICAgICAgIHRoaXMuY291bnRlci5kZWxldGUodW5pcXVlS2V5KTtcbiAgICAgICAgICB0aGlzLmxpbmtSZWZzLmRlbGV0ZSh1bmlxdWVLZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY291bnRlci5zZXQodW5pcXVlS2V5LCBjb3VudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRQcmVsb2FkTGluayhvcHRpb246IFByZWxvYWRPcHRpb24pOiBIVE1MTGlua0VsZW1lbnQge1xuICAgIGNvbnN0IGxpbmtOb2RlID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJykgYXMgSFRNTExpbmtFbGVtZW50O1xuICAgIGxpbmtOb2RlLnNldEF0dHJpYnV0ZSgncmVsJywgJ3ByZWxvYWQnKTtcbiAgICBsaW5rTm9kZS5zZXRBdHRyaWJ1dGUoJ2FzJywgJ2ltYWdlJyk7XG4gICAgbGlua05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgb3B0aW9uLnNyYyk7XG5cbiAgICBpZiAob3B0aW9uLnNyY3NldCkge1xuICAgICAgbGlua05vZGUuc2V0QXR0cmlidXRlKCdpbWFnZXNyY3NldCcsIG9wdGlvbi5zcmNzZXQpO1xuICAgIH1cbiAgICB0aGlzLmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua05vZGUpO1xuICAgIHJldHVybiBsaW5rTm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlUHJlbG9hZExpbmsobGlua05vZGU6IEhUTUxMaW5rRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRvY3VtZW50LmhlYWQuY29udGFpbnMobGlua05vZGUpKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQobGlua05vZGUpO1xuICAgIH1cbiAgfVxufVxuIl19