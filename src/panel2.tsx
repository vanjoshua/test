import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { createClient } from "@wix/sdk";
import { editor, widget, inputs } from "@wix/editor";
import {
  SidePanel,
  WixDesignSystemProvider,
  ColorInput,
  Button,
  FormField,
  Text,
  SectionHeader,
  Box,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";

const client = createClient({
  host: editor.host(),
  modules: {
    widget,
    inputs,
  },
});

function App() {
  const [color, setColor] = useState<string | undefined>();
  const [colorValue, setColorValue] = useState<string | undefined>();

  useEffect(() => {
    client.widget.getProp("color").then((c) => {
      console.log("Initial color: ", c);
      c = c || "#FFFFFF";
      setColor(c);
    });
  },[]);

  return color ? (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <SidePanel width="300">
        <SidePanel.Content noPadding stretchVertically>
          <SectionHeader title="Native color picker" skin="neutral" />
          <SidePanel.Field>
            <FormField>
              <ColorInput
                value={color}
                onChange={(c) => {
                  setColor(c.toString());
                  client.widget.setProp("color", c.toString());
                }}
              />
            </FormField>
          </SidePanel.Field>
          <SectionHeader title="Editor SDK" skin="neutral" />
          <SidePanel.Field>
            <FormField>
              <Box marginBottom="SP2">
                <Button
                  onClick={() => {
                    client.inputs.selectColor({ theme: "--wst-color-fill-base-2" }, (c) => {
                      setColorValue(JSON.stringify(c, null, 2));
                      if (c.theme !== null) {
                        const themeVar = `rgb(var(--${c.theme}))`;
                        console.log(themeVar);
                        client.widget.setProp("color", themeVar);
                      } else client.widget.setProp("color", c.color);
                    });
                  }}
                >
                  Select Color
                </Button>
              </Box>
            </FormField>
            <FormField>
              <Text size="small">Returned value:</Text>
              <Box border="1px dotted" padding="SP1" marginTop="SP2">
                <Text size="tiny">{colorValue}</Text>
              </Box>
            </FormField>
          </SidePanel.Field>
        </SidePanel.Content>
      </SidePanel>
    </WixDesignSystemProvider>
  ) : null;
}

const entryPoint = document.getElementById("root")!;
ReactDOM.createRoot(entryPoint).render(<App />);
