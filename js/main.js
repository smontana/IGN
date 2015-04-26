var words = [];
var word_objects = [];
var grid_letter_objects = [];

var words_list_range = _.range(0, words.length);

var target = [];

var grid_letters;
var used_letters = [];

var grid_size = 20;


function start() {

	$("#run").click(function(event){

		grab_grid_letters();
		// letter_obj_constructor(grid_letters);
		grabWords();
		word_obj_constructor(words);
		build_grid( grid_size );

	})

}

function grab_grid_letters () {

	var letters = $.trim($('pre').text());
	var exclude_spaces = /\S/g;
	var letters_noSpaces = letters.match(exclude_spaces);
	var letters_to_array = _.toArray(letters_noSpaces);

	grid_letters = letters_to_array;

}

function build_grid (size) {

	var text = "";
	var x;
	var y;
	var i=0;
	var all_letters = grid_letters;

	var cell_dimension = 100 / grid_size;

		for(y = 1; y <= grid_size; y++) {

			for(x = 1; x <= grid_size; x++) {

				var z = grid_letters[i];
				var z_string = z.toString();

				text += '<div data-x="' + x + '"' + ' data-y="' + y + '"' + ' class="grid-cell">' + z_string + '</div>';
				new_cell = $(text)
				new_cell.css('width', cell_dimension.toString() + '%');
				new_cell.css('height', cell_dimension.toString() + '%');
				$('#grid').append(new_cell);

				grid_letter_objects.push({

					position: i,
					letter: z_string,
					x_cooridinate: x,
					y_cooridinate: y,

					neighbors: [],

					look_for_top_left_letter: function(){
						var current_x = this.x_cooridinate;
						var current_y = this.y_cooridinate;
						var new_x = current_x - 1;
						var new_y = current_y - 1;

						match = _.findWhere(grid_letter_objects, {x_cooridinate: new_x, y_cooridinate: new_y});

						if (_.isUndefined(match)) {

							return neighbors.push("No top-left letter");

						} else {

							return neighbors.push(match);

						}

					},

					look_for_top_letter: function(){
						var current_x = this.x_cooridinate;
						var current_y = this.y_cooridinate;
						var new_y = current_y - 1;

						match = _.findWhere(grid_letter_objects, {x_cooridinate: current_x, y_cooridinate: new_y});

						if (_.isUndefined(match)) {

							return neighbors.push("No top letter");

						} else {

							return neighbors.push(match);

						}

					},

					look_for_top_right_letter: function(){
						var current_x = this.x_cooridinate;
						var current_y = this.y_cooridinate;
						var new_x = current_x + 1;
						var new_y = current_y + 1;

						match = _.findWhere(grid_letter_objects, {x_cooridinate: new_x, y_cooridinate: new_y});

						if (_.isUndefined(match)) {

							return neighbors.push("No top-right letter");

						} else {

							return neighbors.push(match);

						}

					},

					look_for_left_letter: function(){
						var current_x = this.x_cooridinate;
						var current_y = this.y_cooridinate;
						var new_x = current_x - 1;

						match = _.findWhere(grid_letter_objects, {x_cooridinate: new_x, y_cooridinate: current_y});

						if (_.isUndefined(match)) {

							return neighbors.push("No left letter");

						} else {

							return neighbors.push(match);

						}

					},

					look_for_right_letter: function(){
						var current_x = this.x_cooridinate;
						var current_y = this.y_cooridinate;
						var new_x = current_x + 1;

						match = _.findWhere(grid_letter_objects, {x_cooridinate: new_x, y_cooridinate: current_y});

						if (_.isUndefined(match)) {

							return neighbors.push("No right letter");

						} else {

							return neighbors.push(match);

						}

					},

					look_for_bottom_left_letter: function(){
						var current_x = this.x_cooridinate;
						var current_y = this.y_cooridinate;
						var new_x = current_x - 1;
						var new_y = current_y + 1;

						match = _.findWhere(grid_letter_objects, {x_cooridinate: new_x, y_cooridinate: new_y});

						if (_.isUndefined(match)) {

							return neighbors.push("No bottom-left letter");

						} else {

							return neighbors.push(match);

						}

					},

					look_for_bottom_letter: function(){
						var current_x = this.x_cooridinate;
						var current_y = this.y_cooridinate;
						var new_y = current_y + 1;

						match = _.findWhere(grid_letter_objects, {x_cooridinate: current_x, y_cooridinate: new_y});

						if (_.isUndefined(match)) {

							return neighbors.push("No bottom letter");

						} else {

							return neighbors.push(match);

						}

					},

					look_for_bottom_right_letter: function(){
						var current_x = this.x_cooridinate;
						var current_y = this.y_cooridinate;
						var new_x = current_x + 1;
						var new_y = current_y + 1;

						match = _.findWhere(grid_letter_objects, {x_cooridinate: new_x, y_cooridinate: new_y});

						if (_.isUndefined(match)) {

							return neighbors.push("No bottom-right letter");

						} else {

							return neighbors.push(match);
							
						}
					}



				})

				text = ''
				i++

			}

		}

}

