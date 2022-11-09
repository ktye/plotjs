```js



plots:{
 equal:false,                             // equal axis limits for all plots
 colors:["#123","#456"],                  // color cycle 
 columns:-2,                              // plots per row, negative: column major order
 font1:"12px monospace",                  // title/axis font (canvas syntax)
 font2:"10px monospace",                  // tic font
 plots:[plot,plot,plot],
 table:table,
}

plot:{
 type:"xy",                               // xy|polar|ring|ampang|raster
 limits:[xmin,xmax,ymin,ymax,zmin,zmax],
 xlabel:"",ylabel:"",title:"",
 xunit:"", yunit:"", zunit:"",
 lines:[line,line]
}


line:{
 x:[1,2,3],
 y:[4,5,6],
 z:[4,5,6],                               // imag for plot.type polar|ampang
 id:1,                                    // id for table-link and color index, default i
 style:"-",                               // -|.|-.                             default .polar -else
 size:1                                   //                                    default ..
}

table:{
 text:"abc\ndef",
 columns:[column,column],
 colors:[0,1]                             // index into
}

column:{
 name:"title",
 unit:"µm",
 rows:["1.23","4.56","7.89"]
}




```
