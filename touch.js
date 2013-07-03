var handle=document.getElementById("field");
var graph=handle.getContext("2d");
    handle.addEventListener('touchstart',onTouchStart, false);
    handle.addEventListener('touchend', onTouchEnd, false);
    handle.addEventListener('touchmove', onTouchMove, false);
    var state="none";
    var colors=new Array("orange","green","blue");
    var color=0,X=0,Y=0,startXmove,startYmove,Xmove,Ymove;
    function onTouchMove(event){ 
         event.preventDefault();
            Xmove = event.touches[0].pageX; // Собираем данные
            Ymove = event.touches[0].pageY;
            state="move";
              if(Xmove>startYmove)//&&Xmove-startXmove>5)
            X+=2;
            
            if(Xmove<startYmove)//&&startXmove-Xmove>5)
            X-=2;
            }
    
    function draw(){
        graph.clearRect(0,0,handle.width,handle.height)
        graph.fillStyle=colors[color];
        graph.fillRect(X,Y,50,50);
        
        }
    function onTouchStart(event){
         event.preventDefault();
         state="touch";
         startXmove=event.touches[0].pageX;
         startYmove=event.touches[0].pageY;
    }
    function onTouchEnd(event){
        event.preventDefault();
       if(state==="touch"){
            color=(color+1)%colors.length;
           state="none";
        }else{
          if(state==="move"){
            
            }
       }
      
       }
       if ( !window.requestAnimationFrame ) {

  window.requestAnimationFrame = ( function() {

    return window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

      window.setTimeout( callback, 1000 / 60 );

    };

  })();
}
       function animate(){
           requestAnimationFrame(animate);
           draw();
       }
       animate();
       //setInterval(draw,40);
   