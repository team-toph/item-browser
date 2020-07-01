import React from 'react';
import styled from 'styled-components';

const ZoomIn = styled.button`
  background-position: center;
  background-image: ${(props) =>
    props.zoomLevel === 2 && "url(http://localhost:3001/assets/grayPlus.png)" ||
    "url(http://localhost:3001/assets/whitePlus.png)"
  };
  border: solid white;
  border-radius: 6px;
  padding: 14px;
`;

const ZoomOut = styled.button`
  background-position: center;
  background-image: ${(props) =>
    props.zoomLevel === 0 && "url(http://localhost:3001/assets/grayMinus.png)" ||
    "url(http://localhost:3001/assets/whiteMinus.png)"
  };
  border: solid white;
  border-radius: 6px;
  padding: 14px;
`;

const Reset = styled.button`
  background-position: center;
  background-image: ${(props) =>
    props.zoomLevel === 0 && "url(http://localhost:3001/assets/grayReset.png)" ||
    "url(http://localhost:3001/assets/whiteReset.png)"
  };
  border: solid white;
  border-radius: 6px;
  padding: 14px;
`;

const FullScreen = styled.button`
  background-position: center;
  background-image: url(http://localhost:3001/assets/whiteFullScreen.png);
  border: solid white;
  border-radius: 6px;
  padding: 14px;
`;

function ImageButtons(props) {
  return (
    <div>
      <div>
        <ZoomIn onClick={props.handleZoomInClick} zoomLevel={props.zoomLevel}></ZoomIn>
        <ZoomOut onClick={props.handleZoomOutClick} zoomLevel={props.zoomLevel}></ZoomOut>
      </div>
      <div>
        <Reset onClick={props.handleResetButtonClick} zoomLevel={props.zoomLevel}></Reset>
        <FullScreen onClick={props.handleFullScreenClick}></FullScreen>
      </div>
    </div>
  );
}

export default ImageButtons;