// Elements
const textarea = document.querySelector('.messenger-panel__sends');
const messenger = document.querySelector('.container-with-y-scroll');
const menu = document.querySelector('.menu');
const links = document.querySelectorAll('a[href^="#"]');
const timeBoard = document.querySelector('.timeBoard');

//Listeners
textarea.addEventListener('keydown', resize);
textarea.addEventListener('scroll', scrollDetect);
messenger.addEventListener('scroll', scrollDetect);
menu.addEventListener('click', menuAction);
links.forEach((link) => link.addEventListener('click', smooth));

// Listeners sup function
// control resize textarea
function resize(e) {
  let el = this;
  if (e.key == 'Enter') {
    if (!(e.shiftKey || e.ctrlKey)) {
      answerTextarea(el.value);
    } else {
      if (e.ctrlKey) el.value += '\n';
    }
  }
  setTimeout(function () {
    let zn = el.value.split('\n').reduce((acc, str) => {
      acc +=
        str.length * 8 > el.offsetWidth
          ? Math.ceil((str.length * 8) / el.offsetWidth)
          : 1;
      return acc;
    }, 0);
    if (zn < 10) {
      el.style.cssText = 'height:' + (zn < 3 ? 3 : zn) * 13.5 + 'px';
    }
  }, 1);
}

// show scroll only if necessary
function scrollDetect(e) {
  const thisisblock = e.target;
  e.target.classList.add(`${e.target.classList[0]}_active`);
  setTimeout(
    () => e.target.classList.remove(`${e.target.classList[0]}_active`),
    1500
  );
}

//smooth transition to the desired block
function smooth(e) {
  e.preventDefault();
  smoothMove(document.querySelector(e.target.getAttribute('href')));
}
function smoothMove(element) {
  if (element != null)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
}

/*--------------------- MESSENGER ------------------*/
// First messege
const HOURGS_DAY = new Date().getHours();
const GREETING = [
  'Hello how are you?',
  'Hello!',
  'Hey!',
  `Good ${
    HOURGS_DAY >= 21 || HOURGS_DAY <= 4
      ? 'night'
      : HOURGS_DAY < 9
      ? 'morning'
      : HOURGS_DAY <= 17
      ? 'day'
      : 'evening'
  }!`,
  '👋',
  '🤚',
  'Приветствую',
  'Привет',
  'Здоровенькі були!',
  'Шо ти, Мацьонька?',
  'Howdy!',
  '😉',
  'Ciao!',
  '🤙',
  '🖖',
  'Hi!',
  '🤝',
];

// Additional answer options
const ANSWER_ADDITION = [
  'This information is for the elite only, but for you I will make an exception.',
  'I can read tihs it to the beat! Listen to me. In the future,  i 100% Rap Star, breaking the top charts of iTunes and Spotify. It remains only to find a good beatmaker, ghostwriter, producer, marketer, Instagram account host and the person who sponsored it all.',
  'Easy breezy',
  'What? Okay!',
  'Ok',
  '👌',
  'Give a couple of seconds',
  `It's not indecent to ask. But I will answer anyway`,
  'Since you insist so',
  `Only after you do it. Although... okay, I'm the first.`,
  `Oh-oh-oh, this is for a long time. You better go make some tea and get some cookies.`,
  'When I talk about it. Many begin to fall asleep.',
  'I will answer, but after that I can fulfill only one of your wishes\n🧞‍♂️',
];

