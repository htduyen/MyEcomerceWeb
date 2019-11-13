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
db.collection("CANCELLED ORDERS").get().then((querySnapshot) => {
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
                    console.log(`${doc.id} => ${doc.data()}`);
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
                console.log(doc); 
                });
        })
    });
    
});


//index