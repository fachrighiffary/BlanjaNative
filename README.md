# Blanja React-Native

## Contents

- [Description](#description)
- [Features](#features)
- [Requirements](#requirements-for-development)
- [Installation](#installation-for-development)
- [Screenshot](#screenshot)
- [Related Project](#related-project)

## Description

**Blanja** is a app-based e-commerce application that allows buyers to order
products of their choice. Consists of 2 types of users, namely buyers and
sellers.

## Features

- Browsing items
- Order product
- History transaction
- Add or edit product (sellers only)
- Chat with seller
- Edit profile
- Reset Password
- etc

## Requirements for Development

- [`Node Js`](https://nodejs.org/en/)
- [`npm`](https://www.npmjs.com/get-npm)
- [`ReactNative`](https://reactnative.dev/)
- [`BlanjaIn Backend`](https://github.com/ariefw96/blanja-restAPI)

## Installation for Development

1. Open your terminal or command prompt
2. Type `git clone https://github.com/ariefw96/blanjaIn-React-Native.git`
3. Open the folder and type `npm install` or `yarn install` for install dependencies from package.json
4. Create file **_.env_** in root directory with the following contents :

```bash
BASE_URL = "your_backend_API_URL"
```

Example :

- http://host_backend:port_backend is http://localhost:8000

so, you can write in .env file like this :

```bash
BASE_URL = "http://localhost:8000"
```

5. Before run this project, you must configure and run backend. You can find backend for this project [here](https://github.com/ariefw96/blanja-restAPI)
6. Type `npm run server` in terminal for running backend.
7. If you want to build this project, type `react-native start --reset-cache` then `react-native run-android`.

## Screenshot

# Here some display about the app

|  Login               |  Home                                   |
|----------------------|-----------------------------------------|
| <img src="https://user-images.githubusercontent.com/45911766/108850888-6c1b0400-7616-11eb-8b2b-bcd740b3c217.jpeg" width="450" />  | <img src="https://user-images.githubusercontent.com/45911766/108850895-6e7d5e00-7616-11eb-897f-5578440424dc.jpeg" width="450" />             |

|  Cart                |  Detail Products                        |
|----------------------|-----------------------------------------|
| <img src="https://user-images.githubusercontent.com/45911766/108850889-6d4c3100-7616-11eb-81ed-e9c25e70a9e6.jpeg" width="450" />  | <img src="https://user-images.githubusercontent.com/45911766/108850890-6de4c780-7616-11eb-8c22-3e116ed59376.jpeg" width="450" />             |


## Related Project

**restful-API**


[`Blanja-restAPI`](https://github.com/fachrighiffary/api-blanja)

Other project

[`Blanja (ReactJs)`](https://github.com/fachrighiffary/blanja-App)

