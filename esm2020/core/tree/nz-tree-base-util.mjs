/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export function isCheckDisabled(node) {
    const { isDisabled, isDisableCheckbox } = node;
    return !!(isDisabled || isDisableCheckbox);
}
export function isInArray(needle, haystack) {
    return haystack.length > 0 && haystack.indexOf(needle) > -1;
}
export function getPosition(level, index) {
    return `${level}-${index}`;
}
export function getKey(key, pos) {
    if (key !== null && key !== undefined) {
        return key;
    }
    return pos;
}
/**
 * Flat nest tree data into flatten list. This is used for virtual list render.
 *
 * @param treeNodeList Origin data node list
 * @param expandedKeys
 * need expanded keys, provides `true` means all expanded (used in `rc-tree-select`).
 */
export function flattenTreeData(treeNodeList = [], expandedKeys = []) {
    const expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
    const flattenList = [];
    function dig(list, parent = null) {
        return list.map((treeNode, index) => {
            const pos = getPosition(parent ? parent.pos : '0', index);
            const mergedKey = getKey(treeNode.key, pos);
            treeNode.isStart = [...(parent ? parent.isStart : []), index === 0];
            treeNode.isEnd = [...(parent ? parent.isEnd : []), index === list.length - 1];
            // Add FlattenDataNode into list
            // TODO: only need data here.
            const flattenNode = {
                parent,
                pos,
                children: [],
                data: treeNode,
                isStart: [...(parent ? parent.isStart : []), index === 0],
                isEnd: [...(parent ? parent.isEnd : []), index === list.length - 1]
            };
            flattenList.push(flattenNode);
            // Loop treeNode children
            if (expandedKeys === true || expandedKeySet.has(mergedKey) || treeNode.isExpanded) {
                flattenNode.children = dig(treeNode.children || [], flattenNode);
            }
            else {
                flattenNode.children = [];
            }
            return flattenNode;
        });
    }
    dig(treeNodeList);
    return flattenList;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdHJlZS1iYXNlLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvdHJlZS9uei10cmVlLWJhc2UtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFNSCxNQUFNLFVBQVUsZUFBZSxDQUFDLElBQWdCO0lBQzlDLE1BQU0sRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDL0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksaUJBQWlCLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxNQUFpQixFQUFFLFFBQXFCO0lBQ2hFLE9BQU8sUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUFzQixFQUFFLEtBQWE7SUFDL0QsT0FBTyxHQUFHLEtBQUssSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxHQUFrQixFQUFFLEdBQVc7SUFDcEQsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7UUFDckMsT0FBTyxHQUFHLENBQUM7S0FDWjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQzdCLGVBQTZCLEVBQUUsRUFDL0IsZUFBdUMsRUFBRTtJQUV6QyxNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFFLE1BQU0sV0FBVyxHQUFrQixFQUFFLENBQUM7SUFFdEMsU0FBUyxHQUFHLENBQUMsSUFBa0IsRUFBRSxTQUE2QixJQUFJO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNsQyxNQUFNLEdBQUcsR0FBVyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNwRSxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUUsZ0NBQWdDO1lBQ2hDLDZCQUE2QjtZQUM3QixNQUFNLFdBQVcsR0FBZ0I7Z0JBQy9CLE1BQU07Z0JBQ04sR0FBRztnQkFDSCxRQUFRLEVBQUUsRUFBRTtnQkFDWixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDcEUsQ0FBQztZQUVGLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFOUIseUJBQXlCO1lBQ3pCLElBQUksWUFBWSxLQUFLLElBQUksSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pGLFdBQVcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQ2xFO2lCQUFNO2dCQUNMLFdBQVcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQzNCO1lBRUQsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xCLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBGbGF0dGVuTm9kZSwgTnpUcmVlTm9kZSwgTnpUcmVlTm9kZUtleSB9IGZyb20gJy4vbnotdHJlZS1iYXNlLW5vZGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNDaGVja0Rpc2FibGVkKG5vZGU6IE56VHJlZU5vZGUpOiBib29sZWFuIHtcbiAgY29uc3QgeyBpc0Rpc2FibGVkLCBpc0Rpc2FibGVDaGVja2JveCB9ID0gbm9kZTtcbiAgcmV0dXJuICEhKGlzRGlzYWJsZWQgfHwgaXNEaXNhYmxlQ2hlY2tib3gpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbkFycmF5KG5lZWRsZTogTnpTYWZlQW55LCBoYXlzdGFjazogTnpTYWZlQW55W10pOiBib29sZWFuIHtcbiAgcmV0dXJuIGhheXN0YWNrLmxlbmd0aCA+IDAgJiYgaGF5c3RhY2suaW5kZXhPZihuZWVkbGUpID4gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQb3NpdGlvbihsZXZlbDogc3RyaW5nIHwgbnVtYmVyLCBpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke2xldmVsfS0ke2luZGV4fWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRLZXkoa2V5OiBOelRyZWVOb2RlS2V5LCBwb3M6IHN0cmluZyk6IE56VHJlZU5vZGVLZXkge1xuICBpZiAoa2V5ICE9PSBudWxsICYmIGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuICByZXR1cm4gcG9zO1xufVxuXG4vKipcbiAqIEZsYXQgbmVzdCB0cmVlIGRhdGEgaW50byBmbGF0dGVuIGxpc3QuIFRoaXMgaXMgdXNlZCBmb3IgdmlydHVhbCBsaXN0IHJlbmRlci5cbiAqXG4gKiBAcGFyYW0gdHJlZU5vZGVMaXN0IE9yaWdpbiBkYXRhIG5vZGUgbGlzdFxuICogQHBhcmFtIGV4cGFuZGVkS2V5c1xuICogbmVlZCBleHBhbmRlZCBrZXlzLCBwcm92aWRlcyBgdHJ1ZWAgbWVhbnMgYWxsIGV4cGFuZGVkICh1c2VkIGluIGByYy10cmVlLXNlbGVjdGApLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlblRyZWVEYXRhKFxuICB0cmVlTm9kZUxpc3Q6IE56VHJlZU5vZGVbXSA9IFtdLFxuICBleHBhbmRlZEtleXM6IE56VHJlZU5vZGVLZXlbXSB8IHRydWUgPSBbXVxuKTogRmxhdHRlbk5vZGVbXSB7XG4gIGNvbnN0IGV4cGFuZGVkS2V5U2V0ID0gbmV3IFNldChleHBhbmRlZEtleXMgPT09IHRydWUgPyBbXSA6IGV4cGFuZGVkS2V5cyk7XG4gIGNvbnN0IGZsYXR0ZW5MaXN0OiBGbGF0dGVuTm9kZVtdID0gW107XG5cbiAgZnVuY3Rpb24gZGlnKGxpc3Q6IE56VHJlZU5vZGVbXSwgcGFyZW50OiBGbGF0dGVuTm9kZSB8IG51bGwgPSBudWxsKTogRmxhdHRlbk5vZGVbXSB7XG4gICAgcmV0dXJuIGxpc3QubWFwKCh0cmVlTm9kZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHBvczogc3RyaW5nID0gZ2V0UG9zaXRpb24ocGFyZW50ID8gcGFyZW50LnBvcyA6ICcwJywgaW5kZXgpO1xuICAgICAgY29uc3QgbWVyZ2VkS2V5ID0gZ2V0S2V5KHRyZWVOb2RlLmtleSwgcG9zKTtcbiAgICAgIHRyZWVOb2RlLmlzU3RhcnQgPSBbLi4uKHBhcmVudCA/IHBhcmVudC5pc1N0YXJ0IDogW10pLCBpbmRleCA9PT0gMF07XG4gICAgICB0cmVlTm9kZS5pc0VuZCA9IFsuLi4ocGFyZW50ID8gcGFyZW50LmlzRW5kIDogW10pLCBpbmRleCA9PT0gbGlzdC5sZW5ndGggLSAxXTtcbiAgICAgIC8vIEFkZCBGbGF0dGVuRGF0YU5vZGUgaW50byBsaXN0XG4gICAgICAvLyBUT0RPOiBvbmx5IG5lZWQgZGF0YSBoZXJlLlxuICAgICAgY29uc3QgZmxhdHRlbk5vZGU6IEZsYXR0ZW5Ob2RlID0ge1xuICAgICAgICBwYXJlbnQsXG4gICAgICAgIHBvcyxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBkYXRhOiB0cmVlTm9kZSxcbiAgICAgICAgaXNTdGFydDogWy4uLihwYXJlbnQgPyBwYXJlbnQuaXNTdGFydCA6IFtdKSwgaW5kZXggPT09IDBdLFxuICAgICAgICBpc0VuZDogWy4uLihwYXJlbnQgPyBwYXJlbnQuaXNFbmQgOiBbXSksIGluZGV4ID09PSBsaXN0Lmxlbmd0aCAtIDFdXG4gICAgICB9O1xuXG4gICAgICBmbGF0dGVuTGlzdC5wdXNoKGZsYXR0ZW5Ob2RlKTtcblxuICAgICAgLy8gTG9vcCB0cmVlTm9kZSBjaGlsZHJlblxuICAgICAgaWYgKGV4cGFuZGVkS2V5cyA9PT0gdHJ1ZSB8fCBleHBhbmRlZEtleVNldC5oYXMobWVyZ2VkS2V5KSB8fCB0cmVlTm9kZS5pc0V4cGFuZGVkKSB7XG4gICAgICAgIGZsYXR0ZW5Ob2RlLmNoaWxkcmVuID0gZGlnKHRyZWVOb2RlLmNoaWxkcmVuIHx8IFtdLCBmbGF0dGVuTm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmbGF0dGVuTm9kZS5jaGlsZHJlbiA9IFtdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmxhdHRlbk5vZGU7XG4gICAgfSk7XG4gIH1cblxuICBkaWcodHJlZU5vZGVMaXN0KTtcbiAgcmV0dXJuIGZsYXR0ZW5MaXN0O1xufVxuIl19