/*!
 * Item: Kitzu
 * Description: Personal Portfolio Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v1.1.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */
!(function (n) {
    "use strict";
    n(function () {}), n(window).on("load", function () {});
})(jQuery);

$(".modal").on("shown.bs.modal", function (event) {
    let el = document.getElementsByClassName("close-btn")[0];
    if (el) el.style.display = "none";
});

$(".modal").on("hiden.bs.modal", function (event) {
    let el = document.getElementsByClassName("close-btn")[0];
    if (el) el.style.display = "flex";
});
