document.addEventListener('DOMContentLoaded', () => {
    const stopButton = document.getElementById('stopButton');
    const saveButton = document.getElementById('saveButton');
    const editButton = document.getElementById('edit');
    const deleteButton = document.getElementById('delete');
    const translateButton = document.getElementById('translate');

    if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition not supported');
        return;
    }

    const startButton = document.getElementById('startButton');
    const outputDiv = document.getElementById('output');
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
        const result = event.results[event.results.length - 1][0].transcript;
        outputDiv.textContent = result;
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

    stopButton.addEventListener('click', () => {
        recognition.stop();
        stopButton.disabled = true;
        startButton.disabled = false;
    });

    saveButton.addEventListener('click', () => {
        var fileName = "myfile.txt";
        var fileContent = result;
        var myFile = new Blob([fileContent], {type: 'text/plain'});
        alert('Saved')
    });

    editButton.addEventListener('click', () => {
        const savedText = localStorage.getItem('savedText');
        if (savedText) {
            textOutput.value = savedText;
        } else {
            alert('No saved text found');
        }
    });

    deleteButton.addEventListener('click', () => {
        localStorage.removeItem('savedText');
        textOutput.value = '';
        alert('Saved text deleted');
    });

    translateButton.addEventListener('click', () => {
        const text = textOutput.value;
        if (text) {
            // Replace with your translation API endpoint and key
            const apiUrl = 'https://api.example.com/translate';
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY' // replace with actual API key
                },
                body: JSON.stringify({ text, targetLanguage: 'es' }) // Example target language
            })
            .then(response => response.json())
            .then(data => {
                textOutput.value = data.translatedText;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            alert('No text to translate');
        }
    });
});