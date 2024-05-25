var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __sha256 } from '@lotsof/sugar/crypto';
import { __isPlainObject } from '@lotsof/sugar/is';
import { __deepMerge } from '@lotsof/sugar/object';
import { __namespaceCompliant } from '@lotsof/sugar/string';
import { marked as __marked } from 'marked';
import __authorTag from './tags/author.js';
import __contributorTag from './tags/contributor.js';
import __cssClass from './tags/cssClass.js';
import __descriptionTag from './tags/description.js';
import __eventTag from './tags/event.js';
import __exampleTag from './tags/example.js';
import __installTag from './tags/install.js';
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
 * @name                DocblockBlock
 * @namespace           shared
 * @type                Class
 * @platform            node
 * @status              beta
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
 * @snippet         __DocblockBlock($1)
 * new __DocblockBlock($1)
 *
 * @example         js
 * import { __DocblockBlock } from '@lotsof/s-docblock';
 * const docblock = new __DocblockBlock(myDocblockString);
 * const docblock.toObject();
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
// @ts-ignore
class DocblockBlock {
    /**
     * @name          registerTag
     * @type          Function
     * @static
     *
     * This static method allows you to register a new tag that will
     * be recognized by the DocblockBlock class.
     *
     * @param     {String}      tagName       The tag you want to register without the @
     * @param     {Function}    parser    A function that will be called with the string tag content. You can parse this string and return an object that represent the tag data
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    static registerTag(tagName, parser) {
        // check the params
        if (typeof parser !== 'function')
            throw new Error(`The "<yellow>parser</yellow>" parameter of the static "<cyan>DocblockBlock</cyan>" class method needs to be a "<green>Function</green>"`);
        // register the tag
        DocblockBlock.tagsMap[tagName] = parser;
    }
    /**
     * @name          constructor
     * @type          Function
     * @contructor
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    constructor(source, settings) {
        this.settings = __deepMerge({
            filePath: null,
            packageJson: null,
            renderMarkdown: false,
            renderMarkdownProps: [],
            markedOptions: {},
            tags: DocblockBlock.tagsMap,
        }, settings !== null && settings !== void 0 ? settings : {});
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    toObject() {
        if (!this._blockObj) {
            throw new Error(`<red>${this.constructor.name}</red> Before accessing the blocks you'll need to parse the docblocks using "<yellow>await this.parse()</yellow>"`);
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    parse() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // some variables
            let currentTag;
            let currentContent = [];
            let currentObj = {};
            let docblockObj = {};
            let finalDocblockObj = {};
            let previousWasEmptyLine = false;
            function add() {
                if (currentContent.length)
                    currentObj.content = currentContent;
                if (docblockObj.hasOwnProperty(currentTag) &&
                    !Array.isArray(docblockObj[currentTag])) {
                    const currentValue = docblockObj[currentTag];
                    docblockObj[currentTag] = [currentValue];
                }
                if (!currentObj.value)
                    currentObj.value = true;
                if (Array.isArray(docblockObj[currentTag])) {
                    docblockObj[currentTag].push(currentObj);
                }
                else {
                    docblockObj[currentTag] = currentObj;
                }
                currentObj = {};
                currentContent = [];
                // @ts-ignore
                currentTag = undefined;
            }
            // split the block by tags
            let lines = this._source.trim().split('\n');
            if (!lines || !lines.length)
                return null;
            lines = lines.map((l) => l.trim()).filter((l) => l !== '');
            lines.forEach((line) => {
                // get the tag name
                const tagNameReg = /\*[\s]?@([a-zA-Z0-9]+)(\s)+/;
                const tagNameMatch = line.trim().match(tagNameReg);
                if (line.replace('*', '').trim() === '') {
                    if (currentContent.length > 0) {
                        currentContent.push('');
                    }
                    else {
                        if (currentTag && currentObj.value) {
                            add();
                        }
                        previousWasEmptyLine = true;
                    }
                }
                else if (tagNameMatch) {
                    if (currentTag) {
                        add();
                    }
                    currentTag = tagNameMatch[1];
                    line = line.replace(tagNameMatch[0], '').trim();
                    if (line.length > 0) {
                        currentObj.value = line;
                    }
                    else {
                        currentObj.value = true;
                    }
                    previousWasEmptyLine = false;
                }
                else if (previousWasEmptyLine && !line.trim().match(/^\*\/$/)) {
                    currentTag = 'description';
                    currentContent = [line.replace('*', '')];
                    currentObj = {};
                    previousWasEmptyLine = false;
                }
                else {
                    line = line.replace('/**', '');
                    line = line.replace('*/', '');
                    line = line.replace('* ', '');
                    line = line.replace('*', '');
                    line = line.replace(/\\@/g, '@');
                    if (line.trim().length) {
                        currentContent.push(line);
                    }
                }
            });
            add();
            if (this.settings.renderMarkdown) {
                __marked.setOptions((_a = this.settings.markedOptions) !== null && _a !== void 0 ? _a : {});
            }
            for (let i = 0; i < Object.keys(docblockObj).length; i++) {
                const prop = Object.keys(docblockObj)[i];
                const value = docblockObj[prop];
                // do not process two times the same property
                if (finalDocblockObj[prop])
                    continue;
                // private props
                if (!prop || prop.length <= 1 || prop.slice(0, 1) === '_')
                    continue;
                // process with tags
                if (this.settings.tags[prop] && prop !== 'src') {
                    let res;
                    try {
                        res = yield this.settings.tags[prop](value, this.settings);
                    }
                    catch (e) {
                        console.error(
                        // @ts-ignore
                        `<red>[DocblockBlock]</red> An error occured during the parsing of the docblock bellow on the tag <yellow>${prop}</yellow>:\n\n${this._source}\n\n${e.stack}`);
                    }
                    if (res === null || res === void 0 ? void 0 : res.tags) {
                        for (let [key, value] of Object.entries(res.tags)) {
                            finalDocblockObj[key] = value;
                        }
                    }
                    else if (res !== undefined) {
                        finalDocblockObj[prop] = res;
                    }
                }
                else {
                    finalDocblockObj[prop] = __simpleValueTag(value, this.settings);
                }
                if (this.settings.renderMarkdown) {
                    const renderMarkdown = (data, path) => {
                        if (!this.settings.renderMarkdownProps.length ||
                            !this.settings.renderMarkdownProps.includes(path.join('.'))) {
                            return data;
                        }
                        if (typeof data === 'string') {
                            if (data.split('\n').length > 1) {
                                return __marked.parse(data);
                            }
                            else {
                                return __marked.parseInline(data);
                            }
                        }
                        else if (Array.isArray(data)) {
                            return data.map((item, i) => {
                                return renderMarkdown(item, [...path]);
                            });
                        }
                        else if (__isPlainObject(data)) {
                            Object.keys(data).forEach((key) => {
                                data[key] = renderMarkdown(data[key], [...path, key]);
                            });
                            return data;
                        }
                        else {
                            return data;
                        }
                    };
                    finalDocblockObj[prop] = renderMarkdown(finalDocblockObj[prop], [
                        prop,
                    ]);
                }
            }
            // save the raw string
            finalDocblockObj.raw = this._source.toString();
            // docblock id
            if (!finalDocblockObj.id) {
                if (finalDocblockObj.namespace && finalDocblockObj.name) {
                    finalDocblockObj.id = __namespaceCompliant(`${finalDocblockObj.namespace}.${finalDocblockObj.name}`);
                }
                else {
                    // ensure it start with a character for html id attribute to work correctly
                    finalDocblockObj.id = `s${__sha256.encrypt(finalDocblockObj.raw)}`;
                }
            }
            // save into internal property
            this._blockObj = finalDocblockObj;
            // return the parsed docblock object
            return resolve(finalDocblockObj);
        }));
    }
}
/**
 * @name            tagsMap
 * @type            Object
 * @static
 *
 * Store the default tags mapping to their parsing functions
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
DocblockBlock.tagsMap = {};
DocblockBlock.registerTag('author', __authorTag);
DocblockBlock.registerTag('contributor', __contributorTag);
DocblockBlock.registerTag('abstract', __simpleValueTag);
DocblockBlock.registerTag('final', __simpleValueTag);
DocblockBlock.registerTag('async', __simpleValueTag);
DocblockBlock.registerTag('generator', __simpleValueTag);
DocblockBlock.registerTag('global', __simpleValueTag);
DocblockBlock.registerTag('constructor', __simpleValueTag);
DocblockBlock.registerTag('hideconstructor', __simpleValueTag);
DocblockBlock.registerTag('ignore', __simpleValueTag);
DocblockBlock.registerTag('inheritdoc', __simpleValueTag);
DocblockBlock.registerTag('inner', __simpleValueTag);
DocblockBlock.registerTag('instance', __simpleValueTag);
DocblockBlock.registerTag('mixin', __simpleValueTag);
DocblockBlock.registerTag('override', __simpleValueTag);
DocblockBlock.registerTag('access', __simpleValueTag);
DocblockBlock.registerTag('category', __simpleValueTag);
DocblockBlock.registerTag('copyright', __simpleValueTag);
DocblockBlock.registerTag('deprecated', __simpleValueTag);
DocblockBlock.registerTag('alias', __simpleValueTag);
DocblockBlock.registerTag('augments', __simpleValueTag);
DocblockBlock.registerTag('callback', __simpleValueTag);
DocblockBlock.registerTag('class', __simpleValueTag);
DocblockBlock.registerTag('classdesc', __simpleValueTag);
DocblockBlock.registerTag('constant', __simpleValueTag);
DocblockBlock.registerTag('constructs', __simpleValueTag);
DocblockBlock.registerTag('copyright', __simpleValueTag);
DocblockBlock.registerTag('default', __simpleValueTag);
DocblockBlock.registerTag('deprecated', __simpleValueTag);
DocblockBlock.registerTag('exports', __simpleValueTag);
DocblockBlock.registerTag('external', __simpleValueTag);
DocblockBlock.registerTag('host', __simpleValueTag);
DocblockBlock.registerTag('file', __simpleValueTag);
DocblockBlock.registerTag('function', __simpleValueTag);
DocblockBlock.registerTag('func', __simpleValueTag);
DocblockBlock.registerTag('method', __simpleValueTag);
DocblockBlock.registerTag('implements', __simpleValueTag);
DocblockBlock.registerTag('interface', __simpleValueTag);
DocblockBlock.registerTag('kind', __simpleValueTag);
DocblockBlock.registerTag('lends', __simpleValueTag);
DocblockBlock.registerTag('license', __simpleValueTag);
DocblockBlock.registerTag('memberof', __simpleValueTag);
DocblockBlock.registerTag('memberof', __simpleValueTag);
DocblockBlock.registerTag('mixes', __simpleValueTag);
DocblockBlock.registerTag('module', __simpleValueTag);
DocblockBlock.registerTag('name', __simpleValueTag);
DocblockBlock.registerTag('as', __simpleValueTag);
DocblockBlock.registerTag('package', __simpleValueTag);
DocblockBlock.registerTag('private', __simpleValueTag);
DocblockBlock.registerTag('protected', __simpleValueTag);
DocblockBlock.registerTag('public', __simpleValueTag);
DocblockBlock.registerTag('readonly', __simpleValueTag);
DocblockBlock.registerTag('requires', __simpleValueTag);
DocblockBlock.registerTag('since', __simpleValueTag);
DocblockBlock.registerTag('static', __simpleValueTag);
DocblockBlock.registerTag('summary', __simpleValueTag);
DocblockBlock.registerTag('this', __simpleValueTag);
DocblockBlock.registerTag('tutorial', __simpleValueTag);
DocblockBlock.registerTag('type', __simpleValueTag);
DocblockBlock.registerTag('variation', __simpleValueTag);
DocblockBlock.registerTag('version', __simpleValueTag);
DocblockBlock.registerTag('enum', __simpleValueTag);
DocblockBlock.registerTag('src', __simpleValueTag);
DocblockBlock.registerTag('import', __simpleValueTag);
DocblockBlock.registerTag('install', __installTag);
DocblockBlock.registerTag('feature', __simpleRepeatableValue);
DocblockBlock.registerTag('description', __descriptionTag);
DocblockBlock.registerTag('desc', __descriptionTag);
DocblockBlock.registerTag('see', __seeTag);
DocblockBlock.registerTag('return', __returnTag);
DocblockBlock.registerTag('type', __typeTag);
DocblockBlock.registerTag('param', __paramTag);
DocblockBlock.registerTag('property', __paramTag);
DocblockBlock.registerTag('prop', __paramTag);
DocblockBlock.registerTag('setting', __paramTag);
DocblockBlock.registerTag('platform', __platformTag);
DocblockBlock.registerTag('namespace', __namespaceTag);
DocblockBlock.registerTag('menu', __menuTag);
DocblockBlock.registerTag('cssClass', __cssClass);
DocblockBlock.registerTag('support', __supportTag);
DocblockBlock.registerTag('snippet', __snippetTag);
DocblockBlock.registerTag('example', __exampleTag);
DocblockBlock.registerTag('todo', __todoTag);
DocblockBlock.registerTag('event', __eventTag);
export default DocblockBlock;
//# sourceMappingURL=DocblockBlock.js.map