import __SClass from '@coffeekraken/s-class';
import { __sha256 } from '@coffeekraken/sugar/crypto';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __namespaceCompliant } from '@coffeekraken/sugar/string';
import { marked as __marked } from 'marked';

import __authorTag from './tags/author.js';
import __contributorTag from './tags/contributor.js';
import __cssClass from './tags/cssClass.js';
import __descriptionTag from './tags/description.js';
import __eventTag from './tags/event.js';
import __exampleTag from './tags/example.js';
import __installTag from './tags/install.js';
import __interfaceTag from './tags/interface.js';
import __menuTag from './tags/menu.js';
import __namespaceTag from './tags/namespace.js';
import __paramTag from './tags/param.js';
import __platformTag from './tags/platform.js';
import __returnTag from './tags/return.js';
import __seeTag from './tags/see.js';
import __simpleRepeatableValue from './tags/simpleRepeatableValue.js';
import __simpleValueTag from './tags/simpleValue.js';
import __snippetTag from './tags/snippet.js';
import __supportTag from './tags/support.js';
import __todoTag from './tags/todo.js';
import __typeTag from './tags/type.js';

/**
 * @name          SDocblockBlock
 * @namespace           shared
 * @type          Class
 * @extends     SClass
 * @platform            node
 * @status          beta
 *
 * This class represent a docblock object that contains all the "tags" values and some features like:
 * - Converting the block to markdown
 * - More to come...
 *
 * @feature         `author` tag support
 * @feature         `contributor` tag support
 * @feature         `cssClass` tag support
 * @feature         `description` tag support
 * @feature         `event` tag support
 * @feature         `example` tag support
 * @feature         `install` tag support
 * @feature         `interface` tag support
 * @feature         `menu` tag support
 * @feature         `namespace` tag support
 * @feature         `param` tag support
 * @feature         `platform` tag support
 * @feature         `return` tag support
 * @feature         `see` tag support
 * @feature         `snippet` tag support
 * @feature         `support` tag support
 * @feature         `todo` tag support
 * @feature         `type` tag support
 * @feature         All the other tags are treated like a `String` value
 *
 * @param         {String}       source      The docblock source.  Has to be a parsable docblock string
 * @param         {Object}      [settings={}]       A settings object to configure your instance
 *
 * @setting         {String}        [filePath=null]         Specify the file path where the docblocks are parsed from
 * @setting         {Any}           [packageJson={}]        Pass the current package.json data to add some metas to the docblocks
 * @setting         {Boolean}       [renderMarkdown=false]              Specify if you want to render the markdown in the tags values or not
 * @setting         {Any}           [markedOptions={}]                  Specify some [marked](https://www.npmjs.com/package/marked) options to render markdown
 * @setting         {Function}      [sortFunction=function(a, b) {})]       Specify a function to sort the docblocks. A default sort is applied
 * @setting         {Record<String, Function>}      [tags={}]           Specify some tags you want to include with a function that will be used to actually parse his value and return the formatted one. Some tags are built-in. Look at the features section.
 *
 * @todo        tests
 * @todo        Support "feature" tag
 * @todo        Check the supported tags
 *
 * @snippet         __SDocblockBlock($1)
 * new __SDocblockBlock($1)
 *
 * @example         js
 * import { __SDocblockBlock } from '@coffeekraken/s-docblock';
 * const docblock = new __SDocblockBlock(myDocblockString);
 * const docblock.toObject();
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */

export interface ISDocblockBlockTagsMap {
    [key: string]: Function;
}

export interface ISDocblockBlockSettings {
    filePath?: string;
    packageJson: any;
    renderMarkdown: boolean;
    markedOptions: any;
    tags: ISDocblockBlockTagsMap;
}

