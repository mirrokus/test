
var canv=document.getElementById("field");
var gfx=canv.getContext("2d");
//var cellSize=10;
var cellCountWidth=10,cellCountHeight=20;


canv.width=0.9*screenSize().w;
canv.height=0.9*screenSize().h;
var cellSize=min(canv.height,canv.width)/20;
gfx.font=cellSize+'px Arial';
var gWidth=cellCountWidth*cellSize;
var gHeight=cellCountHeight*cellSize;
var colors=new Array("white","black","orange","cyan","blue","green","red","magenta");
var field=new Array(cellCountWidth*cellCountHeight);

function screenSize() {
       var w, h; // Объявляем переменные, w - длина, h - высота
       w = (window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth));
       h = (window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight));
       return {w:w, h:h};
 }
 

var score=0,gameover=1,figX=cellCountWidth/2-1,figY=-3,GlobalAlign=0,GlobalColor=1,ClearColor=0;
var figurecount=5,CurrentFig,speed=5,cycleCounter=0,resetYcell=-3,BorderFigColor="black",NewFigure=0,NewColor=0;


var fig1=[[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        [0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0]];
var fig2=[
		[0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
		[1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0],
		[0,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0],
		[0,1,0,0,1,1,0,0,0,1,0,0,0,0,0,0]
];
var fig3=[
			[1,1,0,0
            ,1,1,0,0,0,0,0,0, 0,0,0,0]
];
var fig4=[[
			1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0],[0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,0],
            [1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0],[	0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0]];
var fig5=[[
			0,1,0,0,
			0,1,0,0,
			1,1,0,0,
			0,0,0,0],
			[
			1,0,0,0,
			1,1,1,0,
			0,0,0,0,
			0,0,0,0
			],[
			1,1,0,0,
			1,0,0,0,
			1,0,0,0,
			0,0,0,0
			],[
			1,1,1,0,
			0,0,1,0,
			0,0,0,0,
			0,0,0,0
			]
];
var fig6=[[1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
          [0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0]];
var fig7=[[0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0]];

function candrawfig(cellX,cellY,fig,align){
    var tempAlign=mod(align,fig.length);
    var r=0;
        for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(fig[tempAlign][i*4+j]==1){
                if(cellX+j>=cellCountWidth||cellX<0)
                 r=1;
                if(cellY+i>=cellCountHeight)
                 r=2;
                if(cellY+i>=0&&field[(cellY+i)*cellCountWidth+cellX+j]!==ClearColor)
                 r=3;
			}
		}
		} 
        return r;
    }
    function min(a,b){
        if(a<b) return a;
        else return b;
    }
function drawfig(cellNumX,cellNumY,figu,align,color,Context){
    Context.fillStyle=colors[color%colors.length];
   
    Context.strokeStyle=BorderFigColor;
		var tempAlign=mod(align,figu.length);
		for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(figu[tempAlign][i*4+j]==1&&cellNumY>=0){
				Context.fillRect((cellNumX+j)*cellSize,(cellNumY+i)*cellSize,cellSize,cellSize);
                Context.strokeRect((cellNumX+j)*cellSize,(cellNumY+i)*cellSize,cellSize,cellSize);
			}
		}
		}
}


