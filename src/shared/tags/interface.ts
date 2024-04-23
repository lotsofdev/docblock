// // @ts-nocheck

import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import {
    __checkPathWithMultipleExtensions,
    __fileName,
    __folderPath,
} from '@coffeekraken/sugar/fs';
import { __deepMap } from '@coffeekraken/sugar/object';
import { __resolveTypeString } from '@coffeekraken/sugar/type';
import __fs from 'fs';
import __path from 'path';

/**
 * @name              interface
 * @namespace           shared.tags
 * @type              Function
 * @async
 * @platform            node
 * @status              beta
 *
 * Parse the interface tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default async function interfaceTag(data, blockSettings) {
    let stringArray: string[] = [];

    if (data.value === true) {
        stringArray = [__fileName(blockSettings.filePath), 'default'];
    } else {
        stringArray = data.value.trim().split(/(?<=^\S+)\s/);
    }

    let path = stringArray[0],
        importName = stringArray[1] ? stringArray[1].trim() : 'default';

    const potentialPath = __checkPathWithMultipleExtensions(
        __path.resolve(__folderPath(blockSettings.filePath), path),
        ['ts', 'js'],
    );

    if (!potentialPath) return;

    let interf;

    if (potentialPath.match(/\.ts$/)) {
        const result = await __STypescriptBuilder.buildTemporary(potentialPath);

        // const typescriptBuilder = new __STypescriptBuilder();
        // const result = await typescriptBuilder.build({
        //     glob: __path.basename(potentialPath),
        //     inDir: __path.dirname(potentialPath),
        //     outDir: __path.dirname(potentialPath),
        //     formats: ['esm'],
        //     save: true,
        // });
        // console.log('_IN', result);
        // @ts-ignore
        interf = await import(potentialPath.replace(/\.ts$/, '.js'));
        setTimeout(() => {
            result?.remove?.();
        });

        try {
            __fs.unlinkSync(potentialPath.replace(/\.ts$/, '.js'));
        } catch (e) {}
    } else {
        // @ts-ignore
        interf = await import(potentialPath);
    }

    // take at first the "interface" export
    if (interf.interface) interf = interf.interface;
    // otherwise, take the default one
    else interf = interf.default;

    const interfaceObj = interf.toObject?.() ?? interf;

    for (let [prop, value] of Object.entries(interfaceObj.definition)) {
        if (value.type && typeof value.type === 'string') {
            value.type = await __resolveTypeString(`{${value.type}}`);
        }
    }

    interfaceObj.definition = __deepMap(
        interfaceObj.definition,
        ({ object, prop, value }) => {
            if (typeof value === 'string') {
                const newValue = new String(value);
                // @ts-ignore
                newValue.render = true;
                return newValue;
            }
            return value;
        },
    );

    return interfaceObj;
}
