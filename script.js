// // توابع برای کار با کوکی‌ها
// function setCookie(name, value, days) {
//     var expires = "";
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }

// function getCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//     }
//     return null;
// }

// function eraseCookie(name) {   
//     document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// }



// بارگذاری تنظیمات از کوکی‌ها در بارگذاری صفحه
// window.addEventListener('load', () => {
//     const savedBackground = getCookie('backgroundImage');
//     if (savedBackground) {
//         body.style.backgroundImage = `url(${savedBackground})`;
//     }
// });


document.getElementById('addNoteBtn').addEventListener('click', function () {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();

    if (noteText !== "") {
        const notesContainer = document.getElementById('notes');

        // Create note div
        const noteDiv = document.createElement('div');
        noteDiv.className = 'bg-white rounded-lg p-2 h-11 flex justify-end items-center mb-2 break-all ';

        // Create note text span
        const noteSpan = document.createElement('span');
        noteSpan.classList = 'font1 pl-20 break-all'
        noteSpan.textContent = noteText;

        // Create strike-through button
        const strikeButton = document.createElement('button');
        strikeButton.className = 'py-1 mx-2';
        const firstIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="48" viewBox="0 0 48 48"><path fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m4 24l5-5l10 10L39 9l5 5l-25 25z" clip-rule="evenodd"/></svg>';
        const secondIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="48" viewBox="0 0 24 24"><path fill="green" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>';
        strikeButton.innerHTML = firstIcon;

        strikeButton.addEventListener('click', function () {
            const isStruck = noteSpan.classList.toggle('line-through');
            if (isStruck) {
                strikeButton.innerHTML = secondIcon;
            } else {
                strikeButton.innerHTML = firstIcon;
            }
        });

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'py-1';
        deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="48" viewBox="0 0 24 24"><path fill="red" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>';
        deleteButton.addEventListener('click', function () {
            notesContainer.removeChild(noteDiv);
        });

        noteDiv.appendChild(noteSpan);
        noteDiv.appendChild(strikeButton); // Add strike-through button
        noteDiv.appendChild(deleteButton);

        // Add new note to the top of the list
        notesContainer.insertBefore(noteDiv, notesContainer.firstChild);

        // Clear the input field
        noteInput.value = '';
    }
});

let isBlurred = false;



document.getElementById('toggleBlur').addEventListener('click', function () {
    const notesContainer = document.getElementById('notes');
    isBlurred = !isBlurred;

    if (isBlurred) {
        notesContainer.classList.add('blur');
    } else {
        notesContainer.classList.remove('blur');
    }
});


// جستجو در گوگل
document.getElementById('searchBtn').addEventListener('click', function () {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query !== "") {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
});

// تابع برای خواندن RSS و نمایش اخبار
async function fetchRSS() {
    try {
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.varzesh3.com/rss/all'));
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'application/xml');

        const items = xmlDoc.getElementsByTagName('item');
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ''; // Clear previous news

        // مشخص کردن تعداد اخبار که می‌خواهیم نمایش دهیم
        const maxItemsToShow = 9;

        for (let i = 0; i < Math.min(items.length, maxItemsToShow); i++) {
            const title = items[i].getElementsByTagName('title')[0].textContent;
            const link = items[i].getElementsByTagName('link')[0].textContent;
            const pubDate = items[i].getElementsByTagName('pubDate')[0].textContent;

            const newsCard = document.createElement('div');
            newsCard.className = 'bg-white h-25 hover:text-blue-700 cursor-pointer  duration-300 flex flex-col fontsmall hover:shadow-lg hover:translate-y-2 items-start justify-between p-4 rounded-lg shadow-md transition-shadow translate'; // مربعی شکل
            newsCard.style = 'height: 130px;'
            newsCard.innerHTML = `
                <span class="font-bold text-xs leading-6"><a href="${link}" target="_blank">${title}</a>   </span>
               <span style="font-size: 10px; align-self: flex-end;" >  ${pubDate} </span>
            `;
            newsContainer.appendChild(newsCard);
        }
    } catch (error) {
        console.error('Error fetching the RSS feed:', error);
    }
}

const sportsTab = document.getElementById('sports-tab');
const topNewsTab = document.getElementById('top-news-tab');
const technologyTab = document.getElementById('technology-tab'); // دریافت تب جدید

