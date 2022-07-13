# ZMP Restaurant

Starter template for building a restaurant's mini program. Main features:
- View popular or nearby restaurants
- View restaurant's details and menu
- Book a table or order food online
- View booking history

|                          Preview                           |               Open Zalo and scan this QR                |
| :--------------------------------------------------------: | :-----------------------------------------------------: |
| <img src="./docs/preview.jpg" alt="Home page" width="250"> | <img src="./docs/qr.png" alt="Entry point" width="250"> |

## Pre-requisites

1. [Install Node JS](https://nodejs.org/en/download/)
1. [Install Mini App DevTools CLI](https://mini.zalo.me/docs/dev-tools)
1. Download or clone this repository

## Setup

1. Install dependencies
	```bash
	npm install
	```

1. Start dev server using `zmp-cli`
	```bash
	zmp start
	```

1. Open `localhost:3000` on your browser and start coding 🔥

## Deployment

1. Create a mini program. For instruction on how to create a mini program, please refer to [Coffee Shop Tutorial](https://mini.zalo.me/docs/tutorial/step-1/#1-tạo-một-ứng-dụng-zalo-mini-program-mới-trên-trang-chủ-của-zalo-mini-program)

1. Setup payment methods if you want to accept online payments
	![](./docs/payment.png "Payment method")

2. Deploy your mini program to Zalo using the mini app ID created in step 1.
	```bash
	zmp login
	zmp deploy
	```

1. Open Zalo and scan the QR code to preview your mini program

## Usage:

The repository contains sample UI components for building your application. You might wish to integrate internal APIs to fetch restaurants, menu, booking history,... or modify the code to suit your business needs.

Folder structure:

* **`src`**: Contain all logic source code of your Mini App. Inside `src` folder:

	* **`components`**: reusable components written in React.JS
	* **`css`**: Stylesheets, pre-processors also supported
	* **`pages`**: a Page is also a component but will act as an entire view and must be registered inside `app-config.json` (https://mini.zalo.me/docs/framework/getting-started/app-config/#pages). Sheets (such as `food-picker.tsx`, `booking-detail.tsx`) are also pages, to handle the native back button on Android behavior. They won't be registered inside `app-config.json` but in the `View` component's `routesAdd` property.
	* **`services`**: reusable logic for complex tasks that should be separated from your component, such as fetching API, getting location from Zalo or caching stuff,...
	* **`static`**: contain binary assets of your Mini App, such as icon, background, etc,...
	* **`utils`**: reusable utility functions, such as distance calculation, notification, etc,...
	* **`app.ts`**: entry point of your Mini App
	* **`hooks.ts`**: reusable custom hooks
	* **`model.ts`**: contain TypeScript type and interface declarations
	* **`modules.d.ts`**: contain TypeScript declarations for third party modules
	* **`store.ts`**: centralized state management (https://mini.zalo.me/docs/framework/getting-started/store/)

* **`app-config.json`**: Global configuration for your Mini App (https://mini.zalo.me/docs/framework/getting-started/app-config)

The other files (such as `tailwind.config.js`, `vite.config.ts`, `tsconfig.json`, `postcss.config.js`) are configurations for libraries used in your application. Visit the library's documentation to learn how to use them.

## Recipes

### Changing restaurant's name

Just change the `app.title` property in `app-config.json`:

```json
{
  "app": {
    "title": "ZMP Restaurant",
  },
}
```

### Changing restaurant's logo

Visit [Zalo Mini Program](https://mini.zalo.me/) and go to your mini program's settings to change the logo.

### Changing color theme

You can change the primary and the secondary color theme by setting the variable in `src/css/app.scss`:

```scss
:root {
	--zmp-theme-color: #0068ff;
	--zmp-secondary-color: #ff8a00;
}
```

| Default                                                                  | black + black                                                        | #008001 + #9A0007                                                    |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <img src="./docs/variant-default.png" alt="Default variant" width="200"> | <img src="./docs/variant-black.png" alt="Black variant" width="200"> | <img src="./docs/variant-green.png" alt="Green variant" width="200"> |

The two colors will affect most of the application components. To make a deeper color change, override the other colors in `src/css/app.scss`. For the list of available colors, please visit [Color Theme](https://mini.zalo.me/docs/framework/components/color-themes/).

## License

Copyright (c) Zalo Group. and its affiliates. All rights reserved.

The examples provided by Zalo Group are for non-commercial testing and evaluation
purposes only. Zalo Group reserves all rights not expressly granted.
