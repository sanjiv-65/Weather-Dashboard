## Weather Dashboard

A simple and responsive Weather Dashboard built with React that displays current weather conditions and forecasts using live API data.

## Setup Instructions
1. **Clone the repository**

    ```bash
    https://github.com/sanjiv-65/Weather-Dashboard.git
    ```

2. **Navigate to the project directory**

    ```bash
    cd Weather-Dashboard
    ```

3. **Install dependencies**

    ```bash
    npm install
    ```

4. **Run the app**

    ```bash
    npm start
    ```




### **API Integration Details**

This project uses the [OpenWeatherMap API] 
( https://api.openweathermap.org/data/2.5/weather?q={city}&amp;appid={YOUR_API_KEY}&amp;un
its=metric ) to fetch real-time weather data.

- **Base URL:** `https://api.openweathermap.org/data/2.5/weather`
- **Authentication:** Requires an API key. [Sign up here](https://home.openweathermap.org/users/sign_up).
- **Rate Limit:** 60 calls/minute (for free tier)
- **Key Usage:** Store your API key in a `.env` file like so:


