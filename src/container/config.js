const Config = {
    "baseUrl": "https://jsonplaceholder.typicode.com",
    "images": "/assets/images/",
    "isRoute": false,
    "mainnav": [
        { name: "Dashboard", link: "/dashboard", icon: "dashboard.png", isLogin: true, template: "user" },
        { name: "Visit", link: "/visit", icon: "visitor.png", isLogin: true, template: "user" },
        { name: "Communites", link: "/communites", icon: "communites.png", isLogin: true, template: "user" },
        { name: "Employees", link: "/employees", icon: "employees.png", isLogin: true, template: "user" },
        { name: "Account", link: "/account", icon: "account.png", isLogin: true, template: "user" },
        { name: "Profile", link: "/profile", icon: "profile.png", isLogin: true, template: "user" },
        { name: "Login", link: "/login", icon: "login.png", isLogin: false, template: "beforeLogin" },
        { name: "Register", link: "/register", icon: "login.png", isLogin: false, template: "beforeLogin" },
        { name: "Forgot Password", link: "/forgotpassword", icon: "forgotpassword.png", isLogin: false, template: "single" },
        { name: "Reset Password", link: "/resetpassword", icon: "resetpassword.png", isLogin: false, template: "single" },
    ],
    "api": {
        "users": {
            "url": "/users",
            "type": "post"
        },
        "posts": {
            "url": "/posts",
            "type": "get"
        }
    }
}

export default Config;