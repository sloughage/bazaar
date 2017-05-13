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

$('body').on('click', '.minus', e => {
  let minus = $(e.target)
  minus.parent().remove()
})

$('.row').on('click', function (e) {
  if (!$(e.target).hasClass('plus')) {
    window.location.href = '/i/' + $(this).data('id')
  }
})

$('#search_submit').on('click', e => {
  let rstr = ''
  let title = encodeURIComponent($('.title').first().text())
  if (title !== '') rstr += 'title=' + title + '&'
  let creators = $('.creators').get().map(x => encodeURIComponent($(x).text()))
  for (let c of creators) {rstr += 'creator=' + c + '&'}
  let tags = $('.tags').get().map(x => encodeURIComponent($(x).text()))
  for (let t of tags) {rstr += 'tag=' + t + '&'}
  let min_price = encodeURIComponent($('#min_price').val())
  if (min_price !== '') rstr += 'min=' + min_price + '&'
  let max_price = encodeURIComponent($('#max_price').val())
  if (max_price !== '') rstr += 'max=' + max_price + '&'
  window.location.href = '/s/?' + rstr.slice(0, -1)
})