

document.addEventListener('DOMContentLoaded', async () => {
    const stopButton = document.getElementById('stopButton');
    const saveButton = document.getElementById('saveButton');
    const editTextButton = document.getElementById('editButton');

    if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition not supported');
        return;
    }

    const startButton = document.getElementById('startButton');
    const outputDiv = document.getElementById('output');
    const translateOP = document.getElementById('TranslateOP');
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

    recognition.interimResults = true;
    recognition.continuous = true;

    startButton.addEventListener('click', () => {
        recognition.start();
        startButton.disabled = true;
        stopButton.disabled = false;
        startButton.textContent = 'Recording...';
    });

    recognition.onresult = event => {
        const result = event.results[0][0].transcript;
        outputDiv.textContent = result;
        translateText(result);
    };

    recognition.onend = () => {
        startButton.disabled = false;
        startButton.textContent = 'Start Recording';
        
    }

    recognition.onerror = event => {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onnomatch = () => {
        console.log('No speech was recognized.');
    };

    stopButton.addEventListener('click', async () => {
        recognition.stop();
        stopButton.disabled = true;
        startButton.disabled = false;
    });

    saveButton.addEventListener('click', () => {
        const text = outputDiv.textContent;
        if (text) {
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8'});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'transcript.txt';
            link.click();
        }
    });

    editTextButton.addEventListener('click',()=>{
        const text=outputDiv.textContent;
        const newText=prompt('Edit Text:',text);
        if (newText !== null){
            outputDiv.textContent=newText;
            translateText(newText);
        }
    })

    async function translateText(text) {
        const url = 'https://ai-translate.p.rapidapi.com/translate';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'bea6e032a5mshf5f5e8afd84cc62p14a183jsn735063acf0f7',
                'x-rapidapi-host': 'ai-translate.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: {
                texts: [
                    'hello. world!',
                    '<b>hello. google!</b>',
                    '<i>hello. AI Translate!</i>',
                    '<notranslate class="notranslate">don\'t translate me!</notranslate>',
                    '<!DOCTYPE html><html><head><title>AI Translate</title></head><body>hello. AI Translate!</body></html>'
                ],
                tl: 'zh',
                sl: 'auto'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
});