function grabWords () {

	find_words = $(".word-search-words li").map(function() {

		if( $(this).text() !== 'Words' ) {

			words.push( $(this).text() );

		}

	});

}

function word_obj_constructor (list) {

	var i;
	var number_of_words = list.length;
	
	for (var i = 0; i < number_of_words; i++) {

		var text = jQuery.trim(list[i].toString());
		var letter_array = _.toArray(text.split(''));

		word_objects.push({

			name: text,
			position: i,
			found: false,
			letters: letter_array,
			first_letter: letter_array[0],
			last_letter: letter_array[letter_array.length - 1]

		})

	}

	return console.log(word_objects);

}

function find_word(word) {

	var letters = _.toArray(jQuery.trim(word));
	var letters_length = word.length;
	var letter_matches = [];

	for (i=0; i < letters_length; i++) {

		var letter_im_looking_for = letters[(i)];

		matches = _.where(grid_letter_objects, {letter: letter_im_looking_for});

		letter_matches.push(matches);

	}


}












// function letter_obj_constructor (list) {

// 	var i;
// 	var number_of_letters = grid_letters.length;

// 	for (var i = 0; i < number_of_letters; i++) {

// 		var text = list[i].toString();

// 		grid_letter_objects.push({

// 			x_cooridinate: i,
// 			y_cooridinate: i,
// 			letter: text,
// 			neighbors: []
			
// 		})

// 	}

// 	add_neighbors(grid_letter_objects);

// }

// function add_neighbors(grid) {

// 	for (i=0; i<grid.length; i++) {
// 		var obj = grid[(i)];
// 		var obj_x = obj.x_cooridinate;
// 		var obj_y = obj.y_cooridinate;

// 		debugger;

// 		var top_left_x = obj_x - 1;
// 		var top_left_y = obj_y - 1;

// 		var top_x = obj_x;
// 		var top_y = obj_y - 1;

// 		var top_right_x = obj_x + 1;
// 		var top_right_y = obj_y + 1;

// 		var left_x = obj_x - 1;
// 		var left_y = obj_y;

// 		var right_x = obj_x + 1;
// 		var right_y = obj_y;

// 		var bottom_left_x = obj_x - 1;
// 		var bottom_left_y = obj_y - 1;

// 		var bottom_x = obj_x;
// 		var bottom_y = obj_y + 1;

// 		var bottom_right_x = obj_x + 1;
// 		var bottom_right_y = obj_y + 1;

// 		if (top_left_x >= 1 && top_left_x <= grid.length && top_left_y >= 1 && top_left_y <= grid.length ) {

// 			neighbors.push(grid_letter_objects[top_left]);

// 		}

// 		if (top >= 0 && top <= grid.length) {

