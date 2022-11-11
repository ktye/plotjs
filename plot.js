let plotjs=(()=>{

let ge=function(x){return document.getElementById(x)}
let pd=function(e){e.preventDefault();e.stopPropagation()}
let min=function(...x){return Math.min(...x)},max=function(...x){return Math.max(...x)},floor=x=>Math.floor(x),ceil=x=>Math.ceil(x)

function plots(p,canvas,slider,listbx){
 canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight
 let width,height;[width,height]=[canvas.width,canvas.height]
 let c=canvas.getContext("2d")
 
 p.equal  =("equal" in p)?p.equal :false
 p.colors =("colors"in p)?p.colors:"#003FFF,#03ED3A,#E8000B,#8A2BE2,#FFC400,#00D7FF".split(",")
 p.cols   =("cols"  in p)?p.cols  :0
 p.font1  =("font1" in p)?p.font1 :"20px monospace"
 p.font2  =("font2" in p)?p.font2 :"14px monospace"
 p=layout(c,p)
 
 c.fillStyle="white";c.fillRect(0,0,width,height);c.font=p.font1
 if("fullscreen" in p){
  plot(p.plots[p.fullscreen],c,width,height,p)
 }else if(p.plots){
  let np=p.plots.length,nc=Math.abs(p.cols);nc=nc?nc:np
  let nr=ceil(np/nc),w=width/nc,h=height/nr
  for(let i=0,j=0;i<np;i++){
   c.save()
   c.translate(w*(i%nc),j*h)
   plot(p.plots[(p.cols<0)?j+nr*(i%nc):i],c,w,h,p)
   c.restore()
   if(0==(1+i)%nc)j++;if((j==nr-1)&&(np%nc))w=width/(np%nc)
  }
 }
 
 let replot=function(force){if((canvas.clientWidth!=width)||(canvas.clientHeight!=height)||force===true)plots(p,canvas,slider,listbx)}
 {let r;window.addEventListener("resize",function(){clearTimeout(r);r=setTimeout(replot, 200)})}
 
 canvas.ondblclick=function(e){
  if("fullscreen" in p)delete p.fullscreen
  else                        p.fullscreen=0 //todo index from x/y
  replot(true)
 }
 if(slider!==undefined){
  slider.ondblclick=function(e){
   canvas.classList.toggle("plot-canvas-h");canvas.classList.toggle("plot-canvas-v")
   slider.classList.toggle("plot-slider-h");slider.classList.toggle("plot-slider-v")
   listbx.classList.toggle("plot-listbx-h");listbx.classList.toggle("plot-listbx-v")
  }
  slider.onchange=function(e){
   console.log("slider:",e.target.value)
  }
 }
 if(listbx!==undefined){
  //rm(listbox)
  //let empty=(!"table"in p)
  //listbox.style.hidden==empty
  //if(empty)return
  listbx.onchange=function(e){
  }
 }
 //..
}



function plot(p,c,w,h,plts){
 p.type  =("type"   in p)?p.type: "xy"
 p.title =("title"  in p)?p.title: ""
 p.xlabel=("xlabel" in p)?p.xlabel:""
 p.ylabel=("ylabel" in p)?p.ylabel:""
 if(w>h){let ww=(p.type=="polar")?h:(w>1.5*h)?floor(1.5*h):w;c.translate(floor((w-ww)/2),0);w=ww}
 if(h>w){let hh=w                                           ;c.translate(0,floor((h-hh)/2));h=hh} 
 
 c.fillStyle="black";c.fillText(p.title, w/2, h/2);
 c.strokeStyle="green";c.lineWidth=1;c.strokeRect(1,1,w-2,h-2);
 c.strokeStyle="black"
 switch(p.type){
 case"xy":return    xyplot(p,c,w,h,plts)
 case"polar":    return polarplot(p,c,w,h,plts)
 default:throw new Error("unknown plot type: "+p.type)
}}

function xyplot(p,c,w,h,plts){
 let aw=max(0,w-plts.xyw),ah=max(0,h-plts.xyh)
 
 c.strokeRect(plts.xyx,plts.xyy,aw,ah)
 console.log(w,h,center(plts.xyx+aw),plts.tih,p.title)
 c.textAlign="center";
 c.fillStyle="red"
 c.textBaseline="top";   c.fillText(p.title, plts.xyx+center(aw),0)
 c.textBaseline="bottom";c.fillText(p.xlabel,plts.xyx+center(aw),h)
 c.textBaseline="top"   ;text90(c,0,center(h),p.ylabel)
 
}
function polarplot(p,c,w,h,plts){
 circle(c,w/2,h/2,-3+w/2)
}
function h1(plts){let h=parseFloat(plts.font1);return isNaN(h)?20:ceil(h)}
function h2(plts){let h=parseFloat(plts.font2);return isNaN(h)?14:ceil(h)}
function layout(c,plts){                           //computed sizes depending on fontsize
 plts.tih=ceil(1.2*h1(plts))                       //title height
 c.font=plts.font2;let t=c.measureText('-1.234');
 plts.tlw=t.width                                  //tic label width (y-axis)
 plts.tlh=ceil(1.2*h2(plts))                       //tic label height e.g. x-axis
 plts.ylw=ceil(1.1*h1(plts))                       //y label width (rotated height)
 plts.tl1=ceil(0.5*h2(plts))                       //major tic length
 plts.tl2=ceil(0.6*plts.tl1)                       //minor tic length
 plts.rmw=ceil(0.5*plts.tlw)                       //right margin width
 plts.xyx=plts.tlw+plts.ylw+plts.tl1               //xy-plot x-inset
 plts.xyy=plts.tih                                 //xy-plot y-inset
 plts.xyw=plts.xyx+ 0 +plts.rmw                    //xy-plot sum of h margins
 plts.xyh=plts.tih+ 0 +plts.tl1+plts.tlh+plts.tih  //xy-plot sum of v margins
 return plts
}

function center(x){return floor(x/2)}
function circle(c,x,y,r){c.beginPath();c.arc(x,y,r,0,2*Math.PI);c.stroke()}
function text90(c,x,y,t){c.save();c.translate(x,y);c.rotate(-Math.PI/2);c.fillText(t,0,0);c.restore()}

function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}

return{plots:plots}
})()
