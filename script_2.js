window.onload = function(){

	console.log(all_divs_move);
	Make_absolute_divs(all_divs_move);
	for(var i = 0; i < all_divs_move.length ; i ++){
		all_divs_move[i].addEventListener("dblclick", add_div_handle);
	}
};

var doc = document,
all_divs_move= doc.getElementsByClassName("move"),
div_handle,
startCoords = {x : 0,y : 0},
tag_now = null,
start_x = null,
start_y = null,
start_width = null,
start_height= null,
My_zIndex = 100,
start_zIndex,
last_div;

function add_div_handle(){

	if(div_handle == undefined){ //если создаётся первый раз
		create_div_handle(this);

		start_zIndex = this.style.zIndex;
		this.style.zIndex  = My_zIndex;
		last_div = this;
	}
	else{
		if(div_handle.parentNode == this ){ //если нажать по контейнеру где уже стоит ручка
			div_handle.parentNode.removeChild(div_handle);

			this.style.zIndex  = start_zIndex;
			last_div = null;
		}else{
			if( !(div_handle.parentNode == null) ){ //если ручка на одном контейнере, а нажимаешь на другой
				this.appendChild(div_handle);

				last_div.style.zIndex = start_zIndex;
				start_zIndex = this.style.zIndex;
				this.style.zIndex = My_zIndex;
				last_div = this;
			}else{
				this.appendChild(div_handle);  //если ручка уже была создана но она не на что не "подписана"
				start_zIndex = this.style.zIndex;
				this.style.zIndex = My_zIndex;
				last_div = this;
			}
		}
	}
}

function create_div_handle(parent_div){

	div_handle = doc.createElement('div');
	div_handle.id = "handle";

	var div1 = doc.createElement('div');
	div1.className = "handle";
	div_handle.appendChild(div1);

	var div2 = doc.createElement('div');
	div2.className = "handle";
	div_handle.appendChild(div2);

	var div3 = doc.createElement('div');
	div3.className = "handle";
	div_handle.appendChild(div3);

	div_handle.addEventListener('mousedown', mousedown);
	parent_div.appendChild(div_handle);
}

var mousedown = function(evt){
	evt.preventDefault();
	startCoords.x = evt.clientX;
	startCoords.y = evt.clientY;
	document.addEventListener("mousemove", on_mouse_move );
	document.addEventListener("mouseup", on_mouse_up );
};

var on_mouse_move = function(moveEvt){

	moveEvt.preventDefault();
	start_x = div_handle.parentNode.offsetLeft;
	start_y = div_handle.parentNode.offsetTop;
	start_width =  div_handle.parentNode.clientWidth;
	start_height =  div_handle.parentNode.clientHeight;

	var shift = {
		x: startCoords.x - moveEvt.clientX,
		y: startCoords.y - moveEvt.clientY,
	};

	startCoords.x = moveEvt.clientX;
	startCoords.y = moveEvt.clientY;

	div_handle.parentNode.style.position = "absolute";
	div_handle.parentNode.style.left = start_x + "px";
	div_handle.parentNode.style.top = start_y + "px";
	div_handle.parentNode.style.background = "red";
	div_handle.parentNode.style.width = (start_width/doc.documentElement.clientWidth)*100 + "%";
	div_handle.parentNode.style.minHeight = start_height + "px";

	div_handle.parentNode.style.top = + Convert_in_int(div_handle.parentNode.style.top) - shift.y + "px";
	div_handle.parentNode.style.left = + Convert_in_int(div_handle.parentNode.style.left) - shift.x + "px";
};

var on_mouse_up = function(upEvt){
	upEvt.preventDefault();
	document.removeEventListener("mousemove", on_mouse_move );
	document.removeEventListener("mouseup", on_mouse_up );
	div_handle.parentNode.style.background = "";
	div_handle.parentNode.style.zIndex  = start_zIndex;
};

function Convert_in_int(str){
	return str.substring(0, str.length - 2);
}

function Make_absolute_divs(divs){

	var start_xA = null,
	start_yA = null,
	start_widthA = null,
	start_heightA = null;
	for(var i = divs.length-1; i >= 0 ; i --)
	{
		start_xA = divs[i].offsetLeft;
		start_yA = divs[i].offsetTop;

		start_widthA =  divs[i].clientWidth;
		start_heightA = divs[i].clientHeight;

		create_reserve_div(divs[i]);
		divs[i].style.position = "absolute";

		divs[i].style.left = start_xA + "px";
		divs[i].style.top = start_yA + "px";

		divs[i].style.width = (start_widthA/doc.documentElement.clientWidth)*100 + "%";
		divs[i].style.minHeight = start_heightA + "px";
	}
}

function create_reserve_div(div_) {
	var parent_div = div_.parentNode;
	var reserve_div = document.createElement('div');
	parent_div.appendChild(reserve_div);
	reserve_div.style.width = div_.clientWidth + "px";
	reserve_div.style.height = div_.clientHeight + "px";
}