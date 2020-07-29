
var outListProduct = JSON.parse(localStorage.getItem("listProduct"));
function Product(id, name , img , money, percentSale , type){
    var product = new Object();
    product.id = id;
    product.name = name;
    product.img = img;
    product.money = money;
    product.percentSale = percentSale;
    product.type = type;
    product.outPutImg = function(){
        return 'url('+this.img+')';
    }
    product.outPutMoney  = function(){
        this.money = Math.round(this.money);
        if(this.money ==0){
            return this.money = "";
        }
        else{
            return this.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
        }
    }
    product.outPutSale = function(){
        this.money = this.money*1;
        if(this.money==0){
            return this.sale = "Miễn Phí";
        }
        else{
            var sale = this.money*(100 - this.percentSale)/100;
            sale = Math.round(sale);
            return sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
        }
    }
    return product;
}


 
function outIndex(){
    creatDataVirtual();
    var listProduct = JSON.parse(localStorage.getItem("listProduct"));
    if(listProduct==null) outListProduct = listProduct;
    filterProduct("all");
    outPutProductNew(outListProduct);
}

function outPutProductNew(listProduct){
    var full = document.getElementById("slider-new-product");
    full.innerHTML = "";
    var End = 7;
    if(End > listProduct.length) End = listProduct.length;
    for (let i = 0; i < End; i++) {
        full.appendChild(CreateNodeOutput(listProduct[i]));
    }
}
function outPutProduct(listProduct){
    var full = document.getElementById("frame-full");
    full.innerHTML = "";
    var End =  12;
    if(End > listProduct.length) End = listProduct.length;
    for (let i = 0; i < End; i++) {
        full.appendChild(CreateNodeOutput(listProduct[i]));
    }
}
function loadMore(){
    var countFrameIFull = document.getElementById("frame-full").getElementsByClassName("full-frame-product");
    var End = countFrameIFull.length + 4;
    if(End > outListProduct.length) End = outListProduct.length;
    for (let i = countFrameIFull.length; i < End; i++) {
        document.getElementById("frame-full").appendChild(CreateNodeOutput(outListProduct[i]));
    }
}
function CreateNodeOutput(inProduct){
    
    var FullframeProduct = document.createElement("div");
    FullframeProduct.className = "full-frame-product";

    var frameProduct = document.createElement("div");
    frameProduct.className = "frame-product";
    FullframeProduct.appendChild(frameProduct);

    var frameImgProduct = document.createElement("div");
    frameImgProduct.className = "frame-img-product";
    frameProduct.appendChild(frameImgProduct);

    var contentProduct = document.createElement("div");
    contentProduct.className = "content-product";
    frameProduct.appendChild(contentProduct);

    var nameProduct = document.createElement("div");
    nameProduct.className = "name-product";
    contentProduct.appendChild(nameProduct);

    var saleProduct = document.createElement("div");
    saleProduct.className = "sale-product";
    contentProduct.appendChild(saleProduct);

    var moneyProduct = document.createElement("div");
    moneyProduct.className = "money-product";
    contentProduct.appendChild(moneyProduct);

    var nodeAddCart = document.createElement("div");
    nodeAddCart.className = "frame-bt-add-cart";
    frameImgProduct.appendChild(nodeAddCart);

    inProduct = Product(inProduct.id, inProduct.name , inProduct.img , inProduct.money,inProduct.percentSale , inProduct.type);

    frameImgProduct.style.backgroundImage = inProduct.outPutImg();
    frameImgProduct.style.backgroundSize = "100%";
    frameImgProduct.style.backgroundRepeat = "no-repeat"

    nameProduct.append(inProduct.name);
    saleProduct.append(inProduct.outPutSale());
    moneyProduct.append(inProduct.outPutMoney()) ;

    nodeAddCart.innerHTML = '<button class="add-cart" onclick="addToCart('+inProduct.id+',this'+')"><i class="fas fa-cart-plus"></i></button>';    
    return FullframeProduct;
}
function resetFormatForFilter(start,end){
    var NodeFilter = document.querySelectorAll(".future-filter");
    for (let i = start; i < end; i++) {
        NodeFilter[i].style.background = "none";
        NodeFilter[i].style.color = "black";
    }
}