async function fetchRSS(url, container) {
    try {
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(url));
        const data = await response.json();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'application/xml');
        const items = xmlDoc.getElementsByTagName('item');

        container.innerHTML = ''; // Clear previous news

        for (let i = 0; i < Math.min(items.length, 9); i++) {
            const title = items[i].getElementsByTagName('title')[0].textContent;
            const link = items[i].getElementsByTagName('link')[0].textContent;
            const pubDate = items[i].getElementsByTagName('pubDate')[0].textContent;

            const newsCard = document.createElement('div');
            newsCard.className = 'bg-white h-25 hover:text-blue-700 cursor-pointer duration-300 flex flex-col fontsmall hover:shadow-lg hover:translate-y-2 items-start justify-between p-4 rounded-lg shadow-md transition-shadow translate';
            newsCard.style = 'height: 130px;';
            newsCard.innerHTML = `
                        <span class="font-bold text-xs leading-6"><a href="${link}" target="_blank">${title}</a></span>
                        <span id="date-output" style="font-size: 10px; align-self: flex-end;">${convertToShamsi(pubDate)}</span>
                    `;
            container.appendChild(newsCard);
        }
    } catch (error) {
        console.error('Error fetching the RSS feed:', error);
    }
}

function showNews(type) {
    const newsContainer = document.getElementById('news-container');

    if (type === 'sports') {
        fetchRSS('https://www.varzesh3.com/rss/all', newsContainer);
        sportsTab.classList.add('tab-active');
        sportsTab.classList.remove('bg-gray-200');
        topNewsTab.classList.add('bg-gray-200');
        topNewsTab.classList.remove('tab-active');
        technologyTab.classList.add('bg-gray-200');
        technologyTab.classList.remove('tab-active');
    } else if (type === 'top') {
        fetchRSS('https://feeds.bbci.co.uk/persian/rss.xml  ', newsContainer);
        topNewsTab.classList.add('tab-active');
        topNewsTab.classList.remove('bg-gray-200');
        sportsTab.classList.add('bg-gray-200');
        sportsTab.classList.remove('tab-active');
        technologyTab.classList.add('bg-gray-200');
        technologyTab.classList.remove('tab-active');
    } else if (type === 'technology') {
        fetchRSS('https://www.tasnimnews.com/fa/rss/feed/0/7/6/%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%D9%87%D8%A7', newsContainer);
        technologyTab.classList.add('tab-active');
        technologyTab.classList.remove('bg-gray-200');
        sportsTab.classList.add('bg-gray-200');
        sportsTab.classList.remove('tab-active');
        topNewsTab.classList.add('bg-gray-200');
        topNewsTab.classList.remove('tab-active');
    }
}

// بارگذاری اخبار ورزشی به طور پیشفرض
fetchRSS('https://www.varzesh3.com/rss/all', document.getElementById('news-container'));

// متصل کردن رویدادها به دکمه‌ها
sportsTab.addEventListener('click', () => showNews('sports')); https://www.isna.ir/rss
topNewsTab.addEventListener('click', () => showNews('top'));
technologyTab.addEventListener('click', () => showNews('technology')); // متصل کردن رویداد به تب جدید

const cityName = document.getElementById("cityName");
const timeDisplay = document.getElementById("timeDisplay");
const secondsDisplay = document.getElementById("secondsDisplay");
const cityList = document.getElementById("cityList");

let currentCity = "تهران"; // برای نگه‌داری شهر فعلی

cityName.addEventListener("click", function () {
    cityList.style.display = cityList.style.display === "none" || cityList.style.display === "" ? "block" : "none";
});

cityList.addEventListener("click", function (event) {
    if (event.target.dataset.city) {
        currentCity = event.target.dataset.city; // آپدیت شهر فعلی
        cityName.innerText = currentCity;
        cityList.style.display = "none";
        updateClock(currentCity);
    }
});

// Function to update the clock
function updateClock(city) {
    // Clear any existing intervals before setting a new one
    clearInterval(window.clockInterval);

    // Set up a new interval for updating the clock every second
    window.clockInterval = setInterval(() => {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const localTime = new Date(utc + (3600000 * timezoneOffset[city]));
        timeDisplay.innerText = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // 24 ساعته
        secondsDisplay.innerText = `${localTime.getSeconds()}s`;
    }, 1000);
}

const timezoneOffset = {
    "تهران": 3.5,
    "نیویورک": -4,
    "لندن": 1,
    "توکیو": 9,
    "دبی": 4,
    "پاریس": 2,
    "برلین": 2,
    "سیدنی": 11
};

// Initialize clock on page load
updateClock(currentCity);


document.getElementById('searchBtn').addEventListener('click', function () {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query !== "") {
        // search on google
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
});

