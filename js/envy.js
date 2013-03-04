function Init(){

FZS1=new zxcFadeZoomCarousel({
 ID:'marquee',                    // the unique ID name of the slider parent node.                                (string)
 Mode:'horizontal',           //(optional) the mode of execution, 'horizontal' or 'vertical'.                 (string, default = 'horizontal')
 ScrollDuration:30,           //(optional) the scroll duration in seconds.                                    (number, default = calculated from the parent size)
 ScrollDirection:'clockwise', //(optional) the scroll dirction, 'anticlockwise' or 'clockwise'.               (string, default = 'anticlockwise')
 AutoStart:500,              //(optional) the delay before scrolling or false  = no auto start.              (number, default = 500)
 MouseOverMouseOut:true,      //(optional) false = mousover to pause and mouseout to start will not be added. (boolean, default = true)
 MinimumFade:.15,             //(optional) the minimum opacity.                                               (number, default = 0)
 ZoomBy:150,                  //(optional) the percentage zoom of the image.                                  (number, default = no zoom)
 ZoomFadeDuration:1000,       //(optional) the zoom fade duration in milli seconds.                           (number, default = 1000)
 ZoomZIndex:101               //(optional) the z-Index of the zoom image.                                     (number, default = 101)
});

new zxcFadeZoomCarousel({
 ID:'tst2',
 ScrollDirection:'anticlockwise',
 ZoomBy:150
});

new zxcFadeZoomCarousel({
 ID:'tstV',
 Mode:'vertical',
 ScrollDirection:'anticlockwise',
 ZoomBy:150
});


}

if (window.addEventListener){
 window.addEventListener('load',Init, false);
}
else if (window.attachEvent){
 window.attachEvent('onload',Init);
}

   