// 			neighbors.push(grid_letter_objects[top]);

// 		}

// 		if (top_right >= 0 && top_right <= grid.length) {

// 			neighbors.push(grid_letter_objects[top_right]);

// 		}

// 		if (left >= 0 && left <= grid.length) {

// 			neighbors.push(grid_letter_objects[left]);

// 		}

// 		if (right >= 0 && right <= grid.length) {

// 			neighbors.push(grid_letter_objects[right]);

// 		}

// 		if (bottom_left >= 0 && bottom_left <= grid.length) {

// 			neighbors.push(grid_letter_objects[bottom_left]);

// 		}

// 		if (bottom >= 0 && bottom <= grid.length) {

// 			neighbors.push(grid_letter_objects[bottom]);

// 		}

// 		if (bottom_right >= 0 && bottom_right <= grid.length) {

// 			neighbors.push(grid_letter_objects[bottom_right]);

// 		}

// 	}

// }

// function word_im_looking_for (n) {

// 	var word = words[(n)];

// 	searchableWord = _.toArray(word.split(''));

// 	target = searchableWord;

// }

// function directional_searches (n) {

// 	var grid_letter = grid_letter_objects[(n)];
// 	var grid_letter_position = grid_letter.position;

// 	var top_left_search = (grid_letter_position - 21);

// 	if (top_left_search >= 0 && top_left_search <= 399) {

// 		var top_left_letter = grid_letter_objects[top_left_search].letter;
// 		neighbors.push(grid_letter_objects[top_left_search])

// 	} else {

// 		var top_left_letter = "No top left letter";

// 	};

// 	var top_search = (grid_letter_position - 20);

// 	if (top_search >= 0 && top_search <= 399) {

// 		var top_letter = grid_letter_objects[top_search].letter;

// 	} else {

// 		var top_letter = "No top letter";

// 	};

// 	var top_right_search = (grid_letter_position - 19);

// 	if (top_right_search >= 0 && top_right_search <= 399) {

// 		var top_right_letter = grid_letter_objects[top_right_search].letter;

// 	} else {

// 		var top_right_letter = "No top right letter";

// 	};

// 	var left_search = (grid_letter_position - 1);

// 	if (left_search >= 0 && left_search <= 399) {

// 		var left_letter = grid_letter_objects[left_search].letter;

// 	} else {

// 		var left_letter = "No left letter";

// 	}

// 	var right_search = (grid_letter_position + 1);

// 	if (right_search >= 0 && right_search <= 399) {

// 		var right_letter = grid_letter_objects[right_search].letter;

// 	} else {

// 		var right_letter = "No right letter";

// 	}

// 	var bottom_left_search = (grid_letter_position + 19);

// 	if (bottom_left_search >= 0 && bottom_left_search <= 399) {

// 		var bottom_left_letter = grid_letter_objects[bottom_left_search].letter;

// 	} else {

// 		var bottom_left_letter = "No bottom left letter";

// 	}

// 	var bottom_search = (grid_letter_position + 20);

// 	if (bottom_search >= 0 && bottom_search <= 399) {

// 		var bottom_letter = grid_letter_objects[bottom_search].letter;

// 	} else {

// 		var bottom_letter = "No bottom letter";

// 	}

// 	var bottom_right_search = (grid_letter_position + 21);

// 	if (bottom_right_search >= 0 && bottom_right_search <= 399) {

// 		var bottom_right_letter = grid_letter_objects[bottom_right_search].letter;

// 	} else {

// 		var bottom_right_letter = "No bottom right letter";

// 	}

// }

// function search_for_word(word) {

// 	var wordStr = word.toString();
// 	var letters = _.toArray(wordStr);
// 	var first_letter = letters[0];
// 	var lastLetter = letters.length;
// 	var last_letter = letters[lastLetter];
// 	var first_letter_matches = [];
// 	var last_letter_matches = [];
// 	var found_word = [];

