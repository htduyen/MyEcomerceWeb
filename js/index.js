const tableOutOfStock = document.querySelector('#table_body_stock_qty');
const table_body_add_qty = document.querySelector('#table_body_add_qty');
$(document).ready(function () {
    $('#rollUsers').DataTable({
    "scrollY": "200px",
    "scrollCollapse": true,
    });
    $('.dataTables_length').addClass('bs-select');
});

$(document).ready(function () {
    $('#rollQty').DataTable({
    "scrollY": "250px",
    "scrollCollapse": true,
    });
    $('.dataTables_length').addClass('bs-select');
});

$(document).ready(function () {
    $('#rollAdd').DataTable({
    "scrollY": "250px",
    "scrollCollapse": true,
    });
    $('.dataTables_length').addClass('bs-select');
});
//index
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    console.log(parms);
    
    return parms;
}
var id_array =  parseURLParams(window.location.href);
var u_name, pwd;
try {
    u_name = id_array.email[0];
    pwd = id_array.password[0];
    document.getElementById('navbarDropdown').innerHTML = u_name;
    //document.getElementById('txtDangnhap').innerHTML = "Đăng xuất";
} catch (error) {
   
    let result = confirm("Bạn chưa đăng nhập! Bạn có muốn đăng nhập không?"); 
                if (result == true) { 
                    document.location.href = 'login.html'
                } else { 
                    document.location.href = "blank.html"; 
                   
                }
}


if(u_name == '' || pwd == ''){
    alert('Hãy đăng nhâp');
}
console.log("url:" + id_array);
console.log('Email: ' + u_name);
console.log('Pwd: ' + pwd);



var num_users_admin = 0;
db.collection("USERS").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        num_users_admin = num_users_admin + 1;
    });
    document.getElementById('num_users').innerHTML = 'Số lượng Users: ' + num_users_admin;
});

var num_products_admin = 0;
db.collection("PRODUCTS").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        num_products_admin++;
    });
    document.getElementById('num_products').innerHTML = 'Số lượng hàng hóa: ' + num_products_admin;
});

var num_orders_admin = 0;
db.collection("ORDERS").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        num_orders_admin++;
    });
    document.getElementById('num_orders').innerHTML = 'Số lượng đơn đặt hàng: ' + num_orders_admin;
});

var order_cancel_request_admin = 0;
db.collection("CANCELLED ORDERS").where("Order_Cancelled", "==", false).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        order_cancel_request_admin++;
    });
    document.getElementById('order_cancel_request').innerHTML = 'Số lượng đơn đặt hàng hủy chờ duyệt: ' + order_cancel_request_admin;
});

const tablebodyUsers = document.querySelector('#table_body_user');


db.collection("USERS").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let id_user= doc.id;
        let tr = document.createElement('tr');
        let id = document.createElement('td');
        let username = document.createElement('td');
        let email = document.createElement('td');
        // let option = document.createElement('td');
        // option.style.textAlign = 'center';
        tr.setAttribute('table_row_users', doc.id);
        id.textContent = doc.id;
        username.textContent = doc.data().username;
        email.textContent = doc.data().email;
        // option.innerHTML = `<h3><i id="delete_user" data-toggle="tooltip" data-placement="left" title="Delete" style="color: red"  class="far fa-trash-alt"></i> </3>`;

        tr.appendChild(id);
        tr.appendChild(username);
        tr.appendChild(email);
        // tr.appendChild(option);
        
        tablebodyUsers.appendChild(tr);


    });
    
});


//index
var type_dis;
function changeOptionDiscount(){
    type_dis = document.getElementById('typediscount').value;
    console.log('Type dis: ' + type_dis);
    document.getElementById('notification_award').style.display = 'none'; 
    if(type_dis == 'flat'){
        document.getElementById('discount').style.display = 'none';
        document.getElementById('flat').style.display = 'block';
    }else{
        document.getElementById('discount').style.display = 'block';
        document.getElementById('flat').style.display = 'none';
    }
}

