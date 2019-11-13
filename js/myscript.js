// import { storage } from "firebase";
// // Required for side-effects
// import "firebase/firestore";
$(document).ready(function () {
    $('#dtVerticalScrollExample').DataTable({
    "scrollY": "300px",
    "scrollCollapse": true,
    });
    $('.dataTables_length').addClass('bs-select');
});

$(document).ready(function () {
    $('#rollOrder').DataTable({
    "scrollY": "250px",
    "scrollCollapse": true,
    });
    $('.dataTables_length').addClass('bs-select');
});

const tablebody = document.querySelector('#table_body');
const tablebodyOrder = document.querySelector('#table_body_order');
const table_detail = document.querySelector('#table_body_detail');
const table_td = document.querySelector('#table_td');
const table_thongke = document.querySelector('#table_body_thongke');

var tags = [];
var product_image_add = '';
var id_product_update = document.getElementById('id_product_update');
var name_product_update = document.getElementById('name_product_update');

// data
function ClearOptions(id)
{
	document.getElementById(id).options.length = 0;
}

function changeCate()   {
    
    var cate = document.getElementById('category');
    var cateLayout = document.getElementById('cateLayout');
    var length = cateLayout.options.length;
    for ( let i = 0; i < length; i++) {
        cateLayout.options[i] = null;
    }
    var cateName = cate.options[cate.selectedIndex].value;
    var option;
    if(cateName == 'HOME'){
        document.getElementById('cateLayout').options.length = 0;
        let index_home = [3,4,6];
        for(let i of index_home){
            let topRef = db.collection('CATEGORIES').doc(cateName).collection('TOP_DEALS').where('index', '==', i);
            topRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    option  = document.createElement("option");
                    option.text = doc.data().group_product_title;
                    option.value = i;
                    console.log(doc.data().group_product_title + " - " + i );
                    cateLayout.appendChild(option);
                });
            });
            
        //cateLayout.append(option);
        }
        
    }
    if(cateName == 'LAPTOP'){
        document.getElementById('cateLayout').options.length = 0;
        let index_laptop= [3,4,5,6];
        
        for(let i of index_laptop){
            let topRef = db.collection('CATEGORIES').doc(cateName).collection('TOP_DEALS').where('index', '==', i);
            topRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                        option  = document.createElement("option");
                        option.text = doc.data().group_product_title;
                        option.value = i;
                        console.log(doc.data().group_product_title + " - " + i );
                        cateLayout.appendChild(option);
                });
            });
            
        }
    }
    if(cateName == 'TV'){
        document.getElementById('cateLayout').options.length = 0;
        let index_tv= [3,4,5];
        
        for(let i of index_tv){
            let topRef = db.collection('CATEGORIES').doc(cateName).collection('TOP_DEALS').where('index', '==', i);
            topRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                        option  = document.createElement("option");
                        option.text = doc.data().group_product_title;
                        option.value = i;
                        console.log(doc.data().group_product_title + " - " + i );
                        cateLayout.appendChild(option);
                });
            });
            
        }
    }
    if(cateName == 'SMARTPHONE'){
        document.getElementById('cateLayout').options.length = 0;
        let index_phone = [3,4,5,6];
        for(let i of index_phone){
            let topRef = db.collection('CATEGORIES').doc(cateName).collection('TOP_DEALS').where('index', '==', i);
            topRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    option  = document.createElement("option");
                    option.text = doc.data().group_product_title;
                    option.value = i;
                    console.log(doc.data().group_product_title + " - " + i );
                    cateLayout.appendChild(option);
                });
            });
            
        //cateLayout.append(option);
        }
    }
    if(cateName == 'FASHION'){
        alert('FASHION');
    }
    if(cateName == 'SHOES'){
        alert('shoes')
    }
    if(cateName == 'GLASSES'){
        document.getElementById('cateLayout').options.length = 0;
        let index_glasses = [3,4,5,6];
        for(let i of index_glasses){
            let topRef = db.collection('CATEGORIES').doc(cateName).collection('TOP_DEALS').where('index', '==', i);
            topRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    option  = document.createElement("option");
                    option.text = doc.data().group_product_title;
                    option.value = i;
                    console.log(doc.data().group_product_title + " - " + i );
                    cateLayout.appendChild(option);
                });
            });
            
        //cateLayout.append(option);
        }
    }
    if(cateName == 'FURNITURE'){
        alert('FURNITURE');
    }
    if(cateName == 'SPEAKER'){
        alert('SPEAKER');
    }
    
}

    
// data
var select = document.getElementById('product_ids');
var option = document.createElement("option");

