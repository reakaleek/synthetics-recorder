import React, { useState } from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
  EuiCodeBlock,
  EuiButton,
  EuiPanel,
  EuiAccordion,
} from "@elastic/eui";
import { Steps } from "./Steps";

const { ipcRenderer: ipc } = window.require("electron-better-ipc");

export function Snippet(props) {
  const [isRecording, setIsRecording] = useState(false);

  const onRecord = async () => {
    if (isRecording) {
      setIsRecording(false);
      // Stop browser process
      ipc.send("stop");
      return;
    }
    setIsRecording(true);
    await ipc.callMain("record-journey", { url: props.url });
    setIsRecording(false);
  };

  return (
    <EuiPanel hasBorder={true} color="transparent">
      <EuiFlexGroup alignItems="baseline">
        <EuiFlexItem>
          <EuiText size="s">
            <p>Get started with your script</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton iconType="play" color="secondary" onClick={onRecord}>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />

      <EuiFlexItem>
        <Steps onUpdateActions={props.onUpdateActions} />
      </EuiFlexItem>
      <EuiSpacer />
      <EuiFlexItem>
        <EuiAccordion
          id="code-block"
          onClick={() => props.onGenerateCode()}
          buttonContent="Show code"
        >
          <EuiCodeBlock
            language="js"
            fontSize="m"
            paddingSize="m"
            overflowHeight={200}
            style={{ minHeight: 120 }}
          >
            {props.code}
          </EuiCodeBlock>
        </EuiAccordion>
      </EuiFlexItem>
    </EuiPanel>
  );
}
