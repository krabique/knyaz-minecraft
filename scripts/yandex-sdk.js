var ysdk;

YaGames
  .init()
  .then(_sdk => {
    window.ysdk = _sdk;
    ysdk.features.LoadingAPI?.ready(); // Показываем SDK, что игра загрузилась и можно начинать играть
    console.log('YSDK initialized');
    ysdk.adv.showFullscreenAdv();
  })
  .catch(console.error);
