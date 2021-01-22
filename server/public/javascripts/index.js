(function() {

    $('.answers').show();
    $('.loading').show();
    $('#form').submit(onFormSubmit);
    $('#SquareFeet').val('2000');
    $('#Bedrooms').val('3');

    function onFormSubmit() {
        var age = $('#SquareFeet').val();
        var gender = $('#Bedrooms').val();
        $('.loading').show();
        $('.answers').hide();
        $('.classify-btn').prop('disabled', true);
        $.post("/predict", {SquareFeet: SquareFeet,
                             Bedrooms: Bedrooms
                            }, function(data) {
            renderAnswer(data)
        }).fail(function(err) {
            renderAnswer(err);
        });
        return false;
    }

    function renderAnswer(parsedResponse) {
        console.log(parsedResponse);
        $('.answer').html('Results: ' + parsedResponse);
        $('.classify-btn').prop('disabled', false);
        $('.answers').show();
        $('.loading').show();
    }
}());
