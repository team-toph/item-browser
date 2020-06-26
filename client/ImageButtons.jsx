import React from 'react';
import styled from 'styled-components';

const ZoomIn = styled.button`
  background-position: center;
  background-image: url(/assets/whitePlus.png);
  border: solid white;
  border-radius: 6px;
  padding: 14px;
`;

const ZoomOut = styled.button`
  background-position: center;
  background-image: url(/assets/whiteMinus.png);
  border: solid white;
  border-radius: 6px;
  padding: 14px;
`;

const Reset = styled.button`
  background-position: center;
  background-image: url(/assets/whiteReset.png);
  border: solid white;
  border-radius: 6px;
  padding: 14px;
`;

const FullScreen = styled.button`
  background-position: center;
  background-image: url(/assets/whiteFullScreen.png);
  border: solid white;
  border-radius: 6px;
  padding: 14px;
`;

function ImageButtons(props) {
  return (
    <div>
      <div>
        <ZoomIn onClick={props.handleZoomInClick}></ZoomIn>
        <ZoomOut onClick={props.handleZoomOutClick}></ZoomOut>
      </div>
      <div>
        <Reset onClick={props.handleZoomOutClick}></Reset>
        <FullScreen onClick={props.handleFullScreenClick}></FullScreen>
      </div>
    </div>
  );
}

export default ImageButtons;