/**
 * H5APIå®¢æˆ·ç«¯å¯¹æŽ¥æŽ¥å£
 */
window.h5api = {
  /**
   * è®¾ç½®è¿›åº¦æ¡è¿›åº¦
   * @param {int} num èŒƒå›´1~100ï¼Œè¿›åº¦å€¼
   */
  progress: function (num) {
    parent.h5api.progress(num);
  },

  /**
   * æäº¤åˆ†æ•°
   * @param {int} score åˆ†æ•°
   * @param {func} callback å›žè°ƒå‡½æ•°
   */
  submitScore: function (score, callback) {
    parent.h5api.submitScore(score, callback);
  },

  /**
   * èŽ·å¾—æŽ’è¡Œæ¦œ
   * @param {func} callback å›žè°ƒå‡½æ•°
   */
  getRank: function (callback) {
    parent.h5api.getRank(callback);
  },

  /**
   * æ˜¯å¦èƒ½æ’­æ”¾å¹¿å‘Š
   * @param {func} callback å›žè°ƒå‡½æ•°
   * @returns {boolean} æ˜¯å¦èƒ½æ’­æ”¾å¹¿å‘Š
   */
  canPlayAd: function (callback) {
    return parent.h5api.canPlayAd(callback);
  },

  /**
   * æ’­æ”¾å¹¿å‘Š
   * @param {func} callback å›žè°ƒå‡½æ•°
   */
  playAd: function (callback) {
    parent.h5api.playAd(callback);
  },

  /**
   * è°ƒç”¨åˆ†äº«åŠŸèƒ½
   */
  share: function () {
    parent.h5api.share();
  },

  /**
   * èŽ·å¾—ç”¨æˆ·å½“å‰æ˜¯å¦ç™»å½•
   */
  isLogin: function () {
    return parent.h5api.isLogin();
  },

  /**
   * ç”¨æˆ·ç™»å½•
   * @param {func} callback å›žè°ƒå‡½æ•°
   */
  login: function (callback) {
    parent.h5api.login(callback);
  },

  /**
   * èŽ·å¾—ç”¨æˆ·å¤´åƒåœ°å€ï¼Œé«˜å®½ä¸º120*120åƒç´ 
   *
   * @param {String} uid ç”¨æˆ·ç¼–å·
   * @param {String} size å¤´åƒå¤§å°
   * @return ç”¨æˆ·å¤´åƒåœ°å€
   */
  getUserAvatar: function (uid, size) {
    return 'https://a.3304399.net/' + uid + '/' + (size || 'middle');
  },

  /**
   * èŽ·å¾—ç”¨æˆ·å°å¤´åƒåœ°å€ï¼Œé«˜å®½ä¸º48*48åƒç´ 
   */
  getUserSmallAvatar: function (uid) {
    return this.getUserAvatar(uid, 'small');
  },

  /**
   * èŽ·å¾—ç”¨æˆ·å¤§å¤´åƒåœ°å€ï¼Œé«˜å®½ä¸º200*200åƒç´ 
   */
  getUserBigAvatar: function (uid) {
    return this.getUserAvatar(uid, 'big');
  },

  /**
   * æäº¤æŽ’å
   *
   * @param {int} score åˆ†æ•°
   * @param {func} callback å›žè°ƒå‡½æ•°
   */
  submitRanking: function (score, callback) {
    parent.h5api.submitRanking(score, callback);
  },

  /**
   * æ–°ç‰ˆæäº¤æŽ’å
   * @param {*} rankId æŽ’è¡Œæ¦œid
   * @param {*} score åˆ†æ•°
   * @param {*} callback å›žè°ƒå‡½æ•°
   */
  submitRankScore: function (rankId, score, callback) {
    parent.h5api.submitRankScore(rankId, score, callback);
  },

  /**
   * èŽ·å¾—æˆ‘çš„æŽ’å
   *
   * @param {func} callback å›žè°ƒå‡½æ•°
   */
  getMyRanking: function (callback) {
    parent.h5api.getMyRanking(callback);
  },

  /**
   * èŽ·å¾—æŽ’ååˆ—è¡¨
   *
   * @param {func} callback å›žè°ƒå‡½æ•°
   * @param {int} page é¡µç  ä»Ž1å¼€å§‹
   * @param {int} step æ¯é¡µæ¡æ•°
   */
  getRanking: function (callback, page, step) {
    parent.h5api.getRanking(callback, page, step);
  },

  /**
   * å±•ç¤ºæŽ’è¡Œæ¦œåˆ—è¡¨é¢æ¿
   */
  showRanking: function () {
    parent.h5api.showRanking();
  },

  /**
   * å±•ç¤ºæ–°ç‰ˆæŽ’è¡Œæ¦œé¢æ¿
   */
  showRankList: function () {
    parent.h5api.showRankList();
  },

  /**
   * èŽ·å¾—æˆ‘é™„è¿‘æŽ’ååˆ—è¡¨
   *
   * @param {func} callback å›žè°ƒå‡½æ•°
   * @param {int} step éœ€è¦æ¡æ•°
   */
  getNearRanking: function (callback, step) {
    parent.h5api.getNearRanking(callback, step);
  },

  /**
   * æ•æ„Ÿè¯æ£€æŸ¥
   *
   * @param {*} word
   * @param {*} callback
   */
  checkWord: function (word, callback) {
    parent.h5api.checkWord(word, callback);
  },
  /*
   * å±•ç¤ºæŽ¨èé¢æ¿
   */
  showRecommend: function () {
    parent.h5api.showRecommend();
  },
  /**
   * å­˜æ¡£
   * @param {*} params.more æ˜¯å¦æ˜¯å¤šæ¡£ true | false
   * @param {*} params.type æ“ä½œç±»åž‹ write | read
   * @param {*} params.title å­˜æ¡£æ ‡é¢˜ typeä¸ºwriteæ—¶å¿…å¡«
   * @param {*} params.data å­˜æ¡£æ•°æ® typeä¸ºwriteæ—¶å¿…å¡«
   * @param {*} params.callback å›žè°ƒå‡½æ•°
   */
  save: function (params) {
    parent.h5api.save(params);
  },
  /**
   * æ¸¸æˆæ¨¡å¼
   * @param {*} mode 1 æ¸¸å®¢ 2 è´¦æˆ·ï¼Œä¸ä¼ åˆ™æ‰“å¼€é¢æ¿
   */
  gameMode: function (mode) {
    parent.h5api.gameMode(mode);
  },
  /**
   * æ˜¾ç¤ºå¼•å¯¼é¢æ¿
   * @param {*} callback é¢†å–æŒ‰é’®å›žè°ƒ
   */
  showGuide: function (callback, index) {
    parent.h5api.showGuide(callback, index);
  },
  /**
   * æ£€æŸ¥APIæ˜¯å¦èƒ½ä½¿ç”¨
   */
  checkAPI: function () {
    if (parent === window) {
      console.error('ä¸æ”¯æŒæœ¬åœ°æµ‹è¯•ï¼Œè¯·å°½å¿«æäº¤æ¸¸æˆåˆ°åŽŸåˆ›å¹³å°é¢„è§ˆ');
    } else if (document.domain !== '4399.com') {
      try {
        document.domain = '4399.com';
      } catch (e) {
        if (
          document.domain.indexOf('4399.com') === -1 &&
          document.domain.indexOf('devh5.com') === -1 &&
          document.domain.indexOf('4399api.com') === -1
        ) {
          console.error(
            'å½“å‰åœ°å€å¹¶éžåœ¨4399åŸŸä¸‹ï¼Œå¯èƒ½å¯¼è‡´éƒ¨åˆ†APIæŽ¥å£äº§ç”Ÿå¼‚å¸¸ã€‚'
          );
        }
      }
    }
  }
};
window.h5api.checkAPI();
