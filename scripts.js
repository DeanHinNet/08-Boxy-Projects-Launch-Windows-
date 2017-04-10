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
	['3','New',[]]
	
];

function addLinks(){
	var description = document.getElementById('item_description');
	var link = document.getElementById('item_link');

	var box_id = 2;
	var items = 2;
	links[box_id][items].push([description.value, link.value]);

	displayBoxes();
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
						 "<button class='button_edit'>Edit</button>" +
						 "<button class='button_launch'>Launch</button>" +
						 "<h2>" +links[i][1]+ "</h2>";
		for(var j=0; j<links[i][2].length; j++){
		//create each link
			boxes_display += "<a class='link_item' href='" + links[i][items_index][j][items_link]+ "' target='_blank'>"+links[i][items_index][j][items_name]+"</a>";
		}
		boxes_display += "</div>";
	}
	document.getElementById('boxes').innerHTML += boxes_display;
}

document.getElementById('button_add').addEventListener('click', addLinks);
displayBoxes();