// @ts-ignore
class SDocblockBlock extends __SClass {
    /**
     * @name            tagsMap
     * @type            Object
     * @static
     *
     * Store the default tags mapping to their parsing functions
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    static tagsMap: ISDocblockBlockTagsMap = {};

    /**
     * @name          _source
     * @type          String
     * @private
     *
     * Store the passed source
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    _source: string;

    /**
     * @name        _blockObj
     * @type        {Object}
     * @private
     *
     * Store the parsed docblock object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    _blockObj: any;

    /**
     * @name          registerTag
     * @type          Function
     * @static
     *
     * This static method allows you to register a new tag that will
     * be recognized by the SDocblockBlock class.
     *
     * @param     {String}      tagName       The tag you want to register without the @
     * @param     {Function}    parser    A function that will be called with the string tag content. You can parse this string and return an object that represent the tag data
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    static registerTag(tagName: string, parser: any): void {
        // check the params
        if (typeof parser !== 'function')
            throw new Error(
                `The "<yellow>parser</yellow>" parameter of the static "<cyan>SDocblockBlock</cyan>" class method needs to be a "<green>Function</green>"`,
            );
        // register the tag
        SDocblockBlock.tagsMap[tagName] = parser;
    }

    /**
     * @name          constructor
     * @type          Function
     * @contructor
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(source, settings?: Partial<ISDocblockBlockSettings>) {
        super(
            __deepMerge(
                {
                    filePath: null,
                    packageJson: null,
                    renderMarkdown: false,
                    markedOptions: {},
                    tags: SDocblockBlock.tagsMap,
                },
                settings,
            ),
        );

        this._source = source
            .trim()
            .replace(/\s\*\s/gm, '\n * ')
            .split(/\n/gm)
            .map((l) => l.trim())
            .filter((l) => l !== '')
            .join('\n')
            // .replace(/\*\s\*/gm, '*')
            .replace(/^\/\*\*/, '/**\n*')
            .replace(/\*\/$/, '\n*/');
    }

    /**
     * @name          toString
     * @type          Function
     *
     * This method return the passed source string
     *
     * @return      {String}              The passed docblock string
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toString() {
        return this._source.trim();
    }

    /**
     * @name          toObject
     * @type          Function
     *
     * This method return the parsed docblock object
     *
     * @return      {Object}              The parsed dobclock object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toObject() {
        if (!this._blockObj) {
            throw new Error(
                `<red>${this.constructor.name}</red> Before accessing the blocks you'll need to parse the docblocks using "<yellow>await this.parse()</yellow>"`,
            );
        }
        return this._blockObj;
    }

    /**
     * @name          parse
     * @type          Function
     * @async
     * @private
     *
     * This method take a docblick string and parse it to a javascript object
     *
     * @return      {Object}          The object version of the source string
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    parse(): Promise<any> {
        return new Promise(async (resolve) => {
            // some variables
            let currentTag: string;
            let currentContent: string[] = [];
            let currentObj: any = {};
            let docblockObj: any = {};
            let finalDocblockObj: any = {};
            let previousWasEmptyLine = false;

            function add() {
                if (currentContent.length) currentObj.content = currentContent;
                if (
                    docblockObj.hasOwnProperty(currentTag) &&
                    !Array.isArray(docblockObj[currentTag])
                ) {
                    const currentValue = docblockObj[currentTag];
                    docblockObj[currentTag] = [currentValue];
                }
                if (!currentObj.value) currentObj.value = true;
                if (Array.isArray(docblockObj[currentTag])) {
                    docblockObj[currentTag].push(currentObj);
                } else {
                    docblockObj[currentTag] = currentObj;
                }
                currentObj = {};
                currentContent = [];
                // @ts-ignore
                currentTag = undefined;
            }

            // split the block by tags
            let lines = this._source.trim().split('\n');
            if (!lines || !lines.length) return null;
            lines = lines.map((l) => l.trim()).filter((l) => l !== '');

            lines.forEach((line) => {
                // get the tag name
                const tagNameReg = /\*[\s]?@([a-zA-Z0-9]+)(\s)+/;
                const tagNameMatch = line.trim().match(tagNameReg);

                if (line.replace('*', '').trim() === '') {
                    if (currentContent.length > 0) {
                        currentContent.push('');
                    } else {
                        if (currentTag && currentObj.value) {
                            add();
                        }
                        previousWasEmptyLine = true;
                    }
                } else if (tagNameMatch) {
                    if (currentTag) {
                        add();
                    }
                    currentTag = tagNameMatch[1];
                    line = line.replace(tagNameMatch[0], '').trim();
                    if (line.length > 0) {
                        currentObj.value = line;
                    } else {
                        currentObj.value = true;
                    }
                    previousWasEmptyLine = false;
                } else if (
                    previousWasEmptyLine &&
                    !line.trim().match(/^\*\/$/)
                ) {
                    currentTag = 'description';
                    currentContent = [line.replace('*', '')];
                    currentObj = {};
                    previousWasEmptyLine = false;
                } else {
                    line = line.replace('/**', '');
                    line = line.replace('*/', '');
                    line = line.replace('* ', '');
                    line = line.replace('*', '');
                    if (line.trim().length) {
                        currentContent.push(line);
                    }
                }
            });

            add();

            if (this.settings.renderMarkdown) {
                __marked.setOptions(this.settings.markedOptions ?? {});
            }

            for (let i = 0; i < Object.keys(docblockObj).length; i++) {
                const prop = Object.keys(docblockObj)[i];
                const value = docblockObj[prop];

                // do not process two times the same property
                if (finalDocblockObj[prop]) continue;

                // private props
                if (!prop || prop.length <= 1 || prop.slice(0, 1) === '_')
                    continue;

                // process with tags
                if (this.settings.tags[prop] && prop !== 'src') {
                    let res;
                    try {
                        res = await this.settings.tags[prop](
                            value,
                            this.settings,
                        );
                    } catch (e) {
                        console.error(
                            `<red>[SDocblockBlock]</red> An error occured during the parsing of the docblock bellow on the tag <yellow>${prop}</yellow>:\n\n${this._source}\n\n${e.stack}`,
                        );
                    }
                    if (res?.tags) {
                        for (let [key, value] of Object.entries(res.tags)) {
                            finalDocblockObj[key] = value;
                        }
                    } else if (res !== undefined) {
                        finalDocblockObj[prop] = res;
                    }
                } else {
                    finalDocblockObj[prop] = __simpleValueTag(
                        value,
                        this.settings,
                    );
                }

                if (this.settings.renderMarkdown) {
                    function renderMarkdown(data: any): any {
                        if (
                            data instanceof String &&
                            (<any>data).render === true
                        ) {
                            return __marked.parseInline(data.toString());
                        } else if (Array.isArray(data)) {
                            return data.map((item) => {
                                return renderMarkdown(item);
                            });
                        } else if (__isPlainObject(data)) {
                            Object.keys(data).forEach((key) => {
                                data[key] = renderMarkdown(data[key]);
                            });
                            return data;
                        } else {
                            return data;
                        }
                    }
                    finalDocblockObj[prop] = renderMarkdown(
                        finalDocblockObj[prop],
                    );
                }
            }

            // save the raw string
            finalDocblockObj.raw = this._source.toString();

            // docblock id
            if (!finalDocblockObj.id) {
                if (finalDocblockObj.namespace && finalDocblockObj.name) {
                    finalDocblockObj.id = __namespaceCompliant(
                        `${finalDocblockObj.namespace}.${finalDocblockObj.name}`,
                    );
                } else {
                    // ensure it start with a character for html id attribute to work correctly
                    finalDocblockObj.id = `s${__sha256.encrypt(
                        finalDocblockObj.raw,
                    )}`;
                }
            }

            // save into internal property
            this._blockObj = finalDocblockObj;

            // return the parsed docblock object
            return resolve(finalDocblockObj);
        });
    }
}

