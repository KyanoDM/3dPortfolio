var screenWidth = window.innerWidth || document.documentElement.clientWidth;

// Check if the screen width is smaller than 400px
if (screenWidth < 400) {
    // Remove the "hidden" classes from the <a> elements
    var links = document.querySelectorAll('.works a');
    links.forEach(function (link) {
        link.classList.remove('hidden');
    });
}