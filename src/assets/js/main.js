$(document).ready(function() {
    startup();
});

function startup() {
    // Configura mascaras
    $(".cpf").setMask({mask: '999.999.999-99'});
    $(".cnpj").setMask({mask: '99.999.999/9999-99'});

    // Prepara o Select2
    $(".combo").select2();

    // Prepara os tooltips
    $('[data-toggle="tooltip"]').tooltip()

    // Prepara o Popover
    $('[data-toggle="popover"]').popover()

    $('.carousel').carousel({
        interval: 3000
    })

    $(".decimal-3").setMask({ mask: '999,999.9', type: 'reverse' });
    $(".number-3").setMask({ mask : '999.999.999.999', type : 'reverse' });
    $(".decimal-2").setMask({ mask : '99,999.999.999.999', type : 'reverse' });

    prettyPrint();
}
