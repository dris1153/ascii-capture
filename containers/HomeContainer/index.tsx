import React, { useEffect, useRef } from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import { density } from '~/core/constant';
import useIsMount from '~/hooks/useIsMount';

function HomeContainer() {
  const video = useRef<any>(null);
  const asciiDiv = useRef<any>(null);
  const isMount = useIsMount();

  function sketch(p5) {
    p5.setup = () => {
      asciiDiv.current = p5.createDiv();
      p5.noCanvas();
      video.current = p5.createCapture(p5.VIDEO, { flipped: true });
      video.current.hide();
      video.current.size(64, 48);
    };

    p5.draw = () => {
      video.current.loadPixels();
      let asciiImage = '';
      for (let j = 0; j < video.current.height; j++) {
        for (let i = 0; i < video.current.width; i++) {
          const pixelIndex = (i + j * video.current.width) * 4;
          const r = video.current.pixels[pixelIndex + 0];
          const g = video.current.pixels[pixelIndex + 1];
          const b = video.current.pixels[pixelIndex + 2];
          const avg = (r + g + b) / 3;
          const len = density.length;
          const charIndex = p5.floor(p5.map(avg, 0, 255, len, 0));
          const c = density.charAt(charIndex);
          if (c == ' ') asciiImage += '&nbsp;';
          else asciiImage += c;
        }
        asciiImage += '<br/>';
      }
      asciiDiv.current.html(asciiImage);
    };
  }

  if (isMount) return <ReactP5Wrapper sketch={sketch} />;
  return null;
}

export default HomeContainer;
