export class MockServer {
  constructor() {
    this.posts = [
      {
        id: 1,
        title: "The Secret of Making Perfect Coffee",
        content:
          "Ever wondered what makes coffee taste so good? It's not just about the beans. This post dives into the art of coffee making, exploring the importance of water temperature, grind size, and brewing time. Join us on a journey to unlock the secret of the perfect cup of coffee.",
        categories: ["Lifestyle", "Food & Drink", "DIY"],
        likes: 15,
        comments: 4,
        creator: "Coffee Connoisseur",
        date: "07/04/2024",
      },
      {
        id: 2,
        title: "Exploring the Night Sky: Tips for Amateur Astronomers",
        content:
          "The stars have fascinated humanity since time immemorial. This post is your guide to exploring the night sky, with tips on choosing the right telescope, finding constellations, and understanding celestial events. Whether you're a seasoned astronomer or a curious beginner, the cosmos has wonders waiting for you.",
        categories: ["Science", "Education", "Hobbies"],
        likes: 22,
        comments: 7,
        creator: "Stargazer",
        date: "14/03/2024",
      },
      {
        id: 3,
        title: "The Future of Renewable Energy",
        content:
          "Renewable energy is pivotal in our fight against climate change. This post explores the latest advancements in solar, wind, and hydroelectric power. We discuss the challenges and opportunities that lie ahead in the quest for a sustainable energy future. Learn about the technologies that will power our world tomorrow.",
        categories: ["Technology", "Environment", "Innovation"],
        likes: 30,
        comments: 12,
        creator: "Eco Innovator",
        date: "22/02/2024",
      },
    ];
  }

  getMockServerResponseDelay() {
    return Math.random() * 250;
  }

  async fetchPosts({ pageNumber, pageSize }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (pageNumber - 1) * pageSize;
        const end = start + pageSize;
        resolve({
          posts: this.posts.slice(start, end),
          totalPosts: this.posts.length,
        });
      }, this.getMockServerResponseDelay());
    });
  }

  async addPost(post) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost = { ...post, id: this.posts.length + 1 };
        this.posts.unshift(newPost);
        resolve(newPost);
      }, this.getMockServerResponseDelay());
    });
  }

  async toggleLike(postId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const postIndex = this.posts.findIndex((post) => post.id === postId);
        if (postIndex !== -1) {
          this.posts[postIndex].isLiked = !this.posts[postIndex].isLiked;
          this.posts[postIndex].likes += this.posts[postIndex].isLiked ? 1 : -1;
          resolve(this.posts[postIndex]);
        } else {
          resolve(null);
        }
      }, this.getMockServerResponseDelay());
    });
  }

  async searchPosts(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const searchResults = this.posts.filter((post) =>
          post.title.toLowerCase().includes(query.toLowerCase())
        );
        resolve(searchResults);
      }, this.getMockServerResponseDelay());
    });
  }
}
