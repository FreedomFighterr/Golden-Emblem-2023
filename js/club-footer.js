$('document').ready(() => {
    var span_list = ['Home', 'About us', 'Vote', 'Check Votes', 'Sponsored']
    var href_list = ['#', '#about-us', '#vote-container', '#check-votes', '#sponsored-section']
    var club_list = ['Barcelona', 'Liverpool', 'Manchester City', 'Read Madrid']

    $('<div>', { class: 'row', id: 'container-first-row' }).html(`<div class="col-md-3 py-3"><span class="display-5 fw-bold">GOLDEN EMBLEM AWARD 2023</span></div>`).appendTo("#footer-container")
    $('<div>', { class: 'col-md-3 py-3', id: 'page-footer-col' }).appendTo('#container-first-row')
    for (let i = 0; i < span_list.length; i++) {
        $('<button>', { class: 'fake-btn', id: `footer-fake-btn-${i}` }).html(`
        <a id="footer-link-${i}" href="index.html${href_list[i]}">
            <span>${span_list[i]}</span></a>`).appendTo('#page-footer-col')
        $('<br>').appendTo('#page-footer-col')
    }

    $('<div>', { class: 'col-md-3 py-3', id: 'clubs-footer-col' }).appendTo('#container-first-row')
    for (let j = 0; j < club_list.length; j++) {
        let club = 'club-' + j
        $('<a>').html(`<span>${club_list[j]}</span><br>`).appendTo('#clubs-footer-col').on('click', () => {
            document.location.href = 'club.html' + '?=' + j
        })
    }
    $('<div>', { class: 'col-md-3 py-3' }).html(`
    <span>Number: <a href="#">066/928-195</a></span><br>
    <span>Facebook: <a href="#">www.facebook.com</a></span><br>
    <span>Instagram: <a href="#">www.instagram.com</a></span><br>
    <span>Twitter: <a href="#">www.twitter.com</a></span>
    `).appendTo('#container-first-row')

    $('<div>', { class: 'row py-2' }).html(`<hr>
    <div clas="col-md-12 pb-2"><p>&copy; Copyright 2023 - All rights reserved by Freedom Fighterr</p></div></div>`).appendTo('#footer-container')
})