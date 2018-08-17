
angular.module('app',[])
// angular.module('模块的名字',[当前模块所依赖的其他模块的名字])  告诉angular.js要用这个模块管理
	.controller('todoCtrl',['$scope',function($scope){
		// alert(1); 验证
		// 添加任务
		//  获取用户输入的内容(ng-model)；
		//  监听用户输入的是否是回车键;
		//  如果是，判断用户是否输入内容；
		//  准备一个任务列表；
		//  将用户输入的内容添加到任务列表;
		//  将任务列表渲染到页面中(ng-repeat);
		$scope.taskList=[];
		if(localStorage.getItem('taskList')){
			$scope.taskList=angular.fromJson(localStorage.getItem('taskList'))
		}
		$scope.addTask=function(event){
			if(event.keyCode==13){
				if($scope.task){
					$scope.taskList.push(
					{
						name:$scope.task,
						isCompleted:false,
						isEditing:false
					});
					// 清空文本框内容
					$scope.task="";					
				}
			}
		}

		// 删除任务   删除了DOM所对应的数据，DOM也就删除了
		// 1.给删除按钮添加点击事件
		// 2.找到要删除的数据
		// 3.删除
		$scope.deleteTask=function(index){
			$scope.taskList.splice(index,1);
		}

		//计算未完成任务数量

		// 页面中未完成的剩余条数  把它放在一个函数中，html中调用这个函数就可以了
		// 函数return什么，页面差值表达式中调用函数，页面就显示什么
		$scope.calcUncompetedTasks=function(){
			// var num=0;
			// 普通的循环
			// for(var i=0;i<$scope.taskList.length;i++){
			// 	if(!$scope.taskList[i].isCompleted){
			// 		num++;

			// 	}
			// }

			// angular的foreach循环
			// angular.foreach($scope.taskList,function(value,index){
			// 	if(!value.isCompleted){
			// 		num++;
			// 	}
			// });

			// return num;
			// 
			// 数组里面有多少项 function 就执行多少次     return一个条件
			// 数组.filter()可以根据条件对数组进行过滤返回值是一个新的数组
			return $scope.taskList.filter(function(item){
				return !item.isCompleted;
			}).length;
		}


		//清除已完成任务
		//1.给清除按钮添加点击事件
		//2.循环任务列表
		//3.找到已完成的任务
		//4.删除
		$scope.clearCompletedTasks=function(){
			// 注意index是一个参数，不能使用angular的forEach循环
			// angular.foreach($scope.taskList,function(value,index){
			// 	if(value.isCompleted){
			// 		$scope.taskList.splice(index,1);
			// 		index--;
			// 	}
			// })
			// 
			// tastList[i] 把index改成i
			for(var i=0;i<$scope.taskList.length;i++){
				if($scope.taskList[i].isCompleted){
					$scope.taskList.splice(i,1);
					i--;
				}
			}
		}

		//批量更改任务状态
		//1.给按钮绑定一个状态（ng-model)
		//2.给按钮添加点击事件
		//3.获取状态
		//4.当状态为真的时候，
		$scope.toggleStatus=function(){
			// alert($scope.status);
			for(var i=0;i<$scope.taskList.length;i++){
				// statue单词拼写错误 status
				$scope.taskList[i].isCompleted=$scope.status;
			}
		}

		// 当每一项被选中或取消的时候，影响全选按钮是否高亮
		$scope.updateStatus=function(){
			for(var i=0;i<$scope.taskList.length;i++){
				if(!$scope.taskList[i].isCompleted){
					$scope.status=false;
					return;
				}
			}
			$scope.status=true;
		}

		//更改任务名称
		$scope.modifyTaskName=function(task,event){
			//将所有任务更改成不可编辑状态
			for(var i=0;i<$scope.taskList.length;i++){
				$scope.taskList[i].isEditing=false;
			}

			task.isEditing=true;
			// console.log(event.target);
			// 点击的是label，修改的是form angular内部有jquery的精简版
			// 
			// 更改代码的执行顺序，将同步代码改成异步，添加类名显示input的代码之后执行 把这个代码放到最后执行
			//显示是 angular 提供的类名更改了，在代码里不显示，不知道什么时候操作的。 要保证类名更改显示之后，再过去焦点

			setTimeout(function(){
				angular.element(event.target).parent().next().find('input')[0].focus();
			},0);
		}

		//取消文本框的编辑状态
		$scope.cancelEditing=function(task){
			//将当前任务的更改成不可编辑状态
			task.isEditing=false;
		}




		// var oBox=document.getElementById('box');

		// $(oBox) 将原生的DOM对象转换成JQ对象

		// anjular.element(oBox) 将原生DOM对象转换成jQLite对象

		// var oBox=document.getElementById('box');

		// angular.element(oBox).css({
		// 	'background':'red'
		// });

		// anjularjs为了方便我们能够用jquery的方式去操作DOM 它给我们
		// 提供了一个jq精简版；


		// 任务的筛选
		$scope.filterTask=function(type){
			switch(type){
				case "All":
					$scope.condition='';
					break;
				case "Active":
					$scope.condition=false;
					break;
				case "Completed":
					$scope.condition=true;
					break;
			}
		}

		// 监听数据变化 持久化存储到localStorage
		$scope.$watch("taskList",function(){
			localStorage.setItem("taskList",angular.toJson($scope.taskList));
		},true);
		// $watch监听的是字符串，在这里监听的是引用数据类型，所以需要第三个参数true，表示深度监听

	}]);



	


	
