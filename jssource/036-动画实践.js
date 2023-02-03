function animate_plus(obj,target,speed,timespan,callback){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        // 由于小数精度问题，步长大概可能需要一些约束条件？
        // var step = ((target - obj.offsetLeft)/20)>0.5?((target - obj.offsetLeft)/20):0.5;
        var step = (target - obj.offsetLeft)/speed;
        step = step>0?Math.ceil(step):Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
        if(obj.offsetLeft==target){
            clearInterval(obj.timer);
            callback && callback();
        }
    },timespan);
};

window.addEventListener('load',function(){
    console.log('已加载');
    var btns = document.querySelectorAll('.btn');
    var show_bar = document.querySelector('.show');
    var show_img_area = document.querySelector('.display_bar');
    var nav_bar = document.querySelector('.nav_bar');

    show_bar.addEventListener('mouseover',function(){
        for(var i=0;i<btns.length;++i){
            btns[i].style.display = 'block';
        }
        clearInterval(timer);
        timer = null;
    });

    show_bar.addEventListener('mouseout',function(){
        for(var i=0;i<btns.length;++i){
            btns[i].style.display = 'none';
        }
        timer = setInterval(function(){
            // 手动调用事件；
            btn_r.click();
        },3000);
    });

    // 动态生成小圆圈：
    for(var i=0;i<show_img_area.children.length;++i){
        var liNode = document.createElement('li');
        liNode.setAttribute('data-index',i);
        nav_bar.appendChild(liNode);

        liNode.addEventListener('click',function(){
            //小圆圈排他思想的实现：
            for(var j=0;j<nav_bar.children.length;++j){
                nav_bar.children[j].className='';
            }
            this.className = 'current';
        
            // 小圆圈导航功能的实现：
            var target = this.getAttribute('data-index');
            animate_plus(show_img_area,-(target * 800),10,15);
            page_count = target;
        });
    }
    nav_bar.children[0].className = 'current';

    // 左右箭头导肮功能
    var page_count = 0;
    var btn_l = document.getElementById('btn_l');
    var btn_r = document.getElementById('btn_r');
    
    // 无缝滚动
    // 将第一张图片复制后放到最后一份
    // 到达最后一张后再点击右侧按钮直接跳回第一张
    var newImage = show_img_area.children[0].cloneNode(true);
    show_img_area.appendChild(newImage);

    var nodeChange = function(){
        //小圆圈跟随箭头变换
        for(var j=0;j<nav_bar.children.length;++j){
            if(parseInt(nav_bar.children[j].getAttribute('data-index')) == (page_count % 4)){
                nav_bar.children[j].className='current';
            }
            else{
                nav_bar.children[j].className='';
            }
        }
    };

    // 节流阀
    var flag = true;
    btn_l.addEventListener('click',function(){
        console.log(flag);
        if(flag){
            flag = false;
            if(page_count == 0){
                show_img_area.style.left = '-3200px';
                page_count = 4;
            }
            page_count--;
            animate_plus(show_img_area,-(page_count * 800),10,20,function(){
                flag = true;
            });
            nodeChange();
        }
    })

    btn_r.addEventListener('click',function(){
        if(flag){
            flag = false;
            if(page_count == 4){
                show_img_area.style.left = 0;
                page_count = 0;
            }
            page_count++;
            animate_plus(show_img_area,-(page_count * 800),10,20,function(){
                flag = true;
            });
            nodeChange();
        }
    })

    // 自动播放模块
    // 采用定时器
    var timer = setInterval(function(){
        // 手动调用事件；
        btn_r.click();
    },3000);

    // 节流阀
    // 目的：上一个函数执行完毕后再去执行下一个任务，让事件无法连续出发
    // 核心思路：利用回调函数。添加一个变量来控制，锁住或者解锁函数
})