# Inn-TravelPin

This project is a map pinning website where users can add and search for pins on a map. Each pin represents a specific location and includes a title, description, and rating. The map is powered by React and Mapbox, and users can interact with the map by adding new pins and searching for existing ones.

## Features

- Interactive Map with Mapbox
- User authentication (Login & Register)
- Add new pins with title, description, and rating
- Responsive design for desktop and mobile

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Map**: Mapbox
- **Authentication**: JWT for token-based authentication
- **Axios**: For making HTTP requests
- **State Management**: React's useState and useEffect hooks

## Setup Instructions

To run this project locally, follow the steps below:

1. Clone this repository:
    ```bash
    git clone https://github.com/AryanBhoi0005/Inn-TravelPin.git
    ```

2. Navigate into the project directory:
    ```bash
    cd InnTravelPin
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the project and add your Mapbox API key:
    ```env
    REACT_APP_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
    ```

5. Start the development server:
    ```bash
    npm start
    ```

Now open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

## How to Use

Once the application is running, follow these steps:

1. Login or register to add new pins.
2. Double-click on the map to add a new pin.
3. Fill in the title, description, and rating, then click "Add Pin" to save it.

## Folder Structure

```bash
Inn-TravelInn/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Register.js
│   │   ├── Login.js
│   ├── App.js
│   ├── app.css
│   └── index.js
├── .env
├── package.json
└── README.md