// For each CB point. Your questions, answers
// and a variable with a DOM object
const MESSAGES = {
  contact: {
    ask: [
      'Can i find out your contacts?',
      'Give your contacts',
      'How can i contact you?',
      '👉📧',
      '👉📱',
    ],
    answer: [
      `I hope you won't call and breathe into phone at 1 am!`,
      `I'm waiting for your calls, honeys`,
    ],
  },
  about: {
    ask: [
      'Tell something about yourself',
      'Can I have more information about you?',
      'What do you say about yourself',
      'Give some information about yourself',
      'Who are you?',
    ],
    answer: [
      'Вспоминаем и молимся\nВспоминаем и молимся\n© Krovostok',
      'What can I tell about myself ...',
      `I was born`,
      `You better not know the real me`,
      `Genius, billionaire, playboy, philanthropist. This is not about me`,
    ],
  },
  education: {
    ask: [
      'Where did you study?',
      'Did you study at all?',
      'What is your education?',
      'Do you have a university degree?',
      'Who did you study with?',
    ],
    answer: [
      'I was raised by the street. uuf',
      'Start with kindergarten?',
      'Why study? Life will teach you everything!',
      'The less you know the better you sleep',
      'Well, I can read syllables and count to 10!',
    ],
  },
  experience: {
    ask: [
      'What kind of work experience do you have?',
      'Show your projects!',
      'Show your work',
      'I want to see what you worked on!',
      'What is your experience?',
    ],
    answer: [
      'Helping grandmother counts?',
      'Depends on which one you ask?',
      'If we understood each other correctly',
    ],
  },
  language: {
    ask: [
      'What languages ​​do you know?',
      'What languages ​​do you speak?',
      'English, motherf#$%&r! Do you speak it?!',
      'what language can I speak to you?',
      'What language do you understand?',
      '👅',
    ],
    answer: [
      'Let me speak from my heart',
      'Сокиабле!',
      'Body language and dance language 🕺',
      `Remember Mickey O'Neil from the Snatch movie? I speak English worse`,
      '👅',
      '😛',
      `Indian, German, Korean, Chinese, Vietnamese, Thai, Reptilian, Masonic, Mexican, Puerto Rican, Australian, Pacific, Elvish. These are all languages ​​that I do not know for sure.`,
    ],
  },
  code: {
    ask: [
      `May I laugh at your code?\nOh, I wanted to say "I'll see"`,
      'Show what you are capable of',
      'Show your code!',
      'Do you even know how to program?',
      'showCode();',
    ],
    answer: [
      'My code is like Quasimodo. Ugly in appearance but beautiful in soul',
      'But you write the code of course "better"',
      '1101110 1101001 1101110 1101010 1100001',
    ],
  },
  cours: {
    ask: [
      'What courses did you take?',
      'What course certificates do you have?',
      'Did you study additionally?',
      'Can I see your certificates?',
      'What else have you studied?',
    ],
    answer: [
      '💅 still in progress. But you can already sign up!',
      'The course "successful success", "how to make your first million on the courses"',
      'Do university preparatory courses count?',
    ],
  },
  skill: {
    ask: [
      'Tell us about your skills',
      'What can you do?',
      'Write about your skills',
      'Describe your skills',
      'What are your professional skills?',
    ],
    answer: [
      `You say it's luck. I say this is a skill`,
      'Do you want to see the skills? I will show',
    ],
  },
  vector: {
    ask: [
      'What areas in the profession are you interested in?',
      'Tell us about the vector of your future development in the profession',
      'Write about the vector of your future development in the profession',
      'What interests you in the profession?',
      'What prospects are you building for yourself in the profession?',
      '🚀',
    ],
    answer: [
      'There are many, but I chose one path',
      'I have something to say about my development vector',
      'I know it will be difficult, but I like it.',
    ],
  },
};

// Answers to incorrect questions
const DONT_UNDERSTEND = [
  `Sorry, I real don't understand what you want.`,
  `I'm sorry, what?`,
  `What... what?`,
  'I do not understand.',
];

// response to the replay
const REPLAY_MSG = [
  'I already wrote about it',
  'We already talked about this',
  'The answer is above ☝️',
  'we discussed it earlier',
  'I kind of wrote about it 🤨',
];

// Save all DOM elements of the main container
// in a message variable and remove all child nodes
messenger
  .querySelectorAll('.messanger__item')
  .forEach((el) => (MESSAGES[el.id]['dom'] = el));
document.querySelector('.codeContainer').style.display = 'none';
document.querySelector('body').append(document.querySelector('.codeContainer'));
let fixerPreBug = document.createElement('PRE');
fixerPreBug = document.querySelector('.codeContainer').cloneNode(true);
MESSAGES['code']['dom'].append(fixerPreBug);
messenger.innerHTML = '';

// a flag that does not allow a new request
// to be called when the old one is incomplete
let freeQueue = true;

