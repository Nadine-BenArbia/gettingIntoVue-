function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      battleLog: [],
    };
  },
  computed: {
    monsterBarStyle() {
      return {
        width: this.monsterHealth + "%",
      };
    },
    playerBarStyle() {
      return {
        width: this.playerHealth + "%",
      };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    mayHeal() {
      return this.playerHealth > 60;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      let attackValue = getRandomValue(12, 5);
      this.monsterHealth -= attackValue;
      this.addLogMsg("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      let attackValue = getRandomValue(15, 8);
      this.playerHealth -= attackValue;
      this.addLogMsg("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;

      let attackValue = getRandomValue(25, 10);
      this.monsterHealth -= attackValue;

      this.attackPlayer();

      this.addLogMsg("player", "attack", attackValue);
    },
    playerHeal() {
      this.currentRound++;
      const healValue = getRandomValue(20, 8);
      this.playerHealth += healValue;
      this.attackPlayer();
      this.addLogMsg("player", "heal", healValue);
    },
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.battleLog = [];
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMsg(who, what, value) {
      this.battleLog.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
}).mount("#game");
