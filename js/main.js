
/*
	Author: Meisam Koohaki
	Email Address: meisam.koohaki@gmail.com
*/

var movie = document.getElementById("movie_input");
var searchButton = document.getElementById("search_button");
var main = document.querySelector("main");
var h1 = document.getElementsByTagName('h1')[0];
var result_div = document.getElementById("searchResult");
var result = document.getElementById("result");

var title;
var typingTimer;              
var doneTypingInterval = 5000; 
var movies;

movie.addEventListener('keyup', function() {

	clearTimeout(typingTimer);
	var result_div = document.getElementById("searchResult");
	if(result_div){
		result_div.remove();
	}

	title = movie.value;
    if (title) {
        typingTimer = setTimeout(searching, doneTypingInterval);
    }
});

function searching() {
	const xhr = new XMLHttpRequest(),
		    method = "GET",
		    url = 'http://www.omdbapi.com/?s='+title+'&apikey=2bf3702a';;

	xhr.open(method, url, true);
	xhr.onreadystatechange = function () {

	  if(xhr.readyState === XMLHttpRequest.DONE) {
	    var status = xhr.status;

	    if (status === 0 || (status >= 200 && status < 400)) {

			movies = xhr.responseText;
	      	var responsePosition = movies.indexOf('{\"Response\":\"')+13;
      		var responseBody = movies.substring(responsePosition);
      		var responseEnd = responseBody.indexOf('\"');
      		var response = responseBody.substring(0, responseEnd);

			if(response != 'False') {
				searchResult(title, movies);
			} else {
				h1.innerHTML = 'There was not result for this search';
			}

	    } else {
	      h1.innerHTML = 'Something went wrong!';
	    }
	  }
	};
	xhr.send();
}