let tr = document.createElement('tr');
let id = document.createElement('td');
// /////////////////////////Start Table /////////////////////////////


function kiemtra(doc){
    var email = document.getElementById('inputEmail').nodeValue;
    var password = document.getElementById('inputPassword').nodeValue;

    if(email == doc.data.email && password == doc.data.password){
        alert('Đăng nhập thành công, Bạn hãy quay về trang chủ');
    }
}

function login(){
    db.collection("ADMIN").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            kiemtra(doc);
        });
   })
}

function renderProduct(doc){
    
    let tr = document.createElement('tr');
    let id = document.createElement('td');
    
    let name = document.createElement('td');
    let price = document.createElement('td');
    let cuttesPrice = document.createElement('td');
    let average_ratting = document.createElement('td');
    let total_ratting = document.createElement('td');
    let edit_option = document.createElement('td');
    let delete_option = document.createElement('td');


    tr.setAttribute('table_row', doc.id);
    id.textContent = doc.id;
    name.textContent = doc.data().product_fullname;
    price.textContent = doc.data().product_price;
    cuttesPrice.textContent = doc.data().product_cutted_price;
    average_ratting.textContent = doc.data().average_rating;
    total_ratting.textContent = doc.data().total_rating;
    
    edit_option.innerHTML = `<h3><i id="edit_product" data-toggle="tooltip" data-placement="left" title="Edit" style="color: blue"  class="far fa-edit"></i></h3> `;
    delete_option.innerHTML = `<h3><i id="delete_product" data-toggle="tooltip" data-placement="left" title="Delete" style="color: red"  class="far fa-trash-alt"></i> </3>`;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(price);
    tr.appendChild(cuttesPrice);
    tr.appendChild(average_ratting);
    tr.appendChild(total_ratting);
    tr.appendChild(edit_option);
    tr.appendChild(delete_option);
    
    tablebody.appendChild(tr);

    edit_option.addEventListener('click', (e) =>{
        e.stopPropagation();
        let product_id = tr.getAttribute('table_row');
        console.log("Edit ID: " +  product_id);
        var newUrl = "http://127.0.0.1:5500/startbootstrap-sb-admin-gh-pages/edit_product.html?id="+product_id + "&name="+name.textContent;
        document.location.href = newUrl;

    })

    delete_option.addEventListener('click', (e) =>{
        e.stopPropagation();
        let product_id = tr.getAttribute('table_row');
        console.log("Remove ID: " +  product_id);
        db.collection("PRODUCTS").doc(product_id).update({
            stock_quantity: 0
        }).then(function() {
            alert("Đã gán Số Lượng bằng 0!");
        })
    });
}



//load all product
db.collection("PRODUCTS").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            renderProduct(doc);
        });
});



//////////// Load Order
function loadDetail(doc){
    let tr = document.createElement('tr');
    let id_product = document.createElement('td');
    let name_product = document.createElement('td');
    //let image = document.createElement('td');
    let quantity = document.createElement('td');
    let price = document.createElement('tr');
    let payment = document.createElement('td');
    let ordered_date = document.createElement('td');
    
    tr.setAttribute('table_row_detail', doc.id);
    id_product.textContent = doc.id;
    name_product.textContent = doc.data().Product_Name;
    //image.innerHTML = `<img id="image_product"  style="width: 40px; " alt="PRODUCT">`
    quantity.textContent = doc.data().Product_Quantity;
    price.textContent = doc.data().Product_Price;
    payment.textContent = doc.data().Payment_Method;
   
    let ordered = new Date();
    ordered =  doc.data().Ordered_date;
    ordered_date.textContent = ordered.toDate();
    
    

    tr.appendChild(id_product);
    tr.appendChild(name_product);
    //tr.appendChild(image);
    tr.appendChild(quantity);
    tr.appendChild(price);
    tr.appendChild(ordered_date);
    tr.appendChild(payment);
    
    table_detail.appendChild(tr);

    
}

