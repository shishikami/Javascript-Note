// 抽象对象 Tab对象
// 对象具有切换 添加 删除 修改功能
var ori;
class Tab {
    constructor(id) {
        // 获取元素
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll('li');
        this.secs = this.main.querySelectorAll('section');
        this.addbtn = this.main.querySelector('.tabadd');
        this.ulBar = this.main.querySelector('ul');
        this.secBar = this.main.querySelector('.tabscon');
        this.removeIcons = this.main.querySelectorAll('.icon-close');
        ori = this;
        this.init();
    }
    init() {
        ori.updateNode();
        // 初始化操作 相关元素绑定事件
        // li添加点击事件
        for (var i = 0; i < this.lis.length; ++i) {
            // 设置编号
            this.lis[i].setAttribute('data-index', i);
            this.lis[i].onclick = this.toggleTab;
            this.removeIcons[i].onclick = this.removeTab;
        }
        // 初始化界面
        // for (var i = 0; i < this.lis.length; ++i) {
        //     this.lis[i].classList.remove('liactive');
        // }
        // this.lis[0].classList.add('liactive');
        this.addbtn.onclick = this.addTab;
    }
    toggleTab() {
        for (var i = 0; i < ori.lis.length; ++i) {
            ori.lis[i].classList.remove('liactive');
            ori.secs[i].classList.remove('conactive');
        }
        this.classList.add('liactive');
        ori.secs[this.dataset['index']].classList.add('conactive');
    }
    addTab() {
        ori.clearTab();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-close">x</span></li>';
        // console.log(ori);
        var sec = '<section class="conactive">新内容</section>';
        ori.ulBar.insertAdjacentHTML('beforeend', li);
        ori.secBar.insertAdjacentHTML('beforeend', sec);
        ori.init();
    }
    removeTab(e) {
        e.stopPropagation();
        var index = this.parentNode.dataset['index'];
        // console.log(index);
        ori.lis[index].remove();
        ori.secs[index].remove();
        ori.init();
        // 非选定状态下直接删除对应
        if (ori.lis.length <= 0) {
            return;
        }
        if (document.querySelector('.liactive')) {
            return;
        }
        // 在选定状态下删除后选定前一个li为选定状态；
        index--;
        if (index >= 0) {
            ori.lis[index].click();
        }
        else {
            ori.lis[++index].click();
        }
    }
    editTab() { }

    clearTab() {
        var times = ori.main.querySelectorAll('li');
        for (var i = 0; i < times.length; ++i) {
            ori.lis[i].className = '';
            ori.secs[i].className = '';
        }
        console.log(i);
    }
    updateNode() {
        ori.lis = this.main.querySelectorAll('li');
        ori.secs = this.main.querySelectorAll('section');
        ori.removeIcons = this.main.querySelectorAll('.icon-close');
    }
}

var table = new Tab("#tab");
