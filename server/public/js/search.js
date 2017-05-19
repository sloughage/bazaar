function addToSearch (word, type) {
  let children = $('.' + type).get().map(x => $(x).text())
  if (!children.includes(word)) {
    let str = '#search_' + type
    if (type === 'title' || type === 'username') $(str).empty()
    let cont = $(str)
    cont.append(
      '<div class="flex">' +
      '<p class="searchable ' + type + '">' + word + '</p>' +
      // '<div class="minus">-</div>' +
      '</div>'
    )
  }
}

// click on plus
$('.plus').on('click', e => {
  let plus = $(e.target)
  let text = plus.prev().text()
  let td = plus.parent().parent()
  let th = td.closest('table').find('th').eq(td.index()).text()
  addToSearch(text, th)
})

// click on minus
$('body').on('click', '.minus', e => {
  let minus = $(e.target)
  minus.parent().remove()
})

$('body').on('click', '.searchable', e => {
  $(e.target).parent().remove()
})

// click on row
$('.row').on('click', function (e) {
  if (!$(e.target).hasClass('plus')) {
    window.location.href = '/i/' + $(this).data('id')
  }
})

// click on word
$('body').on('click', '.word', e => {
  let wordbox = $(e.target).parent()
  let word = wordbox.children().first().text()
  let type = wordbox.children().last().text()
  addToSearch(word, type)
  $('#search').val('')
  $('#wordbox').addClass('hidden')
  $('#wordbox').empty()
  $('#search').focus()
})

// click on search submit
$('#search_submit').on('click', e => {
  let rstr = ''
  let title = encodeURIComponent($('.title').first().text())
  if (title !== '') rstr += 'title=' + title + '&'
  let creator = $('.creator').get().map(x => encodeURIComponent($(x).text()))
  for (let c of creator) {rstr += 'creator=' + c + '&'}
  let tag = $('.tag').get().map(x => encodeURIComponent($(x).text()))
  for (let t of tag) {rstr += 'tag=' + t + '&'}
  let username = encodeURIComponent($('.username').first().text())
  if (username !== '') rstr += 'username=' + username + '&'
  let min_price = encodeURIComponent($('#min_price').val())
  if (min_price !== '') rstr += 'min=' + min_price + '&'
  let max_price = encodeURIComponent($('#max_price').val())
  if (max_price !== '') rstr += 'max=' + max_price + '&'
  window.location.href = '/s/?' + rstr.slice(0, -1)
})

// clear search
// $('#search').on('search', () => {
//   let wordbox = $('#wordbox')
//   wordbox.addClass('hidden')
//   wordbox.empty()
// })

// hide options if search loses focus
$(document).on('click', e => {
  if (
    $(e.target).closest('#wordbox').length === 0 &&
    $(e.target).closest('#search').length === 0
  ) {
    $('#wordbox').addClass('hidden')
  }
})

$('#search').on('focusin', () => {
  let wordbox = $('#wordbox')
  if (wordbox.children().length > 0) {
    wordbox.removeClass('hidden')
  }
})

// when typing in search
$('#search').on('keyup', () => {
  let wordbox = $('#wordbox')
  wordbox.addClass('hidden')
  wordbox.empty()
  let str = $('#search').val()
  if (str !== '') {
    $.ajax({
      url: '/d',
      type: 'post',
      data: {str: str},
      success: result => {
        for (let pair of result) {
          wordbox.append(
            '<div class="word"><div class="word1">' +
            pair.word +
            '</div><div class="fill"></div><div class="word2">' +
            pair.cat +
            '</div></div>'
          )
        }
        if (result.length > 0) {
          wordbox.removeClass('hidden')
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }
})