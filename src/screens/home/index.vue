<!-- HOME -->
<template>
  <div>
    <div class="screen-wrapper background">
      <div class="flex-column">
        <h1 class="game-title ugly">
          Продленка с&nbsp;монстром
        </h1>
        <div class="msg ugly">
          {{ monstrMessage }}
        </div>
        <p class="beautiful">
          В этой игре тебе предстоит сразиться с&nbsp;монстром...
        </p>
        <button
          class="user"
          @click="goToLogin"
        >
          Играть
        </button>
      </div>
    </div>
    <div class="under-screen-wrapper">
      <p class="beautiful">
        В игре есть задания которые нужно решить что бы монстр был уничтожен. Можно
        пользоваться как мышью так и клавиатурой.  Клавиша &lt;Ввод&gt; осуществляет
        нажатие на кнопку, например для закрытия диалога. "Стрелки" позволяют выбрать
        вариант из предложенных, в тектовых полях где нужно ввести слово стрелки:
        &uarr; и &darr;  осуществляют переход по буквам алфавита, а &larr; и &rarr;
        переход к предыдущему или соответствующему слову. Клавиша &lt;Пробел&gt; часто
        работает как и клавиша &lt;Ввод&gt;. Там где нужно перекинуть слова с одного
        место в другое, помимо пальца, или мышки можно так же используя "Стрелки"
        выбрать нужное слово и если существует только один вариант куда его можно
        перебросить то нужно просто нажать  &lt;Пробел&gt; ( &lt;Ввод&gt; в этом
        случае служит только для закрытия диалога) если есть варианты куда вставить
        слово то он осуществляется стрелками &uarr; и &darr; Чтобы выбрать задание
        на главном экране игры просто нажми &lt;Ввод&gt; или &lt;Пробел&gt; Удачи!
      </p>
      <p>
        Информация об авторе:
      </p>
      <p>
        Меня зовут Даниил. Я люблю программирование и учусь делать это
        правильно. Мне нравится открывать что-то новое для себя, а
        программирование это как раз та область, где это одна из ключевых
        особенностей помимо того, что можно создать что-то просто сидя за
        компьютером, для этого нужно только время и желание.  К сожалению, в
        этой игре я не смог применить все что хотел, но, к счастью, это всего
        лишь бета-версия игры и в будущем у меня есть план ее серьезно
        доработать, в частности, улучшить анимацию и оформление. Я не люблю
        делать вещи плохо, но их иногда нужно просто сделать вовремя, и не
        всегда получается сделать быстро и хорошо, однако это был мой первый
        опыт в написании игры пусть даже и очень маленький. Так же я рад
        знакомству с фреймворком Vue, мне нравятся его особенности, но  и не
        все я еще изучил. Программирую я очень давно, но редко бываю доволен
        результатами, потому что всегда можно что-то улучшить, а я часто писал
        сиюминутные вещи, которые решают очень узкий круг вопросов, например
        распарcить текст, обрезать фотографии и прочие подобные утилиты на
        скорую руку. Тем не менее благодаря своему интересу к компьютеру,
        программам и программированию, я смог решить очень много разных задач
        которые стояли передо мной.    Я надеюсь, что этот маленький опыт,
        поможет мне в будущем писать программы еще лучше, создавать что-то
        более полезное и удобное для того, чтобы людям было проще получать
        результат от работы за компьютером. Игру написал специально в школьной
        тематике, так как школа – это очень важный этап в жизни каждого.
      </p>
    </div>
  </div>
</template>

<script>
import keyboardMixin from '../../components/mixins/keyboard';

const model = require('./index.js');

export default {
  mixins: [keyboardMixin],
  data() {
    return {
      monstrMessage: model.default.getMyMessage(this),

    };
  },
  methods: {
    keyDown(key) {
      if (key === 'Enter') {
        this.$root.gotoLogin();
      }
    },
    goToLogin() {
      this.$root.gotoLogin();
    },
  },
};
</script>

<style lang="scss" src="../styles.scss" ></style>
<style lang="scss" src="./index.scss" ></style>
