export class PostModel {
  constructor(MockServer) {
    this.server = new MockServer();
    this.pageSize = 2;
    this.currentPage = 1;
    this.totalPosts = null;
  }

  async toggleLike(postId) {
    return await this.server.toggleLike(postId).then((updatedPost) => {
      return updatedPost;
    });
  }

  async addPost(title, content, categories) {
    const post = {
      title,
      content,
      categories,
      likes: 0,
      comments: 0,
      creator: "User",
      date: new Date().toLocaleDateString("en-GB"),
    };

    return await this.server.addPost(post).then((newPost) => {
      return newPost;
    });
  }

  async searchPosts(query) {
    return await this.server.searchPosts(query);
  }

  async getPostsByPage(pageNumber) {
    return await this.server
      .fetchPosts({ pageNumber, pageSize: this.pageSize })
      .then(({ totalPosts, posts }) => {
        this.totalPosts = totalPosts;
        return posts;
      });
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getPageSize() {
    return this.pageSize;
  }

  getTotalPosts() {
    return this.totalPosts;
  }
}
