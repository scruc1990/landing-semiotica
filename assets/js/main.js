function updateTotals() {
    const priceBasic = 5000;
    const pricePremium = 7000;
    const priceDeluxe = 15000;

    const quantityBasic = $('#quantityBasic').val();
    const quantityPremium = $('#quantityPremium').val();
    const quantityDeluxe = $('#quantityDeluxe').val();

    const subtotal = (quantityBasic * priceBasic) + (quantityPremium * pricePremium) + (quantityDeluxe * priceDeluxe);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    $('#subtotal').val(subtotal);
    $('#iva').val(iva);
    $('#total').val(total);
}

function calcularvalorcuotas() {
    const total = $('#total').val();
    const numerocuotas = $('#numerocuotas').val();
    const valor = total / numerocuotas;
    $('#valorcuotas').val(valor.toFixed(2));
}

function mostrarimagen() {
    let valor = $('#cardnumero').val().substring(0, 1);
    if (valor == 4) {
        $('#cardnombre').val("visa")
        $("#cardimagen").attr("src", "./assets/imgs/visa.svg");
        $('#error-cardnumero').hide();
    } else if (valor == 5) {
        $('#cardnombre').val("mastercard")
        $("#cardimagen").attr("src", "./assets/imgs/mastercard.svg");
        $('#error-cardnumero').hide();
    } else if (valor == 3) {
        $('#cardnombre').val("american express")
        $("#cardimagen").attr("src", "./assets/imgs/americanexpress.svg");
        $('#error-cardnumero').hide();
    } else if (valor == 7) {
        $('#cardnombre').val("diners club")
        $("#cardimagen").attr("src", "./assets/imgs/dinersclub.svg");
        $('#error-cardnumero').hide();
    } else {
        $('#cardnombre').val("")
        $("#cardimagen").attr("src", "");
        $('#error-cardnumero').show();
        $('#conten-img').addClass('d-none');
    }
}
function validartarjeta() {
    let numberCredit = $('#cardnumero').val();

    if (numberCredit.length == 4 || numberCredit.length == 9 ||
        numberCredit.length == 14) {
        $('#cardnumero').val($('#cardnumero').val() + "-");
    } else if (numberCredit.length == 5 || numberCredit.length == 10 ||
        numberCredit.length == 15) {
        $('#cardnumero').val($('#cardnumero').val().slice(0, -1));
    }

    const cardNumber = $('#cardnumero').val().replace(/-/g, '');
    const numbersCount = cardNumber.length;
    if (numbersCount < 16) {
        $('#error-cardnumero-2').show();
    } else {
        $('#error-cardnumero-2').hide();
    }

}

