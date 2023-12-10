Проект по фронтенд разработке.

Команда Screenary team
  Состав:
    Кузнецов Павел,
    Баранов Антон,
    Чемекова Анастасия.
    
  Дизайн:
    https://www.figma.com/file/da6vtAxVJrY8FWjQ613SLP/Screenery---A-presentation-maker?type=design&node-id=0%3A1&mode=design&t=k70QykUEo4utB2f3-1
    TODO:
      1)Кнопки на верхней панели (вставка элементов, экспорт и прочее)
      2)Различные меню, вроде меню с настройками файла и предпросмотра

  Что сделать:
    В файле Editor.tsx вызывается две функции renderElements и renderSlides, их реализации находятся соответсвенно в Elements.tsx и Slides.tsx. renderElements создаёт html элементы обёрнутые в div, его трогать не надо. А вот renderSlides переделай так, чтобы он вызывал renderElements, получал оттуда этот div с элементыами и привращал его в svg, и возвращал его