function renderOders(doc){
    let tr = document.createElement('tr');
    let id_field = document.createElement('td');
    let payment_status = document.createElement('td');
    let order_status = document.createElement('td');
    let totalItems = document.createElement('td');
    let total_amount = document.createElement('td');
    let packed_option = document.createElement('td');
    let shipped_option = document.createElement('td');
    let delivered_option = document.createElement('td');
    let view_option = document.createElement('td');
    

    tr.setAttribute('table_row_order', doc.id);
    id_field.textContent = doc.id;
    payment_status.textContent = doc.data().Payment_Status;

    let order_id = tr.getAttribute('table_row_order');
    db.collection("ORDERS").doc(order_id).collection('OrderItems').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            //var ref = db.collection("ORDERS").doc(order_id).collection('OrderItems').doc(doc.id).get('Order_Status');
            console.log(doc.data().Order_Status);
            var status = doc.data().Order_Status;
            order_status.textContent = status;
        });
    });
    // order_status.textContent = doc.data().Order_Status;
    totalItems.textContent = doc.data().Total_Items;
    total_amount.textContent = doc.data().Total_Amount;
    packed_option.innerHTML = `<h3><i id="packed_order" style="justify-content: center; color: blue"   class="fas fa-box" data-toggle="tooltip" data-placement="left" title="Packed"></i> </h3>`;
    shipped_option.innerHTML = `<h3><i id="shipped_order" style="color: rgb(8, 173, 82)"  class="fas fa-shipping-fast" data-toggle="tooltip" data-placement="right" title="Shipped"></i> </h3>`;
    delivered_option.innerHTML = `<h3><i id="delivered_order" style="justify-content: center; color: blue"   class="fas fa-people-carry" data-toggle="tooltip" data-placement="left" title="Packed"></i> </h3>`;

    view_option.innerHTML = `<h3><i id="view_detail_order" style="color: rgb(236, 146, 27)" class="fas fa-angle-double-right" data-toggle="tooltip" data-placement="bottom" title="Delivered"></i> </h3>`;

    tr.appendChild(id_field);
    tr.appendChild(payment_status);
    tr.appendChild(order_status);
    tr.appendChild(totalItems);
    tr.appendChild(total_amount);
    tr.appendChild(packed_option);
    tr.appendChild(shipped_option);
    tr.appendChild(delivered_option);
    tr.appendChild(view_option);
    
    tablebodyOrder.appendChild(tr);

    // var btn_packed = document.getElementById('packed_order');
    // var btn_shiped = document.getElementById('shipped_order');
    // var btn_delived = document.getElementById('delivered_order');
    
    packed_option.addEventListener('click',function(e){
        e.stopPropagation();
        let order_id = tr.getAttribute('table_row_order');
        console.log("Packed ID: " +  order_id);
        db.collection("ORDERS").doc(order_id).collection('OrderItems').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                var ref = db.collection("ORDERS").doc(order_id).collection('OrderItems').doc(doc.id);
                return ref.update({
                    Order_Status: "Packed",
                    Packed_date: firebase.firestore.Timestamp.now()
                });
            });
        });
        
    });
    
    shipped_option.addEventListener('click',function(e){
        e.stopPropagation();
        let order_id = tr.getAttribute('table_row_order');
        console.log("Shipped ID: " +  order_id);
        db.collection("ORDERS").doc(order_id).collection('OrderItems').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                var ref = db.collection("ORDERS").doc(order_id).collection('OrderItems').doc(doc.id);
                return ref.update({
                    Order_Status: "Shipped",
                    Shipped_date: firebase.firestore.Timestamp.now()
                });
            });
        });
    });
    delivered_option.addEventListener('click',function(e){
        e.stopPropagation();
        let order_id = tr.getAttribute('table_row_order');
        console.log("Delivered ID: " +  order_id);
        db.collection("ORDERS").doc(order_id).collection('OrderItems').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                var ref = db.collection("ORDERS").doc(order_id).collection('OrderItems').doc(doc.id);
                return ref.update({
                    Order_Status: "Delivered",
                    Delivered_date: firebase.firestore.Timestamp.now()
                });
            });
        });
    });
    view_option.addEventListener('click',function(e){
        e.stopPropagation();
        let order_id = tr.getAttribute('table_row_order');
        console.log("View ID: " +  order_id);
        db.collection("ORDERS").doc(order_id).collection('OrderItems').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                db.collection("ORDERS").doc(order_id).collection('OrderItems').doc(doc.id).get().then(function(product) {
                    if (product.exists) {
                        loadDetail(product);
                    } else {
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });;
                
            });
        });
    });


}

