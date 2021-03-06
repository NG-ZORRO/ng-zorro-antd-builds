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
exports.addThemeToAppStyles = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@angular/cdk/schematics");
const change_1 = require("@schematics/angular/utility/change");
const workspace_1 = require("@schematics/angular/utility/workspace");
const path_1 = require("path");
const create_custom_theme_1 = require("../../utils/create-custom-theme");
const compiledThemePathSegment = 'ng-zorro-antd';
const compiledThemePath = './node_modules/ng-zorro-antd/ng-zorro-antd.min.css';
const defaultCustomThemeFilename = 'theme.less';
/** Object that maps a CLI target to its default builder name. */
const defaultTargetBuilders = {
    build: '@angular-devkit/build-angular:browser',
    test: '@angular-devkit/build-angular:karma'
};
/** Add pre-built styles to the main project style file. */
function addThemeToAppStyles(options) {
    return (host, context) => __awaiter(this, void 0, void 0, function* () {
        if (options.theme) {
            return insertCustomTheme(options.project, host, context.logger);
        }
        else {
            return insertCompiledTheme(options.project, context.logger);
        }
    });
}
exports.addThemeToAppStyles = addThemeToAppStyles;
/**
 * Insert a custom theme to project style file. If no valid style file could be found, a new
 * Scss file for the custom theme will be created.
 */
function insertCustomTheme(projectName, host, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(host);
        const project = schematics_2.getProjectFromWorkspace(workspace, projectName);
        const stylesPath = schematics_2.getProjectStyleFile(project, 'less');
        const themeContent = create_custom_theme_1.createCustomTheme();
        if (!stylesPath) {
            if (!project.sourceRoot) {
                throw new schematics_1.SchematicsException(`Could not find source root for project: "${projectName}". ` +
                    `Please make sure that the "sourceRoot" property is set in the workspace config.`);
            }
            // Normalize the path through the devkit utilities because we want to avoid having
            // unnecessary path segments and windows backslash delimiters.
            const customThemePath = core_1.normalize(path_1.join(project.sourceRoot, defaultCustomThemeFilename));
            if (host.exists(customThemePath)) {
                logger.warn(`Cannot create a custom NG-ZORRO theme because
          ${customThemePath} already exists. Skipping custom theme generation.`);
                return schematics_1.noop();
            }
            host.create(customThemePath, themeContent);
            return addThemeStyleToTarget(projectName, 'build', customThemePath, logger);
        }
        const insertion = new change_1.InsertChange(stylesPath, 0, themeContent);
        const recorder = host.beginUpdate(stylesPath);
        recorder.insertLeft(insertion.pos, insertion.toAdd);
        host.commitUpdate(recorder);
    });
}
/** Insert a pre-built theme into the angular.json file. */
function insertCompiledTheme(project, logger) {
    return schematics_1.chain([
        addThemeStyleToTarget(project, 'build', compiledThemePath, logger),
        addThemeStyleToTarget(project, 'test', compiledThemePath, logger)
    ]);
}
/** Adds a theming style entry to the given project target options. */
function addThemeStyleToTarget(projectName, targetName, assetPath, logger) {
    return workspace_1.updateWorkspace(workspace => {
        const project = schematics_2.getProjectFromWorkspace(workspace, projectName);
        // Do not update the builder options in case the target does not use the default CLI builder.
        if (!validateDefaultTargetBuilder(project, targetName, logger)) {
            return;
        }
        const targetOptions = schematics_2.getProjectTargetOptions(project, targetName);
        const styles = targetOptions.styles;
        if (!styles) {
            targetOptions.styles = [assetPath];
        }
        else {
            const existingStyles = styles.map(s => typeof s === 'string' ? s : s.input);
            for (const [index, stylePath] of existingStyles.entries()) {
                // If the given asset is already specified in the styles, we don't need to do anything.
                if (stylePath === assetPath) {
                    return;
                }
                // In case a prebuilt theme is already set up, we can safely replace the theme with the new
                // theme file. If a custom theme is set up, we are not able to safely replace the custom
                // theme because these files can contain custom styles, while prebuilt themes are
                // always packaged and considered replaceable.
                if (stylePath.includes(defaultCustomThemeFilename)) {
                    logger.error(`Could not style file to the CLI project configuration ` +
                        `because there is already a custom theme file referenced.`);
                    logger.info(`Please manually add the following style file to your configuration:`);
                    logger.info(`${assetPath}`);
                    return;
                }
                else if (stylePath.includes(compiledThemePathSegment)) {
                    styles.splice(index, 1);
                }
            }
        }
        styles.unshift(assetPath);
    });
}
/**
 * Validates that the specified project target is configured with the default builders which are
 * provided by the Angular CLI. If the configured builder does not match the default builder,
 * this function can either throw or just show a warning.
 */
function validateDefaultTargetBuilder(project, targetName, logger) {
    const defaultBuilder = defaultTargetBuilders[targetName];
    const targetConfig = project.targets && project.targets.get(targetName);
    const isDefaultBuilder = targetConfig && targetConfig.builder === defaultBuilder;
    if (!isDefaultBuilder && targetName === 'build') {
        throw new schematics_1.SchematicsException(`Your project is not using the default builders for ` +
            `"${targetName}". The NG-ZORRO schematics cannot add a theme to the workspace ` +
            `configuration if the builder has been changed.`);
    }
    else if (!isDefaultBuilder) {
        logger.warn(`Your project is not using the default builders for "${targetName}". This ` +
            `means that we cannot add the configured theme to the "${targetName}" target.`);
    }
    return isDefaultBuilder;
}
//# sourceMappingURL=theming.js.map