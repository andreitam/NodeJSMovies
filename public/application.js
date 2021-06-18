class MyApplication {
    constructor(name) {
        this.name = name.name;
    }

    init() {
        console.log('Numele aplicatiei este: ' + this.name);
        this.addEventListnerAddMovie();
        this. addEventListnerHideModal();
        this.addEventListnerRemoveMovie();
        this.addEventListnerEditInModal();  
    }

    getMovie(movieName) {
        $.ajax({
            // url: 'https://www.omdbapi.com/?t='+movieName+'&apikey=d5e2f2b',
            url: '/getMovies',
            data: {"name" : movieName},
            method: 'GET',
            success: (movie) => {
                //check json response is not error object, jquery ajax will execute success if server returns error object
                if(!movie.hasOwnProperty('Title')) {
                    return;
                }
                console.log('response', movie);
                console.log(this);
                //append row with movie data
                this.renderMovieRow(movie);
            },
            error: () => {
                this.onError()
            }
        });
    }

    onError() {
        console.error('Error getting resources');
    }

    renderMovieRow(movie) {
        const {Title, Released, Actors, Director, Poster, imdbID, imdbRating} = movie;                      
        $('#myTbody').append(`<tr>
                        <td>${Title}</td>
                        <td>${Released}</td>
                        <td>${Actors}</td>
                        <td>${Director}</td>
                        <td><img src="${Poster}" class="imgPoster"></td>
                        <td><a href="https://www.imdb.com/title/${imdbID}/" target="_blank">Link</a></td>
                        ${this.addStarRating(imdbRating)}
                        <td><button type="button" class="btn btn-secondary grey removeRow">Remove</button></td>
                        <td><button type="button" class="btn btn-secondary grey editRow" data-bs-toggle="modal" data-bs-target="#exampleModalEdit">Edit</button></td>`
        );       
    }

    addStarRating(rating) {
        console.log(rating);
        let toAppend = '<td>';
        for (let i = 0; i < Math.ceil(rating / 2); i++) {
            toAppend += '<span class="fa fa-star checked star-size"></span>';
        };
        for (let j = 0; j < 5 - Math.ceil(rating / 2); j++ ) {
            toAppend += '<span class="fa fa-star star-size"></span>';
        };
        toAppend += '</td>';
        console.log(toAppend);
        return toAppend;         
    }

    addEventListnerAddMovie() {
        let self = this;
        console.log(this);
        $('#addMovie').on('click', function() {
            const inputTitle = $('#recipient-name').val();  
            console.log("click");         
            self.getMovie(inputTitle);//ajax call
            $("#exampleModal").modal('toggle');
        });
    }

    addEventListnerHideModal() {
        $('#exampleModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        })
    }

    addEventListnerRemoveMovie() {
        $('#myTable').on('click', '.removeRow', function(){
        $(this).parent().closest('tr').remove();
        }); 
    }

    addEventListnerEditInModal() {
        let self = this;
        console.log(self);
        $("#exampleModalEdit").on('show.bs.modal', function (event) {
            const button = $(event.relatedTarget); // Button that triggered the modal
            const row = button.closest('tr'); // selected row
            let childrenArray = row.children(); //returnarray form columns of selected row
            console.log(childrenArray);
            self.fillUpdateModalInputs(childrenArray);
            //write to row columns the modified/unmodified data
            $('#updateMovie').on('click', function() {
                self.updateRowWithInputsFromModal(childrenArray);
            });    
        }); 
    }

    fillUpdateModalInputs(childrenArray) {
        //fill input modal inputs
        $("#edit-title").val($(childrenArray[0]).text());  
        $("#edit-released").val($(childrenArray[1]).text());  
        $("#edit-actors").val($(childrenArray[2]).text());  
        $("#edit-director").val($(childrenArray[3]).text()); 
    }

    updateRowWithInputsFromModal(childrenArray) {
        //update row data           
        childrenArray.eq(0).text($("#edit-title").val());
        childrenArray.eq(1).text($("#edit-released").val());
        childrenArray.eq(2).text($("#edit-actors").val());
        childrenArray.eq(3).text($("#edit-director").val());
        $("#exampleModalEdit").modal('toggle');
    }


}
