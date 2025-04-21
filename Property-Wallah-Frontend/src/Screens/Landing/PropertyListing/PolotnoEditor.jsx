import React from "react";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import { createStore } from "polotno/model/store";
import { Navbar } from "../../../components/common/Navbar";

const PolotnoEditor = () => {
  const store = createStore({
    key: "_r6H7NUxlMracHuVLyqt",
    showCredit: true, 
  });
  return (
    <>
      <Navbar isHome={true} />
      <PolotnoContainer
        style={{ width: "100vw", height: "100vh"}}
      >
        <SidePanelWrap>
          <SidePanel store={store} />
        </SidePanelWrap>
        <WorkspaceWrap>
          <Toolbar store={store} downloadButtonEnabled />
          <Workspace store={store} />
          <ZoomButtons store={store} />
        </WorkspaceWrap>
      </PolotnoContainer>
    </>
  );
};

export default PolotnoEditor;