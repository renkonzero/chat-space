$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html = `<div class="message" data-message-id=${message.id}>

          <div class="chat-main__message_list" >
          <div class="chat-main__message_list_data">
            <div class="chat-main__massage_list_data_menber">
              ${message.user_name}
            </div>
            <div class="chat-main__message_list_data_date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message_list_form">
            <p class="chat-main__message_list_form_content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>
        </div>`

      return html;
    } else {
      var html = `<div class="message" data-message-id=${message.id}>

      <div class="chat-main__message_list">
      <div class="chat-main__message_list_data">
        <div class="chat-main__massage_list_data_menber">
          ${message.user_name}
        </div>
        <div class="chat-main__message_list_data_date">
          ${message.created_at}
        </div>
      </div>
      <div class="chat-main__message_list_form">
        <p class="chat-main__message_list_form_content">
          ${message.content}
        </p>
      </div>
    </div>
    </div>`

      return html;
    };
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $('.chat-main__footer_group_form_btn').removeAttr('data-disable-with');
  
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message').append(html);
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      $('form')[0].reset();
    })
  
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });

  })
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message').append(insertHTML);
        $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
        $('form')[0].reset();
        $('form').prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    });
  }
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
})
  