// 	top_search = for (i=0; i < first_letter_matches.length; i++) {
		
// 		if (first_letter_matches[(i)].position - 20 


// 	_.findindex(letters, )

// 		for (var i = 0; i < grid_letter_objects.length; i++) {

// 			if (first_letter == grid_letter_objects[(i)].letter) {

// 				first_letter_matches.push(grid_letter_objects[(i)]);

// 			} else if (last_letter == grid_letter_objects[(i)].letter) {

// 				last_letter_matches.push(grid_letter_objects[(i)]);

// 			}

// 		}

		

// 	}














			// var top_search = grid_letter_objects[(position - 20)];
			// var top_right_search = grid_letter_objects[(position - 19)];
			// var left_search = grid_letter_objects[(position - 1)];
			// var right_search = grid_letter_objects[(position + 1)];
			// var bottom_left_search = grid_letter_objects[(position + 19)];
			// var bottom_search = grid_letter_objects[(position + 20)];
			// var bottom_right_search = grid_letter_objects[(position + 21)];

			
			// var top_letter = top_search.letter;
			// var top_right_letter = top_right_search.letter;
			// var left_letter = left_search.letter;
			// var right_letter = right_search.letter;
			// var bottom_left_letter = bottom_left_search.letter;
			// var bottom_letter = bottom_search.letter;
			// var bottom_right_letter = bottom_right_search.letter;


// 		for (var x = 1; x < first_letter_matches.length; x++) {

// 			var selection = first_letter_matches[(x)];
// 			var letter_position = first_letter_matches[(x)].position;
// 			var letter_letter = first_letter_matches[(x)].letter;

// 			var top_left_search = grid_letter_objects[letter_position - 21];
// 			var top_search = grid_letter_objects[(letter_position - 20)];
// 			var top_right_search = grid_letter_objects[(letter_position - 19)];
// 			var left_search = grid_letter_objects[(letter_position - 1)];
// 			var right_search = grid_letter_objects[(letter_position + 1)];
// 			var bottom_left_search = grid_letter_objects[(letter_position + 19)];
// 			var bottom_search = grid_letter_objects[(letter_position + 20)];
// 			var bottom_right_search = grid_letter_objects[(letter_position + 21)];

// 			var top_left_letter = top_left_search.letter;
// 			var top_letter = top_search.letter;
// 			var top_right_letter = top_right_search.letter;
// 			var left_letter = left_search.letter;
// 			var right_letter = right_search.letter;
// 			var bottom_left_letter = bottom_left_search.letter;
// 			var bottom_letter = bottom_search.letter;
// 			var bottom_right_letter = bottom_right_search.letter;



// 			if (top_left_letter == letter_letter) {

// 				second_letter_matches.push(top_left_search);

// 			} else if (top_letter == letter_letter) {

// 				sec
// 			}

// 		}

// }

// function search_for_word(word) {

// 	var wordStr = word.toString();
// 	var letters = _.toArray(wordStr);
// 	var first_letter = letters[0];

// 	var first_letter_matches = [];
// 	var second_letter_matches = [];

// 		for (var i = 0; i < grid_letter_objects.length; i++) {

// 			if (first_letter == grid_letter_objects[(i)].letter) {

// 				first_letter_matches.push(grid_letter_objects[(i)]);

// 			}

// 		}

// 		for (var x = 0; x < first_letter_matches.length; x++) {

// 			var letter_position = first_letter_matches[(x)].position;

// 			directional_searches(letter_position)
// 			debugger;
// 			if (letters[1] == top_left_letter || letters[1] == top_letter || letters[1] == top_left_letter || letters[1] == left_letter || letters[1] == right_letter || letters[1] == bottom_left_letter || letters[1] == bottom_letter || letters[1] == bottom_right_letter) {

// 				second_letter_matches.push(first_letter_matches[(x)]);

// 			}

// 		}

// 	}