const imgBEFORE = document.getElementById('imgbefore');
const imgAFTER = document.getElementById('imgafter');
const imgMIMIC = document.getElementById('imgmimic');
const ripple = document.getElementById('ripple');
const bg = document.getElementById('background');
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
    ripple.classList.add('rippleAnimated');
    imgAFTER.classList.add('shown');
    setTimeout(() => {
        imgMIMIC.classList.add('mimicAnimated');
    }, 150);
    setTimeout(() => {
        ripple.classList.add('animatefadeout');
        imgMIMIC.classList.remove('mimicAnimated');
        imgMIMIC.classList.remove('mimicready');
    }, 1000);
    setTimeout(() => {
        ripple.classList.remove('rippleAnimated');
        ripple.classList.remove('animatefadeout');
    }, 1800);
}


jsmain();
