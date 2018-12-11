(function () {
    $('#sign-up').click(function (e) {
        e.preventDefault();
        if ($('#sign-up').html() ==
            '<i class="fa fa-circle-o-notch fa-spin" style="font-size:inherit;"></i>&nbsp;Sign Up')
            return showAlerts('Wait');

        if ($('#fname').val().trim() == '')
            return showAlerts('Enter First Name');

        if ($('#email').val().trim() == '')
            return showAlerts('Enter Email', true);

        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test($('#email').val()))
            return showAlerts('Enter Valid Email Address');

        if ($('#login-password').val().trim() == '')
            return showAlerts('Enter Password', true);

        if ($('#login-confirm-password').val().trim() == '')
            return showAlerts('Enter Confirm Password', true);

        if ($('#login-password').val() != $('#login-confirm-password').val())
            return showAlerts('Passwords Do Not Match', true);

        $('#sign-up').html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:inherit;"></i>&nbsp;Sign Up');
        $.post('/signup', {
            first_name: $('#fname').val(),
            last_name: $('#lname').val(),
            email: $('#email').val(),
            password: $('#login-password').val(),
            user_name: $('#uname').val()
        }, function (data) {
            showAlerts(data.msg, !data.flag);
            $('#sign-up').html('Sign Up');
            if (data.flag) {
                $('#fname').val('');
                $('#lname').val('');
                $('#email').val('');
                $('#uname').val('');
                $('#login-password').val('');
                $('#login-confirm-password').val('');
                showAlerts(data.msg + '&nbsp;&nbsp;&nbsp;<a href="/"> Login Now </a>', !data.flag);
            }
        });
    });
})();

function showAlerts(msg, flag) {
    if (flag == undefined) {
        $('#warning').empty();
        $('#warning').show();
        $('#success').hide();
        $('#warning').html(msg);
        return;
    }

    if (flag) {
        $('#danger').empty();
        $('#danger').show();
        $('#success').hide();
        $('#danger').html(msg);
        return;
    } else {
        $('#success').empty();
        $('#success').show();
        $('#success').html(msg);
        return;
    }
}