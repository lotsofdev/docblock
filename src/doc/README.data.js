import { SDocblockBlock } from '@coffeekraken/s-docblock';

export default async function () {
    return {
        tags: Object.keys(SDocblockBlock.tagsMap),
    };
}
