()=>{


function plots(plts,canvas,listbox){
 plts.equal  =("equal"  in plts)?plts.equal :false
 plts.colors =("colors" in plts)?plts.colors:"#003FFF,#03ED3A,#E8000B,#8A2BE2,#FFC400,#00D7FF".split(",")
 plts.columns=("columns"in plts)?plts.column:0
 plts.font1  =("font1"  in plts)?plts.font1:"12px monospace"
 plts.font2  =("font2"  in plts)?plts.font1:"10px monospace"
 
 let c=canvas.getElement("2d")
 
 // ..
 if(listbox!==undefined){
  rm(listbox)
  let empty=!"table"in plts
  listbox.style.hidden==empty
  if(empty)return
 }
 //..
}

function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}

return{plots:plots}}()
