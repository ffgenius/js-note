
window.onload = function () {
    // 获取各个事件元素的DOM元素
    let smallBox = document.getElementById('smallBox-enlarge');
    let glass = document.getElementById('glass-enlarge');
    let bigBox = document.getElementById('bigBox-enlarge');
    let box = document.getElementById('box-enlarge');
    let bigPic = document.getElementById('bigPic-enlarge');

    // 鼠标经过小盒子，显示大盒子和放大镜
    smallBox.addEventListener('mouseover', function () {
        glass.style.display = 'block';
        bigBox.style.display = 'block';
    })

    //鼠标移出小盒子，隐藏小盒子和放大镜
    smallBox.addEventListener('mouseout', function () {
        glass.style.display = 'none';
        bigBox.style.display = 'none';
    })

    smallBox.addEventListener('mousemove', function (event) {
        // 滚动条移动的距离
        // var st = document.body.scrollTop || document.documentElement.scrollTop;
        // var sl = document.body.scrollLeft || document.documentElement.scrollLeft;
        // var event = event || window.event;
        //pageX,pageY，IE8不支持
        //当有滚轮时，视口区鼠标的坐标clientX，需要加上滚动的距离才为鼠标在页面上的坐标

        // clientX,clientY获取当前视口的坐标，不包含滚动条距离
        //pageX,pageY获取当前窗口坐标，包含滚动条
        // var pageX = event.pageX || event.clientX + sl;
        // var pageY = event.pageY || event.clientY + st;

        // 也可以使用 event.clientX + sl 和 event.clientY + st
        let pageX = event.pageX;
        let pageY = event.pageY;


        //计算放大镜的位置
        // 鼠标相对于窗口的距离 减去 box 距离窗口的距离 减去 glass 宽/高的一半

        let targetX = pageX - box.offsetLeft - glass.offsetWidth / 2;
        let targetY = pageY - box.offsetTop - glass.offsetHeight / 2;

        // 将放大镜限制于 box 盒子内
        if (targetX < 0) {
            targetX = 0;
        }
        if (targetY < 0) {
            targetY = 0;
        }
        if (targetX > smallBox.offsetWidth - glass.offsetWidth) {
            targetX = smallBox.offsetWidth - glass.offsetHeight;
        }
        if (targetY > smallBox.offsetHeight - glass.offsetHeight) {
            targetY = smallBox.offsetHeight - glass.offsetHeight
        }

        // 计算得到放大镜相对与box盒子的位置
        glass.style.left = targetX + 'px';
        glass.style.top = targetY + 'px';

        let bigMoveX = bigPic.offsetWidth - bigBox.offsetWidth;
        let smallMoveX = smallBox.offsetWidth - glass.offsetWidth;
        let bigMoveY = bigPic.offsetHeight - bigBox.offsetHeight;
        let smallMoveY = smallBox.offsetHeight - glass.offsetHeight;
        let rateX = bigMoveX / smallMoveX;
        let rateY = bigMoveY / smallMoveY;
        bigPic.style.left = -rateX * targetX + 'px';
        bigPic.style.top = -rateY * targetY + 'px';
    })
}