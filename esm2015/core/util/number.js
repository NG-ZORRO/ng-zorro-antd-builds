export function getPercent(min, max, value) {
    return ((value - min) / (max - min)) * 100;
}
export function getPrecision(num) {
    const numStr = num.toString();
    const dotIndex = numStr.indexOf('.');
    return dotIndex >= 0 ? numStr.length - dotIndex - 1 : 0;
}
export function ensureNumberInRange(num, min, max) {
    if (isNaN(num) || num < min) {
        return min;
    }
    else if (num > max) {
        return max;
    }
    else {
        return num;
    }
}
export function isNumberFinite(value) {
    return typeof value === 'number' && isFinite(value);
}
export function toDecimal(value, decimal) {
    return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
}
export function sum(input, initial = 0) {
    return input.reduce((previous, current) => previous + current, initial);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29yZS91dGlsLyIsInNvdXJjZXMiOlsibnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sVUFBVSxVQUFVLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBRSxLQUFhO0lBQ2hFLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUM3QyxDQUFDO0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxHQUFXO0lBQ3RDLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVc7SUFDdkUsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtRQUMzQixPQUFPLEdBQUcsQ0FBQztLQUNaO1NBQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFO1FBQ3BCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7U0FBTTtRQUNMLE9BQU8sR0FBRyxDQUFDO0tBQ1o7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxLQUFnQjtJQUM3QyxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBYSxFQUFFLE9BQWU7SUFDdEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzNFLENBQUM7QUFFRCxNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQWUsRUFBRSxVQUFrQixDQUFDO0lBQ3RELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQWdCLEVBQUUsT0FBZSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEdBQUcsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzFGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBlcmNlbnQobWluOiBudW1iZXIsIG1heDogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuICgodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbikpICogMTAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJlY2lzaW9uKG51bTogbnVtYmVyKTogbnVtYmVyIHtcbiAgY29uc3QgbnVtU3RyID0gbnVtLnRvU3RyaW5nKCk7XG4gIGNvbnN0IGRvdEluZGV4ID0gbnVtU3RyLmluZGV4T2YoJy4nKTtcbiAgcmV0dXJuIGRvdEluZGV4ID49IDAgPyBudW1TdHIubGVuZ3RoIC0gZG90SW5kZXggLSAxIDogMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZU51bWJlckluUmFuZ2UobnVtOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gIGlmIChpc05hTihudW0pIHx8IG51bSA8IG1pbikge1xuICAgIHJldHVybiBtaW47XG4gIH0gZWxzZSBpZiAobnVtID4gbWF4KSB7XG4gICAgcmV0dXJuIG1heDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVtO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlckZpbml0ZSh2YWx1ZTogTnpTYWZlQW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGVjaW1hbCh2YWx1ZTogbnVtYmVyLCBkZWNpbWFsOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIE1hdGgucG93KDEwLCBkZWNpbWFsKSkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdW0oaW5wdXQ6IG51bWJlcltdLCBpbml0aWFsOiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgcmV0dXJuIGlucHV0LnJlZHVjZSgocHJldmlvdXM6IG51bWJlciwgY3VycmVudDogbnVtYmVyKSA9PiBwcmV2aW91cyArIGN1cnJlbnQsIGluaXRpYWwpO1xufVxuIl19