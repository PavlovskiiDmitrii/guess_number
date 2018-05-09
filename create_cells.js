var get = function(id){
	return document.getElementById(id);
};

window.onload = function(){
	create_calls_and_add_in_parent();
};

function create_calls_and_add_in_parent(){
	var parent = get('id3');
	var now_count = count_cells_value();
	clear_parent_div(parent);

	for(var i =0; i < now_count ; i ++)
	{
		var newDiv = set_additional_properties(now_count, i);
		parent.appendChild(newDiv);
	}
}

function set_additional_properties(now_count, i){	
	var newDiv = document.createElement('div') ;
	newDiv.id = "new_div" + i;
	newDiv.className = "class1";
	newDiv.style.float =  "left";
	newDiv.innerHTML = "?";
	var dop_int;

	if(i == 0 || i == now_count/3 || i == 2*(now_count/3)){
		if(now_count == 9){
			dop_int = 25;
		}
		if(now_count == 12)
		{
			dop_int = 15;
		}
		
		var dop_str = dop_int + "%";
		newDiv.style.margin = "20px 20px 0px " + dop_str;
	}
	if(i == now_count/3 || i == 2*(now_count/3)){
		newDiv.style.clear =  "both";
	}

	return newDiv;
}

function count_cells_value(){
	var inp = document.getElementsByName('r');
	for (var i = 0; i < inp.length; i++) {
		if (inp[i].type == "radio" && inp[i].checked) {
			return inp[i].value;
		}
	}
}

function clear_parent_div(parent){
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}