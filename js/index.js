
var shell = document.getElementById("mian");
var w = $(document).width();
var dw = w / 20;
var mainh = $(document).height();
$(function() {
    var h = $(document).height();
    var dwc = $(document).width();

    console.log(dwc);

    //**结束得分提示页面*/.endmain endcten
    $('.endmain').css('height', h + 'px');
    $('.endmain').css('background-size', dwc + 'px ' + h + 'px');

    $('.endcten').css('height', (parseInt(h) * 0.253) + 'px');
    $('.endcten').css('width', ((parseInt(h) * 0.253) / 0.6) + 'px');
    $('.endcten').css('background-size', ((parseInt(h) * 0.253) / 0.6) + 'px ' + (parseInt(h) * 0.253) + 'px');
    $('.endcten').css('margin-top', (parseInt(h) * 0.1) + 'px');
    $('.endcten').css('margin-left', (parseInt(dwc) * 0.1595) + 'px');

    $('.bttret').css('margin-top', (parseInt(h) * 0.43) + 'px'); //按钮再来一次位置
    $('.bttret img').css('height', (parseInt(h) * 0.0813) + 'px'); //按钮再来一次高度
    $('.bttret img').css('width', ((parseInt(h) * 0.0813) * 2.7735) + 'px'); //按钮再来一次宽度

    $('.bttret1').css('margin-top', (parseInt(h) * 0.5284) + 'px'); //按钮再退出位置
    $('.bttret1 img').css('height', (parseInt(h) * 0.0813) + 'px'); //按钮退出高度
    $('.bttret1 img').css('width', ((parseInt(h) * 0.0813) * 2.7735) + 'px'); //按钮退出宽度
    //**结束得分提示页面*/

    //**调整开始按图层*/.shellstart{.start
    var hw, th, stth, sth;
    hw = parseInt(h) * 0.36;
    th = parseInt(h) * 0.3;
    stth = hw * 0.7;
    sth = hw * 0.2;
    $('.shellstart').css('height', hw + 'px');
    $('.shellstart').css('width', hw + 'px');
    $('.shellstart').css('background-size', hw + 'px ' + hw + 'px');
    $('.shellstart').css('margin-top', th + 'px');
    $('.start').css('margin-top', stth + 'px');
    $('.start').css('height', sth + 'px');
    //**调整开始按图层*/

    $('.mian').css('height', (h - 100) + 'px');
    //$('.bott').css('height',((h-6)*0.2)+'px');
    //$('.person').css('height',((h-6)*0.2)+'px');
    $('.bott').css('height', '150px');
    $('.person').css('height', '100px');







    $(".bott_left").bind("touchstart", function() { //人物向左移动
        $('.person').attr('i', '1');
        var set = setInterval(function() {
            var p = $('.person').attr('i');
            if (p == '1') { //判断手机触摸
                var person_left = $('.person').css('margin-left');
                person_left = parseInt(person_left);
                if (person_left > 0) { //判断人物是否移动出边界
                    $('.person').css('margin-left', (person_left - 2) + 'px');
                }
            }
            if (p == '0') {
                clearInterval(set);
            }
        }, 5);
    });

    $(".bott_left").bind("touchend", function() { //人物向左移动停止，手触摸离开就改变状态
        $('.person').attr('i', '0');
    });


    $(".bott_rihgt").bind("touchstart", function() { //人物向右移动
        $('.person').attr('i', '1');
        var set = setInterval(function() {
            var p = $('.person').attr('i');
            if (p == '1') {
                var person_left = $('.person').css('margin-left');
                person_left = parseInt(person_left);
                if (person_left < (w - 96)) { //判断人物是否移动出边界
                    $('.person').css('margin-left', (person_left + 2) + 'px');
                }
            }
            if (p == '0') {
                clearInterval(set);
            }
        }, 5);
    });

    $(".bott_rihgt").bind("touchend", function() { //人物向右移动停止
        $('.person').attr('i', '0');
    });


});





//**水果随机出现位置*/
function ran() { //随机1到20的数的函数
    var kwc = Math.ceil(Math.random() * 20);
    return kwc;
}
//**水果下落函数*/
function fall() {
    var s, der, ki, col;
    s = ran();
    der = ran();
    if (der == 5 || der == 10 || der == 15) {
        ki = '0'; //0就扣分
        col = 'url(img/orange1.png)';
        
    } else {
        ki = '1'; //如果是1就记分
        col = 'url(img/orange.png)';
    }

    var ml = dw * s;
    if (ml > (w - 30)) { //判断右边果子是否超出边界
        ml = ml - 50;
    }

    var myDate = new Date();
    var myid = myDate.getTime();

    var html = shell.innerHTML;
    shell.innerHTML = html + '<div ki="' + ki + '" id="' + myid + '" style="position:absolute;z-index: 0;width: 30px;margin-left: ' + ml + 'px;margin-top: 0px;height: 30px;background: ' + col + ';"></div>';
    var fallset = setInterval(function() {
        var obsg = document.getElementById(myid); //获取下落水果对象

        var vt = obsg.style.marginTop;
        vt = parseInt(vt);
        obsg.style.marginTop = (vt + 1) + 'px';
        if (vt > mainh - 95) {
            var person = $('#person').css('margin-left'); //获取人物的位置
            person = parseInt(person);
            if (ml > person && ml < (person + 70)) { //判断接没有接住
                //**记录分数*/
                var ki = $('#' + myid).attr('ki');
                var fen = $('#person').attr('fens');
                var kiy = $('#suju').attr('kiy');
                fen = parseInt(fen);

                if (kiy == '1') { //判断游戏是否结束没有
                    if (ki == '1') { //判断是否该加减分数
                        fen = fen + 1; //加分
                    } else {
                        fen = fen - 2; //减分
                    }
                }

                $('#person').attr('fens', fen);
                $('#czsl').html(fen); //分数记录
                $('#endfeng').html(fen);

                //**记录分数*/
                console.log(fen);
                clearInterval(fallset);
                obsg.remove();
            }
        }
        if (vt > mainh - 30) {
            clearInterval(fallset);
            obsg.remove();
        }
    }, 10);

}




function allrun() { //游戏总运行函数
    var endrun = setInterval(function() { //定时游戏结束
        $('#suju').attr('kiy', '0');
        $('#ing').css('display', 'none');
        $('#end').css('display', 'block');
        console.log('游戏结束');
        clearInterval(endrun);
    }, 61000);

    var time1 = setInterval(function() { //时间跳动表
        var pd = $('#suju').attr('kiy');
        if (pd == '0') {
            clearInterval(time1);
        } else {
            var times = $('#time1').html();
            times = parseInt(times);
            times = times - 1;
            $('#time1').html(times);
        }


    }, 1000);


    var run = setInterval(function() { //游戏运行函数
        var kiy = $('#suju').attr('kiy');
        if (kiy == '1') {
            fall();
        } else {
            clearInterval(run);
        }
    }, 1000);
}

function reten() {
    window.location.reload();
}

function funrun() {
    $('.beijinzez').css('display', 'none');
    allrun();
}