db.collection("ORDERS").get().then((snapshot) => {
    snapshot.forEach((doc) => {
        renderOders(doc);  
    });
})





/////////////Load Order




// /////////////////////////End Table /////////////////////////////
// kiem tra input type string
function allLetter(name){ 
      var letters = /^[A-Za-z]+$/;
      if(!name.value.match(letters)){
        alert('Please input alphabet characters only');
        return false;
      }else{
          return true;
      }
}
// kiem tra input type number
function allnumeric(name, field){
      var numbers = /^[0-9]+$/;
      if(!name.match(numbers))
      {
        alert('Hãy nhập số vào ' + field  + " !");
        return true;
      }
   } 
 // kiem tra input rỗng  
function isEmpty(inputtx, field) {
    if (inputtx.length == 0){ 
        alert(field + " không rỗng!");  	
        return true; 
    }
}
function changeUseTabFunction(){
    
    var use_tablayout = document.getElementById("use_tablayout").value;
    var total_spect = document.getElementById('total_specification_titles');
    var total_spect_1 = document.getElementById('total_fields_spec_title_1');
    var total_spect_2 = document.getElementById('total_fields_spec_title_2');
    var spect_1 = document.getElementById('spec_title_1');
    var spect_2 = document.getElementById('spec_title_2');
    var name_1_spect_1 = document.getElementById('spec_title_1_field_1_name');
    var field_1_spect_1 = document.getElementById('spec_title_1_field_1_value');
    var name_2_spect_1 = document.getElementById('spec_title_1_field_2_name');
    var field_2_spect_1 = document.getElementById('spec_title_1_field_2_value');
    var name_1_spect_2 = document.getElementById('spec_title_2_field_1_name');
    var field_1_spect_2 = document.getElementById('spec_title_2_field_1_value');
    var name_2_spect_2 = document.getElementById('spec_title_2_field_2_name');
    var field_2_spect_2 = document.getElementById('spec_title_2_field_2_value');

    if(use_tablayout == 'false'){
        total_spect.disabled = true;
        total_spect_1.disabled = true;
        total_spect_2.disabled = true;
        spect_1.disabled = true;
        spect_2.disabled = true;
        name_1_spect_1.disabled = true;
        field_1_spect_1.disabled = true;
        name_2_spect_1.disabled = true;
        field_2_spect_1.disabled = true;
        name_1_spect_2.disabled = true;
        field_1_spect_2.disabled = true;
        name_2_spect_2.disabled = true;
        field_2_spect_2.disabled = true;
    }
    else{
        alert('KHong dung');
    }
}
function changeUseMonthFunction(){
    var month_opt = document.getElementById('month').value;
    console.log(month_opt);

    //var month = new 
    var month_array = [];
    db.collection("ORDERS").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var time_data = doc.data().time_ordered;
            console.log('ID: ' + doc.id + " time: " + time_data);
            var month = new Date(time_data);
            console.log(month);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


}
function upLoadStorage1(image, imageName, id){  
    var cate = document.getElementById('category');
    var layout = document.getElementById('cateLayout');
    var category =  cate.options[cate.selectedIndex].value;
    var cateLayout = Number(layout.options[layout.selectedIndex].value);
    var product_name = document.getElementById('product_name').value;
    var product_price = document.getElementById('product_price').value;
    var product_desription = document.getElementById('product_description').value;
    let storageRef = firebase.storage().ref('Products/' + imageName);
   // mang.push(storageRef.getDownloadURL());
    var uploadTask = storageRef.put(image);
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
      }, function(error) {
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            db.collection("PRODUCTS").doc(id).update({
                product_image_1: downloadURL
            });

            // add vao CATEGORIES
            console.log('Cate Layout: '  + cateLayout);
            console.log('Cate: ' +   category)
            var topRef = db.collection('CATEGORIES').doc(category).collection('TOP_DEALS').where('index', '==', cateLayout);
            topRef.get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            var view_type = doc.get('view_type');
                            var num_products = doc.get('num_products');
                            var doc_id = doc.id;
                            
                            db.collection("PRODUCTS").doc(id).get().then(function(doc_data) {
                                //product_image_add =  doc_data.data().product_image_1;
                                //console.log('Image added:' + product_image_add);
                                num_products = num_products + 1;
                                db.collection('CATEGORIES').doc(category).collection('TOP_DEALS').doc(doc_id).update({
                                    ['product_id_' + num_products]: id,
                                    ['product_image_' + num_products]: downloadURL,
                                    ['product_price_' + num_products]: product_price,
                                    ['product_name_' + num_products]: product_name,
                                    num_products: num_products,
                                    ['product_descr_' + num_products]: product_desription
                                }).then(function(docRef) {
                                    alert('Sản phẩm đã được thêm vào Category');
                                });
                            });
                        });
            });
            // add vao CATEGORIES
            

        });
      });


}
function upLoadStorage2(image, imageName, id){  
     
    let storageRef = firebase.storage().ref('Products/' + imageName);
   // mang.push(storageRef.getDownloadURL());
    var uploadTask = storageRef.put(image);
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
      }, function(error) {
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          db.collection("PRODUCTS").doc(id).update({
            product_image_2: downloadURL
        }) 
        });
      });
}
function upLoadStorage3(image, imageName, id){  
    
    let storageRef = firebase.storage().ref('Products/' + imageName);
   // mang.push(storageRef.getDownloadURL());
    var uploadTask = storageRef.put(image);
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
      }, function(error) {
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          db.collection("PRODUCTS").doc(id).update({
            product_image_3: downloadURL
        }) 
        });
      });


}
function getImageurlAdded(id){
    db.collection("PRODUCTS").doc(id).get().then(function(doc) {
        product_image_add = doc.data().product_image_1
    });
}
function add_product(){
    var cate = document.getElementById('category');
    var layout = document.getElementById('cateLayout');

    var alb = document.getElementById('cod');
    var tab = document.getElementById("use_tablayout");
    var category =  cate.options[cate.selectedIndex].value;
    var cateLayout = Number(layout.options[layout.selectedIndex].value);
    var product_name = document.getElementById('product_name').value;
    var product_price = document.getElementById('product_price').value;
    var stock_quantity = document.getElementById('stock_quantity').value;
    var max_quantity = document.getElementById('max_quantity').value;
    var product_desription = document.getElementById('product_description').value;
    var product_cutted_price = document.getElementById('product_cutted_price').value;
    var use_tablayout = tab.options[tab.selectedIndex].value;
    var cod = alb.options[alb.selectedIndex].value;
    var free_discount_name = document.getElementById('free_discount_name').value;
    var free_discount_body = document.getElementById('free_discount_body').value;
    var free_discount = document.getElementById('free_discount').value;
    var product_other_detail = document.getElementById('product_other_detail').value;

    var total_specifications = document.getElementById('total_specification_titles').value;
    var total_fields_spec_title_1 = document.getElementById('total_fields_spec_title_1').value;
    var total_fields_spec_title_2 = document.getElementById('total_fields_spec_title_2').value;
    var specification_1 = document.getElementById('spec_title_1').value;
    var specification_2 = document.getElementById('spec_title_2').value;
    var specification_1_name_1 = document.getElementById('spec_title_1_field_1_name').value;
    var specification_1_field_1 = document.getElementById('spec_title_1_field_1_value').value;
    var specification_1_name_2 = document.getElementById('spec_title_1_field_2_name').value;
    var specification_1_field_2 = document.getElementById('spec_title_1_field_2_value').value;
    var specification_2_name_1 = document.getElementById('spec_title_2_field_1_name').value;
    var specification_2_field_1 = document.getElementById('spec_title_2_field_1_value').value;
    var specification_2_name_2 = document.getElementById('spec_title_2_field_2_name').value;
    var specification_2_field_2 = document.getElementById('spec_title_2_field_2_value').value;
    var tag1 = document.getElementById('tag1').value;
    var tag2 = document.getElementById('tag2').value;
    var tag3 = document.getElementById('tag3').value;
    var tag4 = document.getElementById('tag4').value;
    
    var anh1 = document.getElementById('img1');
    var anh2 = document.getElementById('img2');
    var anh3 = document.getElementById('img3');
    var img1 = anh1.files[0];
    var img2 = anh2.files[0];
    var img3 = anh3.files[0];

    var imageName1 = document.getElementById("img1").files[0].name;
    var imageName2 = document.getElementById("img2").files[0].name;
    var imageName3 = document.getElementById("img3").files[0].name;

    if(tag1.length > 0){
        tags.push(tag1);
    }
    if(tag2.length > 0){
        tags.push(tag2);
    }
    if(tag3.length > 0){
        tags.push(tag3);
    }
    if(tag4.length > 0){
        tags.push(tag4);
    }

    var total_rating = 4;
    
    console.log('Product name: ' + product_name);
        console.log('Product price: ' + product_price);
        console.log('Product cutted: ' + product_cutted_price);
        console.log('Product description: ' + product_desription);
        console.log('Product name discount: ' + free_discount_name);
        console.log('Product body discount: ' + free_discount_body);
        console.log('Product num free discount: ' + free_discount);
        console.log('Spect 1: ' + specification_1);
        console.log('Spect 2: ' + specification_2);

    if(!isEmpty(product_name, 'Tên sản phẩm ') && !isEmpty(product_price, 'Gía sản phẩm ') && !isEmpty(product_description, 'Mô tả sản phẩm') && !isEmpty(product_cutted_price, 'Gía cũ') && !isEmpty(free_discount_name,'Tên khuyến mãi') && !isEmpty(free_discount_body,'Nội dung khuyến mãi') && !isEmpty(specification_2, 'Mục 2') ){      

         var docData = {
            star_1: 0,
            star_2: 0,
            star_3: 2,
            star_4: 0,
            star_5: 2,
            average_rating: '4.0',
            cod: Boolean(cod),
            free_discount: Number(free_discount),
            free_discount_title: free_discount_name,
            free_discount_body: free_discount_body,
            max_quantity: Number(max_quantity),
            no_of_product_images: 3,
            offers_applied: 0,
            product_cutted_price: product_cutted_price,
            product_description: product_desription,
            product_fullname: product_name,
            product_other_detail: product_other_detail,
            product_price: product_price,
            spec_title_1: specification_1,
            spec_title_1_field_1_name: specification_1_name_1,
            spec_title_1_field_1_value: specification_1_field_1,
            spec_title_1_field_2_name: specification_1_name_2,
            spec_title_1_field_2_value: specification_1_field_2,
            spec_title_2: specification_2,
            spec_title_2_field_1_name: specification_2_name_1,
            spec_title_2_field_1_value: specification_2_field_1,
            spec_title_2_field_2_name: specification_2_name_2,
            spec_title_2_field_2_value: specification_2_field_2,
            stock_quantity: Number(stock_quantity),
            tags: tags,
            total_fields_spec_title_1: Number(total_fields_spec_title_1),
            total_fields_spec_title_2: Number(total_fields_spec_title_2),
            total_rating: Number(total_rating),
            total_specification_titles: Number(total_specifications),
            use_tab_layout: Boolean(use_tablayout),
            product_image_1: '',
            product_image_2: '',
            product_image_3: ''
        };

        console.log(docData);

        var newProductRef = db.collection("PRODUCTS");
        newProductRef.add(docData).then(function(docRef) {
           var product_id_add = docRef.id;
            alert("Đã thêm vào PRODUCTS: ", docRef.id);
            upLoadStorage1(img1, imageName1, docRef.id); //Add vao storage
            upLoadStorage2(img2, imageName2, docRef.id);
            upLoadStorage3(img3, imageName3, docRef.id);

            getImageurlAdded(docRef.id);
            // // add vao CATEGORIES
            // console.log('Cate Layout: '  + cateLayout);
            // console.log('Cate: ' +   category)
            // var topRef = db.collection('CATEGORIES').doc(category).collection('TOP_DEALS').where('index', '==', cateLayout);
            // topRef.get().then((querySnapshot) => {
            //             querySnapshot.forEach((doc) => {
            //                 var view_type = doc.get('view_type');
            //                 var num_products = doc.get('num_products');
            //                 var doc_id = doc.id;
                            
            //                 db.collection("PRODUCTS").doc(product_id_add).get().then(function(doc_data) {
            //                     product_image_add =  doc_data.data().product_image_1;
            //                     console.log('Image added:' + product_image_add);
            //                     num_products = num_products + 1;
            //                     db.collection('CATEGORIES').doc(category).collection('TOP_DEALS').doc(doc_id).update({
            //                         ['product_id_' + num_products]: docRef.id,
            //                         ['product_image_' + num_products]: product_image_add,
            //                         ['product_price_' + num_products]: product_price,
            //                         ['product_name_' + num_products]: docData.product_fullname,
            //                         num_products: num_products,
            //                         ['product_descr_' + num_products]: docData.product_description
            //                     }).then(function(docRef) {
            //                         alert('Sản phẩm đã được thêm vào Category');
            //                     });
            //                 });
            //             });
            // });
            // // add vao CATEGORIES
        });
        // Add PRODUCTS

    }
}//add product

