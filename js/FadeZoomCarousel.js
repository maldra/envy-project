
// Fade Zoom Carousel. (24-January-2012)
// by Vic Phillips - http://www.vicsjavascripts.org.uk/


// The script scrolls images across a parent DIV.
// The scroll may be 'horizontal' or 'vertical'
// and as the images approach the center faded in and as they pass the center faded out.
// Options allow the scroll to be clockwise or anti-clockwise
// and when faded in clicked to reveal a magnified version of the image.

// The functional code size is 5.08K.

/*

 ******* Application Notes.

 **** The HTML and CSS Code.

   The images are nested in a 'slider' DIV.
   The 'slider' DIV is nested in a 'parent' DIV.

   ** The 'parent' DIV.
    The 'parent' DIV must assigned a unique ID name.
    The 'parent' DIV must have a style position of 'relative' or 'absolute'
    and the width('horizontal') or 'height('vertical')
    defined by CSS class name or inline style.

   ** The 'slider' DIV.
    The 'slider' DIV is assigned a style position of 'absolute' by the script
    and the top('horizontal') or left('vertical') position
    may be defined by CSS class name or inline style.

   ** The Image Elements.
    When the images require a margin  margin-Right('horizontal') or margin-Bottom('vertical') MUST be avoided.
    By default the magnified image will have the src or the original,
    however if the image is nested in a link('A' tag) the 'rel' attribute title will be used.

    ** Example HTML.

     <div id="tst" class="slider" >
      <div >
       <a rel="http://www.vicsjavascripts.org.uk/StdImages/WinterPalace.jpg">
        <img src="http://www.vicsjavascripts.org.uk/StdImages/Egypt5.jpg" />
       </a>
       <img src="http://www.vicsjavascripts.org.uk/StdImages/Egypt6.jpg" alt="img" />
       <img src="http://www.vicsjavascripts.org.uk/StdImages/Egypt7.jpg" alt="img" />
       <img src="http://www.vicsjavascripts.org.uk/StdImages/Egypt8.jpg" alt="img" />
      </div>
     </div>

 **** Initializing the Script.

  The script is initialized by creating a new instance of function 'zxcFadeZoomCarousel' passing options as an object.
  If the script is to be controlled by inline event call the instance must be assigned to a global variable.
  ** Example.
   FZS1=new zxcFadeZoomCarousel({
    ID:'tst',                    // the unique ID name of the slider parent node.                                 (string)
    Mode:'horizontal',           //(optional) the mode of execution, 'horizontal' or 'vertical'.                  (string, default = 'horizontal')
    ScrollDuration:16,           //(optional) the scroll duration in seconds.                                     (number, default = calculated from the parent size)
    ScrollDirection:'clockwise', //(optional) the scroll direction, 'anti clockwise' or 'clockwise'.              (string, default = 'anti clockwise')
    MouseOverMouseOut:true,      //(optional) false = mouseover to pause and mouseout to start will not be added. (boolean, default = true)
    MinimumFade:.15,             //(optional) the minimum opacity.                                               (number, default = 0)    AutoStart:2000,              //(optional) the delay before scrolling or false  = no auto start.               (number, default = 500)
    ZoomBy:150,                  //(optional) the percentage zoom of the image.                                   (number, default = no zoom)
    ZoomFadeDuration:1000,       //(optional) the zoom fade duration in milli seconds.                            (number, default = 1000)
    ZoomZIndex:101               //(optional) the z-Index of the zoom image.                                      (number, default = 101)
   });

 **** Controlling the Script.
  The script may be controlled by inline event calls.

  ** Function 'Pause'.
   function 'Pause' pauses the scroll.
    e.g.
     <input type="button" name="" value="Pause" onmouseup="FZS1.Pause();" />
    where:
     FZS1        = the global variable assigned the script instance.

  ** Function 'Scroll'.
   function 'Scroll' scrolls the images.
    e.g.
     <input type="button" name="" value="Scroll" onmouseup="FZS1.Scroll(0);" />
    where:
     FZS1        = the global variable assigned the script instance.
     parameter 0 = (optional) the delay before starting the scroll in milli seconds.  (number, default = 500)

  ** Function 'Direction'.
   function 'Direction' changes the scroll direction.
    e.g.
     <input type="button" name="" value="ClockWise" onmouseup="FZS1.Direction(true);" />
     <input type="button" name="" value="Anti-ClockWise" onmouseup="FZS1.Direction(false);" />
     <input type="button" name="" value="Toggle" onmouseup="FZS1.Direction('',false);" />
    where:
     FZS1        = the global variable assigned the script instance.
     parameter 0 = (optional) true = scroll clockwise, false = scroll anti-clockwise. (boolean, default = toggle direction)
     parameter 1 = (optional) false = pause scroll, true = start scroll.              (boolean, default = the current scroll/pause condition)



*/