// show a message when a button is pressed
function menuAction(e) {
  e.preventDefault();
  if (e.target.tagName != 'A') return;
  const POINT_NAME = e.target.href.split('#')[1];

  if (freeQueue && MESSAGES.hasOwnProperty(POINT_NAME)) {
    showPointSV(POINT_NAME);
  }
}

// Check text comprises only emoji ( return true || false )
const thisIsEmoji = (text) =>
  text.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g) != null &&
  text.match(/\p{L}|\p{N}/gu) == null;

// creates a DOM object for an answer and a question
// text - message text
// type - received or sent message
const messageCreator = (text, type = 'sent') => {
  if (!text) throw new Error('messageCreator did not receive the message');
  const CLASS_ARR = ['messenger__message', `messenger__message-${type}`];
  if (thisIsEmoji(text)) CLASS_ARR.push('messenger__message-emoji');
  const MSG = createElement('div', CLASS_ARR);
  MSG.textContent = text;
  return MSG;
};

// creator new DOM elements
function createElement(type, classArr) {
  if (!type) throw new Error('Video creator not found type');
  const element = document.createElement(type);
  if (classArr !== undefined)
    classArr.forEach((className) => element.classList.add(className));
  return element;
}

// shows the last time of the message
const postTime = () => {
  let time = new Date();
  let hour = time.getHours();
  let minutes = time.getMinutes();
  time = '';
  if (minutes < 10) minutes = '0' + minutes;
  timeBoard.textContent = `${hour}:${minutes}`;
};

// notifies about a new message
const bell = () => {
  setTimeout(() => {
    document.querySelector('#sound1').play();
    setTimeout(() => document.querySelector('#sound2').play(), 150);
    postTime();
  }, 200);
};

// posted new message
const posted = (el, container = messenger) => {
  if (el[0].className.includes('messenger__message-received')) {
    bell();
    timeBoard.textContent = 'writes...';
  }
  const coef =
    (el[0].tagName == 'ARTICLE' ? el[0].children : el[0].textContent.length) *
    10;
  setTimeout(
    () => {
      if (el[0].tagName == 'ARTICLE') {
        let elArr = Array.prototype.slice.call(el[0].children);
        let cont = el[0].cloneNode(false);
        container.append(cont);
        posted(elArr, document.querySelector(`#${el[0].id}`));
      } else {
        if (el[0].tagName == 'PRE') {
          el[0] = document.querySelector('.codeContainer');
        }
        container.append(el[0]);
        if (el.length == 1) freeQueue = true;
        if (el[0].tagName == 'PRE') {
          document.querySelector('.codeContainer').style.display = 'block';
        }
        if (el[1] != undefined) posted(el.slice(1), container);
      }
    },
    coef > 500 ? coef / 3 : coef * 2
  );
};

// Gets the title of the CB point and adds it to
// or smoothly transitions to it
function showPointSV(title, ask, answer) {
  if (messenger.querySelector(`#${title}`) == null) {
    freeQueue = false;
    const ASK_ELEMENT = messageCreator(
      ask || MESSAGES[title].ask[~~(Math.random() * MESSAGES[title].ask.length)]
    );
    const ANSWER_ARR = ANSWER_ADDITION.concat(...MESSAGES[title].answer).sort(
      (a, b) => Math.random() - Math.random()
    );
    const ANSWER = answer || ANSWER_ARR[~~(Math.random() * ANSWER_ARR.length)];
    if (ANSWER_ADDITION.includes(ANSWER))
      ANSWER_ADDITION.splice(ANSWER_ADDITION.indexOf(ANSWER), 1);
    const ANSWER_ELEMENT = messageCreator(ANSWER, 'received');
    posted([ASK_ELEMENT, ANSWER_ELEMENT, MESSAGES[title].dom.cloneNode(true)]);
    postTime();
  }
}

