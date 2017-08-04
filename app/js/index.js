$('#btn-trigger').click((e) => {
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
        console.log(res);
    });
}