SDocblockBlock.registerTag('author', __authorTag);
SDocblockBlock.registerTag('contributor', __contributorTag);
SDocblockBlock.registerTag('abstract', __simpleValueTag);
SDocblockBlock.registerTag('final', __simpleValueTag);
SDocblockBlock.registerTag('async', __simpleValueTag);
SDocblockBlock.registerTag('generator', __simpleValueTag);
SDocblockBlock.registerTag('global', __simpleValueTag);
SDocblockBlock.registerTag('constructor', __simpleValueTag);
SDocblockBlock.registerTag('hideconstructor', __simpleValueTag);
SDocblockBlock.registerTag('ignore', __simpleValueTag);
SDocblockBlock.registerTag('inheritdoc', __simpleValueTag);
SDocblockBlock.registerTag('inner', __simpleValueTag);
SDocblockBlock.registerTag('instance', __simpleValueTag);
SDocblockBlock.registerTag('mixin', __simpleValueTag);
SDocblockBlock.registerTag('override', __simpleValueTag);
SDocblockBlock.registerTag('access', __simpleValueTag);
SDocblockBlock.registerTag('category', __simpleValueTag);
SDocblockBlock.registerTag('copyright', __simpleValueTag);
SDocblockBlock.registerTag('deprecated', __simpleValueTag);
SDocblockBlock.registerTag('alias', __simpleValueTag);
SDocblockBlock.registerTag('augments', __simpleValueTag);
SDocblockBlock.registerTag('callback', __simpleValueTag);
SDocblockBlock.registerTag('class', __simpleValueTag);
SDocblockBlock.registerTag('classdesc', __simpleValueTag);
SDocblockBlock.registerTag('constant', __simpleValueTag);
SDocblockBlock.registerTag('constructs', __simpleValueTag);
SDocblockBlock.registerTag('copyright', __simpleValueTag);
SDocblockBlock.registerTag('default', __simpleValueTag);
SDocblockBlock.registerTag('deprecated', __simpleValueTag);
SDocblockBlock.registerTag('exports', __simpleValueTag);
SDocblockBlock.registerTag('external', __simpleValueTag);
SDocblockBlock.registerTag('host', __simpleValueTag);
SDocblockBlock.registerTag('file', __simpleValueTag);
SDocblockBlock.registerTag('function', __simpleValueTag);
SDocblockBlock.registerTag('func', __simpleValueTag);
SDocblockBlock.registerTag('method', __simpleValueTag);
SDocblockBlock.registerTag('implements', __simpleValueTag);
SDocblockBlock.registerTag('interface', __simpleValueTag);
SDocblockBlock.registerTag('kind', __simpleValueTag);
SDocblockBlock.registerTag('lends', __simpleValueTag);
SDocblockBlock.registerTag('license', __simpleValueTag);
SDocblockBlock.registerTag('memberof', __simpleValueTag);
SDocblockBlock.registerTag('memberof', __simpleValueTag);
SDocblockBlock.registerTag('mixes', __simpleValueTag);
SDocblockBlock.registerTag('module', __simpleValueTag);
SDocblockBlock.registerTag('name', __simpleValueTag);
SDocblockBlock.registerTag('as', __simpleValueTag);
SDocblockBlock.registerTag('package', __simpleValueTag);
SDocblockBlock.registerTag('private', __simpleValueTag);
SDocblockBlock.registerTag('protected', __simpleValueTag);
SDocblockBlock.registerTag('public', __simpleValueTag);
SDocblockBlock.registerTag('readonly', __simpleValueTag);
SDocblockBlock.registerTag('requires', __simpleValueTag);
SDocblockBlock.registerTag('since', __simpleValueTag);
SDocblockBlock.registerTag('static', __simpleValueTag);
SDocblockBlock.registerTag('summary', __simpleValueTag);
SDocblockBlock.registerTag('this', __simpleValueTag);
SDocblockBlock.registerTag('tutorial', __simpleValueTag);
SDocblockBlock.registerTag('type', __simpleValueTag);
SDocblockBlock.registerTag('variation', __simpleValueTag);
SDocblockBlock.registerTag('version', __simpleValueTag);
SDocblockBlock.registerTag('enum', __simpleValueTag);
SDocblockBlock.registerTag('src', __simpleValueTag);
SDocblockBlock.registerTag('import', __simpleValueTag);
SDocblockBlock.registerTag('install', __installTag);
SDocblockBlock.registerTag('feature', __simpleRepeatableValue);
SDocblockBlock.registerTag('description', __descriptionTag);
SDocblockBlock.registerTag('desc', __descriptionTag);
// SDocblockBlock.registerTag('yields', __yieldsTag);
// SDocblockBlock.registerTag('typedef', __typedefTag);
// SDocblockBlock.registerTag('throws', __throwsTag);
SDocblockBlock.registerTag('see', __seeTag);
SDocblockBlock.registerTag('interface', __interfaceTag);
SDocblockBlock.registerTag('return', __returnTag);
SDocblockBlock.registerTag('type', __typeTag);
SDocblockBlock.registerTag('param', __paramTag);
SDocblockBlock.registerTag('property', __paramTag);
SDocblockBlock.registerTag('prop', __paramTag);
SDocblockBlock.registerTag('setting', __paramTag);
SDocblockBlock.registerTag('platform', __platformTag);
SDocblockBlock.registerTag('namespace', __namespaceTag);
SDocblockBlock.registerTag('menu', __menuTag);
SDocblockBlock.registerTag('cssClass', __cssClass);
SDocblockBlock.registerTag('support', __supportTag);
// SDocblockBlock.registerTag('listens', __listensTag);
// SDocblockBlock.registerTag('member', __memberTag);
// SDocblockBlock.registerTag('var', __memberTag);
// SDocblockBlock.registerTag('event', __eventTag);
// SDocblockBlock.registerTag('borrows', __borrowsTag);
SDocblockBlock.registerTag('snippet', __snippetTag);
SDocblockBlock.registerTag('example', __exampleTag);
SDocblockBlock.registerTag('todo', __todoTag);
SDocblockBlock.registerTag('event', __eventTag);

export default SDocblockBlock;
