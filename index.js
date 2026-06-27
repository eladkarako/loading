"use strict";

let body = document.querySelector("body")
   ,screen_wakelock = null
   ;

const double_click_handler = (event)=>{
  event.preventDefault();
  event.stopPropagation();
  if (document.fullscreenElement){
    document.exitFullscreen()
    .then(()=>{})
    .catch(()=>{});

    if(screen_wakelock){
      screen_wakelock.release()
      .then(()=>{ screen_wakelock=null; })
      .catch(err=>{}); 
    }
  }else{
    body.requestFullscreen({ navigationUI: "hide" })
    .then(()=>{})
    .catch(()=>{});

    if(navigator.wakeLock && navigator.wakeLock.request){
      navigator.wakeLock.request("screen")
      .then(wakelock=>{
        screen_wakelock = wakelock;
        wakeLock.addEventListener("release",() =>{screen_wakelock=null;});
        setTimeout(()=>{
          wakelock.release();
        }, 3 * 60 * 1000); /*max 3 minute keeping screen awake.*/
      })
      .catch(err=>{});
    }
  }
  return false;
};

document.removeEventListener("dblclick", double_click_handler, {passive:false, capture:true});
document.addEventListener("dblclick",    double_click_handler, {passive:false, capture:true});


void 0;