/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
// from https://github.com/hsuanxyz/ng-time-parser
import { FormStyle, getLocaleDayPeriods, TranslationWidth } from '@angular/common';
import { isNotNil } from 'ng-zorro-antd/core/util';
export class NgTimeParser {
    constructor(format, localeId) {
        this.format = format;
        this.localeId = localeId;
        this.regex = null;
        this.matchMap = {
            hour: null,
            minute: null,
            second: null,
            periodNarrow: null,
            periodWide: null,
            periodAbbreviated: null
        };
        this.genRegexp();
    }
    toDate(str) {
        const result = this.getTimeResult(str);
        const time = new Date();
        if (isNotNil(result?.hour)) {
            time.setHours(result.hour);
        }
        if (isNotNil(result?.minute)) {
            time.setMinutes(result.minute);
        }
        if (isNotNil(result?.second)) {
            time.setSeconds(result.second);
        }
        if (result?.period === 1 && time.getHours() < 12) {
            time.setHours(time.getHours() + 12);
        }
        return time;
    }
    getTimeResult(str) {
        const match = this.regex.exec(str);
        let period = null;
        if (match) {
            if (isNotNil(this.matchMap.periodNarrow)) {
                period = getLocaleDayPeriods(this.localeId, FormStyle.Format, TranslationWidth.Narrow).indexOf(match[this.matchMap.periodNarrow + 1]);
            }
            if (isNotNil(this.matchMap.periodWide)) {
                period = getLocaleDayPeriods(this.localeId, FormStyle.Format, TranslationWidth.Wide).indexOf(match[this.matchMap.periodWide + 1]);
            }
            if (isNotNil(this.matchMap.periodAbbreviated)) {
                period = getLocaleDayPeriods(this.localeId, FormStyle.Format, TranslationWidth.Abbreviated).indexOf(match[this.matchMap.periodAbbreviated + 1]);
            }
            return {
                hour: isNotNil(this.matchMap.hour) ? Number.parseInt(match[this.matchMap.hour + 1], 10) : null,
                minute: isNotNil(this.matchMap.minute) ? Number.parseInt(match[this.matchMap.minute + 1], 10) : null,
                second: isNotNil(this.matchMap.second) ? Number.parseInt(match[this.matchMap.second + 1], 10) : null,
                period
            };
        }
        else {
            return null;
        }
    }
    genRegexp() {
        let regexStr = this.format.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$&');
        const hourRegex = /h{1,2}/i;
        const minuteRegex = /m{1,2}/;
        const secondRegex = /s{1,2}/;
        const periodNarrow = /aaaaa/;
        const periodWide = /aaaa/;
        const periodAbbreviated = /a{1,3}/;
        const hourMatch = hourRegex.exec(this.format);
        const minuteMatch = minuteRegex.exec(this.format);
        const secondMatch = secondRegex.exec(this.format);
        const periodNarrowMatch = periodNarrow.exec(this.format);
        let periodWideMatch = null;
        let periodAbbreviatedMatch = null;
        if (!periodNarrowMatch) {
            periodWideMatch = periodWide.exec(this.format);
        }
        if (!periodWideMatch && !periodNarrowMatch) {
            periodAbbreviatedMatch = periodAbbreviated.exec(this.format);
        }
        const matchs = [hourMatch, minuteMatch, secondMatch, periodNarrowMatch, periodWideMatch, periodAbbreviatedMatch]
            .filter(m => !!m)
            .sort((a, b) => a.index - b.index);
        matchs.forEach((match, index) => {
            switch (match) {
                case hourMatch:
                    this.matchMap.hour = index;
                    regexStr = regexStr.replace(hourRegex, '(\\d{1,2})');
                    break;
                case minuteMatch:
                    this.matchMap.minute = index;
                    regexStr = regexStr.replace(minuteRegex, '(\\d{1,2})');
                    break;
                case secondMatch:
                    this.matchMap.second = index;
                    regexStr = regexStr.replace(secondRegex, '(\\d{1,2})');
                    break;
                case periodNarrowMatch:
                    this.matchMap.periodNarrow = index;
                    const periodsNarrow = getLocaleDayPeriods(this.localeId, FormStyle.Format, TranslationWidth.Narrow).join('|');
                    regexStr = regexStr.replace(periodNarrow, `(${periodsNarrow})`);
                    break;
                case periodWideMatch:
                    this.matchMap.periodWide = index;
                    const periodsWide = getLocaleDayPeriods(this.localeId, FormStyle.Format, TranslationWidth.Wide).join('|');
                    regexStr = regexStr.replace(periodWide, `(${periodsWide})`);
                    break;
                case periodAbbreviatedMatch:
                    this.matchMap.periodAbbreviated = index;
                    const periodsAbbreviated = getLocaleDayPeriods(this.localeId, FormStyle.Format, TranslationWidth.Abbreviated).join('|');
                    regexStr = regexStr.replace(periodAbbreviated, `(${periodsAbbreviated})`);
                    break;
            }
        });
        this.regex = new RegExp(regexStr);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvdGltZS90aW1lLXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxrREFBa0Q7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRW5GLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQVNuRCxNQUFNLE9BQU8sWUFBWTtJQVd2QixZQUFvQixNQUFjLEVBQVUsUUFBZ0I7UUFBeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVE7UUFWNUQsVUFBSyxHQUFXLElBQUssQ0FBQztRQUN0QixhQUFRLEdBQXFDO1lBQzNDLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLElBQUk7WUFDWixNQUFNLEVBQUUsSUFBSTtZQUNaLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGlCQUFpQixFQUFFLElBQUk7U0FDeEIsQ0FBQztRQUdBLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDaEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXhCLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtRQUVELElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU8sQ0FBQyxNQUFNLENB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Q0FBQztvQkFDakMsTUFBTSxXQUFXLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDMUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztvQkFDNUQsTUFBTTtnQkFDUixLQUFLLHNCQUFzQjtvQkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7b0JBQ3hDLE1BQU0sa0JBQWtCLEdBQUcsbUJBQW1CLENBQzVDLElBQUksQ0FBQyxRQUFRLEVBQ2IsU0FBUyxDQUFDLE1BQU0sRUFDaEIsZ0JBQWdCLENBQUMsV0FBVyxDQUM3QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDWixRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLGtCQUFrQixHQUFHLENBQUMsQ0FBQztvQkFDMUUsTUFBTTthQUNUO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbi8vIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2hzdWFueHl6L25nLXRpbWUtcGFyc2VyXG5pbXBvcnQgeyBGb3JtU3R5bGUsIGdldExvY2FsZURheVBlcmlvZHMsIFRyYW5zbGF0aW9uV2lkdGggfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBUaW1lUmVzdWx0IHtcbiAgaG91cjogbnVtYmVyIHwgbnVsbDtcbiAgbWludXRlOiBudW1iZXIgfCBudWxsO1xuICBzZWNvbmQ6IG51bWJlciB8IG51bGw7XG4gIHBlcmlvZDogbnVtYmVyIHwgbnVsbDtcbn1cblxuZXhwb3J0IGNsYXNzIE5nVGltZVBhcnNlciB7XG4gIHJlZ2V4OiBSZWdFeHAgPSBudWxsITtcbiAgbWF0Y2hNYXA6IHsgW2tleTogc3RyaW5nXTogbnVsbCB8IG51bWJlciB9ID0ge1xuICAgIGhvdXI6IG51bGwsXG4gICAgbWludXRlOiBudWxsLFxuICAgIHNlY29uZDogbnVsbCxcbiAgICBwZXJpb2ROYXJyb3c6IG51bGwsXG4gICAgcGVyaW9kV2lkZTogbnVsbCxcbiAgICBwZXJpb2RBYmJyZXZpYXRlZDogbnVsbFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybWF0OiBzdHJpbmcsIHByaXZhdGUgbG9jYWxlSWQ6IHN0cmluZykge1xuICAgIHRoaXMuZ2VuUmVnZXhwKCk7XG4gIH1cblxuICB0b0RhdGUoc3RyOiBzdHJpbmcpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldFRpbWVSZXN1bHQoc3RyKTtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKTtcblxuICAgIGlmIChpc05vdE5pbChyZXN1bHQ/LmhvdXIpKSB7XG4gICAgICB0aW1lLnNldEhvdXJzKHJlc3VsdCEuaG91cik7XG4gICAgfVxuXG4gICAgaWYgKGlzTm90TmlsKHJlc3VsdD8ubWludXRlKSkge1xuICAgICAgdGltZS5zZXRNaW51dGVzKHJlc3VsdCEubWludXRlKTtcbiAgICB9XG5cbiAgICBpZiAoaXNOb3ROaWwocmVzdWx0Py5zZWNvbmQpKSB7XG4gICAgICB0aW1lLnNldFNlY29uZHMocmVzdWx0IS5zZWNvbmQpO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQ/LnBlcmlvZCA9PT0gMSAmJiB0aW1lLmdldEhvdXJzKCkgPCAxMikge1xuICAgICAgdGltZS5zZXRIb3Vycyh0aW1lLmdldEhvdXJzKCkgKyAxMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpbWU7XG4gIH1cblxuICBnZXRUaW1lUmVzdWx0KHN0cjogc3RyaW5nKTogVGltZVJlc3VsdCB8IG51bGwge1xuICAgIGNvbnN0IG1hdGNoID0gdGhpcy5yZWdleC5leGVjKHN0cik7XG4gICAgbGV0IHBlcmlvZCA9IG51bGw7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBpZiAoaXNOb3ROaWwodGhpcy5tYXRjaE1hcC5wZXJpb2ROYXJyb3cpKSB7XG4gICAgICAgIHBlcmlvZCA9IGdldExvY2FsZURheVBlcmlvZHModGhpcy5sb2NhbGVJZCwgRm9ybVN0eWxlLkZvcm1hdCwgVHJhbnNsYXRpb25XaWR0aC5OYXJyb3cpLmluZGV4T2YoXG4gICAgICAgICAgbWF0Y2hbdGhpcy5tYXRjaE1hcC5wZXJpb2ROYXJyb3cgKyAxXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKGlzTm90TmlsKHRoaXMubWF0Y2hNYXAucGVyaW9kV2lkZSkpIHtcbiAgICAgICAgcGVyaW9kID0gZ2V0TG9jYWxlRGF5UGVyaW9kcyh0aGlzLmxvY2FsZUlkLCBGb3JtU3R5bGUuRm9ybWF0LCBUcmFuc2xhdGlvbldpZHRoLldpZGUpLmluZGV4T2YoXG4gICAgICAgICAgbWF0Y2hbdGhpcy5tYXRjaE1hcC5wZXJpb2RXaWRlICsgMV1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc05vdE5pbCh0aGlzLm1hdGNoTWFwLnBlcmlvZEFiYnJldmlhdGVkKSkge1xuICAgICAgICBwZXJpb2QgPSBnZXRMb2NhbGVEYXlQZXJpb2RzKHRoaXMubG9jYWxlSWQsIEZvcm1TdHlsZS5Gb3JtYXQsIFRyYW5zbGF0aW9uV2lkdGguQWJicmV2aWF0ZWQpLmluZGV4T2YoXG4gICAgICAgICAgbWF0Y2hbdGhpcy5tYXRjaE1hcC5wZXJpb2RBYmJyZXZpYXRlZCArIDFdXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBob3VyOiBpc05vdE5pbCh0aGlzLm1hdGNoTWFwLmhvdXIpID8gTnVtYmVyLnBhcnNlSW50KG1hdGNoW3RoaXMubWF0Y2hNYXAuaG91ciArIDFdLCAxMCkgOiBudWxsLFxuICAgICAgICBtaW51dGU6IGlzTm90TmlsKHRoaXMubWF0Y2hNYXAubWludXRlKSA/IE51bWJlci5wYXJzZUludChtYXRjaFt0aGlzLm1hdGNoTWFwLm1pbnV0ZSArIDFdLCAxMCkgOiBudWxsLFxuICAgICAgICBzZWNvbmQ6IGlzTm90TmlsKHRoaXMubWF0Y2hNYXAuc2Vjb25kKSA/IE51bWJlci5wYXJzZUludChtYXRjaFt0aGlzLm1hdGNoTWFwLnNlY29uZCArIDFdLCAxMCkgOiBudWxsLFxuICAgICAgICBwZXJpb2RcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGdlblJlZ2V4cCgpOiB2b2lkIHtcbiAgICBsZXQgcmVnZXhTdHIgPSB0aGlzLmZvcm1hdC5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8W1xcXVxcL1xcXFxdKS9nLCAnXFxcXCQmJyk7XG4gICAgY29uc3QgaG91clJlZ2V4ID0gL2h7MSwyfS9pO1xuICAgIGNvbnN0IG1pbnV0ZVJlZ2V4ID0gL217MSwyfS87XG4gICAgY29uc3Qgc2Vjb25kUmVnZXggPSAvc3sxLDJ9LztcbiAgICBjb25zdCBwZXJpb2ROYXJyb3cgPSAvYWFhYWEvO1xuICAgIGNvbnN0IHBlcmlvZFdpZGUgPSAvYWFhYS87XG4gICAgY29uc3QgcGVyaW9kQWJicmV2aWF0ZWQgPSAvYXsxLDN9LztcblxuICAgIGNvbnN0IGhvdXJNYXRjaCA9IGhvdXJSZWdleC5leGVjKHRoaXMuZm9ybWF0KTtcbiAgICBjb25zdCBtaW51dGVNYXRjaCA9IG1pbnV0ZVJlZ2V4LmV4ZWModGhpcy5mb3JtYXQpO1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kUmVnZXguZXhlYyh0aGlzLmZvcm1hdCk7XG4gICAgY29uc3QgcGVyaW9kTmFycm93TWF0Y2ggPSBwZXJpb2ROYXJyb3cuZXhlYyh0aGlzLmZvcm1hdCk7XG4gICAgbGV0IHBlcmlvZFdpZGVNYXRjaDogbnVsbCB8IFJlZ0V4cEV4ZWNBcnJheSA9IG51bGw7XG4gICAgbGV0IHBlcmlvZEFiYnJldmlhdGVkTWF0Y2g6IG51bGwgfCBSZWdFeHBFeGVjQXJyYXkgPSBudWxsO1xuICAgIGlmICghcGVyaW9kTmFycm93TWF0Y2gpIHtcbiAgICAgIHBlcmlvZFdpZGVNYXRjaCA9IHBlcmlvZFdpZGUuZXhlYyh0aGlzLmZvcm1hdCk7XG4gICAgfVxuICAgIGlmICghcGVyaW9kV2lkZU1hdGNoICYmICFwZXJpb2ROYXJyb3dNYXRjaCkge1xuICAgICAgcGVyaW9kQWJicmV2aWF0ZWRNYXRjaCA9IHBlcmlvZEFiYnJldmlhdGVkLmV4ZWModGhpcy5mb3JtYXQpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNocyA9IFtob3VyTWF0Y2gsIG1pbnV0ZU1hdGNoLCBzZWNvbmRNYXRjaCwgcGVyaW9kTmFycm93TWF0Y2gsIHBlcmlvZFdpZGVNYXRjaCwgcGVyaW9kQWJicmV2aWF0ZWRNYXRjaF1cbiAgICAgIC5maWx0ZXIobSA9PiAhIW0pXG4gICAgICAuc29ydCgoYSwgYikgPT4gYSEuaW5kZXggLSBiIS5pbmRleCk7XG5cbiAgICBtYXRjaHMuZm9yRWFjaCgobWF0Y2gsIGluZGV4KSA9PiB7XG4gICAgICBzd2l0Y2ggKG1hdGNoKSB7XG4gICAgICAgIGNhc2UgaG91ck1hdGNoOlxuICAgICAgICAgIHRoaXMubWF0Y2hNYXAuaG91ciA9IGluZGV4O1xuICAgICAgICAgIHJlZ2V4U3RyID0gcmVnZXhTdHIucmVwbGFjZShob3VyUmVnZXgsICcoXFxcXGR7MSwyfSknKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBtaW51dGVNYXRjaDpcbiAgICAgICAgICB0aGlzLm1hdGNoTWFwLm1pbnV0ZSA9IGluZGV4O1xuICAgICAgICAgIHJlZ2V4U3RyID0gcmVnZXhTdHIucmVwbGFjZShtaW51dGVSZWdleCwgJyhcXFxcZHsxLDJ9KScpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHNlY29uZE1hdGNoOlxuICAgICAgICAgIHRoaXMubWF0Y2hNYXAuc2Vjb25kID0gaW5kZXg7XG4gICAgICAgICAgcmVnZXhTdHIgPSByZWdleFN0ci5yZXBsYWNlKHNlY29uZFJlZ2V4LCAnKFxcXFxkezEsMn0pJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgcGVyaW9kTmFycm93TWF0Y2g6XG4gICAgICAgICAgdGhpcy5tYXRjaE1hcC5wZXJpb2ROYXJyb3cgPSBpbmRleDtcbiAgICAgICAgICBjb25zdCBwZXJpb2RzTmFycm93ID0gZ2V0TG9jYWxlRGF5UGVyaW9kcyh0aGlzLmxvY2FsZUlkLCBGb3JtU3R5bGUuRm9ybWF0LCBUcmFuc2xhdGlvbldpZHRoLk5hcnJvdykuam9pbignfCcpO1xuICAgICAgICAgIHJlZ2V4U3RyID0gcmVnZXhTdHIucmVwbGFjZShwZXJpb2ROYXJyb3csIGAoJHtwZXJpb2RzTmFycm93fSlgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBwZXJpb2RXaWRlTWF0Y2g6XG4gICAgICAgICAgdGhpcy5tYXRjaE1hcC5wZXJpb2RXaWRlID0gaW5kZXg7XG4gICAgICAgICAgY29uc3QgcGVyaW9kc1dpZGUgPSBnZXRMb2NhbGVEYXlQZXJpb2RzKHRoaXMubG9jYWxlSWQsIEZvcm1TdHlsZS5Gb3JtYXQsIFRyYW5zbGF0aW9uV2lkdGguV2lkZSkuam9pbignfCcpO1xuICAgICAgICAgIHJlZ2V4U3RyID0gcmVnZXhTdHIucmVwbGFjZShwZXJpb2RXaWRlLCBgKCR7cGVyaW9kc1dpZGV9KWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHBlcmlvZEFiYnJldmlhdGVkTWF0Y2g6XG4gICAgICAgICAgdGhpcy5tYXRjaE1hcC5wZXJpb2RBYmJyZXZpYXRlZCA9IGluZGV4O1xuICAgICAgICAgIGNvbnN0IHBlcmlvZHNBYmJyZXZpYXRlZCA9IGdldExvY2FsZURheVBlcmlvZHMoXG4gICAgICAgICAgICB0aGlzLmxvY2FsZUlkLFxuICAgICAgICAgICAgRm9ybVN0eWxlLkZvcm1hdCxcbiAgICAgICAgICAgIFRyYW5zbGF0aW9uV2lkdGguQWJicmV2aWF0ZWRcbiAgICAgICAgICApLmpvaW4oJ3wnKTtcbiAgICAgICAgICByZWdleFN0ciA9IHJlZ2V4U3RyLnJlcGxhY2UocGVyaW9kQWJicmV2aWF0ZWQsIGAoJHtwZXJpb2RzQWJicmV2aWF0ZWR9KWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZWdleCA9IG5ldyBSZWdFeHAocmVnZXhTdHIpO1xuICB9XG59XG4iXX0=