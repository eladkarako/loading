"use strict";

const double_click_handler = (event)=>{
  event.preventDefault();
  event.stopPropagation();
  if (document.fullscreenElement){
    document.exitFullscreen().then(()=>{}).catch(()=>{});
  }else{
    document.querySelector("body").requestFullscreen({ navigationUI: "hide" }).then(()=>{}).catch(()=>{});
  }
  return false;
};

document.removeEventListener("dblclick", double_click_handler, {passive:false, capture:true});
document.addEventListener("dblclick",    double_click_handler, {passive:false, capture:true});


void 0;