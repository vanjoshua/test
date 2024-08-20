import { editor } from '@wix/editor';
import { createClient } from '@wix/sdk';
import { widget } from '@wix/editor';

const client = createClient({
    host: editor.host(),
    modules: {
        widget,
    },
});

function updateColor(color) {
    console.log("update color")
    client.widget.setProp('color', color);
};