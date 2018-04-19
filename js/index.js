window.Promise = Promise;
// require('jquery');

$(function () {
	// body...
var playGame = async () => {
    let gameCont = $('.gameWarp'),
        bot = $('.bottle'),
        bowl = $('.pot'),
        total = 0,
        gameWidth = gameCont.width(),
        bowlWidth = bowl.width(),
        minX,
        maxX,
        x,
        distance,
        creatLeft,
        thisFood = [],
        time = 3000,
        foods = ['img/pizza.png', 'img/red-wine.png', 'img/rose.png', 'img/steak.png', 'img/desserts.png'];
    var play = setInterval(function(){
        thisFood = foods[Math.floor(Math.random() * foods.length)];
        creatFood();
        time -= 100; // 下落时间每次减少 100ms， 以此来控制速度
    },1000);
// 创建降落的物品
    var creatFood = function() {
        var creat = $('<div></div>').css({'position': 'absolute'}).html(`<img src="${thisFood}">`);
        var creatLeft = Math.ceil(Math.random() * gameWidth - creat.width() - 50);
        (creatLeft < 0) ? creatLeft = 0 : creatLeft;
        creat.attr('status','reday').css({'left': creatLeft}, {'top': -creat.height()});
    // 判断是否接到
        setInterval(function(){
            if(creat.attr('status') === 'reday'){
                creat.appendTo(gameCont).css({'width': '10%'}).animate({'top':gameCont.height()},time,function(){
                    $(this).remove();
                });
                creat.attr('status','falling');
            }
            // 接到物品 个数加一
            if(creat.attr('status') == 'falling' && bowl.intersection(creat)){
                creat.attr('status','out');
                creat.addClass('hide')
                total += 1; //累计分数
                console.log(total);
                $('.nowcount').html(total);
            }
            // 未接到  游戏结束
            if(creat.attr('status') == 'falling' && creat.position().top > bowl.position().top){
                creat.addClass('hide');
                console.log('game over!');
                clearInterval(play);
            }
        },100)
    }  
// 接物盒子移动
    gameCont.on('touchmove',function(event){
        event.preventDefault();
        minX = gameCont.offset().left;
        x = event.originalEvent.targetTouches[0].pageX; // 触点坐标
            distance = x - minX; //窗口的距离
            if(distance < bowlWidth/2){
                bot.css('left',0);
                bowl.css('left',0);
            }else if(distance > gameWidth - bowlWidth/2){
                bot.css('left',gameWidth - bowlWidth);
                bowl.css('left',gameWidth - bowlWidth);
            }else{
                bot.css('left',x - minX - bowlWidth/2);
                bowl.css('left',x - minX - bowlWidth/2);
            }
        }); 
}
//与容器交错
    $.prototype.intersection = function(obj) {
        var self = $(this);
        if (obj.position().top + obj.height() >= self.position().top) {
            if ((obj.position().left + obj.width()) >= self.position().left && obj.position().left <= self.position().left + self.width()) {
                return true;
            }
        }
        return false;
    };

    playGame();
})



