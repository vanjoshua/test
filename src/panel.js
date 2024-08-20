import { editor } from '@wix/editor';
import { createClient } from '@wix/sdk';
import { widget } from '@wix/editor';

const client = createClient({
    host: editor.host(),
    modules: {
        widget,
        info
    },
});

window.updateColor = function (color) {
    client.widget.setProp('color', color);
};