//****** Functional Code - NO NEED to Change

function zxcFadeZoomCarousel(o){
 var oop=this,mde=o.Mode,mde=typeof(mde)=='string'&&mde.charAt(0).toUpperCase()=='V'?['top','offsetHeight','offsetTop','height','left']:['left','offsetWidth','offsetLeft','width','top'],obj=document.getElementById(o.ID),ud=o.ScrollDirection,ms=o.ScrollDuration,mf=o.MinimumFade,mag=o.ZoomBy,z=o.ZoomZIndex,fms=o.ZoomFadeDuration,auto=o.AutoStart,sz=obj[mde[1]],slide=obj.getElementsByTagName('DIV')[0],imgs=slide.getElementsByTagName('IMG'),lst=imgs[imgs.length-1],max,ary=[],clone,img,zimgs=[],z0=0,z1=1,z2=0;
 obj.style.overflow='hidden';
 slide.style.position='absolute';
 slide.style[mde[3]]='3000px';
 if (typeof(mag)=='number'){
  for (;z0<imgs.length;z0++){
   img=document.createElement('IMG');
   img.src=imgs[z0].parentNode.rel||imgs[z0].src;
   img.style.position='absolute';
   img.style.zIndex=isFinite(z*1)?z:'101';
   img.style.left='-3000px';
   img.style.top='-3000px';
   img.style.width=imgs[z0].width*mag/100+'px';
   img.style.height=imgs[z0].height*mag/100+'px';
   document.body.appendChild(img);
   zimgs[z0]=img;
   ary[z0]=imgs[z0];
   oop.addevt(img,'mouseout','hide',img);
  }
 }
 max=lst[mde[2]]+lst[mde[3]];
 clone=slide.cloneNode(true);
 ary=[[0,ary]];
 for (;z1<Math.ceil(sz/max)+1;z1++){
  clone=clone.cloneNode(true);
  clone.style[mde[0]]=max*z1+'px';
  clone.style[mde[4]]='0px';
  slide.appendChild(clone);
  ary[z1]=[max*z1,clone.getElementsByTagName('IMG')];
 }
 if (zimgs[0]){
  oop.imgs=imgs;
  imgs=slide.getElementsByTagName('IMG');
  for (;z2<imgs.length;z2++){
   oop.addevt(imgs[z2],'mouseup','zoom',imgs[z2],z2%zimgs.length);
  }
 }
 oop.mde=mde;
 oop.obj=slide;
 oop.sz=sz;
 oop.ary=ary;
 oop.zimgs=zimgs;
 oop.max=max;
 oop.ud=typeof(ud)=='string'&&ud.charAt(0).toUpperCase()=='C';
 oop.run=false;
 oop.now=oop.ud?-max:0;
 oop.ms=typeof(ms)=='number'?ms*1000:sz*20;
 oop.fms=typeof(fms)=='number'?fms:1000;
 oop.mf=typeof(mf)=='number'&&mf<=1?mf*100:0;
 oop.mse=o.MouseOverMouseOut!=false;
 if (oop.mse){
  oop.addevt(obj,'mouseover','Pause');
  oop.addevt(obj,'mouseout','Scroll');
 }
 oop.animate(mde[0],oop.obj,oop.now,oop.now,new Date(),10);
 if (auto!=false){
  oop.Scroll(typeof(auto)=='number'?auto:500);
 }
}

