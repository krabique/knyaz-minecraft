let ysdk;

YaGames
  .init()
  .then(_sdk => {
    ysdk = _sdk;
    ysdk.features.LoadingAPI?.ready(); // Показываем SDK, что игра загрузилась и можно начинать играть
    console.log('YSDK initialized');
  })
  .catch(console.error);
