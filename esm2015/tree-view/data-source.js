/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge } from 'rxjs';
import { map, take } from 'rxjs/operators';
export class NzTreeFlattener {
    constructor(transformFunction, getLevel, isExpandable, getChildren) {
        this.transformFunction = transformFunction;
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getChildren = getChildren;
    }
    flattenNode(node, level, resultNodes, parentMap) {
        const flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            const childrenNodes = this.getChildren(node);
            if (childrenNodes) {
                if (Array.isArray(childrenNodes)) {
                    this.flattenChildren(childrenNodes, level, resultNodes, parentMap);
                }
                else {
                    childrenNodes.pipe(take(1)).subscribe(children => {
                        this.flattenChildren(children, level, resultNodes, parentMap);
                    });
                }
            }
        }
        return resultNodes;
    }
    flattenChildren(children, level, resultNodes, parentMap) {
        children.forEach((child, index) => {
            const childParentMap = parentMap.slice();
            childParentMap.push(index !== children.length - 1);
            this.flattenNode(child, level + 1, resultNodes, childParentMap);
        });
    }
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    flattenNodes(structuredData) {
        const resultNodes = [];
        structuredData.forEach(node => this.flattenNode(node, 0, resultNodes, []));
        return resultNodes;
    }
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    expandFlattenedNodes(nodes, treeControl) {
        const results = [];
        const currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach(node => {
            let expand = true;
            for (let i = 0; i <= this.getLevel(node); i++) {
                expand = expand && currentExpand[i];
            }
            if (expand) {
                results.push(node);
            }
            if (this.isExpandable(node)) {
                currentExpand[this.getLevel(node) + 1] = treeControl.isExpanded(node);
            }
        });
        return results;
    }
}
export class NzTreeFlatDataSource extends DataSource {
    constructor(_treeControl, _treeFlattener, initialData = []) {
        super();
        this._treeControl = _treeControl;
        this._treeFlattener = _treeFlattener;
        this._flattenedData = new BehaviorSubject([]);
        this._expandedData = new BehaviorSubject([]);
        this._data = new BehaviorSubject(initialData);
        this.flatNodes();
    }
    setData(value) {
        this._data.next(value);
        this.flatNodes();
    }
    getData() {
        return this._data.getValue();
    }
    connect(collectionViewer) {
        const changes = [collectionViewer.viewChange, this._treeControl.expansionModel.changed, this._flattenedData];
        return merge(...changes).pipe(map(() => {
            this._expandedData.next(this._treeFlattener.expandFlattenedNodes(this._flattenedData.value, this._treeControl));
            return this._expandedData.value;
        }));
    }
    disconnect() {
        // no op
    }
    flatNodes() {
        this._flattenedData.next(this._treeFlattener.flattenNodes(this.getData()));
        this._treeControl.dataNodes = this._flattenedData.value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RyZWUtdmlldy9kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQW9CLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXhFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFDUyxpQkFBZ0QsRUFDaEQsUUFBNkIsRUFDN0IsWUFBa0MsRUFDbEMsV0FBa0U7UUFIbEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUErQjtRQUNoRCxhQUFRLEdBQVIsUUFBUSxDQUFxQjtRQUM3QixpQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQXVEO0lBQ3hFLENBQUM7SUFFSSxXQUFXLENBQUMsSUFBTyxFQUFFLEtBQWEsRUFBRSxXQUFnQixFQUFFLFNBQW9CO1FBQ2hGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckQsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDL0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLGFBQWEsRUFBRTtnQkFDakIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO29CQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lC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aEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxPQUFPLENBQUMsZ0JBQWtDO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0csT0FBTyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQzNCLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2hILE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsUUFBUTtJQUNWLENBQUM7SUFFTyxTQUFTO1FBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUMxRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDb2xsZWN0aW9uVmlld2VyLCBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IEZsYXRUcmVlQ29udHJvbCwgVHJlZUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIG1lcmdlLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBOelRyZWVGbGF0dGVuZXI8VCwgRiwgSyA9IEY+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHRyYW5zZm9ybUZ1bmN0aW9uOiAobm9kZTogVCwgbGV2ZWw6IG51bWJlcikgPT4gRixcbiAgICBwdWJsaWMgZ2V0TGV2ZWw6IChub2RlOiBGKSA9PiBudW1iZXIsXG4gICAgcHVibGljIGlzRXhwYW5kYWJsZTogKG5vZGU6IEYpID0+IGJvb2xlYW4sXG4gICAgcHVibGljIGdldENoaWxkcmVuOiAobm9kZTogVCkgPT4gT2JzZXJ2YWJsZTxUW10+IHwgVFtdIHwgdW5kZWZpbmVkIHwgbnVsbFxuICApIHt9XG5cbiAgcHJpdmF0ZSBmbGF0dGVuTm9kZShub2RlOiBULCBsZXZlbDogbnVtYmVyLCByZXN1bHROb2RlczogRltdLCBwYXJlbnRNYXA6IGJvb2xlYW5bXSk6IEZbXSB7XG4gICAgY29uc3QgZmxhdE5vZGUgPSB0aGlzLnRyYW5zZm9ybUZ1bmN0aW9uKG5vZGUsIGxldmVsKTtcbiAgICByZXN1bHROb2Rlcy5wdXNoKGZsYXROb2RlKTtcblxuICAgIGlmICh0aGlzLmlzRXhwYW5kYWJsZShmbGF0Tm9kZSkpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuTm9kZXMgPSB0aGlzLmdldENoaWxkcmVuKG5vZGUpO1xuICAgICAgaWYgKGNoaWxkcmVuTm9kZXMpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW5Ob2RlcykpIHtcbiAgICAgICAgICB0aGlzLmZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbk5vZGVzLCBsZXZlbCwgcmVzdWx0Tm9kZXMsIHBhcmVudE1hcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hpbGRyZW5Ob2Rlcy5waXBlKHRha2UoMSkpLnN1YnNjcmliZShjaGlsZHJlbiA9PiB7XG4gICAgICAgICAgICB0aGlzLmZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbiwgbGV2ZWwsIHJlc3VsdE5vZGVzLCBwYXJlbnRNYXApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHROb2RlcztcbiAgfVxuXG4gIHByaXZhdGUgZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuOiBUW10sIGxldmVsOiBudW1iZXIsIHJlc3VsdE5vZGVzOiBGW10sIHBhcmVudE1hcDogYm9vbGVhbltdKTogdm9pZCB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjaGlsZFBhcmVudE1hcDogYm9vbGVhbltdID0gcGFyZW50TWFwLnNsaWNlKCk7XG4gICAgICBjaGlsZFBhcmVudE1hcC5wdXNoKGluZGV4ICE9PSBjaGlsZHJlbi5sZW5ndGggLSAxKTtcbiAgICAgIHRoaXMuZmxhdHRlbk5vZGUoY2hpbGQsIGxldmVsICsgMSwgcmVzdWx0Tm9kZXMsIGNoaWxkUGFyZW50TWFwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGbGF0dGVuIGEgbGlzdCBvZiBub2RlIHR5cGUgVCB0byBmbGF0dGVuZWQgdmVyc2lvbiBvZiBub2RlIEYuXG4gICAqIFBsZWFzZSBub3RlIHRoYXQgdHlwZSBUIG1heSBiZSBuZXN0ZWQsIGFuZCB0aGUgbGVuZ3RoIG9mIGBzdHJ1Y3R1cmVkRGF0YWAgbWF5IGJlIGRpZmZlcmVudFxuICAgKiBmcm9tIHRoYXQgb2YgcmV0dXJuZWQgbGlzdCBgRltdYC5cbiAgICovXG4gIGZsYXR0ZW5Ob2RlcyhzdHJ1Y3R1cmVkRGF0YTogVFtdKTogRltdIHtcbiAgICBjb25zdCByZXN1bHROb2RlczogRltdID0gW107XG4gICAgc3RydWN0dXJlZERhdGEuZm9yRWFjaChub2RlID0+IHRoaXMuZmxhdHRlbk5vZGUobm9kZSwgMCwgcmVzdWx0Tm9kZXMsIFtdKSk7XG4gICAgcmV0dXJuIHJlc3VsdE5vZGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cGFuZCBmbGF0dGVuZWQgbm9kZSB3aXRoIGN1cnJlbnQgZXhwYW5zaW9uIHN0YXR1cy5cbiAgICogVGhlIHJldHVybmVkIGxpc3QgbWF5IGhhdmUgZGlmZmVyZW50IGxlbmd0aC5cbiAgICovXG4gIGV4cGFuZEZsYXR0ZW5lZE5vZGVzKG5vZGVzOiBGW10sIHRyZWVDb250cm9sOiBUcmVlQ29udHJvbDxGLCBLPik6IEZbXSB7XG4gICAgY29uc3QgcmVzdWx0czogRltdID0gW107XG4gICAgY29uc3QgY3VycmVudEV4cGFuZDogYm9vbGVhbltdID0gW107XG4gICAgY3VycmVudEV4cGFuZFswXSA9IHRydWU7XG5cbiAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgbGV0IGV4cGFuZCA9IHRydWU7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLmdldExldmVsKG5vZGUpOyBpKyspIHtcbiAgICAgICAgZXhwYW5kID0gZXhwYW5kICYmIGN1cnJlbnRFeHBhbmRbaV07XG4gICAgICB9XG4gICAgICBpZiAoZXhwYW5kKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzRXhwYW5kYWJsZShub2RlKSkge1xuICAgICAgICBjdXJyZW50RXhwYW5kW3RoaXMuZ2V0TGV2ZWwobm9kZSkgKyAxXSA9IHRyZWVDb250cm9sLmlzRXhwYW5kZWQobm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE56VHJlZUZsYXREYXRhU291cmNlPFQsIEYsIEsgPSBGPiBleHRlbmRzIERhdGFTb3VyY2U8Rj4ge1xuICBfZmxhdHRlbmVkRGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RltdPihbXSk7XG5cbiAgX2V4cGFuZGVkRGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RltdPihbXSk7XG5cbiAgX2RhdGE6IEJlaGF2aW9yU3ViamVjdDxUW10+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RyZWVDb250cm9sOiBGbGF0VHJlZUNvbnRyb2w8RiwgSz4sIHByaXZhdGUgX3RyZWVGbGF0dGVuZXI6IE56VHJlZUZsYXR0ZW5lcjxULCBGLCBLPiwgaW5pdGlhbERhdGE6IFRbXSA9IFtdKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9kYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUW10+KGluaXRpYWxEYXRhKTtcbiAgICB0aGlzLmZsYXROb2RlcygpO1xuICB9XG5cbiAgc2V0RGF0YSh2YWx1ZTogVFtdKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0YS5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmZsYXROb2RlcygpO1xuICB9XG5cbiAgZ2V0RGF0YSgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhLmdldFZhbHVlKCk7XG4gIH1cblxuICBjb25uZWN0KGNvbGxlY3Rpb25WaWV3ZXI6IENvbGxlY3Rpb25WaWV3ZXIpOiBPYnNlcnZhYmxlPEZbXT4ge1xuICAgIGNvbnN0IGNoYW5nZXMgPSBbY29sbGVjdGlvblZpZXdlci52aWV3Q2hhbmdlLCB0aGlzLl90cmVlQ29udHJvbC5leHBhbnNpb25Nb2RlbC5jaGFuZ2VkLCB0aGlzLl9mbGF0dGVuZWREYXRhXTtcbiAgICByZXR1cm4gbWVyZ2UoLi4uY2hhbmdlcykucGlwZShcbiAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2V4cGFuZGVkRGF0YS5uZXh0KHRoaXMuX3RyZWVGbGF0dGVuZXIuZXhwYW5kRmxhdHRlbmVkTm9kZXModGhpcy5fZmxhdHRlbmVkRGF0YS52YWx1ZSwgdGhpcy5fdHJlZUNvbnRyb2wpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkRGF0YS52YWx1ZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoKTogdm9pZCB7XG4gICAgLy8gbm8gb3BcbiAgfVxuXG4gIHByaXZhdGUgZmxhdE5vZGVzKCk6IHZvaWQge1xuICAgIHRoaXMuX2ZsYXR0ZW5lZERhdGEubmV4dCh0aGlzLl90cmVlRmxhdHRlbmVyLmZsYXR0ZW5Ob2Rlcyh0aGlzLmdldERhdGEoKSkpO1xuICAgIHRoaXMuX3RyZWVDb250cm9sLmRhdGFOb2RlcyA9IHRoaXMuX2ZsYXR0ZW5lZERhdGEudmFsdWU7XG4gIH1cbn1cbiJdfQ==