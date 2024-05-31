import CONFIG from '../globals/config';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
    this._loading = true;
    this._error = false;
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.setLoading(true);
    this.setError(false);
    this.loadRestaurantDataFromAPI();
  }

  setLoading(loading) {
    this._loading = loading;
    this.render();
  }

  setError(error) {
    this._error = error;
    this.render();
  }

  loadRestaurantDataFromAPI() {
    fetch(`${CONFIG.BASE_URL}/list`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        this.setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading data:', error);

        const errorMessage = error.message || 'Oops, something went wrong.';
        this.setError({ message: errorMessage });

        this.setLoading(false);
      });
  }

  render() {
    const loadingHtml = this._loading
      ? `
        <div class="loading">
          <style>
            .lds-ring-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          }
          .lds-ring {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
          }
          .lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 64px;
            height: 64px;
            margin: 8px;
            border: 8px solid #9c938b;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #9c938b transparent transparent transparent;
          }
          .lds-ring div:nth-child(1) {
            animation-delay: -0.45s;
          }
          .lds-ring div:nth-child(2) {
            animation-delay: -0.3s;
          }
          .lds-ring div:nth-child(3) {
            animation-delay: -0.15s;
          }
          @keyframes lds-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          </style>
           <div class="lds-ring-container">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        </div>
      `
      : '';

    const errorHtml = this._error
      ? `
         <div class="error">
          <div class="exclamation-icon">
            <div class="circle">
              <div class="exclamation-mark">!</div>
            </div>
          </div>
          <p><strong>Failed to load restaurant data.</strong></p>
          <p>Error: ${this._error.message}</p>
        </div>
      `
      : '';

    const restaurantInfoHidden = this._loading || this._error ? 'hidden' : '';

    this.innerHTML = `
       <div class="restaurant-item">
        ${loadingHtml}
        ${errorHtml}
        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + this._restaurant.pictureId}" alt="${this._restaurant.name}" ${this._loading || this._error ? 'hidden' : ''}>
        <div class="restaurant-info" ${restaurantInfoHidden}>
          <div class="info-top">
            <h1 class="restaurant-title">
              <a href="/#/detail/${this._restaurant.id}">${this._restaurant.name}</a>
            </h1>
            <p class="restaurant-rating">${this._restaurant.rating}/5</p>
          </div>
          <p class="restaurant-city">${this._restaurant.city}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
