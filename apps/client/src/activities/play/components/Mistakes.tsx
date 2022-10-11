import React, { CSSProperties, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { gsap } from "gsap";

interface MistakesProps {
  style?: CSSProperties | undefined;
  mistakes: number;
}

function getMistakes(count: number) {
  const Mistake = (props: any) => (
    <CloseIcon style={{ color: "red" }} {...props} />
  );
  switch (count) {
    case 0:
      return " ";
    case 1:
      return <Mistake data-element-id="mistake1" />;
    case 2:
      return (
        <>
          <Mistake data-element-id="mistake2" />
          <Mistake data-element-id="mistake1" />
        </>
      );
    case 3:
      return (
        <>
          <Mistake data-element-id="mistake3" />
          <Mistake data-element-id="mistake2" />
          <Mistake data-element-id="mistake1" />
        </>
      );
  }
}
function Mistakes({ style, mistakes }: MistakesProps) {
  useEffect(() => {
    var tl = gsap.timeline();

    tl.to(`[data-element-id=mistake${mistakes}]`, {
      duration: 2,
      rotateZ: 90,
      ease: "elastic.out(1)",
      stagger: 0.5,
      reversed: true,
      opacity: 1,
    });
  }, [mistakes]);
  return <div style={style}>{getMistakes(mistakes)}</div>;
}

export default Mistakes;
