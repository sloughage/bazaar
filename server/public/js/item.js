$('#show_edit').on('click', e => {
  $('#content').toggleClass('hidden')
  $(e.target).toggleClass('hidden')
  $('#edit').toggleClass('hidden')
})

$('#add_creator').on('click', e => {
  $('#creator_box').append('<input class="creator txtbox">')
})

$('#add_tag').on('click', e => {
  $('#tag_box').append('<input class="tag txtbox">')
})

$('#edit_submit').on('click', e => {
  $.ajax({
    url: window.location.pathname,
    type: 'put',
    data: {
      title: $('#title').val(),
      creators: $('.creator').get().map(x => x.value.trim()),
      tags: $('.tag').get().map(x => x.value.trim()),
      price: $('#price').val()
    },
    success: result => {
      if (typeof result === 'string') window.location.reload()
      else console.log(result)
    },
    error: err => {
      console.log(err)
    }
  })
})

$('#delete_submit').on('click', e => {
  $.ajax({
    url: window.location.pathname,
    type: 'delete',
    success: result => {
      window.location.href = '/s'
    },
    error: err => {
      console.log(err)
    }
  })
})