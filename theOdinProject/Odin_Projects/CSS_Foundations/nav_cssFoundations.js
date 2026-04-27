fetch('/theOdinProject/Odin_Projects/CSS_Foundations/nav_cssFoundations.html')
    .then( res => {
        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
    })
    .then(data => {
        document.getElementById('nav').innerHTML = data;
    })
    .catch(error => console.error('Error loading navigation HTML: ', error));

