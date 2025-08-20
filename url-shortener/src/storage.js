export function saveUrl(url) {
    let urls = JSON.parse(localStorage.getItem('urls')) || [];
    urls.push(url);
    localStorage.setItem('urls', JSON.stringify(urls));
}
export function getUrls() {
    return JSON.parse(localStorage.getItem('urls')) || [];
}