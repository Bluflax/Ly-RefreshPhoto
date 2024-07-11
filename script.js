const imgBEFORE = document.getElementById('imgbefore');
const imgAFTER = document.getElementById('imgafter');
const imgMIMIC = document.getElementById('imgmimic');
const ripple = document.getElementById('ripple');
const ripple2 = document.getElementById('ripple2');
const bg = document.getElementById('background');
const container = document.getElementById('container');
const rev = document.getElementById('triggeranimation');
//const theurl = 'https://www.google.com/';
//const theurl = 'https://twitter.com';
//const theurl = 'https://zhere.next';
const theurl = 'https://app.simplenote.com/publish/dg4L3H';



async function fetchContent(url) {
    try {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const response = await fetch(proxyUrl + encodeURIComponent(url), {
            method: 'GET',
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const htmlString = data.contents;

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const textContent = doc.body.textContent || doc.body.innerText;

        

        if (textContent.includes('debug')) {
            
        }

        if (textContent.includes('BEFORE=') && textContent.includes('AFTER=')) {
            const regexBEFORE = /BEFORE=([\s\S]*?)@/;
            const regexAFTER = /AFTER=([\s\S]*?)@/;
            const srcBEFORE = textContent.match(regexBEFORE);
            const srcAFTER = textContent.match(regexAFTER);
            let srcBURL = '';
            let srcAURL = '';
            if (srcBEFORE && srcBEFORE[1]) {
            srcBURL = srcBEFORE[1].trim();
            }
            if (srcAFTER && srcAFTER[1]) {
            srcAURL = srcAFTER[1].trim();
            }
            imgAFTER.innerHTML = '<img src="' + srcAURL + '"/>';
            imgBEFORE.innerHTML = '<img src="' + srcBURL + '"/>';
            imgMIMIC.innerHTML = '<img src="' + srcAURL + '"/>';
            bg.innerHTML = '<img src="' + srcAURL + '"/>';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        clearTimeout(newuxtimeout);
    }
}

function jsmain() {

    newuxtimeout = setTimeout(() => {
        
    }, 1000);


    fetchContent(theurl);

}

function refreshUXAnimated () {
    imgMIMIC.classList.add('mimicready');
    imgMIMIC.classList.add('zinvisible');
    ripple.classList.add('rippleAnimated');
    ripple2.classList.add('rippleAnimated');
    //container.style.mixBlendMode = 'color-dodge';
    setTimeout(() => {
        imgAFTER.classList.add('shown');
        imgMIMIC.classList.add('mimicAnimated');
        //container.style.mixBlendMode = 'normal';
    }, 100);
    setTimeout(() => {
        ripple.classList.add('animatefadeout');
        ripple2.classList.add('animatefadeout');
        imgMIMIC.classList.remove('mimicAnimated');
        imgMIMIC.classList.remove('mimicready');
        rev.style.opacity = '1';
    }, 1000);
}

function reUXReverse () {
    ripple.classList = 'ripple';
    ripple2.classList = 'ripple'
    imgMIMIC.classList = 'card mimic';
    imgAFTER.classList = 'card after';
    rev.style.opacity = '0';
}


jsmain();

    setTimeout(() => {
        refreshUXAnimated();
        reUXReverse();
    }, 1000);