function checkFrom(type){
    let nodeCheck =document.querySelectorAll(".future-filter");
    let i =0;
    if(type =="mixi") i =1;
    if(type =="luuniem") i =2;
    if(type =="cspubg") i =3;
    if(type =="0-9") i =4;
    if(type =="9-0") i =5;
    if(type =="az") i =6;
    if(type =="za") i =7;
    nodeCheck[i].style.background = " #f51167";
    nodeCheck[i].style.color = "white";
}
function filterProduct(type){
    resetFormatForFilter(0,4);
    var filterData = new Array();
    var getData = JSON.parse(localStorage.getItem("listProduct"));

    if(type!='all'){
        for (let i = 0; i < getData.length; i++) {
            if(getData[i].type == type){
                filterData.push(getData[i]);
            }
        }
        
    }
    else {
        resetFormatForFilter(0,8);
        filterData = getData;
    }
    checkFrom(type);
    if(filterData.length==0){
        var full = document.getElementById("frame-full");
        full.innerHTML =  "";
        var notification = document.createElement("h1");
        notification.className = "outPutNull";
        notification.innerHTML ="Không có sản phẩm nào";
        full.appendChild(notification);
    }
    else{
        outListProduct = filterData;
        outPutProduct(filterData);
    }
}
function sortProduct(typeSort){
    resetFormatForFilter(4,8);
    checkFrom(typeSort);
    if(typeSort=="0-9"){
        outListProduct.sort(function(a,b){
            return a.money*((100-a.percentSale)/100) - b.money*((100-b.percentSale)/100)
        });
    }
    if(typeSort=="9-0"){
        outListProduct.sort(function(a,b){
            return b.money*((100-b.percentSale)/100) - a.money*((100-a.percentSale)/100)
        });
    }
    if(typeSort=="az"){
        outListProduct.sort(function(a,b){
            var product1 = removeAscent(a.name.toUpperCase());
            var product2 = removeAscent(b.name.toUpperCase());
            if(product1 > product2){
                return 1;
            }
            if(product1 < product2){
                return -1;
            }
            else return 0;
        });
    }
    if(typeSort=="za"){
        outListProduct.sort(function(a,b){
            var product1 = removeAscent(a.name.toUpperCase()) ;
            var product2 = removeAscent(b.name.toUpperCase());
            if(product1 > product2){
                return -1;
            }
            if(product1 < product2){
                return 1;
            }
            else return 0;
        });
    }
    outPutProduct(outListProduct);

}


function addToCart(id, getNode){
    var productCart = new Object();
    var listCart = JSON.parse(localStorage.getItem("listCart"));
    var testListCart= true;
    if(listCart ==null){
        var listCart = new Array();
    }
    for (let i = 0; i < listCart.length; i++) {
        if(listCart[i].id == id){
            animateAddCart(id, getNode);
            listCart[i].sl++;
            testListCart = false;
            break;
        }
    }
    if(testListCart){
        animateAddCart(id, getNode);
        productCart.id = id;
        productCart.sl = 1;
        productCart.check = true;
        listCart.push(productCart);
    }
    
    var changeArrToJson = JSON.stringify(listCart);
    localStorage.setItem("listCart", changeArrToJson);
    showUser();
}

function animateAddCart(id,getNode = document.getElementById("jfdkl")){
    var listProduct = JSON.parse(localStorage.getItem("listProduct"));
    var nodeAnimate = document.createElement("div");
    nodeAnimate.classList.add("animateAddCart");
    let getImgPr = Product();
    for (let i = 0; i < listProduct.length; i++) {
        if(listProduct[i].id == id){
            getImgPr.img = listProduct[i].img;
            nodeAnimate.style.background = getImgPr.outPutImg();
            nodeAnimate.style.backgroundSize = "100%";
            break;
        }
    }
    getNode.parentNode.parentNode.appendChild(nodeAnimate);
    setTimeout(()=>{
        getNode.parentNode.parentNode.removeChild(nodeAnimate);
    },1500);
}





