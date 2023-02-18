function dark_mode() {
    $(":root").css("--circle", "var(--darkie)");
    setTimeout(()=> {
        $('body').css('background', 'var(--darkie)')
        $('nav').css('background', 'var(--darkie)')
        $('.modal-content').css({'background':'var(--darkie)', 'border':'1px solid var(--goldie)'})
        $('.modal-header').css('border-bottom', '1px solid var(--goldie)')
        $('.dropdown-menu').css('background', 'var(--darkie)')
        $('.offcanvas').css('background', 'var(--darkie)')
    }, '200')
}

function light_mode() {
    $(":root").css("--circle", "var(--lightie)");
    setTimeout(()=> {
        $('body').css('background', 'var(--lightie)')
        $('nav').css('background', 'var(--lightie)')
        $('.modal-content').css({'background':'var(--lightie)', 'border':'1px solid var(--goldie)'})
        $('.modal-header').css('border-bottom', '1px solid var(--goldie)')
        $('.dropdown-menu').css('background', 'var(--lightie)')
        $('.offcanvas').css('background', 'var(--lightie)')
    }, '200')
}

function check_votes(id) {
    var fbase = 'https://golden-emblem-default-rtdb.firebaseio.com/clubs'
    var club_list = []
    var vote_list = []
    //math
    var max_width = 100
    var progress_count = 0
    var best = 'NONE'
    var best_counter = 0
    $.get(fbase + '.json', function (club) {
        var current_m = 0
        for (let m in club) {
            if (id == current_m) {
                club[m].votes += 1
            }
            club_list.push(club[m])
            vote_list.push(club[m].votes)
            progress_count += club[m].votes
            current_m += 1
        }
        //math
        var each_percent = 100 / progress_count
        for (let n in vote_list) {
            vote_list[n] = (vote_list[n] * each_percent).toFixed(2)
            if (best_counter < vote_list[n]) {
                best_counter = vote_list[n]
                best = club_list[n].name
            }
        }

        $('<div>', { class: 'row', id: 'check-row' }).appendTo('#check-votes-container')
        $('<div>', { class: 'col-md-12 py-5', id: 'check-col-1' }).appendTo('#check-row')
        $('<h2>', { class: 'display-5' }).text('Check out the current state of votes').appendTo('#check-col-1')
        $('<div>', { class: 'col-md-12 py-5', id: 'check-col-2' }).appendTo('#check-row')
        $('<p>', { class: 'lead' }).text('Live based on votes all around world').appendTo('#check-col-2')
        for (let e in club_list) {
            let col = 'vote-col-' + e
            let progress = 'progress-' + e
            $('<div>', { class: 'col-md-12', id: col }).appendTo('#check-row')
            $('<p>', { class: 'lead' }).text(club_list[e].name + ' - ' + vote_list[e] + '%').appendTo('#' + col)
            $('<div>', { class: 'progress mx-auto my-3 col-md-9', id: progress }).appendTo('#' + col)
            $('<div>', {
                class: 'progress-bar', role: 'progressbar', 'aria-valuenow:': +vote_list[e], 'aria-valuemin': '0',
                'aria-valuemax': '100', style: 'width:' + vote_list[e] + '%'
            }).appendTo('#' + progress)
        }
        $('<div>', { class: 'row', id: 'best-row' }).appendTo('#check-row')
        $('<div>', { class: 'col-md-5 my-5', id: 'best-img-col' }).appendTo('#check-row')
        $('<img>', { src: 'images/first-place.png', alt: 'first-place-img' }).appendTo('#best-img-col')
        $('<div>', { class: 'col-md-7 my-5', id: 'best-name-col' }).appendTo('#check-row')
        $('<span>', { class: 'lead display-3 mx-4' }).text(best).appendTo('#best-name-col')
    })

}

// dark-light mode switch 
$('#settingsModal').html(`
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-center">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Settings</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body my-3">
        Toggle mode<br>
        <label class="switch my-3">
            <input id="modes" type="checkbox" onclick="switch_modes()" checked>
            <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>`)

  // switching modes dark/light
if (localStorage.getItem("switch_mode") == 0 || localStorage.getItem("switch_mode") == null) {
    light_mode()
} else {
    dark_mode()
    $("#modes").click()
}

function switch_modes() {
    if (document.getElementById('modes').checked != true) {
        localStorage.setItem('switch_mode', 1)
        dark_mode()
    }
    else {
        localStorage.setItem('switch_mode', 0)
        light_mode()
    }
}


// arrow back to top function manipulate
window.addEventListener('scroll', () => {
    let arrow_to_top = document.querySelector('.to-top')
    if (window.pageYOffset > 200) {
        arrow_to_top.classList.add('active')
    }
    else {
        arrow_to_top.classList.remove('active')
    }
})