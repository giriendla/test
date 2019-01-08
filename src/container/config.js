const BaseURL = () => {
  let url = window.location.href;
  let apiUrl;
  if (url.indexOf("accushield-40179") !== -1) {
    apiUrl = "https://accushield-vendor-dev.herokuapp.com";
  } else if (url.indexOf("qaaccushield") !== -1) {
    apiUrl = "https://accushield-vendor-qa.herokuapp.com";
  } else {
    apiUrl = "https://accushield-vendor-qa.herokuapp.com";
  }
  console.log("Base URL ", url);
  return apiUrl;
};

const Config = {
  // "baseUrl": "https://jsonplaceholder.typicode.com",
  // "baseUrl": "http://192.168.3.180:3000/",
  baseUrl: BaseURL(),
  // "baseUrl": "https://accushield-vendor-dev.herokuapp.com",
  // "baseUrl": "https://accushield-vendor-qa.herokuapp.com",
  images: "/assets/images/",
  isRoute: false,
  mainnav: [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: "dashboard.png",
      isLogin: true,
      template: "user"
    },
    // { name: "Visit", link: "/visit", icon: "visitor.png", isLogin: true, template: "user" },
    {
      name: "Communities",
      link: "/communities",
      icon: "communities.png",
      isLogin: true,
      template: "user"
    },
    {
      name: "Companies",
      link: "/company",
      icon: "employees.png",
      isLogin: true,
      template: "user"
    },
    {
      name: "Employees",
      link: "/employees",
      icon: "employees.png",
      isLogin: true,
      template: "user"
    },
    // { name: "Account", link: "/account", icon: "account.png", isLogin: true, template: "user" },
    // { name: "Profile", link: "/profile", icon: "profile.png", isLogin: true, template: "user" },
    {
      name: "Login",
      link: "/login",
      icon: "login.png",
      isLogin: false,
      template: "beforeLogin"
    },
    {
      name: "Register",
      link: "/register",
      icon: "login.png",
      isLogin: false,
      template: "single"
    },
    {
      name: "Forgot Password",
      link: "/forgotpassword",
      icon: "forgotpassword.png",
      isLogin: false,
      template: "beforeLogin"
    },
    {
      name: "Reset Password",
      link: "/resetpassword",
      icon: "resetpassword.png",
      isLogin: false,
      template: "beforeLogin"
    }
  ],
  api: {
    dashboard: {
      url: "/api/v1/vendors/dashboard",
      type: "get",
      isToken: true
    },
    posts: {
      url: "/posts",
      type: "get"
    },
    register: {
      register: {
        url: "/api/v1/vendors/register",
        type: "post",
        isToken: false
      },
      fetchCompanyDetails: {
        url: "/api/v1/vendors/fetch_company_details/",
        type: "get",
        isToken: false
      }
    },
    employees: {
      list: {
        url: "/api/v1/vendors/employees",
        type: "get",
        isToken: true
      },
      create: {
        url: "/api/v1/vendors/create_employee",
        type: "post",
        isToken: true
      },
      edit: {
        url: "/api/v1/vendors/update_employee",
        type: "post",
        isToken: true
      },
      dispute: {
        url: "/api/v1/vendors/dispute_employee/",
        type: "get",
        isToken: true
      },
      employee: {
        url: "/api/v1/vendors/employee_details/",
        type: "get",
        isToken: true
      }
    },
    commounities: {
      list: {
        url: "/api/v1/vendors/communities_list",
        type: "get",
        isToken: true
      }
    },
    company: {
      list: {
        url: "/api/v1/vendors/companies_list",
        type: "get",
        isToken: true
      },
      create: {
        url: "/api/v1/vendors/create_company",
        type: "post",
        isToken: true
      },
      edit: {
        url: "/api/v1/vendors/update_company",
        type: "post",
        isToken: true
      },
      states: {
        url: "/api/v1/vendors/states_list",
        type: "get",
        isToken: true
      }
    },
    serviceTypes: {
      url: "/api/v1/vendors/service_types",
      type: "get",
      isToken: true
    },
    login: {
      url: "/api/v1/vendors/login",
      type: "post",
      isToken: false
    }
  }
};

export default Config;
