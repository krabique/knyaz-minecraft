var ysdk;

YaGames
  .init()
  .then(_sdk => {
    window.ysdk = _sdk;
    ysdk.features.LoadingAPI?.ready(); // Показываем SDK, что игра загрузилась и можно начинать играть
    console.log('YSDK initialized');
    ysdk.adv.showFullscreenAdv({
      callbacks: {
        onClose: function(wasShown) {
          document.getElementById('startGameButton').style.visibility = 'visible';
        },
      }
    });
  })
  .catch(console.error);

function sendFeedback() {
  ysdk.feedback.requestReview().then(({ feedbackSent }) => {
    console.log(feedbackSent);
  });
}

function canReview() {
  let result = false;
  ysdk.feedback.canReview().then(({ value, reason }) => {
    result = !!value;
  });
  console.log(result);
  return result;
}
