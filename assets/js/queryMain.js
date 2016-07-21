function check(){
  if (document.getElementById('paymentRadio').checked) {
      document.getElementById('paymentField').disabled = false;
  } else if (document.getElementById('queryRadio').checked) {
      document.getElementById('paymentField').disabled = true;
  }
}
