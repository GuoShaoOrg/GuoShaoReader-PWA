export const isValidMobilePhone = (phone) => {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone);
}

export const isValidateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const getTextFromDescription = (desc) => {
  let span = document.createElement('span');
  span.innerHTML = desc;
  let children = span.querySelectorAll('*');
  for (let i = 0; i < children.length; i++) {
    if (children[i].textContent)
      children[i].textContent += ' ';
    else
      children[i].innerText += ' ';
  }

  let allText = [span.textContent || span.innerText].toString().replace(/ +/g, ' ');
  if (allText.length > 50) {
    allText = allText.substring(0, 100) + "..."
  }

  return allText;
}