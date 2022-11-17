// sign metamask
async function get_signer() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
}

// query info
function get_address(signer) {
  return new Promise(res => {
    signer.getAddress().then(addr => res(addr));
  });
}
function get_balance(signer) {
  return new Promise(res => {
    signer.getBalance().then(balance => {
      let b = (balance.toString()/1000000000000000000).toFixed(8);
      res(b);
    });
  });
}

// ui
function loading() {
  $('#btn-signin').html('...');
  $('#out-addr').html('...');
  $('#out-balance').html('...');
}
function loaded(addr, balance) {
  $('#out-addr').html(addr);
  $('#out-balance').html(`${balance} ETH`);
  $('#btn-signin').html('Sign-In');
}

// sign-in button
$('#btn-signin').click(_ => {
  // loading
  loading();
  // get signer
  get_signer().then(signer => {
    Promise.all([
      get_address(signer),
      get_balance(signer),
    ]).then(resp => {
      var [addr, balance] = resp;
      loaded(addr, balance);
    });
  });
});
