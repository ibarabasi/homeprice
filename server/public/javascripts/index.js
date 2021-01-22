(function() {

    $('.answers').hide();
    $('.loading').hide();
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

        if (parsedResponse.errors) {
            $('.answer').html('Something went wrong :-( ' + parsedResponse.errors[0].message);
        } else {
            var data = parsedResponse.predictions[0].values[0]
            var prediction = data[0]
            $('.prediction').html('Prediction: '+ prediction +'%');
        }
        $('.classify-btn').prop('disabled', false);
        $('.answers').show();
        $('.loading').hide();
    }
}());
