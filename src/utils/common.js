export const getTextFromDescription = (desc) => {
    let span= document.createElement('span');
    span.innerHTML= desc;
    let children= span.querySelectorAll('*');
    for(let i = 0 ; i < children.length ; i++) {
        if(children[i].textContent)
            children[i].textContent+= ' ';
        else
            children[i].innerText+= ' ';
    }

    let allText = [span.textContent || span.innerText].toString().replace(/ +/g,' ');
    if (allText.length > 50) {
        allText = allText.substring(0, 100) + "..."
    }

    return allText;
}