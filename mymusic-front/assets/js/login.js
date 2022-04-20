
window.onload = function() {


   
     document.getElementById('loginSubmitBtn').onclick = function(event) {
        event.preventDefault();
        const loginCredintials = formToJson("loginForm")
        //console.log(loginCredintials)
        loginCall(loginCredintials)
    //    
    //     getProducts();
    // }

    // // add/update product
    // document.getElementById('product-btn').onclick = function(event) {
    //     event.preventDefault();
    //     if (!document.getElementById('product-btn').dataset.id) {
    //         addProduct();
    //     } else {
    //         editProduct();
    //     }
     }
}


async function loginCall(form) {
    let result = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: form
    }).then(res => res.json() );
   // document.getElementById('product-form').reset();
    // renderBook(result);
    if(result.code == 200){
        sessionStorage.setItem("token", result.token);
        const a =  sessionStorage.getItem("token")
        location.href = 'home.html';
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
           
          })
    }
 
}