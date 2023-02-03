function animate_plus(obj,target,speed,timespan){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        // 由于小数精度问题，步长大概可能需要一些约束条件？
        // var step = ((target - obj.offsetLeft)/20)>0.5?((target - obj.offsetLeft)/20):0.5;
        var step = (target - obj.offsetLeft)/speed;
        step = step>0?Math.ceil(step):Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
        if(obj.offsetLeft==target){
            clearInterval(obj.timer);
            console.log('2:'+obj.offsetLeft);
        }
    },timespan);
}