function add_discount(){

    let body =document.getElementById('discount_body').value;
    let lower = document.getElementById('lower_limit').value;
    //let upper = document.getElementById('upper_limit').value;
    let amount = document.getElementById('amount').value;
    let percent = document.getElementById('percent').value;
    let date = document.getElementById('date').value;

    let awardDiscount = {
        alreadlyUse: false,
        percent: String(percent),
        body: String(body),
        lower_limit: String(lower),
        type: 'Discount',
        upper_limit: 50000000,
        validity: firebase.firestore.Timestamp.fromDate(new Date(date))
    }

    let awardFlat = {
        alreadlyUse: false,
        amount: String(amount),
        body: String(body),
        lower_limit: String(lower),
        type: 'Flat',
        upper_limit: 50000000,
        validity: firebase.firestore.Timestamp.fromDate(new Date(date))
    }


    db.collection("USERS").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " ==> ", doc.data());
            let id = doc.id;
            if(type_dis == 'flat'){
                db.collection("USERS").doc(id).collection('USER_REWARDS').where('type', '==', 'Flat').get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let doc_id = doc.id;
                        db.collection("USERS").doc(id).collection('USER_REWARDS').doc(doc_id).set(awardFlat)
                        .then(function() {
                            document.getElementById('discount_body').value = '' ;
                            document.getElementById('lower_limit').value = '3000000';
                            //document.getElementById('upper_limit').value ='50000000' ;
                            document.getElementById('amount').value = '500000';
                            document.getElementById('percent').value ='10';
                            document.getElementById('date').value =Date.now();
                            document.getElementById('notification_award').style.display = 'block';       
                        });
                    });
                })
            }else{
                db.collection("USERS").doc(id).collection('USER_REWARDS').where('type', '==', 'Discount').get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let doc_id = doc.id;
                        db.collection("USERS").doc(id).collection('USER_REWARDS').doc(doc_id).set(awardDiscount)
                        .then(function() {
                            document.getElementById('discount_body').value = '' ;
                            document.getElementById('lower_limit').value = '3000000';
                            //document.getElementById('upper_limit').value ='50000000' ;
                            document.getElementById('amount').value = '500000';
                            document.getElementById('percent').value ='10';
                            document.getElementById('date').value = Date.now();
                            document.getElementById('notification_award').style.display = 'block';
                        });
                    });
                })
             }
        });
    });  
}

function add_notification(){
    let notify_body = document.getElementById('notification_body').value;
    let image = document.getElementById('choiceImageNotify').files[0];
    let image_notify = document.getElementById('choiceImageNotify').files[0].name;

    if(notify_body != '' && image_notify != '' ){
        // console.log(notify_body);
        // console.log(image_notify);

        db.collection("USERS").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let id = doc.id;
                //console.log('ID: ' + id);
               
                db.collection("USERS").doc(id).collection('USER_DATA').doc('MY_NOTIFICATIONS').get()
                .then(function(doc) {
                    
                        let doc_id = doc.id;
                        let doc_size = doc.data().list_size;
                        // console.log(doc_id);
                        // console.log(id + ' => ' + 'doc id: ' + doc_id + ' => ' + doc_size);

                         //upload img
                        let storageRef = firebase.storage().ref('Products/' + image_notify);
                        var uploadTask = storageRef.put(image);
                        uploadTask.on('state_changed', function(snapshot){
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            //console.log('Upload is ' + progress + '% done');
                        }, function(error) {
                        }, function() {
                            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                //console.log('File available at', downloadURL);
                                db.collection("USERS").doc(id).collection('USER_DATA').doc('MY_NOTIFICATIONS').update({
                                    list_size: doc_size +1,
                                    ['Body_' + doc_size]: notify_body,
                                    ['Image_' + doc_size]: downloadURL,
                                    ['Readed_' + doc_size]: false,
                                })
                                .then(function() {
                                    document.getElementById('notification_body').value = '' ;
                                    document.getElementById('choiceImageNotify').value = '';
                                    document.getElementById('notification_notify').style.display = 'block';       
                                });
                            });
                        }); 
                        //upload image

                       
                    
                });
                
            });
        });

       
    }
    
}
function loadProductGetOutOf(doc){
    let tr = document.createElement('tr');

    let idProduct = document.createElement('td');
    let nameProduct = document.createElement('td');
    let imgProduct = document.createElement('td');
    let option = document.createElement('td');
    let qty = document.createElement('td');
    
    let img_product = document.createElement('img');
    let productID = doc.id;

    
    idProduct.textContent = doc.id;
    nameProduct.textContent = doc.data().product_fullname;
    var product_name = doc.data().product_fullname
    var product_image = doc.data().product_image_1
    img_product.src = doc.data().product_image_1;
    img_product.style.width = '90px';
    img_product.style.height = '120px';

    qty.innerHTML = `<input type='number' class='form-control' name='' id="${doc.id}" value='0'>`;
    qty.setAttribute('value', doc.data().stock_quantity)
    option.innerHTML = `<button id="" class="btn btn-danger">Cập Nhật Số Lượng</button>`;
    option.style.textAlign = 'center';
    option.style.justifyContent = 'center';
    
    imgProduct.appendChild(img_product);
    imgProduct.style.textAlign = 'center';
    tr.setAttribute('table_row_outodStock', doc.id);
    tr.appendChild(idProduct);
    tr.appendChild(nameProduct);
    tr.appendChild(imgProduct);
    tr.appendChild(qty)
    tr.appendChild(option);
    
    tableOutOfStock.appendChild(tr);

    option.addEventListener('click',function(e){
        e.stopPropagation();
        //alert('ID: ' + productID)
        let qty_pro = Number(document.getElementById(productID).value);
        if(qty_pro < 0){
            alert('Số lượng không âm')
        }else{
            db.collection("PRODUCTS").doc(productID).update({
                stock_quantity: Number(qty_pro)
            }).then(function() {
                alert("Đã cập nhật số lượng " + qty_pro);
                //Them thong bao co hàng
                db.collection("USERS").get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let id = doc.id;
                        db.collection("USERS").doc(id).collection('USER_DATA').doc('MY_NOTIFICATIONS').get()
                        .then(function(doc) {
                                let doc_size = doc.data().list_size;
                                db.collection("USERS").doc(id).collection('USER_DATA').doc('MY_NOTIFICATIONS').update({
                                    list_size: doc_size +1,
                                    ['Body_' + doc_size]: product_name + ' đã có hàng, hãy tiếp tục mua sắm',
                                    ['Image_' + doc_size]: product_image,
                                    ['Readed_' + doc_size]: false,
                                })
                                .then(function() {
                                    document.getElementById('notification_body').value = '' ;
                                    document.getElementById('choiceImageNotify').value = '';
                                    document.getElementById('notification_notify').style.display = 'block';       
                                });
                            });
                        });
                        
                });
                //Them thong bao co hàng
            });
        }
    });
}
db.collection("PRODUCTS").where("stock_quantity", "==", 0).get().then((snapshot) => {
    snapshot.forEach((doc) => {
        loadProductGetOutOf(doc);  
    });
});

