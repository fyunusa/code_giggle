document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('ul.card-stacks').addEventListener('click', function() {
        this.classList.toggle('transition');
    });

    const gigglesContainer = document.getElementsByClassName('card-stacks')[0];
    const randomBtn = document.getElementById('random-btn');
    const frontendBtn = document.getElementById('frontend-btn');
    const backendBtn = document.getElementById('backend-btn');
    const methodsBtn = document.getElementById('methods-btn');
    const functionsBtn = document.getElementById('functions-btn');
    const awsBtn = document.getElementById('aws-btn');
    const azureBtn = document.getElementById('azure-btn');
    const googleBtn = document.getElementById('google-btn');
    const digitalOceanBtn = document.getElementById('digital-ocean-btn');

    
    let stack1, stack2, stack3, stack4;

    const createStacks = () => {
        stack1 = document.createElement('ul');
        stack1.classList.add('cards-down');

        stack2 = document.createElement('ul');
        stack2.classList.add('cards-down');

        stack3 = document.createElement('ul');
        stack3.classList.add('cards-down');

        stack4 = document.createElement('ul');
        stack4.classList.add('cards-down');

        document.getElementsByClassName('stack-1')[0].appendChild(stack1);
        document.getElementsByClassName('stack-2')[0].appendChild(stack2);
        document.getElementsByClassName('stack-3')[0].appendChild(stack3);
        document.getElementsByClassName('stack-4')[0].appendChild(stack4);
    };
    
    const loadGiggles = (category) => {
        fetch('giggles.json')
            .then(response => response.json())
            .then(data => {
            // data = gigglesData
            const giggles = category ? data[category] : data.random;
            console.log(giggles.length)
            
            // Ensure stacks are created if they don't exist
            if (!stack1 || !stack2 || !stack3 || !stack4) {
                createStacks();
            }

            // Clear existing content in each stack
            stack1.innerHTML = '';
            stack2.innerHTML = '';
            stack3.innerHTML = '';
            stack4.innerHTML = '';

            // Counter for each stack
            let stack1Counter = 1;
            let stack2Counter = 1;
            let stack3Counter = 1;
            let stack4Counter = 1;

            // Distribute giggles into stacks
            giggles.forEach((giggle, index) => {
                const stackIndex = index % 4; // Modulo to distribute among four stacks
                const card = document.createElement('li');
                card.classList.add('card');
                
                // Determine and add the appropriate card-N class
                let cardClass;
                if (stackIndex === 0) {
                    cardClass = `card-${stack1Counter}`;
                    stack1Counter++;
                } else if (stackIndex === 1) {
                    cardClass = `card-${stack2Counter}`;
                    stack2Counter++;
                } else if (stackIndex === 2) {
                    cardClass = `card-${stack3Counter}`;
                    stack3Counter++;
                } else if (stackIndex === 3) {
                    cardClass = `card-${stack4Counter}`;
                    stack4Counter++;
                }

                card.classList.add(cardClass);
                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');
                cardContent.innerHTML = `
                    <div class="content">
                        <h3>${giggle.question}</h3>
                        <p>${giggle.answer}</p>
                        <pre><code>${giggle.example}</code></pre>
                    </div>
                `;
            
                const scrollContainer = document.createElement('div');
                scrollContainer.classList.add('scroll-container');
                scrollContainer.appendChild(cardContent);

                card.appendChild(scrollContainer);

                // Append card to the appropriate stack
                if (stackIndex === 0) {
                    stack1.appendChild(card);
                } else if (stackIndex === 1) {
                    stack2.appendChild(card);
                } else if (stackIndex === 2) {
                    stack3.appendChild(card);
                } else if (stackIndex === 3) {
                    stack4.appendChild(card);
                }
            });    
        })
        .catch(error => console.error('Error loading giggles:', error));
    };

    randomBtn.addEventListener('click', () => loadGiggles('random'));
    backendBtn.addEventListener('click', () => loadGiggles('backend'));
    frontendBtn.addEventListener('click', () => loadGiggles('frontend'));
    methodsBtn.addEventListener('click', () => loadGiggles('methods'));
    functionsBtn.addEventListener('click', () => loadGiggles('functions'));
    awsBtn.addEventListener('click', () => loadGiggles('aws'));
    azureBtn.addEventListener('click', () => loadGiggles('azure'));
    googleBtn.addEventListener('click', () => loadGiggles('googleCloud'));
    digitalOceanBtn.addEventListener('click', () => loadGiggles('digitalOcean'));


    // Load random jokes by default
    loadGiggles('random');
});
