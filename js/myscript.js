// import { storage } from "firebase";
// // Required for side-effects
// import "firebase/firestore";
const tablebody = document.querySelector('#table_body');
const tablebodyOrder = document.querySelector('#table_body_order');
const table_td = document.querySelector('#table_td');
var tags = [];

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
    
    edit_option.innerHTML = `<i id="edit_product" style="color: blue"  class="far fa-edit"></i> Edit`;
    delete_option.innerHTML = `<i id="delete_product" style="color: red"  class="far fa-trash-alt"></i> Delete`;

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
    })

    delete_option.addEventListener('click', (e) =>{
        e.stopPropagation();
        let product_id = tr.getAttribute('table_row');
        console.log("Remove ID: " +  product_id);
    });

    


}

//load all product
db.collection("PRODUCTS").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            renderProduct(doc);
        });
});



//////////// Load Order
function renderOders(doc){
    let tr = document.createElement('tr');
    let id_field = document.createElement('td');
    //id_field.id = 'id_order';
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
    order_status.textContent = doc.data().Order_Status;
    totalItems.textContent = doc.data().Total_Items;
    total_amount.textContent = doc.data().Total_Amount;
    packed_option.innerHTML = `<h3><i id="packed_order" style="justify-content: center; color: blue"   class="fas fa-box" data-toggle="tooltip" data-placement="left" title="Packed"></i> </h3>`;
    shipped_option.innerHTML = `<h3><i id="shipped_order" style="color: rgb(8, 173, 82)"  class="fas fa-shipping-fast" data-toggle="tooltip" data-placement="right" title="Shipped"></i> </h3>`;
    delivered_option.innerHTML = `<h3><i id="shipped_order" style="justify-content: center; color: blue"   class="fas fa-people-carry" data-toggle="tooltip" data-placement="left" title="Packed"></i> </h3>`;

    view_option.innerHTML = `<h3><i id="delivered_order" style="color: rgb(236, 146, 27)" class="fas fa-angle-double-right" data-toggle="tooltip" data-placement="bottom" title="Delivered"></i> </h3>`;

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

    packed_option.addEventListener('click',function(e){
        e.stopPropagation();
        let order_id = tr.getAttribute('table_row_order');
        console.log("Packed ID: " +  order_id);
        db.collection('ORDERS').doc(order_id).collection('OrderItems').doc().update({
            Order_Status: 'Packed',
            Packed_date: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
            console.log("Document successfully updated!");
        })
    });
    shipped_option.addEventListener('click',function(e){
        e.stopPropagation();
        let order_id = tr.getAttribute('table_row_order');
        console.log("Shipped ID: " +  order_id);
    });
    delivered_option.addEventListener('click',function(e){
        e.stopPropagation();
        let order_id = tr.getAttribute('table_row_order');
        console.log("Delivered ID: " +  order_id);
    });
    view_option.addEventListener('click',function(e){
        e.stopPropagation();
        let order_id = tr.getAttribute('table_row_order');
        console.log("View ID: " +  order_id);
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
      if(!name.value.match(numbers))
      {
        alert('Hãy nhập số vào ' + field  + " !");
        return false;
      }else{
          return true;
      }
   } 
 // kiem tra input rỗng  
function isEmpty(inputtx, field) {
    if (inputtx.value.length == 0){ 
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
function upLoadStorage1(image, imageName, id){  
     
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
        }) 
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
function add_product(){


    var cate = document.getElementById('category');
    var tab = document.getElementById("use_tablayout");
    var alb = document.getElementById('cod');
    var name  = document.getElementById('product_name');
    var price = document.getElementById('product_price');
    var stock_qty = document.getElementById('stock_quantity');
    var max_qty = document.getElementById('max_quantity');
    var description = document.getElementById('product_description');
    var cutted =  document.getElementById('product_cutted_price');
    var name_discount = document.getElementById('free_discount_name');
    var body_discount = document.getElementById('free_discount_body');;
    var num_free_discount = document.getElementById('free_discount');
    var other_detail = document.getElementById('product_other_detail');

    var anh1 = document.getElementById('img1');
    var anh2 = document.getElementById('img2');
    var anh3 = document.getElementById('img3');
    var img1 = anh1.files[0];
    var img2 = anh2.files[0];
    var img3 = anh3.files[0];

    var imageName1 = document.getElementById("img1").files[0].name;
    var imageName2 = document.getElementById("img2").files[0].name;
    var imageName3 = document.getElementById("img3").files[0].name;
    
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
    var tag_1 = document.getElementById('tag1');
    var tag_2 = document.getElementById('tag2');
    var tag_3 = document.getElementById('tag3');
    var tag_4 = document.getElementById('tag4');

    var category = cate.options[cate.selectedIndex].text;
    var product_name = name.value;
    var product_price = price.value;
    var stock_quantity = stock_qty.value;
    var max_quantity = max_qty.value;
    var product_desription = description.value;
    var product_cutted_price = cutted.value;
    var use_tablayout = tab.options[tab.selectedIndex].value;
    var cod = alb.options[alb.selectedIndex].value;
    var free_discount_name = name_discount.value;
    var free_discount_body = body_discount.value;
    var free_discount = num_free_discount.value;
    var product_other_detail = other_detail.value;

    var total_specifications = total_spect.value;
    var total_fields_spec_title_1 = total_spect_1.value;
    var total_fields_spec_title_2 = total_spect_2.value;
    var specification_1 = spect_1.value;
    var specification_2 = spect_2.value;
    var specification_1_name_1 = name_1_spect_1.value;
    var specification_1_field_1 = field_1_spect_1.value;
    var specification_1_name_2 = name_2_spect_1.value;
    var specification_1_field_2 = field_2_spect_1.value;
    var specification_2_name_1 = name_1_spect_2.value;
    var specification_2_field_1 = field_1_spect_2.value;
    var specification_2_name_2 = name_2_spect_2.value;
    var specification_2_field_2 = field_2_spect_2.value;
    var tag1 = tag_1.value;
    var tag2 = tag_2.value;
    var tag3 = tag_3.value;
    var tag4 = tag_4.value;

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
    var star_1 = 0;
    var star_2 = 0;
    var star_3 = 0;
    var star_4 = 0;
    var star_5 = 1;
    var average_rating = 5;
    var no_of_product_images = 3;
    var offers_applied = 0;
    var total_rating = 1;

    if(!isEmpty(name, 'Tên sản phẩm ') && !isEmpty(price, 'Gía sản phẩm ') && !isEmpty(description, 'Mô tả sản phẩm') && !isEmpty(cutted, 'Gía cũ') && !isEmpty(name_discount,'Tên khuyến mãi') && !isEmpty(body_discount,'Nội dung khuyến mãi') && !isEmpty(spect_1, 'Mục 1') && !isEmpty(spect_2, 'Mục 2') && !isEmpty(name_1_spect_1, 'Trường 1') && !isEmpty(field_1_spect_1, 'Gía trị 1') && !isEmpty(name_2_spect_1, 'Trường 2') && !isEmpty(field_2_spect_1, 'Gía trị 2') && !isEmpty(name_1_spect_2, 'Trường 1') && !isEmpty(field_1_spect_2, 'Gía trị 1') && !isEmpty(name_2_spect_2, 'Trường 2') && !isEmpty(field_2_spect_2, 'Gía trị 2') && !isEmpty(anh1, 'Ảnh 1') && !isEmpty(anh2, 'Ảnh 2') && !isEmpty(anh3, 'Ảnh 3') && allnumeric(price, 'Gía sản phẩm') && allnumeric(cutted, 'Gía cũ') && allnumeric(num_free_discount, 'Khuyến mãi ') && allnumeric(total_spect_1, 'Số mục 1') && allnumeric(total_spect_2, 'Số trường 2')){
        
        console.log("1_star: " + star_1);
        console.log("2_star: " + star_2);
        console.log("3_star: " + star_3);
        console.log("4_star: " + star_4);
        console.log("5_star: " + star_5);
        console.log("average_rating: " + average_rating);
        console.log("no_of_product_images: " + no_of_product_images);
        console.log("offers_applied: " + offers_applied);
        console.log("total_rating: " + total_rating);
        console.log("cod: " + cod);
        console.log("Tags: " + tags);
        console.log("Category: " + category);
        console.log('Product name: ' + product_name);
        console.log('Product price: ' + product_price);
        console.log('Product cutted: ' + product_cutted_price);
        console.log('Product description: ' + product_desription);
        console.log('Product name discount: ' + free_discount_name);
        console.log('Product body discount: ' + free_discount_body);
        console.log('Product num free discount: ' + free_discount);
        console.log('Spect 1: ' + specification_1);
        console.log('Spect 2: ' + specification_2);
        
        var docData = {
            star_1: 0,
            star_2: 0,
            star_3: 0,
            star_4: 0,
            star_5: 5,
            average_rating: String(5),
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
            stock_quantity: Number(max_quantity),
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


        var newProductRef = db.collection("PRODUCTS");
        newProductRef.add(docData).then(function(docRef) {
            alert("Đã thêm vào PRODUCTS: ", docRef.id);
            upLoadStorage1(img1, imageName1, docRef.id); //Add vao storage
            upLoadStorage2(img2, imageName2, docRef.id);
            upLoadStorage3(img3, imageName3, docRef.id);


        });// Add PRODUCTS
       

    }
}

function test(){
            // add vao category
            var topRef = db.collection('CATEGORIES').doc(category).collection('TOP_DEALS').where('index', '==', 3);
            topRef.get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // var view_type = doc.get('view_type');
                            var num_products = doc.get('num_products');
                            // console.log(view_type);
                            // console.log(num_products);
                            num_products = num_products + 1;
                            console.log(num_products);
                            var field_id = 'product_id_' + num_products;
                            var field_name = 'product_image_' + num_products;
                            var field_price = 'product_price_' + num_products;
                            var field_descr = 'product_descr_' + num_products;

                            doc.add({
                                field_id: docRef.id,
                                field_name: product_name,
                                field_price: product_price,
                                field_descr: product_description
                            }).then(function(docRef) {
                                alert('Sản phẩm đã được thêm vào Database');
                            });
                        });
            });
            // add vao CATEGORIES
    
}