//Update 
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
var id_update = id_array.id[0];

name_product_update.value = id_array.name[0];
id_product_update.value = id_array.id[0];

function update_product(){
    
    var alb = document.getElementById('cod');
    //var category =  cate.options[cate.selectedIndex].value;
    var product_name = document.getElementById('product_name').value;
    var product_price = document.getElementById('product_price').value;
    var product_desription = document.getElementById('product_description').value;
    var product_cutted_price = document.getElementById('product_cutted_price').value;
    var cod = alb.options[alb.selectedIndex].value;
    var free_discount_name = document.getElementById('free_discount_name').value;
    var free_discount_body = document.getElementById('free_discount_body').value;
    var free_discount = document.getElementById('free_discount').value;

    var tag1 = document.getElementById('tag1').value;
    var tag2 = document.getElementById('tag2').value;
    var tag3 = document.getElementById('tag3').value;
    var tag4 = document.getElementById('tag4').value;

    if(tag1.length > 0){
        tags.push(tag1);
    }
    if(tag2.length > 0){
        tags.push(tag2);
    }
    if(tag3.length > 0){
        tags.push(tag3);
    }
    if(tag4.length > 0){
        tags.push(tag4);
    }

    if(!isEmpty(product_name, 'Tên sản phẩm') && !isEmpty(product_price, 'Gía')){
        db.collection("PRODUCTS").doc(id_update).update({
    
            cod: Boolean(cod),
            free_discount: Number(free_discount),
            free_discount_title: free_discount_name,
            free_discount_body: free_discount_body,
            product_cutted_price: product_cutted_price,
            product_description: product_desription,
            product_fullname: product_name,
            product_price: product_price,
            tags: tags
            
        }).then((snapshot) => {
            alert('Đã update thành công');
        });
    }


//    console.log('cod: ' + cod);
//    console.log('num:' +  free_discount);
//    console.log('titlr: ' + free_discount_name );
//    console.log('body: ' + free_discount_body);
//    console.log('cutted: ' + product_cutted_price);
//    console.log('descr: ' + product_desription);
//    console.log('name: ' + product_name);
//    console.log('product_price: ' + product_price);
//    console.log('tags: ' + tags);
}

//Update

