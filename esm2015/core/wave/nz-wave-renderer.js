/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Platform } from '@angular/cdk/platform';
export class NzWaveRenderer {
    constructor(triggerElement, ngZone, insertExtraNode, platformId) {
        this.triggerElement = triggerElement;
        this.ngZone = ngZone;
        this.insertExtraNode = insertExtraNode;
        this.platformId = platformId;
        this.waveTransitionDuration = 400;
        this.styleForPseudo = null;
        this.extraNode = null;
        this.lastTime = 0;
        this.onClick = (event) => {
            if (!this.triggerElement ||
                !this.triggerElement.getAttribute ||
                this.triggerElement.getAttribute('disabled') ||
                event.target.tagName === 'INPUT' ||
                this.triggerElement.className.indexOf('disabled') >= 0) {
                return;
            }
            this.fadeOutWave();
        };
        this.platform = new Platform(this.platformId);
        this.clickHandler = this.onClick.bind(this);
        this.bindTriggerEvent();
    }
    get waveAttributeName() {
        return this.insertExtraNode ? 'ant-click-animating' : 'ant-click-animating-without-extra-node';
    }
    bindTriggerEvent() {
        if (this.platform.isBrowser) {
            this.ngZone.runOutsideAngular(() => {
                this.removeTriggerEvent();
                if (this.triggerElement) {
                    this.triggerElement.addEventListener('click', this.clickHandler, true);
                }
            });
        }
    }
    removeTriggerEvent() {
        if (this.triggerElement) {
            this.triggerElement.removeEventListener('click', this.clickHandler, true);
        }
    }
    removeStyleAndExtraNode() {
        if (this.styleForPseudo && document.body.contains(this.styleForPseudo)) {
            document.body.removeChild(this.styleForPseudo);
            this.styleForPseudo = null;
        }
        if (this.insertExtraNode && this.triggerElement.contains(this.extraNode)) {
            this.triggerElement.removeChild(this.extraNode);
        }
    }
    destroy() {
        this.removeTriggerEvent();
        this.removeStyleAndExtraNode();
    }
    fadeOutWave() {
        const node = this.triggerElement;
        const waveColor = this.getWaveColor(node);
        node.setAttribute(this.waveAttributeName, 'true');
        if (Date.now() < this.lastTime + this.waveTransitionDuration) {
            return;
        }
        if (this.isValidColor(waveColor)) {
            if (!this.styleForPseudo) {
                this.styleForPseudo = document.createElement('style');
            }
            this.styleForPseudo.innerHTML = `
      [ant-click-animating-without-extra-node='true']::after, .ant-click-animating-node {
        --antd-wave-shadow-color: ${waveColor};
      }`;
            document.body.appendChild(this.styleForPseudo);
        }
        if (this.insertExtraNode) {
            if (!this.extraNode) {
                this.extraNode = document.createElement('div');
            }
            this.extraNode.className = 'ant-click-animating-node';
            node.appendChild(this.extraNode);
        }
        this.lastTime = Date.now();
        this.runTimeoutOutsideZone(() => {
            node.removeAttribute(this.waveAttributeName);
            this.removeStyleAndExtraNode();
        }, this.waveTransitionDuration);
    }
    isValidColor(color) {
        return (!!color &&
            color !== '#ffffff' &&
            color !== 'rgb(255, 255, 255)' &&
            this.isNotGrey(color) &&
            !/rgba\(\d*, \d*, \d*, 0\)/.test(color) &&
            color !== 'transparent');
    }
    isNotGrey(color) {
        const match = color.match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
        if (match && match[1] && match[2] && match[3]) {
            return !(match[1] === match[2] && match[2] === match[3]);
        }
        return true;
    }
    getWaveColor(node) {
        const nodeStyle = getComputedStyle(node);
        return (nodeStyle.getPropertyValue('border-top-color') || // Firefox Compatible
            nodeStyle.getPropertyValue('border-color') ||
            nodeStyle.getPropertyValue('background-color'));
    }
    runTimeoutOutsideZone(fn, delay) {
        this.ngZone.runOutsideAngular(() => setTimeout(fn, delay));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotd2F2ZS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvY29yZS93YXZlLyIsInNvdXJjZXMiOlsibnotd2F2ZS1yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJakQsTUFBTSxPQUFPLGNBQWM7SUFXekIsWUFDVSxjQUEyQixFQUMzQixNQUFjLEVBQ2QsZUFBd0IsRUFDeEIsVUFBcUI7UUFIckIsbUJBQWMsR0FBZCxjQUFjLENBQWE7UUFDM0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFlLEdBQWYsZUFBZSxDQUFTO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQVc7UUFkdkIsMkJBQXNCLEdBQUcsR0FBRyxDQUFDO1FBQzdCLG1CQUFjLEdBQTRCLElBQUksQ0FBQztRQUMvQyxjQUFTLEdBQTBCLElBQUksQ0FBQztRQUN4QyxhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBa0JyQixZQUFPLEdBQUcsQ0FBQyxLQUFpQixFQUFFLEVBQUU7WUFDOUIsSUFDRSxDQUFDLElBQUksQ0FBQyxjQUFjO2dCQUNwQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWTtnQkFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO2dCQUMzQyxLQUFLLENBQUMsTUFBc0IsQ0FBQyxPQUFPLEtBQUssT0FBTztnQkFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFDdEQ7Z0JBQ0EsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQztRQWhCQSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxJ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QUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sQ0FDTCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxxQkFBcUI7WUFDdkUsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztZQUMxQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FDL0MsQ0FBQztJQUNKLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxFQUFjLEVBQUUsS0FBYTtRQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBOeldhdmVSZW5kZXJlciB7XG4gIHByaXZhdGUgd2F2ZVRyYW5zaXRpb25EdXJhdGlvbiA9IDQwMDtcbiAgcHJpdmF0ZSBzdHlsZUZvclBzZXVkbzogSFRNTFN0eWxlRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGV4dHJhTm9kZTogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBsYXN0VGltZSA9IDA7XG4gIHByaXZhdGUgcGxhdGZvcm0hOiBQbGF0Zm9ybTtcbiAgY2xpY2tIYW5kbGVyOiAoKSA9PiB2b2lkO1xuICBnZXQgd2F2ZUF0dHJpYnV0ZU5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRFeHRyYU5vZGUgPyAnYW50LWNsaWNrLWFuaW1hdGluZycgOiAnYW50LWNsaWNrLWFuaW1hdGluZy13aXRob3V0LWV4dHJhLW5vZGUnO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0cmlnZ2VyRWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGluc2VydEV4dHJhTm9kZTogYm9vbGVhbixcbiAgICBwcml2YXRlIHBsYXRmb3JtSWQ6IE56U2FmZUFueVxuICApIHtcbiAgICB0aGlzLnBsYXRmb3JtID0gbmV3IFBsYXRmb3JtKHRoaXMucGxhdGZvcm1JZCk7XG4gICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmJpbmRUcmlnZ2VyRXZlbnQoKTtcbiAgfVxuXG4gIG9uQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy50cmlnZ2VyRWxlbWVudCB8fFxuICAgICAgIXRoaXMudHJpZ2dlckVsZW1lbnQuZ2V0QXR0cmlidXRlIHx8XG4gICAgICB0aGlzLnRyaWdnZXJFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fFxuICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fFxuICAgICAgdGhpcy50cmlnZ2VyRWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZignZGlzYWJsZWQnKSA+PSAwXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZmFkZU91dFdhdmUoKTtcbiAgfTtcblxuICBiaW5kVHJpZ2dlckV2ZW50KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbW92ZVRyaWdnZXJFdmVudCgpO1xuICAgICAgICBpZiAodGhpcy50cmlnZ2VyRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMudHJpZ2dlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVRyaWdnZXJFdmVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50cmlnZ2VyRWxlbWVudCkge1xuICAgICAgdGhpcy50cmlnZ2VyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVTdHlsZUFuZEV4dHJhTm9kZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdHlsZUZvclBzZXVkbyAmJiBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHRoaXMuc3R5bGVGb3JQc2V1ZG8pKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuc3R5bGVGb3JQc2V1ZG8pO1xuICAgICAgdGhpcy5zdHlsZUZvclBzZXVkbyA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLmluc2VydEV4dHJhTm9kZSAmJiB0aGlzLnRyaWdnZXJFbGVtZW50LmNvbnRhaW5zKHRoaXMuZXh0cmFOb2RlKSkge1xuICAgICAgdGhpcy50cmlnZ2VyRWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmV4dHJhTm9kZSBhcyBOb2RlKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlVHJpZ2dlckV2ZW50KCk7XG4gICAgdGhpcy5yZW1vdmVTdHlsZUFuZEV4dHJhTm9kZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBmYWRlT3V0V2F2ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy50cmlnZ2VyRWxlbWVudDtcbiAgICBjb25zdCB3YXZlQ29sb3IgPSB0aGlzLmdldFdhdmVDb2xvcihub2RlKTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSh0aGlzLndhdmVBdHRyaWJ1dGVOYW1lLCAndHJ1ZScpO1xuICAgIGlmIChEYXRlLm5vdygpIDwgdGhpcy5sYXN0VGltZSArIHRoaXMud2F2ZVRyYW5zaXRpb25EdXJhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzVmFsaWRDb2xvcih3YXZlQ29sb3IpKSB7XG4gICAgICBpZiAoIXRoaXMuc3R5bGVGb3JQc2V1ZG8pIHtcbiAgICAgICAgdGhpcy5zdHlsZUZvclBzZXVkbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3R5bGVGb3JQc2V1ZG8uaW5uZXJIVE1MID0gYFxuICAgICAgW2FudC1jbGljay1hbmltYXRpbmctd2l0aG91dC1leHRyYS1ub2RlPSd0cnVlJ106OmFmdGVyLCAuYW50LWNsaWNrLWFuaW1hdGluZy1ub2RlIHtcbiAgICAgICAgLS1hbnRkLXdhdmUtc2hhZG93LWNvbG9yOiAke3dhdmVDb2xvcn07XG4gICAgICB9YDtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5zdHlsZUZvclBzZXVkbyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5zZXJ0RXh0cmFOb2RlKSB7XG4gICAgICBpZiAoIXRoaXMuZXh0cmFOb2RlKSB7XG4gICAgICAgIHRoaXMuZXh0cmFOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLmV4dHJhTm9kZS5jbGFzc05hbWUgPSAnYW50LWNsaWNrLWFuaW1hdGluZy1ub2RlJztcbiAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodGhpcy5leHRyYU5vZGUpO1xuICAgIH1cblxuICAgIHRoaXMubGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgdGhpcy5ydW5UaW1lb3V0T3V0c2lkZVpvbmUoKCkgPT4ge1xuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUodGhpcy53YXZlQXR0cmlidXRlTmFtZSk7XG4gICAgICB0aGlzLnJlbW92ZVN0eWxlQW5kRXh0cmFOb2RlKCk7XG4gICAgfSwgdGhpcy53YXZlVHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNWYWxpZENvbG9yKGNvbG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgISFjb2xvciAmJlxuICAgICAgY29sb3IgIT09ICcjZmZmZmZmJyAmJlxuICAgICAgY29sb3IgIT09ICdyZ2IoMjU1LCAyNTUsIDI1NSknICYmXG4gICAgICB0aGlzLmlzTm90R3JleShjb2xvcikgJiZcbiAgICAgICEvcmdiYVxcKFxcZCosIFxcZCosIFxcZCosIDBcXCkvLnRlc3QoY29sb3IpICYmXG4gICAgICBjb2xvciAhPT0gJ3RyYW5zcGFyZW50J1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzTm90R3JleShjb2xvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbWF0Y2ggPSBjb2xvci5tYXRjaCgvcmdiYT9cXCgoXFxkKiksIChcXGQqKSwgKFxcZCopKCwgW1xcLlxcZF0qKT9cXCkvKTtcbiAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMV0gJiYgbWF0Y2hbMl0gJiYgbWF0Y2hbM10pIHtcbiAgICAgIHJldHVybiAhKG1hdGNoWzFdID09PSBtYXRjaFsyXSAmJiBtYXRjaFsyXSA9PT0gbWF0Y2hbM10pO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0V2F2ZUNvbG9yKG5vZGU6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICBjb25zdCBub2RlU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIHJldHVybiAoXG4gICAgICBub2RlU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnYm9yZGVyLXRvcC1jb2xvcicpIHx8IC8vIEZpcmVmb3ggQ29tcGF0aWJsZVxuICAgICAgbm9kZVN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JvcmRlci1jb2xvcicpIHx8XG4gICAgICBub2RlU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnYmFja2dyb3VuZC1jb2xvcicpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcnVuVGltZW91dE91dHNpZGVab25lKGZuOiAoKSA9PiB2b2lkLCBkZWxheTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gc2V0VGltZW91dChmbiwgZGVsYXkpKTtcbiAgfVxufVxuIl19