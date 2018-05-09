var get = function (id){
	return document.getElementById(id);
};

var now_equation_show; // ???

function show_now_equation(){
	alert(now_equation_show);
}

function set_start_innerHTML(){
	var count_cells = count_cells_value();
	var now_equation = new creation_equation(count_cells);

	alert(now_equation.now_equation);
	now_equation_show = now_equation.now_equation;
	var main_square = get("id3");
	set_onclick_divs(main_square);

	var random_arr = ser_random_arr(count_cells);
	var counter_arr = 0;

	for(var i = 0; i < main_square.childNodes.length; i ++){
		if(main_square.childNodes[i].nodeType == 1){
			main_square.childNodes[i].innerHTML = now_equation.arr_numbers[random_arr[counter_arr]];
			counter_arr++;
		}
	}
}

function creation_equation(count_cells_value){
	var auxiliary_value;
	var extreme_points = new create_extreme_points(count_cells_value);
	this.x = getRandomInt(extreme_points.min_point, extreme_points.max_point - extreme_points.min_point);
	this.y = getRandomInt(extreme_points.min_point, extreme_points.max_point-this.x);
	this.sum = this.x+this.y;
	this.now_equation = this.x +" + " + this.y +" = "+ this.sum;
	auxiliary_value =  "" + this.x + this.y + this.sum;
	this.arr_numbers = auxiliary_value.split( /(?=(?:\d{1})+(?!\d))/ ); 

	this.my_splice = function(num){
		this.arr_numbers.splice(num, 1); 
	};
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function count_cells_value(){
	var inp = document.getElementsByName('r');
	for (var i = 0; i < inp.length; i++) {
		if (inp[i].type == "radio" && inp[i].checked) {
			return inp[i].value;
		}
	}
}

function set_onclick_divs(now_square){
	var new_check_two_cells = new check_two_cells();

	for(var i =0; i < now_square.childNodes.length; i ++){
		if(now_square.childNodes[i].nodeType == 1){

			now_square.childNodes[i].onclick = function(ellement){
				return function()
				{
					ellement.style.background = "white";
					new_check_two_cells.set_cell_action(ellement);
				};
			}(now_square.childNodes[i]);
		}
	}
}

function check_two_cells(){
	this.x = undefined;
	this.x_ = undefined;

	this.set_cell_action = function(ell)
	{
		if(this.x == undefined)
		{
			this.x = ell.innerHTML;
			this.x_ = ell.id;
		}
		else{
			if(this.y == undefined)
			{ 
				get(this.x_).innerHTML= ell.innerHTML;
				ell.innerHTML= this.x;

				get(this.x_).style.background = "#ADCDF3";
				ell.style.background = "#ADCDF3";

				this.x = undefined;
				this.x_ = undefined;
			}
		}
		verification_equation();
	};
}

function ser_random_arr(count_cells){
	var arr = [];
	for(var i= 0; i < count_cells; i++){
		var num = getRandomInt(0, count_cells-1);
		if(there_is_array(arr, num, count_cells)){
			arr.push(num);
		}
		else{
			i--;
		}
	}
	return arr;
}

function there_is_array(arr, num, count_cells){
	for(var i = 0; i < count_cells; i++)
	{
		if(arr[i]==num){
			return false;
		}
	}
	return true;
}

function create_extreme_points(number){
	this.count_zero = number/3;
	this.max_point = f_Max_point(this.count_zero);
	this.min_point = f_Min_point(this.max_point);
}

function f_Max_point(count_zero){
	var seed = 1;
	for(var i =0; i < count_zero; i ++){
		seed = seed*10;
	}
	return seed-1; 
}

function f_Min_point(max_point){
	return (max_point+1)/10;
}

function verification_equation(){

	var main_square = get("id3");
	var x = "";
	var y = "";
	var sum = "";
	for(var i =0; i < main_square.childNodes.length; i ++)
	{
		if(i < main_square.childNodes.length / 3){
			x += main_square.childNodes[i].innerHTML;
		}
		else{
			if(i >= main_square.childNodes.length / 3 && i < 2*(main_square.childNodes.length / 3)){
				y += main_square.childNodes[i].innerHTML;
			}
			else{
				sum += main_square.childNodes[i].innerHTML;
			}
		}
	}
	if(+x + +y == +sum){
		setTimeout(function()
		{
			alert("Правильное решение!!!"); 
			setTimeout(
				function (){
					set_start_innerHTML();
				} , 2000); 

		}, 100);
	}
}