$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {
        console.log(this.hash, 'this.hash');
        if (this.hash !== "") {
            console.log(this.hash, 'this.hash');
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });

    $('#search-button').on('click', function() {
        var searchValue = $('#search-input').val();
        const sections = {
            inicio :'#home',
            descripcion : '#description',
            beneficios : '#benefits',
            caracteristicas: '#characteristics',
            precio: '#prices-segment',
            contactanos: '#contact',
            miembros: '#members',
        };
        console.log(searchValue, 'searchValue');
        if (searchValue.length > 0) {
            let hash = sections[searchValue.toLowerCase()];
            if (hash) {
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 700, function(){
                    window.location.hash = hash;
                });
            } else {
                alert('No se encontró la sección');
            }
            
        }
    });

    $('#contact-name').on('input', function() {
        var value = $(this).val();
        var regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(value)) {
            $(this).val(value.replace(/[^a-zA-Z\s]/g, ''));
        }
    });

    $('#contact-last-name').on('input', function() {
        var value = $(this).val();
        var regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(value)) {
            $(this).val(value.replace(/[^a-zA-Z\s]/g, ''));
        }
    });

    $('#contact-email').on('input', function() {
        var value = $(this).val();
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(value)) {
            $('#error').show();
        } else {
            $('#error').hide();
        }
    });

    $('.order-now').on('click', function() {
        $('.total-section').removeClass('d-none');
        updateTotals();
    });

    $('#cardnumero').on('change', function() {

        if ($('#cardnumero').val().length > 0) {
            $('#conten-img').removeClass('d-none');
        } else {
            $('#conten-img').addClass('d-none');
        }
    });
    $('#btn-contact-clear').on('click', function() {
        $('#contact-name').val('');
        $('#contact-last-name').val('');
        $('#contact-email').val('');
        $('#contact-affair').val('');
        $('#contact-message').val('');
        $('#error').hide();
    });

    $('#btn-contact-send').on('click', function() {
        var name = $('#contact-name').val();
        var lastName = $('#contact-last-name').val();
        var email = $('#contact-email').val();
        var affair = $('#contact-affair').val();
        var message = $('#contact-message').val();
        var error = $('#error').is(':visible');

        if (name.length == 0 || lastName.length == 0 || email.length == 0 || affair.length == 0 || message.length == 0 || error) {
            alert('Todos los campos son obligatorios');
        } else {
            alert('Será contactado en breve, gracias por su mensaje');
            $('#btn-contact-clear').click();
        }
    });

    $('#quantityBasic').on('input', updateTotals);
    $('#quantityPremium').on('input', updateTotals);
    $('#quantityDeluxe').on('input', updateTotals);

    $('#numerocuotas').on('input', calcularvalorcuotas);
    $('#cardnumero').on('input', mostrarimagen);
    $('#cardnumero').on('input', validartarjeta);
    $('#cardnumero').on('input', function() {
        var value = $(this).val();
        var regex = /^[0-9-]*$/;
        if (!regex.test(value)) {
            $(this).val(value.replace(/^[0-9-]*$/g, ''));
        }
    });
    $('#cardCVV').on('input', function() {
        var value = $(this).val();
        var regex = /^[0-9]{0,4}$/;
        if (!regex.test(value) || value.length < 3) {
            $(this).val(value.replace(/[^0-9]/g, '').substring(0, 4));
            $('#error-cardCVV').show();
        } else {
            $('#error-cardCVV').hide();
        }
    });
    $("#pagar").click(function (e) {
        e.preventDefault();
        let sw=false;
        const pattern = new RegExp('^[0-9-]+$', 'i');
        const pattern2 = new RegExp('^[0-9]+$', 'i');
        if ($('#total').val() == 0) {
            sw=true;
            alert("Debe seleccionar al menos uno de los planes")
            return;
        }
        if (!pattern.test($('#cardnumero').val())) {
            sw=true;
            alert("el numero de tarjeta solo puede contener numeros")
            return;
        }


        if (pattern.test($('#cardnombre').val())) {
            sw=true;
            alert("el nombre de tarjeta solo puede contener letras")
            return;
        }

        if ($('#cardnombre').val() == "") {
            sw=true;
            alert("error no se permite esta tarjeta")
            return;
        }
        if (parseInt($('#valocuotas').val()) < 1) {
            sw=true;
            alert("no ha digitado una cantidad en nuestros planes")
            return;
        }
        if (parseInt($('#numerocuotas').val()) >= 10) {
            sw=true;
            alert("no se permite este numero de cuotas")
            return;
        }
        if (!pattern2.test($('#cardCVV').val())) {
            sw=true;
            alert("codigo de seguridad solo puede contener numeros")
            return;
        }
        var fechainicial = $("#cardExpiry").val();
        var tiempoTranscurrido = Date.now();
        var fechahoy = new Date(tiempoTranscurrido);
        var fechaFormato = fechahoy.toLocaleDateString();
        var horaFormato = fechahoy.toLocaleTimeString();
        
        if (Date.parse(fechainicial) < Date.parse(fechahoy)) {
            sw=true;   
            alert("La fecha de expiracion debe ser mayor a la actual ");
            return;
        }
        if (sw==false) {
            $("#fechaactual").text( $("#fechaactual").text() +" "+ fechaFormato)            
            $("#horaactual").text( $("#horaactual").text() +" "+ horaFormato)              
            $("#totalc").text( $("#totalc").text() +""+$("#total").val())             
            $("#cantidad").text($("#cantidad").text() +""+$("#numerocuotas").val())            
             $("#valor").text($("#valor").text() +""+$("#valorcuotas").val())            
            $("#4digitos").text( $("#4digitos").text()+""+$("#cardnumero").val().split("-")[3])  
            $("#imagenbanco").attr('src',$("#cardimagen").attr("src") )         
            $('#confirm').modal('show');
        }
        $('#ocultar').click(function () {
            $('#confirm').modal('hide');
        });
    });
});

new WOW().init();

function initMap() {
    var uluru = {lat: 6.21060999862814, lng: -75.57709351698205};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
 }


