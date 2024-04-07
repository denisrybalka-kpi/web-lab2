export class PostView {
  constructor() {
    this.postContainer = document.querySelector(".postsContainer");
    this.addPostButton = document.querySelector("#addPost");
    this.titleInput = document.querySelector("#postTitle");
    this.contentInput = document.querySelector("#postContent");
    this.categoriesInput = document.querySelector("#postCategories");
    this.closeModalButton = document.querySelector("#closeAddPostModal");
    this.paginationContainer = document.querySelector(".pagination");
    this.searchInput = document.querySelector("#searchInput");
    this.paginationContainer = document.querySelector(".pagination");
  }

  getPostDetails() {
    return {
      title: this.titleInput.value,
      content: this.contentInput.value,
      categories: this.categoriesInput.value.split(",").map((s) => s.trim()),
    };
  }

  resetForm() {
    this.titleInput.value = "";
    this.contentInput.value = "";
    this.categoriesInput.value = "";
  }

  closeAddPostModal() {
    this.closeModalButton.click();
  }

  updateLikeButton(postId, isLiked, likes) {
    const likeButton = document.querySelector(
      `.like-button[data-post-id="${postId}"]`
    );
    if (likeButton) {
      likeButton.classList.toggle("liked", isLiked);
      const likeCountElement = likeButton.querySelector(".like-count");
      if (likeCountElement) {
        likeCountElement.textContent = likes;
      }
    }
  }

  displayPagination(totalPosts, currentPage, pageSize) {
    const totalPages = Math.ceil(totalPosts / pageSize);
    this.paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement("li");
      pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
      pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      this.paginationContainer.appendChild(pageItem);
    }
  }

  showPagination() {
    this.paginationContainer.style.display = "flex";
  }

  hidePagination() {
    this.paginationContainer.style.display = "none";
  }

  displayPost(post) {
    const {
      title,
      date,
      categories,
      content,
      creator,
      likes,
      comments,
      id,
      isLiked,
    } = post;

    const postElement = document.createElement("div");
    postElement.className = "card mb-3 postItem";
    postElement.innerHTML = `
        <div class="card-body d-flex flex-column">
          <h3 class="card-title">${title}</h3>
          <p class="card-subtitle text-muted mb-2">
            Posted by: ${creator} | Date: ${date}
          </p>
          <p class="card-text">${content}</p>
          <div class="d-flex flex-wrap mb-2">
            ${categories
              .map(
                (category) =>
                  `<span class="badge badge-light mr-2 text-bg-dark rounded-pill hoverable">${category}</span>`
              )
              .join("")}
          </div>
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <a href="pages/post.html" class="btn btn-success">Read More</a>
            <div class="d-flex gap-2">
              <span class="btn btn-success mr-2 like-button ${
                isLiked ? "liked" : ""
              }" data-post-id="${id}">
                <i class="fas fa-thumbs-up mr-2"></i><span class="like-count">${likes}</span>
              </span>
              <span class="btn btn-info">
                <i class="fas fa-comment mr-2"></i>${comments}
              </span>
            </div>
          </div>
        </div>
      `;
    this.postContainer.insertAdjacentElement("beforeend", postElement);
  }
}
