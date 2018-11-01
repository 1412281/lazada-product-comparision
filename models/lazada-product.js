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

            const pageError = _checkPageError($);
            console.log(pageError);

            if (pageError.status === 400) {
                deferProduct.reject(pageError.error);
            }
            else {
                deferProduct.resolve(_crawlProductData($));
            }

        }
    });

    return deferProduct.promise;
}

function _checkPageError($) {
    const productNotFound = $('.comm-error .error-info').text();
    if (productNotFound) {
        return {status: 400, error: productNotFound};
    }
    const productTitle = $('.pdp-product-title').text();
    if (productTitle === "") {
        return {status: 400, error: "Trang không tìm thấy"};
    }
    return {status: 200};
}

function _crawlProductData($) {
    const generalInfo = _crawlGeneralData($);
    const productHighlights = _crawlProductHighlights($);
    const generalFeatures = _crawlGeneralFeatures($);
    const ratingData = _crawlRatingData($);
    const reviewData = _crawlTopReviews($);
    const boxContent = _crawlBoxContent($);

    console.log(generalInfo);
    console.log(productHighlights);
    console.log(generalFeatures);
    console.log(ratingData);
    console.log(reviewData);
    console.log(boxContent);

    return {generalInfo, productHighlights, generalFeatures, ratingData, reviewData, boxContent};
}

function _crawlGeneralData($) {
    const title = $('.pdp-product-title').text();
    const imageSrc = $('.pdp-mod-common-image.gallery-preview-panel__image').attr('src');
    const priceCurrent = $('.pdp-price.pdp-price_type_normal.pdp-price_color_orange.pdp-price_size_xl').text();
    const priceLast = $('.pdp-price.pdp-price_type_deleted.pdp-price_color_lightgray.pdp-price_size_xs').text();
    const priceDiscount = $('.pdp-product-price__discount').text();
    const brand = $('.pdp-link.pdp-link_size_s.pdp-link_theme_blue.pdp-product-brand__brand-link').text();
    return {title, imageSrc, priceCurrent, priceLast, priceDiscount, brand};
}


function _crawlProductHighlights($) {
    const product_highlights = $('.html-content.pdp-product-highlights li');
    if (!_.isEmpty(product_highlights)) {
        return product_highlights.map((index, highlight) => {
            return [$(highlight).text()];
        }).get();
    }
}

function _crawlGeneralFeatures($) {
    const general_features = $('.pdp-general-features .specification-keys li');
    if (!_.isEmpty(general_features)) {
        return general_features.map((index, feature) => {
            const key = $(feature).find('.key-title').text().trim();
            const value = $(feature).find('.html-content.key-value').text();
            return {[key]: value};
        }).get();
    }
    return [];
}


function _crawlBoxContent($) {
    const box_content_title = $('.box-content .key-title');
    const box_content = $('.box-content .html-content.box-content-html');
    if (!_.isEmpty(box_content_title) && !_.isEmpty(box_content)) {
        return {[box_content_title.text()]: box_content.text()};
    }
    return {};
}


function _crawlRatingData($) {
    const score_average = $('.pdp-mod-review .score-average').text();
    const score_max = $('.pdp-mod-review .score-max').text().slice(1);
    const rate_count = $('.pdp-mod-review .count').text();

    return {score_average, score_max, rate_count};
}

function _crawlTopReviews($) {

    const mod_reviews = $('.mod-reviews .item');
    if (!_.isEmpty(mod_reviews)) {
        return mod_reviews.map((index, review) => {
            const author = $(review).find('.middle').find('span').first().text();
            const purchase = $(review).find('.middle .verify').text();
            const content = $(review).find('.item-content .content').text();
            const date = $(review).find('.top span').text();
            return {author, purchase, content, date};
        }).get();
    }
    return [];
}

getProductLazada('https://www.lazada.vn/products/apple-iphone-7-32gb-rose-gold-i150511251-s158185707.html');
// getProductLazada('https://www.lazada.vn/products/samsung-galaxy-j2-prime-vang-hang-phan-phoi-chinh-thuc-i150503159-s158175179.html');

module.exports = {getProductLazada};