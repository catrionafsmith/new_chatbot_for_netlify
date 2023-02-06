
$("#terminal").terminal(async function (command, terminal) {
    try {
        const prompt = `you are a helpful, knowledge sharing chatbot. I say: ${command}. You reply:`
        const keyresp = await fetch('/.netlify/functions/hello')
        .then(response => response.json()
        )
        //  console.log(keyresp['message']);

        const response = await fetch(
            `https://api.openai.com/v1/completions`,
            {
                body: JSON.stringify({"model": "text-davinci-003", "prompt": prompt, "temperature": 0.86, "max_tokens": 256}),
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization:`Bearer ` + keyresp['message'],
                },
                    }
        ).then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    terminal.echo(json.choices[0].text.trim());
                });
            }
        });
      
        console.log("Completed!");
    } catch (err) { console.error(`Error: ${err}`) }
},
    {
        greetings: 'Careers Chatbot v0.1: Type your question at the arrow, then press enter. Wait for up to 5 seconds for your reply!',
        name: 'gpt3_demo',
        height: 400,
        width: 800,
        prompt: '> '
    });

