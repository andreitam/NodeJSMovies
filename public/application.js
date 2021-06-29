class MyApplication {
    constructor(name) {
        this.name = name.name;
    }

    init() {
        console.log('Numele aplicatiei este: ' + this.name);
        this.getDirectors();
        // this.addEventListnerAddMovie();
        this. addEventListnerHideModal();
        this.addEventListnerRemoveMovie();
        this.addEventListnerEditInModal();  
        this.eventListnerClickDirectorRow();
    }

    getDirectors() {
        console.log('inside ajax call')
        $.ajax({
            url: `/director`,
            method: 'GET',
            success: (directors) => {
                //check json response is not error object, jquery ajax will execute success if server returns error object
                if(directors.length===0) {
                    return;
                }
                console.log('response', directors);
                //append row with movie data
                directors.forEach((element) => this.renderDirectorsRow(element));

            },
            error: () => {
                this.onError()
            }
        });
    }

    renderDirectorsRow(directors) {
        const {director_id, director_name, date_of_birth} = directors;  
        //convert sql date to string  
        const date = date_of_birth.toString().slice(0,10);                  
        $('#myTbodyDirectors').append(`<tr data-id="${director_id}">
                        <td>${director_name}</td>
                        <td>${date}</td>`
        );       
    }

    eventListnerClickDirectorRow() {
        let self = this;
        $('#myTableDirectors').on('click', 'tr',  function(event) {
            $('#myTbody').children('tr').remove();
            const id = $(this).attr('data-id');
            self.getMovie(id);
        });
    }

    getMovie(id) {
        $.ajax({
            url: `/director/${id}`,
            method: 'GET',
            success: (movies) => {
                console.log(movies);
                //check json response is not error object, jquery ajax will execute success if server returns error object
                if(movies.length === 0) {
                    return;
                }
                console.log('response', movies);
                //append row with movie data
                movies.forEach((element) => this.renderMovieRow(element));
            },
            error: () => {
                this.onError()
            }
        });
    }

    deleteMovie(id) {
        $.ajax({
            url: `/movies/${id}`,
            method: 'DELETE',
            success: () => {
                console.log('success delete request')
            },
            error: () => {
                this.onError()
            }
        });
    }

    editMovieInDb(array, id) {
        let data = {"title":$(array[0]).text(), 
        "released":$(array[1]).text(), 
        "actors":$(array[2]).text(), 
        "director":$(array[3]).text()};
        console.log(data);
        $.ajax({
            url: `/movies/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: () => {
                console.log('success put request')
            },
            error: () => {
                this.onError()
            }
        });
    }


    renderMovieRow(movie) {
        const {title, released, actors, poster, imdbID, imdbRating} = movie;
        //convert sql date to string    
        const date = released.toString().slice(0,10);                   
        $('#myTbody').append(`<tr data-id="${imdbID}">
                        <td>${title}</td>
                        <td>${date}</td>
                        <td>${actors}</td>
                        <td><img src="${poster}" class="imgPoster"></td>
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

    // addEventListnerAddMovie() {
    //     let self = this;
    //     console.log(this);
    //     $('#addMovie').on('click', function() {
    //         const inputTitle = $('#recipient-name').val();  
    //         console.log("click");         
    //         self.getMovie(inputTitle);//ajax call
    //         $("#exampleModal").modal('toggle');
    //     });
    // }

    addEventListnerHideModal() {
        $('#exampleModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        })
    }

    addEventListnerRemoveMovie() {
        let self = this;
        $('#myTable').on('click', '.removeRow', function(){
            let childrenArray1 = $(this).parent().closest('tr').children();
            const id = $('.removeRow').closest('tr').attr('data-id');
            console.log('id from remove', id);
            self.deleteMovie(id);
            $(this).parent().closest('tr').remove();
        }); 
    }

    addEventListnerEditInModal() {
        let self = this;
        $("#exampleModalEdit").on('show.bs.modal', function (event) {
            const button = $(event.relatedTarget); // Button that triggered the modal
            const row = button.closest('tr'); // selected row
            var childrenArray2 = row.children(); //returnarray form columns of selected row
            console.log('children array', childrenArray2);
            const id = button.closest('tr').attr('data-id');
            console.log('id from edit', id);
            self.fillUpdateModalInputs(childrenArray2);
            //write to row columns the modified/unmodified data
            $('#updateMovie').on('click', function() {
                self.updateRowWithInputsFromModal(childrenArray2, id);               
            });    
        }); 
    }

    fillUpdateModalInputs(childrenArray) {
        console.log(childrenArray);
        //fill input modal inputs
        $("#edit-title").val($(childrenArray[0]).text());  
        $("#edit-released").val($(childrenArray[1]).text());  
        $("#edit-actors").val($(childrenArray[2]).text());  
        // $("#edit-director").val($(childrenArray[3]).text()); 
    }

    updateRowWithInputsFromModal(childrenArray, id) {
        //update row data           
        childrenArray.eq(0).text($("#edit-title").val());
        console.log('in update',$("#edit-title").val());
        childrenArray.eq(1).text($("#edit-released").val());
        childrenArray.eq(2).text($("#edit-actors").val());
        // childrenArray.eq(3).text($("#edit-director").val());
        this.editMovieInDb(childrenArray,id);
        $("#exampleModalEdit").modal('toggle');
    }


}
