let plotjs=(()=>{

let ge=function(x){return document.getElementById(x)}
let pd=function(e){e.preventDefault();e.stopPropagation()}

function plots(p,canvas,slider,listbx){
console.log("plots",p)
 p.equal  =("equal" in p)?p.equal :false
 p.colors =("colors"in p)?p.colors:"#003FFF,#03ED3A,#E8000B,#8A2BE2,#FFC400,#00D7FF".split(",")
 p.cols   =("cols"  in p)?p.cols  :0
 p.font1  =("font1" in p)?p.font1 :"12px monospace"
 p.font2  =("font2" in p)?p.font1 :"10px monospace"
 
 
 canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight
 let width,height;[width,height]=[canvas.width,canvas.height]
 let c=canvas.getContext("2d")
 c.fillStyle="white";c.fillRect(0,0,width,height)
 c.strokeStyle="red";c.lineWidth=2;c.strokeRect(3,3,width-6,height-6)
 
 if(p.plots){
  let np=p.plots.length,nc=Math.abs(p.cols)
  nc=nc?nc:np,nr=Math.ceil(np/nc),w=width/nc,h=height/nr
  for(let i=0,j=0;i<np;i++){
   c.save()
   c.translate(w*(i%nc),j*h)
   plot(p.plots[(p.cols<0)?j+nr*(i%nc):i],c,w,h,p)
   c.restore()
   if(0==(1+i)%nc)j++;if((j==nr-1)&&(np%nc))w=width/(np%nc)
  }
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
 c.strokeStyle="green";c.lineWidth=1;c.strokeRect(6,6,w-12,h-12)
 c.fillStyle="black"
 c.fillText(p.title, w/2, h/2);
}

function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}

return{plots:plots}
})()
