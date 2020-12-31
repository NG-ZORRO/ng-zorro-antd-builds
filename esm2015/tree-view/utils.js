/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export function getParent(nodes, node, getLevel) {
    let index = nodes.indexOf(node);
    if (index < 0) {
        return null;
    }
    const level = getLevel(node);
    for (index--; index >= 0; index--) {
        const preLevel = getLevel(nodes[index]);
        if (preLevel + 1 === level) {
            return nodes[index];
        }
        if (preLevel + 1 < level) {
            return null;
        }
    }
    return null;
}
export function getNextSibling(nodes, node, getLevel, _index) {
    let index = typeof _index !== 'undefined' ? _index : nodes.indexOf(node);
    if (index < 0) {
        return null;
    }
    const level = getLevel(node);
    for (index++; index < nodes.length; index++) {
        const nextLevel = getLevel(nodes[index]);
        if (nextLevel < level) {
            return null;
        }
        if (nextLevel === level) {
            return nodes[index];
        }
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxNQUFNLFVBQVUsU0FBUyxDQUFJLEtBQVUsRUFBRSxJQUFPLEVBQUUsUUFBaUM7SUFDakYsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFDYixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLEtBQUssS0FBSyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNqQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDeEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUMxQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQjtRQUNELElBQUksUUFBUSxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBSSxLQUFVLEVBQUUsSUFBTyxFQUFFLFFBQWlDLEVBQUUsTUFBZTtJQUN2RyxJQUFJLEtBQUssR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFDYixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTdCLEtBQUssS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDM0MsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksU0FBUyxHQUFHLEtBQUssRUFBRTtZQUNyQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JCO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50PFQ+KG5vZGVzOiBUW10sIG5vZGU6IFQsIGdldExldmVsOiAoZGF0YU5vZGU6IFQpID0+IG51bWJlcik6IFQgfCBudWxsIHtcbiAgbGV0IGluZGV4ID0gbm9kZXMuaW5kZXhPZihub2RlKTtcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IGxldmVsID0gZ2V0TGV2ZWwobm9kZSk7XG4gIGZvciAoaW5kZXgtLTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgIGNvbnN0IHByZUxldmVsID0gZ2V0TGV2ZWwobm9kZXNbaW5kZXhdKTtcbiAgICBpZiAocHJlTGV2ZWwgKyAxID09PSBsZXZlbCkge1xuICAgICAgcmV0dXJuIG5vZGVzW2luZGV4XTtcbiAgICB9XG4gICAgaWYgKHByZUxldmVsICsgMSA8IGxldmVsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXh0U2libGluZzxUPihub2RlczogVFtdLCBub2RlOiBULCBnZXRMZXZlbDogKGRhdGFOb2RlOiBUKSA9PiBudW1iZXIsIF9pbmRleD86IG51bWJlcik6IFQgfCBudWxsIHtcbiAgbGV0IGluZGV4ID0gdHlwZW9mIF9pbmRleCAhPT0gJ3VuZGVmaW5lZCcgPyBfaW5kZXggOiBub2Rlcy5pbmRleE9mKG5vZGUpO1xuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgbGV2ZWwgPSBnZXRMZXZlbChub2RlKTtcblxuICBmb3IgKGluZGV4Kys7IGluZGV4IDwgbm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgbmV4dExldmVsID0gZ2V0TGV2ZWwobm9kZXNbaW5kZXhdKTtcbiAgICBpZiAobmV4dExldmVsIDwgbGV2ZWwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAobmV4dExldmVsID09PSBsZXZlbCkge1xuICAgICAgcmV0dXJuIG5vZGVzW2luZGV4XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG4iXX0=