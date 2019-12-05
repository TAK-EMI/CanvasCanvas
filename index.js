'use strict'

function draw(ctx, hilight = false) {

	ctx.clearRect(0, 0, 500, 500);

	ctx.save();

	ctx.fillStyle = 'rgb(200, 150, 150)';

	ctx.beginPath();
	ctx.rect(10, 10, 300, 50)
	
	ctx.rect(10, 60, 50, 50)
	
	ctx.rect(10, 110, 50, 30)
	
	ctx.stroke();
	ctx.fill();

	if(hilight)
	{
		ctx.beginPath();
		ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
		ctx.rect(10, 60, 50, 50);
		ctx.fill();
	
	}

	ctx.restore();
}

let elCanvas = document.getElementById('main_canvas');
let context = elCanvas.getContext('2d');






var targetFlag = false; // trueでマウスが要素に乗っているとみなす
var rect = null;

/* Canvas上にマウスが乗った時 */
function onMouseOver(e) {
    rect = e.target.getBoundingClientRect();
    elCanvas.addEventListener('mousemove', onMouseMove, false);
}
/* Canvasからマウスが離れた時 */
function onMouseOut() {
    elCanvas.removeEventListener('mousemove', onMouseMove, false);
}
/* Canvas上でマウスが動いている時 */
function onMouseMove(e) {
    /* マウスが動く度に要素上に乗っているかかどうかをチェック */
    moveActions.updateTargetFlag(e);

    /* 実行する関数には、間引きを噛ませる */
    if (targetFlag) {
        moveActions.throttle(moveActions.over, 10);
    } else {
        moveActions.throttle(moveActions.out, 10);
    }
}

/* mouseMoveで実行する関数 */
var moveActions = {
    timer: null,
    /* targetFlagの更新 */
    updateTargetFlag: function(e) {
        var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		
        /* 最後の50は、該当する要素の半サイズを想定 */
        var a = (x > 10);
        var b = (x < 60);
        var c = (y > 60);
        var d = (y < 110);

        targetFlag = (a && b && c && d); // booleanを代入
    },
    /* 連続イベントの間引き */
    throttle: function(targetFunc, time) {
        var _time = time || 100;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            targetFunc();
        }, _time);
    },
    out: function() {
        draw(context, false);
    },
    over: function() {
        draw(context, true);
    }
};

function drawRect(color) {
    // デフォルトもしくはマウスが要素から離れた時の描画処理
}
function drawRectIsHover() {
    // マウスが要素に乗った時の描画処理
}

elCanvas.addEventListener('mouseover', onMouseOver, false);
elCanvas.addEventListener('mouseout', onMouseOut, false);

elCanvas.addEventListener('mousedown', (e) => {
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;
	
	var a = (x > 10);
	var b = (x < 60);
	var c = (y > 60);
	var d = (y < 110);

	if(a && b && c && d)
	{
		console.log('on click');
		
	}

}, false);








draw(context);
