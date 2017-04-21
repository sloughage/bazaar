$('.plus').on('click', e => {
  const td = $(e.target).parent().parent()
  const th = td.closest('table').find('th').eq(td.index()).text()
  if (th === 'title') {
    $('#search_title').empty()
  }
  $('#search_' + th).append(
    '<div class="flex"><p class="' + th + '">' +
    $(e.target).prev().text() +
    '</p><div class="minus">-</div></div>'
  )
})

$('body').on('click', '.minus', e => {
  $(e.target).parent().remove()
})

$('.row').on('click', function (e) {
  if (!$(e.target).hasClass('plus')) {
    window.location.href = '/i/' + $(this).data('id')
  }
})

$('#search_submit').on('click', e => {
  let rstr = ''
  const mkstr = x => $(x).get().map(y => $(y).text()).join(',')
  const titles = mkstr('.title')
  if (titles !== '') rstr += 'title=' + titles + '&'
  const creators = mkstr('.creators')
  if (creators !== '') rstr += 'creator=' + creators + '&'
  const tags = mkstr('.tags')
  if (tags !== '') rstr += 'tag=' + tags + '&'
  const min_price = $('#min_price').val().trim()
  if (min_price !== '') rstr += 'min=' + min_price + '&'
  const max_price = $('#max_price').val().trim()
  if (max_price !== '') rstr += 'max=' + max_price + '&'
  // console.log('/s?' + rstr.slice(0, -1))
  window.location.href = '/s?' + rstr.slice(0, -1)
})