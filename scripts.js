//https://developer.chrome.com/extensions/tabs
var links = [
	['1','Typing', 
		[
			['Typing Sentences', 'http://www.freetypinggame.net/free-typing-test.asp'],
			['Dvorak','https://powertyping.com/dvorak/dvorakL.html'],
			['Program Typing','https://typing.io/']
		]
	],
	['2','Stocks', 
		[
			['WSJ', 'http://www.wsj.com'],
			['Google Finance','https://www.google.com/finance?q=tsla&ei=yX_pWMm6OMax2AbE2IPgCw'],
			['TheStreet','https://www.thestreet.com/quote/TSLA.html']
		]
	],
	['3','New',[]],

	['4','Office', 
		[
			['Google Calendar','https://calendar.google.com/calendar/render#main_7%7Cweek'],
			['Gmail', 'http://www.gmail.com'],
			['Voice', 'http://voice.google.com']

		]
	]
];

function launchChrome(box_index){
	var links_index = 2;
	var link_address = 1;

	for(var i=0; i<links[box_index][links_index].length; i++){
		console.log(links[box_index][links_index][i][link_address]);
		chrome.tabs.create(
			{
				url: links[box_index][links_index][i][link_address]
			}
		);
	}
}

function launchWindow(box_index){
	var links_index = 2;
	var link_address = 1;
	
	for(var i=0; i<links[box_index][links_index].length; i++){
		window.open(links[box_index][links_index][i][link_address]);
	}
}

function launchTest(box_index){
	var links_index = 2;
	var link_address = 1;

	window.open(links[box_index][links_index][0][link_address],"_blank", "height=200, width=200");
}

function addLinks(){
	var description = document.getElementById('item_description');
	var link = document.getElementById('item_link');

	var box_id = 2;
	var items = 2;
	links[box_id][items].push([description.value, link.value]);

	displayBoxes();
}

function hideAllInputs(){
	var boxes = document.getElementById('boxes');
	var all_inputs = boxes.getElementsByTagName('input');
	var all_saves = boxes.getElementsByClassName('button_save');

	if(!document.getElementById('add_item').classList.contains('hide_add')){
		document.getElementById('add_item').classList.toggle("hide_add");
	}
	for(var i=0; i<all_saves.length; i++){
		if(!all_saves[i].classList.contains('hide_edit')){
			all_saves[i].classList.add('hide_edit');
		}
	}

	for(var i=0; i< all_inputs.length; i++){
		if(!all_inputs[i].classList.contains('hide_edit')){
			all_inputs[i].classList.toggle('hide_edit');
		}
	}

}

function editItems(box_id){
	var box = document.getElementById(box_id);
	var inputs = box.getElementsByTagName('input')
	hideAllInputs();
	
	document.getElementById('add_item').classList.toggle('hide_add');

	//Hide all other inputs

	for(var i=0; i<inputs.length; i++){
		inputs[i].classList.toggle("hide_edit");
	}
	console.log(box.getElementsByClassName('button_save')[0].classList.toggle('hide_edit'));
}

function saveEdits(box_id){
	//Save all items to array
	hideAllInputs();
}

function displayBoxes(){
	document.getElementById('boxes').innerHTML = "";

	var boxes_display = '';
	var box_id = 0;
	var items_index = 2; //array index for the name+links
	var items_name = 0;
	var items_link = 1;
	
	for(var i=0; i<links.length; i++){
	//create each box
		boxes_display += "<div class='box' id='" + links[i][box_id] + "'>"+
						 "<button class='button_edit' onclick='editItems("+ (i+1) +")'>Edit</button>" +
						 "<button class='button_launch' onclick='launchWindow(" + i +")'>Launch</button>" +
						 "<h2>" +links[i][1]+ "</h2>";
		for(var j=0; j<links[i][2].length; j++){
		//create each link
			boxes_display += "<a class='link_item' href='" + links[i][items_index][j][items_link]+ "' target='_blank'>"+links[i][items_index][j][items_name]+"</a>";
			boxes_display += "<input class='hide_edit' type='text' value='"+links[i][items_index][j][items_name]+"' name='" +j+ "'>";
			boxes_display += "<input class='hide_edit' type='text' value='"+links[i][items_index][j][items_link]+"' name='" +j+ "'>";
		}
		boxes_display += "<button class='button_save hide_edit' onclick='saveEdits("+links[i][box_id]+")'>Save</button>";
		boxes_display += "</div>";
	}
	document.getElementById('boxes').innerHTML += boxes_display;
}

document.getElementById('button_add').addEventListener('click', addLinks);
displayBoxes();