function searchResult(title, movies) {

	h1.innerHTML = '';
	var result = document.getElementById("result");
	let div2 = document.createElement('div');	
	var div4 = document.createElement('div');

	if(result == null) {
		let div1 = document.createElement('div');
		var div_nominate = main.appendChild(div1);
		div_nominate.setAttribute('id', 'result');

		var div_nomination = div_nominate.appendChild(div2);
		let div_result = div_nominate.appendChild(div4);

		div_result.setAttribute('id', 'div_result');

	} else {
		var div_nomination = result.appendChild(div2);
		let div_result = result.appendChild(div4);
		div_result.setAttribute('id', 'div_result');
	}

	let ul = document.createElement('ul');	

    var new_p = document.createElement('p');
	let result_p = div_nomination.appendChild(new_p);
	result_p.innerHTML = 'The result of \"' + title + '\"';
	result_p.style.font = '1.3em';
	result_p.style.width = '100%';
	result_p.style.textAlign = 'center';
	result_p.style.textTransform = 'uppercase';
	result_p.style.color = 'darkblue';
	result_p.style.padding = '50px';
	result_p.style.fontWeight = '700';

	var ul_nomination = div_nomination.appendChild(ul);

	div_nomination.setAttribute('id', 'searchResult');

	div_nomination.style.position = 'relative';
	div_nomination.style.marginTop = '200px';
	div_nomination.style.padding = '25px';
	div_nomination.style.backgroundColor = '#74d69b';
	div_nomination.style.borderRadius = '25px';
	div_nomination.style.width = '75%';
	div_nomination.style.marginLeft = '10%';

	var startBody = movies.indexOf("{\"Search\":[");
	var endBody = movies.indexOf("],\"totalResults\":");
	var body = movies.substring(startBody+11, endBody);

	const lines = body.split(',{');	

	for(var i = 0; i < lines.length; i++) {

		var line = lines[i];
		var li = document.createElement('li');
		var div3 = document.createElement('div');
		var button = document.createElement('button');
		var img = document.createElement('img');

		var titlePosition = line.indexOf("\"Title\":\"")+9;
		var titlePositionBody = line.substring(titlePosition);
		var titlePositionEnd = titlePositionBody.indexOf("\"");
		var title = titlePositionBody.substring(0, titlePositionEnd);

		var yearPosition = line.indexOf("\"Year\":\"")+8;
		var yearPositionBody = line.substring(yearPosition);
		var yearPositionEnd = yearPositionBody.indexOf("\"");
		var year = yearPositionBody.substring(0, yearPositionEnd);

		var posterPosition = line.indexOf("\"Poster\":\"")+10;
		var posterPositionBody = line.substring(posterPosition);
		var posterPositionEnd = posterPositionBody.indexOf("\"");
		var poster = posterPositionBody.substring(0, posterPositionEnd);

		li.textContent = title+" ("+year+")";

		li.setAttribute('id', 'lNo-' + i);
		li.classList.add("liClass");
		let div_list = ul_nomination.appendChild(div3);
		
		div_list.style.padding = '20px';
		div_list.style.width = '100%';

		div_list.appendChild(li);

		li.style.marginLeft = '5%';

		var inputButton = div_list.appendChild(button);

		inputButton.classList.add("liClass");
		inputButton.setAttribute('type', 'submit');
		inputButton.setAttribute('id', 'bNo-' + i);
		inputButton.textContent = 'save';
		inputButton.style.width = '12%';
	    inputButton.style.height = '35px';
	    inputButton.style.textAlign = 'center';
	    inputButton.style.display = 'inline-block';
	    inputButton.style.padding = '0.3em 1.2em';
	    inputButton.style.boxSizing = 'border-box';
	    inputButton.style.textDecoration = 'none';
	    inputButton.style.fontFamily = 'Roboto,sans-serif';
	    inputButton.style.fontWeight = '300';
	    inputButton.style.color = '#FFFFFF';
	    inputButton.style.backgroundColor = '#FF1493';
	    inputButton.style.transition = 'all 0.2s';
	    inputButton.style.border = '3px solid #C71585';
	    inputButton.style.fontSize = '18px';
	    inputButton.style.textTransform = 'uppercase';
	    inputButton.style.marginLeft = '4%';
	    inputButton.style.marginTop = '-5px';
	    inputButton.style.borderRadius = '10px';

	    var allMovies = [];

	    inputButton.onclick = function() {

	    	var listId = 'lNo-'+this.id.substring(4);
			var list_dominated = document.getElementById(listId);
			var buttonClicked = document.getElementById(this.id);

	    	var duplicate = false;

	    	allMovies.forEach(function(movie) {

	    		if(movie == list_dominated.innerHTML) {
	    			duplicate = true;
	    		}
    		});

    		if(!duplicate && allMovies.length < 5) {
	    		var div_result = document.getElementById('div_result');
	    		var new_ul = document.createElement('ul');
				var result_ul_new = document.getElementById("result_ul_new");
	    		var new_div = document.createElement('div');
	    		var newP = document.createElement('p');
				var p_new = document.getElementById("p_new");

				if(p_new == null) {
					let resultP = div_result.appendChild(newP);
					resultP.setAttribute('id', 'p_new');
					resultP.innerHTML = 'Dominated movies';
					resultP.style.font = '1.3em';
					resultP.style.width = '100%';
					resultP.style.textAlign = 'center';
					resultP.style.textTransform = 'uppercase';
					resultP.style.color = 'purple';
					resultP.style.padding = '50px';
					resultP.style.fontWeight = '700';
				}

	    		if(result_ul_new == null) {
					let result_ul = div_result.appendChild(new_ul);
					result_ul.setAttribute('id', 'result_ul_new');
					result_ul.style.width = '100%';
					result_ul.style.padding = '20px';
					var new_div_result = result_ul.appendChild(new_div);
				} else {
					var new_div_result = result_ul_new.appendChild(new_div);
				}

				div_result.style.position = 'relative';
				div_result.style.marginTop = '200px';
				div_result.style.padding = '25px';
				div_result.style.backgroundColor = '#74d69b';
				div_result.style.borderRadius = '25px';
				div_result.style.width = '75%';
				div_result.style.marginLeft = '10%';

				new_div_result.style.padding = '20px';
				new_div_result.setAttribute('id', 'divNo-'+this.id.substring(4));

				var li1 = document.createElement('li');
				let result_li = new_div_result.appendChild(li1);
				var new_button = document.createElement('button');
				var deleteButton = new_div_result.appendChild(new_button);

				deleteButton.classList.add("savedClass");
				deleteButton.setAttribute('type', 'submit');
				deleteButton.setAttribute('id', 'dbNo-' + this.id.substring(4));
				deleteButton.textContent = 'delete';
				deleteButton.style.width = '12%';
			    deleteButton.style.height = '35px';
			    deleteButton.style.textAlign = 'center';
			    deleteButton.style.display = 'inline-block';
			    deleteButton.style.padding = '0.3em 1.2em';
			    deleteButton.style.boxSizing = 'border-box';
			    deleteButton.style.textDecoration = 'none';
			    deleteButton.style.fontFamily = 'Roboto,sans-serif';
			    deleteButton.style.fontWeight = '300';
			    deleteButton.style.color = '#FFFFFF';
			    deleteButton.style.backgroundColor = 'red';
			    deleteButton.style.transition = 'all 0.2s';
			    deleteButton.style.border = '3px solid red';
			    deleteButton.style.fontSize = '18px';
			    deleteButton.style.textTransform = 'uppercase';
			    deleteButton.style.marginLeft = '4%';
			    deleteButton.style.marginTop = '-5px';
			    deleteButton.style.borderRadius = '10px';

				result_li.textContent = list_dominated.innerHTML;
				result_li.setAttribute('id', 'mLiNo-'+this.id.substring(4));
				result_li.classList.add("savedClass");

				var savedListClass = document.getElementsByClassName('savedClass');

				for(var j=0; j<savedListClass.length; j++) { 
					savedListClass[j].style.float = 'left';
					savedListClass[j].style.marginRight = '20px';
				}

		    	var imgId = 'imgNo-'+this.id.substring(4);
				var image_dominated = document.getElementById(imgId);
				var newImg = document.createElement('img');
				newImg.src = image_dominated.src;
				if(poster != 'N/A') {
					var newImage = new_div_result.appendChild(newImg);
					newImage.style.width = '150px';
				}

				allMovies.push(list_dominated.innerHTML);

				buttonClicked.style.backgroundColor = 'white';
				buttonClicked.style.color = '#FF1493';
				buttonClicked.innerHTML = 'Saved';

				if(allMovies.length == 5) {
					h1.innerHTML = 'The number of movies are 5';
					h1.style.backgroundColor = 'red';
					h1.style.color = 'white';
				}

			    deleteButton.addEventListener('mouseenter', function() {

					var deleteButtonClicked = document.getElementById(this.id);
				    deleteButtonClicked.style.backgroundColor = 'white';
				    deleteButtonClicked.style.color = 'red';
		    		deleteButtonClicked.style.fontWeight = 'bold';
			  	});

				deleteButton.addEventListener('mouseleave', function() {

					var deleteButtonClicked = document.getElementById(this.id);
				    deleteButtonClicked.style.backgroundColor = 'red';
				    deleteButtonClicked.style.color = 'white';
		    		deleteButtonClicked.style.fontWeight = '300';
		  		});

				deleteButton.addEventListener('click', function() {

					var deleteDivId = document.getElementById('divNo-'+this.id.substring(5));
				    var movieTitleDeleted = document.getElementById('mLiNo-'+this.id.substring(5));
				  	console.log('movieTitleDeleted.textContent', movieTitleDeleted.textContent);
				    const indexMovie = allMovies.indexOf(movieTitleDeleted.textContent);
				    if (indexMovie > -1) {
					  allMovies.splice(indexMovie, 1);
					}
				    deleteDivId.remove();

			    	if(allMovies.length == 0) {
			    		var romovedDivResult = document.getElementById('div_result');

			    	}

			    	console.log('dbNo-+this.id.substring(5)       ', 'dbNo-'+this.id.substring(5));
	    			var buttonClickedRefresh = document.getElementById('dbNo-'+this.id.substring(5));
					buttonClicked.style.color = 'white';
					buttonClicked.innerHTML = 'Save';
				    buttonClicked.style.backgroundColor = '#FF1493';
					buttonClicked.style.fontWeight = '300';
		  		});
			} else if(duplicate) {
				h1.innerHTML = 'The movie already is exists';
			} 
	    };

	    inputButton.addEventListener('mouseenter', function() {
			var buttonClicked = document.getElementById(this.id);
			if(buttonClicked.innerHTML != 'Saved') {
			    buttonClicked.style.backgroundColor = '#C71585';
	    		buttonClicked.style.fontWeight = 'bold';
	    	}
	  	});

		inputButton.addEventListener('mouseleave', function() {
			var buttonClicked = document.getElementById(this.id);
			if(buttonClicked.innerHTML != 'Saved') {
			    buttonClicked.style.backgroundColor = '#FF1493';
	    		buttonClicked.style.fontWeight = '300';
	    	}
  		});

		img.src = poster;
		if(poster != 'N/A') {
			var image = div_list.appendChild(img);
			image.style.width = '150px';
			image.setAttribute('id', 'imgNo-'+i)
		}

		var listClass = document.getElementsByClassName('liClass');

		for(var j=0; j<listClass.length; j++) { 
			listClass[j].style.float = 'left';
			listClass[j].style.marginRight = '20px';
		}
	};
}

function remove() {

	if(result_div){
		result_div.remove();
	}
}





