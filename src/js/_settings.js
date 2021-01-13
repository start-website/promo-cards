var app = new Vue({
    delimiters: ['%%', '%%'],
    el: '.start',
    data: {
        groupCount: +document.querySelector('#group-count').value,
        pluginUrl: document.querySelector('#plugin_url').value,
        groupSettings: [],
        cardCount: 5,
    },
    methods: {
        selectView(e, indexGroup) {
            let menuLi = e.target.parentElement;
            if (e.target.tagName === 'LI') menuLi = e.target;
  
            const menuLiSublings = menuLi.parentElement.children;
  
            for (let i = 0; i < menuLiSublings.length; i++) {
                menuLiSublings[i].className = '';
            }
            this.groupSettings[indexGroup].view = menuLi.dataset.value;
            menuLi.className = 'menu-selection-active';
        },
        selectSize(e, indexGroup) {
            let menuLi = e.target.parentElement;
            if (e.target.tagName === 'LI') menuLi = e.target;
  
            const menuLiSublings = menuLi.parentElement.children;
  
            for (let i = 0; i < menuLiSublings.length; i++) {
                menuLiSublings[i].className = '';
            }
            this.groupSettings[indexGroup].size = menuLi.dataset.value;
            menuLi.className = 'menu-selection-active';
        },
        selectFormat(e, indexGroup) {
            let menuLi = e.target.parentElement;
            if (e.target.tagName === 'LI') menuLi = e.target;
  
            this.groupSettings[indexGroup].format = menuLi.dataset.value;
  
            switch (menuLi.dataset.value) {
                case '1':
                    this.groupSettings[indexGroup].cardsShow = 1;
                    break;
                case '2':
                    this.groupSettings[indexGroup].cardsShow = 2;
                    break;
                case '3':
                    this.groupSettings[indexGroup].cardsShow = 3;
                    break;
                case '4':
                    this.groupSettings[indexGroup].cardsShow = 4;
                    break;
                case '5':
                    this.groupSettings[indexGroup].cardsShow = 5;
                    break;
                case '1-3/2':
                    this.groupSettings[indexGroup].cardsShow = 2;
                    break;
                case '2/1-3':
                    this.groupSettings[indexGroup].cardsShow = 2;
                    break;
            }
        },
        selectTab(e, indexGroup, cardNumber) {
            let tabButton = e.target.parentElement;
            if (e.target.tagName === 'LI') tabButton = e.target;
  
            this.groupSettings[indexGroup].tabActive = cardNumber;
        },
        addGroup() {
            this.groupCount++;
            this.groupSettings.push({
                view: 1,
                size: 'xs',
                format: '5',
                column: 5,
                tabActive: 1,
                cardsShow: 5,
                cardsInfo: []
            })
  
            for (let i = 0; i < this.cardCount; i++) {
                this.groupSettings[this.groupSettings.length - 1].cardsInfo.push({
                    title: '',
                    description: '',
                    buttonText: '',
                    buttonClass: '',
                    link: '#',
                    backgroundImageJpg: '',
                    backgroundImageWebp: '',
                    timerDate: '',
                    timerTime: '',
                })
            }
        },
        delGroup() {
            if (this.groupCount > 1) {
                this.groupCount--;
                this.groupSettings.pop();
            }
        },
        checkImage(e, type) {
            const input = e.target;
            const inputBlockChilds = input.parentElement.parentElement.children;
            let hintError;
            let regex;
  
            switch (type) {
                case 'jpg':
                    regex = /(png|jpe?g|gif|svg)$/i;
                    break;
                case 'webp':
                    regex = /webp$/i;
                    break;
            }
  
            for (let i = 0; i < inputBlockChilds.length; i++) {
                const elem = inputBlockChilds[i];
  
                if (elem.className && elem.className.match(/hint-error/gi)) {
                    hintError = elem;
                }
            }
  
            if (!regex.test(input.value)) {
                hintError.style.display = 'block';
            } else {
                hintError.style.display = '';
            }
        },
        reestablishNameFileWebp(e, numberGroup, cardNumber) {
            e.target.name = `shop_start_promocards[group_${numberGroup}_card_background_image_webp_${cardNumber}]`;
  
            const inputTextWebp = document.querySelector(`#group_${numberGroup}_input_text_webp_${cardNumber}`);
            inputTextWebp.name = '';
            inputTextWebp.value = '';
        },
        reestablishNameFileJpg(e, numberGroup, cardNumber) {
            e.target.name = `shop_start_promocards[group_${numberGroup}_card_background_image_jpg_${cardNumber}]`;
  
            const inputTextJpg = document.querySelector(`#group_${numberGroup}_input_text_jpg_${cardNumber}`);
            inputTextJpg.name = '';
            inputTextJpg.value = '';
        },
        delImageJpg(e, indexGroup, cardNumber) {
            const inputFileJpg = document.querySelector(`#group_${indexGroup + 1}_input_file_jpg_${cardNumber}`);
            const inputTextJpg = document.querySelector(`#group_${indexGroup + 1}_input_text_jpg_${cardNumber}`);
  
            const inputFileJpgNameDefault = inputFileJpg.name;
            const inputTextJpgNameDefault = inputTextJpg.name;
  
            this.groupSettings[indexGroup].cardsInfo[cardNumber - 1].backgroundImageJpg = false;
            inputTextJpg.name = inputFileJpgNameDefault;
            inputFileJpg.name = inputTextJpgNameDefault;
            inputTextJpg.value = '';
        },
        delImageWebp(e, indexGroup, cardNumber) {
            const inputFileWebp = document.querySelector(`#group_${indexGroup + 1}_input_file_webp_${cardNumber}`);
            const inputTextWebp = document.querySelector(`#group_${indexGroup + 1}_input_text_webp_${cardNumber}`);
  
            const inputFileWebpNameDefault = inputFileWebp.name;
            const inputTextWebpNameDefault = inputTextWebp.name;
  
            this.groupSettings[indexGroup].cardsInfo[cardNumber - 1].backgroundImageWebp = false;
            inputTextWebp.name = inputFileWebpNameDefault;
            inputFileWebp.name = inputTextWebpNameDefault;
            inputTextWebp.value = '';
  
        },
        delDate(e, indexGroup, cardNumber) {
            this.groupSettings[indexGroup].cardsInfo[cardNumber - 1].timerDate = '';
            this.groupSettings[indexGroup].cardsInfo[cardNumber - 1].timerTime = '';
        },
        pageReload() {
            location.href = location.href;
        }
    },
    created: function () {
        let groupNumber = 0;
        for (let i = 0; i < this.groupCount; i++) {
            groupNumber++;
  
            const cardsFormat = document.querySelector(`#format_group_${groupNumber}`).value;
            let cardsShow = 1;
  
            switch (cardsFormat) {
                case '2':
                    cardsShow = 2;
                    break;
                case '3':
                    cardsShow = 3;
                    break;
                case '4':
                    cardsShow = 4;
                    break;
                case '5':
                    cardsShow = 5;
                    break;
                case '1-3/2':
                    cardsShow = 2;
                    break;
                case '2/1-3':
                    cardsShow = 2;
                    break;
            }
  
            this.groupSettings.push({
                view: +document.querySelector(`#views_group_${groupNumber}`).value,
                size: document.querySelector(`#size_group_${groupNumber}`).value,
                format: cardsFormat,
                tabActive: 1,
                cardsShow: cardsShow,
                cardsInfo: []
            })
  
            let cardNumber = 0;
            for (let j = 0; j < this.cardCount; j++) {
                cardNumber++;
                this.groupSettings[i].cardsInfo.push(
                    {
                        title: document.querySelector(`#group_${groupNumber}_card_title_${cardNumber}`).value,
                        description: document.querySelector(`#group_${groupNumber}_card_description_${cardNumber}`).value,
                        buttonText: document.querySelector(`#group_${groupNumber}_card_button_text_${cardNumber}`).value,
                        buttonClass: document.querySelector(`#group_${groupNumber}_card_button_class_${cardNumber}`).value,
                        link: document.querySelector(`#group_${groupNumber}_card_link_${cardNumber}`).value,
                        backgroundImageJpg: document.querySelector(`#group_${groupNumber}_card_background_image_jpg_${cardNumber}`).value,
                        backgroundImageWebp: document.querySelector(`#group_${groupNumber}_card_background_image_webp_${cardNumber}`).value,
                        timerDate: document.querySelector(`#group_${groupNumber}_card_timer_date_${cardNumber}`).value,
                        timerTime: document.querySelector(`#group_${groupNumber}_card_timer_time_${cardNumber}`).value,
                    }
                )
            }
        }
    }
  })