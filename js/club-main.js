$('document').ready(() => {
    var id = document.location.href.slice(-1)
    var club_list = []
    var more_honours_list = []
    $.get('https://golden-emblem-default-rtdb.firebaseio.com/clubs.json', function (club) {
        for (let i in club) {
            club_list.push(club[i])
        }
        // first row
        // name + emblem
        $('<div>', { class: 'row', id: 'row-first' }).appendTo('#main-container')
        $('<div>', { class: 'col-lg-4 text-center py-5 px-5', id: 'emblem-col' }).appendTo('#row-first')
        $('<h1>', { class: 'display-4 fw-bold' }).text(club_list[id].name).appendTo('#emblem-col')
        $('<img>', { class: 'img-fluid emblem-img my-4', src: club_list[id].img, alt: club_list[id].name + 'img' }).appendTo('#emblem-col')
        // info
        $('<div>', { class: 'col-lg-4 px-5 text-center', id: 'info-col' }).appendTo('#row-first').html(`
        <h2 class='display-6 py-5 fw-bold'>Informations</h2>
        <div class='col-lg-12'>
            <p class='lead'>Leauge: ${club_list[id].leauge}</p>   
            <p class='lead'>Founded: ${club_list[id].founded}</p>
            <p class='lead'>President: ${club_list[id].president}</p>
            <p class='lead'>Manager: ${club_list[id].manager}</p>
            <p class='lead'>Stadium: ${club_list[id].stadium}</p>
            <p class='lead'>Capacity: ${club_list[id].capacity}</p>
            <p class='lead'>Website: <a href='https://${club_list[id].website}' target='_blank' class='a-website'>${club_list[id].website}</a></p>
        </div>`).appendTo('#first-row')
        // honours
        $('<div>', { class: 'col-lg-4 px-5 text-center', id: 'honours-col' }).appendTo('#row-first')
        $('<h2>', { class: 'display-6 py-5 fw-bold' }).text('Honours').appendTo('#honours-col')
        $('<div>', { class: 'col-lg-12', id: 'honours-list-col' }).appendTo('#honours-col')

        for (let j in club_list[id].honours) {
            if (j < 7) {
                $('<p>', { class: 'lead' }).text(club_list[id].honours[j]).appendTo('#honours-list-col')
            }
            else {
                more_honours_list.push(club_list[id].honours[j])
                if (j == 7) {
                    $('<button>', { class: 'btn px-2 fw-bold', id: 'show-more' }).text('. . .').appendTo('#honours-list-col')
                    // function after 'show-more' click
                    $('#show-more').click(function () {
                        for (let k in more_honours_list) {
                            $('<p>', { class: 'lead' }).text(more_honours_list[k]).appendTo('#honours-list-col')
                        }
                        $('#show-more').remove()
                    })
                }
            }
        }
        // second row
        $('<div>', { class: 'row', id: 'row-second' }).appendTo('#main-container')
        // last 5
        $('<div>', { class: 'col-md-6 text-center my-5', id: 'last-10-container' }).appendTo('#row-second')
        $('<h2>', { class: 'display-6 my-5 fw-bold' }).text('Last 10 matches').appendTo('#last-10-container')
        for (let match in club_list[id].matches) {
            $('<p>', { class: 'lead my-3' }).text(club_list[id].matches[match]).appendTo('#last-10-container')
        }
        // squad
        $('<div>', { class: 'col-md-6 text-center my-5', id: 'table-container' }).appendTo('#row-second')
        $('<h2>', { class: 'display-6 my-5 fw-bold' }).text('Squad').appendTo('#table-container')
        $('<table>', { class: 'table text-center' }).appendTo('#table-container')
        $('<thead>').appendTo('.table')
        $('<tr>', { id: 'data-tr' }).appendTo('thead')
        $('<tbody>').appendTo('.table')
        // no,nation,position,name - will fix to see problem with firebase/json
        $('<th>').text('No').appendTo('#data-tr')
        $('<th>').text('Position').appendTo('#data-tr')
        $('<th>').text('Nation').appendTo('#data-tr')
        $('<th>').text('Player').appendTo('#data-tr')
        for (let data2 in club_list[id].players.nation) {
            let idd = 'tr-' + data2
            $('<tr>', { id: idd }).appendTo('tbody')
            $('<td>').text(club_list[id].players.no[data2]).appendTo("#" + idd)
            $('<td>').text(club_list[id].players.position[data2]).appendTo("#" + idd)
            $('<td>').text(club_list[id].players.nation[data2]).appendTo("#" + idd)
            $('<td>').text(club_list[id].players.player[data2]).appendTo("#" + idd)
        }
    })
})

