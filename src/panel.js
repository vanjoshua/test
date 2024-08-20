console.log('before import');

import { editor } from '@wix/editor';
import { createClient } from '@wix/sdk';
import { widget } from '@wix/editor';

console.log('after import');

const client = createClient({
    host: editor.host(),
    modules: {
        widget,
    },
});

export const updateColor = (color) => {
    console.log("update color")
    if(color !== '') {
        client.widget.setProp('color', color);
    }
};

updateColor('');