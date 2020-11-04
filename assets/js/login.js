jQuery(document).ready(function(){
    toastr.options.closeDuration = 90000;
    $('#login_form').submit(function(event) {
        event.preventDefault();  
        // toastr.info('Authenticating...');
        $("#submit_button").prop('disabled',true);
        var email = $("#email").val();        
        var form_values = $('#login_form').serializeArray();
        console.log(form_values);

        $('#email_error').text("");
        $('#password_error').text("");        

        
        
        $.ajax({
            method: "POST",
            url: "api/login.php",
            data:form_values,
            dataType    : 'json',
            encode       : true
        })
        .done(function(data) {
            if(data.errors.v_status){
                var link = `verify-email.php?email=${email}`;  
                window.location.replace(link);                     
            }else{
                if (!data.success){ 
                   $("#submit_button").prop('disabled',false);
                    $("#loader-div").hide(); 
                    if (data.errors.email) {
                        $('#email_error').text(data.errors.email);
                        // toastr.error(data.errors.email);
                    }
                    if (data.errors.password) {
                        $('#password_error').text(data.errors.password);
                        // toastr.error(data.errors.password);
                    } 
                }else{
                    $("#submit_button").prop('disabled',false);
                    // toastr.success('Success Redirecting..');
                    window.location.replace("account/"); 
                }  
            }
        
        })
        .fail(function(error) {
            $("#submit_button").prop('disabled',false);
            console.log(error.responseText, 'error here<<<<<<<<');
            // toastr.error('Internal Server Error');
        });
    });
});