// the answer to the question from textarea
function answerTextarea(text) {
  let maxKeyVector = ['', 0];
  setTimeout(() => (textarea.value = ''), 1);
  let selectedKey = null;
  const TEXT_ARR = text.toLowerCase().match(/\w+/g);
  if (TEXT_ARR == null) return;
  const filtredText = TEXT_ARR.filter((el) => el.length > 3);
  for (let key of Object.keys(MESSAGES)) {
    const MESSAGES_ASK = MESSAGES[key].ask.map((el) => {
      return el
        .toLowerCase()
        .match(/\w+|([\uD800-\uDBFF][\uDC00-\uDFFF])/g)
        .join(' ');
    });
    if (TEXT_ARR.includes(key) || MESSAGES_ASK.includes(TEXT_ARR.join(' '))) {
      selectedKey = key;
      break;
    } else {
      if (!filtredText.length) continue;
      const allDescription = MESSAGES[key].dom.textContent.toLowerCase();
      const curVector =
        filtredText.reduce(
          (acc, el) => (allDescription.includes(el) ? ++acc : acc),
          0
        ) / allDescription.match(/{\w+}||{\d+}/g).length;
      if (maxKeyVector[1] < curVector && curVector != Infinity) {
        maxKeyVector = [key, curVector];
      }
    }
  }
  if (selectedKey == null) {
    if (!maxKeyVector[1]) {
      posted([
        messageCreator(text),
        messageCreator(
          DONT_UNDERSTEND[~~(DONT_UNDERSTEND.length * Math.random())],
          'received'
        ),
      ]);
      return;
    } else {
      selectedKey = maxKeyVector[0];
    }
  }

  if (messenger.querySelector(`#${selectedKey}`) != null) {
    posted([
      messageCreator(text),
      messageCreator(
        REPLAY_MSG[~~(REPLAY_MSG.length * Math.random())],
        'received'
      ),
    ]);
    return;
  }
  showPointSV(selectedKey, text);
}

// First messages
const firstMessages = () => {
  const MSG_SEND = GREETING.splice(GREETING.length * Math.random(), 1)[0];
  const MSG_RECEIVED = GREETING.splice(GREETING.length * Math.random(), 1)[0];
  posted([messageCreator(MSG_SEND), messageCreator(MSG_RECEIVED, 'received')]);
};
setTimeout(firstMessages, 1000);

//self-assessment of the project
console.log(`Всего баллов: 133.5/ 150\n
- [ x ] вёрстка валидная (10/10)
- [ x ] вёрстка семантическая (20/20)
        Есть header, footer, main, article, section, nav, aside, h1, h2, h3
- [ x ] для оформления СV используются css-стили (10/10)
- [ x ] контент размещается в блоке, который горизонтально центрируется на странице. Фоновый цвет, если он есть, тянется во всю ширину страницы (10/10)
- [ x ] вёрстка адаптивная: ни на одном из разрешений экрана до 320px включительно не появляется горизонтальная полоса прокрутки, при этом всё содержание страницы сохраняется (10/10)
- [ ± ] есть адаптивное бургер-меню. Ссылки в пунктах меню ведут на основные разделы CV. При кликах по пунктам меню реализована плавная прокрутка по якорям. При уменьшении ширины экрана меню становится адаптивным. (7.5/10)
        [ - ] Меню не адаптивное.
- [ x ] На странице СV присутствует изображение - фото или аватарка автора CV, пропорции изображения не искажены, у изображения есть атрибут alt (10/10)
- [ x ] контакты для связи и перечень навыков оформлены в виде списка ul > li (10/10)
- [ x ] CV содержит контакты для связи, краткую информацию о себе, перечень навыков, информацию об образовании и уровне английского (10/10)
- [ x ] CV содержит пример кода (например, решение задачи с сайта codewars) с подсветкой кода. Для подсветки кода может использоваться js-библиотека, например, highlight.js (10/10)
- [   ] CV содержит изображения-ссылки на выполненные вами проекты. При клике по изображению страница проекта открывается в новой вкладке. У каждого проекта есть название, небольшое описание, указан перечень используемых технологий. (0/10)
- [ x ] CV выполнено на английском языке. (10/10)
- [ x ] выполнены требования к Pull Request: есть ссылка на задание, скриншот страницы СV, ссылка на деплой страницы CV на GitHub Pages, выполнена самооценка (самооценку расписываем по пунктам критериев оценки, указывая балл за каждый пункт) (10/10)
- [   ] есть видеорезюме автора CV на английском языке. (0/10)
- [ ± ] дизайн, оформление, качество выполнения CV не ниже чем в примерах CV, приведённых в материалах к заданию (6/10)
`);
