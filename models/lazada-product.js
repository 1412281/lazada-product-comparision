"use strict";
const _ = require('lodash');
const request = require('request');
const cheerio = require('cheerio');
const q = require('q');

function getProductLazada(url) {
    const deferProduct = q.defer();

    request(url, (err, response, body) => {
        if (err) {
            console.log(err);
            deferProduct.reject(err);
        }
        else {
            const $ = cheerio.load(body);
            deferProduct.resolve(_crawlProductData($));
        }
    });

    return deferProduct.promise;
}


function _crawlProductData($) {
    const generalData = _crawlGeneralData($);
    const ratingData = _crawlRatingData($);
    const reviewData = _crawlTopReviews($);
    // const specificateData = _crawlSpecificateData($);

    return {generalData, ratingData, reviewData};
}

function _crawlGeneralData($) {
    const title = $('.pdp-product-title').text();
    console.log(title);
    const imageSrc = $('.pdp-mod-common-image.gallery-preview-panel__image').attr('src');
    console.log(imageSrc);
    const priceCurrent = $('.pdp-price.pdp-price_type_normal.pdp-price_color_orange.pdp-price_size_xl').text();
    console.log(priceCurrent);
    const priceLast = $('.pdp-price.pdp-price_type_deleted.pdp-price_color_lightgray.pdp-price_size_xs').text();
    console.log(priceLast);
    const priceDiscount = $('.pdp-product-price__discount').text();
    console.log(priceDiscount);
    const brand = $('.pdp-link.pdp-link_size_s.pdp-link_theme_blue.pdp-product-brand__brand-link').text();
    console.log(brand);
    return {title, imageSrc, priceCurrent, priceLast, priceDiscount, brand};
}

function _crawlRatingData($) {
    const score_average = $('.pdp-mod-review .score-average').text();
    const score_max = $('.pdp-mod-review .score-max').text();
    const rate_count = $('.pdp-mod-review .count').text();
    console.log(score_average + score_max);
    console.log(rate_count);

    return {score_average, score_max, rate_count};
}

function _crawlTopReviews($) {

    const mod_reviews = $('.mod-reviews .item');
    if (!_.isEmpty(mod_reviews)) {
        console.log(mod_reviews.length);
        return mod_reviews.map((index, review) => {
            const author = $(review).find('.middle').find('span').first().text();
            const verifyBought = $(review).find('.middle .verify').text();
            const content = $(review).find('.item-content .content').text();
            const date = $(review).find('.top span').text();
            console.log({author, verifyBought, content, date});
            return {author, content, date};
        }).get();
    }
    return [];
}

getProductLazada('https://www.lazada.vn/products/apple-iphone-7-32gb-rose-gold-i150511251-s158185707.html');
// getProductLazada('https://www.lazada.vn/products/samsung-galaxy-j2-prime-vang-hang-phan-phoi-chinh-thuc-i150503159-s158175179.html');

module.exports = {getProductLazada};