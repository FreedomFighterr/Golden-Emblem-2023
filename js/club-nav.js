$('document').ready(() => {
    var span_list = ['Home', 'About us', 'Vote', 'Check Votes', 'Sponsored']
    var href_list = ['#', '#about-us', '#vote-container', '#check-votes', '#sponsored-section']
    var club_list = ['Barcelona', 'Liverpool', 'Manchester City', 'Read Madrid']
    // nav
    $('<nav>', { class: 'navbar navbar-expand-lg fixed-top' }).appendTo('header')
    $('<div>', { class: 'container-fluid', id: 'container-nav' }).appendTo('nav')
    $('<a>', { class: 'navbar-brand', href: '#' }).appendTo('#container-nav')
    $('<img>', { class: 'logo', src: 'images/golden-website-logo.png', alt: 'official-logo' }).appendTo('.navbar-brand')
    $('<button>', {
        class: 'navbar-toggler', type: 'button', 'data-bs-toggle': 'offcanvas', 'data-bs-target': '#hamburger-menu', 'aria-controls': 'hamburger-menuContent',
        'aria-expanded': 'false', 'aria-label': 'Toggle navigation'
    }).html('<span class="navbar-toggler-icon"></span>').appendTo('#container-nav')
    $('<div>', { class: 'offcanvas offcanvas-end', tabindex: '-1', id: 'hamburger-menu', 'aria-labelledby': 'hamburger-menuLabel' }).appendTo('#container-nav')
    // offcanvas header
    $('<div>', { class: 'offcanvas-header' }).appendTo('#hamburger-menu')
    $('<h5>', { id: 'hamburger-menuLabel' }).html('<span>Menu</span>').appendTo('.offcanvas-header')
    $('<button>', { type: 'button', class: 'btn-close text-reset', 'data-bs-dismiss': 'offcanvas' }).appendTo('.offcanvas-header')
    // offcanvas body
    $('<div>', { class: 'offcanvas-body text-center' }).appendTo('#hamburger-menu')
    $('<ul>', { class: 'navbar-nav px-5 mb-2 mb-lg-0', id: 'ofc-ul' }).appendTo('.offcanvas-body')
    // menu
    for (let i = 0; i < span_list.length; i++) {
        let item = 'nav-item-' + i
        $('<li>', { class: 'nav-item mx-2', id: item }).html(
            `<button class="fake-btn" id="fake-btn-${i}" data-bs-dismiss="offcanvas"><a class="nav-link active" id="nav-link-${i}" href="index.html${href_list[i]}">
            <span>${span_list[i]}</span></a></button>`).appendTo('#ofc-ul')
        // clubs dropdown
        if (i == 2) {
            $('<li>', { class: 'nav-item mx-2 dropdown', id: 'nav-item-clubs' }).appendTo('#ofc-ul').html(
                `<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><span>Clubs</span></a>
            <ul class="dropdown-menu text-center" aria-labelledby="navbarDropdown"></ul>`)
            // dropdown items
            for (let j = 0; j < club_list.length; j++) {
                let club = 'club-' + j
                $('<li>', { id: club }).appendTo('.dropdown-menu')
                $('<a>', { class: 'dropdown-item' }).html(`<span>${club_list[j]}</span>`).appendTo(`#${club}`).on('click', () => {
                    document.location.href = 'club.html' + "?=" + j
                })
            }
        }
    }
    // social
    $('<ul>', { class: 'navbar-nav px-5 ms-auto mb-2 mb-lg-0' }).html(
        `<li class="nav-item mx-2">
            <li class="nav-item mx-2"><a href="#"><img class="img-fluid social" src="images/fb-icon.png" alt="fb-icon"></a></li>
            <li class="nav-item mx-2"><a href="#"><img class="img-fluid social" src="images/icon-instagram.png" alt="ig-icon"></a></li>
            <li class="nav-item mx-2"><a href="#"><img class="img-fluid social" src="images/twitter-icon.png" alt="tw-icon"></a></li>
            <li class="nav-item mx-2"><a data-bs-toggle="modal" data-bs-target="#settingsModal""><img class="img-fluid social" src="images/settings-icon.png" alt="settings-icon"></a></li>
        </li>`).appendTo('.offcanvas-body')
})