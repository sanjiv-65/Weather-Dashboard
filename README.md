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
###  Tech Stack

&bull; React.js (Front-end library)<br>
&bull; Tailwind CSS (Styling)<br>
&bull; OpenWeatherMap API (Weather data)<br>
&bull; Vite (Build tool)<br>


### **API Integration Details**

This project uses the [OpenWeatherMap API] to fetch real-time weather data.

 **  Base URL:** 
 ```bash
 https://api.openweathermap.org/data/2.5/weather?q={city}&amp;appid={YOUR_API_KEY}&amp;un
its=metric
```
**API key**
```bash
Sign up here: (https://openweathermap.org/api).
```
**Default API Key**
```bash
261396fade37f8bc4718c9c5ccca888d
```
**My API Key**
```bash
4c3563fe325286048c3943947d85747e
```
### Note: 
Open the app Open your browser and navigate to http://localhost:5173 where 5137 is the port number displayed in the terminal to view the dashboard.

### Screenshot

<img width="521" alt="image" src="https://github.com/user-attachments/assets/ba247bf0-ce1a-4ad4-a7d3-2d98a2ba6116" />

### Project Structure

```bash
my-project/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── App.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Loader.jsx
│   │   ├── RecentSearches.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── WeatherDisplay.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── README.md
├── vite.config.js