zxcFadeZoomCarousel.prototype={

 Pause:function(){
  clearTimeout(this.dly);
  this.run=false;
 },

 Scroll:function(ms){
  var oop=this;
  clearTimeout(oop.dly);
  oop.dly=setTimeout(function(){  oop.scroll(); },ms||500);
 },

 Direction:function(ud,r){
  var oop=this,run=oop.run;
  oop.Pause();
  oop.ud=typeof(ud)=='boolean'?ud:!oop.ud
  if ((run||r==true)&&r!=false){
   oop.Scroll();
  }
 },

 scroll:function(){
  var oop=this,to=oop.ud?0:-oop.max,mS=oop.ms*Math.abs((to-oop.now)/(oop.max));
  clearTimeout(oop.dly);
  oop.run=true;
  oop.animate(oop.mde[0],oop.obj,oop.now,to,new Date(),mS,this.dly);
 },

 animate:function(mde,obj,f,t,srt,mS,to){
  var oop=this,ms=new Date().getTime()-srt,now=(t-f)/mS*ms+f;
  if (isFinite(now)){
   if (mde!='opacity'){
    oop.now=now;
    obj.style[mde]=now+'px';
    oop.fade();
   }
   else {
    oop.opacity(obj,now);
   }
  }
  if (oop.run||mde=='opacity'){
   if (ms<mS){
    to=setTimeout(function(){ oop.animate(mde,obj,f,t,srt,mS,to); },10);
   }
   else {
    if (mde!='opacity'){
     oop.now=oop.ud?-oop.max:0;
     oop.scroll();
    }
    else if (t==0){
     obj.style.left='-3000px';
     obj.style.top='-3000px';
     oop.run=true;
     if (oop.mse){
      oop.Scroll(oop.fms);
     }
    }
   }
  }
 },

 fade:function(){
  var oop=this,mde=oop.mde,ary=oop.ary,c=oop.sz/2,imgs,z0=0,z0a,img,lft,w,o;
  for (;z0<ary.length;z0++){
   for (var z0a=0;z0a<ary[z0][1].length;z0a++){
    img=ary[z0][1][z0a];
    w=img[mde[3]];
    lft=oop.now+ary[z0][0]+img[mde[2]];
    if (lft>=-w&&lft<=oop.sz){
     o=(lft+w)/(c+w/2);
     o=(lft+w/2<c?o:-(o-1)+1)*100;
     oop.opacity(img,o);
     if (oop.zimgs[1]){
      img.style.cursor=o>80?'pointer':'default';
     }
    }
   }
  }
 },

 zoom:function(img,nu){
  if (img.style.cursor=='pointer'){
   var oop=this,p=oop.pos(img),zimg=oop.zimgs[nu];
   clearTimeout(oop.dly);
   setTimeout(function(){ clearTimeout(oop.dly) },110);
   zimg.style.left=p[0]-(zimg.width-img.width)/2+'px';
   zimg.style.top=p[1]-(zimg.height-img.height)/2+'px';
   oop.run=false;
   oop.animate('opacity',zimg,5,100,new Date(),oop.fms,oop.to);
  }
 },

 hide:function(zimg){
  this.animate('opacity',zimg,100,0,new Date(),this.fms,this.to);
 },

 pos:function(obj){
  var rtn=[0,0];
  while(obj){
   rtn[0]+=obj.offsetLeft;
   rtn[1]+=obj.offsetTop;
   obj=obj.offsetParent;
  }
  return rtn;
 },

 opacity:function(obj,o){
  o=Math.min(Math.max(o,this.mf),100);
  obj.style.filter='alpha(opacity='+o+')';
  obj.style.opacity=obj.style.MozOpacity=obj.style.WebkitOpacity=obj.style.KhtmlOpacity=o/100-.001;
 },

 addevt:function(o,t,f,p,p1){
  var oop=this;
  if (o.addEventListener) o.addEventListener(t,function(e){ return oop[f](p,p1,e);}, false);
  else if (o.attachEvent) o.attachEvent('on'+t,function(e){ return oop[f](p,p1,e); });
 }

}


   