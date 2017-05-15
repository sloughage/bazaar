// click on plus
$('.plus').on('click', e => {
  let plus = $(e.target)
  let text = plus.prev().text()
  let td = plus.parent().parent()
  let th = td.closest('table').find('th').eq(td.index()).text()
  let children = $('.' + th).get().map(x => $(x).text())
  if (!children.includes(text)) {
    if (th === 'title') $('#search_title').empty()
    let cont = $('#search_' + th)
    cont.append(
      '<div class="flex"><p class="' + th + '">' +
      text +
      '</p><div class="minus">-</div></div>'
    )
  }
})

// click on minus
$('body').on('click', '.minus', e => {
  let minus = $(e.target)
  minus.parent().remove()
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
  let cont = $('#search_' + type)
  if (type === 'title') cont.empty()
  cont.append(
    '<div class="flex"><p class="' + type + '">' +
    word +
    '</p><div class="minus">-</div></div>'
  )
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
  let min_price = encodeURIComponent($('#min_price').val())
  if (min_price !== '') rstr += 'min=' + min_price + '&'
  let max_price = encodeURIComponent($('#max_price').val())
  if (max_price !== '') rstr += 'max=' + max_price + '&'
  window.location.href = '/s/?' + rstr.slice(0, -1)
})

// when typing in search
$('#search').on('keyup', () => {
  let wordbox = $('#wordbox')
  wordbox.empty()
  wordbox.addClass('hidden')
  $.ajax({
    url: '/d',
    type: 'post',
    data: {str: $('#search').val()},
    success: result => {
      for (let pair of result) {
        wordbox.append(
          '<div class="word"><div class="word1">' +
          pair.word +
          '</div><div class="fill"></div><div class="word2">' +
          pair.type +
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
})