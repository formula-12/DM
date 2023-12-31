$(document).ready(function () {
    $('.save-product').click(function (event) {
        event.preventDefault();

        var itemId = $(this).data('item-id');
        var pictures = $('#input_pictures_' + itemId).val();
        var description = $('#input_description_' + itemId).val();
        var price = $('#input_price_' + itemId).val();
        var price_factor = $('#input_price_factor_' + itemId).val();
        var exists = $('#select_exists_' + itemId).children("option:selected").val();
        var amount = $('#input_amount_' + itemId).val();
        var box = $('#input_box_' + itemId).val();
        var visibility = $('#input_visibility_' + itemId).val();

        $.ajax({
            url: '/account/editor/save',
            method: 'POST',
            data: JSON.stringify({ id: itemId, pictures: pictures, description: description, price: price, price_factor: price_factor, exists: exists, amount: amount, box: box, visibility: visibility }),
            contentType: 'application/json',
            success: function (response) {
                const toast = new bootstrap.Toast($('#success_toast'), { delay: 2000 });
                toast.show();
            },
            error: function (error) {
                console.error(error);
            }
        });
    });

    $('.exists-product').change(function () {
        console.log($(this).val());
        if ($(this).val() == '1') {
            $('#input_amount_' + $(this).data('item-id')).parents(".form-floating").removeClass('d-none');
            $('#input_box_' + $(this).data('item-id')).parents(".form-floating").removeClass('d-none');
        } else {
            $('#input_amount_' + $(this).data('item-id')).parents(".form-floating").addClass('d-none');
            $('#input_box_' + $(this).data('item-id')).parents(".form-floating").addClass('d-none');
        }
    });

    $(document).on('click', '.add-to-hidden', function (event) {
        event.preventDefault();
    
        var itemId = $(this).data('item-id');
        $('#input_visibility_' + itemId).val(0);

        $(this).removeClass('add-to-hidden');
        $(this).addClass('del-from-hidden');
        $(this).html('<i class="fa-solid fa-eye-slash"></i>');
    });
    
    $(document).on('click', '.del-from-hidden', function (event) {
        event.preventDefault();
    
        var itemId = $(this).data('item-id');
        $('#input_visibility_' + itemId).val(1);

        $(this).removeClass('del-from-hidden');
        $(this).addClass('add-to-hidden');
        $(this).html('<i class="fa-solid fa-eye"></i>');
    });
});

function changeIconSidebar(element) {
    if ($(element).hasClass('fa-chevron-down')) {
        $(element).removeClass('fa-chevron-down');
        $(element).addClass('fa-chevron-up');
    } else {
        $(element).removeClass('fa-chevron-up');
        $(element).addClass('fa-chevron-down');
    }
}