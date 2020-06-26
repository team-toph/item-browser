import React from 'react';
import styled from 'styled-components';

const ZoomIn = styled.button`
  background-position: center;
  background-image: ${(props) =>
    props.zoomLevel === 2 && "url(/assets/grayPlus.png)" ||
    "url(/assets/whitePlus.png)"
  };
  border: solid white;
  border-radius: 6px;
  padding: 14px;
`;

const ZoomOut = styled.button`
  background-position: center;
  background-image: ${(props) =>
    props.zoomLevel === 0 && "url(/assets/grayMinus.png)" ||
    "url(/assets/whiteMinus.png)"
  };
  border: solid white;
  border-radius: 6px;
  padding: 14px;
`;

const Reset = styled.button`
  background-position: center;
  background-image: ${(props) =>
    props.zoomLevel === 0 && "url(/assets/grayReset.png)" ||
    "url(/assets/whiteReset.png)"
  };
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