import '../../component/restaurant-list';
import '../../component/restaurant-item';
import RestaurantSource from '../../data/restaurant-source';

const Home = {
  async render() {
    return `
      <div class="hero">
      <picture>
        <source media="(max-width: 600px)" srcset="./images/hero-image-small.jpg">
        <img src='./images/hero-image-large.jpg' alt="Hero Image"  class="hero-image">
      </picture>
        <div class="hero-inner">
          <h1 class="hero-title">Temukan Restaurant Favorit Anda</h1>
          <p class="hero-tagline">
          Berikut adalah daftar rekomendasi restaurant dari berbagai kota.
          </p>
        </div>
      </div>
      <article class="restaurant">
        <div class="content">
          <h1 class="restaurant-label">Daftar Restaurant</h1>
          <restaurant-list></restaurant-list>
        </div>
      </article>
      <article class="story">
        <picture>
        <source media="(max-width: 600px)" srcset="./images/story-image-small.jpg">
        <img data-src='./images/story-image-large.jpg' 
            alt="" class="lazyload">
        </picture>
        <div class="story-content">
          <h1 class="story-title">InSight</h1>
          <p class="story-description">
          Bergabunglah dengan kami untuk mencari restaurant 
          dari berbagai kota untuk dapat anda ceritakan
          pada teman kalian, keluarga atau pasangan anda.
          Bersama-sama, kita akan menemukan tempat-tempat makan 
          yang istimewa dan berkesan untuk dinikmati bersama orang-orang terkasih!
          </p>
          <button class="story-button">Read More</button>
        </div>
      </article>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurants();
    const restaurantsContainer = document.querySelector('restaurant-list');
    restaurants.forEach((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      restaurantsContainer.appendChild(restaurantItemElement);
    });
  },
};

export default Home;
