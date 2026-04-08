const navHTML = `
    <nav id="nav">
        <ul>
            <li>
                <a href="./../Intro_HTML_CSS/index.html">Introduction to HTML and CSS </a>
            </li>
            <li>
                <a href="./../Elements_Tags/index.html">Elements and Tags</a>
            </li>
            <li>
                <a href="./../HTML_Boilerplate/index.html">HTML Boiler Plate</a>
            </li>
            <li>
                <a href="./../Working_with_Text/index.html">Working with Text</a>
            </li>
            <li>
                <a href="./../Lists/index.html">Lists</a>
            </li>
            <li>
                <a href="./../Links_Images/index.html">Links and Images</a>
            </li>
            <li>
                <a href="./../Commit_Messages/index.html">Commit Messages</a>
            </li>
            <li>
                <a href="./../Project_Recipies/index.html">Project: Recipies</a>
            </li>
        </ul>
    </nav>
    `;

document.body.insertAdjacentHTML("afterbegin", navHTML);

const navLinkList = document.querySelectorAll('nav a');
const currentPath = window.location.pathname.split('/');
const currentPathFile = currentPath[currentPath.length - 2];
document.querySelector('h1').innerText = currentPathFile;
navLinkList.forEach(element => {
    const navPath = element.getAttribute('href').split('/');
    const navPathFile = navPath[navPath.length - 2];
    if(navPathFile === currentPathFile){
        element.classList.add('active');
        element.addEventListener('click', function(event){event.preventDefault();})     
    }
});