function creatDataVirtual(){
    var listProduct = JSON.parse(localStorage.getItem("listProduct"));

    if(listProduct==null){
        var listProduct = new Array();
        listProduct[0] = Product();
        listProduct[0].name = "Áo hoodie Mixi classic màu đen"; 
        listProduct[0].id =creatID();
        listProduct[0].money = 500000;
        listProduct[0].percentSale = 5;
        listProduct[0].type = "mixi";
        listProduct[0].img = './img/home/img-product/0.jpg';

        listProduct[1] = Product();
        listProduct[1].name = "Áo Khoác Mixi đen siêu đẹp"; 
        listProduct[1].id =creatID();
        listProduct[1].money = 500000;
        listProduct[1].percentSale = 10;
        listProduct[1].type = "mixi";
        listProduct[1].img = './img/home/img-product/1.jpg';

        listProduct[2] = Product();
        listProduct[2].name ="Áo hoodie Mixi đen khoá ngực "; 
        listProduct[2].id =creatID();
        listProduct[2].money = 580000;
        listProduct[2].percentSale = 12;
        listProduct[2].type = "mixi";
        listProduct[2].img = './img/home/img-product/2.jpg';

        listProduct[3] = Product();
        listProduct[3].name = "2 Cốc giữ nhiệt Trắng + Đen"; 
        listProduct[3].id =creatID();
        listProduct[3].money = 520000;
        listProduct[3].percentSale = 24;
        listProduct[3].type = "luuniem";
        listProduct[3].img = './img/home/img-product/10.jpg';

        listProduct[4] = Product();
        listProduct[4].name = "Combo Áo Khoác + Hoodie + Kéo Khóa"; 
        listProduct[4].id =creatID();
        listProduct[4].money = 1500000;
        listProduct[4].percentSale = 10;
        listProduct[4].type = "mixi";
        listProduct[4].img = './img/home/img-product/4.jpg';

        listProduct[5] = Product();
        listProduct[5].name = "Dép Mixi đen trắng quai ngang"; 
        listProduct[5].id =creatID();
        listProduct[5].money = 360000;
        listProduct[5].percentSale = 23;
        listProduct[5].type = "luuniem";
        listProduct[5].img = './img/home/img-product/11.jpg';

        listProduct[6] = Product();
        listProduct[6].name = "Ví Mixi Handmade hàng Limited Edition"; 
        listProduct[6].id =creatID();
        listProduct[6].money = 1499000;
        listProduct[6].percentSale = 12;
        listProduct[6].type = "luuniem";
        listProduct[6].img = './img/home/img-product/12.jpg';

        listProduct[7] = Product();
        listProduct[7].name = "Áo logo Playerunknowns battle grounds P06"; 
        listProduct[7].id =creatID();
        listProduct[7].money = 230000;
        listProduct[7].percentSale = 34;
        listProduct[7].type = "cspubg";
        listProduct[7].img = './img/home/img-product/17.jpg';

        listProduct[8] = Product();
        listProduct[8].name = "Áo Khoác Mixi Khóa kéo"; 
        listProduct[8].id =creatID();
        listProduct[8].money = 500000;
        listProduct[8].percentSale = 12;
        listProduct[8].type = "mixi";
        listProduct[8].img = './img/home/img-product/8.jpg';

        listProduct[9] = Product();
        listProduct[9].name = "Áo ba lỗ Mixi đen"; 
        listProduct[9].id =creatID();
        listProduct[9].money = 150000;
        listProduct[9].percentSale = 10;
        listProduct[9].type = "luuniem";
        listProduct[9].img = './img/home/img-product/15.jpg';

        listProduct[10] = Product();
        listProduct[10].name = "Bình giữ nhiệt MIXI"; 
        listProduct[10].id =creatID();
        listProduct[10].money = 290000;
        listProduct[10].percentSale = 1;
        listProduct[10].type = "luuniem";
        listProduct[10].img = './img/home/img-product/10.jpg';

        listProduct[11] = Product();
        listProduct[11].name = "Dép Mixi đen quai trắng"; 
        listProduct[11].id =creatID();
        listProduct[11].money = 250000;
        listProduct[11].percentSale = 0;
        listProduct[11].type = "luuniem";
        listProduct[11].img = './img/home/img-product/11.jpg';

        listProduct[12] = Product();
        listProduct[12].name = "Ví Mixi limited"; 
        listProduct[12].id =creatID();
        listProduct[12].money = 1499000;
        listProduct[12].percentSale = 7;
        listProduct[12].type = "luuniem";
        listProduct[12].img = './img/home/img-product/12.jpg';

        listProduct[13] = Product();
        listProduct[13].name = "2 bình giữ nhiệt"; 
        listProduct[13].id =creatID();
        listProduct[13].money = 250000;
        listProduct[13].percentSale = 2;
        listProduct[13].type = "luuniem";
        listProduct[13].img = './img/home/img-product/13.jpg';

        listProduct[14] = Product();
        listProduct[14].name = "Dép Mixi"; 
        listProduct[14].id =creatID();
        listProduct[14].money = 210000;
        listProduct[14].percentSale = 5;
        listProduct[14].type = "luuniem";
        listProduct[14].img = './img/home/img-product/14.jpg';

        listProduct[15] = Product();
        listProduct[15].name = "Áo Ba lỗ Mixi Đen"; 
        listProduct[15].id =creatID();
        listProduct[15].money = 150000;
        listProduct[15].percentSale = 1;
        listProduct[15].type = "luuniem";
        listProduct[15].img = './img/home/img-product/15.jpg';

        listProduct[16] = Product();
        listProduct[16].name = "Áo Ba lỗ Mixi"; 
        listProduct[16].id =creatID();
        listProduct[16].money = 250000;
        listProduct[16].percentSale = 2;
        listProduct[16].type = "mixi";
        listProduct[16].img = './img/home/img-product/16.jpg';

        listProduct[17] = Product();
        listProduct[17].name = "Áo logo PUBG"; 
        listProduct[17].id =creatID();
        listProduct[17].money = 230000;
        listProduct[17].percentSale = 3;
        listProduct[17].type = "cspubg";
        listProduct[17].img = './img/home/img-product/17.jpg';

        listProduct[18] = Product();
        listProduct[18].name = "Áo Mũ PUBG in chữ"; 
        listProduct[18].id =creatID();
        listProduct[18].money = 250000;
        listProduct[18].percentSale = 8;
        listProduct[18].type = "cspubg";
        listProduct[18].img = './img/home/img-product/18.jpg';

        listProduct[19] = Product();
        listProduct[19].name = "Áo nhân vật PUBG "; 
        listProduct[19].id =creatID();
        listProduct[19].money = 270000;
        listProduct[19].percentSale = 7;
        listProduct[19].type = "cspubg";
        listProduct[19].img = './img/home/img-product/19.jpg';

        listProduct[20] = Product();
        listProduct[20].name = "Áo Chú Chó CSGO"; 
        listProduct[20].id =creatID();
        listProduct[20].money = 270000;
        listProduct[20].percentSale = 6;
        listProduct[20].type = "cspubg";
        listProduct[20].img = './img/home/img-product/20.jpg';

        listProduct[21] = Product();
        listProduct[21].name = "Áo Holy Molly CSGO"; 
        listProduct[21].id =creatID();
        listProduct[21].money = 270000;
        listProduct[21].percentSale = 2;
        listProduct[21].type = "mixi";
        listProduct[21].img = './img/home/img-product/21.jpg';

        listProduct[22] = Product();
        listProduct[22].name = "Áo Pochinki is Life"; 
        listProduct[22].id =creatID();
        listProduct[22].money = 250000;
        listProduct[22].percentSale = 9;
        listProduct[22].type = "cspugb";
        listProduct[22].img = './img/home/img-product/22.jpg';

        listProduct[23] = Product();
        listProduct[23].name = "Áo Smoke Mid CSGO"; 
        listProduct[23].id =creatID();
        listProduct[23].money = 250000;
        listProduct[23].percentSale = 4;
        listProduct[23].type = "cspubg";
        listProduct[23].img = './img/home/img-product/23.jpg';

        listProduct[24] = Product();
        listProduct[24].name = "Áo Logo CSGO"; 
        listProduct[24].id =creatID();
        listProduct[24].money = 220000;
        listProduct[24].percentSale = 2;
        listProduct[24].type = "cspubg";
        listProduct[24].img = './img/home/img-product/24.jpg';

        listProduct[24] = Product();
        listProduct[24].name = "Áo Logo CSGO"; 
        listProduct[24].id =creatID();
        listProduct[24].money = 220000;
        listProduct[24].percentSale = 2;
        listProduct[24].type = "cspubg";
        listProduct[24].img = './img/home/img-product/25.jpg';

        listProduct[24] = Product();
        listProduct[24].name = "Áo Mũ 3 PUBG"; 
        listProduct[24].id =creatID();
        listProduct[24].money = 220000;
        listProduct[24].percentSale = 2;
        listProduct[24].type = "cspubg";
        listProduct[24].img = './img/home/img-product/26.jpg';

        listProduct[24] = Product();
        listProduct[24].name = "Áo Mũ 1 PUBG"; 
        listProduct[24].id =creatID();
        listProduct[24].money = 220000;
        listProduct[24].percentSale = 2;
        listProduct[24].type = "cspubg";
        listProduct[24].img = './img/home/img-product/27.jpg';

        listProduct[24] = Product();
        listProduct[24].name = "Áo Logo CSGO  đời 1"; 
        listProduct[24].id =creatID();
        listProduct[24].money = 220000;
        listProduct[24].percentSale = 2;
        listProduct[24].type = "cspubg";
        listProduct[24].img = './img/home/img-product/28.jpg';

        listProduct[24] = Product();
        listProduct[24].name = "Áo Rush B CSGO"; 
        listProduct[24].id =creatID();
        listProduct[24].money = 220000;
        listProduct[24].percentSale = 2;
        listProduct[24].type = "cspubg";
        listProduct[24].img = './img/home/img-product/29.jpg';

        listProduct[24] = Product();
        listProduct[24].name = "Áo Rush B CSGO 2"; 
        listProduct[24].id =creatID();
        listProduct[24].money = 220000;
        listProduct[24].percentSale = 2;
        listProduct[24].type = "cspubg";
        listProduct[24].img = './img/home/img-product/30.jpg';

        var changeListProductToJson = JSON.stringify(listProduct);
        localStorage.setItem("listProduct",changeListProductToJson);
    }
    
}