function nhaphang(id, sl, img, name){
    console.log(id, sl, img, name)
    let tr = document.createElement('tr');

    let idProduct = document.createElement('td');
    let nameProduct = document.createElement('td');
    let imgProduct = document.createElement('td');
    let option = document.createElement('td');
    let qty = document.createElement('td');
    let add = document.createElement('td');
    let img_product = document.createElement('img');
    let productID = id;

    
    idProduct.textContent = id;
    nameProduct.textContent = name;
    var product_name = name
    var product_image = img
    img_product.src = img;
    img_product.style.width = '90px';
    img_product.style.height = '125px';

    qty.innerHTML = `<input type='number' style="justify-content:center; text-align: center" class='form-control' name='' disabled value="${sl}">`;
    add.innerHTML = `<input type='number' style="justify-content:center; text-align: center" class='form-control' name='' id="nhapthem${id}" value="0">`;
    
    qty.setAttribute('value', sl)
    option.innerHTML = `<button id="" class="btn btn-danger">Nhập Thêm</button>`;
    option.style.textAlign = 'center';
    option.style.justifyContent = 'center';
    
    imgProduct.appendChild(img_product);
    imgProduct.style.textAlign = 'center';
    tr.setAttribute('table_body_add_qty', id);
    tr.appendChild(idProduct);
    tr.appendChild(nameProduct);
    tr.appendChild(imgProduct);
    tr.appendChild(qty)
    tr.appendChild(add)
    tr.appendChild(option);
    
    table_body_add_qty.appendChild(tr);

    option.addEventListener('click',function(e){
        e.stopPropagation();
        //alert('ID: ' + productID)
        let qty_pro = Number(document.getElementById('nhapthem' + productID).value);
        if(qty_pro < 0){
            alert('Số lượng không âm')
        }else{
            db.collection("PRODUCTS").doc(productID).update({
                stock_quantity: firebase.firestore.FieldValue.increment(qty_pro)
            }).then(function() {
                alert("Đã cập nhật số lượng " + qty_pro);
                //Them thong bao co hàng
                db.collection("USERS").get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let id_u = doc.id;
                        db.collection("USERS").doc(id_u).collection('USER_DATA').doc('MY_NOTIFICATIONS').get()
                        .then(function(doc) {
                                let doc_size = doc.data().list_size;
                                db.collection("USERS").doc(id_u).collection('USER_DATA').doc('MY_NOTIFICATIONS').update({
                                    list_size: doc_size +1,
                                    ['Body_' + doc_size]: product_name + ' đã có hàng, hãy tiếp tục mua sắm',
                                    ['Image_' + doc_size]: product_image,
                                    ['Readed_' + doc_size]: false,
                                })
                               
                            });
                        });
                        
                });
                //Them thong bao co hàng
            });
        }
    });

}
var tonkho = 0;
db.collection("PRODUCTS").get().then(function(querySnapshot) {
    querySnapshot.forEach((doc1) => {
        
                tonkho = doc1.data().stock_quantity
                var sl = 0;
                db.collection("PRODUCTS").doc(doc1.id).collection('QUANTITY').get().then(function(querySnapshot) {
                    querySnapshot.forEach((doc_qty) => {
                        sl++;
                        //console.log(sl);
                    });
                    tonkho = doc1.data().stock_quantity
                    //console.log('Id: ' + doc1.id + 'SL: ' + sl);
                    if(sl == tonkho) {
                        let id = doc1.id
                        let img = doc1.data().product_image_1;
                        let name = doc1.data().product_fullname;
                        nhaphang(id,sl,img, name);
                    }
                });
                sl = 0;
                tonkho = 0;
        // sl++;
        // console.log(sl);
    });
    
});