$('#btn-trigger').click((e) => {
    $('.alert').hide();
    $('#btn-trigger').addClass('disabled');
    submit();
    return false;
});

function submit() {
    var data = {
        'stshost': $('#stshost').val(),
        'stsport': $('#stsport').val(),
        'env': $('#env').val(),
        'well': $('#well').val()
    }
    $.post('/api/alert', data).done(function (res) {
        $('.alert').show();
        $('#btn-trigger').removeClass('disabled');
        console.log(res);
    });
}
$('.alert').hide();