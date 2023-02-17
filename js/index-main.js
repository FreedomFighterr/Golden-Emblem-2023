$('document').ready(() => {
    var fbase = 'https://golden-emblem-default-rtdb.firebaseio.com/clubs'
    var club_list = []
    var vote_list = []
    var club_string_list = []
    var sponsored_list = ['Addidas', 'Nike', 'Amazon Music', 'VISA', 'EA', 'Gold Sponsor', 'Porsche', 'Disney']
    var sponsored_href_list = ['images/sponsors/sponsor-addidas.png', 'images/sponsors/sponsor-nike.png', 'images/sponsors/sponsor-amazon.png',
        'images/sponsors/sponsor-visa.png', 'images/sponsors/sponsor-ea.png', 'images/sponsors/sponsor-gold.png',
        'images/sponsors/sponsor-porsche.png', 'images/sponsors/sponsor-disney.png']
    $.get(fbase + '.json', function (club) {
        for (let m in club) {
            club_string_list.push(m)
            club_list.push(club[m])
            vote_list.push(club[m].votes)
        }
        // hero section 
        $('<div>', { class: 'row', id: 'hero-row' }).appendTo('#hero-container')
        $('<div>', { class: 'col-lg-6 my-5 text-center hero-col d-flex flex-column align-items-center justify-content-center', id: 'hero-column' }).html(
            `<h1 class="text-center display-4"><span>DEAD RACE<br>FOR<br> GOLDEN EMBLEM<br>IS ENDING UP SOON!</span></h1>
        <p class="lead">Help your favorite football club win the golden award by voting for them.<br>Be careful! You can vote only once.</p>
        <div class="btn-holder">
            <a class="btn px-4 my-3 mx-3 py-2 text-light" id="to-vote-btn" href="#vote-container">JUMP TO VOTE</a>
            <a class="btn px-4 my-3 py-2 text-light" id="btn-about" href="#about-us"><span>ABOUT AWARD</span></a>
        </div>`).appendTo("#hero-row")
        $('<div>', { class: 'col-lg-6 my-5 text-center her-col px-5' }).html(
            `<img class="img-fluid px-5" src="images/golden-emblem.png" alt="golden-emblem-image">`).appendTo('#hero-row')

        // about us section
        $('<div>', { class: 'row', id: 'about-row' }).html(
            `<div class="col-md-12 my-5">
            <h2 class="display-5">About us</h2> 
        </div>`).appendTo('#about-container')
        $('<div>', { class: 'col-md-12 px-4', id: 'about-text-col' }).appendTo('#about-row')
        $('<p>', { class: 'lead fw-bold my-4' }).text("We are a proffessional organization that aims to raise football to a higher level, and you can help us in that. The winner of this competition receives a golden emblem as a reward. We offer you, our loyal followers, the opportunity to participate in the creation of one of the greates competitions of all time by voting for the best team in 2023 and enabling it to win.").appendTo("#about-text-col")
        for (let i = 0; i < 3; i++) {
            $('<p>', { class: 'lead my-4 py-3' })
                .text("Lorem ipsum,dolor sit amet consectetur adispicing elit. Voluptatem reprehenderit fuga corporis cupiditate quia, minus eum quibusdam impedit tempora blanditiis temporibus odio iure minima sapiente velit nemo error delectus molestiae culpa asperiores distinctio commodi eveniet obcaecati. Quasi ratione harum, voluptatibus quibusdam, earum placeat nam quos fugiat tempore aliquam incidunt voluptatum possimus eos sed obcaecati corporis consequuntur soluta ea voluptatem alias illo ipsa quaerat voluptates. Magnam ipsum unde maiores enim odio neque repellat commodi pariatur, dolore optio consectetur culpa sunt animi ad alias, nemo magni, iste officia deleniti ipsa. Dignissimos, exercitationem.")
                .appendTo("#about-text-col")
        }

        // vote section
        $('<div>', { class: 'row', id: 'vote-h-row' }).appendTo('#vote-container')
        $('<div>', { class: 'col-md-12 py-5', id: 'vote-h-col' }).appendTo('#vote-h-row')
        $('<h2>', { class: 'display-5 py-5' }).text('Vote for the best').appendTo('#vote-h-col')
        $('<div>', { class: 'row g-4', id: 'clubs-row' }).appendTo('#vote-container')
        for (let n in club_list) {
            let col = 'club-col-' + n
            let cardd = col + '-card'
            let bodyy = cardd + '-body'
            $('<div>', { class: 'col-lg-3 col-sm-6', id: col }).appendTo('#clubs-row')
            $('<div>', { class: 'card bg-transparent border border-warning', id: cardd }).appendTo('#' + col)
            $('<img>', { class: 'card-img-top club-emblem', src: club_list[n].img, alt: club_list[n].name + ' logo' }).appendTo('#' + cardd)
            $('<div>', { class: 'card-body', id: bodyy }).appendTo('#' + cardd)
            $('<h5>', { class: 'card-title' }).text(club_list[n].name).appendTo('#' + bodyy)
            $('<p>', { class: 'card-text' }).text(club_list[n].text).appendTo('#' + bodyy)
            let btn_holder = 'btn-holder-' + n
            $('<div>', { class: 'btn-holder', id: btn_holder }).appendTo('#' + bodyy)
            $('<button>', { class: 'btn px-4 mx-2 vote-btn' }).text('VOTE').appendTo('#' + btn_holder)
            $('<button>', { class: 'btn px-4 more-info', id: 'more-info-' + n }).text('INFO').appendTo('#' + btn_holder).on('click', () => {
                document.location.href = 'club.html' + "?=" + n
            })
        }
        // put vote request
        $(document).on('click', '.vote-btn', function () {
            var vote_id = ($(this).closest('.card'))
            vote_id = vote_id[0].id.slice(-6, -5)
            var club_code = club_string_list[vote_id]
            club_list[vote_id].votes += 1
            var url = fbase + '/' + club_code
            $.ajax({
                type: "PUT",
                url: url + '/votes.json',
                data: JSON.stringify(club_list[vote_id].votes),
                success: () => {
                    console.log('vote sent to fbase')
                },
            });
            $('#check-row').remove()
            $('#best-row').remove()
            check_votes(vote_id)
            $('.vote-btn').attr('disabled', 'true')
        })

        // check-votes section // calling function from script.js
        check_votes(-1)

        // sponsored section
        $('<div>', { class: 'col-md-12' }).html('<h2 class="display-5 text-center my-4">Sponsored by</h2>').appendTo('#sponsored-row')
        $('<div>', { class: 'col-md-12 text-center my-5', id: 'sponsor-names' }).appendTo('#sponsored-row')
        $('<p>', { class: 'lead' }).appendTo('#sponsor-names')
        for (let j = 0; j < sponsored_list.length; j++) {
            let word = sponsored_list[j] + ', '
            $('#sponsor-names').append(word)
        }
        for (let k = 0; k < sponsored_href_list.length; k++) {
            $('<div>', { class: 'col-lg-3 col-md-6 col-sm-4 py-3 text-center', id: `sponsor-col-${k}` }).appendTo('#sponsored-row')
            $('<img>', { class: 'sponsor-logo', src: `${sponsored_href_list[k]}`, alt: `${sponsored_list[k]}` }).appendTo(`#sponsor-col-${k}`)
        }
        var url = document.location.href.split('/')
        url = url[3]
        if (url == 'index.html' || url == 'index.html#') {
            console.log('page loaded')
        } else {
            // set timeout because of jquery load speed limit
            setTimeout(() => {
                console.log('redirected')
                document.location.href = url
            }, '250')
        }
    })
})