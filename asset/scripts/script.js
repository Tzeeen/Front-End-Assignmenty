document.addEventListener("DOMContentLoaded", () => {
    // 确保页面渲染后再移除模糊
    setTimeout(() => {
        document.body.style.filter = "blur(0px)";
    }, 50);
});

// 代理事件，监听所有超链接点击
document.addEventListener("click", function (event) {
    let link = event.target.closest("a"); // 找到最近的 <a> 标签
    if (link && link.href) {
        event.preventDefault(); // 阻止默认跳转
        document.body.classList.add("blurred"); // 添加模糊效果

        setTimeout(() => {
            window.location.href = link.href; // 1秒后跳转
        }, 1000);
    }
});


// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + "; path=/" + expires;
}

// Function to get a cookie value by name
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

document.addEventListener("DOMContentLoaded", function () {
    // Show the cookie popup if no consent is found
    if (!getCookie("cookieConsent")) {
        document.getElementById("cookie-popup").style.display = "block";
    }

    // Load theme from cookies, default to dark mode
    let theme = getCookie("theme") || "dark";
    document.getElementById("theme-style").setAttribute("href", theme + "-theme.css");
    document.getElementById("theme-toggle").textContent = theme === "dark" ? "🌞" : "🌙";
});

// Function to accept cookies
function acceptCookies() {
    setCookie("cookieConsent", "accepted", 365);
    document.getElementById("cookie-popup").style.display = "none";
}

// Function to decline cookies
function declineCookies() {
    setCookie("cookieConsent", "declined", 365);
    document.getElementById("cookie-popup").style.display = "none";
}

// Event listener for theme toggle button
document.getElementById("theme-toggle").addEventListener("click", function () {
    if (getCookie("cookieConsent") === "accepted") { // Ensure user has accepted cookies
        let currentTheme = document.getElementById("theme-style").getAttribute("href").includes("dark") ? "light" : "dark";
        setCookie("theme", currentTheme, 365); // Store theme preference in cookies
        document.getElementById("theme-style").setAttribute("href", currentTheme + "-theme.css");
        document.getElementById("theme-toggle").textContent = currentTheme === "dark" ? "🌞" : "🌙";
    } else {
        alert("Please accept the cookies to save your theme settings!"); // Prompt user to accept cookies first
    }
});

fetch("./asset/header-footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-footer").innerHTML = data;

        setTimeout(() => {
            const themeToggleBtn = document.getElementById("theme-toggle");
            if (themeToggleBtn) {
                themeToggleBtn.addEventListener("click", toggleTheme);
            }

            const clearStorageBtn = document.getElementById("clear-storage");
            if (clearStorageBtn) {
                clearStorageBtn.addEventListener("click", clearAllData);
            }
        }, 100);
    });

function toggleTheme() {
    if (getCookie("cookieConsent") === "accepted") {
        let currentTheme = document.getElementById("theme-style").getAttribute("href").includes("dark") ? "light" : "dark";
        setCookie("theme", currentTheme, 365);
        document.getElementById("theme-style").setAttribute("href", currentTheme + "-theme.css");
        document.getElementById("theme-toggle").textContent = currentTheme === "dark" ? "🌞" : "🌙";
    } else {
        alert("Please accept the cookies to save your theme settings!");
    }
}

function clearAllData() {
    if (confirm("Are you sure you want to clear all Cookies and LocalStorage data? This action cannot be undone!")) {
        // 清除所有 Cookies
        document.cookie.split(";").forEach(cookie => {
            document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
        });

        // 清除 LocalStorage
        localStorage.clear();

        // 清除 SessionStorage
        sessionStorage.clear();

        alert("All storage data has been cleared!");
        location.reload(); // 刷新页面以应用更改
    }
}