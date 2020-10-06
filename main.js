$(document).ready(function(){
    const older_notes= $('.older_notes');
    const new_note_header= $('#new_note_header_text');
    const new_note_text = $('#new_note_text');
    const btn_new = $('#btn-new');
    const btn_save= $('#btn-save');
    const btn_update= $('#btn-update');

    let note_id;
    //this fucntion will clear input and textarea field, in case the user wants to write a new note and will hide the Update and New note buttons since there is no note to be updated.
    function clearFileds(){
        new_note_header.val('');
        new_note_text.val('');
        btn_update.css('display','none');
        btn_new.css('display','none');
    }
    //this function will append note sent from a php file to a current html structure with a limit of 70 characters for a text of a note.
    function appendNote(result){
        let item= `<div class="older_notes_note" id="${result.note_id}"><div class="older_notes_note_heading"><h4>${result.note_heading}</h4></div><div class="older_notes_note_text"><p class="older_notes_note_text_p">${result.note_text.substring(0,70)}</p></div></div>`;
         older_notes.append(item);
    }


    //getting all notes from the php file and displaying it with the limit of 70 characters for each note text so it can fit the div
    function init(){
        $.ajax({ url:'php/get_all_notes.php',
                method: 'POST', 
                dataType: 'json',
                success: function(result){
                    if(result != ''){
                        for(let i=0; i<result.length; i++){
                            appendNote(result[i]);
                        }
                    }
                    
                },
                complete: function(result){
                    //storing all notes in one constant after the successful AJAX call beacuse those notes will only be available after the call- prior to it, there are no elements with the older_notes_note class.  
                    const notes= $('.older_notes_note');
                    //setting up an event listener for each note and when a note is clicked it will trigger an ajax call which will send an note_id to the php page and will get the note heading and the whole note text as a result. 
                    notes.each(function(){
                        $(this).click(function(e){
                            let id= e.target.parentNode.parentNode.id; 
                            $.ajax({
                                url:'php/get_this_note.php',
                                dataType: 'json',
                                method: 'POST',
                                data: {
                                    id: id
                                },
                                success: function(result){
                                    
                                    new_note_header.val(result[0].note_heading);
                                    new_note_text.val(result[0].note_text);
                                    note_id= result[0].note_id;
                                    btn_new.css('display','inline');
                                    btn_update.css('display','inline');
                                },
                                error: function(){
                                    console.log('error');
                                }
                            })
                        })
                    });
                }

        });
    };
    //setting up an envent listener for a new_note button, which will only clear input and textarea. 
    btn_new.click(function(){
        clearFileds();
    })
    
    btn_save.click(function(){
        if(new_note_header.val()!=''){
            if(new_note_text.val()!=''){
                 $.ajax({
                     url:"php/insert_new_note.php",
                     method: "POST",
                     dataType: "json",
                     data: {
                         heading: new_note_header.val(),
                         text: new_note_text.val()
                     },
                     success: function(result){
                        console.log(result);
                        older_notes.empty();
                        init();
                     },
                     error: function(result){
                         console.log(result);
                     }
                 })
            } else {
                alert('Please fill out note text!');
            }
        } else {
            alert('Please fill out note heading!');
        }
        clearFileds();
    })
    // an event listener for update button wich will trigger another AJAX call and the result of it would be updating the specific note in the database, claering up the older_notes field and re-calling init() function so the updated note can be shown.
    btn_update.click(function(){
        if(new_note_header.val() != '' && new_note_text.val() != ''){
            $.ajax({
                url:'php/update_this_note.php',
                dataType: 'json',
                method: 'POST',
                data: {
                    id: note_id,
                    heading: new_note_header.val(),
                    text: new_note_text.val()
                },
                success:function(result){
                    //if the AJAX call is successful, the function will empty older_notes div and reload the init function so the updated note is also loaded. 
                    older_notes.empty();
                    clearFileds();
                    init();
                },
                error: function(result){
                    console.log('error');
                }
            })
        } else {
            alert('Heading and text of the note cannot be empty!');
        }
        
    })
    
  init();
})