// حذف عنصر tgju-copyright 0.5 ثانیه بعد از بارگذاری صفحه
window.addEventListener('load', () => {
    setTimeout(() => {
        const copyrightElement = document.querySelector('.tgju-copyright');
        if (copyrightElement) {
            copyrightElement.remove();
        }
    }, 700);  // 500 میلی‌ثانیه = نیم ثانیه
});
// حذف عنصر tgju-copyright 0.5 ثانیه بعد از بارگذاری صفحه
window.addEventListener('load', () => {
    setTimeout(() => {
        const copyrightElement = document.querySelector('.tgju-copyright-fix');
        if (copyrightElement) {
            copyrightElement.remove();
        }
    }, 500);  // 500 میلی‌ثانیه = نیم ثانیه
});

window.addEventListener('load', () => {
    setTimeout(() => {
        const copyrightElement = document.querySelector('.tgju-copyright');
        if (copyrightElement) {
            copyrightElement.remove();
        }
    }, 700);  // 500 میلی‌ثانیه = نیم ثانیه
});
// حذف عنصر tgju-copyright 0.5 ثانیه بعد از بارگذاری صفحه
window.addEventListener('load', () => {
    setTimeout(() => {
        const copyrightElement = document.querySelector('.tgju-copyright-fix');
        if (copyrightElement) {
            copyrightElement.remove();
        }
    }, 500);  // 500 میلی‌ثانیه = نیم ثانیه
});
window.addEventListener('load', () => {
    setTimeout(() => {
        const copyrightElement = document.querySelector('.tgju-copyright');
        if (copyrightElement) {
            copyrightElement.remove();
        }
    }, 700);  // 500 میلی‌ثانیه = نیم ثانیه
});




// تبدیل تاریخ میلادی به شمسی
function convertToShamsi(dateString) {
    const gDate = new Date(dateString);
    const gYear = gDate.getUTCFullYear();
    const gMonth = gDate.getUTCMonth() + 1; // ماه‌ها از 0 شروع می‌شوند
    const gDay = gDate.getUTCDate();

    // محاسبه سال شمسی
    let jYear = gYear - 621;
    let jMonth = 0;
    let jDay = 0;

    // در سال‌های کبیسه (گلابی)
    const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const gLeapYear = (gYear) => (gYear % 4 === 0 && gYear % 100 !== 0) || (gYear % 400 === 0);
    if (gLeapYear(gYear)) gDaysInMonth[1] = 29;

    const gDayOfYear = gDaysInMonth.slice(0, gMonth - 1).reduce((a, b) => a + b, 0) + gDay;

    // محاسبه روز و ماه شمسی
    if (gDayOfYear > 79) {
        const jy = jYear + 1;
        const daysInJYear = (jy % 4 === 0) ? 366 : 365;
        if (gDayOfYear > (daysInJYear - 79)) {
            jMonth = Math.floor((gDayOfYear - (daysInJYear - 79)) / 30) + 1;
            jDay = (gDayOfYear - (daysInJYear - 79)) % 30 + 1;
        } else {
            jMonth = Math.floor((gDayOfYear - 58) / 30) + 1;
            jDay = (gDayOfYear - 58) % 30 + 1;
        }
    } else {
        jMonth = Math.floor((gDayOfYear - 10) / 30) + 1;
        jDay = (gDayOfYear - 10) % 30 + 1;
    }

    return ` ${gDate.getUTCHours() + 3}:${gDate.getUTCMinutes()} ${jYear}/${jMonth}/${jDay}`;
}

const settingsModal = document.getElementById('settingsModal');
const body = document.body;
function toggleSettings() {
    settingsModal.style.display = settingsModal.style.display === 'flex' ? 'none' : 'flex';
    // body.classList.toggle('blur'); // نمایش یا پنهان کردن بلور
}
function closeModal() {
    settingsModal.style.display = 'none';
    body.classList.remove('blur'); // برداشتن افکت بلور
}
function changeBackground(imageUrl) {
    body.style.backgroundImage = `url(${imageUrl})`;
    // setCookie('backgroundImage', imageUrl, 30); // ذخیره در کوکی برای 30 روز
    localStorage.setItem("backgroundImage", imageUrl);
    // var x = getCookie('backgroundImage');
    // console.log('cookie : ', x)
    // if (x) {
    //     console.log('cookie : ', x)            
    // }
    closeModal();
}
function setBackgroundFromFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            body.style.backgroundImage = `url(${e.target.result})`;
        }
        reader.readAsDataURL(file);
    }
}
// بارگذاری تنظیمات از کوکی‌ها در بارگذاری صفحه
window.addEventListener('load', () => {
    // const savedBackground = getCookie('backgroundImage');
    const savedBackground = localStorage.getItem("backgroundImage");

    if (savedBackground) {
        body.style.backgroundImage = `url(${savedBackground})`;
    }
});
