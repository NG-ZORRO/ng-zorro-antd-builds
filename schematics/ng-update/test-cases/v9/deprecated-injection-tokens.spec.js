"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const testing_1 = require("@angular-devkit/core/node/testing");
const schematics_1 = require("@angular-devkit/schematics");
const testing_2 = require("@angular-devkit/schematics/testing");
const shx = require("shelljs");
const config_1 = require("../config");
describe('injection tokens migration', () => {
    let runner;
    let host;
    let tree;
    let tmpDirPath;
    let previousWorkingDir;
    let warnOutput;
    beforeEach(() => {
        runner = new testing_2.SchematicTestRunner('test', require.resolve('../../../migration.json'));
        host = new testing_1.TempScopedNodeJsSyncHost();
        tree = new testing_2.UnitTestTree(new schematics_1.HostTree(host));
        writeFile('/tsconfig.json', JSON.stringify(config_1.SchematicsTestTsConfig));
        writeFile('/angular.json', JSON.stringify(config_1.SchematicsTestNGConfig));
        warnOutput = [];
        runner.logger.subscribe(logEntry => {
            if (logEntry.level === 'warn') {
                warnOutput.push(logEntry.message);
            }
        });
        previousWorkingDir = shx.pwd();
        tmpDirPath = core_1.getSystemPath(host.root);
        shx.cd(tmpDirPath);
        writeFakeAngular();
    });
    afterEach(() => {
        shx.cd(previousWorkingDir);
        shx.rm('-r', tmpDirPath);
    });
    function writeFakeAngular() { writeFile('/node_modules/@angular/core/index.d.ts', ``); }
    function writeFile(filePath, contents) {
        host.sync.write(core_1.normalize(filePath), core_1.virtualFs.stringToFileBuffer(contents));
    }
    // tslint:disable-next-line:no-any
    function runMigration() {
        return __awaiter(this, void 0, void 0, function* () {
            yield runner.runSchematicAsync('migration-v9', {}, tree).toPromise();
        });
    }
    describe('Injection Tokens', () => {
        it('should properly report invalid deprecated injection tokens', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
      import { NZ_NOTIFICATION_CONFIG, NZ_MESSAGE_CONFIG, NZ_DEFAULT_EMPTY_CONTENT } from 'ng-zorro-antd';

      `);
            yield runMigration();
            const tokensWarn = [
                'index.ts@2:16 - Found deprecated symbol "NZ_NOTIFICATION_CONFIG" which has been removed. Use global config to ' +
                    'instead please.',
                'index.ts@2:40 - Found deprecated symbol "NZ_MESSAGE_CONFIG" which has been removed. Use global config to ' +
                    'instead please.',
                'index.ts@2:59 - Found deprecated symbol "NZ_DEFAULT_EMPTY_CONTENT" which has been removed. Use global config ' +
                    'to instead please.'
            ];
            tokensWarn.forEach(warn => {
                expect(warnOutput).toContain(warn);
            });
        }));
        it('should properly report invalid deprecated injection tokens whit secondary entry', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
      import { NZ_NOTIFICATION_CONFIG} from 'ng-zorro-antd/notification';
      import { NZ_DEFAULT_EMPTY_CONTENT } from 'ng-zorro-antd/empty';
      import { NZ_MESSAGE_CONFIG } from 'ng-zorro-antd/message';
      import { NZ_ICON_DEFAULT_TWOTONE_COLOR } from 'ng-zorro-antd';

      `);
            yield runMigration();
            const tokensWarn = [
                'index.ts@2:16 - Found deprecated symbol "NZ_NOTIFICATION_CONFIG" which has been removed. Use global config ' +
                    'to instead please.',
                'index.ts@3:16 - Found deprecated symbol "NZ_DEFAULT_EMPTY_CONTENT" which has been removed. Use global config ' +
                    'to instead please.',
                'index.ts@4:16 - Found deprecated symbol "NZ_MESSAGE_CONFIG" which has been removed. Use global config to ' +
                    'instead please.',
                'index.ts@5:16 - Found deprecated symbol "NZ_ICON_DEFAULT_TWOTONE_COLOR" which has been removed. Use global config to ' +
                    'instead please.'
            ];
            tokensWarn.forEach(warn => {
                expect(warnOutput).toContain(warn);
            });
        }));
        it('should not report invalid deprecated injection tokens in other package', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
      import { NZ_NOTIFICATION_CONFIG} from 'other/notification';
      import { NZ_DEFAULT_EMPTY_CONTENT } from 'other/empty';
      import { NZ_MESSAGE_CONFIG } from 'other/message';
      import { NZ_NOTIFICATION_CONFIG, NZ_MESSAGE_CONFIG, NZ_DEFAULT_EMPTY_CONTENT } from 'other';

      `);
            yield runMigration();
            expect(warnOutput.length).toBe(0);
        }));
    });
});
//# sourceMappingURL=deprecated-injection-tokens.spec.js.map