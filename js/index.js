//index

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
        let option = document.createElement('td');
        option.style.textAlign = 'center';
        tr.setAttribute('table_row_users', doc.id);
        id.textContent = doc.id;
        username.textContent = doc.data().username;
        email.textContent = doc.data().email;
        option.innerHTML = `<h3><i id="delete_user" data-toggle="tooltip" data-placement="left" title="Delete" style="color: red"  class="far fa-trash-alt"></i> </3>`;

        tr.appendChild(id);
        tr.appendChild(username);
        tr.appendChild(email);
        tr.appendChild(option);
        
        tablebodyUsers.appendChild(tr);

        option.addEventListener('click', (e) =>{
            let doc;
            let num_orders_of_user = 0;
            db.collection("USERS").doc(id_user).collection('USER_ORDERS').get().then((querySnapshot) => {
                
                querySnapshot.forEach((doc) => {
                    num_orders_of_user++;
                    //console.log(`${doc.id} => ${doc.data()}`);
                });
                console.log(num_orders_of_user);
                let result = confirm("Khách hàng này có " + num_orders_of_user + ' đơn đặt hàng bạn có chắc muốn xóa không!'); 
                if (result == true) { 
                    db.collection("USERS").doc(id_user).delete().then(function() {
                        console.log("Đã xóa khách hàng thành công!");
                    }).catch(function(error) {
                        console.error("Lỗi xóa người dùng: ", error);
                    });
                   
                } else { 
                    doc = "Cancel was pressed."; 
                } 
                //console.log(doc); 
                });
        })
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
    let upper = document.getElementById('upper_limit').value;
    let amount = document.getElementById('amount').value;
    let percent = document.getElementById('percent').value;
    let date = document.getElementById('date').value;

    let awardDiscount = {
        alreadlyUse: false,
        percent: String(percent),
        body: String(body),
        lower_limit: String(lower),
        type: 'Discount',
        upper_limit: String(upper),
        validity: firebase.firestore.Timestamp.fromDate(new Date(date))
    }

    let awardFlat = {
        alreadlyUse: false,
        amount: String(amount),
        body: String(body),
        lower_limit: String(lower),
        type: 'Flat',
        upper_limit: String(upper),
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
                            document.getElementById('upper_limit').value ='50000000' ;
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
                            document.getElementById('upper_limit').value ='50000000' ;
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