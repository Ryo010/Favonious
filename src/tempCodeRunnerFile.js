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