/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Much like lodash.
 */
export function padStart(toPad, length, element) {
    if (toPad.length > length) {
        return toPad;
    }
    const joined = `${getRepeatedElement(length, element)}${toPad}`;
    return joined.slice(joined.length - length, joined.length);
}
export function padEnd(toPad, length, element) {
    const joined = `${toPad}${getRepeatedElement(length, element)}`;
    return joined.slice(0, length);
}
export function getRepeatedElement(length, element) {
    return Array(length).fill(element).join('');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29yZS91dGlsLyIsInNvdXJjZXMiOlsic3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVIOztHQUVHO0FBQ0gsTUFBTSxVQUFVLFFBQVEsQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFFLE9BQWU7SUFDckUsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtRQUN6QixPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsTUFBTSxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDaEUsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFFLE9BQWU7SUFDbkUsTUFBTSxNQUFNLEdBQUcsR0FBRyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDaEUsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLE1BQWMsRUFBRSxPQUFlO0lBQ2hFLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbi8qKlxuICogTXVjaCBsaWtlIGxvZGFzaC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhZFN0YXJ0KHRvUGFkOiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyLCBlbGVtZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAodG9QYWQubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRvUGFkO1xuICB9XG5cbiAgY29uc3Qgam9pbmVkID0gYCR7Z2V0UmVwZWF0ZWRFbGVtZW50KGxlbmd0aCwgZWxlbWVudCl9JHt0b1BhZH1gO1xuICByZXR1cm4gam9pbmVkLnNsaWNlKGpvaW5lZC5sZW5ndGggLSBsZW5ndGgsIGpvaW5lZC5sZW5ndGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFkRW5kKHRvUGFkOiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyLCBlbGVtZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBqb2luZWQgPSBgJHt0b1BhZH0ke2dldFJlcGVhdGVkRWxlbWVudChsZW5ndGgsIGVsZW1lbnQpfWA7XG4gIHJldHVybiBqb2luZWQuc2xpY2UoMCwgbGVuZ3RoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlcGVhdGVkRWxlbWVudChsZW5ndGg6IG51bWJlciwgZWxlbWVudDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIEFycmF5KGxlbmd0aCkuZmlsbChlbGVtZW50KS5qb2luKCcnKTtcbn1cbiJdfQ==