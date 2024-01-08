Проект по фронтенд разработке.

Команда Screenary team
  Состав:
    Кузнецов Павел,
    Баранов Антон,
    
  Дизайн:
    https://www.figma.com/file/Bjd4fNB1W1SF1rjGSixFPw/Screenery---A-presentation-maker-(Ver.-2)?type=design&node-id=0-1&mode=design

  Что сделать:
    В файле Editor.tsx вызывается две функции renderElements и renderSlides, их реализации находятся соответсвенно в Elements.tsx и Slides.tsx. renderElements создаёт html элементы обёрнутые в div, его трогать не надо. А вот renderSlides переделай так, чтобы он вызывал renderElements, получал оттуда этот div с элементыами и привращал его в svg, и возвращал его

