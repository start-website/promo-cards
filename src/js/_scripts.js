"use strict";
$(document).ready(function () {
    function StartPromocards(props) {
        this.promocards = $(props.cardsSelector);
        this.cardsSettings = props.cardsSettings;
        this.cardsViews = parseInt(props.cardsViews, 10);
        this.cardsSize = props.cardsSize;
        this.cardsFormat = props.cardsFormat;
        this.names = props.names;

        this.addCards = function (supportWebp) {
            var tagPromoCardsContainer = document.createElement('div');
            tagPromoCardsContainer.className = 'start-promocards__container';
            this.promocards.prepend(tagPromoCardsContainer);

            var tagPromocardsContent = document.createElement('div');
            tagPromocardsContent.className = 'start-promocards__content';
            tagPromoCardsContainer.appendChild(tagPromocardsContent);

            switch (this.cardsFormat) {
                case '1':
                    createCards.call(this, 1, this.cardsFormat);
                    break;
                case '2':
                    createCards.call(this, 2, this.cardsFormat);
                    break;
                case '3':
                    createCards.call(this, 3, this.cardsFormat);
                    break;
                case '4':
                    createCards.call(this, 4, this.cardsFormat);
                    break;
                case '5':
                    createCards.call(this, 5, this.cardsFormat);
                    break;
                case '1-3/2':
                    createCards.call(this, 2, this.cardsFormat);
                    break;
                case '2/1-3':
                    createCards.call(this, 2, this.cardsFormat);
                    break;
                default:
                    console.log(new Error('The "cardsFormat" parameter is not transmitted correctly'));
                    break;

            }
            function createCards(column, columnWidth) {
                for (var cardsCount = 0; cardsCount < column; cardsCount++) {
                    var tagPromocardsCardWrap = document.createElement('div');
                    tagPromocardsCardWrap.className = 'start-promocards__card-wrap';
                    tagPromocardsCardWrap.setAttribute('data-card-form', this.cardsSize);
                    tagPromocardsCardWrap.setAttribute('data-card-column', columnWidth);
                    tagPromocardsCardWrap.setAttribute('data-card-view', this.cardsViews);
                    tagPromocardsContent.appendChild(tagPromocardsCardWrap);

                    var tagPromocardsCard = document.createElement('a');
                    tagPromocardsCard.className = 'start-promocards__card';
                    tagPromocardsCard.setAttribute('href', this.cardsSettings[cardsCount].link);
                    tagPromocardsCardWrap.appendChild(tagPromocardsCard);

                    var tagPromocardsImage = document.createElement('div');
                    tagPromocardsImage.className = 'start-promocards__image';
                    if (supportWebp && this.cardsSettings[cardsCount].backgroundImageWebp) {
                        tagPromocardsImage.style.backgroundImage = 'url("' + this.cardsSettings[cardsCount].backgroundImageWebp + '")';
                    } else {
                        tagPromocardsImage.style.backgroundImage = 'url("' + this.cardsSettings[cardsCount].backgroundImageJpg + '")';
                    }
                    tagPromocardsCard.appendChild(tagPromocardsImage);

                    var tagPromocardsInfo = document.createElement('div');
                    tagPromocardsInfo.className = 'start-promocards__info';
                    tagPromocardsCard.appendChild(tagPromocardsInfo);

                    if (this.cardsSettings[cardsCount].title) {
                        var tagPromocardsCardTitle = document.createElement('div');
                        tagPromocardsCardTitle.className = 'start-promocards__info_title';
                        tagPromocardsCardTitle.innerHTML = this.cardsSettings[cardsCount].title;
                        tagPromocardsInfo.appendChild(tagPromocardsCardTitle);
                    }

                    if (this.cardsSettings[cardsCount].description) {
                        var tagPromocardsCardDescription = document.createElement('div');
                        tagPromocardsCardDescription.className = 'start-promocards__info_description';
                        tagPromocardsCardDescription.innerHTML = this.cardsSettings[cardsCount].description;
                        tagPromocardsInfo.appendChild(tagPromocardsCardDescription);
                    }

                    if (this.cardsSettings[cardsCount].timer) {
                        function setTimer() {
                            var tagPromocardsCardTimer = document.createElement('div');
                            tagPromocardsCardTimer.className = 'start-promocards__timer';
                            tagPromocardsCardTimer.innerHTML =
                                '<span class="start-promocards__timer_days">' + '00' + '</span>' +
                                '<span class="start-promocards__timer_hours">' + '00' + '</span>' +
                                '<span class="start-promocards__timer_minutes">' + '00' + '</span>' +
                                '<span class="start-promocards__timer_seconds">' + '00';
                            tagPromocardsInfo.appendChild(tagPromocardsCardTimer);

                            var countDowndate = new Date(this.cardsSettings[cardsCount].timer).getTime();
                            var countDownFunction = setInterval(function () {
                                var now = new Date().getTime();
                                var distance = countDowndate - now;
                                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                                var htmlDays = '<span class="start-promocards__timer_days">' + days + '</span>';
                                var htmlHours = '<span class="start-promocards__timer_hours">' + hours + '</span>';
                                var htmlMinutes = '<span class="start-promocards__timer_minutes">' + minutes + '</span>';
                                var htmlSeconds = '<span class="start-promocards__timer_seconds">' + seconds;

                                if (days < 10) htmlDays = '<span class="start-promocards__timer_days">' + '0' + days + '</span>';
                                if (hours < 10) htmlHours = '<span class="start-promocards__timer_hours">' + '0' + hours + '</span>';
                                if (minutes < 10) htmlMinutes = '<span class="start-promocards__timer_minutes">' + '0' + minutes + '</span>';
                                if (seconds < 10) htmlSeconds = '<span class="start-promocards__timer_seconds">' + '0' + seconds;

                                tagPromocardsCardTimer.innerHTML = htmlDays + htmlHours + htmlMinutes + htmlSeconds;

                                if (distance < 0) {
                                    clearInterval(countDownFunction);
                                    tagPromocardsCardTimer.innerHTML =
                                        '<span class="start-promocards__timer_days">' + '00' + '</span>' +
                                        '<span class="start-promocards__timer_hours">' + '00' + '</span>' +
                                        '<span class="start-promocards__timer_minutes">' + '00' + '</span>' +
                                        '<span class="start-promocards__timer_seconds">' + '00';
                                }
                            }, 1000);
                        }
                        setTimer.call(this);
                    }

                    if (this.cardsSettings[cardsCount].buttonText) {
                        var tagPromocardsCardButton = document.createElement('a');
                        tagPromocardsCardButton.className = 'start-promocards__info_button';
                        tagPromocardsCardButton.href = this.cardsSettings[cardsCount].link;
                        tagPromocardsCardButton.innerHTML = this.cardsSettings[cardsCount].buttonText;
                        tagPromocardsInfo.appendChild(tagPromocardsCardButton);

                        if (this.cardsSettings[cardsCount].timer) {
                            tagPromocardsCardButton.style.marginTop = '20px';
                        }
                    }

                }
            }

        }

        this.changeToWebp = function () {
            function checkWebp(feature, callback) {
                var kTestImages = {
                    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
                    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
                    alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
                    animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
                };
                var img = new Image();

                img.onload = function () {
                    var result = img.width > 0 && img.height > 0;
                    callback(feature, result);
                };

                img.onerror = function () {
                    callback(feature, false);
                };

                img.src = "data:image/webp;base64," + kTestImages[feature];
            }

            checkWebp('lossy', (feature, result) => {
                this.addCards(result);
            })
        }

        if (this.promocards && this.cardsSettings) {
            this.changeToWebp();
        }
    }




    var webasystStartPromocards1 = new StartPromocards({
        cardsSelector: '.start-promocards1',
        cardsFormat: '3', // 1, 2, 3, 4, 5, 1-3/2, 2/1-3
        cardsViews: 3,
        cardsSize: 'md',
        cardsSettings: [
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/car-dashboard-2667434_640.jpg',
                backgroundImageWebp: '',
            },
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/ferrari-360-2918130_640.jpg',
                backgroundImageWebp: '',
            },
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: '',
                link: '#mylink',
                backgroundImageJpg: 'images/speed-1249610_640.jpg',
                backgroundImageWebp: '',
            },
        ]
    });

    var webasystStartPromocards1 = new StartPromocards({
        cardsSelector: '.start-promocards1',
        cardsFormat: '2', // 1, 2, 3, 4, 5, 1-3/2, 2/1-3
        cardsViews: 3,
        cardsSize: 'md',
        cardsSettings: [
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/car-5548242_640.jpg',
                backgroundImageWebp: '',
                column: 2,
            },
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/buildings-1851246_640.jpg',
                backgroundImageWebp: '',
                column: 3,
                timer: '2021-11-05 15:00'
            },
        ]
    });

    var webasystStartPromocards2 = new StartPromocards({
        cardsSelector: '.start-promocards2',
        cardsFormat: '5', // 1, 2, 3, 4, 5, 1-3/2, 2/1-3
        cardsViews: 2,
        cardsSize: 'md',
        cardsSettings: [
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/action-1839225_640.jpg',
                backgroundImageWebp: '',
                timer: '2021-12-04 23:55',
            },
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/wheel-5583386_640.jpg',
                backgroundImageWebp: '',
                timer: '2021-12-04 23:55',
            },
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/adventure-3113376_640.jpg',
                backgroundImageWebp: '',
                timer: '2020-12-04 23:55',
            },
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/sport-539472_640.jpg',
                backgroundImageWebp: '',
                column: 3,
                //timer: 'Oct 25, 2020 00:00:00',
            },
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/mountain-bike-5567847_640.jpg',
                backgroundImageWebp: '',
                column: 3,
                //timer: 'Oct 25, 2020 00:00:00',
            },
        ]
    });

    var webasystStartPromocards3 = new StartPromocards({
        cardsSelector: '.start-promocards3',
        cardsFormat: '2/1-3', // 1, 2, 3, 4, 5, 1-3/2, 2/1-3
        cardsViews: 1,
        cardsSize: 'md',
        cardsSettings: [
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/hiker-1149877_640.jpg',
                backgroundImageWebp: '',
                column: 2,
            },
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/night-839807_640.jpg',
                backgroundImageWebp: '',
                column: 3,
                timer: 'Oct 25, 2020 00:00:00',
            },
        ]
    });

    var webasystStartPromocards3 = new StartPromocards({
        cardsSelector: '.start-promocards3',
        cardsFormat: '1-3/2', // 1, 2, 3, 4, 5, 1-3/2, 2/1-3
        cardsViews: 1,
        cardsSize: 'md',
        cardsSettings: [
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/hikers-1147796_640.jpg',
                backgroundImageWebp: '',
                column: 2,
            },
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/tent-548022_640.jpg',
                backgroundImageWebp: '',
                column: 3,
                timer: 'Oct 25, 2020 00:00:00',
            },
        ]
    });

    var webasystStartPromocards4 = new StartPromocards({
        cardsSelector: '.start-promocards4',
        cardsFormat: '2', // 1, 2, 3, 4, 5, 1-3/2, 2/1-3
        cardsViews: 4,
        cardsSize: 'lg',
        cardsSettings: [
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/apple-256261_640.jpg',
                backgroundImageWebp: '',
                column: 2,
            },
            {
                title: 'Title card',
                description: 'Card description here!',
                buttonText: 'Buy',
                link: '#mylink',
                backgroundImageJpg: 'images/office-583839_640.jpg',
                backgroundImageWebp: '',
                column: 3,
                timer: 'Oct 25, 2020 00:00:00',
            },

        ]
    });

});