function DrawField(Context){
Context.strokeStyle="black";
Context.strokeRect(0,0,gWidth,gHeight);
Context.clearRect(0,0,gWidth,gHeight);
for(var i=0;i<cellCountHeight;i++){
for(var j=0;j<cellCountWidth;j++){
    var bufco=colors[field[i*cellCountWidth+j]];
    Context.fillStyle=bufco;
	Context.fillRect(j*cellSize,i*cellSize,cellSize,cellSize);
  if(bufco!==colors[ClearColor]){
   Context.strokeStyle=BorderFigColor;
    Context.strokeRect(j*cellSize,i*cellSize,cellSize,cellSize);
   }
}
}
}
function drawGameOver(Context){
    Context.fillStyle="black";
    Context.fillText("GAME OVER",gWidth+10,cellSize);
}
function drawScore(Context){
    Context.fillStyle="black";
    Context.fillText(score,gWidth+10,cellSize+cellSize);
}
function ResetFunc(Context){
    gameover=0;
  for(var k=0;k<field.length;k++)
   field[k]=ClearColor;  
   DrawField(gfx);
  CurrentFig=figureselect(getRandomInt(0,4));
  GlobalColor=getRandomInt(1,7);
  figY=0;figX=cellCountWidth/2;
  Context.clearRect(gWidth+10,10,8*cellSize,3*cellSize);
  drawScore(gfx);
}
function ResetFigure(){
    
    figX=cellCountWidth/2;
    figY=resetYcell;
    GlobalAlign=0;
    CurrentFig=NewFigure;
    GlobalColor=NewColor
    NewColor=getRandomInt(1,colors.length-1);
    NewFigure=figureselect(getRandomInt(0,6));
    
}
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function figureselect(numfig){
    switch(numfig){
        case 0:return fig1;
        case 1:return fig2;
        case 2:return fig3;
        case 3:return fig4;
        case 4:return fig5;
        case 5:return fig6;
        case 6:return fig7;
        default:return fig1;
        
    }
}
function copyLine(source,dest){
    var source2=source*cellCountWidth,dest2=dest*cellCountWidth;
    for(var j=0;j<cellCountWidth;j++)
        field[dest2+j]=field[source2+j];
}
function fillLine(Line){
    var buf=Line*cellCountWidth,bufcounter=0;
    for(var j=0;j<cellCountWidth;j++)
        if(field[buf+j]!==ClearColor){
            bufcounter++;
        }
        if(bufcounter===cellCountWidth)
        return 0;
        else
        return 1;
}
function deleteLine(){
    var destt=-1;
    var i=cellCountHeight-1,totalline=0;
    while(i>=0){
        if(fillLine(i)===0){
            totalline++;
            
            if(destt==-1){
            destt=i;
            }
        }
        else
            if(destt!==-1){
                copyLine(i,destt);
                destt--;
                }
                i--;
    } 
    score=score+totalline*100;
}
function main(){
    if(gameover===0){
        cycleCounter++;
    DrawField(gfx);
    deleteLine();
    gfx.clearRect(gWidth+10,0,8*cellSize,10*cellSize);
    drawScore(gfx);
    var x=candrawfig(figX,figY,CurrentFig,GlobalAlign);
    
    if(x===0){
    drawfig(figX,figY,CurrentFig,GlobalAlign,GlobalColor,gfx);
    if(cycleCounter>=speed){
    figY++;
    cycleCounter=0;
    }
    }else
    if(x==2||x==3){
    figY--;
    if(figY>=resetYcell){
    drawfig(figX,figY,CurrentFig,GlobalAlign,GlobalColor,gfx);
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++) 
        if(CurrentFig[mod(GlobalAlign,CurrentFig.length)][i*4+j]==1&&figY+i>=0)
            field[(figY+i)*cellCountWidth+figX+j]=GlobalColor;
            }
            ResetFigure();
        }else
        gameover=1;
            ResetFigure();
    }
    }else{
        drawGameOver(gfx);
    }
    if(IsKeyPress(37,0)&&candrawfig(figX-1,figY,CurrentFig,GlobalAlign)===0)figX--;
    if(IsKeyPress(39,0)&&candrawfig(figX+1,figY,CurrentFig,GlobalAlign)===0)figX++;
    if(IsKeyPress(38,1))
    if(candrawfig(figX,figY,CurrentFig,GlobalAlign-1)===0){ 
    GlobalAlign--;
    }else{
            if(candrawfig(figX-1,figY,CurrentFig,GlobalAlign+1)===0){ figX--;GlobalAlign--;}
       }
    if(IsKeyPress(40,1))
    if(candrawfig(figX,figY,CurrentFig,GlobalAlign+1)===0){ 
       GlobalAlign++;
        }else{
            if(candrawfig(figX-1,figY,CurrentFig,GlobalAlign+1)===0){ figX--;GlobalAlign++;}
       }
    if(IsKeyPress(32,0)&&candrawfig(figX,figY+1,CurrentFig,GlobalAlign)===0)
        figY++;
    if(IsKeyPress(32,0)&&candrawfig(figX,figY+1,CurrentFig,GlobalAlign)===0)
        figY++;
    if(IsKeyPress(32,0)&&candrawfig(figX,figY+1,CurrentFig,GlobalAlign)===0)
        figY++;
    if(IsKeyPress(78,1)) ResetFunc(gfx);
} 
function IsKeyPress(keycode,mode){
    if(inKeyCode===keycode){
    if(mode!==0) inKeyCode=0;
    return true;
    }
    else
    return false;
}
 var inKeyCode=0;
function KeyDownFunc(e){
 // if(e.keyCode===40&&candrawfig(figX,figY,CurrentFig,GlobalAlign+1)===0) GlobalAlign++;
    inKeyCode=e.keyCode;
}
function KeyUpFunc(e){
    inKeyCode=0
}
function mod(a,b){
    var buf=a%b;
    if(a<0) return buf*-1;
    else
    return buf;
}
var startXmove,startYmove,Xmove,Ymove,state="none",countLeft=0,countRight=0;
document.onkeydown=KeyDownFunc;
document.onkeyup=KeyUpFunc;
    canv.addEventListener('touchstart',onTouchStart, false);
    canv.addEventListener('touchend', onTouchEnd, false);
    canv.addEventListener('touchmove', onTouchMove, false);
function onTouchMove(event){ 
         event.preventDefault();
            Xmove = event.touches[0].pageX; // Собираем данные
            Ymove = event.touches[0].pageY;
            state="move";
              if(Xmove>startYmove&&candrawfig(figX+1,figY,CurrentFig,GlobalAlign)===0)
              if(countLeft===3){
                figX++;
                countLeft=0;
                }
                else{
                countLeft++;
                countRight=0
                }
              if(Xmove<startYmove&&candrawfig(figX-1,figY,CurrentFig,GlobalAlign)===0)
                if(countRight===3){
                figX--;
                countRight=0;
                }
                else{
                    countLeft=0;
                countRight++;
                }
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
           if(candrawfig(figX,figY,CurrentFig,GlobalAlign-1)===0){ 
           GlobalAlign--;
          }else{
            if(candrawfig(figX-1,figY,CurrentFig,GlobalAlign+1)===0){ figX--;GlobalAlign--;}
       }
        }else{
          if(state==="move"){
            
            }
       }
      
       }
ResetFunc(gfx);
setInterval(main,40);