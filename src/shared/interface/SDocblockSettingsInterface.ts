import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SDocblockSettingsInterface
 * @namespace           shared.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SDocblock settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDocblockSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            filePath: {
                description: 'Specify the file path of the parsed file',
                type: 'String',
            },
            filter: {
                description:
                    'Specify a filter function that will be called on each docblock. If return false, the docblock will be ignored',
                type: 'Function',
            },
            filterByTag: {
                description:
                    'Specify a filter function by tag. This mean that this object must have as property the tagname you want to filter by, and a filter function as value',
                type: 'Object',
                default: {},
            },
            renderMarkdown: {
                description:
                    'Specify if you want to render the markdown inside the tag contents or not',
                type: 'Boolean',
                default: true,
            },
            markedOptions: {
                description: 'Specify some options for the marked library',
                type: 'Object',
                default: {},
            },
        };
    }
}
