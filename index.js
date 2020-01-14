// Определяем новый компонент под именем todo-item

$("#modal_edit_inner").load("components/modal_edit.html"); 
$("#modal_delete_inner").load("components/modal_delete.html"); 
$("#modal_transfer_inner").load("components/transfer.html"); 

window.onload = function() { ready(); }

function ready() {
  var app = new Vue({
    el: '#app',
    data: {
      name: 'Елена', family: 'Власова',
      transfer_counter: 1, 
      balance: 13,
      money_count: 0, 
      money_count_redact: 0,
      showModal_redact: false, showModal_delete: false, showModal_transfer: false,
      wallet_number: null,
      menu_list: [], 
    }, methods: {
      changeName: function(event) {
          this.name = event.target.value

      },
      changeWalletToTransfer: function(event) {
        change_wallet();
        this.wallet_number = event.target.value;
      },
      counter: function(event) {
          if (parseFloat(event.target.value) >= parseFloat(this.balance)) { event.target.value = this.balance }
          money_count()
          this.money_count = event.target.value;
      },
      show_modal_transfer: function(event) {
          this.money_count = 0;
          this.wallet_number = null;
          this.showModal_transfer = true;
      },
      delete_user: function() {

      },
      redact_user_name: function() {
          event.target.value = event.target.value.replace(/[0-9]/, '');
          this.name = event.target.value;
      },
      redact_user_family: function() {
          event.target.value = event.target.value.replace(/[0-9]/, '');
          this.family = event.target.value;
      },
      redact_user: function() {
          console.log(event)
          this.showModal_redact = false;
      },
      changeRedactUser: function() {
          money_count()
          this.balance = event.target.value
          this.money_count_redact = event.target.value;
      },
      transfer: function(_this_, _event_) {
          if (this.wallet_number == null || this.wallet_number.length < 12) {
            return wrong_data(this.wallet_number, null);
          }
          if (this.money_count == null || this.money_count == 0) {
            return wrong_data(null, this.money_count);
          }

          this.transfer_counter++  
          this.balance = this.balance - this.money_count
          this.showModal_transfer = false;
          new_transaction(this.transfer_counter, this.wallet_number, this.money_count);
      },
    },
    mounted() {
      // Отображаем вью после загрузки страницы
      this.$el.style.display = "block";
    }
  })

  function money_count() {
    event.target.value == '' ? event.target.value = '0' : event.target.value = event.target.value;
    event.target.value = event.target.value.replace(/[a-zA-Zа-яА-Я]/, '');
  }

  function new_transaction(t_c, w_n, m_c) {
    document.getElementsByClassName('list-group mb-3')[0].innerHTML += 
      '<li class="list-group-item d-flex justify-content-between lh-condensed border-0">' +
      '<div class="h-100 left">' +
      '<h6 class="my-0">Перевод № ' + t_c + '</h6>' +
      '<small class="text-muted">Номер кошелька: ' + w_n + '</small>' +
      '</div>' +
      '<span class="text-muted">$' + m_c + '</span>' +
      '</li>';
  }

  function change_wallet() {
    if (event.target.value.length >= 13) {
      event.target.value = event.target.value.substring(0, event.target.value.length - 1);
    }
    event.target.value.indexOf('+7') == -1 ? event.target.value = '+7' : event.target.value = event.target.value;
    event.target.value[0] != '+' ? event.target.value = '+7' : event.target.value = event.target.value;
    event.target.value = event.target.value.replace(/[a-zA-Zа-яА-Я]/, '')
  }

  function wrong_data(if_phone, if_balance) {
    console.log(if_phone)
    console.log(if_balance)
    return 'dont';
  }

  
}
