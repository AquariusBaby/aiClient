import { getDevice } from "./util";

/**
 * 设置 REM
 */
export const initialREM = () => {
  const docEl = document.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const calc = function () {
    const type = getDevice();
    if (type === 2) {
      docEl.style.fontSize = '17px';
    } else if (type === 3) {
      docEl.style.fontSize = '10px';
    } else {
      const clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth < 320 || clientWidth >= 768) {
        docEl.style.fontSize = '10px';
      } else {
        docEl.style.fontSize = `${10 * (clientWidth / 375)}px`;
      }
    }
  };

  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, calc, false);
  calc();
};


// >= 640px 为平板PC模式
// < 640px 手机模式