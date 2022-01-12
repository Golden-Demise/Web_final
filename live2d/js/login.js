//sign in form
var $signin_btn=$("#signin_btn"),
    $account_signin=$("#account_signin"),
    $password_signin=$("#password_signin");

//sign up form
var $signup_btn=$("#signup_btn"),
    $account_signup=$("#account_signup"),
    $password_signup=$("#password_signup");

//sign out form
var $signout_btn=$("#signout_btn");

$signup_btn.click(function (e) {
    e.preventDefault();
    // When sign up form submitted
    console.log("Ready for sign up");
    const email = $account_signup.val();
    const password = $password_signup.val();
    //firebase sign in method
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            console.log("Sign up", res);
            const data={
                id:res.user.email,
                can_all:0
            };
            console.log(res.user.uid);

            db.collection("user").doc(res.user.uid).set(data);
            alert("sign up complete");
        })
        .catch(err => {
            if (err.code == "auth/wrong-password") {
                alert("wrong password");
            }else if (err.code == "auth/user-not-found") {
                alert("user not found");
            }
        })
    console.log("Ready for sign up");
    $account_signup.val("");
    $password_signup.val("");
});

//admin@gmail.com
//123456

$signin_btn.click(function (e) {
    e.preventDefault();
    // When sign in form submitted
    console.log("Ready for sign in");
    const email = $account_signin.val();
    const password = $password_signin.val();
    console.log(email, password);
    //firebase sign in method
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
            console.log("Sign In Complete", res);
            alert("sign in");
            if (email == "admin@gmail.com") {
                window.location = "src/admin.html";
            }
            else{
                window.location = "src/demo.html";
            }
        })
        .catch(err => {
            if (err.code == "auth/wrong-password") {
                alert("wrong password");
            }else if (err.code == "auth/user-not-found") {
                alert("user not found");
            }
        })
});

$signout_btn.click(function () {
    // When click sign out button
    console.log("Ready for sign out");
    firebase
        .auth()
        .signOut()
        .then(() => {
            window.location = "../index.html"
        })
        .cathc()
});