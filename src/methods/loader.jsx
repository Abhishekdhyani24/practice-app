const loader = (p) => {
    const loaderElement = document.getElementById('loader');
    if (loaderElement) {
        if (p) {
            loaderElement.classList.remove('!hidden');
        } else {
            loaderElement.classList.add('!hidden');
        }
    }
}

export default loader;
