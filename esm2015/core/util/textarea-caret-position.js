// from https://github.com/component/textarea-caret-position
// We'll copy the properties below into the mirror div.
// Note that some browsers, such as Firefox, do not concatenate properties
// into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
// so we have to list every single property explicitly.
export const properties = [
    'direction',
    'boxSizing',
    'width',
    'height',
    'overflowX',
    'overflowY',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',
    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration',
    'letterSpacing',
    'wordSpacing',
    'tabSize',
    'MozTabSize'
];
const isBrowser = typeof window !== 'undefined';
const isFirefox = isBrowser && window.mozInnerScreenX != null;
const _parseInt = (str) => parseInt(str, 10);
const ɵ0 = _parseInt;
export function getCaretCoordinates(element, position, options) {
    if (!isBrowser) {
        throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
    }
    const debug = (options && options.debug) || false;
    if (debug) {
        const el = document.querySelector('#input-textarea-caret-position-mirror-div');
        if (el) {
            el.parentNode.removeChild(el);
        }
    }
    // The mirror div will replicate the textarea's style
    const div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);
    const style = div.style;
    const computed = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle; // currentStyle for IE < 9
    const isInput = element.nodeName === 'INPUT';
    // Default textarea styles
    style.whiteSpace = 'pre-wrap';
    if (!isInput) {
        style.wordWrap = 'break-word'; // only for textarea-s
    }
    // Position off-screen
    style.position = 'absolute'; // required to return coordinates properly
    if (!debug) {
        style.visibility = 'hidden';
    } // not 'display: none' because we want rendering
    // Transfer the element's properties to the div
    properties.forEach((prop) => {
        if (isInput && prop === 'lineHeight') {
            // Special case for <input>s because text is rendered centered and line height may be != height
            style.lineHeight = computed.height;
        }
        else {
            // @ts-ignore
            style[prop] = computed[prop];
        }
    });
    if (isFirefox) {
        // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
        if (element.scrollHeight > _parseInt(computed.height)) {
            style.overflowY = 'scroll';
        }
    }
    else {
        style.overflow = 'hidden'; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
    }
    div.textContent = element.value.substring(0, position);
    // The second special handling for input type="text" vs textarea:
    // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
    if (isInput) {
        div.textContent = div.textContent.replace(/\s/g, '\u00a0');
    }
    const span = document.createElement('span');
    // Wrapping must be replicated *exactly*, including when a long word gets
    // onto the next line, with whitespace at the end of the line before (#7).
    // The  *only* reliable way to do that is to copy the *entire* rest of the
    // textarea's content into the <span> created at the caret position.
    // For inputs, just '.' would be enough, but no need to bother.
    span.textContent = element.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all
    div.appendChild(span);
    const coordinates = {
        top: span.offsetTop + _parseInt(computed.borderTopWidth),
        left: span.offsetLeft + _parseInt(computed.borderLeftWidth),
        height: _parseInt(computed.lineHeight)
    };
    if (debug) {
        span.style.backgroundColor = '#eee';
        createDebugEle(element, coordinates);
    }
    else {
        document.body.removeChild(div);
    }
    return coordinates;
}
export function createDebugEle(element, coordinates) {
    const fontSize = getComputedStyle(element).getPropertyValue('font-size');
    const rect = document.querySelector('#DEBUG') || document.createElement('div');
    document.body.appendChild(rect);
    rect.id = 'DEBUG';
    rect.style.position = 'absolute';
    rect.style.backgroundColor = 'red';
    rect.style.height = fontSize;
    rect.style.width = '1px';
    rect.style.top = `${element.getBoundingClientRect().top - element.scrollTop + window.pageYOffset + coordinates.top}px`;
    rect.style.left = `${element.getBoundingClientRect().left - element.scrollLeft + window.pageXOffset + coordinates.left}px`;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEtY2FyZXQtcG9zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvdXRpbC90ZXh0YXJlYS1jYXJldC1wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSw0REFBNEQ7QUFFNUQsdURBQXVEO0FBQ3ZELDBFQUEwRTtBQUMxRSwyRUFBMkU7QUFDM0UsdURBQXVEO0FBQ3ZELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRztJQUN4QixXQUFXO0lBQ1gsV0FBVztJQUNYLE9BQU87SUFDUCxRQUFRO0lBQ1IsV0FBVztJQUNYLFdBQVc7SUFFWCxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsYUFBYTtJQUViLFlBQVk7SUFDWixjQUFjO0lBQ2QsZUFBZTtJQUNmLGFBQWE7SUFFYix3REFBd0Q7SUFDeEQsV0FBVztJQUNYLGFBQWE7SUFDYixZQUFZO0lBQ1osYUFBYTtJQUNiLFVBQVU7SUFDVixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLFlBQVk7SUFFWixXQUFXO0lBQ1gsZUFBZTtJQUNmLFlBQVk7SUFDWixnQkFBZ0I7SUFFaEIsZUFBZTtJQUNmLGFBQWE7SUFFYixTQUFTO0lBQ1QsWUFBWTtDQUNiLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUM7QUFFaEQsTUFBTSxTQUFTLEdBQUcsU0FBUyxJQUFLLE1BQW9CLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQztBQUU3RSxNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFRckQsTUFBTSxVQUFVLG1CQUFtQixDQUNqQyxPQUErQyxFQUMvQyxRQUFnQixFQUNoQixPQUE2QjtJQUU3QixJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2QsTUFBTSxJQUFJLEtB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LENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN2SCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQzdILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuLy8gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vY29tcG9uZW50L3RleHRhcmVhLWNhcmV0LXBvc2l0aW9uXG5cbi8vIFdlJ2xsIGNvcHkgdGhlIHByb3BlcnRpZXMgYmVsb3cgaW50byB0aGUgbWlycm9yIGRpdi5cbi8vIE5vdGUgdGhhdCBzb21lIGJyb3dzZXJzLCBzdWNoIGFzIEZpcmVmb3gsIGRvIG5vdCBjb25jYXRlbmF0ZSBwcm9wZXJ0aWVzXG4vLyBpbnRvIHRoZWlyIHNob3J0aGFuZCAoZS5nLiBwYWRkaW5nLXRvcCwgcGFkZGluZy1ib3R0b20gZXRjLiAtPiBwYWRkaW5nKSxcbi8vIHNvIHdlIGhhdmUgdG8gbGlzdCBldmVyeSBzaW5nbGUgcHJvcGVydHkgZXhwbGljaXRseS5cbmV4cG9ydCBjb25zdCBwcm9wZXJ0aWVzID0gW1xuICAnZGlyZWN0aW9uJywgLy8gUlRMIHN1cHBvcnRcbiAgJ2JveFNpemluZycsXG4gICd3aWR0aCcsIC8vIG9uIENocm9tZSBhbmQgSUUsIGV4Y2x1ZGUgdGhlIHNjcm9sbGJhciwgc28gdGhlIG1pcnJvciBkaXYgd3JhcHMgZXhhY3RseSBhcyB0aGUgdGV4dGFyZWEgZG9lc1xuICAnaGVpZ2h0JyxcbiAgJ292ZXJmbG93WCcsXG4gICdvdmVyZmxvd1knLCAvLyBjb3B5IHRoZSBzY3JvbGxiYXIgZm9yIElFXG5cbiAgJ2JvcmRlclRvcFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ2JvcmRlclN0eWxlJyxcblxuICAncGFkZGluZ1RvcCcsXG4gICdwYWRkaW5nUmlnaHQnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdwYWRkaW5nTGVmdCcsXG5cbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL2ZvbnRcbiAgJ2ZvbnRTdHlsZScsXG4gICdmb250VmFyaWFudCcsXG4gICdmb250V2VpZ2h0JyxcbiAgJ2ZvbnRTdHJldGNoJyxcbiAgJ2ZvbnRTaXplJyxcbiAgJ2ZvbnRTaXplQWRqdXN0JyxcbiAgJ2xpbmVIZWlnaHQnLFxuICAnZm9udEZhbWlseScsXG5cbiAgJ3RleHRBbGlnbicsXG4gICd0ZXh0VHJhbnNmb3JtJyxcbiAgJ3RleHRJbmRlbnQnLFxuICAndGV4dERlY29yYXRpb24nLCAvLyBtaWdodCBub3QgbWFrZSBhIGRpZmZlcmVuY2UsIGJ1dCBiZXR0ZXIgYmUgc2FmZVxuXG4gICdsZXR0ZXJTcGFjaW5nJyxcbiAgJ3dvcmRTcGFjaW5nJyxcblxuICAndGFiU2l6ZScsXG4gICdNb3pUYWJTaXplJ1xuXTtcblxuY29uc3QgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5cbmNvbnN0IGlzRmlyZWZveCA9IGlzQnJvd3NlciAmJiAod2luZG93IGFzIE56U2FmZUFueSkubW96SW5uZXJTY3JlZW5YICE9IG51bGw7XG5cbmNvbnN0IF9wYXJzZUludCA9IChzdHI6IHN0cmluZykgPT4gcGFyc2VJbnQoc3RyLCAxMCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29vcmRpbmF0ZXMge1xuICB0b3A6IG51bWJlcjtcbiAgbGVmdDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhcmV0Q29vcmRpbmF0ZXMoXG4gIGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50LFxuICBwb3NpdGlvbjogbnVtYmVyLFxuICBvcHRpb25zPzogeyBkZWJ1Zz86IGJvb2xlYW4gfVxuKTogQ29vcmRpbmF0ZXMge1xuICBpZiAoIWlzQnJvd3Nlcikge1xuICAgIHRocm93IG5ldyBFcnJvcigndGV4dGFyZWEtY2FyZXQtcG9zaXRpb24jZ2V0Q2FyZXRDb29yZGluYXRlcyBzaG91bGQgb25seSBiZSBjYWxsZWQgaW4gYSBicm93c2VyJyk7XG4gIH1cblxuICBjb25zdCBkZWJ1ZyA9IChvcHRpb25zICYmIG9wdGlvbnMuZGVidWcpIHx8IGZhbHNlO1xuICBpZiAoZGVidWcpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dC10ZXh0YXJlYS1jYXJldC1wb3NpdGlvbi1taXJyb3ItZGl2Jyk7XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbC5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZChlbCk7XG4gICAgfVxuICB9XG5cbiAgLy8gVGhlIG1pcnJvciBkaXYgd2lsbCByZXBsaWNhdGUgdGhlIHRleHRhcmVhJ3Mgc3R5bGVcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5pZCA9ICdpbnB1dC10ZXh0YXJlYS1jYXJldC1wb3NpdGlvbi1taXJyb3ItZGl2JztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuXG4gIGNvbnN0IHN0eWxlID0gZGl2LnN0eWxlO1xuXG4gIGNvbnN0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUgPyB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSA6IChlbGVtZW50IGFzIE56U2FmZUFueSkuY3VycmVudFN0eWxlOyAvLyBjdXJyZW50U3R5bGUgZm9yIElFIDwgOVxuICBjb25zdCBpc0lucHV0ID0gZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0lOUFVUJztcblxuICAvLyBEZWZhdWx0IHRleHRhcmVhIHN0eWxlc1xuICBzdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJztcbiAgaWYgKCFpc0lucHV0KSB7XG4gICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7IC8vIG9ubHkgZm9yIHRleHRhcmVhLXNcbiAgfVxuXG4gIC8vIFBvc2l0aW9uIG9mZi1zY3JlZW5cbiAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnOyAvLyByZXF1aXJlZCB0byByZXR1cm4gY29vcmRpbmF0ZXMgcHJvcGVybHlcbiAgaWYgKCFkZWJ1Zykge1xuICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgfSAvLyBub3QgJ2Rpc3BsYXk6IG5vbmUnIGJlY2F1c2Ugd2Ugd2FudCByZW5kZXJpbmdcblxuICAvLyBUcmFuc2ZlciB0aGUgZWxlbWVudCdzIHByb3BlcnRpZXMgdG8gdGhlIGRpdlxuICBwcm9wZXJ0aWVzLmZvckVhY2goKHByb3A6IHN0cmluZykgPT4ge1xuICAgIGlmIChpc0lucHV0ICYmIHByb3AgPT09ICdsaW5lSGVpZ2h0Jykge1xuICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciA8aW5wdXQ+cyBiZWNhdXNlIHRleHQgaXMgcmVuZGVyZWQgY2VudGVyZWQgYW5kIGxpbmUgaGVpZ2h0IG1heSBiZSAhPSBoZWlnaHRcbiAgICAgIHN0eWxlLmxpbmVIZWlnaHQgPSBjb21wdXRlZC5oZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICBpZiAoaXNGaXJlZm94KSB7XG4gICAgLy8gRmlyZWZveCBsaWVzIGFib3V0IHRoZSBvdmVyZmxvdyBwcm9wZXJ0eSBmb3IgdGV4dGFyZWFzOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05ODQyNzVcbiAgICBpZiAoZWxlbWVudC5zY3JvbGxIZWlnaHQgPiBfcGFyc2VJbnQoY29tcHV0ZWQuaGVpZ2h0KSkge1xuICAgICAgc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7IC8vIGZvciBDaHJvbWUgdG8gbm90IHJlbmRlciBhIHNjcm9sbGJhcjsgSUUga2VlcHMgb3ZlcmZsb3dZID0gJ3Njcm9sbCdcbiAgfVxuXG4gIGRpdi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKDAsIHBvc2l0aW9uKTtcbiAgLy8gVGhlIHNlY29uZCBzcGVjaWFsIGhhbmRsaW5nIGZvciBpbnB1dCB0eXBlPVwidGV4dFwiIHZzIHRleHRhcmVhOlxuICAvLyBzcGFjZXMgbmVlZCB0byBiZSByZXBsYWNlZCB3aXRoIG5vbi1icmVha2luZyBzcGFjZXMgLSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMzQwMjAzNS8xMjY5MDM3XG4gIGlmIChpc0lucHV0KSB7XG4gICAgZGl2LnRleHRDb250ZW50ID0gZGl2LnRleHRDb250ZW50LnJlcGxhY2UoL1xccy9nLCAnXFx1MDBhMCcpO1xuICB9XG5cbiAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgLy8gV3JhcHBpbmcgbXVzdCBiZSByZXBsaWNhdGVkICpleGFjdGx5KiwgaW5jbHVkaW5nIHdoZW4gYSBsb25nIHdvcmQgZ2V0c1xuICAvLyBvbnRvIHRoZSBuZXh0IGxpbmUsIHdpdGggd2hpdGVzcGFjZSBhdCB0aGUgZW5kIG9mIHRoZSBsaW5lIGJlZm9yZSAoIzcpLlxuICAvLyBUaGUgICpvbmx5KiByZWxpYWJsZSB3YXkgdG8gZG8gdGhhdCBpcyB0byBjb3B5IHRoZSAqZW50aXJlKiByZXN0IG9mIHRoZVxuICAvLyB0ZXh0YXJlYSdzIGNvbnRlbnQgaW50byB0aGUgPHNwYW4+IGNyZWF0ZWQgYXQgdGhlIGNhcmV0IHBvc2l0aW9uLlxuICAvLyBGb3IgaW5wdXRzLCBqdXN0ICcuJyB3b3VsZCBiZSBlbm91Z2gsIGJ1dCBubyBuZWVkIHRvIGJvdGhlci5cbiAgc3Bhbi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKHBvc2l0aW9uKSB8fCAnLic7IC8vIHx8IGJlY2F1c2UgYSBjb21wbGV0ZWx5IGVtcHR5IGZhdXggc3BhbiBkb2Vzbid0IHJlbmRlciBhdCBhbGxcbiAgZGl2LmFwcGVuZENoaWxkKHNwYW4pO1xuXG4gIGNvbnN0IGNvb3JkaW5hdGVzID0ge1xuICAgIHRvcDogc3Bhbi5vZmZzZXRUb3AgKyBfcGFyc2VJbnQoY29tcHV0ZWQuYm9yZGVyVG9wV2lkdGgpLFxuICAgIGxlZnQ6IHNwYW4ub2Zmc2V0TGVmdCArIF9wYXJzZUludChjb21wdXRlZC5ib3JkZXJMZWZ0V2lkdGgpLFxuICAgIGhlaWdodDogX3BhcnNlSW50KGNvbXB1dGVkLmxpbmVIZWlnaHQpXG4gIH07XG5cbiAgaWYgKGRlYnVnKSB7XG4gICAgc3Bhbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2VlZSc7XG4gICAgY3JlYXRlRGVidWdFbGUoZWxlbWVudCwgY29vcmRpbmF0ZXMpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgfVxuXG4gIHJldHVybiBjb29yZGluYXRlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURlYnVnRWxlKGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50LCBjb29yZGluYXRlczogQ29vcmRpbmF0ZXMpOiB2b2lkIHtcbiAgY29uc3QgZm9udFNpemUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ2ZvbnQtc2l6ZScpO1xuICBjb25zdCByZWN0OiBIVE1MU3BhbkVsZW1lbnQgPSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0RFQlVHJykgYXMgSFRNTFNwYW5FbGVtZW50KSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZWN0KTtcbiAgcmVjdC5pZCA9ICdERUJVRyc7XG4gIHJlY3Quc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICByZWN0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICByZWN0LnN0eWxlLmhlaWdodCA9IGZvbnRTaXplO1xuICByZWN0LnN0eWxlLndpZHRoID0gJzFweCc7XG4gIHJlY3Quc3R5bGUudG9wID0gYCR7ZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSBlbGVtZW50LnNjcm9sbFRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCArIGNvb3JkaW5hdGVzLnRvcH1weGA7XG4gIHJlY3Quc3R5bGUubGVmdCA9IGAke2VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIGVsZW1lbnQuc2Nyb2xsTGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCArIGNvb3JkaW5hdGVzLmxlZnR9cHhgO1xufVxuIl19