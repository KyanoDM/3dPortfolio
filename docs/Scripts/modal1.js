function openModal1() {
    var modal = document.getElementById("modal1");
    if (modal) {
        modal.style.display = "block";
    }
}

function closeModal1() {
    var modal = document.getElementById("modal1");
    if (modal) {
        modal.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var cardDiv = document.querySelector(".cardd");
    if (cardDiv) {
        cardDiv.addEventListener("click", openModal1);
    }

    window.onclick = function (event) {
        var modal1 = document.getElementById("modal1");
        var modal2 = document.getElementById("modal2");
        var modal3 = document.getElementById("modal3");
        var modal11 = document.getElementById("modal11");
        var modal12 = document.getElementById("modal12");
        var modal13 = document.getElementById("modal13");
        var modal14 = document.getElementById("modal14");

        if (modal1 && event.target == modal1) {
            modal1.style.display = "none";
        }

        if (modal2 && event.target == modal2) {
            modal2.style.display = "none";
        }
        if (modal3 && event.target == modal3) {
            modal3.style.display = "none";
        }
        if (modal4 && event.target == modal4) {
            modal4.style.display = "none";
        }
        if (modal11 && event.target == modal11) {
            modal11.style.display = "none";
        }
        if (modal12 && event.target == modal12) {
            modal12.style.display = "none";
        }
        if (modal13 && event.target == modal13) {
            modal13.style.display = "none";
        }
         if (modal14 && event.target == modal14) {
            modal14.style.display = "none";
        }
    };

});

