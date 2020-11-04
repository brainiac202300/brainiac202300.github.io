jQuery(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get('referrer');
    if (referrer) {
        $("#referrer").val(referrer);
        $('#referrer').prop('readonly', true);
    }

    const countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas"
        , "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands"
        , "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica"
        , "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea"
        , "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana"
        , "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India"
        , "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia"
        , "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania"
        , "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia"
        , "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"
        , "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles"
        , "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan"
        , "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia"
        , "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay"
        , "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];


    let options = '';
    countryList.map((country) => {
        options = `${options}<option>${country}</option>`;
    });
    const country = document.querySelector("#country");
    country.innerHTML = options;


    $('#register_form').submit(function (event) {
        event.preventDefault();
        // toastr.info('Authenticating...');
        $("#submit_button").prop('disabled', true);
        $("#submit_button").text('Please Wait...');
        var form_values = $('#register_form').serializeArray();
        console.log(form_values);
        var password = form_values.find(function (item) { return item.name == 'password'; });
        var retypePassword = form_values.find(function (item) { return item.name == 'retypePassword'; });

        $('.error').text("");

        if (password.value !== retypePassword.value) {
            $('#retype_password_error').text("Password does not match");
            $("#submit_button").prop('disabled', false);
        } else {
            $.ajax({
                method: "POST",
                url: "api/register.php",
                data: form_values,
                dataType: 'json',
                encode: true
            })
                .done(function (data) {
                    $("#submit_button").text('Register');
                    console.log(data, '>>>>>>>>>>>>>>');
                    if (!data.success) {
                        $("#submit_button").prop('disabled', false);
                        if (data.errors.full_name) {
                            $('#full_name_error').text(data.errors.full_name);
                        }
                        if (data.errors.email) {
                            $('#email_error').text(data.errors.email);
                        }
                        if (data.errors.password) {
                            $('#password_error').text(data.errors.password);
                        }
                    } else {
                        $("#submit_button").prop('disabled', false);
                        window.location.replace('account/');
                    }
                })
                .fail(function () {
                    $("#submit_button").text('Register');
                    alert("Network Error");
                    $("#loader-div").hide();
                    $("#submit_button").prop('disabled', false);
                    console.log(data, '>>>>>>>>>>>>>>');
                });
        }

    });



});


function IsNumeric(sText) {
    var ValidChars = "0123456789";
    var IsNumber = true;
    var Char;
    if (sText == '') return false;
    for (i = 0; i < sText.length && IsNumber == true; i++) {
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1) {
            IsNumber = false;
        }
    }
    return IsNumber;
}