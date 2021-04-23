var glevel = function(arr) {
	//初始化目标对象
	var getmore = function() {
		for (var i = 0; i < arr.length; i++) {
			arr[i].dom = $("#" + arr[i].id),
				arr[i].top = $("#" + arr[i].id)[0].offsetTop,
				arr[i].height = $("#" + arr[i].id).height()
		}
	}
	getmore();
	//进行排序,确定先后顺序
	var getsort = function() {
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr.length - i - 1; j++) {
				if (arr[j].top > arr[j + 1].top) {
					var temp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = temp;
				}
			}
		}
	}
	getsort();
	//渲染控件
	var dorender = function() {
		var hs = "<div id='js-category-container'>"
		for (var i = 0; i < arr.length; i++) {
			if (i == 0) {
				hs = hs + "<div id='m" + arr[i].id + "' class='category-block'>" + arr[i].name + "</div>";
			} else {
				hs = hs + "<div id='m" + arr[i].id + "' class='category-block'>" + arr[i].name + "</div>";
			}
		}
		hs = hs + "<div id='mf0' class='category-block'>置顶</div>"
		var hs = hs + "</div>"
		$('body').append(hs);
		var $boxs = $("#js-category-container");
		var $box = $(".category-block");
		var l = ($(this).width()-1200)/2-95;

		$boxs.css({
			'position': 'fixed',
			'top': '50%',
			'left': l,
			'transform': 'translateY(-50%)',
		})
		$box.css({
			'background-color': '#fff',
			'cursor': 'pointer',
			'padding': '6px',
			'color': '#5b5858',
			'text-align': 'center',
		})
		$("#m" + arr[0].id).css({
			'background-color': '#4571ff',
			'color': 'white'
		})
		//鼠标悬浮移出
		$box.mouseenter(function() {
			$(this).css({
				'background-color': 'lightgray',
				'color': 'black'
			})
		})
		$box.mouseleave(function() {
			$(this).css({
				'background-color': 'white',
				'color': 'black'
			})
			var temp = gettarget()
			boxcheck(temp)
		})
	}
	dorender();

	//滚动条监控
	$(document).scroll(function() {
		var temp = gettarget()
		boxcheck(temp)
	})


	//获得当前目标下标
	var gettarget = function() {
		var flag = true;
		var temp = $(this).scrollTop();
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].top + arr[i].height / 1.5 >= temp) {
				return i;
				flag = false;
				break;
			}
		}
		if (flag) {
			return arr.length - 1;
		}
	}
	//菜单选中当前下标
	var boxcheck = function(count) {
		var temp = null;
		for (var i = 0; i < arr.length; i++) {
			$("#m" + arr[i].id).css({
				'background-color': 'white',
				'color': 'black'
			})

			if (i == count) {
				temp = $("#m" + arr[i].id);
			}
		}
		temp.css({
			'background-color': '#4571ff',
			'color': 'white'
		})
	}
	//置顶操作
	$("#mf0").click(function() {
		$('html').stop().animate({
			scrollTop: '0px'
		}, 500)
	})

	//对应按钮点击之后页面定位
	for (let i = 0; i < arr.length; i++) {
		$("#m" + arr[i].id).click(function() {
			$('html').stop().animate({
				scrollTop: arr[i].top + 'px'
			}, 500)
		})
	}
	//监控页面视口变化，重新获取对象参数
	window.onresize=function(){
		getmore();
		var l = ($(this).width()-1200)/2-95;
		$("#js-category-container").css('left', l);
	}
}
