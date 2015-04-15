var words = [];
var word_objects = [];
var grid_letter_objects = [];

var words_list_range = _.range(0, words.length);

var target = [];

var grid_letters;
var used_letters = [];

var grid_size = 20;



// var top_left_letter;
// var top_letter;
// var top_right_letter;
// var left_letter;
// var right_letter;
// var bottom_left_letter;
// var bottom_letter;
// var bottom_right_letter;



function start() {

	$("#run").click(function(event){

		grab_grid_letters();
		letter_obj_constructor(grid_letters);
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
				text = ''
				i++

			}

		};

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
			letters: letter_array

		})

	}

	return console.log(word_objects);

}

function letter_obj_constructor (list) {

	var i;
	var number_of_letters = grid_letters.length;

	for (var i = 0; i < number_of_letters; i++) {

		var text = list[i].toString();

		grid_letter_objects.push({

			position: i,
			letter: text,

			// top_left_letter: function () {

			// 	var top_left_search = (grid_letter_objects.position - 21);

			// 		if (top_left_search >= 0 || top_left_search <= 399) {

			// 			return grid_letter_objects[top_left_search].letter;

			// 		} else {

			// 			return "No top left letter";

			// 		};

			// }
			

		})

	}

}

function word_im_looking_for (n) {

	var word = words[(n)];

	searchableWord = _.toArray(word.split(''));

	target = searchableWord;

}

function directional_searches (n) {

	var grid_letter = grid_letter_objects[(n)];
	var grid_letter_position = grid_letter.position;

	var top_left_search = (grid_letter_position - 21);

	if (top_left_search >= 0 && top_left_search <= 399) {

		var top_left_letter = grid_letter_objects[top_left_search].letter;

	} else {

		var top_left_letter = "No top left letter";

	};

	var top_search = (grid_letter_position - 20);

	if (top_search >= 0 && top_search <= 399) {

		var top_letter = grid_letter_objects[top_search].letter;

	} else {

		var top_letter = "No top letter";

	};

	var top_right_search = (grid_letter_position - 19);

	if (top_right_search >= 0 && top_right_search <= 399) {

		var top_right_letter = grid_letter_objects[top_right_search].letter;

	} else {

		var top_right_letter = "No top right letter";

	};

	var left_search = (grid_letter_position - 1);

	if (left_search >= 0 && left_search <= 399) {

		var left_letter = grid_letter_objects[left_search].letter;

	} else {

		var left_letter = "No left letter";

	}

	var right_search = (grid_letter_position + 1);

	if (right_search >= 0 && right_search <= 399) {

		var right_letter = grid_letter_objects[right_search].letter;

	} else {

		var right_letter = "No right letter";

	}

	var bottom_left_search = (grid_letter_position + 19);

	if (bottom_left_search >= 0 && bottom_left_search <= 399) {

		var bottom_left_letter = grid_letter_objects[bottom_left_search].letter;

	} else {

		var bottom_left_letter = "No bottom left letter";

	}

	var bottom_search = (grid_letter_position + 20);

	if (bottom_search >= 0 && bottom_search <= 399) {

		var bottom_letter = grid_letter_objects[bottom_search].letter;

	} else {

		var bottom_letter = "No bottom letter";

	}

	var bottom_right_search = (grid_letter_position + 21);

	if (bottom_right_search >= 0 && bottom_right_search <= 399) {

		var bottom_right_letter = grid_letter_objects[bottom_right_search].letter;

	} else {

		var bottom_right_letter = "No bottom right letter";

	}

}

function search_for_word(word) {

	var wordStr = word.toString();
	var letters = _.toArray(wordStr);
	var first_letter = letters[0];
	var first_letter_matches = [];

		for (var i = 0; i < grid_letter_objects.length; i++) {

			if (first_letter == grid_letter_objects[(i)].letter) {

				first_letter_matches.push(grid_letter_objects[(i)]);

			}

		}

		for (var x = 0; x < first_letter_matches.length; x++) {

			var letter_position = first_letter_matches[(x)].position;

			var top_left_search = grid_letter_objects[letter_position - 21];
			var top_search = grid_letter_objects[(letter_position - 20)];
			var top_right_search = grid_letter_objects[(letter_position - 19)];
			var left_search = grid_letter_objects[(letter_position - 1)];
			var right_search = grid_letter_objects[(letter_position + 1)];
			var bottom_left_search = grid_letter_objects[(letter_position + 19)];
			var bottom_search = grid_letter_objects[(letter_position + 20)];
			var bottom_right_search = grid_letter_objects[(letter_position + 21)];

			var top_left_letter = top_left_search.letter;
			var top_letter = top_search.letter;
			var top_right_letter = top_right_search.letter;
			var left_letter = left_search.letter;
			var right_letter = right_search.letter;
			var bottom_left_letter = bottom_left_search.letter;
			var bottom_letter = bottom_search.letter;
			var bottom_right_letter = bottom_right_search.letter;



			if (bottom_letter == letters[1]) {
				console.log(bottom_letter);
			} else {

				console.log("did not match: " + bottom_letter);
			}

		}

}

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