$(document).ready(function () {
    $(".carousel_01").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 4,
            },
        },
    });
    $(".carousel_02").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1,
            },
            700: {
                items: 2,
            },
            1200: {
                items: 2,
            },
            1300: {
                items: 3,
            },
        },
    });
    $(".carousel_03").owlCarousel({
        loop: true,
        margin: 10,
        center: true,
        onDragged: triggerNext,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 5,
            },
        },
    });
    function triggerNext(event) {
        console.log(event);
        if (event.target.classList.contains("carousel_03")) {
            $(".carousel_04").trigger("next.owl.carousel");
        } else if (event.target.classList.contains("carousel_04")) {
            $(".carousel_03").trigger("next.owl.carousel");
        }
    }

    $(".carousel_04").owlCarousel({
        loop: true,
        margin: 10,
        items: 1,
        onDragged: triggerNext,
    });
});

let countDownDate = new Date("Nov 10, 2024 15:00:00").getTime();
let countdown = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = "<p class='fs-2'>Expired</p>";
    }
}, 1000);

let nav = document.querySelector("nav");
$(window).scroll(function () {
    $("nav").toggleClass("scrolled", $(this).scrollTop() > 100);
    $("nav ul li a").toggleClass("scrolled-link", $(this).scrollTop() > 100);
});
let lastScroll = 0;
window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && !nav.classList.contains("scroll-down")) {
        nav.classList.remove("scroll-up");
        nav.classList.add("scroll-down");
    }
    if (currentScroll < lastScroll && nav.classList.contains("scroll-down")) {
        nav.classList.remove("scroll-down");
        nav.classList.add("scroll-up");
        document
            .getElementById("logo")
            .setAttribute("src", "assets/img/logo-edu_black.webp");
    }
    lastScroll = currentScroll;
});

let register = document.getElementById("registerPage");
let login = document.getElementById("loginPage");
let registerPage = document.getElementById("register-page");
let loginPage = document.getElementById("login-page");
let overlay = document.getElementById("overlay");
let overlayLog = document.getElementById("overlay-log");
register.addEventListener("click", function () {
    registerPage.style.display = "block";
});
overlay.addEventListener("click", function () {
    registerPage.style.display = "none";
});
overlayLog.addEventListener("click", function () {
    loginPage.style.display = "none";
});
login.addEventListener("click", function () {
    loginPage.style.display = "block";
});

let btnCart = document.querySelectorAll(".popular-courses .btn-cart");
let imgPath = "";
let courseTitle = "";
let coursePrice = 0;
let courses = [];
let cartSection = document.getElementById("cart-section");
let course = {
    imgpath: "",
    title: "",
    price: "",
};


function addToCart() {
    btnCart.forEach((element) => {
        element.addEventListener("click", function (e) {
            imgPath = e.target.previousElementSibling.src.slice(
                e.target.previousElementSibling.src.indexOf("assets")
            );
            let  courses;
            if(JSON.parse(localStorage.getItem("courses")) == null){
                courses = []
            } else {
                courses  = JSON.parse(localStorage.getItem("courses"));
            }
            courseTitle =
                e.target.parentElement.parentElement.nextElementSibling.childNodes[3]
                    .textContent;
            coursePrice =
                e.target.parentElement.parentElement.nextElementSibling.childNodes[7]
                    .childNodes[3].textContent;
            // console.log(imgPath,courseTitle,coursePrice);
            course["imgpath"] = imgPath;
            course["title"] = courseTitle;
            course["price"] = coursePrice;
            console.log(course);
            courses.push(course);
            // console.log(courses);
            localStorage.setItem("courses", JSON.stringify(courses));
            Swal.fire("Course Added to your Cart!");
            displayCoursrs();
        });
    });
}
addToCart();
displayCoursrs();
function displayCoursrs() {
    let result = "";
    if(JSON.parse(localStorage.getItem("courses")) == null){
        courses = []
    } else {
        courses  = JSON.parse(localStorage.getItem("courses"));
    }
    if (courses.length == 0) {
        result = `<h2 class="text-center pt-4 fs-6">No items added!</h2>`;
    }
    courses.map((course, index) => {
        result += `
        <div class="row p-2 pt-3 align-content-center">
            <div class="col-2 p-0 img">
                <img class="w-100" src="${course["imgpath"]}" alt="">
            </div>
            <div class="col-6">
                <h3 class="fs-6">${course["title"]}</h3>
            </div>
            <div class="col-3 price">
                <span class="fs-5">${course["price"]}</span>
            </div>
        </div>
        <div class="d-flex  justify-content-between">
            <button class="btn bg-transparent text-danger " onclick="deleteCourse(${index})"><i class="fs-2 fa-regular fa-trash-can"></i></button>
            <button class="btn bg-warning">Buy Now</button>
                        </div>
        <hr>
        `;
    });

    document.getElementById("cartList").innerHTML = result;
}

function deleteCourse(id) {
    courses.splice(id, 1);
    localStorage.setItem("courses", JSON.stringify(courses));
    displayCoursrs();
}

document.getElementById("close").addEventListener("click", function () {
    cartSection.style.display = "none";
});
document.getElementById("cart").addEventListener("click", function () {
    cartSection.style.display = "unset";
});

// localStorage.clear()



$(document).ready(function(){
    $('#loading').fadeOut(3000);
})

let unsetOverflow = setInterval(function(){
    $('body').css("overflow", 'auto')
}, 2000)