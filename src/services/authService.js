// // authService.js

// authService.js
let isAuthenticated = false;

function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value || ''};expires=${expires.toUTCString()};path=/`;
}
export default {
  isAuthenticated() {
    return isAuthenticated;
  },
  login() {
    isAuthenticated = false;
    localStorage.setItem('isAuthenticated', 'true');
    setCookie('isAuth', 'true', 1)

  },
  logout() {
    isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }
};

























// let isAuthenticated = true;
// const cookieName = 'accessToken';

// function isCookieExist() {
//   // Get all cookies
//   const cookies = document.cookie;

//   // Create a regex pattern to find the desired cookie
//   const regex = new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`);

//   // Match the regex with the cookie
//   const match = cookies.match(regex);

//   // If there is a match, then the cookie exists
//   return !!match;
// }


// function isValidToken() {
//   const cookieName = 'accessToken';
//   const tokenExists = isCookieExist(cookieName);

//   console.log('Token exists:', tokenExists);

//   // You might want to add more validation logic here
//   if (tokenExists) {
//     // Add your additional validation logic here (e.g., expiration check, server verification)
//     // For simplicity, assuming the token is always valid for now
//     return true;
//   }

//   return false;
// }

// isAuthenticated = true;


// function isValidToken() {
//   // Check if the cookie exists
//   const tokenExists = isCookieExist();

//   // You might want to add more validation logic here
//   if (tokenExists) {
//     // Add your additional validation logic here (e.g., expiration check, server verification)
//     // For simplicity, assuming the token is always valid for now
//     return true;
//   }

//   return false;
// }

// export default {
//   // Check if the user is authenticated
//   isAuthenticated() {
//     return isAuthenticated;
//   },

//   // Log in the user
//   login() {
//     isAuthenticated = isValidToken();
//   },

//   // Log out the user
//   logout() {
//     // Clear the cookie or perform any necessary cleanup
//     isAuthenticated = false;
//   },

//   // Check if the token is valid
//   isValidToken,
// };





















// // authService.js

// let isAuthenticated = false;

// function isCookieExist(cookieName) {
//   // Get all cookies
//   const cookies = document.cookie;

//   // Create a regex pattern to find the desired cookie
//   const regex = new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`);

//   // Match the regex with the cookie
//   const match = cookies.match(regex);

//   // If there is a match, then the cookie exists
//   return !!match;
// }

// // function isValidToken() {
// //   const cookieName = 'accessToken';
// //   const tokenExists = isCookieExist(cookieName);

// //   // You might want to add more validation logic here, such as checking token expiration, etc.
// //   return tokenExists;
// // }

// function isValidToken() {
//   const cookieName = 'accessToken';
//   const tokenExists = isCookieExist(cookieName);

//   // Validate the token further if needed (e.g., expiration check, server verification)
//   if (tokenExists) {
//     // Add your additional validation logic here
//     return true;
//   }

//   return false;
// }

// export default {
//   // Check if the user is authenticated
//   isAuthenticated() {
//     return isAuthenticated;
//   },

//   // Log in the user
//   login() {
//     isAuthenticated = true;
//   },

//   // Log out the user
//   logout() {
//     // Clear the cookie or perform any necessary cleanup
//     isAuthenticated = false;
//   },

//   // Check if the token is valid
//   isValidToken,
// };

































// function isCookieExist(cookieName) {
//   // Get all cookies
//   const cookies = document.cookie;

//   // Create a regex pattern to find the desired cookie
//   const regex = new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`);

//   // Match the regex with the cookie
//   const match = cookies.match(regex);

//   // If there is a match, then the cookie exists
//   return !!match;
// }

// function isValidToken() {
//   const cookieName = 'accessToken';
//   const tokenExists = isCookieExist(cookieName);

//   // You might want to add more validation logic here, such as checking token expiration, etc.
//   return tokenExists;
// }

// let isAuthenticated = isValidToken();

// export default {
//   // Check if the user is authenticated
//   isAuthenticated() {
//     return isAuthenticated;
//   },

//   // Log in the user
//   login() {
//     isAuthenticated = isValidToken();
//   },

//   // Log out the user
//   logout() {
//     // Clear the cookie or perform any necessary cleanup
//     isAuthenticated = false;
//   }
// };














// function isCookieExist(cookieName) {
//   // Mendapatkan semua cookie
//   const cookies = document.cookie;

//   // Membuat pola regex untuk mencari cookie yang diinginkan
//   const regex = new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`);

//   // Mencocokkan regex dengan cookie
//   const match = cookies.match(regex);

//   // Jika ada kecocokan, maka cookie ada
//   return !!match;
// }

// // Contoh penggunaan
// let isAuthenticated = false;
// const cookieName = 'accessToken';
// if (isCookieExist(cookieName)) {
//   isAuthenticated = true;
// } else {
//   isAuthenticated = false;
// }


// export default {
//   // Check if the user is authenticated
//   isAuthenticated() {
//     return isAuthenticated;
//   },

//   // Log in the user
//   login() {
//     isAuthenticated = true;
//   },

//   // Log out the user
//   logout() {
//     isAuthenticated = false;
//   }
// };
