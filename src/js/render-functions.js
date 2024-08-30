export const createGalleryCardTemplate = (imgInfo) => {
    return `<li class="gallery-card">
    <a class="gallery-link" href="${imgInfo.largeImageURL}"> <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" /></a>
           <div class="gallery-info">
                <p class="likes">Likes <span>${imgInfo.likes}</span></p>
                <p class="views">Views <span>${imgInfo.views}</span></p>
                <p class="comments">Comments <span>${imgInfo.comments}</span></p>
                <p class="downloads">Downloads <span>${imgInfo.downloads}</span></p>
            </div>    
            </li>`;
}