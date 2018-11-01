# API Get Lazada Product Info

##### POST: /product
    
    req.body:
    {
        "productURL": "[url]"    
    }
    
##### example:
    
    $.post(domain + '/product', {productURL: productURL})
        .done((payload) => {
            console.log(payload);
        })
        .fail((xhr, status, err) => {
            console.log(xhr.responseText);
        });
        

## Demo:
Product:
    
    https://www.lazada.vn/products/apple-iphone-7-32gb-rose-gold-i150511251-s158185707.html
    
Response [status 200]:
    
        {"generalInfo":{"title":"Apple iPhone 7 32GB Rose Gold","imageSrc":"//vn-test-11.slatic.net/p/2/apple-iphone-7-32gb-rose-gold-0466-12184812-0ed464b011a994d1ce0a74401a76b6b9.jpg_720x720q75.jpg","priceCurrent":"₫13,890,000","priceLast":"₫14,887,400","priceDiscount":"-7%","brand":"Apple"},"ratingData":{"score_average":"4.6","score_max":"/5","rate_count":"14 Ratings"},"reviewData":[{"author":"by Trương Q.","content":"Giá rẻ hơn thị trường và chất lượng đảm bảo, vừa mua tháng 4/2018. Máy VNA chính hãng và sản xuất trong năm 2018 luôn. Rất ưng ý.","date":"7  months ago"},{"author":"by Lazada Customer","content":"Máy mới 100% . Lướt êm mượt , giao hang nhanh , đúng số máy IMEI , hài lòng","date":"2  weeks ago"},{"author":"by Anh K.","content":"Đã mua sử dụng được gần 2 tháng, hàng chính hãng mã VN/A. Sản phẩm sử dụng tốt chưa thấy lỗi lầm gì, giá lại rẻ hơn bên ngoài cửa hàng. Mình mua lúc sinh nhật LZD nhập mã giảm giá các kiểu còn 12,5 tr rẻ hơn TGDD 2,5tr.","date":"4  months ago"},{"author":"by Đỗ Đ.","content":"Đặt hàng từ ngày 5/2/2018 đến nay không nhận đc hàng. không thấy phản hồi","date":"10  months ago"},{"author":"by Tùng","content":"Dịch vụ nhanh và sản phẩm tốt","date":"9  months ago"}],"generalFeatures":[{"Brand":"Apple"},{"SKU":"AP069ELAAD0A49VNAMZ-26761182"},{"Model":"iPhone 7 VN/A 32GB"},{"Warranty Type":"Local Manufacturer Warranty"},{"Screen Size (inches)":"4.7"},{"Operating System":"iOS"},{"RAM memory":"2GB"},{"Warranty Period":"12 Months"}]}

Product not found:

    https://www.lazada.vn/products/i159-s158175179.html

Response [status 400]
 
    Xin lỗi! Sản phẩm này không còn tồn tại

Page not found:

    https://www.lazada.vn/products/samsung-galaxy-ml/
    
Response [status 400]
    
    Trang không tìm thấy
    
    
## Front-end

    http://localhost:3000/