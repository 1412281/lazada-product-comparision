const href = $(location).attr('href').split('/');
const domain = `${href[0]}//${href[2]}`;
console.log(domain);

$(document).ready(() => {

    $('#add-product1').on('click', () => {
        console.log('click 1');
        const productURL = $('#product1 #lazada-product-link').val();
        console.log(productURL);
        getProductDetail(productURL, $('#product1'));
    });
    $('#add-product2').on('click', () => {
        console.log('click 2');
        const productURL = $('#product2 #lazada-product-link').val();
        console.log(productURL);
        getProductDetail(productURL, $('#product2'));

    });
});


function getProductDetail(productURL, element) {
    $.post(domain + '/product', {productURL: productURL})
        .done((payload) => {
            console.log(payload);
            showProduct(element, payload);
        })
        .fail((xhr, status, err) => {
            console.log(xhr.responseText);
            console.log(status);

        });
}

function showProduct(element, payload) {
    const showArea = element.find('#general-product-details');
    showArea.find('#product-title').text(payload.generalInfo.title);
    // showArea.find('#product-img').html(`<img src=${payload.generalData.imageSrc} class="rounded" width="100%" >`);
    showArea.find('#product-img').attr('src', payload.generalInfo.imageSrc);
    showArea.find('#price-current').text(payload.generalInfo.priceCurrent);

    console.log(showArea);
}