document.addEventListener("DOMContentLoaded", function () {
    var modalButtons = document.querySelectorAll(".modal-button");
    var modalContents = document.querySelectorAll(".modal-content");

    modalButtons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            modalContents[index].classList.toggle("modal-white");
        });
    });
});
