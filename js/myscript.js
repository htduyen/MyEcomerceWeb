import { storage } from "firebase";
// Required for side-effects
import "firebase/firestore";
const tablebody = document.querySelector('#table_body');
const table_td = document.querySelector('#table_td');
var tags = [];

function delete_product(){
    alert('Delete product');
}

function edit_product(){
    alert('Edit product');
}

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
    let option = document.createElement('td');
    

    tr.setAttribute('table_row', doc.id);
    id.textContent = doc.id;
    name.textContent = doc.data().product_fullname;
    price.textContent = doc.data().product_price;
    cuttesPrice.textContent = doc.data().product_cutted_price;
    average_ratting.textContent = doc.data().average_rating;
    total_ratting.textContent = doc.data().total_rating;
    option.innerHTML = `
                    <i id="edit_product" style="color: blue" onclick="edit_product()" class="far fa-edit"></i> Edit <br>
                    <i id="delete_product" style="color: red"  onclick="delete_product()" class="far fa-trash-alt"></i> Delete
    `
    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(price);
    tr.appendChild(cuttesPrice);
    tr.appendChild(average_ratting);
    tr.appendChild(total_ratting);
    tr.appendChild(option);
    
    tablebody.appendChild(tr);


}

//load all product
db.collection("PRODUCTS").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            renderProduct(doc);
        });
})

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
        return false; 
    }
    return true;
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
function upLoadStorage(image, imageName){  
    let storageRef = storage().ref('test/' + imageName);
    var uploadTask = storageRef.put(image);
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
            console.log('Error upload ảnh' + imageName);
      }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('UrlDownload ' + imageName, downloadURL );
            });
      });
}
function add_product(){

    var e = document.getElementById("category");
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

    if(isEmpty(anh1, 'Image 1') && isEmpty(anh2, 'Image 2') && isEmpty(anh3, 'Image 3')){
        upLoadStorage(img1, imageName1);
        upLoadStorage(img2, imageName2);
        upLoadStorage(img3, imageName3);
    }

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

    var category = document.getElementById("category").value;
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

    // isEmpty(name, 'Tên sản phẩm ');
    // isEmpty(price, 'Gía sản phẩm ');
    // isEmpty(description, 'Mô tả sản phẩm');
    // isEmpty(cutted, 'Gía cũ');
    // isEmpty(name_discount,'Tên khuyến mãi');
    // isEmpty(body_discount,'Nội dung khuyến mãi');
    // isEmpty(spect_1, 'Mục 1');
    // isEmpty(spect_2, 'Mục 2');
    // isEmpty(name_1_spect_1, 'Trường 1');
    // isEmpty(field_1_spect_1, 'Gía trị 1');
    // isEmpty(name_2_spect_1, 'Trường 2');
    // isEmpty(field_2_spect_1, 'Gía trị 2');
    // isEmpty(name_1_spect_2, 'Trường 1');
    // isEmpty(field_1_spect_2, 'Gía trị 1');
    // isEmpty(name_2_spect_2, 'Trường 2');
    // isEmpty(field_2_spect_2, 'Gía trị 2');



    // allnumeric(price, 'Gía sản phẩm');
    // allnumeric(cutted, 'Gía cũ');

}

