export class PostController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  async init() {
    await this.displayPosts(this.model.getCurrentPage());

    this.bindSearchEvent();
    this.bindPaginationEvents();
    this.addPostButtonListeners();
    this.addLikeButtonListeners();
  }

  addLikeButtonListeners() {
    this.view.postContainer.addEventListener("click", async (event) => {
      const button = event.target.closest(".like-button");
      if (!button) return;
      event.preventDefault();
      const postId = parseInt(button.dataset.postId, 10);
      const post = await this.model.toggleLike(postId);
      this.view.updateLikeButton(postId, post.isLiked, post.likes);
    });
  }

  addPostButtonListeners() {
    this.view.addPostButton.addEventListener("click", this.addPost.bind(this));
  }

  async addPost(event) {
    event.preventDefault();
    const { title, content, categories } = this.view.getPostDetails();
    await this.model.addPost(title, content, categories);
    this.displayPosts(1);
    this.view.resetForm();
    this.view.closeAddPostModal();
  }

  async displayPosts(page) {
    const posts = await this.model.getPostsByPage(page);
    const totalPosts = this.model.getTotalPosts();
    this.view.postContainer.innerHTML = "";
    posts.forEach((post) => this.view.displayPost(post));
    this.view.displayPagination(totalPosts, page, this.model.getPageSize());
  }

  bindSearchEvent() {
    this.view.searchInput.addEventListener("keyup", async () => {
      const query = this.view.searchInput.value.trim();

      if (query.length > 0) {
        this.view.hidePagination();
        const searchResults = await this.model.searchPosts(query);
        this.view.postContainer.innerHTML = "";
        searchResults.forEach((post) => this.view.displayPost(post));
      } else {
        this.view.showPagination();
        this.displayPosts(1);
      }
    });
  }

  bindPaginationEvents() {
    this.view.paginationContainer.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        const page = parseInt(e.target.textContent);
        if (!isNaN(page)) {
          this.model.setCurrentPage(page);
          this.displayPosts(page);
        }
      }
    });
  }
}
