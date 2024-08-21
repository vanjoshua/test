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

function App() {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
        <Button>
             Hello World
        </Button>
    </WixDesignSystemProvider>
  );
}