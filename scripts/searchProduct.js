$(document).ready(function() {
  $('div.alert').css('display', 'none');

});

$('form').on('submit', function(e) {
  e.preventDefault();

  const url = $('#productUrl').val();
  
  if(!url.startsWith('https://www.netshoes.com.br/p/')) {
    alert('Insira uma URL válida!');
    return;
  }

  $('div.alert').css('display', '');

  $.ajax({
    url: 'productInfoCsv',
    method: 'POST',
    data: {
      productUrl: url
    },
    success: function({ msg }) {
      alert(msg);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    error: function(msg) {
      alert(msg.responseJSON.errorMessage);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  })
})