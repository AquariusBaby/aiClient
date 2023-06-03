import React, { FC, useRef, useEffect, ReactElement } from "react";
import ClipboardJS from "clipboard";
import {Toast} from 'antd-mobile'

interface CopyToClipboardProps {
    text: string;
    copyBtnText: string | React.ReactNode;
    className?: string;
}

const CopyToClipboard: FC<CopyToClipboardProps> = ({ text, copyBtnText, className }) => {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    Toast.show("复制成功");
  };

  const handleErr = () => {
    Toast.show("复制失败");
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if(btnRef.current) {
      // const clipboard = new ClipboardJS(btnRef.current, {
      //   text: () => text,
      // });
      const clipboard = new ClipboardJS(btnRef.current);
      clipboard.on("success", handleCopy);
      clipboard.on("error", handleErr);

      return () => {
        // clipboard.off("success", handleCopy);
        // clipboard.off("error", handleErr);
        clipboard.destroy();
      };
    }
  }, [text]);

  return (
    <div ref={btnRef} onClick={handleClick} className={className} data-clipboard-text={text}>
      {copyBtnText || text}
    </div>
  );
}

export default CopyToClipboard;
