document.addEventListener("DOMContentLoaded", () => {
    // 初始模糊，并在 1 秒内渐变清晰
    document.body.style.filter = "blur(10px)";
    document.body.style.transition = "filter 1s ease-in-out";
    
    setTimeout(() => {
        document.body.style.filter = "blur(0px)";
    }, 1);
});

// 监听所有超链接点击事件
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault(); // 阻止默认跳转
        document.body.style.filter = "blur(10px)"; // 点击后模糊
        document.body.style.transition = "filter 1s ease-in-out";

        setTimeout(() => {
            window.location.href = this.href; // 1 秒后跳转
        }, 700);
    });
});
