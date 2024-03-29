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
const schematics_1 = require("@angular-devkit/schematics");
const testing_1 = require("@angular-devkit/schematics/testing");
const test_app_1 = require("../../../testing/test-app");
const config_1 = require("../config");
describe('v10 form components migration', () => {
    let runner;
    let host;
    let tree;
    let warnOutput;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        runner = new testing_1.SchematicTestRunner('test', require.resolve('../../../migration.json'));
        host = new schematics_1.HostTree();
        tree = yield (0, test_app_1.createTestApp)(runner, { name: 'testing' }, host);
        tree.files.forEach(f => writeFile(f, tree.readContent(f)));
        writeFile('/tsconfig.json', JSON.stringify(config_1.SchematicsTestTsConfig));
        writeFile('/angular.json', JSON.stringify(config_1.SchematicsTestNGConfig));
        warnOutput = [];
        runner.logger.subscribe(logEntry => {
            if (logEntry.level === 'warn') {
                warnOutput.push(logEntry.message);
            }
        });
    }));
    function writeFile(filePath, content) {
        if (host.exists(filePath)) {
            host.overwrite(filePath, content);
        }
        else {
            host.create(filePath, content);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function runMigration() {
        return __awaiter(this, void 0, void 0, function* () {
            yield runner.runSchematicAsync('migration-v10', {}, tree).toPromise();
        });
    }
    describe('grid/form components', () => {
        it('should properly report deprecated input', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `;
      import {Component} from '@angular/core'
      @Component({
        template: \`
        <nz-form-item nzFlex></nz-form-item>
        <nz-row nzType="flex"></nz-row>
        <nz-form-item nzType="flex"></nz-form-item>
        \`
      })
      export class MyComp {
      }`);
            yield runMigration();
            const output = warnOutput.toString();
            expect(output).toContain('/index.ts@5:23 - Found deprecated input \'[nzFlex]\'.');
            expect(output).toContain('/index.ts@6:17 - Found deprecated input \'[nzType]\'.');
            expect(output).toContain('/index.ts@7:23 - Found deprecated input \'[nzType]\'.');
        }));
    });
});
//# sourceMappingURL=grid-deprecated.spec.js.map