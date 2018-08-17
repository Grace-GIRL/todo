数据驱动DOM

清楚了数据，那么数据所对应的li也就清除了；

创建一个模块  var app = angular.module('app',[])

加第二个参数 创建模块
不加第二个参数 获取模块

重点：
li里面分成两大部分 一部分是 div class="view" 第二部分是form

把 view 里面 display:none  form里面改成display:block

是否可编辑 是有li的editing类名控制的  当有editing类名的时候view隐藏 edit为block

重点：

var oBox=document.getElementById('box');
$(oBox)将原生DOM对象转换成JQ对象
angular.element(oBox)
将原生DOM对象转换成JQLite对象

var oBox=document.getElementById('box');
angular.element(oBox).css({'background':'red'});
angularjs为了方便我们能够用jquery的方式去操作DOM它给我们提供了一个jq精简版

重点：
setTimeout(funciton(){},0)
js中的事件队列，setTimeout/0可以把事件拿到队列的最后



		
			添加任务		
			删除任务
			计算未完成任务数量
			清除已完成任务
			更改任务状态
			批量更改任务状态
			更改任务名
			任务筛选
			持久化存储数据
