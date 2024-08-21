import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { WixProvider, useWixModules } from "@wix/sdk-react";
import { createClient } from "@wix/sdk";
import { editor, widget, inputs } from "@wix/editor";
import {
  SidePanel,
  WixDesignSystemProvider,
  ColorInput,
  Button,
  FormField,
  Text,
  Tabs,
  SectionHeader,
  Box,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";

const client = createClient({
  host: editor.host(),
  modules: {
    widget,
  },
});

function Panel() {
  const { selectColor, selectFont } = useWixModules(inputs);
  const { setProp, getProp } = useWixModules(widget);
  const [color, setColor] = useState("#000000");
  const [fontValue, setFontValue] = useState("\n\n\n");
  const [colorValue, setColorValue] = useState("\n\n\n");
  const [activeId, setActiveId] = React.useState(0);

  type TabContent = {
    [key in number]: React.JSX.Element;
  };

  const tabContent: TabContent = {
    0: (
      <>
        <SectionHeader title="Native color picker" skin="neutral" />
        <SidePanel.Field>
          <FormField>
            <ColorInput value={color} />
          </FormField>
        </SidePanel.Field>
        <SectionHeader title="Editor SDK" skin="neutral" />
        <SidePanel.Field>
          <FormField>
            <Box marginBottom="SP2">
              <Button
                onClick={(event) => {
                  selectColor({ theme: "color_37" }, (c) => {
                    setColorValue(JSON.stringify(c, null, 2));
                    if (c.theme !== null) {
                      const themeVar = `rgb(var(--${c.theme}))`;
                      console.log(themeVar);
                      setProp("color", themeVar);
                    } else setProp("color", c.color);
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
      </>
    ),
    1: (
      <SidePanel.Field>
        <FormField>
          <Box marginBottom="SP2">
            <Button
              onClick={(event) => {
                selectFont(
                  {
                    family: "arial",
                    style: {},
                  },
                  { fontMinSize: 10, fontMaxSize: 30 },
                  (f) => {
                    setFontValue(JSON.stringify(f, null, 2));
                  }
                );
              }}
            >
              Select Font
            </Button>
          </Box>
        </FormField>
        <FormField>
          <Text size="small">Returned value:</Text>
          <Box border="1px dotted" padding="SP1" marginTop="SP2">
            <Text size="tiny">{fontValue}</Text>
          </Box>
        </FormField>
      </SidePanel.Field>
    ),
  } as const;

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <SidePanel width="300">
        <SidePanel.Content noPadding stretchVertically>
          <Tabs
            size="small"
            activeId={activeId}
            onClick={(value) => setActiveId(value.id as number)}
            items={[
              { id: 0, title: "Color" },
              { id: 1, title: "Font" },
            ]}
          />
          {tabContent[activeId]}
        </SidePanel.Content>
      </SidePanel>
    </WixDesignSystemProvider>
  );
}

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Panel />);
