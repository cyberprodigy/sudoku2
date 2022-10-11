import React, { useEffect } from "react";
import styled from "styled-components";
import { TimelineLite, gsap } from "gsap";

const SQUARE_SIZE = 10;
const PADDING = 3;
const Container = styled.div`
  position: relative;
  width: ${(SQUARE_SIZE + PADDING) * 3}px;
  height: ${(SQUARE_SIZE + PADDING) * 3}px;
  margin: 0 auto;
`;

const Rectangle = styled.div`
  position: absolute;
  width: ${SQUARE_SIZE}px;
  height: ${SQUARE_SIZE}px;
  border-radius: 3px;
  border: 1px solid black;
`;

function Loader(props: React.HTMLAttributes<HTMLDivElement>) {
  useEffect(() => {
    const timelines = new Array<TimelineLite>();
    for (let i = 0; i < 9; i++) {
      timelines[i] = gsap.timeline({
        repeat: 1000,
        repeatDelay: 1,
        delay: 1 - i * 0.15,
      });
    }

    for (let i = 0; i < 9; i++) {
      const rectId = `#rect-${i}`;
      timelines[i].to(rectId, {
        x: `${(i % 3) * (SQUARE_SIZE + PADDING)}px`,
        y: `${Math.floor(i / 3) * (SQUARE_SIZE + PADDING) - SQUARE_SIZE * 3}px`,
        opacity: 0,
        duration: 0,
      });
      timelines[i].to(rectId, {
        y: `${Math.floor(i / 3) * (SQUARE_SIZE + PADDING)}px`,
        duration: 0.5,
        opacity: 1,
        ease: "back.inOut(1.7)",
      });
      timelines[i].to(rectId, {
        y: `${Math.floor(i / 3) * (SQUARE_SIZE + PADDING) + SQUARE_SIZE * 3}px`,
        duration: 0.5,
        delay: 0.9,
        opacity: 0,
        ease: "back.inOut(1.7)",
        animationDelay: -0.1,
      });
    }
  }, []);

  return (
    <Container>
      <Rectangle id="rect-0"></Rectangle>
      <Rectangle id="rect-1"></Rectangle>
      <Rectangle id="rect-2"></Rectangle>
      <Rectangle id="rect-3"></Rectangle>
      <Rectangle id="rect-4"></Rectangle>
      <Rectangle id="rect-5"></Rectangle>
      <Rectangle id="rect-6"></Rectangle>
      <Rectangle id="rect-7"></Rectangle>
      <Rectangle id="rect-8"></Rectangle>
    </Container>
  );
}

export default Loader;
